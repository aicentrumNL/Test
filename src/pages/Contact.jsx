import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import { company } from '../data/site'
import useDocumentMeta from '../hooks/useDocumentMeta'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionLabel from '../components/SectionLabel'
import './pages.css'

const projectTypes = [
  'Nieuwbouw', 'Renovatie', 'Buitengevel', 'Schadeherstel',
  'Exclusieve afwerking', 'Anders',
]

export default function Contact() {
  useDocumentMeta(
    'Contact',
    `Neem contact op met ${company.name} in ${company.address.city} voor een vrijblijvende offerte. Tel ${company.phone}.`,
  )
  const [sent, setSent] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = `Offerteaanvraag — ${f.get('type') || 'project'} (${f.get('name') || ''})`
    const body =
      `Naam: ${f.get('name') || ''}\n` +
      `Bedrijf: ${f.get('company') || ''}\n` +
      `E-mail: ${f.get('email') || ''}\n` +
      `Telefoon: ${f.get('phone') || ''}\n` +
      `Type project: ${f.get('type') || ''}\n` +
      `Locatie: ${f.get('location') || ''}\n\n` +
      `Bericht:\n${f.get('message') || ''}`
    window.location.href = `${company.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <PageHero
        num="06"
        kicker="Contact"
        title="Laten we uw project bespreken."
        intro="Een vrijblijvende offerte of een eerste kennismaking? Vul het formulier in of bel direct — u krijgt snel een persoonlijke reactie."
      />

      <section className="section--tight">
        <div className="shell contact">
          <aside className="contact__aside">
            <Reveal className="contact__detail">
              <span className="ic"><Phone size={18} strokeWidth={1.7} /></span>
              <div>
                <h4>Telefoon</h4>
                <a href={company.phoneHref}>{company.phone}</a>
              </div>
            </Reveal>
            <Reveal delay={0.05} className="contact__detail">
              <span className="ic"><Mail size={18} strokeWidth={1.7} /></span>
              <div>
                <h4>E-mail</h4>
                <a href={company.emailHref}>{company.email}</a>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="contact__detail">
              <span className="ic"><MapPin size={18} strokeWidth={1.7} /></span>
              <div>
                <h4>Adres</h4>
                <p>{company.address.street}<br />{company.address.postal} {company.address.city}</p>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="contact__detail">
              <span className="ic"><Clock size={18} strokeWidth={1.7} /></span>
              <div>
                <h4>Werkgebied</h4>
                <p>{company.region}</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <hr className="hairline" style={{ margin: '0.5rem 0 1.5rem' }} />
              <SectionLabel>Liever bellen?</SectionLabel>
              <p className="muted" style={{ marginTop: '0.8rem', fontSize: '0.92rem' }}>
                Voor grotere projecten en planning schakelt u het snelst even telefonisch.
              </p>
            </Reveal>
          </aside>

          <Reveal delay={0.1}>
            <form className="form" onSubmit={onSubmit}>
              {sent && (
                <p className="form__success">
                  Bedankt! Uw e-mailprogramma is geopend met de ingevulde gegevens — klik op
                  verzenden om de aanvraag te versturen. Liever direct? Bel {company.phone}.
                </p>
              )}
              <div className="form__row">
                <div className="field">
                  <label htmlFor="name">Naam *</label>
                  <input id="name" name="name" type="text" required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="company">Bedrijf</label>
                  <input id="company" name="company" type="text" autoComplete="organization" />
                </div>
              </div>
              <div className="form__row">
                <div className="field">
                  <label htmlFor="email">E-mail *</label>
                  <input id="email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor="phone">Telefoon</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" />
                </div>
              </div>
              <div className="form__row">
                <div className="field">
                  <label htmlFor="type">Type project</label>
                  <select id="type" name="type" defaultValue="">
                    <option value="" disabled>Maak een keuze…</option>
                    {projectTypes.map((t) => (<option key={t} value={t}>{t}</option>))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="location">Locatie</label>
                  <input id="location" name="location" type="text" placeholder="Plaats" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="message">Uw project *</label>
                <textarea id="message" name="message" required placeholder="Vertel kort over het project: omvang, gewenste afwerking en planning." />
              </div>
              <button type="submit" className="btn btn--primary">
                Aanvraag versturen <ArrowRight className="btn__arrow" size={16} />
              </button>
              <p className="form__note">
                * Verplichte velden. We gebruiken uw gegevens uitsluitend om op uw aanvraag te reageren.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
