import { company, stats } from '../data/site'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import SectionLabel from '../components/SectionLabel'
import CtaBand from '../components/CtaBand'
import './pages.css'

const values = [
  { title: 'Vakmanschap', text: 'Meer dan tien jaar ervaring in binnen- en buitenstucwerk. Het ambacht zit in de details — en daar zit de trots.' },
  { title: 'Betrouwbaarheid', text: 'Afspraak is afspraak. We leveren op de datum die we noemen en houden de lijnen kort en helder.' },
  { title: 'Kwaliteit die blijft', text: 'Goede materialen, een gezonde ondergrond en zorgvuldig werk. Daarom geven we 3–5 jaar garantie op het werk.' },
]

export default function OverOns() {
  useDocumentMeta(
    'Over ons',
    `${company.name} — stukadoorsbedrijf uit ${company.address.city}, sinds ${company.founded}. Vakmanschap, betrouwbaarheid en ${company.warranty} garantie.`,
  )
  return (
    <>
      <PageHero
        num="05"
        kicker="Over ons"
        title="Een vakman met oog voor het grotere geheel."
        intro={`${company.name} is een stukadoorsbedrijf uit ${company.address.city}, opgebouwd op vakmanschap en betrouwbaarheid — met een focus op zakelijke opdrachtgevers en grotere projecten.`}
        meta={[`Sinds ${company.founded}`, company.legalForm, company.region]}
      />

      <section className="section">
        <div className="shell">
          <div className="split">
            <Reveal className="split__media">
              <Placeholder
                ratio="3 / 2"
                tone="sand"
                src="/images/damien-gouw.jpg"
                alt={`${company.owner}, eigenaar van ${company.name}, bij de bedrijfsbus`}
              />
              <p className="media-cap">
                <strong>{company.owner}</strong> — eigenaar &amp; uitvoerend stukadoor
              </p>
            </Reveal>
            <Reveal delay={0.1} className="split__body">
              <SectionLabel num="01">Het verhaal</SectionLabel>
              <h2 style={{ marginTop: '1.2rem' }}>Opgebouwd, streek voor streek.</h2>
              <p className="lead">
                {company.owner} bouwde {company.name} op vanuit het vak — wat begon als
                vakmanschap groeide uit tot een onderneming met een duidelijke reputatie:
                strak werk, op tijd geleverd.
              </p>
              <p className="muted" style={{ marginTop: '1.2rem' }}>
                Met meer dan tien jaar ervaring kent {company.name} elke kant van het vak —
                van glad binnenstucwerk en machinaal spuitwerk tot weerbestendige buitengevels,
                exclusieve betonlook en schadeherstel. Die breedte betekent dat opdrachtgevers
                voor het volledige stucwerk bij één aanspreekpunt terechtkunnen.
              </p>
              <p className="muted" style={{ marginTop: '1.2rem' }}>
                De aanpak is bewust persoonlijk: korte lijnen, meedenken over planning en budget,
                en een resultaat waar zowel de aannemer als de eindgebruiker tevreden mee is.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section--tight band-paper">
        <div className="shell">
          <div className="stats">
            {stats.map((s) => (
              <Reveal key={s.label} className="stat">
                <span className="stat__value">
                  {s.value ?? s.num}
                  {s.suffix && <span className="stat__suffix">{s.suffix}</span>}
                  {s.unit && <span className="stat__unit">{s.unit}</span>}
                </span>
                <span className="stat__label">{s.label}</span>
                <span className="stat__sub">{s.sub}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="shead">
            <SectionLabel num="02">Waar we voor staan</SectionLabel>
            <Reveal as="h2">Drie principes die in elk project terugkomen.</Reveal>
          </div>
          <div className="values">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="value">
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="shell">
          <Reveal className="pull">
            <p>“Werkgebied: {company.region} — en daarbuiten voor de grotere projecten.”</p>
            <cite>Standplaats {company.address.city}</cite>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
