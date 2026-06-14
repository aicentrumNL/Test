import { useEffect, useRef, useState } from 'react'

// Lichtgewicht scroll-reveal via IntersectionObserver.
// Geeft een ref + boolean terug; de component zet de .is-in klasse.
export default function useReveal({ threshold = 0.15, once = true, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null)
  // Zonder IntersectionObserver (oude browsers/SSR): direct zichtbaar tonen.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once, rootMargin])

  return [ref, inView]
}
