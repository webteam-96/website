import { Calendar, CalendarCheck, Mail, HandHeart, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

const cards = [
  {
    Icon: Calendar,
    color: 'bg-blue-500',
    tint: 'from-blue-50',
    title: 'Calendar',
    desc: 'View our meeting schedule, events & important dates.',
    cta: 'VIEW CALENDAR',
  },
  {
    Icon: CalendarCheck,
    color: 'bg-emerald-500',
    tint: 'from-emerald-50',
    title: 'Events',
    desc: 'Explore upcoming events and register to participate.',
    cta: 'VIEW EVENTS',
  },
  {
    Icon: Mail,
    color: 'bg-purple-500',
    tint: 'from-purple-50',
    title: 'Newsletters',
    desc: 'Read our latest newsletters and stay updated.',
    cta: 'VIEW NEWSLETTERS',
  },
  {
    Icon: HandHeart,
    color: 'bg-orange-500',
    tint: 'from-orange-50',
    title: 'Projects',
    desc: 'Discover our impactful projects changing lives.',
    cta: 'VIEW PROJECTS',
  },
]

export default function QuickLinks() {
  return (
    <section className="bg-canvas py-12">
      <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ Icon, color, tint, title, desc, cta }, i) => (
          <Reveal key={title} variant="up" delay={i * 110} className="h-full">
            <div
              className={`group h-full rounded-xl bg-gradient-to-br ${tint} to-white p-6 shadow-card ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cardHover`}
            >
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${color} text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-heading text-lg font-bold text-navy">{title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted">{desc}</p>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gold-cta transition-all group-hover:gap-2"
              >
                {cta} <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
