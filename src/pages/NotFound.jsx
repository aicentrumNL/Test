import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { company } from '../data/site'
import './pages.css'

export default function NotFound() {
  useDocumentMeta('Pagina niet gevonden')
  return (
    <section className="shell nf">
      <span className="eyebrow">Foutmelding 404</span>
      <h1>Pagina niet gevonden</h1>
      <p className="lead" style={{ maxWidth: '40ch', marginInline: 'auto' }}>
        Deze pagina bestaat niet (meer). Mogelijk is de link verouderd.
      </p>
      <div className="nf__actions">
        <Link to="/" className="btn btn--primary">Naar de homepage</Link>
        <a href={company.phoneHref} className="btn btn--ghost">Bel {company.phone}</a>
      </div>
    </section>
  )
}
