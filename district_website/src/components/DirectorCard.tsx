import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, User } from 'lucide-react'
import type { Director } from '../data/directors'

interface DirectorCardProps {
  director: Director
  /** Stagger index for the fade-in animation. */
  index?: number
}

/**
 * Director card: a navy photo panel (gold Rotary wheel badge) with a curved,
 * gold-accented seam flowing into the white info side — role, name with a gold
 * underline, club, and a "View Profile" link. Matches the design reference.
 */
export default function DirectorCard({ director, index = 0 }: DirectorCardProps) {
  const [imgFailed, setImgFailed] = useState(false)
  const style: CSSProperties = { animationDelay: `${index * 70}ms` }

  return (
    <article
      className="card-enter relative flex h-[184px] overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-divider/50"
      style={style}
    >
      {/* Navy photo panel */}
      <div className="relative w-[42%] shrink-0 overflow-hidden bg-[#0a1c44]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c265f] to-[#0a1c44]" />
        {director.photo && !imgFailed ? (
          <img
            src={director.photo}
            alt={director.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="relative h-full w-full object-cover object-top"
          />
        ) : (
          <div className="relative flex h-full items-end justify-center">
            <User className="h-24 w-24 text-white/25" strokeWidth={1.25} />
          </div>
        )}
      </div>

      {/* Curved gold-accented seam between the photo panel and the info side */}
      <svg
        className="pointer-events-none absolute inset-y-0 left-[42%] z-10 h-full w-[46px] -translate-x-[23px]"
        viewBox="0 0 46 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M46 0 H23 C7 30 7 70 23 100 H46 Z" fill="white" />
        <path
          d="M23 0 C7 30 7 70 23 100"
          fill="none"
          stroke="#F5A623"
          strokeWidth={2.5}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Info side */}
      <div className="relative z-10 flex flex-1 flex-col justify-center pl-2 pr-4">
        {/* Person badge */}
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-brand-bluedarker text-white shadow-sm">
          <User className="h-3.5 w-3.5" strokeWidth={2} />
        </span>

        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-gold">
          {director.role}
        </p>
        <h3 className="mt-1 text-[16px] font-bold leading-tight text-brand-bluedark">
          {director.name}
        </h3>
        <span className="mt-1.5 block h-[3px] w-9 rounded-full bg-brand-gold" />

        <p className="mt-2.5 flex items-start gap-1.5 text-[12.5px] font-medium leading-snug text-muted">
          <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={2} />
          {director.club}
        </p>

        <Link
          to={`/district-committee/${director.id}`}
          className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-lg bg-brand-bluedark px-3.5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-brand-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
        >
          View Profile
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
        </Link>
      </div>
    </article>
  )
}
