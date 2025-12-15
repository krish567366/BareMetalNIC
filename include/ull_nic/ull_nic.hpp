#pragma once

/**
 * @file ull_nic.hpp
 * @brief Ultra-Low-Latency NIC Drivers - Main Header
 * @author Krishna Bajpai
 * @version 1.0.0
 * 
 * This is the main include file for the Ultra-Low-Latency NIC Drivers library.
 * Include this file to get access to all available drivers and utilities.
 * 
 * Example usage:
 * ```cpp
 * #include <ull_nic/ull_nic.hpp>
 * 
 * int main() {
 *     // Use custom driver for maximum performance
 *     ull_nic::CustomNICDriver nic;
 *     nic.initialize("/sys/bus/pci/devices/0000:01:00.0/resource0");
 *     
 *     // Or use Solarflare ef_vi
 *     ull_nic::SolarflareEFVI efvi;
 *     efvi.initialize("eth0");
 * }
 * ```
 */

// Common types and utilities
#include "common_types.hpp"

// Driver implementations
#include "custom_driver.hpp"
#include "solarflare_efvi.hpp"

/**
 * @namespace ull_nic
 * @brief Ultra-Low-Latency NIC drivers namespace
 * 
 * This namespace contains all classes, functions, and types for
 * ultra-low-latency network I/O.
 */
namespace ull_nic {

/**
 * @brief Library version string
 */
constexpr const char* VERSION = "1.0.0";

/**
 * @brief Get library version
 * @return Version string
 */
inline const char* get_version() {
    return VERSION;
}

} // namespace ull_nic
