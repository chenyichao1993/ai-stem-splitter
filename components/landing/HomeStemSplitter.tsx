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
import { SeparatedStems } from '../stem-splitter/SeparatedStems'
import toast from 'react-hot-toast'

export function HomeStemSplitter() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [separatedStems, setSeparatedStems] = useState<any>(null)
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
      'audio/*': ['.mp3', '.wav', '.flac', '.m4a', '.aac']
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
    <div id="stem-splitter-tool" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            AI <span className="text-gradient">Stem Splitter</span>
          </h1>
          <p className="mt-6 text-xl text-gray-700 sm:text-2xl font-medium max-w-3xl mx-auto">
            Professional <strong>audio separation</strong> and <strong>vocal remover</strong> tool. 
            Extract <strong>instrumental</strong> tracks, isolate vocals, and create perfect stems for music production.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="px-3 py-1 bg-gray-100 rounded-full">Music Separation</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">Vocal Remover Online</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">Instrumental Separator</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">AI Audio Processing</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
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
                    <p className="text-lg text-primary-600">Drop your song here to separate stems...</p>
                  ) : (
                    <div>
                      <p className="text-lg text-gray-600 mb-2">
                        Drop your song here to extract vocals, drums, bass & guitar
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports MP3, WAV, FLAC, M4A, AAC • Max 50MB • Free to use
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Separated Audio Stems
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
                Perfect for
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>Music Producers</strong> - Create remixes & samples</li>
                <li>• <strong>DJs</strong> - Extract vocals for live sets</li>
                <li>• <strong>Content Creators</strong> - Remove vocals for videos</li>
                <li>• <strong>Musicians</strong> - Practice with instrumentals</li>
              </ul>
            </div>

            {/* Results */}
            {separatedStems && (
              <SeparatedStems 
                stems={separatedStems}
                onDownload={handleDownload}
                onDownloadAll={handleDownloadAll}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
