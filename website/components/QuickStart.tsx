'use client'

import { motion } from 'framer-motion'
import { Terminal, Download, Settings } from 'lucide-react'

const steps = [
  {
    icon: Download,
    title: 'Clone Repository',
    code: 'git clone https://github.com/krish567366/BareMetalNIC.git\ncd BareMetalNIC',
  },
  {
    icon: Settings,
    title: 'Setup VFIO',
    code: 'sudo ./scripts/setup_vfio.sh 0000:03:00.0',
  },
  {
    icon: Terminal,
    title: 'Include & Compile',
    code: 'g++ -std=c++17 -O3 -march=native -I./include \\\n  -o my_app main.cpp\nsudo ./my_app',
  },
]

const codeExample = `#include <ull_nic/custom_nic_driver.hpp>

int main() {
  CustomNICDriver nic;
  nic.initialize("/sys/bus/pci/devices/0000:01:00.0/resource0");
  
  nic.busy_wait_loop([](uint8_t* packet, size_t len) {
    // Your 20-50ns packet processing here
  });
}`

export function QuickStart() {
  return (
    <section id="quickstart" className="py-20 bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Get Started in 60 Seconds
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Three simple steps to achieve 20-50ns packet latency.
          </p>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="bg-gray-800 px-6 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-400">Step {index + 1}</div>
                    <div className="text-lg font-bold text-white">{step.title}</div>
                  </div>
                </div>
                <div className="bg-gray-900 p-6">
                  <pre className="font-mono text-sm text-green-400 overflow-x-auto">
                    {step.code}
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Code Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg"
          >
            <div className="bg-gray-800 px-6 py-4">
              <div className="text-lg font-bold text-white">Minimal Example</div>
              <div className="text-sm text-gray-400">Production driver - custom_nic_driver.hpp</div>
            </div>
            <div className="bg-gray-900 p-6">
              <pre className="font-mono text-sm text-green-400 overflow-x-auto">
                {codeExample}
              </pre>
            </div>
          </motion.div>

          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-white border border-gray-200 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="font-semibold text-gray-900 mb-2">Software</div>
                <ul className="space-y-1 text-gray-600">
                  <li>• Linux kernel 4.0+ (VFIO support)</li>
                  <li>• GCC 7+ or Clang 6+</li>
                  <li>• CMake 3.15+</li>
                  <li>• Root access (for VFIO setup)</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-2">Hardware</div>
                <ul className="space-y-1 text-gray-600">
                  <li>• Intel X710/X722 NIC, or</li>
                  <li>• Mellanox ConnectX-5/6, or</li>
                  <li>• Broadcom BCM575xx/588xx, or</li>
                  <li>• Solarflare X2522/X2542</li>
                  <li>• IOMMU-capable CPU</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Documentation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="https://github.com/krish567366/BareMetalNIC/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-center transition-colors"
            >
              Full Documentation →
            </a>
            <a
              href="https://github.com/krish567366/BareMetalNIC/tree/main/examples"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 rounded-lg font-semibold text-center transition-colors"
            >
              View Examples →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
