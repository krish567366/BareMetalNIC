'use client'

import { Hero } from '@/components/Hero'
import { ArchitecturePipeline } from '@/components/ArchitecturePipeline'
import { Features } from '@/components/Features'
import { PerformanceCharts } from '@/components/PerformanceCharts'
import { InteractiveDemo } from '@/components/InteractiveDemo'
import { UseCases } from '@/components/UseCases'
import { QuickStart } from '@/components/QuickStart'
import { Changelog } from '@/components/Changelog'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Hero />
      <ArchitecturePipeline />
      <Features />
      <PerformanceCharts />
      <InteractiveDemo />
      <UseCases />
      <QuickStart />
      <Changelog />
      <FAQ />
      <Footer />
    </main>
  )
}
