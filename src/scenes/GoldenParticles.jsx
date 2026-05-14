import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function GoldenParticles({ count = 500 }) {
  const ref = useRef()

  const { positions, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds    = new Float32Array(count)
    const offsets   = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = Math.random() * 35
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      speeds[i]   = 0.5 + Math.random() * 1.5
      offsets[i]  = Math.random() * Math.PI * 2
    }
    return { positions, speeds, offsets }
  }, [count])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pos = ref.current.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      let y = positions[i * 3 + 1] - speeds[i] * 0.01
      if (y < -1) y = 35
      pos.array[i * 3]     = positions[i * 3] + 0.5 * Math.sin(t * 0.3 + offsets[i])
      pos.array[i * 3 + 1] = y
      pos.array[i * 3 + 2] = positions[i * 3 + 2]
      positions[i * 3 + 1] = y
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#C9A84C"
        size={0.12}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
