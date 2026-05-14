import { Scale } from 'lucide-react'

export default function LoadingScreen({ loaded, name }) {
  return (
    <div id="loading-screen" className={loaded ? 'fade-out' : ''}>
      <div className="loading-icon"><Scale size={48} color="#C9A84C" /></div>
      <div className="loading-text">Entering the Court of<br />{name}</div>
      <div className="loading-bar">
        <div className="loading-bar-fill" />
      </div>
    </div>
  )
}
