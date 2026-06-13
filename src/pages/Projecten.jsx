import { projects, company } from '../data/site'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import CtaBand from '../components/CtaBand'
import './pages.css'

export default function Projecten() {
  useDocumentMeta(
    'Projecten',
    `Projecten van ${company.name}: stucwerk voor aannemers, projectontwikkelaars en verzekeraars in ${company.region}.`,
  )
  return (
    <>
      <PageHero
        num="02"
        kicker="Projecten"
        title="Een selectie van ons werk."
        intro="Stucwerk voor aannemers, ontwikkelaars en verzekeraars — van nieuwbouw en transformatie tot gevelrenovatie en schadeherstel."
        meta={['Aannemers', 'Ontwikkelaars', 'Verzekeraars', 'Particulier']}
      />

      <section className="section--tight">
        <div className="shell">
          <p className="muted" style={{ maxWidth: '60ch', marginBottom: '2.5rem' }}>
            Onderstaande projecten zijn representatieve voorbeelden. Eigen foto&apos;s en
            uitgewerkte cases worden hier toegevoegd zodra ze beschikbaar zijn.
          </p>
          <div className="projgrid">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 0.08} className="projcard">
                <Placeholder src={p.image} label={p.title} ratio="4 / 3" tone={i % 3 === 0 ? 'ink' : 'sand'} />
                <div className="projcard__meta">
                  <span className="projcard__client">{p.client}</span>
                  <span className="projcard__loc">{p.location}</span>
                </div>
                <h2 className="projcard__name">{p.title}</h2>
                <span className="projcard__scope">{p.scope}</span>
                <p className="projcard__desc">{p.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Uw project"
        title="Volgende op de lijst: uw project."
        text="Of het nu gaat om tientallen units of één bijzondere afwerking — we leveren hetzelfde strakke werk, op schema."
      />
    </>
  )
}
