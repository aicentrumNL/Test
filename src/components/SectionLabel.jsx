// Genummerde uppercase kicker, bv. "02 — Diensten"
export default function SectionLabel({ num, children, className = '' }) {
  return (
    <span className={`kicker ${className}`}>
      {num && <span className="kicker__num">{num}</span>}
      <span className="kicker__line" aria-hidden="true" />
      {children}
    </span>
  )
}
