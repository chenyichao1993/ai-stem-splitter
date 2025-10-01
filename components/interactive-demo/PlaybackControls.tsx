'use client'

import { Play, Pause, Square, SkipBack, SkipForward, ZoomIn, ZoomOut } from 'lucide-react'
import { PlaybackState } from '@/types/interactive-demo'

interface PlaybackControlsProps {
  playback: PlaybackState
  onPlaybackUpdate: (updates: Partial<PlaybackState>) => void
}

export function PlaybackControls({ playback, onPlaybackUpdate }: PlaybackControlsProps) {
  const handlePlayPause = () => {
    onPlaybackUpdate({ isPlaying: !playback.isPlaying })
  }

  const handleStop = () => {
    onPlaybackUpdate({ isPlaying: false, currentTime: 0 })
  }

  const handleSkipBack = () => {
    const newTime = Math.max(0, playback.currentTime - 10)
    onPlaybackUpdate({ currentTime: newTime })
  }

  const handleSkipForward = () => {
    const newTime = Math.min(playback.duration, playback.currentTime + 10)
    onPlaybackUpdate({ currentTime: newTime })
  }

  const handleSpeedChange = (speed: number) => {
    onPlaybackUpdate({ speed })
  }

  const handleAutoScrollToggle = () => {
    onPlaybackUpdate({ autoScroll: !playback.autoScroll })
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-gray-800 border-t border-gray-700 p-4">
      <div className="flex items-center justify-between">
        {/* 左侧：播放控制 */}
        <div className="flex items-center space-x-4">
          {/* 快退10秒 */}
          <button
            onClick={handleSkipBack}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
            title="快退10秒"
          >
            <SkipBack className="h-5 w-5" />
            <span className="text-xs ml-1">10</span>
          </button>

          {/* 播放/暂停 */}
          <button
            onClick={handlePlayPause}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            {playback.isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </button>

          {/* 停止 */}
          <button
            onClick={handleStop}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
            title="停止"
          >
            <Square className="h-4 w-4" />
          </button>

          {/* 快进10秒 */}
          <button
            onClick={handleSkipForward}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
            title="快进10秒"
          >
            <SkipForward className="h-5 w-5" />
            <span className="text-xs ml-1">10</span>
          </button>
        </div>

        {/* 中间：时间显示 */}
        <div className="flex items-center space-x-4">
          <div className="text-white text-sm font-mono">
            {formatTime(playback.currentTime)} / {formatTime(playback.duration)}
          </div>
        </div>

        {/* 右侧：高级控制 */}
        <div className="flex items-center space-x-4">
          {/* 速度控制 */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Speed:</span>
            <select
              value={playback.speed}
              onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
              className="bg-gray-700 text-white text-sm rounded px-2 py-1 border border-gray-600"
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
            onClick={handleAutoScrollToggle}
            className={`
              px-3 py-1 rounded text-sm transition-colors
              ${playback.autoScroll 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-400 hover:text-white'
              }
            `}
          >
            auto-scroll
          </button>

          {/* 缩放控制 */}
          <div className="flex items-center space-x-1">
            <button
              className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white transition-colors"
              title="缩小"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white transition-colors"
              title="放大"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
