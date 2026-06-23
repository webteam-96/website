import { Calendar, Clock, MapPin, User, Phone, ArrowRight, FileText, Navigation, CalendarDays, Newspaper } from 'lucide-react'
import Reveal from './Reveal'
import { GearMark } from './Logo'
import { meetingInfo, newsletters } from '../data/site'
import { projectsByAvenue } from '../data/projects'

// Real recent club events (newest first) and newsletters.
const events = projectsByAvenue('CE').slice(0, 5)
const latestNewsletters = newsletters.slice(0, 4)
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(meetingInfo.venue)}`

function InfoLine({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-gold">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-white/55">{label}</p>
        <p className="font-semibold leading-snug">{value}</p>
      </div>
    </div>
  )
}

function MeetingCard() {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl bg-navy p-6 text-white shadow-card">
      {/* faint rotary-wheel watermark */}
      <GearMark className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 opacity-[0.06]" />

      {/* header */}
      <div className="relative flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-gold">
          <Calendar className="h-5 w-5" />
        </span>
        <h3 className="font-heading text-lg font-bold">
          Meeting <span className="text-gold">Information</span>
        </h3>
      </div>
      <div className="mt-3 h-1 w-12 rounded-full bg-gold" />

      {/* info lines */}
      <div className="relative mt-5 space-y-4 text-sm">
        <InfoLine icon={Calendar} label="Day" value={meetingInfo.day} />
        <InfoLine icon={Clock} label="Time" value={`${meetingInfo.time} onwards`} />
        <InfoLine
          icon={MapPin}
          label="Venue"
          value="Smt. Savitridevi Thirani High School, Road No. 1, Vartak Nagar, Thane West 400606"
        />
      </div>

      {/* live Google map preview of the meeting venue */}
      <div className="relative mt-5 h-40 overflow-hidden rounded-xl ring-1 ring-white/15">
        <iframe
          title="Rotary Club of Thane Hills — meeting venue map"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(meetingInfo.venue)}&z=16&output=embed`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      {/* full-width view-on-map button */}
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3 text-sm font-bold uppercase tracking-wide text-navy shadow-lg shadow-gold/20 transition hover:bg-gold-light"
      >
        <Navigation className="h-4 w-4" /> View on Map
      </a>

      {/* contact */}
      <div className="relative mt-5 flex items-center gap-3 border-t border-white/15 pt-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-navy">
          <User className="h-5 w-5" />
        </span>
        <div>
          <p className="font-semibold">Rtn. Nilesh Pitale</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/75">
            <Phone className="h-3.5 w-3.5 text-gold" /> 9820063775 · Club Secretary
          </p>
        </div>
      </div>
    </div>
  )
}

function PanelHeader({ title }) {
  return (
    <div className="mb-5">
      <h3 className="font-heading text-lg font-bold text-navy">{title}</h3>
      <div className="mt-2 h-1 w-12 rounded-full bg-gold" />
    </div>
  )
}

// Small action chip used for "Details" / "Read Online".
function ActionLink({ href, external, children }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-gold-cta transition-colors hover:bg-gold hover:text-navy"
    >
      {children}
      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
    </a>
  )
}

function PillButton({ href, icon: Icon, children }) {
  return (
    <a
      href={href}
      className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-navy to-navy-deep py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-navy/20 transition-all hover:-translate-y-0.5 hover:from-gold hover:to-gold-light hover:text-navy hover:shadow-lg hover:shadow-gold/30"
    >
      <Icon className="h-4 w-4" /> {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  )
}

function EventsCard() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-card">
      <PanelHeader title="Recent Events" />
      <ul className="flex-1 divide-y divide-gray-100">
        {events.map((e, i) => {
          const navy = i % 2 === 0
          return (
            <li
              key={e.id}
              className="group/item -mx-2 flex gap-4 rounded-xl px-2 py-3.5 transition-colors duration-300 hover:bg-navy/[0.035]"
            >
              <div
                className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl shadow-sm transition-all duration-300 group-hover/item:-rotate-6 group-hover/item:scale-110 ${
                  navy
                    ? 'bg-navy text-white group-hover/item:shadow-navy/30'
                    : 'bg-gold text-navy group-hover/item:shadow-gold/40'
                } group-hover/item:shadow-lg`}
              >
                <span className="text-[10px] font-bold uppercase leading-none">{e.mon}</span>
                <span className="font-heading text-xl font-extrabold leading-none">{e.day}</span>
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold leading-snug text-navy line-clamp-1 transition-colors duration-300 group-hover/item:text-gold-cta">
                  {e.title}
                </h4>
                <p className="text-xs text-muted">{e.date}</p>
                <ActionLink href={`#/project/${e.id}`}>Details</ActionLink>
              </div>
            </li>
          )
        })}
      </ul>
      <PillButton href="#/meetings" icon={CalendarDays}>View All Events</PillButton>
    </div>
  )
}

function NewslettersCard() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-card">
      <PanelHeader title="Latest Newsletters" />
      <ul className="flex-1 divide-y divide-gray-100">
        {latestNewsletters.map((n) => (
          <li
            key={n.title}
            className="group/item -mx-2 flex gap-4 rounded-xl px-2 py-3.5 transition-colors duration-300 hover:bg-navy/[0.035]"
          >
            <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-navy text-gold shadow-sm transition-all duration-300 group-hover/item:rotate-3 group-hover/item:scale-110 group-hover/item:bg-gold group-hover/item:text-navy group-hover/item:shadow-lg group-hover/item:shadow-gold/40">
              <FileText className="h-5 w-5" />
              <span className="mt-0.5 text-[9px] font-bold">PDF</span>
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold leading-snug text-navy line-clamp-1 transition-colors duration-300 group-hover/item:text-gold-cta">
                {n.title}
              </h4>
              <p className="text-xs text-muted">{n.date}</p>
              <ActionLink href={n.url} external>Read Online</ActionLink>
            </div>
          </li>
        ))}
      </ul>
      <PillButton href="#/newsletter" icon={Newspaper}>View All Newsletters</PillButton>
    </div>
  )
}

export default function InfoRow() {
  return (
    <section className="bg-canvas py-14">
      <div className="container-x grid gap-6 lg:grid-cols-3">
        <Reveal variant="up" delay={0} className="h-full">
          <MeetingCard />
        </Reveal>
        <Reveal variant="up" delay={130} className="h-full">
          <EventsCard />
        </Reveal>
        <Reveal variant="up" delay={260} className="h-full">
          <NewslettersCard />
        </Reveal>
      </div>
    </section>
  )
}
