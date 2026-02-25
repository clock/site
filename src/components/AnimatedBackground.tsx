import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleSystem() {
  const meshRef = useRef<THREE.Points>(null)
  const particlesRef = useRef<THREE.BufferGeometry>(null)

  useEffect(() => {
    if (!particlesRef.current) return

    const particleCount = 2000
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30
      positions[i + 1] = (Math.random() - 0.5) * 30
      positions[i + 2] = (Math.random() - 0.5) * 30
      velocities[i] = (Math.random() - 0.5) * 0.01
      velocities[i + 1] = (Math.random() - 0.5) * 0.01
      velocities[i + 2] = (Math.random() - 0.5) * 0.01
    }

    particlesRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    ;(meshRef.current as any).userData.velocities = velocities
  }, [])

  useFrame((state) => {
    if (!meshRef.current || !particlesRef.current) return
    if (!particlesRef.current.attributes.position) return

    const positions = particlesRef.current.attributes.position.array as Float32Array
    const velocities = (meshRef.current as any).userData.velocities as Float32Array

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocities[i]
      positions[i + 1] += velocities[i + 1]
      positions[i + 2] += velocities[i + 2]

      if (Math.abs(positions[i]) > 15) velocities[i] *= -1
      if (Math.abs(positions[i + 1]) > 15) velocities[i + 1] *= -1
      if (Math.abs(positions[i + 2]) > 15) velocities[i + 2] *= -1
    }

    particlesRef.current.attributes.position.needsUpdate = true

    meshRef.current.rotation.x = state.clock.elapsedTime * 0.05
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={particlesRef} />
      <pointsMaterial
        size={0.05}
        color="#10b981"
        transparent
        opacity={0.4}
        sizeAttenuation={true}
      />
    </points>
  )
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <ParticleSystem />
      </Canvas>
    </div>
  )
}

