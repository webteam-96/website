import { ChevronRight } from 'lucide-react'
import { GearMark } from './Logo'
import Aurora from './Aurora'
import ShinyText from './ShinyText'
import SplitText from './SplitText'
import useParallax from './useParallax'

// Navy page banner with eyebrow, title, breadcrumb trail and a faint Rotary
// wheel watermark on the right — used as the header band on inner pages.
export default function Breadcrumb({ eyebrow, title, trail = [], titleClassName = '' }) {
  const wheelRef = useParallax(-0.06)
  return (
    <section className="relative -mt-20 overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-deep">
      {/* drifting aurora glow */}
      <Aurora className="opacity-40" />
      {/* faint Rotary wheel watermark — drifts on scroll + slow spin */}
      <div
        ref={wheelRef}
        className="pointer-events-none absolute -right-6 top-1/2 opacity-[0.07] will-change-transform"
        style={{ transform: 'translateY(calc(-50% + var(--py, 0px)))' }}
      >
        <GearMark className="breadcrumb-wheel h-56 w-56" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-deep/40 to-transparent" />

      <div className="container-x relative pb-10 pt-20 sm:pb-12 sm:pt-24 md:pb-16 md:pt-32">
        {eyebrow && (
          <ShinyText
            text={eyebrow}
            className="text-xs font-bold uppercase tracking-[0.25em] text-gold"
          />
        )}
        <SplitText
          as="h1"
          text={title}
          className={`mt-3 font-heading text-3xl font-extrabold text-white md:text-[2.75rem] md:leading-tight ${titleClassName}`}
        />
        <nav className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/70">
          {trail.map((item, i) => {
            const last = i === trail.length - 1
            return (
              <span key={item.label} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="h-4 w-4 text-gold" />}
                {last ? (
                  <span className="break-words font-semibold text-white">{item.label}</span>
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
