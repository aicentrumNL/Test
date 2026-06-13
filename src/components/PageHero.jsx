import SectionLabel from './SectionLabel'
import Reveal from './Reveal'
import './pagehero.css'

// Consistente kop voor binnenpagina's: kicker, grote titel, intro en breadcrumb-achtige meta.
export default function PageHero({ kicker, num, title, intro, meta }) {
  return (
    <section className="phero">
      <div className="shell">
        <Reveal>
          <SectionLabel num={num}>{kicker}</SectionLabel>
        </Reveal>
        <Reveal delay={0.06} as="h1" className="phero__title">{title}</Reveal>
        {intro && <Reveal delay={0.12} as="p" className="lead phero__intro">{intro}</Reveal>}
        {meta && (
          <Reveal delay={0.18} className="phero__meta">
            {meta.map((m) => (<span key={m} className="phero__chip">{m}</span>))}
          </Reveal>
        )}
      </div>
      <div className="shell"><hr className="hairline phero__rule" /></div>
    </section>
  )
}
