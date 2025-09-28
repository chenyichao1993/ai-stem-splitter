'use client'

import { motion } from 'framer-motion'
import { Loader2, Zap } from 'lucide-react'

interface ProcessingStatusProps {
  progress: number
}

export function ProcessingStatus({ progress }: ProcessingStatusProps) {
  const getStatusText = () => {
    if (progress < 20) return 'Analyzing audio...'
    if (progress < 40) return 'Separating vocals...'
    if (progress < 60) return 'Extracting drums...'
    if (progress < 80) return 'Processing bass...'
    if (progress < 95) return 'Finalizing stems...'
    return 'Almost done...'
  }

  const getEstimatedTime = () => {
    const remaining = 100 - progress
    const estimatedSeconds = Math.ceil((remaining / 10) * 3) // Rough estimate
    return estimatedSeconds > 0 ? `${estimatedSeconds}s remaining` : 'Finishing up...'
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4"
        >
          <Loader2 className="h-8 w-8 text-primary-600" />
        </motion.div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Processing Your Audio
        </h3>
        <p className="text-sm text-gray-600">
          Our AI is working hard to separate your audio into individual stems
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{getStatusText()}</span>
          <span className="text-primary-600 font-medium">{Math.round(progress)}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        
        <p className="text-xs text-gray-500 text-center">
          {getEstimatedTime()}
        </p>
      </div>

      {/* Processing Steps */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-700 mb-3">Processing Steps:</div>
        <div className="space-y-2">
          {[
            { name: 'Audio Analysis', completed: progress > 10 },
            { name: 'Vocal Separation', completed: progress > 30 },
            { name: 'Drum Extraction', completed: progress > 50 },
            { name: 'Bass Processing', completed: progress > 70 },
            { name: 'Final Assembly', completed: progress > 90 },
          ].map((step, index) => (
            <div key={step.name} className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                step.completed 
                  ? 'bg-green-500' 
                  : progress > index * 20 
                    ? 'bg-primary-500' 
                    : 'bg-gray-300'
              }`}>
                {step.completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                )}
              </div>
              <span className={`text-sm ${
                step.completed 
                  ? 'text-green-700 font-medium' 
                  : 'text-gray-600'
              }`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fun Facts */}
      <div className="bg-primary-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="h-4 w-4 text-primary-600" />
          <span className="text-sm font-medium text-primary-800">Did you know?</span>
        </div>
        <p className="text-xs text-primary-700">
          Our AI processes over 10,000 audio files daily with 99.9% accuracy in stem separation.
        </p>
      </div>
    </div>
  )
}
