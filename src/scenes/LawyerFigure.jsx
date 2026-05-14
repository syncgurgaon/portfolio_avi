import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ROBE  = new THREE.MeshStandardMaterial({ color: '#111111', roughness: 0.85, metalness: 0.05 })
const SKIN  = new THREE.MeshStandardMaterial({ color: '#C68642', roughness: 0.8 })
const WHITE = new THREE.MeshStandardMaterial({ color: '#EEEEEE', roughness: 0.6 })
const BAND  = new THREE.MeshStandardMaterial({ color: '#F5F5F0', roughness: 0.4 })
const PAPER = new THREE.MeshStandardMaterial({ color: '#F0EAD6', roughness: 0.9 })

export default function LawyerFigure() {
  const group = useRef()
  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.rotation.y = 0.08 * Math.sin(t * 0.5)
    group.current.position.y = 2.6 + 0.04 * Math.sin(t * 0.8)
  })

  return (
    <group ref={group} position={[0, 2.6, 7]} castShadow>
      {/* Legs */}
      <mesh material={ROBE} position={[-0.18, -1.3, 0]}>
        <capsuleGeometry args={[0.14, 1.2, 4, 8]} />
      </mesh>
      <mesh material={ROBE} position={[0.18, -1.3, 0]}>
        <capsuleGeometry args={[0.14, 1.2, 4, 8]} />
      </mesh>

      {/* Torso / robe */}
      <mesh material={ROBE} position={[0, -0.2, 0]}>
        <capsuleGeometry args={[0.42, 1.1, 4, 10]} />
      </mesh>

      {/* White shirt underlay */}
      <mesh material={WHITE} position={[0, 0.05, 0.3]}>
        <boxGeometry args={[0.5, 0.6, 0.05]} />
      </mesh>

      {/* Lawyer band collar */}
      <mesh material={BAND} position={[0, 0.45, 0.35]}>
        <boxGeometry args={[0.22, 0.28, 0.03]} />
      </mesh>
      <mesh material={BAND} position={[-0.04, 0.35, 0.35]}>
        <boxGeometry args={[0.06, 0.18, 0.03]} />
      </mesh>
      <mesh material={BAND} position={[0.04, 0.35, 0.35]}>
        <boxGeometry args={[0.06, 0.18, 0.03]} />
      </mesh>

      {/* Arms */}
      <mesh material={ROBE} position={[-0.58, -0.1, 0]} rotation={[0, 0, 0.18]}>
        <capsuleGeometry args={[0.12, 0.9, 4, 8]} />
      </mesh>
      <mesh material={ROBE} position={[0.58, -0.1, 0]} rotation={[0, 0, -0.18]}>
        <capsuleGeometry args={[0.12, 0.9, 4, 8]} />
      </mesh>

      {/* Hands */}
      <mesh material={SKIN} position={[-0.62, -0.65, 0]}>
        <sphereGeometry args={[0.11, 8, 8]} />
      </mesh>
      <mesh material={SKIN} position={[0.62, -0.65, 0]}>
        <sphereGeometry args={[0.11, 8, 8]} />
      </mesh>

      {/* Case file */}
      <mesh material={PAPER} position={[0.7, -0.5, 0.05]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[0.25, 0.35, 0.04]} />
      </mesh>

      {/* Neck */}
      <mesh material={SKIN} position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.25, 8]} />
      </mesh>

      {/* Head */}
      <mesh material={SKIN} position={[0, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
      </mesh>

      {/* Hair */}
      <mesh material={new THREE.MeshStandardMaterial({ color: '#1A0A00', roughness: 0.9 })} position={[0, 1.12, -0.05]}>
        <sphereGeometry args={[0.29, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
      </mesh>

      {/* Bun */}
      <mesh material={new THREE.MeshStandardMaterial({ color: '#1A0A00', roughness: 0.9 })} position={[0, 1.22, -0.22]}>
        <sphereGeometry args={[0.1, 8, 8]} />
      </mesh>
    </group>
  )
}
