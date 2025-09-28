import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: {
    default: 'AI Stem Splitter - Separate Vocals, Drums, Bass & More',
    template: '%s | AI Stem Splitter'
  },
  description: 'Professional AI-powered audio stem separation tool. Extract vocals, drums, bass, guitar, and piano from any song with high quality and fast processing.',
  keywords: ['stem splitter', 'audio separator', 'vocal remover', 'music separation', 'AI audio', 'audio processing'],
  authors: [{ name: 'AI Stem Splitter Team' }],
  creator: 'AI Stem Splitter',
  publisher: 'AI Stem Splitter',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ai-stem-splitter.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-stem-splitter.com',
    title: 'AI Stem Splitter - Professional Audio Separation Tool',
    description: 'Extract vocals, drums, bass, guitar, and piano from any song with AI-powered precision. Fast, high-quality audio stem separation.',
    siteName: 'AI Stem Splitter',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Stem Splitter - Professional Audio Separation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Stem Splitter - Professional Audio Separation Tool',
    description: 'Extract vocals, drums, bass, guitar, and piano from any song with AI-powered precision.',
    images: ['/og-image.jpg'],
    creator: '@aistemsplitter',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-50 font-sans">
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
