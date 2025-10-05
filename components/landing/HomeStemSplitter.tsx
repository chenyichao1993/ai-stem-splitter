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

// API配置：优先环境变量，否则默认指向本地后端 10000 端口
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000/api'

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
  const [uploadedFileId, setUploadedFileId] = useState<string | null>(null)
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
  const [playingStem, setPlayingStem] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    const validation = validateAudioFile(file)
    if (!validation.valid) {
      toast.error(validation.error || 'Invalid file')
      setError(validation.error || 'Invalid file')
      return
    }

    try {
      // 上传文件到API
      const formData = new FormData()
      formData.append('audio', file)
      
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      
      if (result.success) {
    setUploadedFile(file)
    setError(null)
        // 存储文件ID用于后续处理
        setUploadedFileId(result.data.fileId)
    toast.success('File uploaded successfully!')
      } else {
        throw new Error(result.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Upload failed. Please try again.')
      setError('Upload failed. Please try again.')
    }
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
    if (!uploadedFile || !uploadedFileId) return

    setIsProcessing(true)
    setProcessingProgress(0)
    setError(null)

    try {
      // 开始处理
      const response = await fetch(`${API_BASE_URL}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileId: uploadedFileId })
      })

      if (!response.ok) {
        throw new Error('Failed to start processing')
      }

      const result = await response.json()
      
      if (result.success) {
        const jobId = result.data.jobId
        toast.success('Processing started!')
        
        // 轮询处理状态
        const pollStatus = async () => {
          try {
            const statusResponse = await fetch(`${API_BASE_URL}/process/${jobId}`)
            const statusResult = await statusResponse.json()
            
            if (statusResult.success) {
              setProcessingProgress(statusResult.data.progress)
              
              if (statusResult.data.status === 'completed') {
                setIsProcessing(false)
                // 转换API返回的stems格式
                const stems = statusResult.data.stems
                if (stems) {
                  setSeparatedStems({
                    vocals: stems.vocals ? { name: 'Vocals', url: stems.vocals, size: 1024000 } : undefined,
                    drums: stems.drums ? { name: 'Drums', url: stems.drums, size: 2048000 } : undefined,
                    bass: stems.bass ? { name: 'Bass', url: stems.bass, size: 1536000 } : undefined,
                    guitar: stems.guitar ? { name: 'Guitar', url: stems.guitar, size: 1792000 } : undefined,
                    piano: stems.piano ? { name: 'Piano', url: stems.piano, size: 1280000 } : undefined,
                  })
                }
                toast.success('Audio separation completed!')
              } else if (statusResult.data.status === 'failed') {
                setIsProcessing(false)
                setError(statusResult.data.error || 'Processing failed')
                toast.error('Processing failed')
              } else {
                // 继续轮询
                setTimeout(pollStatus, 1000)
              }
            }
          } catch (error) {
            console.error('Status check error:', error)
            setIsProcessing(false)
            setError('Failed to check processing status')
          }
        }
        
        // 开始轮询
        setTimeout(pollStatus, 1000)
      } else {
        throw new Error(result.error || 'Failed to start processing')
      }

    } catch (err) {
      console.error('Processing error:', err)
      setError('Processing failed. Please try again.')
      toast.error('Processing failed. Please try again.')
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    setUploadedFile(null)
    setUploadedFileId(null)
    setSeparatedStems(null)
    setError(null)
    setProcessingProgress(0)
    setIsProcessing(false)
    setPlayingStem(null)
  }

  const handleDownload = async (stemType: string) => {
    try {
      // TODO: 需要从处理状态中获取jobId
      // 这里先用模拟的方式
      const response = await fetch(`${API_BASE_URL}/download/mock-job-id/${stemType}`)
      
      if (response.ok) {
    toast.success(`Downloading ${stemType}...`)
        // 实际下载逻辑
      } else {
        toast.error('Download failed')
      }
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Download failed')
    }
  }

  const handleDownloadAll = () => {
    toast.success('Downloading all stems...')
    // Implement actual download logic here
  }

  const handlePlayStem = (stemType: string) => {
    if (playingStem === stemType) {
      // Stop playing
      setPlayingStem(null)
    } else {
      // Start playing
      setPlayingStem(stemType)
      
      // Simulate playback duration (3 seconds for demo)
      setTimeout(() => {
        setPlayingStem(null)
      }, 3000)
    }
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

                   {/* Upload New File Button */}
                   <button
                     onClick={() => {
                       // Trigger file input click
                       const input = document.createElement('input')
                       input.type = 'file'
                       input.accept = 'audio/*,.mp3,.mp4,.wav,.flac,.m4a,.aac'
                       input.multiple = false
                       input.onchange = (e) => {
                         const file = (e.target as HTMLInputElement).files?.[0]
                         if (file) {
                           const validation = validateAudioFile(file)
                           if (!validation.valid) {
                             toast.error(validation.error || 'Invalid file')
                             setError(validation.error || 'Invalid file')
                             return
                           }
                           
                           setUploadedFile(file)
                           setSeparatedStems(null)
                           setError(null)
                           setProcessingProgress(0)
                           setIsProcessing(false)
                           toast.success('New file uploaded successfully!')
                         }
                       }
                       input.click()
                     }}
                     className="w-full btn-secondary text-lg py-3 flex items-center justify-center"
                   >
                     <Upload className="mr-2 h-5 w-5" />
                     Upload New File
                   </button>

                  {/* Process Button */}
                  {!isProcessing && !separatedStems && (
                    <button
                      onClick={handleProcess}
                       className="w-full btn-primary text-lg py-4 flex items-center justify-center"
                    >
                      <Music className="mr-2 h-5 w-5" />
                       Separate Stems Now
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
                    What You&apos;ll Get
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
                                onClick={() => handlePlayStem(stemType)}
                                className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                                title={playingStem === stemType ? "Stop" : "Play"}
                              >
                                {playingStem === stemType ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </button>
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
                      Click &quot;Separate Stems Now&quot; to start processing
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
