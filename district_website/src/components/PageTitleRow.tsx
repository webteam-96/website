import { Calendar, CalendarDays } from 'lucide-react'
import { formatLongDate } from '../lib/format'

interface PageTitleRowProps {
  /** "Today" — drives the date card. */
  today: Date
}

export default function PageTitleRow({ today }: PageTitleRowProps) {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-7 sm:px-8">
      {/* Title */}
      <div className="flex items-center gap-3.5">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white shadow-card">
          <Calendar className="h-[22px] w-[22px]" strokeWidth={2} />
        </span>
        <span className="h-8 w-1.5 rounded-full bg-brand-gold" />
        <h1 className="text-[26px] font-bold uppercase tracking-wide text-brand-blue">Calendar</h1>
      </div>

      {/* Live date card */}
      <div className="flex items-center gap-2.5 rounded-xl bg-white px-5 py-3 shadow-card">
        <CalendarDays className="h-5 w-5 text-brand-blue" strokeWidth={2} />
        <span className="text-sm font-medium text-muted">Date:</span>
        <span className="text-sm font-bold text-brand-blue">{formatLongDate(today)}</span>
      </div>
    </div>
  )
}
