'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  FileAudio, 
  Play, 
  Pause, 
  Download, 
  Trash2, 
  Volume2,
  VolumeX,
  Loader2,
  CheckCircle,
  AlertCircle,
  Music,
  Mic,
  Drum,
  Guitar,
  Piano
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { validateAudioFile, formatFileSize, formatDuration } from '@/lib/utils'
import { AudioPlayer } from './AudioPlayer'
import { ProcessingStatus } from './ProcessingStatus'
import { SeparatedStems } from './SeparatedStems'
import toast from 'react-hot-toast'

export function StemSplitterInterface() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [separatedStems, setSeparatedStems] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [fileExpiresAt, setFileExpiresAt] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    const validation = validateAudioFile(file)
    if (!validation.valid) {
      toast.error(validation.error || 'Invalid file')
      setError(validation.error || 'Invalid file')
      return
    }

    setUploadedFile(file)
    setError(null)
    toast.success('File uploaded successfully!')
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.mp4', '.wav', '.flac', '.m4a', '.aac']
    },
    multiple: false,
    maxSize: 50 * 1024 * 1024 // 50MB
  })

  const handleProcess = async () => {
    if (!uploadedFile) return

    setIsProcessing(true)
    setProcessingProgress(0)
    setError(null)

    try {
      // Simulate processing with progress updates
      const interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsProcessing(false)
            // Simulate successful processing
            setSeparatedStems({
              vocals: { name: 'Vocals', url: '#', size: 1024000 },
              drums: { name: 'Drums', url: '#', size: 2048000 },
              bass: { name: 'Bass', url: '#', size: 1536000 },
              guitar: { name: 'Guitar', url: '#', size: 1792000 },
              piano: { name: 'Piano', url: '#', size: 1280000 },
            })
            
            // Show expiration reminder
            toast.success(
              '🎉 Audio separation completed! Your files will be automatically deleted in 24 hours. Please download them soon.',
              { duration: 8000 }
            )
            return 100
          }
          return prev + Math.random() * 10
        })
      }, 200)

    } catch (err) {
      setError('Processing failed. Please try again.')
      toast.error('Processing failed. Please try again.')
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    setUploadedFile(null)
    setSeparatedStems(null)
    setError(null)
    setProcessingProgress(0)
    setIsProcessing(false)
    setFileExpiresAt(null)
  }

  // Calculate remaining time until expiration
  const getRemainingTime = (expiresAt: string) => {
    const now = new Date().getTime()
    const expiration = new Date(expiresAt).getTime()
    const remaining = expiration - now
    
    if (remaining <= 0) return 'Expired'
    
    const hours = Math.floor(remaining / (1000 * 60 * 60))
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`
    } else {
      return `${minutes}m remaining`
    }
  }

  const handleDownload = (stemType: string) => {
    toast.success(`Downloading ${stemType}...`)
    // Implement actual download logic here
  }

  const handleDownloadAll = () => {
    toast.success('Downloading all stems...')
    // Implement actual download logic here
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          AI Stem Splitter
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Separate your audio into individual stems with AI precision
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Upload Audio File
            </h2>
            
            {!uploadedFile ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  {isDragActive ? (
                    <p className="text-lg text-primary-600">Drop your audio file here...</p>
                  ) : (
                    <div>
                      <p className="text-lg text-gray-600 mb-2">
                        Drag and drop your audio file here, or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports MP3, MP4, WAV, FLAC, M4A, AAC (max 50MB)
                      </p>
                    </div>
                  )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* File Info */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <FileAudio className="h-8 w-8 text-primary-600" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(uploadedFile.size)} • {uploadedFile.type}
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Audio Player */}
                <AudioPlayer file={uploadedFile} />

                {/* Process Button */}
                {!isProcessing && !separatedStems && (
                  <button
                    onClick={handleProcess}
                    className="w-full btn-primary text-lg py-4"
                  >
                    <Music className="mr-2 h-5 w-5" />
                    Separate Audio Stems
                  </button>
                )}

                {/* Processing Status */}
                {isProcessing && (
                  <ProcessingStatus progress={processingProgress} />
                )}

                {/* Error Display */}
                {error && (
                  <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                    <p className="text-red-700">{error}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Features */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What you&apos;ll get
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mic className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-sm text-gray-600">Vocals</span>
              </div>
              <div className="flex items-center">
                <Drum className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-sm text-gray-600">Drums</span>
              </div>
              <div className="flex items-center">
                <Guitar className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-sm text-gray-600">Bass</span>
              </div>
              <div className="flex items-center">
                <Guitar className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-sm text-gray-600">Guitar</span>
              </div>
              <div className="flex items-center">
                <Piano className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-sm text-gray-600">Piano</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tips for best results
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Use high-quality source audio</li>
              <li>• Avoid heavily compressed files</li>
              <li>• Ensure clear instrument separation</li>
              <li>• Process one song at a time</li>
            </ul>
          </div>

          {/* Results */}
          {separatedStems && (
            <div className="space-y-4">
              {/* Expiration Notice */}
              {fileExpiresAt && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">
                        ⏰ Files will be automatically deleted in 24 hours
                      </p>
                      <p className="text-xs text-amber-600 mt-1">
                        Please download your separated audio files soon to avoid losing them.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <SeparatedStems 
                stems={separatedStems}
                onDownload={handleDownload}
                onDownloadAll={handleDownloadAll}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
