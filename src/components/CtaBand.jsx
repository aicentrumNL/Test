import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { company } from '../data/site'
import SectionLabel from './SectionLabel'
import Reveal from './Reveal'
import './ctaband.css'

export default function CtaBand({
  kicker = 'Samenwerken',
  title = 'Een betrouwbare stucpartner voor uw volgende project.',
  text = 'Van enkele woningen tot grootschalige nieuwbouw of schadeherstel — laten we vrijblijvend kennismaken en uw project bespreken.',
}) {
  return (
    <section className="cta band-dark">
      <div className="shell cta__inner">
        <Reveal className="cta__lead">
          <SectionLabel>{kicker}</SectionLabel>
          <h2>{title}</h2>
        </Reveal>
        <Reveal delay={0.1} className="cta__side">
          <p className="muted">{text}</p>
          <div className="cta__actions">
            <Link to="/contact" className="btn btn--light">
              Offerte aanvragen <ArrowRight className="btn__arrow" size={16} />
            </Link>
            <a href={company.phoneHref} className="btn btn--on-dark">Bel {company.phone}</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
