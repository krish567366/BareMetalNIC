#pragma once

#include <cstdint>
#include <ctime>
#include <chrono>

/**
 * @file common_types.hpp
 * @brief Common types and utilities for Ultra-Low-Latency NIC drivers
 * @author Krishna Bajpai
 * @version 1.0.0
 * 
 * This file provides general-purpose types for high-performance networking.
 * No domain-specific assumptions - suitable for any low-latency application.
 */

namespace ull_nic {

// ============================================================================
// High-Resolution Timestamp Utilities
// ============================================================================

/**
 * @brief Get current high-resolution timestamp
 * @return Timestamp in CPU cycles (x86) or nanoseconds (other platforms)
 * 
 * On x86_64: Uses RDTSC instruction (~3-5ns latency)
 * Other platforms: Falls back to std::chrono (~50-100ns latency)
 */
inline uint64_t get_timestamp() {
    #if defined(__x86_64__) || defined(__i386__)
    // Use TSC (Time Stamp Counter) for lowest latency
    // Note: Requires constant_tsc CPU feature (available on all modern CPUs)
    return __rdtsc();
    #else
    // Fallback to std::chrono for non-x86 platforms
    auto now = std::chrono::high_resolution_clock::now();
    return std::chrono::duration_cast<std::chrono::nanoseconds>(
        now.time_since_epoch()
    ).count();
    #endif
}

/**
 * @brief Convert TSC ticks to nanoseconds
 * @param ticks TSC ticks from RDTSC instruction
 * @param tsc_freq TSC frequency in Hz (typically 2-4 GHz)
 * @return Nanoseconds
 * 
 * To calibrate TSC frequency on Linux:
 * cat /sys/devices/system/cpu/cpu0/cpufreq/base_frequency
 */
inline uint64_t tsc_to_ns(uint64_t ticks, uint64_t tsc_freq = 2'800'000'000) {
    return (ticks * 1'000'000'000) / tsc_freq;
}

/**
 * @brief Get wall-clock nanoseconds since epoch
 * @return Nanoseconds since Unix epoch (1970-01-01 00:00:00 UTC)
 */
inline uint64_t get_wall_time_ns() {
    auto now = std::chrono::system_clock::now();
    return std::chrono::duration_cast<std::chrono::nanoseconds>(
        now.time_since_epoch()
    ).count();
}

// ============================================================================
// Packet Statistics Structure
// ============================================================================

/**
 * @struct PacketStats
 * @brief Generic packet reception/transmission statistics
 */
struct PacketStats {
    uint64_t packets_received;   ///< Total packets received
    uint64_t packets_transmitted; ///< Total packets transmitted
    uint64_t bytes_received;      ///< Total bytes received
    uint64_t bytes_transmitted;   ///< Total bytes transmitted
    uint64_t rx_errors;           ///< Receive errors
    uint64_t tx_errors;           ///< Transmit errors
    uint64_t rx_dropped;          ///< Packets dropped on receive
    uint64_t tx_dropped;          ///< Packets dropped on transmit
    
    PacketStats() 
        : packets_received(0)
        , packets_transmitted(0)
        , bytes_received(0)
        , bytes_transmitted(0)
        , rx_errors(0)
        , tx_errors(0)
        , rx_dropped(0)
        , tx_dropped(0)
    {}
};

// ============================================================================
// Generic Packet Buffer
// ============================================================================

/**
 * @struct PacketBuffer
 * @brief Generic network packet buffer
 * 
 * This structure is cache-line aligned for optimal performance.
 * Default size accommodates jumbo frames (9KB).
 */
struct alignas(64) PacketBuffer {
    static constexpr size_t MAX_PACKET_SIZE = 9216;  ///< Jumbo frame size
    
    uint64_t timestamp;          ///< Receipt/transmission timestamp
    uint16_t length;             ///< Actual packet length in bytes
    uint16_t flags;              ///< Packet flags (custom usage)
    uint32_t sequence;           ///< Sequence number (optional)
    uint8_t  data[MAX_PACKET_SIZE]; ///< Packet data
    
    PacketBuffer() 
        : timestamp(0)
        , length(0)
        , flags(0)
        , sequence(0)
    {}
};

} // namespace ull_nic
