import { Calendar, Clock, MapPin, User, Phone, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

const events = [
  { month: 'MAY', day: '24', title: 'Thane Literature Festival', when: 'Sat, 5:00 PM', venue: 'Gadkari Rangayatan' },
  { month: 'JUN', day: '01', title: 'Tree Plantation Drive', when: 'Sun, 8:00 AM', venue: 'Yeoor Hills' },
  { month: 'JUN', day: '15', title: 'Mega Health Camp', when: 'Sun, 9:00 AM', venue: 'Civic Centre, Thane' },
]

const newsletters = [
  { title: 'April 2025 Edition', meta: 'Uploaded 02 May 2025 (2.4 MB)' },
  { title: 'March 2025 Edition', meta: 'Uploaded 03 Apr 2025 (2.1 MB)' },
  { title: 'February 2025 Edition', meta: 'Uploaded 04 Mar 2025 (1.9 MB)' },
]

function MeetingCard() {
  return (
    <div className="h-full rounded-2xl bg-navy p-6 text-white shadow-card">
      <h3 className="font-heading text-lg font-bold text-gold">Meeting Information</h3>
      <div className="mt-4 space-y-3 text-sm">
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-gold" />
          <span><span className="text-white/60">Day:</span> Thursday</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-4 w-4 text-gold" />
          <span><span className="text-white/60">Time:</span> 07:30 PM onwards</span>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <span><span className="text-white/60">Venue:</span> Rotary Hall, Gokhale Road, Thane (W) 400602</span>
        </div>
      </div>

      <a
        href="#"
        className="group relative mt-4 block h-28 overflow-hidden rounded-xl"
      >
        <img
          src="https://placehold.co/600x200/dbe4ee/0A2472?text=Map"
          alt="Map location"
          className="h-full w-full object-cover"
        />
        <MapPin className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-full text-red-500 drop-shadow" fill="currentColor" />
        <span className="btn-gold absolute bottom-2 right-2 px-3 py-1.5 text-[11px]">
          VIEW ON MAP <ArrowRight className="h-3 w-3" />
        </span>
      </a>

      <div className="mt-5 border-t border-white/15 pt-4 text-sm">
        <div className="flex items-center gap-3">
          <User className="h-4 w-4 text-gold" />
          <span className="font-semibold">Rtn. Nilesh Pitale</span>
        </div>
        <div className="mt-2 flex items-center gap-3 text-white/80">
          <Phone className="h-4 w-4 text-gold" />
          <span>9820063775 · Club Secretary</span>
        </div>
      </div>
    </div>
  )
}

function EventsCard() {
  return (
    <div className="h-full rounded-2xl bg-white p-6 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold text-navy">Upcoming Events</h3>
        <a href="#" className="flex items-center gap-1 text-xs font-bold uppercase text-gold-cta hover:gap-2">
          View All <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
      <ul className="space-y-4">
        {events.map((e) => (
          <li key={e.title} className="flex gap-3">
            <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-gold text-navy">
              <span className="text-[10px] font-bold uppercase leading-none">{e.month}</span>
              <span className="font-heading text-xl font-extrabold leading-none">{e.day}</span>
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-navy">{e.title}</h4>
              <p className="text-xs text-muted">{e.when} · {e.venue}</p>
              <a href="#" className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase text-gold-cta hover:gap-2">
                Register <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function NewslettersCard() {
  return (
    <div className="h-full rounded-2xl bg-white p-6 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold text-navy">Latest Newsletters</h3>
        <a href="#" className="flex items-center gap-1 text-xs font-bold uppercase text-gold-cta hover:gap-2">
          View All <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
      <ul className="space-y-4">
        {newsletters.map((n) => (
          <li key={n.title} className="flex gap-3">
            <img
              src="https://placehold.co/64x80/0A2472/F7A600?text=PDF"
              alt={n.title}
              className="h-20 w-16 shrink-0 rounded-md object-cover"
            />
            <div className="flex flex-col">
              <h4 className="font-semibold text-navy">{n.title}</h4>
              <p className="text-xs text-muted">{n.meta}</p>
              <a href="#" className="mt-auto inline-flex items-center gap-1 text-xs font-bold uppercase text-gold-cta hover:gap-2">
                Read Online <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </li>
        ))}
      </ul>
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
