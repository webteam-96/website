import { ArrowRight, Landmark, User } from 'lucide-react'
import { GearMark } from './Logo'

// Horizontal director card: navy photo panel on the left, a convex white
// content panel on the right separated by a gold-traced curved seam.
export default function DirectorCard({ name, role, img, club = 'Rotary Club of Thane Hills' }) {
  return (
    <article className="group relative h-44 overflow-hidden rounded-2xl border border-gray-200 bg-navy shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover">
      {/* faint Rotary wheel watermark over the navy panel */}
      <GearMark className="pointer-events-none absolute -left-3 -top-3 h-16 w-16 opacity-20" />

      {/* portrait photo */}
      <img
        src={img}
        alt={name}
        loading="lazy"
        className="absolute inset-y-0 left-0 h-full w-1/2 object-cover object-top"
      />

      {/* white content panel with curved left edge + gold seam line */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 340 176"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M150,0 C108,44 108,132 150,176 L340,176 L340,0 Z" fill="#ffffff" />
        <path d="M150,0 C108,44 108,132 150,176" fill="none" stroke="#F7A600" strokeWidth="3" />
      </svg>

      {/* person badge */}
      <span className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-navy text-white shadow-md">
        <User className="h-4 w-4" />
      </span>

      {/* content */}
      <div className="absolute inset-y-0 right-0 z-10 flex w-[56%] flex-col justify-center pl-5 pr-5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gold">{role}</span>
        <h3 className="mt-1 font-heading text-lg font-extrabold leading-tight text-navy">{name}</h3>
        <div className="mt-1.5 h-0.5 w-8 rounded-full bg-gold" />
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
          <Landmark className="h-3.5 w-3.5 shrink-0 text-navy/70" />
          {club}
        </div>
        <a
          href="#"
          className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-navy-deep hover:gap-2.5"
        >
          View Profile <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  )
}
