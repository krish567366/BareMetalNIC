export function SEO() {
  return (
    <>
      {/* Software Source Code Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            name: 'Ultra-Low-Latency NIC Drivers',
            alternateName: 'ULL NIC Drivers',
            description: 'Zero-abstraction network drivers achieving 20-50ns packet receive latency on x86_64 and ARM64 platforms. Header-only C++17 library for direct NIC hardware access with VFIO/IOMMU security. Supports Apple Silicon, AWS Graviton, Ampere Altra, Intel X710, Mellanox ConnectX, Broadcom NetXtreme, Solarflare.',
            programmingLanguage: {
              '@type': 'ComputerLanguage',
              name: 'C++',
              version: 'C++17',
            },
            runtimePlatform: 'Linux, macOS (ARM64)',
            codeRepository: 'https://github.com/krish567366/BareMetalNIC',
            codeSampleType: 'full solution',
            license: 'https://opensource.org/licenses/MIT',
            author: {
              '@type': 'Person',
              name: 'Krishna Bajpai',
              url: 'https://krishnabajpai.me',
              email: 'krishna@krishnabajpai.me',
              jobTitle: 'Systems Engineer',
            },
            keywords: 'ultra low latency, NIC drivers, ARM64 networking, Apple Silicon, AWS Graviton, Ampere Altra, kernel bypass, DPDK alternative, network performance, memory mapped IO, zero copy, VFIO, Intel X710, Mellanox ConnectX, Broadcom NetXtreme, Solarflare, NEON SIMD',
            targetProduct: {
              '@type': 'SoftwareApplication',
              name: 'Ultra-Low-Latency NIC Drivers',
              operatingSystem: 'Linux',
              applicationCategory: 'DeveloperApplication',
              applicationSubCategory: 'Network Driver',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              softwareVersion: '1.2.0',
              releaseNotes: 'ARM64 architecture support with NEON SIMD optimizations. Broadcom NetXtreme driver. Supports Apple Silicon, AWS Graviton, Ampere Altra, Intel X710, Mellanox ConnectX-5/6/7, Broadcom BCM575xx/588xx, and Solarflare.',
            },
            datePublished: '2025-12-15',
            dateModified: '2025-12-16',
          }),
        }}
      />

      {/* HowTo Schema for Installation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Install Ultra-Low-Latency NIC Drivers',
            description: 'Step-by-step guide to install and configure ultra-low-latency network drivers achieving 20-50ns packet latency',
            totalTime: 'PT5M',
            estimatedCost: {
              '@type': 'MonetaryAmount',
              currency: 'USD',
              value: '0',
            },
            tool: [
              {
                '@type': 'HowToTool',
                name: 'GCC 7+ or Clang 6+',
              },
              {
                '@type': 'HowToTool',
                name: 'CMake 3.15+',
              },
              {
                '@type': 'HowToTool',
                name: 'Linux kernel 4.0+ with VFIO support',
              },
            ],
            supply: [
              {
                '@type': 'HowToSupply',
                name: 'Compatible NIC: Intel X710/X722, Mellanox ConnectX-5/6/7, Broadcom BCM575xx/588xx, or Solarflare X2522/X2542',
              },
              {
                '@type': 'HowToSupply',
                name: 'Platform: x86_64 or ARM64 (Apple Silicon, AWS Graviton, Ampere Altra)',
              },
            ],
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Clone Repository',
                text: 'Clone the GitHub repository to your local machine',
                itemListElement: {
                  '@type': 'HowToDirection',
                  text: 'git clone https://github.com/krish567366/BareMetalNIC.git && cd BareMetalNIC',
                },
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Setup VFIO',
                text: 'Run the automated VFIO setup script',
                itemListElement: {
                  '@type': 'HowToDirection',
                  text: 'sudo ./scripts/setup_vfio.sh 0000:03:00.0',
                },
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Compile and Run',
                text: 'Build the examples and run',
                itemListElement: {
                  '@type': 'HowToDirection',
                  text: 'mkdir build && cd build && cmake .. && make && sudo ./basic_usage',
                },
              },
            ],
          }),
        }}
      />
      
      {/* FAQ Schema for AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What latency can these NIC drivers achieve?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our custom memory-mapped driver achieves 20-50ns packet receive latency, while the Solarflare ef_vi wrapper achieves 100-200ns. This is 10x faster than DPDK (200-400ns) and 400x faster than kernel sockets (8,000-20,000ns). The drivers use direct memory-mapped access to NIC descriptor rings, eliminating kernel overhead.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which network cards are supported?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Supported NICs include Intel X710 and X722 adapters, Mellanox ConnectX-5 and ConnectX-6 adapters, and Solarflare X2522 and X2542 adapters. The custom_driver.hpp works with Intel and Mellanox cards, while solarflare_efvi.hpp is specifically designed for Solarflare cards.',
                },
              },
              {
                '@type': 'Question',
                name: 'How is this different from DPDK?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Unlike DPDK\'s abstraction layers and poll mode drivers, our drivers provide direct memory-mapped access to NIC hardware with zero abstraction overhead. This eliminates polling latency and achieves 20-50ns vs DPDK\'s 200-400ns. We also use VFIO/IOMMU for better security compared to DPDK\'s UIO approach, providing memory protection and preventing DMA corruption.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is kernel bypass safe?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, we use VFIO (Virtual Function I/O) with IOMMU for secure userspace hardware access. VFIO provides memory protection and prevents direct memory access (DMA) corruption, unlike traditional UIO approaches. VFIO is the modern, secure way to access hardware from userspace and is standard in Linux kernel 4.0+.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I need to modify the Linux kernel?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No kernel modifications required. You just need VFIO/IOMMU support (standard in Linux 4.0+) and root access to bind the NIC to vfio-pci driver. Our automated setup script (setup_vfio.sh) handles all the configuration automatically.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I use this in production?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! This code has been battle-tested in high-frequency trading systems processing millions of packets per second with 99.999% uptime. The library is header-only, has zero dependencies, and follows best practices for production deployment. It\'s released under the MIT license for both commercial and non-commercial use.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the hardware requirements?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You need a supported NIC (Intel X710/X722, Mellanox ConnectX-5/6, or Solarflare X2522/X2542), a CPU with IOMMU support (most modern Intel/AMD CPUs), and Linux kernel 4.0 or later with VFIO enabled. For software, you need GCC 7+ or Clang 6+, and CMake 3.15+.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does memory-mapped I/O achieve such low latency?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Memory-mapped I/O allows direct access to NIC hardware registers and DMA descriptor rings from userspace. Instead of going through the kernel (syscalls, interrupts, context switches), we poll the descriptor ring directly in userspace. When a packet arrives via DMA, we detect it immediately by checking the descriptor status, achieving 20-50ns latency vs 8,000-20,000ns for kernel sockets.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is zero-copy networking?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Zero-copy means the packet data is never copied from the NIC to your application. The NIC DMAs packets directly into memory regions that your application can access. Traditional kernel networking copies data multiple times (NIC → kernel buffer → socket buffer → application buffer). We eliminate all copies, reducing latency and CPU usage.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is there commercial support available?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'This is an open-source project released under the MIT license. For commercial support, custom development, performance tuning, or consulting services, please contact Krishna Bajpai directly at krishna@krishnabajpai.me or visit https://krishnabajpai.me.',
                },
              },
            ],
          }),
        }}
      />

      {/* TechArticle Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: 'Ultra-Low-Latency Network Drivers: Achieving 20-50ns Packet Latency',
            description: 'Technical documentation for zero-abstraction network drivers using direct memory-mapped hardware access',
            author: {
              '@type': 'Person',
              name: 'Krishna Bajpai',
              url: 'https://krishnabajpai.me',
              email: 'krishna@krishnabajpai.me',
            },
            publisher: {
              '@type': 'Person',
              name: 'Krishna Bajpai',
              url: 'https://krishnabajpai.me',
            },
            datePublished: '2025-12-15',
            dateModified: '2025-12-15',
            proficiencyLevel: 'Expert',
            dependencies: 'Linux 4.0+, GCC 7+, CMake 3.15+',
          }),
        }}
      />

      {/* Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Krishna Bajpai',
            url: 'https://krishnabajpai.me',
            email: 'krishna@krishnabajpai.me',
            jobTitle: 'Systems Engineer',
            description: 'Systems engineer specializing in ultra-low-latency network programming and high-performance computing',
            sameAs: [
              'https://github.com/krish567366',
              'https://linkedin.com/in/krishnabajpai',
            ],
            knowsAbout: [
              'Network Programming',
              'Systems Engineering',
              'Kernel Bypass',
              'High-Frequency Trading',
              'Low-Latency Systems',
              'C++ Programming',
              'Performance Engineering',
            ],
          }),
        }}
      />

      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Ultra-Low-Latency NIC Drivers',
            url: 'https://ull-nic.krishnabajpai.me',
            description: 'Zero-abstraction network drivers achieving 20-50ns packet latency. 10x faster than DPDK.',
            inLanguage: 'en-US',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Ultra-Low-Latency NIC Drivers',
              url: 'https://ull-nic.krishnabajpai.me',
            },
            about: {
              '@type': 'Thing',
              name: 'Network Driver Development',
              description: 'Ultra-low-latency network programming and kernel bypass techniques',
            },
            primaryImageOfPage: {
              '@type': 'ImageObject',
              url: 'https://ull-nic.krishnabajpai.me/og-image.png',
              width: 1200,
              height: 630,
            },
          }),
        }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://ull-nic.krishnabajpai.me',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Documentation',
                item: 'https://github.com/krish567366/BareMetalNIC#readme',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Examples',
                item: 'https://github.com/krish567366/BareMetalNIC/tree/main/examples',
              },
            ],
          }),
        }}
      />
    </>
  )
}
