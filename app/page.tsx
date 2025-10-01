import { Metadata } from 'next'
import { HeroSection } from '@/components/landing/HeroSection'
import { HomeStemSplitter } from '@/components/landing/HomeStemSplitter'
import { InteractiveDemoSection } from '@/components/interactive-demo/InteractiveDemoSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { FAQSection } from '@/components/landing/FAQSection'
import { CTASection } from '@/components/landing/CTASection'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'AI Stem Splitter - Professional Audio Separation Tool',
  description: 'Extract vocals, drums, bass, guitar, and piano from any song with AI-powered precision. Fast, high-quality audio stem separation for music producers, DJs, and content creators.',
  keywords: [
    'stem splitter',
    'audio separator',
    'vocal remover',
    'music separation',
    'AI audio processing',
    'extract vocals from music',
    'separate drums from song',
    'audio stem extraction',
    'music production tools',
    'DJ tools'
  ],
  openGraph: {
    title: 'AI Stem Splitter - Professional Audio Separation Tool',
    description: 'Extract vocals, drums, bass, guitar, and piano from any song with AI-powered precision.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    title: 'AI Stem Splitter - Professional Audio Separation Tool',
    description: 'Extract vocals, drums, bass, guitar, and piano from any song with AI-powered precision.',
    images: ['/og-image.jpg'],
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HomeStemSplitter />
        <HeroSection />
        <InteractiveDemoSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
