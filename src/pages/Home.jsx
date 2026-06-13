import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import {
  company, stats, audiences, services, process, projects, usps,
} from '../data/site'
import useDocumentMeta from '../hooks/useDocumentMeta'
import SectionLabel from '../components/SectionLabel'
import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import CtaBand from '../components/CtaBand'
import './home.css'

export default function Home() {
  useDocumentMeta(
    null,
    `${company.name} — hoogwaardig binnen- en buitenstucwerk voor aannemers, projectontwikkelaars en verzekeraars in ${company.region}. ${company.warranty} garantie.`,
  )

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="shell hero__grid">
          <div className="hero__copy">
            <Reveal>
              <span className="eyebrow hero__eyebrow">
                Stukadoorsbedrijf · {company.address.city} &amp; Rotterdam e.o.
              </span>
            </Reveal>
            <Reveal delay={0.08} as="h1" className="hero__title">
              Strak stucwerk,<br />opgeleverd <span className="display-italic">op&nbsp;schema.</span>
            </Reveal>
            <Reveal delay={0.16} as="p" className="lead hero__lead">
              Een betrouwbare stucpartner voor aannemers, ontwikkelaars en verzekeraars.
              Van grootschalige nieuwbouw tot schadeherstel — vakwerk dat blijft staan,
              met {company.warranty} garantie.
            </Reveal>
            <Reveal delay={0.24} className="hero__actions">
              <Link to="/contact" className="btn btn--primary">
                Offerte aanvragen <ArrowRight className="btn__arrow" size={16} />
              </Link>
              <Link to="/projecten" className="btn btn--ghost">Bekijk projecten</Link>
            </Reveal>
            <Reveal delay={0.32} className="hero__assurance">
              <span><Check size={14} strokeWidth={2.4} /> {company.experienceYears} jaar ervaring</span>
              <span><Check size={14} strokeWidth={2.4} /> Planning-betrouwbaar</span>
              <span><Check size={14} strokeWidth={2.4} /> {company.warranty} garantie</span>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="hero__media">
            <Placeholder label="Sfeerbeeld vakwerk" ratio="3 / 4" tone="sand" src="/images/hero.jpg" alt="Strak gestuukte wand" />
            <div className="hero__badge">
              <strong>Sinds {company.founded}</strong>
              <span>Eigen onderneming, opgebouwd op vakmanschap</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="section--tight band-paper">
        <div className="shell">
          <div className="stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06} className="stat">
                <span className="stat__value">{s.value}</span>
                <span className="stat__label">{s.label}</span>
                <span className="stat__sub">{s.sub}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- INTRO / POSITIONERING ---------- */}
      <section className="section">
        <div className="shell intro">
          <div className="intro__label">
            <SectionLabel num="01">Het bedrijf</SectionLabel>
          </div>
          <div className="intro__body">
            <Reveal as="h2" className="intro__head">
              Specialist in stucwerk voor opdrachtgevers die op kwaliteit
              <span className="display-italic"> en planning</span> rekenen.
            </Reveal>
            <Reveal delay={0.1} as="p" className="intro__text">
              {company.name} is een stukadoorsbedrijf uit {company.address.city} met meer dan
              tien jaar ervaring in binnen- en buitenstucwerk. We werken voor aannemers,
              projectontwikkelaars en verzekeraars in {company.region} — projecten waarbij
              een strakke afwerking én een betrouwbare oplevering tellen.
            </Reveal>
            <Reveal delay={0.16} as="p" className="muted intro__text">
              Eén vast aanspreekpunt, korte lijnen en werk dat schoon en georganiseerd op de
              bouwplaats wordt opgeleverd. Geen ruis, geen verrassingen — gewoon vakwerk dat klopt.
            </Reveal>
            <Reveal delay={0.22}>
              <Link to="/over-ons" className="tlink">Meer over ons <ArrowUpRight size={16} /></Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- DOELGROEPEN ---------- */}
      <section className="section band-dark audiences">
        <div className="shell">
          <div className="audiences__head">
            <SectionLabel num="02">Voor wie we werken</SectionLabel>
            <Reveal as="h2">Gebouwd op zakelijke samenwerking.</Reveal>
          </div>
          <div className="audiences__grid">
            {audiences.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.08}>
                <Link to={a.slug} className="aud">
                  <span className="aud__num">{a.num}</span>
                  <h3 className="aud__title">{a.title}</h3>
                  <p className="aud__text muted">{a.excerpt}</p>
                  <ul className="aud__points">
                    {a.points.map((p) => (<li key={p}>{p}</li>))}
                  </ul>
                  <span className="aud__cta">Bekijken <ArrowUpRight size={15} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- DIENSTEN OVERZICHT ---------- */}
      <section className="section">
        <div className="shell">
          <div className="svc__head">
            <div>
              <SectionLabel num="03">Diensten</SectionLabel>
              <Reveal as="h2" className="svc__title">Eén vakman, het volledige spectrum.</Reveal>
            </div>
            <Reveal delay={0.1} className="svc__intro">
              <p className="muted">
                Binnen- en buitenstucwerk, spuit- en sierwerk, exclusieve afwerkingen en
                schadeherstel — alles onder één dak en met één aanspreekpunt.
              </p>
              <Link to="/diensten" className="tlink">Alle diensten <ArrowUpRight size={16} /></Link>
            </Reveal>
          </div>
          <div className="svc__list">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.06}>
                <Link to="/diensten" className="svcrow">
                  <span className="svcrow__num">{s.num}</span>
                  <span className="svcrow__title">{s.title}</span>
                  <span className="svcrow__short muted">{s.short}</span>
                  <ArrowUpRight className="svcrow__arrow" size={18} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- USP STRIP ---------- */}
      <section className="usps band-paper">
        <div className="usps__track">
          {[...usps, ...usps].map((u, i) => (
            <span className="usps__item" key={i}>
              <span className="usps__dot" />{u}
            </span>
          ))}
        </div>
      </section>

      {/* ---------- UITGELICHTE PROJECTEN ---------- */}
      <section className="section">
        <div className="shell">
          <div className="svc__head">
            <div>
              <SectionLabel num="04">Projecten</SectionLabel>
              <Reveal as="h2" className="svc__title">Werk dat voor zich spreekt.</Reveal>
            </div>
            <Reveal delay={0.1} className="svc__intro">
              <p className="muted">Een greep uit projecten voor aannemers, ontwikkelaars en verzekeraars.</p>
              <Link to="/projecten" className="tlink">Alle projecten <ArrowUpRight size={16} /></Link>
            </Reveal>
          </div>
          <div className="feat">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08} className="feat__card">
                <Placeholder src={p.image} label={p.title} ratio={i === 0 ? '4 / 5' : '4 / 3'} tone={i === 0 ? 'ink' : 'sand'} />
                <div className="feat__meta">
                  <span className="feat__client">{p.client} · {p.location}</span>
                  <h3 className="feat__name">{p.title}</h3>
                  <span className="feat__scope">{p.scope}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WERKWIJZE ---------- */}
      <section className="section band-dark">
        <div className="shell">
          <div className="proc__head">
            <SectionLabel num="05">Werkwijze</SectionLabel>
            <Reveal as="h2">Van eerste opname tot oplevering met garantie.</Reveal>
          </div>
          <div className="proc__grid">
            {process.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.07} className="proc__step">
                <span className="proc__num">{step.num}</span>
                <h3 className="proc__title">{step.title}</h3>
                <p className="muted">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
