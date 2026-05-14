import { useEffect, useRef, useState } from 'react'
import { scrollProgress } from '../utils/state'

export default function HeroOverlay({ content }) {
  const [hidden, setHidden] = useState(false)
  const rafRef = useRef()

  useEffect(() => {
    const check = () => {
      setHidden(scrollProgress > 0.12)
      rafRef.current = requestAnimationFrame(check)
    }
    rafRef.current = requestAnimationFrame(check)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Float WhatsApp bubble after 30%
  useEffect(() => {
    const check = () => {
      const el = document.getElementById('wa-float')
      if (el) el.classList.toggle('visible', scrollProgress > 0.28)
      requestAnimationFrame(check)
    }
    const id = requestAnimationFrame(check)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <>
      <div id="hero-overlay" className={hidden ? 'hidden' : ''}>
        <div className="hero-name">{content.personal.name}</div>
        <div className="hero-divider" />
        <div className="hero-tagline">"{content.personal.tagline}"</div>
      </div>
      <div className="scroll-hint" style={{ opacity: hidden ? 0 : 1 }}>
        <span>Scroll to Enter</span>
        <div className="scroll-arrow" />
      </div>
    </>
  )
}
