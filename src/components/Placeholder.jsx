import { useState } from 'react'
import { Camera } from 'lucide-react'
import './placeholder.css'

// Elegante beeld-placeholder. Toont de afbeelding als die bestaat; anders een
// verzorgd vlak met label. Foto's later in /public/images plaatsen (zie data/site.js).
export default function Placeholder({ src, alt = '', label, ratio = '4 / 3', tone = 'sand', className = '' }) {
  const [failed, setFailed] = useState(false)
  const showImg = src && !failed
  return (
    <figure
      className={`ph ph--${tone} ${className}`}
      style={{ aspectRatio: ratio }}
      data-empty={showImg ? undefined : 'true'}
    >
      {showImg ? (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="ph__inner">
          <span className="ph__grid" aria-hidden="true" />
          <span className="ph__icon"><Camera size={20} strokeWidth={1.4} /></span>
          {label && <span className="ph__label">{label}</span>}
          <span className="ph__note">Foto volgt</span>
        </div>
      )}
    </figure>
  )
}
