import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useMousePosition } from '@/hooks/useMousePosition'

function FloatingParticle({ position, delay, mouseInfluence }: { position: [number, number, number], delay: number, mouseInfluence: [number, number] }) {
  const meshRef = useRef<Mesh>(null)
  const basePosition = useRef([position[0], position[1], position[2]])

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime + delay
    
    const floatY = Math.sin(time) * 0.3
    const floatX = Math.cos(time * 0.7) * 0.2
    
    const influenceStrength = 0.3
    meshRef.current.position.x = basePosition.current[0] + floatX + (mouseInfluence[0] * influenceStrength)
    meshRef.current.position.y = basePosition.current[1] + floatY + (mouseInfluence[1] * influenceStrength)
    meshRef.current.position.z = position[2]
    
    meshRef.current.rotation.x = time * 0.3
    meshRef.current.rotation.y = time * 0.5
  })

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial
        color="#10b981"
        transparent
        opacity={0.6}
        emissive="#10b981"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

export default function ContactVisualization() {
  const mousePos = useMousePosition()
  
  const mouseInfluence: [number, number] = [
    typeof window !== 'undefined' ? (mousePos.x / window.innerWidth) * 2 - 1 : 0,
    typeof window !== 'undefined' ? -((mousePos.y / window.innerHeight) * 2 - 1) : 0
  ]

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#10b981" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 2 + (i % 3) * 0.5
        return (
          <FloatingParticle
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 1.5,
              -3 + (i % 4) * 0.5
            ]}
            delay={i * 0.2}
            mouseInfluence={mouseInfluence}
          />
        )
      })}
    </>
  )
}

