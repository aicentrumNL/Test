import { useEffect } from 'react'
import { company } from '../data/site'

// Lichtgewicht per-pagina <title> + meta description (geen extra dependency).
export default function useDocumentMeta(title, description) {
  useEffect(() => {
    const full = title ? `${title} · ${company.name}` : `${company.name} — Stukadoorsbedrijf`
    document.title = full
    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])
}
