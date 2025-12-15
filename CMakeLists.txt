cmake_minimum_required(VERSION 3.15)
project(UltraLowLatencyNIC VERSION 1.0.0 LANGUAGES CXX)

# ============================================================================
# Project Configuration
# ============================================================================

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# ============================================================================
# Compiler Optimizations for Maximum Performance
# ============================================================================

if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Aggressive optimizations for low-latency performance
set(CMAKE_CXX_FLAGS_RELEASE "-O3 -DNDEBUG")

# Platform-specific optimizations
if(CMAKE_SYSTEM_PROCESSOR MATCHES "x86_64|AMD64")
    set(ARCH_FLAGS "-march=native -mtune=native")
elseif(CMAKE_SYSTEM_PROCESSOR MATCHES "aarch64|ARM64")
    set(ARCH_FLAGS "-mcpu=native")
endif()

# Additional performance flags
set(PERF_FLAGS
    "-flto"                    # Link-time optimization
    "-ffast-math"              # Fast floating-point math
    "-funroll-loops"           # Loop unrolling
    "-finline-functions"       # Aggressive inlining
    "-fomit-frame-pointer"     # Remove frame pointer
    "-falign-functions=64"     # Align functions to cache line
    "-falign-loops=64"         # Align loops to cache line
)

# ============================================================================
# Header-Only Library Target
# ============================================================================

add_library(ull_nic INTERFACE)

target_include_directories(ull_nic INTERFACE
    $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
    $<INSTALL_INTERFACE:include>
)

target_compile_options(ull_nic INTERFACE
    ${ARCH_FLAGS}
    ${PERF_FLAGS}
)

target_compile_features(ull_nic INTERFACE cxx_std_17)

# ============================================================================
# Examples
# ============================================================================

option(BUILD_EXAMPLES "Build example programs" ON)

if(BUILD_EXAMPLES)
    add_subdirectory(examples)
endif()

# ============================================================================
# Benchmarks
# ============================================================================

option(BUILD_BENCHMARKS "Build benchmark programs" ON)

if(BUILD_BENCHMARKS)
    add_subdirectory(benchmarks)
endif()

# ============================================================================
# Tests
# ============================================================================

option(BUILD_TESTS "Build test programs" OFF)

if(BUILD_TESTS)
    enable_testing()
    add_subdirectory(tests)
endif()

# ============================================================================
# Installation
# ============================================================================

install(TARGETS ull_nic
    EXPORT ULLNICTargets
)

install(DIRECTORY include/
    DESTINATION include
    FILES_MATCHING PATTERN "*.hpp"
)

install(EXPORT ULLNICTargets
    FILE ULLNICTargets.cmake
    NAMESPACE ull_nic::
    DESTINATION lib/cmake/ULLNIC
)

# ============================================================================
# Package Configuration
# ============================================================================

include(CMakePackageConfigHelpers)

configure_package_config_file(
    ${CMAKE_CURRENT_SOURCE_DIR}/cmake/ULLNICConfig.cmake.in
    ${CMAKE_CURRENT_BINARY_DIR}/ULLNICConfig.cmake
    INSTALL_DESTINATION lib/cmake/ULLNIC
)

write_basic_package_version_file(
    ${CMAKE_CURRENT_BINARY_DIR}/ULLNICConfigVersion.cmake
    VERSION ${PROJECT_VERSION}
    COMPATIBILITY SameMajorVersion
)

install(FILES
    ${CMAKE_CURRENT_BINARY_DIR}/ULLNICConfig.cmake
    ${CMAKE_CURRENT_BINARY_DIR}/ULLNICConfigVersion.cmake
    DESTINATION lib/cmake/ULLNIC
)

# ============================================================================
# Documentation
# ============================================================================

find_package(Doxygen QUIET)

if(DOXYGEN_FOUND)
    option(BUILD_DOCUMENTATION "Build API documentation" OFF)
    
    if(BUILD_DOCUMENTATION)
        set(DOXYGEN_OUTPUT_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/docs)
        set(DOXYGEN_GENERATE_HTML YES)
        set(DOXYGEN_GENERATE_MAN NO)
        
        doxygen_add_docs(documentation
            ${CMAKE_CURRENT_SOURCE_DIR}/include
            COMMENT "Generating API documentation with Doxygen"
        )
    endif()
endif()

# ============================================================================
# Summary
# ============================================================================

message(STATUS "")
message(STATUS "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
message(STATUS "Ultra-Low-Latency NIC Drivers v${PROJECT_VERSION}")
message(STATUS "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
message(STATUS "")
message(STATUS "Build type:       ${CMAKE_BUILD_TYPE}")
message(STATUS "C++ standard:     C++${CMAKE_CXX_STANDARD}")
message(STATUS "Compiler:         ${CMAKE_CXX_COMPILER_ID} ${CMAKE_CXX_COMPILER_VERSION}")
message(STATUS "Architecture:     ${CMAKE_SYSTEM_PROCESSOR}")
message(STATUS "")
message(STATUS "Options:")
message(STATUS "  BUILD_EXAMPLES:       ${BUILD_EXAMPLES}")
message(STATUS "  BUILD_BENCHMARKS:     ${BUILD_BENCHMARKS}")
message(STATUS "  BUILD_TESTS:          ${BUILD_TESTS}")
if(DOXYGEN_FOUND)
message(STATUS "  BUILD_DOCUMENTATION:  ${BUILD_DOCUMENTATION}")
endif()
message(STATUS "")
message(STATUS "Install prefix:   ${CMAKE_INSTALL_PREFIX}")
message(STATUS "")
message(STATUS "Optimization flags:")
message(STATUS "  ${ARCH_FLAGS}")
message(STATUS "  ${PERF_FLAGS}")
message(STATUS "")
message(STATUS "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
message(STATUS "")
