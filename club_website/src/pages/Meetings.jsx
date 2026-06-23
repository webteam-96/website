import { Calendar, ArrowRight, Images, Users } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Reveal from '../components/Reveal'
import SpotlightCard from '../components/SpotlightCard'
import { projectsByAvenue } from '../data/projects'
import { useMeetings } from '../hooks/clubData'

// Club meetings & events = the "Club Events" (CE) avenue. Each links to its
// full detail page (cost, beneficiaries, Area of Focus, gallery, prev/next).
const staticMeetings = projectsByAvenue('CE')

function MeetingCard({ m }) {
  const photos = m.gallery?.length || 0
  return (
    <SpotlightCard
      as="article"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cardHover"
    >
      {/* image header */}
      <div className="relative h-52 overflow-hidden bg-navy/5">
        <img
          src={m.img}
          alt={m.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* darkening gradient so badges stay legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />

        {/* date badge */}
        <div className="absolute left-4 top-4 flex flex-col items-center rounded-xl bg-white/95 px-3 py-2 text-center shadow-lg backdrop-blur">
          <span className="font-heading text-lg font-extrabold leading-none text-navy">{m.day}</span>
          <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-gold">{m.mon}</span>
        </div>

        {/* photo count */}
        {photos > 1 && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
            <Images className="h-3.5 w-3.5" /> {photos}
          </span>
        )}

        {/* avenue tag */}
        <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-navy shadow-md">
          <Users className="h-3 w-3" /> Club Event
        </span>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-muted">
          <Calendar className="h-3.5 w-3.5 text-gold" /> {m.date}
        </span>
        <h3 className="font-heading text-base font-bold leading-snug text-navy line-clamp-2 transition-colors group-hover:text-gold-cta">
          {m.title}
        </h3>
        {m.desc && <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-muted">{m.desc}</p>}

        {/* read more button — pill with circular animated arrow */}
        <div className="mt-auto pt-5">
          <span className="inline-flex items-center gap-2.5 rounded-full border-2 border-navy/10 bg-white py-1 pl-4 pr-1 text-[11px] font-bold uppercase tracking-wide text-navy transition-all duration-300 group-hover:border-gold group-hover:bg-gold/5">
            Read More
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-white transition-all duration-300 group-hover:bg-gold group-hover:text-navy">
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </span>
        </div>
      </div>
    </SpotlightCard>
  )
}

export default function Meetings() {
  const { data: meetings } = useMeetings(staticMeetings)
  return (
    <>
      <Breadcrumb
        eyebrow="Fellowship & Programs"
        title="Club Services"
        titleClassName="uppercase tracking-wide"
        trail={[{ label: 'Home', href: '#/' }, { label: 'Club Services' }]}
      />

      <div className="bg-canvas">
        <div className="container-x py-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {meetings.map((m, i) => (
              <Reveal key={m.id} variant="up" delay={(i % 6) * 70} className="h-full">
                <a href={`#/project/${m.id}`} className="block h-full">
                  <MeetingCard m={m} />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
