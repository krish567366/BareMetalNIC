import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SEO } from '@/components/SEO'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://ull-nic.krishnabajpai.me'),
  title: {
    default: 'Ultra-Low-Latency NIC Drivers | 20-50ns Packet Latency | Krishna Bajpai',
    template: '%s | Ultra-Low-Latency NIC Drivers'
  },
  description: 'Zero-abstraction network drivers achieving 20-50ns packet receive latency on x86_64 and ARM64. Direct memory-mapped hardware access for Intel X710, Mellanox ConnectX, Broadcom NetXtreme, and Solarflare NICs. Supports Apple Silicon, AWS Graviton, Ampere Altra. 10x faster than DPDK, 400x faster than kernel sockets. Built by Krishna Bajpai.',
  keywords: [
    'ultra low latency',
    'NIC drivers',
    'ARM64 networking',
    'Apple Silicon networking',
    'AWS Graviton drivers',
    'Ampere Altra networking',
    'kernel bypass',
    'DPDK alternative',
    'direct NIC access',
    'memory mapped IO',
    'zero copy networking',
    'high frequency trading',
    'network performance',
    'VFIO drivers',
    'Broadcom NetXtreme',
    'Solarflare ef_vi',
    'Intel X710',
    'Mellanox ConnectX',
    'Krishna Bajpai',
    'nanosecond latency',
    'packet processing',
    '20ns latency',
    '25ns ARM64',
    'NEON SIMD',
    'custom NIC driver',
    'bare metal networking',
    'hardware acceleration',
    'DMA descriptor ring',
    'poll mode driver',
    'header only library',
    'C++17 networking',
    'IOMMU userspace',
    'network optimization',
    'systems programming',
    'performance engineering',
    'low latency trading',
    'algorithmic trading network',
    'sub-microsecond latency',
    'direct hardware access',
    'network packet capture',
    'fast packet processing',
    'network I/O optimization',
    'RDMA alternative',
    '10 gigabit ethernet',
    '25 gigabit ethernet',
    '100 gigabit ethernet',
    'network driver development',
    'Linux network stack bypass',
    'userspace networking',
    'zero overhead networking',
    'production ready NIC drivers',
    'HFT network stack',
    'financial trading infrastructure',
    'market data feed',
    'order execution latency',
    'network hardware programming',
    'PCI Express networking',
  ],
  authors: [{ name: 'Krishna Bajpai', url: 'https://krishnabajpai.me' }],
  creator: 'Krishna Bajpai',
  publisher: 'Krishna Bajpai',
  category: 'Technology',
  classification: 'Network Drivers, Systems Programming, Performance Engineering',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ull-nic.krishnabajpai.me',
    title: 'Ultra-Low-Latency NIC Drivers - 20-50ns Packet Latency',
    description: 'Zero-abstraction network drivers achieving 20-50ns packet latency on x86_64 and ARM64 (Apple Silicon, AWS Graviton, Ampere Altra). 10x faster than DPDK, 400x faster than kernel sockets. Direct memory-mapped hardware access for Intel X710, Mellanox ConnectX, Broadcom NetXtreme, Solarflare.',
    siteName: 'Ultra-Low-Latency NIC Drivers',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ultra-Low-Latency NIC Drivers - 20-50ns packet latency performance',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ultra-Low-Latency NIC Drivers | 20-50ns Latency',
    description: 'Zero-abstraction network drivers for x86_64 and ARM64. 10x faster than DPDK. Direct memory-mapped hardware access for sub-microsecond packet processing on Apple Silicon, AWS Graviton, Intel X710, Mellanox ConnectX, Broadcom NetXtreme.',
    creator: '@krishnabajpai',
    site: '@krishnabajpai',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://ull-nic.krishnabajpai.me',
  },
  verification: {
    google: 'google-site-verification-placeholder',
    yandex: 'yandex-verification-placeholder',
    other: {
      'msvalidate.01': 'bing-verification-placeholder',
    },
  },
  other: {
    'revisit-after': '7 days',
    'rating': 'General',
    'distribution': 'Global',
    'coverage': 'Worldwide',
    'target': 'Developers, Systems Engineers, Network Engineers, HFT Developers, Performance Engineers',
    'language': 'English',
    'geo.region': 'GLOBAL',
    'geo.position': 'Worldwide',
    'ICBM': 'Worldwide',
    'topic': 'Network Drivers, Kernel Bypass, High-Performance Computing, Systems Programming',
    'audience': 'Developers',
    'content-language': 'en',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <SEO />
        <link rel="canonical" href="https://ull-nic.krishnabajpai.me" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ULL NIC Drivers" />
        <meta name="application-name" content="Ultra-Low-Latency NIC Drivers" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
