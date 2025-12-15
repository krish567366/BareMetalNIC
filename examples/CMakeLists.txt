# Examples CMakeLists.txt

# Common example settings
set(EXAMPLE_COMPILE_OPTIONS
    ${ARCH_FLAGS}
    ${PERF_FLAGS}
    -Wall
    -Wextra
    -Wpedantic
)

# Basic usage example
add_executable(basic_usage basic_usage.cpp)
target_link_libraries(basic_usage PRIVATE ull_nic)
target_compile_options(basic_usage PRIVATE ${EXAMPLE_COMPILE_OPTIONS})

# Solarflare ef_vi example
add_executable(solarflare_example solarflare_example.cpp)
target_link_libraries(solarflare_example PRIVATE ull_nic)
target_compile_options(solarflare_example PRIVATE ${EXAMPLE_COMPILE_OPTIONS})

# Performance test
add_executable(performance_test performance_test.cpp)
target_link_libraries(performance_test PRIVATE ull_nic)
target_compile_options(performance_test PRIVATE ${EXAMPLE_COMPILE_OPTIONS})

# Latency benchmark
add_executable(latency_benchmark latency_benchmark.cpp)
target_link_libraries(latency_benchmark PRIVATE ull_nic)
target_compile_options(latency_benchmark PRIVATE ${EXAMPLE_COMPILE_OPTIONS})

# Install examples
install(TARGETS
    basic_usage
    solarflare_example
    performance_test
    latency_benchmark
    DESTINATION bin/examples
)
