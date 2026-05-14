import { useEffect, useRef } from 'react'
import { scrollProgress } from '../utils/state'
import GlassPanel from './GlassPanel'
import { Sparkles, MessageCircle, MapPin, Clock, Mail } from 'lucide-react'

export default function WhatsAppCTA({ content }) {
  const ref = useRef()
  useEffect(() => {
    const t = setInterval(() => {
      if (!ref.current) return
      const v = scrollProgress >= 0.78
      ref.current.classList.toggle('visible', v)
      // Show footer too
      const footer = document.getElementById('footer')
      if (footer) footer.classList.toggle('visible', v)
    }, 50)
    return () => clearInterval(t)
  }, [])

  const c = content.contact
  const waLink = `https://wa.me/${c.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(c.prefilled_message)}`

  return (
    <div id="act-cta" ref={ref} className="section-overlay">
      <GlassPanel style={{ textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>The Verdict</div>
        {c.free_consultation && (
          <div className="free-badge">
            <Sparkles size={12} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} /> 
            Free First Consultation
          </div>
        )}
        <h2 className="cta-heading">
          Ready for <span className="gold-text">Justice</span>?
        </h2>
        <p className="cta-sub">
          Get expert legal guidance from {content.personal.name}.<br />
          Instant response, confidential consultation.
        </p>
        <a href={waLink} target="_blank" rel="noreferrer" className="wa-button">
          <span className="wa-icon" style={{ display: 'flex' }}><MessageCircle size={24} /></span>
          {c.cta_text}
        </a>
        <div className="cta-details" style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} /> {c.office}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {c.hours}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> {c.email}</div>
        </div>
      </GlassPanel>
    </div>
  )
}
