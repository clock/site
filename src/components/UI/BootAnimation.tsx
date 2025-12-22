import { useEffect, useState } from 'react'
import { useStore } from '../../store/useStore'

export default function BootAnimation() {
  const [stage, setStage] = useState(0)
  const [text, setText] = useState('')
  const skipBoot = useStore((state) => state.skipBoot)
  const bootSkipped = useStore((state) => state.bootSkipped)

  useEffect(() => {
    if (bootSkipped) return

    const handleKeyPress = () => {
      skipBoot()
    }

    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('click', handleKeyPress)

    const stages = [
      { delay: 500, text: 'PLAYSTATION 2' },
      { delay: 1000, text: 'Loading...' },
      { delay: 1500, text: 'Initializing...' },
      { delay: 2000, text: 'Ready' },
    ]

    const currentStage = stages[stage]
    if (currentStage) {
      const timer = setTimeout(() => {
        setText(currentStage.text)
        if (stage < stages.length - 1) {
          setStage(stage + 1)
        } else {
          setTimeout(() => skipBoot(), 500)
        }
      }, currentStage.delay)

      return () => {
        clearTimeout(timer)
        window.removeEventListener('keydown', handleKeyPress)
        window.removeEventListener('click', handleKeyPress)
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('click', handleKeyPress)
    }
  }, [stage, skipBoot, bootSkipped])

  if (bootSkipped) return null

  return (
    <div className="fixed inset-0 bg-ps2-dark z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl pixel-font mb-8 text-ps2-accent selection-glow">
          {text}
        </div>
        <div className="text-sm text-gray-400 mt-4">
          Press any key to skip...
        </div>
      </div>
    </div>
  )
}

