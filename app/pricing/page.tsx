import { Metadata } from 'next'
import { PricingSection } from '@/components/landing/PricingSection'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Pricing - AI Stem Splitter Plans',
  description: 'Choose the perfect plan for your audio separation needs. Free trial available with 5 files per month. Pro plans start at $19/month with unlimited processing.',
  keywords: [
    'stem splitter pricing',
    'audio separation plans',
    'music production tools pricing',
    'AI audio processing cost',
    'stem separation subscription'
  ],
  openGraph: {
    title: 'Pricing - AI Stem Splitter Plans',
    description: 'Choose the perfect plan for your audio separation needs. Free trial available.',
    images: ['/og-pricing.jpg'],
  },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
