import { Droplets, Flame, Camera, Clock, ClipboardCheck, HeartHandshake } from 'lucide-react'
import { company } from '../data/site'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import SectionLabel from '../components/SectionLabel'
import CtaBand from '../components/CtaBand'
import './pages.css'

const damageTypes = [
  { ic: Droplets, title: 'Waterschade & lekkage', text: 'Herstel van plafonds en wanden na lekkage of wateroverlast — beschadigd materiaal weg, ondergrond gezond, strak opnieuw opgebouwd.' },
  { ic: Flame, title: 'Brand- & rookschade', text: 'Volledig vernieuwen van aangetast stucwerk na brand of roet, zodat de ruimte weer fris en bewoonbaar wordt.' },
  { ic: ClipboardCheck, title: 'Scheur- & vochtherstel', text: 'Aanpakken van scheurvorming en vochtplekken bij de bron, met een duurzaam en onzichtbaar eindresultaat.' },
]

const approach = [
  { ic: Clock, title: 'Snel schakelen', text: 'Korte responstijd en snelle opname, zodat de doorlooptijd voor de bewoner kort blijft.' },
  { ic: Camera, title: 'Heldere rapportage', text: 'Duidelijke vastlegging en fotomateriaal van schade en herstel — direct bruikbaar voor het dossier.' },
  { ic: HeartHandshake, title: 'Volledige ontzorging', text: 'Van opname tot oplevering nemen we het stucwerk uit handen, voor verzekeraar én bewoner.' },
]

export default function Schadeherstel() {
  useDocumentMeta(
    'Verzekeraars & schadeherstel',
    `Stucwerk-schadeherstel na water-, brand- en lekkageschade door ${company.name}. Snelle respons en heldere rapportage voor verzekeraars in ${company.region}.`,
  )
  return (
    <>
      <PageHero
        num="04"
        kicker="Verzekeraars & schadeherstel"
        title="Schadeherstel waarop verzekeraars kunnen bouwen."
        intro="Vakkundig herstel van stucwerk na water-, brand- en lekkageschade. Snel schakelen, heldere rapportage en een bewoner die snel weer thuis is."
        meta={['Waterschade', 'Brandschade', 'Lekkage', 'Rapportage']}
      />

      <section className="section">
        <div className="shell">
          <div className="split split--reverse">
            <Reveal className="split__media">
              <Placeholder label="Herstelwerk in uitvoering" ratio="4 / 3" tone="ink" src="/images/schade.jpg" />
            </Reveal>
            <Reveal delay={0.1} className="split__body">
              <SectionLabel num="01">De aanpak</SectionLabel>
              <h2 style={{ marginTop: '1.2rem' }}>Snel, zorgvuldig en goed gedocumenteerd.</h2>
              <p className="lead">
                Bij schade telt tempo én precisie. {company.name} herstelt stucwerk vakkundig en
                legt het traject helder vast, zodat de afhandeling met de verzekeraar soepel verloopt.
              </p>
              <ul className="split__list">
                {approach.map((a) => {
                  const Ic = a.ic
                  return (
                    <li key={a.title}>
                      <span className="ic"><Ic size={17} strokeWidth={1.7} /></span>
                      <span><strong>{a.title}</strong><span className="t">{a.text}</span></span>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section band-paper">
        <div className="shell">
          <div className="shead">
            <SectionLabel num="02">Soorten schade</SectionLabel>
            <Reveal as="h2">Herstel van uiteenlopende stucwerkschade.</Reveal>
          </div>
          <div className="cards">
            {damageTypes.map((d, i) => {
              const Ic = d.ic
              return (
                <Reveal key={d.title} delay={i * 0.06} className="card">
                  <span className="card__ic"><Ic size={20} strokeWidth={1.6} /></span>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Schademelding"
        title="Schade die hersteld moet worden?"
        text="Neem contact op voor een snelle opname. We stemmen direct af op de bewoner en houden uw dossier compleet."
      />
    </>
  )
}
