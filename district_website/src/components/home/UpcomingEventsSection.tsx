import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { upcomingEvents } from '../../data/home'

const MONTHS: Record<string, number> = {
  JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
  JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
}

/** Full weekday name (e.g. "Monday") derived from the event's real date. */
function weekdayOf(year: number, month: string, day: string): string {
  const m = MONTHS[month.toUpperCase()] ?? 0
  return new Date(year, m, Number(day)).toLocaleDateString('en-US', { weekday: 'long' })
}

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

      {/* Green pill event cards */}
      <ul className="mt-4 flex flex-col gap-4">
        {upcomingEvents.map((event) => (
          <li
            key={`${event.day}-${event.month}-${event.title}`}
            className="overflow-hidden rounded-[18px] bg-[#b6e62e] shadow-sm"
          >
            <div className="flex min-h-[78px] items-stretch">
              {/* Date block */}
              <div className="flex w-[84px] shrink-0 flex-col items-center justify-center px-2 text-center text-[#111]">
                <span className="text-[34px] font-extrabold leading-none">{event.day}</span>
                <span className="mt-1 text-[14px] font-bold uppercase leading-none tracking-wide">
                  {event.month}
                </span>
              </div>

              {/* Purple arrow pointer */}
              <div className="flex shrink-0 items-center" aria-hidden>
                <span className="h-0 w-0 border-y-8 border-l-[10px] border-y-transparent border-l-[#7d2a82]" />
              </div>

              {/* White content card */}
              <div className="my-[7px] ml-1 min-w-0 flex-1 rounded-[14px] bg-white px-4 py-2.5">
                <p className="flex items-center gap-1.5 text-[13px] font-semibold text-[#7d2a82]">
                  <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{event.time}</span>
                </p>
                <h3 className="mt-0.5 text-[16px] font-bold leading-snug text-[#111]">
                  {event.title}
                </h3>
                <p className="text-[14px] font-semibold text-[#222]">{event.location}</p>
              </div>

              {/* Vertical weekday label */}
              <div className="flex w-[26px] shrink-0 items-center justify-center">
                <span
                  className="text-[12px] font-bold leading-none text-[#111]"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {weekdayOf(event.year, event.month, event.day)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
