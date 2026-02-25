import { useEffect, useState, useRef } from 'react'

interface TerminalLine {
  type: 'command' | 'output'
  text: string
}

const terminalSequence: TerminalLine[] = [
  { type: 'command', text: '$ cat aiden.json' },
  { type: 'output', text: '{' },
  { type: 'output', text: '\t"name": "Aiden",' },
  { type: 'output', text: '\t"skills": ["C++", "React", "TypeScript", "Python"],' },
  { type: 'output', text: '\t"focus": "Game security & anticheat development"' },
  { type: 'output', text: '}' },
]

export default function Terminal() {
  const [lines, setLines] = useState<Array<{ type: string, text: string }>>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (currentLine >= terminalSequence.length) return

    const line = terminalSequence[currentLine]
    
    const delay = currentChar === 0 ? (currentLine === 0 ? 500 : 800) : 30
    
    timeoutRef.current = setTimeout(() => {
      if (currentChar < line.text.length) {
        setLines((prev) => {
          const newLines = [...prev]
          if (newLines.length <= currentLine) {
            newLines.push({ type: line.type, text: '' })
          }
          newLines[currentLine].text = line.text.substring(0, currentChar + 1)
          return newLines
        })
        setCurrentChar((prev) => prev + 1)
      } else {
        setCurrentLine((prev) => prev + 1)
        setCurrentChar(0)
      }
    }, delay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentLine, currentChar])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-card border border-border-dark p-6">
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="relative">
        {/* Ghost layer — all final content rendered invisibly to pre-allocate the full height */}
        <div className="invisible space-y-1 font-mono text-sm" aria-hidden>
          {terminalSequence.map((line, idx) => (
            <div key={idx}>
              {line.type === 'command' && <span>$ </span>}
              {line.text}
            </div>
          ))}
          <div>$ █</div>
        </div>
        {/* Visible typed content — overlaid absolutely so it never changes the container size */}
        <div className="absolute inset-0 space-y-1 font-mono text-sm">
          {lines.map((line, idx) => (
            <div key={idx} className={line.type === 'command' ? 'text-accent' : 'text-gray-400'}>
              {line.type === 'command' && <span>$ </span>}
              {line.text}
            </div>
          ))}
          <div className="text-accent">
            <span>$ </span>
            <span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>
          </div>
        </div>
      </div>
    </div>
  )
}
