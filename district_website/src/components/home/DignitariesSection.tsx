import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from 'lucide-react'
import { dignitaries } from '../../data/home'

/** Compact dignitary card with a graceful photo fallback. */
function DignitaryCard({
  name,
  role,
  term,
  photo,
}: {
  name: string
  role: string
  term: string
  photo: string
}) {
  const [failed, setFailed] = useState(false)

  return (
    <article className="flex flex-col items-center rounded-xl bg-pagebg/70 p-4 text-center ring-1 ring-divider/50">
      <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-white shadow-soft">
        {failed ? (
          <span className="flex h-full w-full items-center justify-center bg-brand-blue/10 text-brand-blue">
            <User className="h-9 w-9" aria-hidden="true" />
          </span>
        ) : (
          <img
            src={photo}
            alt={name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <h3 className="mt-3 text-[14px] font-bold text-brand-bluedark">{name}</h3>
      <p className="mt-1 text-[12px] font-semibold text-brand-gold">{role}</p>
      <p className="mt-0.5 text-[11px] text-muted">{term}</p>
    </article>
  )
}

/**
 * DignitariesSection — COLUMN block (white card, h-full) so a parent grid can
 * place it beside Upcoming Events. Shows the President + District Governor.
 */
export default function DignitariesSection() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-card ring-1 ring-divider/50">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-brand-bluedark">Dignitaries of Rotary</h2>
        <Link
          to="/district-committee"
          className="text-[13px] font-semibold text-brand-blue transition hover:text-brand-bluedark"
        >
          View All &rarr;
        </Link>
      </div>

      <div className="mt-4 grid flex-1 grid-cols-1 content-center gap-4 sm:grid-cols-2">
        {dignitaries.map((d) => (
          <DignitaryCard key={d.name} name={d.name} role={d.role} term={d.term} photo={d.photo} />
        ))}
      </div>
    </div>
  )
}
