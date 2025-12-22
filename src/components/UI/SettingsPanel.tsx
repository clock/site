import { useStore } from '../../store/useStore'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const pixelationLevel = useStore((state) => state.pixelationLevel)
  const setPixelationLevel = useStore((state) => state.setPixelationLevel)
  const scanlinesEnabled = useStore((state) => state.scanlinesEnabled)
  const setScanlinesEnabled = useStore((state) => state.setScanlinesEnabled)
  const motionIntensity = useStore((state) => state.motionIntensity)
  const setMotionIntensity = useStore((state) => state.setMotionIntensity)
  
  const devRoomUnlocked = useStore((state) => state.devRoomUnlocked)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 right-4 z-40 font-mono border-hacker-border text-hacker-green hover:bg-hacker-dark"
      >
        &gt; settings
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <Card className="relative bg-hacker-dark border-hacker-border max-w-md w-full mx-4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="font-mono text-hacker-green text-xl">
                  &gt; settings
                </CardTitle>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-hacker-green transition-colors text-xl font-mono"
                >
                  &times;
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-xs text-gray-400 font-mono mb-2">
                  &gt; pixelation_level
                </label>
                <div className="flex gap-2">
                  {(['off', '240p', '360p', '720p'] as const).map((level) => (
                    <Button
                      key={level}
                      variant={pixelationLevel === level ? 'hacker' : 'outline'}
                      size="sm"
                      onClick={() => setPixelationLevel(level)}
                      className={cn(
                        "flex-1 font-mono text-xs",
                        pixelationLevel === level
                          ? ""
                          : "border-hacker-border text-gray-400 hover:bg-hacker-dark"
                      )}
                    >
                      {level === 'off' ? 'off' : level}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 font-mono mb-2">
                  &gt; scanlines
                </label>
                <Button
                  variant={scanlinesEnabled ? 'hacker' : 'outline'}
                  onClick={() => setScanlinesEnabled(!scanlinesEnabled)}
                  className={cn(
                    "w-full font-mono",
                    !scanlinesEnabled && "border-hacker-border text-gray-400 hover:bg-hacker-dark"
                  )}
                >
                  {scanlinesEnabled ? 'on' : 'off'}
                </Button>
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 font-mono mb-2">
                  &gt; motion_intensity: {motionIntensity.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={motionIntensity}
                  onChange={(e) => setMotionIntensity(parseFloat(e.target.value))}
                  className="w-full accent-hacker-green"
                />
              </div>

              {devRoomUnlocked && (
                <div className="mt-4 pt-4 border-t border-hacker-green">
                  <div className="text-xs text-hacker-green font-mono mb-2">
                    &gt; dev_room_unlocked
                  </div>
                  <div className="text-sm text-gray-400 font-mono">
                    You found the easter egg!
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

