export interface AudioTrack {
  id: string
  name: string
  icon: string
  volume: number
  isSolo: boolean
  isMuted: boolean
  isActive: boolean
  waveform: number[]
  color: string
}

export type PlanType = 'free' | 'premium'

export interface PlaybackState {
  isPlaying: boolean
  currentTime: number
  duration: number
  speed: number
  autoScroll: boolean
}

export interface WaveformData {
  time: number
  amplitude: number
}

export interface DemoConfig {
  planType: PlanType
  tracks: AudioTrack[]
  playback: PlaybackState
}
