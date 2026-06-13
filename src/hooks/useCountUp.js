import { useEffect, useRef, useState } from 'react'

// Telt een getal op van 0 naar target zodra het element in beeld komt.
export default function useCountUp(target, { duration = 1400, delay = 0 } = {}) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let startTime = null
          const step = (ts) => {
            if (!startTime) startTime = ts + delay
            const elapsed = Math.max(0, ts - startTime)
            const progress = Math.min(elapsed / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3) // ease-out cubic
            setValue(Math.round(ease * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, delay])

  return [value, ref]
}
