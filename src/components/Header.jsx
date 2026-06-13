import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { company, nav } from '../data/site'
import Logo from './Logo'
import './header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`hdr ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="hdr__bar shell">
        <Link to="/" className="hdr__brand" aria-label={`${company.name} — home`}>
          <Logo className="hdr__logo" />
          <span className="hdr__brandtext">
            <strong>{company.name}</strong>
            <em>{company.tagline}</em>
          </span>
        </Link>

        <nav className="hdr__nav" aria-label="Hoofdmenu">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `hdr__link ${isActive ? 'is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hdr__actions">
          <a href={company.phoneHref} className="hdr__phone">
            <Phone size={15} strokeWidth={1.8} />
            <span>{company.phone}</span>
          </a>
          <Link to="/contact" className="btn btn--primary hdr__cta">Offerte aanvragen</Link>
          <button
            className="hdr__burger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobiel paneel */}
      <div className="hdr__panel" hidden={!open}>
        <nav className="hdr__panelnav" aria-label="Mobiel menu">
          <NavLink to="/" end className="hdr__panellink" onClick={closeMenu}>Home</NavLink>
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className="hdr__panellink" onClick={closeMenu}>{item.label}</NavLink>
          ))}
        </nav>
        <div className="hdr__panelfoot">
          <a href={company.phoneHref} className="hdr__panelphone">{company.phone}</a>
          <Link to="/contact" className="btn btn--primary" onClick={closeMenu}>Offerte aanvragen</Link>
        </div>
      </div>
    </header>
  )
}
