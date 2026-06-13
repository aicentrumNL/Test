import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// Primaire CTA-knop die de cursor magnetisch volgt — een subtiel premium effect.
export default function MagneticBtn({ children, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const onMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 7
    ref.current.style.transform = `translate(${x}px, ${y}px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: 'inline-block', transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)' }}
    >
      {/* Render whatever child element is passed (Link, a, button) */}
      {children({ className })}
    </span>
  )
}
