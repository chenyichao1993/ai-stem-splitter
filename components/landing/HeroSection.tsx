'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, Upload, Zap, Shield, Clock } from 'lucide-react'

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Separate Audio with{' '}
                <span className="text-gradient">AI Precision</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Extract vocals, drums, bass, guitar, and piano from any song with professional-grade AI technology. 
                Fast, accurate, and easy to use for music producers, DJs, and content creators.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start"
            >
              <Link
                href="/stem-splitter"
                className="btn-primary text-lg px-8 py-3 flex items-center"
              >
                Start Free Trial
                <Upload className="ml-2 h-5 w-5" />
              </Link>
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-gray-200 hover:ring-primary-300 transition-all">
                  <Play className="h-5 w-5 text-primary-600 ml-1" />
                </div>
                <span className="ml-4">Watch Demo</span>
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-primary-600" />
                <span className="ml-2 text-sm text-gray-600">Lightning Fast</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-primary-600" />
                <span className="ml-2 text-sm text-gray-600">Privacy First</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-primary-600" />
                <span className="ml-2 text-sm text-gray-600">No Software</span>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-12 sm:mx-auto sm:max-w-lg lg:mt-0 lg:max-w-none lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Demo interface mockup */}
              <div className="relative rounded-2xl bg-gray-900 p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-400">AI Stem Splitter</div>
                </div>
                
                {/* Upload area */}
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-300 mb-2">Drop your audio file here</p>
                  <p className="text-sm text-gray-500">MP3, WAV, FLAC, M4A supported</p>
                </div>
                
                {/* Processing status */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Processing...</span>
                    <span className="text-primary-400">75%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                
                {/* Results preview */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {['Vocals', 'Drums', 'Bass', 'Guitar'].map((stem, index) => (
                    <div key={stem} className="bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-300">{stem}</span>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="h-1 bg-gray-700 rounded-full">
                        <div 
                          className="h-1 bg-primary-500 rounded-full"
                          style={{ width: `${75 + index * 5}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-primary-500 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 h-6 w-6 rounded-full bg-secondary-500 animate-pulse animation-delay-200"></div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Video modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <span className="sr-only">Close</span>
              ✕
            </button>
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <p className="text-white">Demo video would be embedded here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
