'use client'

import { useState, useEffect } from 'react'
import { AudioTrack, PlaybackState } from '@/types/interactive-demo'
import { Mic, Music } from 'lucide-react'

export function FreePlanDemo() {
  const [tracks, setTracks] = useState<AudioTrack[]>([
    {
      id: 'vocals',
      name: 'Vocal',
      icon: 'mic',
      volume: 47,
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
  ])

  const [playback, setPlayback] = useState<PlaybackState>({
    isPlaying: false,
    currentTime: 0,
    duration: 8,
    speed: 1,
    autoScroll: true,
    zoomLevel: 1
  })

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
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
      {/* 顶部时间轴 - 与音轨控制区域对齐 */}
      <div className="bg-gray-700 border-b border-gray-600 p-2">
        <div className="flex items-center">
          {/* 左侧占位区域，与音轨控制区域宽度一致 */}
          <div className="w-64"></div>
          
          {/* 时间轴区域，与波形显示区域对齐 */}
          <div className="flex-1 flex items-center justify-between px-4">
            <div className="text-white text-sm font-mono">0:00</div>
            <div className="flex-1 mx-4">
              <div className="relative h-6">
                {/* 时间刻度 */}
                {Array.from({ length: 9 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 h-full flex flex-col justify-between"
                    style={{ left: `${(i / 8) * 100}%` }}
                  >
                    <div className="w-px h-2 bg-gray-400"></div>
                    <div className="w-px h-1 bg-gray-500"></div>
                    <div className="w-px h-1 bg-gray-500"></div>
                    <div className="w-px h-2 bg-gray-400"></div>
                  </div>
                ))}
                {/* 播放进度线 */}
                <div
                  className="absolute top-0 w-0.5 h-full bg-blue-500"
                  style={{ left: `${(playback.currentTime / playback.duration) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="text-white text-sm font-mono">0:08</div>
          </div>
        </div>
      </div>

      {/* 音轨区域 - 完全按照图1 */}
      <div className="bg-gray-900">
        {tracks.map((track, index) => {
          const Icon = track.id === 'vocals' ? Mic : Music
          
          return (
            <div key={track.id} className="flex items-center border-b border-gray-700 last:border-b-0">
              {/* 左侧控制区域 */}
              <div className="w-64 p-4 bg-gray-800">
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-gray-300" />
                  <span className="text-white font-medium">{track.name}</span>
                </div>
                
                <div className="mt-3 space-y-2">
                  {/* 音量滑块 */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">Volume</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={track.volume}
                      onChange={(e) => handleTrackUpdate(track.id, { volume: parseInt(e.target.value) })}
                      className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${track.color} 0%, ${track.color} ${track.volume}%, #4b5563 ${track.volume}%, #4b5563 100%)`
                      }}
                    />
                    <span className="text-xs text-white w-8">{track.volume}</span>
                  </div>
                  
                  {/* S/M 按钮 */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        const currentTrack = tracks.find(t => t.id === track.id)
                        if (currentTrack) {
                          if (currentTrack.isSolo) {
                            handleTrackUpdate(track.id, { isSolo: false })
                          } else {
                            tracks.forEach(t => {
                              if (t.id !== track.id) {
                                handleTrackUpdate(t.id, { isSolo: false })
                              }
                            })
                            handleTrackUpdate(track.id, { isSolo: true })
                          }
                        }
                      }}
                      className={`
                        w-6 h-6 rounded text-xs font-bold transition-colors
                        ${track.isSolo 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-600 text-gray-400 hover:bg-gray-500'
                        }
                      `}
                    >
                      S
                    </button>
                    <button
                      onClick={() => handleTrackUpdate(track.id, { isMuted: !track.isMuted })}
                      className={`
                        w-6 h-6 rounded text-xs font-bold transition-colors
                        ${track.isMuted 
                          ? 'bg-red-500 text-white' 
                          : 'bg-gray-600 text-gray-400 hover:bg-gray-500'
                        }
                      `}
                    >
                      M
                    </button>
                  </div>
                </div>
              </div>

              {/* 右侧波形区域 */}
              <div className="flex-1 h-20 bg-gray-900 relative">
                <canvas
                  className="w-full h-full cursor-pointer"
                  onClick={(e) => {
                    const canvas = e.currentTarget
                    const rect = canvas.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const timeWidth = canvas.width / playback.duration
                    const clickedTime = x / timeWidth
                    handleTimeSeek(Math.max(0, Math.min(playback.duration, clickedTime)))
                  }}
                  ref={(canvas) => {
                    if (!canvas) return
                    
                    const ctx = canvas.getContext('2d')
                    if (!ctx) return

                    const rect = canvas.getBoundingClientRect()
                    canvas.width = rect.width
                    canvas.height = rect.height

                    const { width, height } = canvas
                    const centerY = height / 2

                    // 清空画布
                    ctx.fillStyle = '#111827'
                    ctx.fillRect(0, 0, width, height)

                    // 生成波形数据
                    const waveform = []
                    for (let i = 0; i < Math.floor(width / 2); i++) {
                      const base = Math.sin(i * 0.1) * (track.volume / 100)
                      const noise = (Math.random() - 0.5) * 0.3
                      const value = Math.max(0, Math.min(1, base + noise))
                      waveform.push(value)
                    }

                    // 绘制波形
                    ctx.strokeStyle = track.color
                    ctx.lineWidth = 2
                    ctx.globalAlpha = track.isMuted ? 0.3 : 1

                    ctx.beginPath()
                    waveform.forEach((amplitude, index) => {
                      const x = index * 2
                      const waveHeight = amplitude * (height * 0.4)
                      const waveY = centerY + (index % 2 === 0 ? waveHeight : -waveHeight)
                      
                      if (index === 0) {
                        ctx.moveTo(x, waveY)
                      } else {
                        ctx.lineTo(x, waveY)
                      }
                    })
                    ctx.stroke()

                    ctx.globalAlpha = 1
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* 底部控制区域 - 完全按照图1 */}
      <div className="bg-gray-700 border-t border-gray-600 p-4">
        <div className="flex items-center justify-between">
          {/* 左侧：Speed Control */}
          <div className="flex items-center space-x-3">
            <span className="text-white text-sm">Speed</span>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={playback.speed}
              onChange={(e) => handlePlaybackUpdate({ speed: parseFloat(e.target.value) })}
              className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-white text-sm">{playback.speed}x</span>
          </div>

          {/* 中间：播放控制 */}
          <div className="flex items-center space-x-4">
            {/* 快退10秒 */}
            <button
              onClick={() => handlePlaybackUpdate({ currentTime: Math.max(0, playback.currentTime - 10) })}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 hover:bg-gray-500 text-white transition-colors"
            >
              <span className="text-xs">⏮</span>
              <span className="text-xs ml-1">10</span>
            </button>

            {/* 播放/暂停 */}
            <button
              onClick={() => handlePlaybackUpdate({ isPlaying: !playback.isPlaying })}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              {playback.isPlaying ? (
                <span className="text-lg">⏸</span>
              ) : (
                <span className="text-lg ml-1">▶</span>
              )}
            </button>

            {/* 停止 */}
            <button
              onClick={() => handlePlaybackUpdate({ isPlaying: false, currentTime: 0 })}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 hover:bg-gray-500 text-white transition-colors"
            >
              <span className="text-sm">⏹</span>
            </button>

            {/* 快进10秒 */}
            <button
              onClick={() => handlePlaybackUpdate({ currentTime: Math.min(playback.duration, playback.currentTime + 10) })}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 hover:bg-gray-500 text-white transition-colors"
            >
              <span className="text-xs">⏭</span>
              <span className="text-xs ml-1">10</span>
            </button>
          </div>

          {/* 右侧：Auto-scroll 和 Zoom */}
          <div className="flex items-center space-x-4">
            {/* Auto-scroll */}
            <button
              onClick={() => handlePlaybackUpdate({ autoScroll: !playback.autoScroll })}
              className={`
                px-3 py-1 rounded text-sm transition-colors
                ${playback.autoScroll
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 text-gray-400 hover:text-white'
                }
              `}
            >
              auto-scroll
            </button>

            {/* Zoom Controls - 按照图2 Gaudio Studio样式 */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePlaybackUpdate({ zoomLevel: Math.max(0.5, playback.zoomLevel - 0.5) })}
                className="p-1 rounded bg-gray-600 hover:bg-gray-500 text-gray-400 hover:text-white transition-colors"
                title="Zoom Out"
              >
                {/* 放大镜图标 + 减号 - 居中且细线条 */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                  <line x1="8" y1="11" x2="14" y2="11" strokeWidth="2" stroke="currentColor"></line>
                </svg>
              </button>
              <button
                onClick={() => handlePlaybackUpdate({ zoomLevel: Math.min(4, playback.zoomLevel + 0.5) })}
                className="p-1 rounded bg-gray-600 hover:bg-gray-500 text-gray-400 hover:text-white transition-colors"
                title="Zoom In"
              >
                {/* 放大镜图标 + 加号 - 居中且细线条 */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                  <line x1="8" y1="11" x2="14" y2="11" strokeWidth="2" stroke="currentColor"></line>
                  <line x1="11" y1="8" x2="11" y2="14" strokeWidth="2" stroke="currentColor"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}