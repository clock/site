import { useEffect } from 'react'
import { useStore, MenuItem } from '../../store/useStore'

const menuItems: { id: MenuItem; label: string }[] = [
  { id: 'projects', label: 'Start Game' },
  { id: 'about', label: 'Load Game' },
  { id: 'skills', label: 'Options' },
  { id: 'contact', label: 'Credits' },
]

export default function MenuPanel() {
  const selectedMenuItem = useStore((state) => state.selectedMenuItem)
  const setSelectedMenuItem = useStore((state) => state.setSelectedMenuItem)
  const setCurrentView = useStore((state) => state.setCurrentView)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMenuItem) {
        setSelectedMenuItem('projects')
        return
      }

      const currentIndex = menuItems.findIndex((item) => item.id === selectedMenuItem)
      
      switch (e.key) {
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault()
          const nextIndex = (currentIndex + 1) % menuItems.length
          setSelectedMenuItem(menuItems[nextIndex].id)
          break
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault()
          const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length
          setSelectedMenuItem(menuItems[prevIndex].id)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (selectedMenuItem === 'contact') {
            setCurrentView('contact')
          }
          // Other menu items show their panels automatically
          break
        case 'Escape':
          e.preventDefault()
          setSelectedMenuItem(null)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedMenuItem, setSelectedMenuItem, setCurrentView])

  return (
    <div className="fixed bottom-8 left-8 z-40 pointer-events-auto">
      <div className="bg-ps2-gray/90 backdrop-blur-sm pixel-border gel-highlight p-6 rounded-lg min-w-[300px]">
        <div className="text-xs text-gray-400 mb-4 pixel-font">NAVIGATION</div>
        <div className="space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded cursor-pointer transition-all ${
                selectedMenuItem === item.id
                  ? 'menu-item-active bg-ps2-light pixel-border-inset'
                  : 'hover:bg-ps2-light/50'
              }`}
              onClick={() => setSelectedMenuItem(item.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{selectedMenuItem === item.id ? '▶' : '○'}</span>
                <span className="pixel-font">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-500">
          [↑↓] Navigate | [Enter] Select | [Esc] Back
        </div>
      </div>
    </div>
  )
}

