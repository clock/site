import { create } from 'zustand'

interface AppState {
  pixelationLevel: '240p' | '360p' | '720p' | 'off'
  scanlinesEnabled: boolean
  motionIntensity: number
  konamiCode: string[]
  devRoomUnlocked: boolean
  
  setPixelationLevel: (level: '240p' | '360p' | '720p' | 'off') => void
  setScanlinesEnabled: (enabled: boolean) => void
  setMotionIntensity: (intensity: number) => void
  addKonamiKey: (key: string) => void
  resetKonamiCode: () => void
}

export const useStore = create<AppState>((set) => ({
  pixelationLevel: '360p',
  scanlinesEnabled: true,
  motionIntensity: 1,
  konamiCode: [],
  devRoomUnlocked: false,

  setPixelationLevel: (level) => set({ pixelationLevel: level }),
  setScanlinesEnabled: (enabled) => set({ scanlinesEnabled: enabled }),
  setMotionIntensity: (intensity) => set({ motionIntensity: intensity }),
  addKonamiKey: (key) => set((state) => {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    const newCode = [...state.konamiCode, key].slice(-10)
    const isMatch = newCode.length === 10 && newCode.every((k, i) => k === konami[i])
    return {
      konamiCode: isMatch ? [] : newCode,
      devRoomUnlocked: isMatch ? !state.devRoomUnlocked : state.devRoomUnlocked
    }
  }),
  resetKonamiCode: () => set({ konamiCode: [] }),
}))
