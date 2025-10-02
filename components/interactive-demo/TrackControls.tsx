'use client'

import { AudioTrack } from '@/types/interactive-demo'
import { Mic, Drum, Guitar, Music, Piano, Disc } from 'lucide-react'

interface TrackControlsProps {
  tracks: AudioTrack[]
  onTrackUpdate: (trackId: string, updates: Partial<AudioTrack>) => void
  onTrackClick: (trackId: string) => void
}

const trackIcons = {
  vocals: Mic,
  drums: Drum,
  bass: Guitar,
  guitar: Guitar,
  piano: Piano,
  other: Music,
  instrumental: Disc
}

export function TrackControls({ tracks, onTrackUpdate, onTrackClick }: TrackControlsProps) {
  // 判断是否为免费计划（只有2个音轨）
  const isFreePlan = tracks.length === 2
  const handleVolumeChange = (trackId: string, volume: number) => {
    onTrackUpdate(trackId, { volume })
  }

  const handleSoloToggle = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId)
    if (track) {
      // 如果当前是solo，则取消solo；否则设置solo并取消其他solo
      if (track.isSolo) {
        onTrackUpdate(trackId, { isSolo: false })
      } else {
        // 取消所有其他solo
        tracks.forEach(t => {
          if (t.id !== trackId) {
            onTrackUpdate(t.id, { isSolo: false })
          }
        })
        onTrackUpdate(trackId, { isSolo: true })
      }
    }
  }

  const handleMuteToggle = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId)
    if (track) {
      onTrackUpdate(trackId, { isMuted: !track.isMuted })
    }
  }

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 p-3">
      <div className="space-y-2">
        {tracks.map((track) => {
          const Icon = trackIcons[track.id as keyof typeof trackIcons] || Music
          
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
              style={{ minHeight: isFreePlan ? '120px' : '60px' }}
              onClick={() => onTrackClick(track.id)}
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
                      handleSoloToggle(track.id)
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
                      handleMuteToggle(track.id)
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
                  onChange={(e) => handleVolumeChange(track.id, parseInt(e.target.value))}
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
  )
}
