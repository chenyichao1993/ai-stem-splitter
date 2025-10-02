'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface AudioPlayerProps {
  file: File
}

export function AudioPlayer({ file }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)
  const [playbackError, setPlaybackError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      console.log('Audio loaded, duration:', audio.duration)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      console.log('AudioPlayer: Time update - currentTime:', audio.currentTime, 'duration:', audio.duration)
      
      // Check for NaN duration which indicates playback issues
      if (isNaN(audio.duration) && audio.duration !== 0) {
        console.error('AudioPlayer: Duration is NaN - playback issue detected')
        setPlaybackError(true)
      }
    }

    const handleEnded = () => {
      console.log('AudioPlayer: Audio ended')
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handlePlay = () => {
      console.log('AudioPlayer: Audio play event fired')
      setIsPlaying(true)
    }

    const handlePause = () => {
      console.log('AudioPlayer: Audio pause event fired')
      setIsPlaying(false)
    }

    const handleError = (e: Event) => {
      console.error('Audio error:', e)
      setIsPlaying(false)
    }

    const handleCanPlay = () => {
      console.log('Audio can play')
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  // Reset state when file changes
  useEffect(() => {
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setUserInteracted(false)
  }, [file])

  // Handle user interaction for autoplay policy
  const handleUserInteraction = () => {
    if (!userInteracted) {
      setUserInteracted(true)
      console.log('User interaction detected - autoplay should now be allowed')
    }
  }

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) {
      console.error('Audio element not found')
      return
    }

    console.log('Audio element state:', {
      readyState: audio.readyState,
      networkState: audio.networkState,
      src: audio.src,
      duration: audio.duration,
      paused: audio.paused,
      error: audio.error
    })

    try {
      if (isPlaying) {
        audio.pause()
        console.log('Audio pause() called')
      } else {
        console.log('Attempting to play audio...')
        console.log('Audio readyState before play:', audio.readyState)
        
        // Check if audio is ready to play
        if (audio.readyState < 2) {
          console.log('Audio not ready, waiting for canplay event...')
          audio.load() // Force reload
        }
        
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          await playPromise
          console.log('Audio play() promise resolved')
        }
      }
    } catch (error) {
      console.error('Error playing audio:', error)
      console.error('Audio error details:', audio.error)
      setIsPlaying(false)
      
      // More specific error messages
      let errorMessage = '无法播放此音频文件。'
      if (audio.error) {
        switch (audio.error.code) {
          case audio.error.MEDIA_ERR_ABORTED:
            errorMessage = '音频播放被中止。'
            break
          case audio.error.MEDIA_ERR_NETWORK:
            errorMessage = '网络错误导致音频加载失败。'
            break
          case audio.error.MEDIA_ERR_DECODE:
            errorMessage = '音频解码失败。文件可能已损坏或格式不受支持。'
            break
          case audio.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = '音频格式不受支持。请尝试MP3或WAV格式。'
            break
        }
      } else if (error.name === 'NotAllowedError') {
        errorMessage = '浏览器阻止了自动播放。请先点击页面任意位置，然后再试。'
      }
      
      alert(`播放错误: ${errorMessage}`)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      <audio
        ref={audioRef}
        src={URL.createObjectURL(file)}
        preload="metadata"
        crossOrigin="anonymous"
        controls={false}
      />
      
      {/* Playback Error Message */}
      {playbackError && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700 mb-3">
            <strong>播放提示：</strong>此音频文件可能使用了浏览器不支持的编码格式。建议尝试MP3或WAV格式的文件。
          </p>
          <div className="text-xs text-yellow-600">
            <strong>备用播放器：</strong>
            <audio 
              src={URL.createObjectURL(file)} 
              controls 
              className="w-full mt-2"
            >
              您的浏览器不支持音频播放。
            </audio>
          </div>
        </div>
      )}
      
      {/* Progress Bar */}
      <div className="space-y-2">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              handleUserInteraction()
              togglePlay()
            }}
            className="flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-1" />
            )}
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
