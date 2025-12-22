import { useEffect } from 'react'
import { useStore } from '../store/useStore'

export default function PixelationEffect() {
  const pixelationLevel = useStore((state) => state.pixelationLevel)

  useEffect(() => {
    // Apply pixelation via CSS to canvas elements only
    const style = document.createElement('style')
    style.id = 'pixelation-style'
    
    if (pixelationLevel === 'off') {
      style.textContent = `
        canvas {
          image-rendering: auto !important;
        }
      `
    } else {
      style.textContent = `
        canvas {
          image-rendering: pixelated !important;
          image-rendering: -moz-crisp-edges !important;
          image-rendering: crisp-edges !important;
        }
      `
    }
    
    // Remove existing style if present
    const existingStyle = document.getElementById('pixelation-style')
    if (existingStyle) existingStyle.remove()
    
    document.head.appendChild(style)

    return () => {
      const styleToRemove = document.getElementById('pixelation-style')
      if (styleToRemove) styleToRemove.remove()
    }
  }, [pixelationLevel])

  return null
}
