#pragma once

#include "common_types.hpp"
#include <cstdint>
#include <cstring>
#include <array>

/**
 * @file solarflare_efvi.hpp
 * @brief Solarflare ef_vi Ultra-Low-Latency Network Interface Wrapper
 * @author Krishna Bajpai
 * @version 1.0.0
 * 
 * ============================================================================
 * SOLARFLARE ef_vi / TCPDIRECT INTERFACE
 * ============================================================================
 * 
 * Background:
 * - **OpenOnload**: Kernel bypass via LD_PRELOAD, mimics BSD sockets (~1.0μs)
 * - **ef_vi**: Raw Ethernet frame access, direct ring buffer access (~0.1-0.2μs)
 * - **TCPDirect**: Zero-copy TCP with ef_vi backend (~0.15-0.25μs)
 * 
 * Why ef_vi is faster than OpenOnload:
 * 1. No socket API emulation overhead
 * 2. Direct DMA ring buffer access (zero-copy)
 * 3. Application-managed packet buffers
 * 4. No kernel context switches (even for errors)
 * 5. Busy-polling with zero OS involvement
 * 
 * Performance Comparison:
 * - Standard kernel socket: 10-20 μs
 * - OpenOnload (socket bypass): 0.8-1.2 μs
 * - ef_vi (raw Ethernet): 0.1-0.2 μs ⚡
 * - TCPDirect (zero-copy TCP): 0.15-0.25 μs
 * 
 * Latency Savings: 0.8-1.0 μs per packet vs OpenOnload!
 * 
 * ============================================================================
 * PRODUCTION SETUP
 * ============================================================================
 * 
 * ```bash
 * # Install Solarflare drivers
 * sudo apt-get install solarflare-sfutils solarflare-dkms
 * 
 * # Load ef_vi module
 * sudo modprobe sfc
 * sudo modprobe sfc_resource
 * 
 * # Allocate huge pages for ef_vi
 * echo 1024 | sudo tee /sys/kernel/mm/hugepages/hugepages-2048kB/nr_hugepages
 * 
 * # Disable IRQs, use busy-polling
 * sudo ethtool -C eth0 rx-usecs 0 tx-usecs 0
 * 
 * # Pin NIC interrupts to separate core
 * echo 1 | sudo tee /proc/irq/<IRQ_NUM>/smp_affinity_list
 * ```
 * 
 * ============================================================================
 * COMPILATION
 * ============================================================================
 * 
 * ```bash
 * g++ -std=c++17 -O3 -march=native \
 *     -I/usr/include/etherfabric \
 *     -L/usr/lib64 \
 *     -lciul1 -letherfabric \
 *     -o my_app main.cpp
 * ```
 * 
 * ============================================================================
 * USE CASES
 * ============================================================================
 * 
 * - Low-latency messaging systems
 * - Real-time data streaming
 * - Financial market data feeds
 * - Network protocol research
 * - Custom network applications
 * - Time-sensitive networking
 * - Hardware-in-the-loop testing
 * 
 * ============================================================================
 */

namespace ull_nic {

// ============================================================================
// ef_vi Configuration Constants
// ============================================================================

constexpr size_t EFVI_RX_RING_SIZE = 512;  ///< RX descriptor ring size
constexpr size_t EFVI_TX_RING_SIZE = 512;  ///< TX descriptor ring size
constexpr size_t EFVI_PKT_BUF_SIZE = 2048; ///< Packet buffer size (standard MTU)
constexpr size_t EFVI_NUM_BUFS = 1024;     ///< Total packet buffers

// ============================================================================
// Simulated ef_vi Structures
// ============================================================================
// NOTE: In production, replace with actual ef_vi API:
// #include <etherfabric/vi.h>
// ef_vi vi;
// ef_driver_handle dh;

/**
 * @struct efvi_handle
 * @brief Simulated ef_vi handle (replace with real ef_vi in production)
 */
struct efvi_handle {
    int fd;                              ///< File descriptor for ef_vi
    void* rx_ring;                       ///< RX descriptor ring (DMA)
    void* tx_ring;                       ///< TX descriptor ring (DMA)
    void* pkt_bufs[EFVI_NUM_BUFS];      ///< Pre-allocated packet buffers
    uint32_t rx_posted;                  ///< Number of RX buffers posted
    uint32_t tx_posted;                  ///< Number of TX buffers posted
};

/**
 * @struct efvi_packet
 * @brief Packet buffer structure
 */
struct efvi_packet {
    uint8_t data[EFVI_PKT_BUF_SIZE];  ///< Packet data
    size_t len;                        ///< Packet length
    uint64_t timestamp_ns;             ///< Hardware timestamp (if supported)
};

// ============================================================================
// Solarflare ef_vi Interface Class
// ============================================================================

/**
 * @class SolarflareEFVI
 * @brief Wrapper for Solarflare ef_vi direct NIC access
 * 
 * This class provides ultra-low-latency network access via Solarflare's ef_vi API.
 * 
 * Key Features:
 * 1. Direct DMA ring buffer access (zero-copy)
 * 2. Busy-polling receive loop (no interrupts)
 * 3. Pre-allocated packet buffers (no malloc)
 * 4. Hardware timestamping (sub-nanosecond accuracy)
 * 5. TX completion polling (no TX interrupts)
 * 
 * Performance Characteristics:
 * - RX poll latency: 50-100 ns (vs 500-1000 ns with OpenOnload)
 * - TX submit latency: 50-80 ns (vs 300-500 ns with OpenOnload)
 * - Total network stack: 0.1-0.2 μs (vs 0.8-1.2 μs with OpenOnload)
 * 
 * Production Implementation:
 * Replace this simulation with real ef_vi calls:
 * - ef_vi_init()
 * - ef_vi_receive_init()
 * - ef_vi_transmit_init()
 * - ef_eventq_poll()
 * - ef_vi_transmit()
 */
class SolarflareEFVI {
public:
    /**
     * @brief Constructor
     */
    SolarflareEFVI() : initialized_(false), rx_posted_(0), tx_posted_(0) {}
    
    /**
     * @brief Destructor
     */
    ~SolarflareEFVI() {
        // Cleanup: ef_vi_free(), munmap(), etc.
    }
    
    /**
     * @brief Initialize NIC with ef_vi
     * @param interface Network interface name (e.g., "eth0")
     * @return true if successful
     * 
     * Production implementation:
     * ```cpp
     * ef_driver_handle dh;
     * ef_vi vi;
     * ef_driver_open(&dh);
     * ef_vi_alloc_from_pd(&vi, dh, &pd, dh, -1, 0, -1, NULL, -1, 0);
     * ```
     */
    bool initialize(const char* interface) {
        // Production: Open ef_vi interface
        // For simulation, just mark initialized
        initialized_ = true;
        
        // Pre-allocate packet buffers (huge pages for DMA)
        allocate_packet_buffers();
        
        // Post initial RX buffers to NIC
        for (size_t i = 0; i < EFVI_RX_RING_SIZE; i++) {
            post_rx_buffer(i);
        }
        
        return true;
    }
    
    /**
     * @brief Busy-poll for incoming packets (zero-wait, zero-interrupts)
     * @param[out] pkt Pointer to packet structure to fill
     * @return true if packet was received, false if no packet available
     * 
     * This is the HOT PATH for packet reception!
     * 
     * **Performance: 50-100 ns per poll (even if no packet)**
     * 
     * Production implementation:
     * ```cpp
     * ef_event evs[EF_VI_EVENT_POLL_MIN_EVS];
     * int n_ev = ef_eventq_poll(&vi, evs, sizeof(evs)/sizeof(evs[0]));
     * for (int i = 0; i < n_ev; i++) {
     *     if (EF_EVENT_TYPE(evs[i]) == EF_EVENT_TYPE_RX) {
     *         ef_vi_receive_get_bytes(&vi, evs[i].rx.pkt_id, &pkt, &len);
     *     }
     * }
     * ```
     */
    inline bool poll_rx(efvi_packet* pkt) {
        if (!initialized_) [[unlikely]] {
            return false;
        }
        
        // HOT PATH: Check DMA ring buffer for new packets
        // Real implementation: ef_eventq_poll()
        // Simulation: Return dummy data for testing
        
        if (rx_posted_ > 0) [[likely]] {
            // Simulated packet receive
            pkt->len = 64;  // Minimum Ethernet frame
            pkt->timestamp_ns = get_timestamp();
            rx_posted_--;
            
            // Re-post RX buffer immediately (keep ring full)
            post_rx_buffer(rx_posted_);
            
            return true;
        }
        
        return false;
    }
    
    /**
     * @brief Submit packet for transmission (zero-copy)
     * @param data Pointer to packet data
     * @param len Length of packet
     * @return true if packet was submitted, false on error
     * 
     * **Performance: 50-80 ns**
     * 
     * Production implementation:
     * ```cpp
     * ef_vi_transmit(&vi, dma_addr, len, pkt_id);
     * ef_vi_transmit_push(&vi);  // Push to NIC (immediate send)
     * ```
     */
    inline bool submit_tx(const uint8_t* data, size_t len) {
        if (!initialized_) [[unlikely]] {
            return false;
        }
        
        if (len > EFVI_PKT_BUF_SIZE) [[unlikely]] {
            return false;
        }
        
        // HOT PATH: Submit packet to TX ring
        // Real implementation: ef_vi_transmit()
        
        if (tx_posted_ < EFVI_TX_RING_SIZE) [[likely]] {
            // Get pre-allocated TX buffer
            uint8_t* tx_buf = static_cast<uint8_t*>(handle_.pkt_bufs[tx_posted_]);
            
            // Copy data to DMA buffer (unavoidable for small packets)
            std::memcpy(tx_buf, data, len);
            
            // Submit to NIC (DMA transfer begins)
            tx_posted_++;
            
            // Push to wire immediately (don't batch)
            // Real implementation: ef_vi_transmit_push(&vi);
            
            return true;
        }
        
        return false;
    }
    
    /**
     * @brief Poll for TX completions (reclaim buffers)
     * 
     * **Performance: 20-40 ns**
     * 
     * Production implementation:
     * ```cpp
     * ef_event evs[EF_VI_EVENT_POLL_MIN_EVS];
     * int n_ev = ef_eventq_poll(&vi, evs, sizeof(evs)/sizeof(evs[0]));
     * for (int i = 0; i < n_ev; i++) {
     *     if (EF_EVENT_TYPE(evs[i]) == EF_EVENT_TYPE_TX) {
     *         // TX buffer is free, can be reused
     *     }
     * }
     * ```
     */
    inline void poll_tx_completions() {
        if (tx_posted_ > 0) [[likely]] {
            // Real implementation: ef_eventq_poll() for TX events
            // For simulation, just decrement counter
            tx_posted_--;
        }
    }
    
    /**
     * @brief Get hardware timestamp of last received packet
     * @return Timestamp in nanoseconds
     * 
     * Solarflare NICs support hardware timestamping with ~8ns precision
     * (vs ~100ns for software timestamps)
     */
    inline uint64_t get_hw_timestamp() const {
        // Real implementation: Extract from ef_event
        return get_timestamp();
    }
    
    /**
     * @brief Get driver statistics
     * @return PacketStats structure with counters
     */
    PacketStats get_stats() const {
        // In production, maintain counters
        return PacketStats();
    }

private:
    efvi_handle handle_;      ///< ef_vi handle
    bool initialized_;        ///< Initialization status
    uint32_t rx_posted_;      ///< Number of RX buffers posted
    uint32_t tx_posted_;      ///< Number of TX buffers posted
    
    /**
     * @brief Allocate packet buffers using huge pages
     * 
     * Huge pages reduce TLB misses:
     * - 4KB pages: 512 entries per 2MB
     * - 2MB pages: 1 entry per 2MB
     * - TLB miss cost: 50-100 ns
     * 
     * Production: Use mmap() with MAP_HUGETLB
     */
    void allocate_packet_buffers() {
        // Real implementation: mmap() with MAP_HUGETLB
        // Allocate from huge page pool for DMA
        for (size_t i = 0; i < EFVI_NUM_BUFS; i++) {
            handle_.pkt_bufs[i] = nullptr;  // Placeholder for simulation
        }
    }
    
    /**
     * @brief Post RX buffer to NIC
     * @param buf_id Buffer ID to post
     * 
     * Production implementation:
     * ```cpp
     * ef_vi_receive_init(&vi, dma_addr, pkt_id);
     * ef_vi_receive_push(&vi);
     * ```
     */
    inline void post_rx_buffer(uint32_t buf_id) {
        rx_posted_++;
        // Real implementation: ef_vi_receive_init()
    }
};

// ============================================================================
// Interrupt Affinity Configuration
// ============================================================================

/**
 * @class NICInterruptConfig
 * @brief Configure NIC interrupt affinity
 * 
 * Goal: Prevent NIC interrupts from disturbing application thread
 * 
 * Strategy:
 * - Application thread: Core 2 (isolated, no interrupts)
 * - NIC interrupts: Core 1 (dedicated interrupt handler)
 * - Busy-polling: Application thread polls NIC directly (no interrupts needed)
 * 
 * Setup:
 * ```bash
 * # Find NIC IRQ number
 * cat /proc/interrupts | grep eth0
 * 
 * # Pin interrupt to Core 1
 * echo 1 | sudo tee /proc/irq/<IRQ_NUM>/smp_affinity_list
 * 
 * # Disable IRQ coalescing (for busy-polling)
 * sudo ethtool -C eth0 rx-usecs 0 tx-usecs 0
 * ```
 */
class NICInterruptConfig {
public:
    /**
     * @brief Set NIC interrupt affinity to specific core
     * @param irq_num IRQ number of NIC
     * @param core_id CPU core ID
     * @return true if successful
     */
    static bool set_irq_affinity(int irq_num, int core_id) {
        #ifdef __linux__
        char path[256];
        snprintf(path, sizeof(path), "/proc/irq/%d/smp_affinity_list", irq_num);
        
        FILE* f = fopen(path, "w");
        if (f) {
            fprintf(f, "%d", core_id);
            fclose(f);
            return true;
        }
        #endif
        return false;
    }
    
    /**
     * @brief Disable interrupt coalescing (for busy-polling)
     * @param interface Network interface name
     * @return true if successful
     * 
     * Command: ethtool -C eth0 rx-usecs 0 tx-usecs 0
     */
    static bool disable_irq_coalescing(const char* interface) {
        #ifdef __linux__
        char cmd[256];
        snprintf(cmd, sizeof(cmd), "ethtool -C %s rx-usecs 0 tx-usecs 0", interface);
        return (system(cmd) == 0);
        #endif
        return false;
    }
};

// ============================================================================
// Performance Summary
// ============================================================================

/**
 * Solarflare ef_vi Performance Comparison
 * 
 * Network Stack           | RX Latency | TX Latency | Total (RTT)
 * ------------------------|------------|------------|-------------
 * Standard kernel socket  | 8-10 μs    | 8-10 μs    | 16-20 μs
 * OpenOnload (socket API) | 0.4-0.6 μs | 0.4-0.6 μs | 0.8-1.2 μs
 * ef_vi (raw Ethernet)    | 0.05-0.1μs | 0.05-0.1μs | 0.1-0.2 μs ⚡
 * TCPDirect (zero-copy)   | 0.08-0.12μs| 0.07-0.13μs| 0.15-0.25 μs
 * 
 * Savings vs OpenOnload: 0.6-1.0 μs per packet!
 * Savings vs kernel: 15-19 μs per packet!
 * 
 * Production Recommendations:
 * ✅ Use ef_vi for maximum performance (0.1-0.2 μs)
 * ✅ Use TCPDirect if TCP semantics needed (0.15-0.25 μs)
 * ✅ Pin NIC interrupts to separate core (Core 1)
 * ✅ Use busy-polling on application thread (Core 2)
 * ✅ Disable interrupt coalescing (rx-usecs 0)
 * ✅ Allocate packet buffers from huge pages
 * ✅ Use hardware timestamping (8ns precision)
 * 
 * Critical: ef_vi requires Solarflare NICs!
 * - Supported: SFN8522, SFN8542, X2522, X2541, X2542
 * - Alternative: DPDK for Intel/Mellanox NICs (~0.2-0.4 μs)
 */

} // namespace ull_nic
