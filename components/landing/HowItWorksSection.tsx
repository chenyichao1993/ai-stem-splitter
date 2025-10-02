'use client'

import { motion } from 'framer-motion'
import { Upload, Zap, Download, ArrowRight } from 'lucide-react'

const steps = [
  {
    id: 1,
    name: 'Upload Audio',
    description: 'Drag and drop your audio file or click to browse. We support MP3, MP4, WAV, FLAC, M4A, and AAC formats up to 50MB.',
    icon: Upload,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 2,
    name: 'AI Processing',
    description: 'Our advanced AI algorithms analyze and separate your audio into individual stems: vocals, drums, bass, guitar, and piano.',
    icon: Zap,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    id: 3,
    name: 'Download Results',
    description: 'Preview and download your separated stems individually or as a complete package. All files are automatically deleted after 24 hours.',
    icon: Download,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
]

export function HowItWorksSection() {
  return (
    <div className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl lg:text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              How it works
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Three simple steps to perfect audio separation
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our streamlined process makes professional audio separation accessible to everyone, 
              from beginners to industry professionals.
            </p>
          </motion.div>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-full ${step.bgColor} mb-6`}>
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white text-sm font-semibold">
                      {step.id}
                    </span>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">
                      {step.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Demo section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 hidden"
        >
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                See it in action
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Watch how easy it is to separate audio stems with our AI-powered tool. 
                From upload to download in under a minute.
              </p>
            </div>
            
            {/* Interactive demo placeholder */}
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-600 font-medium">Interactive Demo</p>
                  <p className="text-sm text-gray-500 mt-1">Click to try the stem splitter</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
