'use client'

import { useState, useEffect } from 'react'
import { PlanType, AudioTrack, PlaybackState } from '@/types/interactive-demo'
import { PlanToggle } from './PlanToggle'
import { TrackControls } from './TrackControls'
import { WaveformDisplay } from './WaveformDisplay'
import { PlaybackControls } from './PlaybackControls'

export function InteractiveDemoSection() {
  const [planType, setPlanType] = useState<PlanType>('free')
  const [tracks, setTracks] = useState<AudioTrack[]>([])
  const [playback, setPlayback] = useState<PlaybackState>({
    isPlaying: false,
    currentTime: 0,
    duration: 30,
    speed: 1,
    autoScroll: true
  })

  // 初始化音轨数据
  useEffect(() => {
    const freeTracks: AudioTrack[] = [
      {
        id: 'vocals',
        name: 'Vocals',
        icon: 'mic',
        volume: 50,
        isSolo: false,
        isMuted: false,
        isActive: true,
        waveform: [],
        color: '#ef4444'
      },
      {
        id: 'instrumental',
        name: 'Instrumental',
        icon: 'music',
        volume: 50,
        isSolo: false,
        isMuted: false,
        isActive: false,
        waveform: [],
        color: '#3b82f6'
      }
    ]

    const premiumTracks: AudioTrack[] = [
      {
        id: 'vocals',
        name: 'Vocals',
        icon: 'mic',
        volume: 50,
        isSolo: false,
        isMuted: false,
        isActive: true,
        waveform: [],
        color: '#ef4444'
      },
      {
        id: 'drums',
        name: 'Drums',
        icon: 'drum',
        volume: 50,
        isSolo: false,
        isMuted: false,
        isActive: false,
        waveform: [],
        color: '#f59e0b'
      },
      {
        id: 'bass',
        name: 'Bass',
        icon: 'guitar',
        volume: 50,
        isSolo: false,
        isMuted: false,
        isActive: false,
        waveform: [],
        color: '#10b981'
      },
      {
        id: 'guitar',
        name: 'Guitar',
        icon: 'guitar',
        volume: 50,
        isSolo: false,
        isMuted: false,
        isActive: false,
        waveform: [],
        color: '#8b5cf6'
      },
      {
        id: 'piano',
        name: 'Piano',
        icon: 'piano',
        volume: 50,
        isSolo: false,
        isMuted: false,
        isActive: false,
        waveform: [],
        color: '#06b6d4'
      },
      {
        id: 'other',
        name: 'Other',
        icon: 'music',
        volume: 50,
        isSolo: false,
        isMuted: false,
        isActive: false,
        waveform: [],
        color: '#6b7280'
      }
    ]

    setTracks(planType === 'free' ? freeTracks : premiumTracks)
  }, [planType])

  // 模拟播放进度
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (playback.isPlaying) {
      interval = setInterval(() => {
        setPlayback(prev => {
          const newTime = prev.currentTime + 0.1 * prev.speed
          if (newTime >= prev.duration) {
            return { ...prev, currentTime: 0, isPlaying: false }
          }
          return { ...prev, currentTime: newTime }
        })
      }, 100)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [playback.isPlaying, playback.speed])

  const handlePlanChange = (plan: PlanType) => {
    setPlanType(plan)
  }

  const handleTrackUpdate = (trackId: string, updates: Partial<AudioTrack>) => {
    setTracks(prev => prev.map(track => 
      track.id === trackId ? { ...track, ...updates } : track
    ))
  }

  const handleTrackClick = (trackId: string) => {
    setTracks(prev => prev.map(track => ({
      ...track,
      isActive: track.id === trackId
    })))
  }

  const handlePlaybackUpdate = (updates: Partial<PlaybackState>) => {
    setPlayback(prev => ({ ...prev, ...updates }))
  }

  const handleTimeSeek = (time: number) => {
    setPlayback(prev => ({ ...prev, currentTime: time }))
  }

  return (
    <div className="py-16 sm:py-20 bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 标题和描述 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Experience Our AI Stem Separation
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Try our interactive demo to see how precisely you can extract individual instrument tracks from any song. 
            Switch between Free and Premium plans to compare features.
          </p>
        </div>

        {/* 计划切换 */}
        <PlanToggle planType={planType} onPlanChange={handlePlanChange} />

        {/* 功能对比 */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className={`p-4 rounded-lg border-2 transition-all ${
              planType === 'free' 
                ? 'border-blue-500 bg-blue-500/10' 
                : 'border-gray-600 bg-gray-800'
            }`}>
              <h3 className="text-lg font-semibold text-white mb-2">Free Plan</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Vocals + Instrumental separation</li>
                <li>• Basic audio quality</li>
                <li>• Standard processing speed</li>
              </ul>
            </div>
            <div className={`p-4 rounded-lg border-2 transition-all ${
              planType === 'premium' 
                ? 'border-blue-500 bg-blue-500/10' 
                : 'border-gray-600 bg-gray-800'
            }`}>
              <h3 className="text-lg font-semibold text-white mb-2">Premium Plan</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• 6-track separation (Vocals, Drums, Bass, Guitar, Piano, Other)</li>
                <li>• High-quality audio output</li>
                <li>• Advanced processing algorithms</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 音频界面 */}
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
          <div className="flex">
            {/* 左侧音轨控制 */}
            <TrackControls
              tracks={tracks}
              onTrackUpdate={handleTrackUpdate}
              onTrackClick={handleTrackClick}
            />

            {/* 右侧波形显示 */}
            <WaveformDisplay
              tracks={tracks}
              playback={playback}
              onTimeSeek={handleTimeSeek}
            />
          </div>

          {/* 底部播放控制 */}
          <PlaybackControls
            playback={playback}
            onPlaybackUpdate={handlePlaybackUpdate}
          />
        </div>

        {/* 使用说明 */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Click on tracks to select them, adjust volume with sliders, use Solo/Mute buttons, 
            and control playback with the bottom controls. This is a demo - actual processing requires file upload.
          </p>
        </div>
      </div>
    </div>
  )
}
