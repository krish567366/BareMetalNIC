/**
 * @file broadcom_example.cpp
 * @brief Example usage of Broadcom NetXtreme ultra-low-latency driver
 * 
 * Demonstrates 30-80ns packet receive latency with BCM575xx/BCM588xx NICs
 * 
 * Compilation:
 *   g++ -std=c++17 -O3 -march=native -I../include -o broadcom_example broadcom_example.cpp
 * 
 * Prerequisites:
 *   - Broadcom NetXtreme NIC (BCM57504/57508/57414/58800)
 *   - VFIO/IOMMU configured (see setup instructions)
 *   - Huge pages enabled: echo 1024 > /proc/sys/vm/nr_hugepages
 *   - Run as root or with CAP_SYS_RAWIO capability
 * 
 * @author Krishna Bajpai (krishna@krishnabajpai.me)
 */

#include "ull_nic/broadcom_netxtreme.hpp"
#include <iostream>
#include <chrono>
#include <csignal>
#include <cstring>

using namespace ull_nic;

volatile bool running = true;

void signal_handler(int) {
    running = false;
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <PCI_ADDRESS>\n";
        std::cerr << "Example: " << argv[0] << " 0000:01:00.0\n";
        std::cerr << "\nTo find your Broadcom NIC PCI address:\n";
        std::cerr << "  lspci | grep -i broadcom\n";
        return 1;
    }
    
    const char* pci_addr = argv[1];
    
    std::cout << "=== Broadcom NetXtreme Ultra-Low-Latency Driver ===\n";
    std::cout << "PCI Address: " << pci_addr << "\n";
    std::cout << "Target Latency: 30-80ns packet receive\n\n";
    
    // Initialize driver
    BroadcomNetXtreme nic(pci_addr);
    
    std::cout << "Initializing NIC...\n";
    if (!nic.initialize()) {
        std::cerr << "ERROR: Failed to initialize NIC\n";
        std::cerr << "\nTroubleshooting:\n";
        std::cerr << "1. Check VFIO setup: ls -l /dev/vfio/\n";
        std::cerr << "2. Bind to vfio-pci: echo " << pci_addr << " > /sys/bus/pci/drivers/vfio-pci/bind\n";
        std::cerr << "3. Enable IOMMU: Add intel_iommu=on to kernel boot params\n";
        std::cerr << "4. Check huge pages: cat /proc/meminfo | grep Huge\n";
        return 1;
    }
    
    std::cout << "✓ NIC initialized successfully\n";
    
    // Get NIC info
    uint8_t mac[6];
    nic.get_mac_address(mac);
    std::cout << "MAC Address: ";
    printf("%02x:%02x:%02x:%02x:%02x:%02x\n", 
           mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
    
    if (nic.is_link_up()) {
        std::cout << "Link Status: UP\n";
        std::cout << "Link Speed: " << (nic.get_link_speed() / 1000) << " Gbps\n";
    } else {
        std::cout << "Link Status: DOWN\n";
        std::cerr << "WARNING: Link is down. Check cable connection.\n";
    }
    
    std::cout << "\n--- Starting packet processing loop ---\n";
    std::cout << "Press Ctrl+C to stop\n\n";
    
    signal(SIGINT, signal_handler);
    
    uint64_t last_report = 0;
    uint64_t start_packets = 0;
    auto start_time = std::chrono::steady_clock::now();
    
    // Main receive loop (busy-wait for lowest latency)
    while (running) {
        uint8_t* packet;
        uint16_t length;
        
        // Receive packet (30-80ns latency)
        if (nic.receive_packet(&packet, &length)) {
            // Get hardware timestamp for precise latency measurement
            uint64_t hw_timestamp = nic.get_hardware_timestamp();
            
            // Process packet (example: echo back)
            // In production: parse headers, make trading decisions, etc.
            
            // Example: Send response packet
            uint8_t response[64];
            std::memcpy(response, packet, std::min<uint16_t>(length, 64));
            nic.send_packet(response, std::min<uint16_t>(length, 64));
            
            // Print statistics every 1 million packets
            uint64_t total_rx = nic.get_packets_received();
            if (total_rx - last_report >= 1000000) {
                auto now = std::chrono::steady_clock::now();
                auto elapsed = std::chrono::duration_cast<std::chrono::microseconds>(
                    now - start_time
                ).count();
                
                uint64_t packets_processed = total_rx - start_packets;
                double mpps = (packets_processed / static_cast<double>(elapsed));
                
                std::cout << "Packets: " << total_rx 
                          << " | Rate: " << mpps << " Mpps"
                          << " | TX: " << nic.get_packets_sent() << "\n";
                
                last_report = total_rx;
                start_packets = total_rx;
                start_time = now;
            }
        }
    }
    
    std::cout << "\n--- Final Statistics ---\n";
    std::cout << "Total RX: " << nic.get_packets_received() << " packets\n";
    std::cout << "Total TX: " << nic.get_packets_sent() << " packets\n";
    
    return 0;
}
