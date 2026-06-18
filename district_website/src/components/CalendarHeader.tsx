import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatMonthYear } from '../lib/format'

interface CalendarHeaderProps {
  month: Date
  onPrev: () => void
  onNext: () => void
}

export default function CalendarHeader({ month, onPrev, onNext }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-[#1e57c4] via-[#1a4aad] to-[#153f91] px-3 py-3 text-white shadow-soft">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous month"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={2.5} />
      </button>
      <span className="text-[15px] font-semibold tracking-wide">{formatMonthYear(month)}</span>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next month"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <ChevronRight className="h-[18px] w-[18px]" strokeWidth={2.5} />
      </button>
    </div>
  )
}
