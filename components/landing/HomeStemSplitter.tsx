'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
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
import { validateAudioFile, formatFileSize } from '@/lib/utils'
import { AudioPlayer } from '../stem-splitter/AudioPlayer'
import { ProcessingStatus } from '../stem-splitter/ProcessingStatus'
import toast from 'react-hot-toast'

// Stem icons and colors
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

export function HomeStemSplitter() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [separatedStems, setSeparatedStems] = useState<{
    vocals: { name: string; url: string; size: number }
    drums: { name: string; url: string; size: number }
    bass: { name: string; url: string; size: number }
    guitar: { name: string; url: string; size: number }
    piano: { name: string; url: string; size: number }
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

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
      'audio/*': ['.mp3', '.mp4', '.wav', '.flac', '.m4a', '.aac'],
      'video/mp4': ['.mp4'] // MP4 files can have video/mp4 MIME type
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
            toast.success('Audio separation completed!')
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
    <div id="stem-splitter-tool" className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            AI <span className="text-gradient">Stem Splitter</span>
          </h1>
          <p className="mt-6 text-xl text-gray-700 sm:text-2xl font-medium max-w-4xl mx-auto">
            Professional <strong>audio separation</strong> and <strong>vocal remover</strong> tool for music production. 
            Extract <strong>instrumental</strong> tracks, isolate vocals, and create perfect stems instantly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="px-3 py-1 bg-gray-100 rounded-full">Music Separation</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">Vocal Remover Online</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">Instrumental Separator</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">AI Audio Processing</span>
          </div>
        </div>

        <div className={`grid grid-cols-1 gap-8 ${uploadedFile ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
          {/* Upload Section */}
          <div className={uploadedFile ? 'lg:col-span-1' : 'lg:col-span-2'}>
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Upload Audio File - Get Separated Stems
              </h3>
              
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
                      Separate Stems Now - Free
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

          {/* Results Section */}
          <div className="space-y-6">
            {/* Dynamic Results Display */}
            <div className="card">
              {!uploadedFile ? (
                // Initial state - show features
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    What You'll Get
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
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Perfect for:</strong> Music Producers, DJs, Content Creators, Musicians
                    </p>
                  </div>
                </div>
              ) : isProcessing ? (
                // Processing state
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Processing Your Audio
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Separating stems...</span>
                      <span className="text-primary-600 font-medium">{Math.round(processingProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${processingProgress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      This usually takes 30-60 seconds
                    </div>
                  </div>
                </div>
              ) : separatedStems ? (
                // Results state
                <div>
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
                    {Object.entries(separatedStems).map(([stemType, stem], index) => {
                      const Icon = stemIcons[stemType as keyof typeof stemIcons]
                      const color = stemColors[stemType as keyof typeof stemColors]
                      const bgColor = stemBgColors[stemType as keyof typeof stemBgColors]
                      const stemData = stem as { name: string; url: string; size: number }

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
                                  {stemData.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {formatFileSize(stemData.size)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleDownload(stemType)}
                                className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                                title="Download"
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
                      onClick={handleDownloadAll}
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
                </div>
              ) : (
                // File uploaded but not processed yet
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Ready to Process
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FileAudio className="h-5 w-5 text-primary-600 mr-3" />
                      <span className="text-sm text-gray-600">{uploadedFile.name}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Click "Separate Stems Now" to start processing
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
