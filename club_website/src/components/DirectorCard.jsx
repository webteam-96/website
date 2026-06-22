import { User } from 'lucide-react'
import { GearMark } from './Logo'
import SpotlightCard from './SpotlightCard'

// Horizontal director card: navy photo panel on the left, a white content
// panel on the right separated by a gold-traced wave (S-curve) seam.
export default function DirectorCard({ name, role, img }) {
  return (
    <SpotlightCard as="article" className="group relative h-44 overflow-hidden rounded-2xl border border-gray-200 bg-navy shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover">
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
        <path d="M150,0 C110,45 190,131 150,176 L340,176 L340,0 Z" fill="#ffffff" />
        <path d="M150,0 C110,45 190,131 150,176" fill="none" stroke="#F7A600" strokeWidth="3" />
      </svg>

      {/* person badge */}
      <span className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-navy text-white shadow-md">
        <User className="h-4 w-4" />
      </span>

      {/* content */}
      <div className="absolute inset-y-0 right-0 z-10 flex w-[56%] flex-col justify-center pl-5 pr-5">
        <h3 className="font-heading text-lg font-extrabold leading-tight text-navy">{name}</h3>
        <span className="mt-1 text-[11px] font-bold uppercase tracking-wider text-muted">{role}</span>
        <div className="mt-1.5 h-0.5 w-8 rounded-full bg-gold" />
      </div>
    </SpotlightCard>
  )
}
