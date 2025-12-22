import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

function FloatingShape({ position, delay, shape }: { position: [number, number, number], delay: number, shape: 'sphere' | 'torus' }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime + delay
    meshRef.current.rotation.x = time * 0.4
    meshRef.current.rotation.y = time * 0.6
    meshRef.current.position.y = position[1] + Math.sin(time) * 0.4
  })

  const geometry = shape === 'sphere' 
    ? <sphereGeometry args={[0.5, 32, 32]} />
    : <torusGeometry args={[0.4, 0.15, 16, 32]} />

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial
        color="#10b981"
        transparent
        opacity={0.5}
        emissive="#10b981"
        emissiveIntensity={0.2}
        wireframe
      />
    </mesh>
  )
}

export default function ContactMesh() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#10b981" />
      {[
        { shape: 'sphere' as const, pos: [-2, 0, -3] },
        { shape: 'torus' as const, pos: [0, 1, -2] },
        { shape: 'sphere' as const, pos: [2, -1, -3] },
      ].map((item, i) => (
        <FloatingShape
          key={i}
          position={item.pos}
          delay={i * 0.6}
          shape={item.shape}
        />
      ))}
    </>
  )
}

