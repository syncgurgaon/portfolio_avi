import { useEffect, useRef } from 'react'
import { scrollProgress } from '../utils/state'
import GlassPanel from './GlassPanel'

import { Shield, Briefcase, Scale, Heart, Home, Handshake } from 'lucide-react'

const ICONS = {
  Shield, Briefcase, Scale,
  Heart, Home, Handshake,
}

export default function PracticeAreas({ content }) {
  const ref = useRef()
  useEffect(() => {
    const t = setInterval(() => {
      if (!ref.current) return
      const v = scrollProgress >= 0.14 && scrollProgress < 0.30
      ref.current.classList.toggle('visible', v)
    }, 50)
    return () => clearInterval(t)
  }, [])

  return (
    <div id="act-practice" ref={ref} className="section-overlay">
      <GlassPanel>
        <div className="section-label">Practice Areas</div>
        <h2 className="heading-sm" style={{ marginBottom: '1rem' }}>
          Pillars of <span className="gold-text">Expertise</span>
        </h2>
        <div className="practice-grid">
          {content.practice_areas.map(area => {
            const Icon = ICONS[area.icon] || Scale
            return (
              <div key={area.id} className="practice-item">
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon size={16} strokeWidth={2.5} /> {area.name}
                </h4>
                <p>{area.description}</p>
              </div>
            )
          })}
        </div>
      </GlassPanel>
    </div>
  )
}
