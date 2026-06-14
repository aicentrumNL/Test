// Mono spec-label in bouwtekening-stijl, bv. "01 — DIENSTEN"
export default function SectionLabel({ num, children, className = '' }) {
  return (
    <span className={`spec ${className}`}>
      {num && <span className="spec__num">{num}</span>}
      <span className="spec__line" aria-hidden="true" />
      {children}
    </span>
  )
}
