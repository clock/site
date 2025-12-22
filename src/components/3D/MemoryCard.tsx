import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { Text } from '@react-three/drei'

interface MemoryCardProps {
  position: [number, number, number]
  rotation: number
  label: string
  icon: string
  isSelected: boolean
  onClick: () => void
  index: number
}

export default function MemoryCard({ 
  position, 
  rotation, 
  label, 
  icon, 
  isSelected, 
  onClick,
  index 
}: MemoryCardProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return
    
    const targetY = isSelected ? position[1] + 0.3 : position[1]
    const targetScale = isSelected ? 1.2 : hovered ? 1.1 : 1
    
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1
    meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1
    meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.1
    meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.1
    
    // Subtle rotation animation
    meshRef.current.rotation.y = rotation + Math.sin(state.clock.elapsedTime + index) * 0.05
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        rotation={[0, rotation, 0]}
      >
        {/* Memory card body */}
        <boxGeometry args={[1.2, 1.6, 0.1]} />
        <meshStandardMaterial
          color={isSelected ? '#00aaff' : hovered ? '#0066cc' : '#003399'}
          metalness={0.3}
          roughness={0.7}
          emissive={isSelected ? '#003399' : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>
      
      {/* Label on card */}
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.15}
        color={isSelected ? '#ffffff' : '#cccccc'}
        anchorX="center"
        anchorY="middle"
        renderOrder={1}
      >
        {label}
      </Text>
      
      {/* Selection glow */}
      {isSelected && (
        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[1.4, 1.8, 0.05]} />
          <meshStandardMaterial
            color="#00aaff"
            transparent
            opacity={0.3}
            emissive="#00aaff"
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </group>
  )
}

