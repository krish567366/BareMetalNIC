'use client'

import { motion } from 'framer-motion'
import { Github, Terminal, Code } from 'lucide-react'

export function Hero() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-border">
      <div className="max-w-7xl mx-auto">
        {/* Two Column Layout: Desktop */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* LEFT COLUMN: Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 md:pr-12"
          >
            {/* ASCII Logo */}
            <pre className="text-xs md:text-sm mb-8 text-muted-foreground font-mono">
{`╔═══════════════════════════════════╗
║  ULL NIC DRIVERS                  ║
╚═══════════════════════════════════╝`}
            </pre>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ultra-Low Latency <br />
              <span className="relative inline-block">
                NIC Drivers
                <span className="absolute bottom-0 left-0 right-0 h-2 bg-black/10 -z-10"></span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Zero-abstraction, memory-mapped hardware access for x86_64 and ARM64 platforms. 
              Supports Intel X710, Mellanox ConnectX, Broadcom NetXtreme, and Solarflare NICs. 
              Built for HFT and performance-critical applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="https://github.com/krish567366/BareMetalNIC"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground text-background px-8 py-4 rounded-none font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
              <a
                href="#quickstart"
                className="bg-secondary border-2 border-border px-8 py-4 rounded-none font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Terminal className="w-5 h-5" />
                Quick Start
              </a>
            </div>

            {/* Developer Tag */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Code className="w-4 h-4" />
              <span>Built by Krishna Bajpai • Header-only C++17 • x86_64 + ARM64 • Production-ready</span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            {/* Hero Metric Card */}
            <div className="bg-secondary border-2 border-border rounded-none p-8 mb-6">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2 text-foreground">
                  20-50ns
                </div>
                <p className="text-lg text-muted-foreground mb-4">
                  median RX latency
                </p>
                <p className="text-sm text-muted-foreground">
                  Direct memory-mapped descriptor ring access
                </p>
              </div>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <StatCard number="14.88" label="Mpps" subtitle="Throughput" />
              <StatCard number="3-5ns" label="RDTSC" subtitle="Timestamp" />
              <StatCard number="0" label="Copy" subtitle="Zero-copy" />
            </div>

            {/* Comparison Badge */}
            <div className="bg-background border-2 border-border rounded-none p-4 text-center">
              <p className="text-sm font-semibold">
                <span className="text-foreground">10x faster</span> than DPDK • 
                <span className="text-foreground"> 400x faster</span> than kernel
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ 
  number, 
  label, 
  subtitle 
}: { 
  number: string; 
  label: string; 
  subtitle?: string;
}) {
  return (
    <div className="bg-background border-2 border-border rounded-none p-4 text-center hover:shadow-md transition-all">
      <div className="text-2xl font-bold text-foreground mb-1">
        {number}
      </div>
      <div className="text-xs text-muted-foreground">
        {label}
      </div>
      {subtitle && (
        <div className="text-xs text-muted-foreground/70 mt-1">
          {subtitle}
        </div>
      )}
    </div>
  )
}
