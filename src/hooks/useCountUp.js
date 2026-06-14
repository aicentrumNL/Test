import { useEffect, useRef, useState } from 'react'

function isStatic() {
  return (
    typeof IntersectionObserver === 'undefined' ||
    (typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  )
}

// Telt een getal op van 0 naar target zodra het element in beeld komt.
// Onder reduced-motion / zonder IntersectionObserver: direct de eindwaarde.
export default function useCountUp(target, { duration = 1400, delay = 0 } = {}) {
  const [value, setValue] = useState(() => (isStatic() ? target : 0))
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (isStatic()) {
      // Niet animeren — eindwaarde tonen (deferred, niet synchroon in effect-body).
      const id = requestAnimationFrame(() => setValue(target))
      return () => cancelAnimationFrame(id)
    }

    let raf = 0
    let started = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return
        started = true
        let startTime = null
        const step = (ts) => {
          if (startTime === null) startTime = ts + delay
          const elapsed = Math.max(0, ts - startTime)
          const progress = Math.min(elapsed / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3) // ease-out cubic
          setValue(Math.round(ease * target))
          if (progress < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, duration, delay])

  return [value, ref]
}
