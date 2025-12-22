import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useMousePosition } from '@/hooks/useMousePosition'

function FloatingShape({ position, delay, mouseInfluence, shape }: { position: [number, number, number], delay: number, mouseInfluence: [number, number], shape: 'box' | 'sphere' | 'torus' }) {
  const meshRef = useRef<Mesh>(null)
  const basePosition = useRef([position[0], position[1], position[2]])

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime + delay
    const floatY = Math.sin(time) * 0.4
    const floatX = Math.cos(time * 0.7) * 0.3
    
    const influenceStrength = 0.25
    meshRef.current.position.x = basePosition.current[0] + floatX + (mouseInfluence[0] * influenceStrength)
    meshRef.current.position.y = basePosition.current[1] + floatY + (mouseInfluence[1] * influenceStrength)
    
    meshRef.current.rotation.x = time * 0.4 + (mouseInfluence[1] * 0.1)
    meshRef.current.rotation.y = time * 0.6 + (mouseInfluence[0] * 0.1)
    if (shape === 'torus') {
      meshRef.current.rotation.z = time * 0.3
    }
  })

  const geometry = 
    shape === 'box' ? <boxGeometry args={[0.5, 0.5, 0.5]} /> :
    shape === 'sphere' ? <sphereGeometry args={[0.4, 32, 32]} /> :
    <torusGeometry args={[0.35, 0.12, 16, 32]} />

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial
        color="#10b981"
        transparent
        opacity={0.6}
        emissive="#10b981"
        emissiveIntensity={0.3}
        wireframe={shape === 'box'}
      />
    </mesh>
  )
}

export default function InteractiveAboutMesh() {
  const mousePos = useMousePosition()
  
  const mouseInfluence: [number, number] = [
    typeof window !== 'undefined' ? ((mousePos.x / window.innerWidth) * 2 - 1) * 0.5 : 0,
    typeof window !== 'undefined' ? -(((mousePos.y / window.innerHeight) * 2 - 1) * 0.5) : 0
  ]

  const shapes: ('box' | 'sphere' | 'torus')[] = ['box', 'sphere', 'torus', 'box', 'sphere', 'torus', 'box', 'sphere']

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#10b981" />
      <pointLight position={[-5, -5, 5]} intensity={0.3} color="#10b981" />
      
      {shapes.map((shape, i) => {
        const angle = (i / shapes.length) * Math.PI * 2
        const radius = 2.5 + (i % 3) * 0.5
        return (
          <FloatingShape
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 1.5 - 1,
              -3 + (i % 2) * 0.5
            ]}
            delay={i * 0.4}
            mouseInfluence={mouseInfluence}
            shape={shape}
          />
        )
      })}
    </>
  )
}
