import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial, Text } from '@react-three/drei'
import * as THREE from 'three'

const GOLD    = new THREE.MeshStandardMaterial({ color: '#C9A84C', metalness: 0.9, roughness: 0.15 })
const STONE   = new THREE.MeshStandardMaterial({ color: '#D8CEB8', metalness: 0.05, roughness: 0.75 })
const MARBLE  = new THREE.MeshStandardMaterial({ color: '#E8E0D0', metalness: 0.08, roughness: 0.4 })
const DARK_STONE = new THREE.MeshStandardMaterial({ color: '#3A3228', metalness: 0.05, roughness: 0.8 })

function Dome() {
  return (
    <group position={[0, 19, 0]}>
      {/* Main hemisphere */}
      <mesh material={STONE} castShadow>
        <sphereGeometry args={[5.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      {/* Gold band at base */}
      <mesh position={[0, -0.2, 0]} material={GOLD}>
        <cylinderGeometry args={[5.6, 5.6, 0.5, 32]} />
      </mesh>
      {/* Gold finial */}
      <mesh position={[0, 5.8, 0]} material={GOLD} castShadow>
        <coneGeometry args={[0.5, 1.8, 8]} />
      </mesh>
      <mesh position={[0, 4.6, 0]} material={GOLD}>
        <sphereGeometry args={[0.6, 16, 16]} />
      </mesh>
    </group>
  )
}

function AshokChakra() {
  const ref = useRef()
  useFrame((_, delta) => { ref.current.rotation.z += delta * 0.2 })

  const spokes = useMemo(() => {
    const arr = []
    for (let i = 0; i < 24; i++) {
      arr.push((i / 24) * Math.PI * 2)
    }
    return arr
  }, [])

  return (
    <group ref={ref} position={[0, 25.5, 5.6]} rotation={[0, 0, 0]}>
      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[1.4, 0.09, 12, 48]} />
        <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.1} emissive="#C9A84C" emissiveIntensity={0.4} />
      </mesh>
      {/* Hub */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.1} emissive="#C9A84C" emissiveIntensity={0.5} />
      </mesh>
      {/* Spokes */}
      {spokes.map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.7, Math.sin(angle) * 0.7, 0]} rotation={[0, 0, angle]}>
          <boxGeometry args={[0.04, 1.3, 0.04]} />
          <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.1} emissive="#C9A84C" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function Pillars({ count = 12 }) {
  const pillars = useMemo(() => {
    const arr = []
    const halfW = 10
    // Front row
    for (let i = 0; i < count / 2; i++) {
      arr.push({ x: -halfW + (i / (count / 2 - 1)) * halfW * 2, z: 6 })
    }
    // Back row
    for (let i = 0; i < count / 2; i++) {
      arr.push({ x: -halfW + (i / (count / 2 - 1)) * halfW * 2, z: -6 })
    }
    return arr
  }, [count])

  return (
    <group position={[0, 0, 0]}>
      {pillars.map((p, i) => (
        <group key={i} position={[p.x, 0, p.z]}>
          {/* Shaft */}
          <mesh material={STONE} castShadow receiveShadow position={[0, 8.5, 0]}>
            <cylinderGeometry args={[0.42, 0.5, 17, 10]} />
          </mesh>
          {/* Capital */}
          <mesh material={MARBLE} castShadow position={[0, 17.5, 0]}>
            <cylinderGeometry args={[0.7, 0.45, 0.8, 10]} />
          </mesh>
          {/* Base */}
          <mesh material={MARBLE} position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.7, 0.75, 0.6, 10]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Entablature() {
  return (
    <group position={[0, 18.5, 0]}>
      {/* Main beam front */}
      <mesh material={STONE} receiveShadow castShadow position={[0, 0, 6]}>
        <boxGeometry args={[22, 1.2, 1.5]} />
      </mesh>
      {/* Main beam back */}
      <mesh material={STONE} receiveShadow castShadow position={[0, 0, -6]}>
        <boxGeometry args={[22, 1.2, 1.5]} />
      </mesh>
      {/* Side beams */}
      <mesh material={STONE} castShadow position={[11, 0, 0]}>
        <boxGeometry args={[1.5, 1.2, 12]} />
      </mesh>
      <mesh material={STONE} castShadow position={[-11, 0, 0]}>
        <boxGeometry args={[1.5, 1.2, 12]} />
      </mesh>
      {/* Frieze text */}
      <Text
        position={[0, 0.1, 6.8]}
        fontSize={0.55}
        color="#C9A84C"
        anchorX="center"
        anchorY="middle"
        maxWidth={20}
      >
        JUSTICE • EQUALITY • LIBERTY
      </Text>
    </group>
  )
}

function Staircase() {
  const steps = [
    { y: 0.25, w: 26, d: 18, h: 0.5 },
    { y: 0.75, w: 24, d: 16, h: 0.5 },
    { y: 1.25, w: 22, d: 14, h: 0.5 },
    { y: 1.75, w: 20, d: 12, h: 0.5 },
    { y: 2.25, w: 18, d: 10, h: 0.5 },
  ]
  return (
    <group position={[0, 0, 0]}>
      {steps.map((s, i) => (
        <mesh key={i} material={MARBLE} position={[0, s.y, 0]} receiveShadow castShadow>
          <boxGeometry args={[s.w, s.h, s.d]} />
        </mesh>
      ))}
    </group>
  )
}

function Plinth() {
  return (
    <mesh material={DARK_STONE} position={[0, -0.5, 0]} receiveShadow>
      <boxGeometry args={[28, 1, 20]} />
    </mesh>
  )
}

function MarbleFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={512}
        mixBlur={0.8}
        mixStrength={40}
        roughness={0.9}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#1A1510"
        metalness={0.5}
        mirror={0.5}
      />
    </mesh>
  )
}

function BreathingLight() {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.intensity = 0.5 + 0.3 * Math.sin(t * 0.4)
    ref.current.color.setHSL(0.09 + 0.02 * Math.sin(t * 0.2), 0.8, 0.5)
  })
  return <pointLight ref={ref} position={[0, 30, 0]} intensity={0.8} distance={60} />
}

export default function SupremeCourt() {
  return (
    <group>
      <Plinth />
      <Staircase />
      <Pillars count={12} />
      <Entablature />
      <Dome />
      <AshokChakra />
      <MarbleFloor />
      <BreathingLight />
    </group>
  )
}
