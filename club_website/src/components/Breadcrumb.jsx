import { ChevronRight } from 'lucide-react'
import { GearMark } from './Logo'

// Navy page banner with eyebrow, title, breadcrumb trail and a faint Rotary
// wheel watermark on the right — used as the header band on inner pages.
export default function Breadcrumb({ eyebrow, title, trail = [], titleClassName = '' }) {
  return (
    <section className="relative -mt-20 overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-deep">
      {/* faint Rotary wheel watermark */}
      <div className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 opacity-[0.07]">
        <GearMark className="h-56 w-56" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-deep/40 to-transparent" />

      <div className="container-x relative pb-12 pt-28 md:pb-16 md:pt-32">
        {eyebrow && (
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
            {eyebrow}
          </span>
        )}
        <h1
          className={`mt-3 font-heading text-3xl font-extrabold text-white md:text-[2.75rem] md:leading-tight ${titleClassName}`}
        >
          {title}
        </h1>
        <nav className="mt-4 flex items-center gap-2 text-sm text-white/70">
          {trail.map((item, i) => {
            const last = i === trail.length - 1
            return (
              <span key={item.label} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="h-4 w-4 text-gold" />}
                {last ? (
                  <span className="font-semibold text-white">{item.label}</span>
                ) : (
                  <a href={item.href} className="transition-colors hover:text-gold">
                    {item.label}
                  </a>
                )}
              </span>
            )
          })}
        </nav>
      </div>
    </section>
  )
}
