import { Metadata } from 'next'
import { StemSplitterInterface } from '@/components/stem-splitter/StemSplitterInterface'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Stem Splitter - AI Audio Separation Tool',
  description: 'Upload your audio file and separate it into individual stems: vocals, drums, bass, guitar, and piano. Professional AI-powered audio separation in seconds.',
  keywords: [
    'stem splitter',
    'audio separator',
    'vocal remover',
    'music separation',
    'AI audio processing',
    'extract vocals',
    'separate drums',
    'audio stem extraction'
  ],
  openGraph: {
    title: 'Stem Splitter - AI Audio Separation Tool',
    description: 'Upload your audio file and separate it into individual stems with AI-powered precision.',
    images: ['/og-stem-splitter.jpg'],
  },
}

export default function StemSplitterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <StemSplitterInterface />
      </main>
      <Footer />
    </div>
  )
}
