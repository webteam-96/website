import { Link } from 'react-router-dom'
import { ArrowRight, UsersRound } from 'lucide-react'
import Lightfall from '../Lightfall'

/**
 * JoinCtaSection — call-to-action band inviting visitors to join Rotary.
 * A React Bits <Lightfall /> WebGL background (falling light streaks) sits behind
 * the heading + "Explore Clubs" button on the dark band; the button is layered on
 * top (z-10) so it stays clickable.
 */
export default function JoinCtaSection() {
  return (
    <section>
      <div className="mx-auto max-w-[1200px] px-5 py-6 sm:px-8">
        <div className="relative isolate overflow-hidden rounded-xl bg-[#0A1020] shadow-card">
          {/* WebGL "light fall" background over the dark band */}
          <div className="absolute inset-0 z-0">
            <Lightfall
              colors={['#A6C8FF', '#3b6fd4', '#F5A623']}
              backgroundColor="#0A1F4D"
              speed={0.6}
              streakCount={4}
              density={0.7}
              glow={0.8}
            />
          </div>
          {/* Dark scrim so the white text stays legible over the bright streaks */}
          <div className="pointer-events-none absolute inset-0 z-[5] bg-[#0A1020]/60" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-8 py-14 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
                <UsersRound className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <div className="[text-shadow:0_2px_14px_rgba(0,0,0,0.6)]">
                <h2 className="text-[22px] font-bold leading-tight text-white sm:text-[26px]">
                  Ready to Join Rotary?
                </h2>
                <p className="mt-1 text-[14px] text-white/85">
                  Find a Club Near You and start your journey of service.
                </p>
              </div>
            </div>

            <Link
              to="/club-finder"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand-gold px-6 py-3 text-[13px] font-bold uppercase tracking-wide text-brand-bluedarker shadow-pill transition hover:-translate-y-0.5 hover:brightness-105"
            >
              Explore Clubs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export { JoinCtaSection }
