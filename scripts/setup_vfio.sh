#!/bin/bash

#
# setup_vfio.sh - Setup VFIO for direct NIC access
#
# Usage: sudo ./setup_vfio.sh <PCI_DEVICE_ID>
# Example: sudo ./setup_vfio.sh 0000:01:00.0
#

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}ERROR: This script must be run as root${NC}"
    echo "Usage: sudo $0 <PCI_DEVICE_ID>"
    exit 1
fi

# Check arguments
if [ $# -lt 1 ]; then
    echo "Usage: $0 <PCI_DEVICE_ID>"
    echo ""
    echo "Example: $0 0000:01:00.0"
    echo ""
    echo "To find your NIC's PCI ID:"
    echo "  lspci | grep Ethernet"
    exit 1
fi

PCI_DEVICE=$1

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Ultra-Low-Latency NIC Driver Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "PCI Device: $PCI_DEVICE"
echo ""

# ============================================================================
# Step 1: Verify PCI device exists
# ============================================================================

echo -e "${YELLOW}[1/7]${NC} Verifying PCI device..."

if [ ! -d "/sys/bus/pci/devices/$PCI_DEVICE" ]; then
    echo -e "${RED}ERROR: PCI device $PCI_DEVICE not found!${NC}"
    echo ""
    echo "Available NICs:"
    lspci | grep -i ethernet
    exit 1
fi

echo -e "${GREEN}✓${NC} PCI device found"

# Get vendor and device IDs
VENDOR_ID=$(cat /sys/bus/pci/devices/$PCI_DEVICE/vendor)
DEVICE_ID=$(cat /sys/bus/pci/devices/$PCI_DEVICE/device)
echo "  Vendor ID: $VENDOR_ID"
echo "  Device ID: $DEVICE_ID"
echo ""

# ============================================================================
# Step 2: Unbind existing kernel driver
# ============================================================================

echo -e "${YELLOW}[2/7]${NC} Unbinding kernel driver..."

CURRENT_DRIVER=$(readlink /sys/bus/pci/devices/$PCI_DEVICE/driver 2>/dev/null || echo "none")

if [ "$CURRENT_DRIVER" != "none" ]; then
    DRIVER_NAME=$(basename $CURRENT_DRIVER)
    echo "  Current driver: $DRIVER_NAME"
    echo "  Unbinding..."
    
    echo "$PCI_DEVICE" > /sys/bus/pci/devices/$PCI_DEVICE/driver/unbind 2>/dev/null || true
    sleep 1
    
    echo -e "${GREEN}✓${NC} Driver unbound"
else
    echo "  No driver currently bound"
fi
echo ""

# ============================================================================
# Step 3: Load VFIO modules
# ============================================================================

echo -e "${YELLOW}[3/7]${NC} Loading VFIO kernel modules..."

modprobe vfio
modprobe vfio-pci

if lsmod | grep -q vfio_pci; then
    echo -e "${GREEN}✓${NC} VFIO modules loaded"
else
    echo -e "${RED}ERROR: Failed to load VFIO modules${NC}"
    exit 1
fi
echo ""

# ============================================================================
# Step 4: Bind to vfio-pci
# ============================================================================

echo -e "${YELLOW}[4/7]${NC} Binding to vfio-pci driver..."

# Set driver override
echo "vfio-pci" > /sys/bus/pci/devices/$PCI_DEVICE/driver_override

# Bind to vfio-pci
echo "$PCI_DEVICE" > /sys/bus/pci/drivers/vfio-pci/bind

# Verify binding
sleep 1
NEW_DRIVER=$(readlink /sys/bus/pci/devices/$PCI_DEVICE/driver 2>/dev/null || echo "none")
if [[ "$NEW_DRIVER" == *"vfio-pci"* ]]; then
    echo -e "${GREEN}✓${NC} Successfully bound to vfio-pci"
else
    echo -e "${RED}ERROR: Failed to bind to vfio-pci${NC}"
    exit 1
fi
echo ""

# ============================================================================
# Step 5: Set permissions
# ============================================================================

echo -e "${YELLOW}[5/7]${NC} Setting VFIO permissions..."

chmod 666 /dev/vfio/vfio 2>/dev/null || true
chmod 666 /dev/vfio/* 2>/dev/null || true

echo -e "${GREEN}✓${NC} Permissions set"
echo ""

# ============================================================================
# Step 6: Configure huge pages
# ============================================================================

echo -e "${YELLOW}[6/7]${NC} Configuring huge pages..."

# Allocate 2MB huge pages
HUGEPAGE_COUNT=1024
echo $HUGEPAGE_COUNT > /proc/sys/vm/nr_hugepages

# Verify
ALLOCATED=$(cat /proc/sys/vm/nr_hugepages)
echo "  Allocated: $ALLOCATED x 2MB pages"

if [ "$ALLOCATED" -ge "$HUGEPAGE_COUNT" ]; then
    echo -e "${GREEN}✓${NC} Huge pages configured"
else
    echo -e "${YELLOW}WARNING: Only $ALLOCATED huge pages allocated (requested $HUGEPAGE_COUNT)${NC}"
fi
echo ""

# ============================================================================
# Step 7: Verify setup
# ============================================================================

echo -e "${YELLOW}[7/7]${NC} Verifying setup..."

# Check driver binding
FINAL_DRIVER=$(readlink /sys/bus/pci/devices/$PCI_DEVICE/driver)
if [[ "$FINAL_DRIVER" == *"vfio-pci"* ]]; then
    echo -e "${GREEN}✓${NC} Driver: vfio-pci"
else
    echo -e "${RED}✗${NC} Driver verification failed"
    exit 1
fi

# Check VFIO device
IOMMU_GROUP=$(basename $(readlink /sys/bus/pci/devices/$PCI_DEVICE/iommu_group))
if [ -c "/dev/vfio/$IOMMU_GROUP" ]; then
    echo -e "${GREEN}✓${NC} VFIO device: /dev/vfio/$IOMMU_GROUP"
else
    echo -e "${RED}✗${NC} VFIO device not found"
    exit 1
fi

# Check huge pages
if [ -d "/dev/hugepages" ]; then
    echo -e "${GREEN}✓${NC} Huge pages: mounted"
else
    echo -e "${YELLOW}WARNING: Huge pages not mounted${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}Setup Complete!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "1. Your application can now access the NIC directly"
echo "2. Run as regular user (no root required)"
echo "3. Use resource path: /sys/bus/pci/devices/$PCI_DEVICE/resource0"
echo ""
echo "Example:"
echo "  ./basic_usage /sys/bus/pci/devices/$PCI_DEVICE/resource0"
echo ""
echo "To revert changes:"
echo "  echo "$PCI_DEVICE" | sudo tee /sys/bus/pci/drivers/vfio-pci/unbind"
echo "  echo "<original_driver>" | sudo tee /sys/bus/pci/devices/$PCI_DEVICE/driver_override"
echo "  echo "$PCI_DEVICE" | sudo tee /sys/bus/pci/drivers/<original_driver>/bind"
echo ""
