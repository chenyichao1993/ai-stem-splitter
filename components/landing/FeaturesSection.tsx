'use client'

import { motion } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  Clock, 
  Download, 
  Headphones, 
  Music,
  Globe,
  Smartphone
} from 'lucide-react'

const features = [
  {
    name: 'Lightning Fast Processing',
    description: 'Process your audio files in seconds, not minutes. Our optimized AI algorithms deliver results quickly without compromising quality.',
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  {
    name: 'Privacy & Security',
    description: 'Your files are processed securely and automatically deleted after processing. We never store or share your audio content.',
    icon: Shield,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    name: 'No Software Required',
    description: 'Works entirely in your browser. No downloads, installations, or system requirements. Access from any device, anywhere.',
    icon: Globe,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'High-Quality Output',
    description: 'Get professional-grade separation results with minimal artifacts. Perfect for music production, remixing, and content creation.',
    icon: Headphones,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    name: 'Multiple Formats',
    description: 'Support for MP3, MP4, WAV, FLAC, M4A, and AAC files. Download your separated stems in your preferred format.',
    icon: Download,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
  {
    name: 'Mobile Optimized',
    description: 'Fully responsive design that works perfectly on desktop, tablet, and mobile devices. Process audio on the go.',
    icon: Smartphone,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
  },
]

export function FeaturesSection() {
  return (
    <div className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              Powerful Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for professional audio separation
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our AI-powered platform combines cutting-edge technology with user-friendly design 
              to deliver the best audio separation experience available.
            </p>
          </motion.div>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.bgColor}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
        
        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">99.9%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">&lt;30s</div>
            <div className="text-sm text-gray-600">Average Processing</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">50+</div>
            <div className="text-sm text-gray-600">Supported Formats</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">24/7</div>
            <div className="text-sm text-gray-600">Support</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
