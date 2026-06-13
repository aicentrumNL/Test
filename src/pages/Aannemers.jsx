import { Link } from 'react-router-dom'
import { ArrowRight, CalendarClock, Layers, FileText, Handshake, ShieldCheck, Building2 } from 'lucide-react'
import { company } from '../data/site'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import SectionLabel from '../components/SectionLabel'
import CtaBand from '../components/CtaBand'
import './pages.css'

const benefits = [
  { ic: CalendarClock, title: 'Planning-betrouwbaar', text: 'We leveren op de afgesproken datum en schakelen mee met uw bouwfasering. Geen vertraging in uw keten.' },
  { ic: Layers, title: 'Schaalbaar voor volume', text: 'Van enkele woningen tot tientallen units met consistente kwaliteit over het hele project.' },
  { ic: Handshake, title: 'Vaste onderaannemer', text: 'Een betrouwbare stucpartner waar u op terug kunt vallen, project na project. Korte lijnen, één aanspreekpunt.' },
  { ic: FileText, title: 'Zakelijke afspraken', text: 'Heldere offertes, nette facturatie en duidelijke posten. Transparant van opname tot oplevering.' },
  { ic: ShieldCheck, title: 'Schoon opgeleverd', text: 'Georganiseerd en netjes op de bouwplaats — afgewerkt en bezemschoon klaar voor de volgende ploeg.' },
  { ic: Building2, title: 'Nieuwbouw & transformatie', text: 'Ervaring met nieuwbouw én het transformeren van bestaande panden naar woon- of werkruimte.' },
]

export default function Aannemers() {
  useDocumentMeta(
    'Voor aannemers & ontwikkelaars',
    `${company.name} is een vaste stucpartner voor aannemers en projectontwikkelaars in ${company.region}: planning-betrouwbaar, schaalbaar en netjes opgeleverd.`,
  )
  return (
    <>
      <PageHero
        num="03"
        kicker="Voor aannemers & ontwikkelaars"
        title="Uw vaste stucpartner op grotere projecten."
        intro="Een stukadoor die meedenkt over planning en fasering, schaalt met uw volume en netjes oplevert — zodat u zich op de bouw kunt richten in plaats van op uw onderaannemer."
        meta={['Nieuwbouw', 'Transformatie', 'Renovatie', 'Onderaanneming']}
      />

      <section className="section">
        <div className="shell">
          <div className="split">
            <Reveal className="split__media">
              <Placeholder label="Bouwplaats / project in uitvoering" ratio="4 / 3" tone="sand" src="/images/aannemers.jpg" />
            </Reveal>
            <Reveal delay={0.1} className="split__body">
              <SectionLabel num="01">De samenwerking</SectionLabel>
              <h2 style={{ marginTop: '1.2rem' }}>Voorspelbaar werk, zonder gedoe.</h2>
              <p className="lead">
                In de bouw telt elke dag. Daarom is {company.name} ingericht op betrouwbaarheid:
                duidelijke afspraken vooraf, strak werk volgens planning en een oplevering die klopt.
              </p>
              <p className="muted" style={{ marginTop: '1.2rem' }}>
                U heeft één aanspreekpunt dat de afwerking volledig uit handen neemt — van de eerste
                opname op tekening tot de laatste hoek bezemschoon opgeleverd.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section band-paper">
        <div className="shell">
          <div className="shead">
            <SectionLabel num="02">Wat u krijgt</SectionLabel>
            <Reveal as="h2">Gebouwd rond de eisen van professionele opdrachtgevers.</Reveal>
          </div>
          <div className="cards">
            {benefits.map((b, i) => {
              const Ic = b.ic
              return (
                <Reveal key={b.title} delay={(i % 3) * 0.06} className="card">
                  <span className="card__ic"><Ic size={20} strokeWidth={1.6} /></span>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal className="pull">
            <p>“Eén vast aanspreekpunt, opgeleverd op de datum die we afspreken.”</p>
            <cite>De werkwijze van Gouw Gesmeerd</cite>
          </Reveal>
          <Reveal delay={0.1} style={{ marginTop: '2.5rem' }}>
            <Link to="/contact" className="btn btn--primary">
              Plan een kennismaking <ArrowRight className="btn__arrow" size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        kicker="Samenwerken"
        title="Op zoek naar een vaste stukadoor?"
        text="Laten we kennismaken en bespreken hoe we uw projecten structureel kunnen ontzorgen — van losse opdracht tot raamovereenkomst."
      />
    </>
  )
}
