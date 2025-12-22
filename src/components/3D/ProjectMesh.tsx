import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useMousePosition } from '@/hooks/useMousePosition'

function FloatingCube({ position, delay, hovered, mouseInfluence }: { position: [number, number, number], delay: number, hovered: boolean, mouseInfluence: [number, number] }) {
  const meshRef = useRef<Mesh>(null)
  const targetY = useRef(position[1])
  const basePosition = useRef([position[0], position[1], position[2]])

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime + delay
    meshRef.current.rotation.x = time * 0.5 + (mouseInfluence[1] * 0.1)
    meshRef.current.rotation.y = time * 0.3 + (mouseInfluence[0] * 0.1)
    
    targetY.current = hovered ? basePosition.current[1] + 0.5 : basePosition.current[1]
    const floatY = Math.sin(time) * 0.3
    
    const influenceStrength = 0.2
    meshRef.current.position.x = basePosition.current[0] + (mouseInfluence[0] * influenceStrength)
    meshRef.current.position.y += (targetY.current + floatY + (mouseInfluence[1] * influenceStrength) - meshRef.current.position.y) * 0.1
    
    const targetScale = hovered ? 1.2 : 1
    meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1
    meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.1
    meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.1
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial
        color="#10b981"
        transparent
        opacity={hovered ? 0.8 : 0.6}
        emissive="#10b981"
        emissiveIntensity={hovered ? 0.4 : 0.2}
        wireframe
      />
    </mesh>
  )
}

interface ProjectMeshProps {
  hoveredCardIndex?: number | null
}

export default function ProjectMesh({ hoveredCardIndex = null }: ProjectMeshProps) {
  const mousePos = useMousePosition()
  
  const mouseInfluence: [number, number] = [
    typeof window !== 'undefined' ? ((mousePos.x / window.innerWidth) * 2 - 1) * 0.5 : 0,
    typeof window !== 'undefined' ? -(((mousePos.y / window.innerHeight) * 2 - 1) * 0.5) : 0
  ]

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#10b981" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <FloatingCube
          key={i}
          position={[
            ((i % 3) - 1) * 2.5,
            -1 + (i % 2) * 0.5 + Math.floor(i / 3) * 1.5,
            -2 + (i % 3)
          ]}
          delay={i * 0.3}
          hovered={hoveredCardIndex === i}
          mouseInfluence={mouseInfluence}
        />
      ))}
    </>
  )
}
