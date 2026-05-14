export default function GlassPanel({ children, className = '', style = {} }) {
  return (
    <div className={`glass-card ${className}`} style={style}>
      <div className="glass-card-gold-bar" />
      {children}
    </div>
  )
}
