export interface AudioFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  duration?: number
  uploadedAt: Date
}

export interface ProcessingJob {
  id: string
  audioFile: AudioFile
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  estimatedTime?: number
  startedAt?: Date
  completedAt?: Date
  error?: string
}

export interface SeparatedStems {
  id: string
  jobId: string
  vocals?: AudioFile
  drums?: AudioFile
  bass?: AudioFile
  guitar?: AudioFile
  piano?: AudioFile
  other?: AudioFile
  createdAt: Date
}

export interface User {
  id: string
  email: string
  name?: string
  plan: 'free' | 'pro' | 'enterprise'
  usage: {
    filesProcessed: number
    filesProcessedThisMonth: number
    storageUsed: number
    lastProcessedAt?: Date
  }
  limits: {
    maxFileSize: number
    maxFilesPerMonth: number
    maxStorage: number
  }
  createdAt: Date
  updatedAt: Date
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  currency: string
  interval: 'month' | 'year'
  features: string[]
  limits: {
    maxFileSize: number
    maxFilesPerMonth: number
    maxStorage: number
  }
  popular?: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

export interface AudioPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  currentStem?: string
}

export interface WaveformData {
  peaks: number[]
  duration: number
}
