'use client'

import { motion } from 'framer-motion'
import { Calendar, Cpu, Package, Zap, Shield, Code } from 'lucide-react'

const releases = [
  {
    version: 'v1.1.0',
    date: 'December 16, 2025',
    title: 'Broadcom NetXtreme Support',
    icon: Cpu,
    changes: [
      {
        type: 'new',
        title: 'Broadcom NetXtreme Driver',
        description: 'Added broadcom_netxtreme.hpp with 30-80ns latency support for BCM575xx/588xx series NICs (BCM57504, BCM57508, BCM57414, BCM58800)',
        icon: Package,
      },
      {
        type: 'new',
        title: 'Hardware Timestamping',
        description: 'PTP hardware timestamp support for sub-nanosecond precision timing in Broadcom driver',
        icon: Zap,
      },
      {
        type: 'new',
        title: 'RSS Configuration',
        description: 'Receive Side Scaling support for multi-core packet distribution',
        icon: Code,
      },
      {
        type: 'enhancement',
        title: 'Example Code',
        description: 'Added broadcom_example.cpp demonstrating real-world usage patterns',
        icon: Code,
      },
    ],
  },
  {
    version: 'v1.0.0',
    date: 'December 15, 2025',
    title: 'Initial Public Release',
    icon: Zap,
    changes: [
      {
        type: 'new',
        title: 'Core Drivers Released',
        description: 'Four production drivers: custom_nic_driver.hpp (20-50ns), hardware_bridge.hpp (30-60ns), kernel_bypass_nic.hpp (40-70ns), solarflare_efvi.hpp (100-200ns)',
        icon: Package,
      },
      {
        type: 'new',
        title: 'VFIO/IOMMU Security',
        description: 'Secure kernel bypass with full memory isolation and DMA protection',
        icon: Shield,
      },
      {
        type: 'new',
        title: 'Comprehensive Documentation',
        description: 'Complete API docs, setup guides, performance tuning, and troubleshooting',
        icon: Code,
      },
      {
        type: 'new',
        title: 'Multi-NIC Support',
        description: 'Intel X710/X722, Mellanox ConnectX-5/6, Solarflare X2522/X2542',
        icon: Cpu,
      },
    ],
  },
]

const typeColors = {
  new: 'bg-green-100 text-green-800 border-green-300',
  enhancement: 'bg-blue-100 text-blue-800 border-blue-300',
  fix: 'bg-orange-100 text-orange-800 border-orange-300',
  breaking: 'bg-red-100 text-red-800 border-red-300',
}

export function Changelog() {
  return (
    <section id="changelog" className="py-20 bg-white border-b-2 border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Changelog
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Latest updates and improvements to Ultra-Low-Latency NIC Drivers
            </p>
          </div>

          <div className="space-y-12">
            {releases.map((release, idx) => (
              <motion.div
                key={release.version}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="border-2 border-border rounded-none bg-background"
              >
                {/* Release Header */}
                <div className="bg-foreground text-background p-6 border-b-2 border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-background text-foreground rounded-none border-2 border-background">
                        <release.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{release.version}</h3>
                        <p className="text-sm opacity-80">{release.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{release.date}</span>
                    </div>
                  </div>
                </div>

                {/* Changes List */}
                <div className="p-6 space-y-4">
                  {release.changes.map((change, changeIdx) => (
                    <div
                      key={changeIdx}
                      className="flex gap-4 p-4 border-2 border-border rounded-none hover:bg-muted/10 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-muted rounded-none border-2 border-border">
                          <change.icon className="w-5 h-5 text-foreground" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h4 className="font-bold text-foreground">
                            {change.title}
                          </h4>
                          <span
                            className={`px-3 py-1 text-xs font-bold uppercase border-2 rounded-none whitespace-nowrap ${
                              typeColors[change.type as keyof typeof typeColors]
                            }`}
                          >
                            {change.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {change.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Releases Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <a
              href="https://github.com/krish567366/BareMetalNIC/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-bold border-2 border-foreground rounded-none hover:bg-background hover:text-foreground transition-colors"
            >
              <Calendar className="w-5 h-5" />
              View All Releases on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
