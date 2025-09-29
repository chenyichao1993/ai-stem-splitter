import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function formatTimeRemaining(seconds: number): string {
  if (seconds < 60) {
    return `${Math.ceil(seconds)}s`
  } else if (seconds < 3600) {
    const minutes = Math.ceil(seconds / 60)
    return `${minutes}m`
  } else {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.ceil((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function validateAudioFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/flac', 'audio/m4a', 'audio/aac']
  const maxSize = 50 * 1024 * 1024 // 50MB for free users
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Unsupported file format. Please upload MP3, MP4, WAV, FLAC, M4A, or AAC files.'
    }
  }
  
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size too large. Maximum size is 50MB for free users.'
    }
  }
  
  return { valid: true }
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

export function createAudioUrl(file: File): string {
  return URL.createObjectURL(file)
}

export function revokeAudioUrl(url: string): void {
  URL.revokeObjectURL(url)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}