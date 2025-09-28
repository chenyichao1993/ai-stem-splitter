import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AudioFile, ProcessingJob, SeparatedStems, User, AudioPlayerState } from '@/types'

interface AppState {
  // User state
  user: User | null
  setUser: (user: User | null) => void
  
  // Audio processing state
  currentJob: ProcessingJob | null
  setCurrentJob: (job: ProcessingJob | null) => void
  
  // Separated stems
  separatedStems: SeparatedStems | null
  setSeparatedStems: (stems: SeparatedStems | null) => void
  
  // Audio player state
  playerState: AudioPlayerState
  setPlayerState: (state: Partial<AudioPlayerState>) => void
  
  // UI state
  isUploading: boolean
  setIsUploading: (uploading: boolean) => void
  
  uploadProgress: number
  setUploadProgress: (progress: number) => void
  
  // Processing history
  processingHistory: ProcessingJob[]
  addToHistory: (job: ProcessingJob) => void
  clearHistory: () => void
  
  // Theme
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),
      
      // Audio processing state
      currentJob: null,
      setCurrentJob: (job) => set({ currentJob: job }),
      
      // Separated stems
      separatedStems: null,
      setSeparatedStems: (stems) => set({ separatedStems: stems }),
      
      // Audio player state
      playerState: {
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        volume: 1,
        currentStem: undefined,
      },
      setPlayerState: (newState) =>
        set((state) => ({
          playerState: { ...state.playerState, ...newState },
        })),
      
      // UI state
      isUploading: false,
      setIsUploading: (uploading) => set({ isUploading: uploading }),
      
      uploadProgress: 0,
      setUploadProgress: (progress) => set({ uploadProgress: progress }),
      
      // Processing history
      processingHistory: [],
      addToHistory: (job) =>
        set((state) => ({
          processingHistory: [job, ...state.processingHistory].slice(0, 50), // Keep last 50 jobs
        })),
      clearHistory: () => set({ processingHistory: [] }),
      
      // Theme
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ai-stem-splitter-storage',
      partialize: (state) => ({
        user: state.user,
        processingHistory: state.processingHistory,
        theme: state.theme,
      }),
    }
  )
)
