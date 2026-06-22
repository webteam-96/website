// Initials avatar — a navy disc showing a person's initials, used on pages where
// a real photo isn't available (member directory, past presidents). Size and text
// size are supplied by the caller via className (e.g. "h-12 w-12 text-sm").
export function initials(name = '') {
  const cleaned = name
    .replace(/^(Dr\.?|CA|Late|Mr\.?|Mrs\.?|Ms\.?|Smt\.?|Shri)\s+/i, '')
    .trim()
  const parts = cleaned.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  const first = parts[0][0]
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

export default function Avatar({ name, className = '' }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-deep font-heading font-bold leading-none text-gold ring-2 ring-gold/30 ${className}`}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
