'use client'

import { useRef, useEffect } from 'react'
import { AudioTrack, PlaybackState } from '@/types/interactive-demo'

interface WaveformDisplayProps {
  tracks: AudioTrack[]
  playback: PlaybackState
  onTimeSeek: (time: number) => void
}

export function WaveformDisplay({ tracks, playback, onTimeSeek }: WaveformDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 生成模拟波形数据
  const generateWaveform = (length: number, intensity: number = 0.5) => {
    const waveform = []
    for (let i = 0; i < length; i++) {
      // 生成随机波形数据，模拟真实音频波形
      const base = Math.sin(i * 0.1) * intensity
      const noise = (Math.random() - 0.5) * 0.3
      const value = Math.max(0, Math.min(1, base + noise))
      waveform.push(value)
    }
    return waveform
  }

  // 绘制波形
  const drawWaveform = () => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    const { width, height } = canvas
    const trackHeight = height / tracks.length
    const timeWidth = width / playback.duration

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

    // 绘制时间标记
    ctx.fillStyle = '#9ca3af'
    ctx.font = '12px monospace'
    for (let i = 0; i <= playback.duration; i += 5) {
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

      // 生成或使用现有的波形数据
      if (track.waveform.length === 0) {
        track.waveform = generateWaveform(Math.floor(width / 2), track.volume / 100)
      }

      // 绘制波形
      ctx.strokeStyle = track.color
      ctx.lineWidth = 2
      ctx.globalAlpha = track.isMuted ? 0.3 : 1

      ctx.beginPath()
      track.waveform.forEach((amplitude, index) => {
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

    // 绘制播放进度指示器
    const progressX = playback.currentTime * timeWidth
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(progressX, 0)
    ctx.lineTo(progressX, height)
    ctx.stroke()

    // 绘制播放进度背景
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)'
    ctx.fillRect(0, 0, progressX, height)
  }

  // 处理点击事件
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const timeWidth = canvas.width / playback.duration
    const clickedTime = x / timeWidth

    onTimeSeek(Math.max(0, Math.min(playback.duration, clickedTime)))
  }

  useEffect(() => {
    drawWaveform()
  }, [tracks, playback])

  useEffect(() => {
    const handleResize = () => {
      drawWaveform()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div ref={containerRef} className="flex-1 bg-gray-900 relative">
      {/* 时间显示 */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-gray-800 px-3 py-1 rounded text-white text-sm font-mono">
          {Math.floor(playback.currentTime / 60)}:{(playback.currentTime % 60).toFixed(1).padStart(4, '0')}
        </div>
      </div>

      {/* 波形画布 */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-pointer"
        style={{ minHeight: '400px' }}
      />
    </div>
  )
}
