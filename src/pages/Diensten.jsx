import { services, company } from '../data/site'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import './pages.css'

export default function Diensten() {
  useDocumentMeta(
    'Diensten',
    `Binnen- en buitenstucwerk, spuitwerk, sierpleister, betonlook en schadeherstel door ${company.name} in ${company.region}.`,
  )
  return (
    <>
      <PageHero
        num="01"
        kicker="Diensten"
        title="Het volledige stucwerk-spectrum, vakkundig uitgevoerd."
        intro="Van strak sausklaar werk tot exclusieve betonlook en gevelafwerking — afgestemd op de eisen van grotere projecten en zakelijke opdrachtgevers."
        meta={['Binnen & buiten', 'Nieuwbouw & renovatie', 'Grote volumes', `${company.warranty} garantie`]}
      />

      <section className="section--tight">
        <div className="shell">
          <div className="svcfull">
            {services.map((s) => (
              <Reveal key={s.id} className="svcfull__item">
                <span className="svcfull__num">{s.num}</span>
                <div>
                  <h2 className="svcfull__title">{s.title}</h2>
                  <p className="svcfull__short">{s.short}</p>
                  <div className="svcfull__tags">
                    {s.tags.map((t) => (<span key={t} className="tag">{t}</span>))}
                  </div>
                </div>
                <p className="svcfull__body">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Maatwerk"
        title="Niet zeker welke afwerking past?"
        text="Vertel ons over uw project en de gewenste uitstraling — we denken mee over materiaal, planning en budget en brengen een heldere offerte uit."
      />
    </>
  )
}
