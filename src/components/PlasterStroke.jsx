import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import './plasterstroke.css'

// Decoratief SVG-plamuurstreek element dat zichzelf "insmeer" bij page load.
// Pure CSS-animatie via stroke-dashoffset — geen JavaScript nodig.
export default function PlasterStroke({ className = '' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  useEffect(() => {
    if (reduce || !ref.current) return
    const paths = ref.current.querySelectorAll('.ps__path')
    paths.forEach((p) => {
      const len = p.getTotalLength()
      p.style.strokeDasharray = len
      p.style.strokeDashoffset = len
      // Trigger reflow so transition picks up the start state
      void p.getBoundingClientRect()
      p.style.transition = `stroke-dashoffset ${p.dataset.dur || '1.6'}s ${p.dataset.delay || '0'}s cubic-bezier(0.22, 1, 0.36, 1)`
      p.style.strokeDashoffset = '0'
    })
  }, [reduce])

  return (
    <svg
      ref={ref}
      className={`ps ${className}`}
      viewBox="0 0 900 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Brede, soepele plamuurstreken — drie lagen voor diepte */}
      <path
        className="ps__path"
        data-dur="2.2"
        data-delay="0"
        d="M20 170 C120 90 260 55 420 72 C580 89 680 130 860 100"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        className="ps__path"
        data-dur="2.0"
        data-delay="0.35"
        d="M-10 148 C80 110 220 82 380 95 C540 108 660 148 880 118"
        stroke="var(--taupe)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        className="ps__path"
        data-dur="1.8"
        data-delay="0.6"
        d="M30 190 C140 155 300 130 460 145 C620 160 740 182 900 158"
        stroke="var(--sand)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}
