import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { upcomingEvents } from '../../data/home'

/**
 * UpcomingEventsSection — COLUMN block.
 * Renders ONLY its white card (h-full); a parent grid handles layout.
 */
export default function UpcomingEventsSection() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-card ring-1 ring-divider/50">
      {/* Column heading */}
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-brand-bluedark">Upcoming Events</h2>
        <Link
          to="/calendar"
          className="text-[13px] font-semibold text-brand-blue transition hover:text-brand-bluedark"
        >
          View All &rarr;
        </Link>
      </div>

      {/* Vertical event list */}
      <ul className="relative mt-4 flex flex-col divide-y divide-divider">
        <span
          className="pointer-events-none absolute left-[22px] top-3 bottom-3 w-px bg-divider"
          aria-hidden
        />
        {upcomingEvents.map((event) => (
          <li key={`${event.day}-${event.month}-${event.title}`} className="relative flex gap-4 py-3 first:pt-0 last:pb-0">
            {/* Navy date badge */}
            <div className="relative z-10 flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-blue text-white ring-2 ring-white">
              <span className="text-[16px] font-extrabold leading-none">{event.day}</span>
              <span className="mt-1 text-[11px] font-semibold uppercase leading-none tracking-wide">
                {event.month}
              </span>
            </div>

            {/* Event details */}
            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-bold text-brand-blue">{event.title}</h3>
              <p className="mt-1.5 truncate text-[12px] text-muted">{event.location}</p>
              <p className="mt-1 flex items-center gap-1.5 text-[12px] text-muted">
                <Clock className="h-3.5 w-3.5 shrink-0 text-muted" aria-hidden="true" />
                <span className="truncate">{event.time}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
