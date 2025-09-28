'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Mic,
  Drum,
  Guitar,
  Piano,
  Music,
  CheckCircle
} from 'lucide-react'
import { formatFileSize } from '@/lib/utils'

interface SeparatedStemsProps {
  stems: {
    vocals: { name: string; url: string; size: number }
    drums: { name: string; url: string; size: number }
    bass: { name: string; url: string; size: number }
    guitar: { name: string; url: string; size: number }
    piano: { name: string; url: string; size: number }
  }
  onDownload: (stemType: string) => void
  onDownloadAll: () => void
}

const stemIcons = {
  vocals: Mic,
  drums: Drum,
  bass: Guitar,
  guitar: Guitar,
  piano: Piano,
}

const stemColors = {
  vocals: 'text-red-500',
  drums: 'text-yellow-500',
  bass: 'text-blue-500',
  guitar: 'text-green-500',
  piano: 'text-purple-500',
}

const stemBgColors = {
  vocals: 'bg-red-50',
  drums: 'bg-yellow-50',
  bass: 'bg-blue-50',
  guitar: 'bg-green-50',
  piano: 'bg-purple-50',
}

export function SeparatedStems({ stems, onDownload, onDownloadAll }: SeparatedStemsProps) {
  const [playingStem, setPlayingStem] = useState<string | null>(null)
  const [volume, setVolume] = useState(1)

  const handlePlay = (stemType: string) => {
    setPlayingStem(playingStem === stemType ? null : stemType)
  }

  const handleDownload = (stemType: string) => {
    onDownload(stemType)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Separated Stems
        </h3>
        <div className="flex items-center space-x-2 text-sm text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span>Complete</span>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(stems).map(([stemType, stem], index) => {
          const Icon = stemIcons[stemType as keyof typeof stemIcons]
          const color = stemColors[stemType as keyof typeof stemColors]
          const bgColor = stemBgColors[stemType as keyof typeof stemBgColors]
          const isPlaying = playingStem === stemType

          return (
            <motion.div
              key={stemType}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${bgColor} border-gray-200`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${bgColor}`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 capitalize">
                      {stem.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(stem.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePlay(stemType)}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleDownload(stemType)}
                    className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Waveform placeholder */}
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gray-300 to-gray-400 rounded-full animate-pulse" />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Download All Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-6 pt-6 border-t border-gray-200"
      >
        <button
          onClick={onDownloadAll}
          className="w-full btn-primary flex items-center justify-center"
        >
          <Download className="mr-2 h-5 w-5" />
          Download All Stems
        </button>
      </motion.div>

      {/* Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          <strong>Note:</strong> Your separated stems will be automatically deleted after 24 hours for privacy protection.
        </p>
      </div>
    </motion.div>
  )
}
