import { useEffect, useRef, useState } from 'react'
import { scrollProgress } from '../utils/state'
import GlassPanel from './GlassPanel'

function AnimatedCounter({ target, suffix = '+', visible }) {
  const [val, setVal] = useState(0)
  const rafRef = useRef()
  const startRef = useRef(null)

  useEffect(() => {
    if (!visible) { setVal(0); startRef.current = null; return }
    const duration = 1800
    const animate = (now) => {
      if (!startRef.current) startRef.current = now
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [visible, target])

  return <>{val}{suffix}</>
}

export default function Achievements({ content }) {
  const ref = useRef()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      if (!ref.current) return
      const v = scrollProgress >= 0.29 && scrollProgress < 0.46
      setVisible(v)
      ref.current.classList.toggle('visible', v)
    }, 50)
    return () => clearInterval(t)
  }, [])

  const stats = [
    { n: content.stats.cases_won, suffix: '+', label: 'Cases Won' },
    { n: content.stats.years_experience, suffix: '+', label: 'Years Active' },
    { n: content.stats.happy_clients, suffix: '+', label: 'Clients Served' },
    { n: content.stats.landmark_cases, suffix: '', label: 'Landmark Cases' },
  ]

  return (
    <div id="act-achievements" ref={ref} className="section-overlay">
      <GlassPanel>
        <div className="section-label">Track Record</div>
        <h2 className="heading-sm" style={{ marginBottom: '1.2rem' }}>
          Hall of <span className="gold-text">Achievements</span>
        </h2>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-number">
                <AnimatedCounter target={s.n} suffix={s.suffix} visible={visible} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="section-label" style={{ marginTop: '0.5rem' }}>Landmark Cases</div>
        <div className="landmark-cases">
          {content.landmark_cases.map((c, i) => (
            <div key={i} className="landmark-item">
              <h4>{c.title}</h4>
              <p>{c.description} — <em>{c.court}</em></p>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  )
}
