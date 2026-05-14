import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollProgress } from '../utils/state'

// 6 cinematic keyframes [position, lookAt, fov]
const KEYFRAMES = [
  { pos: [0, 14, 42],  look: [0, 6, 0],  fov: 50 },   // Act 1 — wide establishing
  { pos: [-18, 18, 28], look: [0, 8, 0], fov: 48 },   // Act 2 — orbit left
  { pos: [0, 22, 18],  look: [0, 14, 0], fov: 45 },   // Act 3 — push to dome
  { pos: [10, 4, 20],  look: [0, 4, 0],  fov: 50 },   // Act 4 — lawyer level
  { pos: [0, 5, 14],   look: [0, 5, 0],  fov: 46 },   // Act 5 — face the lawyer
  { pos: [0, 7, 9],    look: [0, 6, 0],  fov: 38 },   // Act 6 — close-up CTA
]

function lerpKeyframe(t) {
  const n = KEYFRAMES.length - 1
  const segment = t * n
  const i = Math.min(Math.floor(segment), n - 1)
  const alpha = segment - i
  const a = KEYFRAMES[i]
  const b = KEYFRAMES[i + 1]
  const eased = alpha < 0.5 ? 2 * alpha * alpha : -1 + (4 - 2 * alpha) * alpha
  return {
    pos:  a.pos.map((v, j) => v + (b.pos[j] - v) * eased),
    look: a.look.map((v, j) => v + (b.look[j] - v) * eased),
    fov:  a.fov + (b.fov - a.fov) * eased,
  }
}

export default function CinematicCamera() {
  const { camera } = useThree()
  const targetPos  = useRef(new THREE.Vector3(...KEYFRAMES[0].pos))
  const targetLook = useRef(new THREE.Vector3(...KEYFRAMES[0].look))
  const targetFov  = useRef(KEYFRAMES[0].fov)
  const currentFov = useRef(KEYFRAMES[0].fov)

  useFrame(() => {
    const kf = lerpKeyframe(scrollProgress)
    targetPos.current.set(...kf.pos)
    targetLook.current.set(...kf.look)
    targetFov.current = kf.fov

    camera.position.lerp(targetPos.current, 0.04)
    camera.lookAt(targetLook.current)
    currentFov.current += (targetFov.current - currentFov.current) * 0.04
    camera.fov = currentFov.current
    camera.updateProjectionMatrix()
  })

  return null
}
