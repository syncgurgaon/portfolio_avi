import { useEffect, useRef, useState } from 'react'
import { scrollProgress } from '../utils/state'
import GlassPanel from './GlassPanel'
import { Star } from 'lucide-react'

export default function Testimonials({ content }) {
  const ref = useRef()
  const [idx, setIdx] = useState(0)
  const testimonials = content.testimonials

  useEffect(() => {
    const t = setInterval(() => {
      if (!ref.current) return
      const v = scrollProgress >= 0.45 && scrollProgress < 0.61
      ref.current.classList.toggle('visible', v)
    }, 50)
    return () => clearInterval(t)
  }, [])

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % testimonials.length), 4500)
    return () => clearInterval(id)
  }, [testimonials.length])

  const t = testimonials[idx]

  return (
    <div id="act-testimonials" ref={ref} className="section-overlay">
      <GlassPanel>
        <div className="section-label">Client Voices</div>
        <h2 className="heading-sm" style={{ marginBottom: '1rem' }}>
          <span className="gold-text">Testimonials</span>
        </h2>
        <div className="testimonial-card">
          <div className="stars">
            {Array.from({ length: t.stars }).map((_, i) => (
              <Star key={i} size={14} fill="currentColor" style={{ marginRight: '4px' }} />
            ))}
          </div>
          <p className="testimonial-quote">{t.quote}</p>
          <div className="testimonial-author">{t.name}</div>
          <div className="testimonial-role">{t.role}</div>
        </div>
        <div className="testimonial-nav">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`t-dot${i === idx ? ' active' : ''}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
      </GlassPanel>
    </div>
  )
}
