import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleBackground() {
  const meshRef = useRef<THREE.Points>(null)

  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    if (!meshRef.current) return
    
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.05
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#00ff41"
          transparent
          opacity={0.4}
          sizeAttenuation={true}
        />
      </points>
    </>
  )
}

