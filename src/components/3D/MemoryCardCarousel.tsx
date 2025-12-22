import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import MemoryCard from './MemoryCard'
import { useStore, MenuItem } from '../../store/useStore'

const menuItems: { id: MenuItem; label: string; icon: string }[] = [
  { id: 'projects', label: 'PROJECTS', icon: '💾' },
  { id: 'about', label: 'ABOUT', icon: '👤' },
  { id: 'skills', label: 'SKILLS', icon: '⚙️' },
  { id: 'contact', label: 'CONTACT', icon: '📧' },
]

export default function MemoryCardCarousel() {
  const selectedMenuItem = useStore((state) => state.selectedMenuItem)
  const setSelectedMenuItem = useStore((state) => state.setSelectedMenuItem)

  const handleCardClick = (item: MenuItem) => {
    setSelectedMenuItem(item)
  }

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00aaff" />

      {menuItems.map((item, index) => {
        const angle = (index / menuItems.length) * Math.PI * 2
        const radius = 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const rotation = angle + Math.PI / 2

        return (
          <MemoryCard
            key={item.id}
            position={[x, 0, z]}
            rotation={rotation}
            label={item.label}
            icon={item.icon}
            isSelected={selectedMenuItem === item.id}
            onClick={() => handleCardClick(item.id)}
            index={index}
          />
        )
      })}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
        autoRotate={false}
      />
    </>
  )
}

