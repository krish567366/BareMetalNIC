/**
 * @file solarflare_example.cpp
 * @brief Solarflare ef_vi driver usage example
 */

#include <ull_nic/ull_nic.hpp>
#include <iostream>
#include <signal.h>

volatile bool running = true;

void signal_handler(int signum) {
    (void)signum;
    running = false;
}

int main(int argc, char** argv) {
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <interface>\n";
        std::cerr << "Example: " << argv[0] << " eth0\n";
        return 1;
    }
    
    signal(SIGINT, signal_handler);
    
    std::cout << "Solarflare ef_vi Example\n";
    std::cout << "========================\n\n";
    
    // Initialize Solarflare NIC
    ull_nic::SolarflareEFVI nic;
    
    if (!nic.initialize(argv[1])) {
        std::cerr << "ERROR: Failed to initialize Solarflare NIC!\n";
        std::cerr << "\nRequirements:\n";
        std::cerr << "1. Solarflare NIC (X2522, X2542, etc.)\n";
        std::cerr << "2. Solarflare drivers installed\n";
        std::cerr << "3. ef_vi module loaded: sudo modprobe sfc\n";
        return 1;
    }
    
    std::cout << "✓ Solarflare NIC initialized\n\n";
    std::cout << "Receiving packets (Press Ctrl+C to stop)...\n\n";
    
    uint64_t packet_count = 0;
    ull_nic::efvi_packet pkt;
    
    while (running) {
        if (nic.poll_rx(&pkt)) {
            packet_count++;
            
            std::cout << "RX #" << packet_count << ": " << pkt.len << " bytes, "
                      << "timestamp: " << pkt.timestamp_ns << "ns\n";
        }
    }
    
    std::cout << "\nTotal packets: " << packet_count << "\n";
    
    return 0;
}
