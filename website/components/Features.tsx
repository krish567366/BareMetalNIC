'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, Code2, Cpu, HardDrive, Lock } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: '20-50ns Latency',
    description: 'custom_nic_driver.hpp: Direct memory-mapped NIC descriptor rings. Zero function call overhead. Inline assembly for critical paths.',
  },
  {
    icon: Shield,
    title: 'VFIO/IOMMU Security',
    description: 'kernel_bypass_nic.hpp: Secure userspace hardware access with DMA memory protection. No kernel corruption risks unlike UIO.',
  },
  {
    icon: Code2,
    title: 'Header-Only Library',
    description: 'Five production drivers included: custom_nic_driver.hpp (fastest), broadcom_netxtreme.hpp (BCM575xx/588xx), hardware_bridge.hpp (portable), kernel_bypass_nic.hpp (secure), solarflare_efvi.hpp (vendor).',
  },
  {
    icon: Cpu,
    title: 'Zero Abstraction',
    description: 'Template metaprogramming compiles to direct MMIO register reads/writes. No virtual calls, no indirection, no runtime overhead.',
  },
  {
    icon: HardDrive,
    title: 'Multi-NIC Support',
    description: 'hardware_bridge.hpp auto-detects NIC type (Intel X710/X722, Mellanox ConnectX-5/6, Broadcom NetXtreme BCM575xx/588xx, Solarflare X2522/X2542) and loads optimal driver.',
  },
  {
    icon: Lock,
    title: 'Production Ready',
    description: 'Battle-tested at 14.88 Mpps in HFT systems. Comprehensive inline documentation with setup scripts and performance tuning guides.',
  },
]

export function Features() {
  return (
    <section className="py-20 bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Enterprise-Grade Performance
          </h2>
          <p className="text-xl text-gray-600 mb-16 text-center max-w-3xl mx-auto">
            Production-tested features designed for the most demanding low-latency applications.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Hardware Support Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Supported Hardware</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Vendor</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Model</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Driver</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">RX Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Intel</td>
                    <td className="px-6 py-4 text-sm text-gray-700">X710 / X722</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-mono">custom_driver.hpp</td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">20-50ns</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Mellanox</td>
                    <td className="px-6 py-4 text-sm text-gray-700">ConnectX-5 / ConnectX-6</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-mono">custom_driver.hpp</td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">20-50ns</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Solarflare</td>
                    <td className="px-6 py-4 text-sm text-gray-700">X2522 / X2542</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-mono">solarflare_efvi.hpp</td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">100-200ns</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
