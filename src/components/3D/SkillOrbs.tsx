import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useMousePosition } from '@/hooks/useMousePosition'

const skills = ['React', 'TS', '3D', 'Node', 'UI']

function SkillOrb({ position, delay, label, mouseInfluence }: { position: [number, number, number], delay: number, label: string, mouseInfluence: [number, number] }) {
  const meshRef = useRef<Mesh>(null)
  const basePosition = useRef([position[0], position[1], position[2]])

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime + delay
    const floatY = Math.sin(time) * 0.3
    
    const influenceStrength = 0.25
    meshRef.current.position.x = basePosition.current[0] + (mouseInfluence[0] * influenceStrength)
    meshRef.current.position.y = basePosition.current[1] + floatY + (mouseInfluence[1] * influenceStrength)
    
    meshRef.current.rotation.x = time * 0.5 + (mouseInfluence[1] * 0.1)
    meshRef.current.rotation.y = time * 0.3 + (mouseInfluence[0] * 0.1)
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#10b981"
          transparent
          opacity={0.7}
          emissive="#06b6d4"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}

export default function SkillOrbs() {
  const mousePos = useMousePosition()
  
  const mouseInfluence: [number, number] = [
    typeof window !== 'undefined' ? ((mousePos.x / window.innerWidth) * 2 - 1) * 0.5 : 0,
    typeof window !== 'undefined' ? -(((mousePos.y / window.innerHeight) * 2 - 1) * 0.5) : 0
  ]

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#10b981" />
      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2
        const radius = 2
        return (
          <SkillOrb
            key={skill}
            position={[
              Math.cos(angle) * radius,
              (i - skills.length / 2) * 0.5,
              Math.sin(angle) * radius
            ]}
            delay={i * 0.2}
            label={skill}
            mouseInfluence={mouseInfluence}
          />
        )
      })}
    </>
  )
}

