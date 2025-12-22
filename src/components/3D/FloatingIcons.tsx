import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useMousePosition } from '@/hooks/useMousePosition'

function FloatingShape({ position, delay, shape, mouseInfluence }: { position: [number, number, number], delay: number, shape: 'box' | 'sphere' | 'torus', mouseInfluence: [number, number] }) {
  const meshRef = useRef<Mesh>(null)
  const basePosition = useRef([position[0], position[1], position[2]])

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime + delay
    const floatY = Math.sin(time) * 0.5
    const floatX = Math.cos(time * 0.3) * 0.2
    
    const influenceStrength = 0.2
    meshRef.current.position.x = basePosition.current[0] + floatX + (mouseInfluence[0] * influenceStrength)
    meshRef.current.position.y = basePosition.current[1] + floatY + (mouseInfluence[1] * influenceStrength)
    
    meshRef.current.rotation.y = time * 0.5 + (mouseInfluence[0] * 0.1)
    meshRef.current.rotation.x = Math.cos(time * 0.3) * 0.2 + (mouseInfluence[1] * 0.05)
  })

  const geometry = 
    shape === 'box' ? <boxGeometry args={[0.4, 0.4, 0.4]} /> :
    shape === 'sphere' ? <sphereGeometry args={[0.3, 16, 16]} /> :
    <torusGeometry args={[0.25, 0.1, 16, 32]} />

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial
        color="#10b981"
        transparent
        opacity={0.6}
        emissive="#06b6d4"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

export default function FloatingIcons() {
  const shapes: ('box' | 'sphere' | 'torus')[] = ['box', 'sphere', 'torus', 'box', 'sphere', 'torus']
  const mousePos = useMousePosition()
  
  const mouseInfluence: [number, number] = [
    typeof window !== 'undefined' ? ((mousePos.x / window.innerWidth) * 2 - 1) * 0.5 : 0,
    typeof window !== 'undefined' ? -(((mousePos.y / window.innerHeight) * 2 - 1) * 0.5) : 0
  ]
  
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#10b981" />
      {shapes.map((shape, i) => (
        <FloatingShape
          key={i}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4
          ]}
          delay={i * 0.5}
          shape={shape}
          mouseInfluence={mouseInfluence}
        />
      ))}
    </>
  )
}

