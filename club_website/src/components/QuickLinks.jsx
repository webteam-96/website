import { Calendar, Ticket, Newspaper, HeartHandshake, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'
import { asset } from '../lib/asset'

// Brand-forward "Rotary crest" cards — a strict navy + gold identity. Each card
// carries a navy header band with an inlaid gold-ringed icon medallion and the
// real Rotary wheel (wheel.png) slowly turning behind it, a gold foot-rule, and
// a real gold CTA pill that flips to navy on hover. On hover a React Bits
// "Glare Hover" sheen sweeps diagonally across the whole card. The four cards
// stay distinct via their icons alone — no off-brand accent colours.
const cards = [
  {
    Icon: Calendar,
    title: 'Calendar',
    desc: 'View our meeting schedule, events & important dates.',
    cta: 'View Calendar',
    href: '#/calendar',
  },
  {
    Icon: Ticket,
    title: 'Events',
    desc: 'Explore upcoming events and register to participate.',
    cta: 'View Events',
    href: '#/meetings',
  },
  {
    Icon: Newspaper,
    title: 'Newsletters',
    desc: 'Read our latest newsletters and stay updated.',
    cta: 'View Newsletters',
    href: '#/newsletter',
  },
  {
    Icon: HeartHandshake,
    title: 'Projects',
    desc: 'Discover our impactful projects changing lives.',
    cta: 'View Projects',
    href: '#/projects',
  },
]

export default function QuickLinks() {
  return (
    <section className="bg-canvas py-12">
      <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ Icon, title, desc, cta, href }, i) => (
          <Reveal key={title} variant="up" delay={i * 110} className="h-full">
            <SpotlightCard className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-navy/10 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-cardHover hover:ring-navy/20">
              {/* React Bits "Glare Hover": diagonal sheen sweep on hover */}
              <span aria-hidden="true" className="glare" />

              {/* gold top accent — a hairline that widens to a full rail on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold via-gold-light to-gold-cta transition-transform duration-500 ease-out group-hover:scale-x-100"
              />

              {/* soft gold corner glow — fades up on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-gold/20 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />

              {/* ── Navy crest header band ─────────────────────────────── */}
              <div className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-deep px-6 pb-9 pt-6">
                {/* the real Rotary wheel, slowly turning behind the medallion */}
                <img
                  src={asset('/images/logo/wheel.png')}
                  alt=""
                  aria-hidden="true"
                  className="wheel-spin pointer-events-none absolute -right-7 -top-8 h-28 w-28 opacity-[0.14] transition-opacity duration-500 group-hover:opacity-30"
                />
                {/* gold foot-rule along the band's base */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
                />

                {/* icon medallion: lifts, scales, and fills gold-to-navy on hover */}
                <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-gold ring-1 ring-gold/40 backdrop-blur-sm transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy group-hover:ring-gold">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </span>
              </div>

              {/* ── Body ───────────────────────────────────────────────── */}
              <div className="relative flex flex-1 flex-col px-6 pb-6 pt-5">
                <h3 className="font-heading text-lg font-bold tracking-tight text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>

                {/* CTA reads as a real button at rest: a solid gold-tinted pill
                    with a gold border, flipping to navy on hover */}
                <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold bg-gold/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-navy transition-all duration-300 ease-out group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                  {cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-gold" />
                </span>
              </div>

              {/* stretched link — whole card is clickable; keyboard-focusable
                  with a visible gold focus ring */}
              <a
                href={href}
                aria-label={cta}
                className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              />
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
