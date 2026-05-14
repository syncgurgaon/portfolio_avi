import { useEffect, useRef } from 'react'
import { scrollProgress } from '../utils/state'
import GlassPanel from './GlassPanel'

export default function AboutPanel({ content }) {
  const ref = useRef()
  useEffect(() => {
    const t = setInterval(() => {
      if (!ref.current) return
      const v = scrollProgress >= 0.60 && scrollProgress < 0.79
      ref.current.classList.toggle('visible', v)
    }, 50)
    return () => clearInterval(t)
  }, [])

  const p = content.personal
  return (
    <div id="act-about" ref={ref} className="section-overlay">
      <GlassPanel>
        <div className="section-label">The Advocate</div>
        <h2 className="heading-sm" style={{ marginBottom: '0.75rem' }}>
          Meet <span className="gold-text">{p.name}</span>
        </h2>
        <p className="about-bio">{p.bio}</p>

        <div className="section-label">Education</div>
        <div style={{ marginBottom: '1rem' }}>
          {p.education.map((e, i) => (
            <div key={i} className="edu-item">
              <div className="edu-degree">{e.degree} — {e.year}</div>
              <div className="edu-school">{e.institution}</div>
            </div>
          ))}
        </div>

        <div className="section-label">Languages</div>
        <div className="lang-pills">
          {p.languages.map(l => <span key={l} className="lang-pill">{l}</span>)}
        </div>
        <div style={{ marginTop: '0.8rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          Bar Council ID: {p.bar_council_id}
        </div>
      </GlassPanel>
    </div>
  )
}
