/**
 * @file basic_usage.cpp
 * @brief Basic usage example for Ultra-Low-Latency NIC drivers
 * 
 * This example demonstrates:
 * - Initializing the custom NIC driver
 * - Polling for incoming packets
 * - Processing received packets
 * - Packet transmission
 */

#include <ull_nic/ull_nic.hpp>
#include <iostream>
#include <cstring>
#include <signal.h>

// Global flag for graceful shutdown
volatile bool running = true;

void signal_handler(int signum) {
    (void)signum;
    running = false;
}

int main(int argc, char** argv) {
    // ========================================================================
    // Setup
    // ========================================================================
    
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <pci_device_path>\n";
        std::cerr << "Example: " << argv[0] << " /sys/bus/pci/devices/0000:01:00.0/resource0\n";
        std::cerr << "\nTo find your NIC:\n";
        std::cerr << "  lspci | grep Ethernet\n";
        std::cerr << "  ls /sys/bus/pci/devices/*/resource0\n";
        return 1;
    }
    
    // Register signal handler for graceful shutdown
    signal(SIGINT, signal_handler);
    signal(SIGTERM, signal_handler);
    
    std::cout << "Ultra-Low-Latency NIC Driver - Basic Usage Example\n";
    std::cout << "==================================================\n\n";
    
    // ========================================================================
    // Initialize Driver
    // ========================================================================
    
    std::cout << "Initializing NIC driver...\n";
    std::cout << "PCI device: " << argv[1] << "\n\n";
    
    ull_nic::CustomNICDriver nic;
    
    if (!nic.initialize(argv[1])) {
        std::cerr << "ERROR: Failed to initialize NIC driver!\n";
        std::cerr << "\nTroubleshooting:\n";
        std::cerr << "1. Run setup script: sudo ./scripts/setup_vfio.sh <PCI_ID>\n";
        std::cerr << "2. Check permissions: ls -l /dev/vfio/vfio\n";
        std::cerr << "3. Verify NIC is bound to vfio-pci driver\n";
        return 1;
    }
    
    std::cout << "✓ NIC initialized successfully!\n\n";
    
    // ========================================================================
    // Main Loop: Poll for Packets
    // ========================================================================
    
    std::cout << "Starting packet reception loop...\n";
    std::cout << "Press Ctrl+C to stop\n\n";
    
    uint64_t packet_count = 0;
    uint64_t byte_count = 0;
    uint64_t start_time = ull_nic::get_timestamp();
    
    uint8_t* packet_data;
    size_t packet_len;
    
    while (running) {
        // Poll for incoming packet (non-blocking, 20-50ns)
        if (nic.poll_rx(&packet_data, &packet_len)) {
            
            // Update statistics
            packet_count++;
            byte_count += packet_len;
            
            // Process packet (your application logic here)
            // For this example, just print packet info
            std::cout << "RX Packet #" << packet_count 
                      << ": " << packet_len << " bytes\n";
            
            // Example: Print first 32 bytes (hex dump)
            std::cout << "  Data: ";
            for (size_t i = 0; i < std::min(packet_len, size_t(32)); i++) {
                printf("%02x ", packet_data[i]);
            }
            std::cout << (packet_len > 32 ? "..." : "") << "\n\n";
            
            // Example: Echo packet back (simple loopback)
            // nic.submit_tx(packet_data, packet_len);
        }
        
        // Note: No sleep/yield here - busy polling for minimum latency
        // In production, you might want to add a small delay if packets
        // are infrequent to save CPU power
    }
    
    // ========================================================================
    // Shutdown and Statistics
    // ========================================================================
    
    uint64_t end_time = ull_nic::get_timestamp();
    double elapsed_sec = ull_nic::tsc_to_ns(end_time - start_time) / 1e9;
    
    std::cout << "\n";
    std::cout << "Shutting down...\n\n";
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    std::cout << "Statistics\n";
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    std::cout << "Packets received: " << packet_count << "\n";
    std::cout << "Bytes received:   " << byte_count << "\n";
    std::cout << "Elapsed time:     " << elapsed_sec << " seconds\n";
    
    if (elapsed_sec > 0) {
        std::cout << "Packet rate:      " << (packet_count / elapsed_sec) << " pps\n";
        std::cout << "Throughput:       " << (byte_count * 8 / elapsed_sec / 1e9) << " Gbps\n";
    }
    
    std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    
    return 0;
}
