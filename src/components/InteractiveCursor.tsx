import { useEffect, useRef, useState } from 'react'

export default function InteractiveCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsTouchDevice(false)
    }
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    const cursor = cursorRef.current
    if (!cursor) return

    const updateCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
      cursor.style.opacity = '1'
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        cursor.classList.add('scale-150', 'bg-accent')
      } else {
        cursor.classList.remove('scale-150', 'bg-accent')
      }
    }

    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mousemove', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mousemove', handleMouseEnter)
    }
  }, [isTouchDevice])

  if (isTouchDevice) return null

  return (
    <div
      ref={cursorRef}
      className="fixed w-3 h-3 rounded-full bg-white pointer-events-none z-[10000] mix-blend-difference transition-transform duration-75 ease-out transform -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: 'transform', opacity: 0 }}
    />
  )
}
