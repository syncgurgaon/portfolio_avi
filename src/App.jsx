import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, Environment, AdaptiveDpr } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import Lenis from 'lenis'
import * as THREE from 'three'
import { MessageCircle } from 'lucide-react'

import content from './config/content.yaml'
import { setScrollProgress } from './utils/state'
import SupremeCourt from './scenes/SupremeCourt'
import LawyerFigure from './scenes/LawyerFigure'
import GoldenParticles from './scenes/GoldenParticles'
import CinematicCamera from './scenes/CinematicCamera'
import LoadingScreen from './components/LoadingScreen'
import HeroOverlay from './components/HeroOverlay'
import PracticeAreas from './components/PracticeAreas'
import Achievements from './components/Achievements'
import Testimonials from './components/Testimonials'
import AboutPanel from './components/AboutPanel'
import WhatsAppCTA from './components/WhatsAppCTA'
import Footer from './components/Footer'

export default function App() {
  const [loaded, setLoaded]         = useState(false)
  const [progress, setProgress]     = useState(0)
  const lenisRef                    = useRef(null)

  /* ── Lenis smooth scroll ──────────────────────── */
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    lenisRef.current = lenis

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(lenis.scroll / max, 1) : 0
      setScrollProgress(progress)
      setProgress(Math.round(progress * 100))
    }
    lenis.on('scroll', onScroll)

    return () => { lenis.destroy() }
  }, [])

  /* ── Loading timer ────────────────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {/* Progress bar */}
      <div id="progress-bar" style={{ width: `${progress}%` }} />

      {/* Loading */}
      <LoadingScreen loaded={loaded} name={content.personal.name} />

      {/* Fixed 3D Canvas */}
      <div id="canvas-wrap">
        <Canvas
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
          camera={{ fov: 50, near: 0.1, far: 300 }}
          shadows={{ type: THREE.PCFShadowMap }}
        >
          <AdaptiveDpr pixelated />
          <fog attach="fog" args={['#0D0D1A', 40, 130]} />
          <ambientLight intensity={0.3} color="#C9A84C" />
          <directionalLight
            position={[10, 20, 10]}
            intensity={1.2}
            castShadow
            color="#FFF5D0"
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[0, 15, 0]} intensity={0.8} color="#C9A84C" distance={40} />

          <Suspense fallback={null}>
            <Environment preset="night" />
            <Stars radius={120} depth={60} count={3000} factor={4} fade speed={0.3} />
            <SupremeCourt />
            <LawyerFigure />
            <GoldenParticles count={content.scene.particle_count} />
            <CinematicCamera />
          </Suspense>

          <EffectComposer>
            <Bloom intensity={0.6} luminanceThreshold={0.3} luminanceSmoothing={0.9} mipmapBlur />
            <Vignette eskil={false} offset={0.15} darkness={0.65} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Scroll driver */}
      <div id="scroll-driver" />

      <HeroOverlay content={content} />
      <PracticeAreas content={content} />
      <Achievements content={content} />
      <Testimonials content={content} />
      <AboutPanel content={content} />
      <WhatsAppCTA content={content} />

      {/* Floating WhatsApp bubble */}
      <a
        id="wa-float"
        href={`https://wa.me/${content.contact.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(content.contact.prefilled_message)}`}
        target="_blank"
        rel="noreferrer"
        title={`Chat with ${content.personal.name}`}
      >
        <MessageCircle size={28} />
      </a>

      <Footer content={content} />
    </>
  )
}
