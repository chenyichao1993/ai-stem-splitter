'use client'

import { useState, useEffect } from 'react'
import { AudioTrack, PlaybackState } from '@/types/interactive-demo'
import { Mic, Music } from 'lucide-react'

export function FreePlanDemo() {
  const [tracks, setTracks] = useState<AudioTrack[]>([
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
  ])

  const [playback, setPlayback] = useState<PlaybackState>({
    isPlaying: false,
    currentTime: 0,
    duration: 30,
    speed: 1,
    autoScroll: true
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
      <div className="flex" style={{ height: '240px' }}>
        {/* 左侧音轨控制 - 免费计划专用 */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-3">
          <div className="space-y-0">
            {tracks.map((track) => {
              const Icon = track.id === 'vocals' ? Mic : Music
              
              return (
                <div
                  key={track.id}
                  className={`
                    p-2 rounded-lg cursor-pointer transition-all duration-200
                    ${track.isActive 
                      ? 'bg-blue-600 border border-blue-500' 
                      : 'bg-gray-700 hover:bg-gray-600 border border-transparent'
                    }
                  `}
                  style={{ height: '120px', marginBottom: '0px' }}
                  onClick={() => handleTrackClick(track.id)}
                >
                  {/* 音轨标题和图标 */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-gray-300" />
                      <span className="text-sm font-medium text-white capitalize">
                        {track.name}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      {/* Solo按钮 */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const currentTrack = tracks.find(t => t.id === track.id)
                          if (currentTrack) {
                            if (currentTrack.isSolo) {
                              handleTrackUpdate(currentTrack.id, { isSolo: false })
                            } else {
                              tracks.forEach(t => {
                                if (t.id !== currentTrack.id) {
                                  handleTrackUpdate(t.id, { isSolo: false })
                                }
                              })
                              handleTrackUpdate(currentTrack.id, { isSolo: true })
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
                      {/* Mute按钮 */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTrackUpdate(track.id, { isMuted: !track.isMuted })
                        }}
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

                  {/* 音量滑块 */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Volume</span>
                      <span className="text-xs text-gray-300">{track.volume}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={track.volume}
                      onChange={(e) => handleTrackUpdate(track.id, { volume: parseInt(e.target.value) })}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, ${track.color} 0%, ${track.color} ${track.volume}%, #4b5563 ${track.volume}%, #4b5563 100%)`
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 右侧波形显示 - 免费计划专用 */}
        <div className="flex-1 bg-gray-900 relative">
          {/* 时间显示 - 跟随播放进度 */}
          <div 
            className="absolute top-4 z-10"
            style={{ 
              left: `${((playback.currentTime % 5) / 5) * 100}%`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="bg-blue-600 px-2 py-1 rounded text-white text-xs font-mono">
              {Math.floor(playback.currentTime / 60)}:{(playback.currentTime % 60).toFixed(1).padStart(4, '0')}
            </div>
          </div>

          {/* 波形画布 */}
          <canvas
            className="w-full h-full cursor-pointer"
            style={{ minHeight: '240px' }}
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
              const trackHeight = 120 // 免费计划固定高度，与左侧控制面板完全匹配
              const visibleDuration = 5 // 默认显示5秒
              const timeWidth = width / visibleDuration

              // 清空画布
              ctx.fillStyle = '#1a1a1a'
              ctx.fillRect(0, 0, width, height)

              // 绘制时间轴
              ctx.strokeStyle = '#4b5563'
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(0, 0)
              ctx.lineTo(width, 0)
              ctx.stroke()

              // 绘制时间标记（只显示5秒范围）
              ctx.fillStyle = '#9ca3af'
              ctx.font = '12px monospace'
              for (let i = 0; i <= visibleDuration; i += 1) {
                const x = i * timeWidth
                ctx.fillText(`${i}:00`, x + 2, 15)
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, height)
                ctx.stroke()
              }

              // 绘制每个音轨的波形
              tracks.forEach((track, trackIndex) => {
                const y = trackIndex * trackHeight
                const trackCenter = y + trackHeight / 2

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
                  const waveHeight = amplitude * (trackHeight * 0.3)
                  const waveY = trackCenter + (index % 2 === 0 ? waveHeight : -waveHeight)
                  
                  if (index === 0) {
                    ctx.moveTo(x, waveY)
                  } else {
                    ctx.lineTo(x, waveY)
                  }
                })
                ctx.stroke()

                // 绘制音轨分隔线
                if (trackIndex < tracks.length - 1) {
                  ctx.strokeStyle = '#374151'
                  ctx.lineWidth = 1
                  ctx.beginPath()
                  ctx.moveTo(0, y + trackHeight)
                  ctx.lineTo(width, y + trackHeight)
                  ctx.stroke()
                }

                ctx.globalAlpha = 1
              })

              // 绘制播放进度指示器（基于5秒范围）
              const progressX = (playback.currentTime % visibleDuration) * timeWidth
              ctx.strokeStyle = '#3b82f6'
              ctx.lineWidth = 2
              ctx.beginPath()
              ctx.moveTo(progressX, 0)
              ctx.lineTo(progressX, height)
              ctx.stroke()

              // 绘制播放进度背景
              ctx.fillStyle = 'rgba(59, 130, 246, 0.1)'
              ctx.fillRect(0, 0, progressX, height)
            }}
          />
        </div>
      </div>

      {/* 底部播放控制 - 免费计划专用 */}
      <div className="bg-gray-700 border-t border-gray-600 p-2" style={{ height: '60px', minHeight: '60px' }}>
        <div className="flex items-center justify-between h-full">
          {/* 左侧：播放控制 */}
          <div className="flex items-center space-x-3">
            {/* 快退10秒 */}
            <button
              onClick={() => handlePlaybackUpdate({ currentTime: Math.max(0, playback.currentTime - 10) })}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 hover:bg-gray-500 text-white transition-colors"
              title="快退10秒"
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
              title="停止"
            >
              <span className="text-sm">⏹</span>
            </button>

            {/* 快进10秒 */}
            <button
              onClick={() => handlePlaybackUpdate({ currentTime: Math.min(playback.duration, playback.currentTime + 10) })}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 hover:bg-gray-500 text-white transition-colors"
              title="快进10秒"
            >
              <span className="text-xs">⏭</span>
              <span className="text-xs ml-1">10</span>
            </button>
          </div>

          {/* 中间：时间显示 */}
          <div className="flex items-center space-x-4">
            <div className="text-white text-xs font-mono">
              {Math.floor(playback.currentTime / 60)}:{(playback.currentTime % 60).toFixed(1).padStart(4, '0')} / {Math.floor(playback.duration / 60)}:{(playback.duration % 60).toFixed(1).padStart(4, '0')}
            </div>
          </div>

          {/* 右侧：高级控制 */}
          <div className="flex items-center space-x-3">
            {/* 速度控制 */}
            <div className="flex items-center space-x-1">
              <span className="text-gray-400 text-xs">Speed:</span>
              <select
                value={playback.speed}
                onChange={(e) => handlePlaybackUpdate({ speed: parseFloat(e.target.value) })}
                className="bg-gray-600 text-white text-xs rounded px-1 py-1 border border-gray-500"
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>

            {/* 自动滚动 */}
            <button
              onClick={() => handlePlaybackUpdate({ autoScroll: !playback.autoScroll })}
              className={`
                px-2 py-1 rounded text-xs transition-colors
                ${playback.autoScroll
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 text-gray-400 hover:text-white'
                }
              `}
            >
              auto-scroll
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
