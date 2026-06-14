import { useEffect, useId, useRef } from 'react'
import './rakinglight.css'

/*
  Strijklicht — een glad gestuukt oppervlak dat oplicht onder een lichtbron die de
  cursor volgt. Precies hoe een stukadoor de vlakheid van een wand keurt: licht onder
  een scherpe hoek maakt elke oneffenheid zichtbaar.

  Techniek: feTurbulence (lage frequentie → brede, zachte golving i.p.v. korrel) levert
  een vlakke pleister-ondergrond. Het GG-monogram (transparante PNG → alpha = vorm) wordt
  via feImage + feGaussianBlur als zacht reliëf in die hoogtekaart geperst. feDiffuseLighting
  met een meebewegende <fePointLight> onthult het logo "in de verse pleister". Geen foto's.

  Fallbacks: zonder muis een trage auto-sweep; bij prefers-reduced-motion statisch belicht
  onder een hoek die het reliëf subtiel zichtbaar houdt.
*/
export default function RakingLight({ className = '', label, monogram = '/images/monogram-gouw.png' }) {
  const id = useId().replace(/:/g, '')
  const wrapRef = useRef(null)
  const lightRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const light = lightRef.current
    if (!wrap || !light) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // SVG user-space: 100 breed × 130 hoog
    const W = 100, H = 130
    const cur = { x: 30, y: 26 }       // huidige lichtpositie
    const target = { x: 30, y: 26 }    // doelpositie
    let pointerActive = false
    let lastMove = 0
    let raf = 0

    if (reduce) {
      light.setAttribute('x', '26')
      light.setAttribute('y', '30')
      return
    }

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      target.x = Math.max(-10, Math.min(W + 10, px * W))
      target.y = Math.max(-10, Math.min(H + 10, py * H))
      pointerActive = true
      lastMove = performance.now()
    }
    const onLeave = () => { pointerActive = false }

    const loop = (t) => {
      if (!running) return
      // Auto-sweep wanneer de cursor niet (recent) actief is
      if (!pointerActive || t - lastMove > 2200) {
        const phase = t / 3400
        target.x = W * 0.5 + Math.cos(phase) * W * 0.46
        target.y = H * 0.2 + Math.sin(phase * 0.7) * H * 0.12
      }
      // Soepel naar doel bewegen (lerp)
      cur.x += (target.x - cur.x) * 0.08
      cur.y += (target.y - cur.y) * 0.08
      light.setAttribute('x', cur.x.toFixed(2))
      light.setAttribute('y', cur.y.toFixed(2))
      raf = requestAnimationFrame(loop)
    }

    // Filter-rendering pauzeren wanneer het paneel buiten beeld is (performance)
    let running = false
    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(loop) } }
    const stop = () => { running = false; cancelAnimationFrame(raf) }
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0.05 },
    )
    io.observe(wrap)

    wrap.addEventListener('pointermove', onMove, { passive: true })
    wrap.addEventListener('pointerleave', onLeave, { passive: true })
    return () => {
      stop()
      io.disconnect()
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={wrapRef} className={`raking ${className}`}>
      <svg className="raking__svg" viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <filter id={`plaster-${id}`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            {/* Gladde pleister-ondergrond: lage frequentie = brede, zachte golving i.p.v. korrel */}
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.021" numOctaves="2" seed="7" result="plasterMap" />

            {/* Monogram als reliëf-bron — transparante PNG, dus alpha = de vorm zelf */}
            <feImage href={monogram} x="9" y="22" width="82" height="86" preserveAspectRatio="xMidYMid meet" result="logoRaw" />
            {/* Zachte randen → het logo lijkt in de pleister gedrukt i.p.v. opgeplakt */}
            <feGaussianBlur in="logoRaw" stdDeviation="0.85" result="logoSoft" />

            {/* Logo-reliëf (dominant) bij de subtiele pleister-golving optellen → één hoogtekaart.
                feDiffuseLighting leest enkel de alpha-gradiënt, dus alleen reliëf telt — geen kleur. */}
            <feComposite in="logoSoft" in2="plasterMap" operator="arithmetic" k1="0" k2="0.85" k3="0.34" k4="0" result="bump" />

            {/* Belichten met de meebewegende lichtbron */}
            <feDiffuseLighting in="bump" result="lit" lightingColor="#efe9dd" surfaceScale="2.6" diffuseConstant="1.12">
              <fePointLight ref={lightRef} x="30" y="26" z="17" />
            </feDiffuseLighting>
            {/* Til de zwarten op tot een warme pleister-schaduw i.p.v. puur zwart */}
            <feComponentTransfer in="lit" result="plaster">
              <feFuncR type="linear" slope="0.86" intercept="0.16" />
              <feFuncG type="linear" slope="0.86" intercept="0.155" />
              <feFuncB type="linear" slope="0.83" intercept="0.135" />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="100" height="130" filter={`url(#plaster-${id})`} />
      </svg>

      {/* Subtiele glans bovenaan + vignet voor diepte */}
      <span className="raking__sheen" aria-hidden="true" />
      <span className="raking__vignette" aria-hidden="true" />

      {label && (
        <span className="raking__label">
          <span className="raking__dot" aria-hidden="true" />
          {label}
        </span>
      )}
    </div>
  )
}
