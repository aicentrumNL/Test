import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { company, nav } from '../data/site'
import Logo from './Logo'
import './footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="ftr">
      <div className="shell ftr__top">
        <div className="ftr__brandcol">
          <Link to="/" className="ftr__brand">
            <Logo className="ftr__logo" />
            <span>
              <strong>{company.name}</strong>
              <em>{company.tagline}</em>
            </span>
          </Link>
          <p className="ftr__tag">
            Hoogwaardig binnen- en buitenstucwerk voor aannemers, ontwikkelaars en
            verzekeraars. {company.region}.
          </p>
          <p className="ftr__warranty">{company.warranty} garantie op het werk · sinds {company.founded}</p>
        </div>

        <nav className="ftr__col" aria-label="Navigatie">
          <h4>Navigatie</h4>
          <Link to="/">Home</Link>
          {nav.map((n) => (<Link key={n.to} to={n.to}>{n.label}</Link>))}
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="ftr__col">
          <h4>Specialisaties</h4>
          <span>Binnenstucwerk</span>
          <span>Buitengevelstucwerk</span>
          <span>Spuit- &amp; sierwerk</span>
          <span>Betonlook &amp; design</span>
          <span>Schadeherstel</span>
        </div>

        <address className="ftr__col ftr__contact">
          <h4>Contact</h4>
          <a href={company.phoneHref}><Phone size={15} strokeWidth={1.7} /> {company.phone}</a>
          <a href={company.emailHref}><Mail size={15} strokeWidth={1.7} /> {company.email}</a>
          <span className="ftr__addr">
            <MapPin size={15} strokeWidth={1.7} />
            <span>{company.address.street}<br />{company.address.postal} {company.address.city}</span>
          </span>
        </address>
      </div>

      <div className="shell ftr__bottom">
        <span>© {year} {company.fullName}. Alle rechten voorbehouden.</span>
        <span className="ftr__meta">{company.legalForm} · {company.region}</span>
      </div>
    </footer>
  )
}
