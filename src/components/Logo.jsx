// Beeldmerk — een troffel/pleistermes-vlak met "GG"-initialen, fijn lijnwerk.
export default function Logo({ className }) {
  return (
    <svg className={className} width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="38" height="38" rx="3" fill="var(--ink)" />
      {/* gestuukt vlak — diagonale "smeer"-streek */}
      <path d="M7 27c4-1 7-3 9-6 2.4-3.6 5-6.4 9-7.5 3-0.8 6-0.6 8 0.5"
            stroke="var(--umber-lite)" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />
      <path d="M9 31c5-1 9-3.5 11.5-7 2.6-3.7 5.4-6 9.5-7"
            stroke="rgba(231,229,221,0.45)" strokeWidth="1" strokeLinecap="round" />
      <text x="20" y="20" textAnchor="middle" fontFamily="'Bricolage Grotesque', Arial, sans-serif"
            fontWeight="700" fontSize="13" fill="var(--on-slate)" letterSpacing="0.3">GG</text>
    </svg>
  )
}
