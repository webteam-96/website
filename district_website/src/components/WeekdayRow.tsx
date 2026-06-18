import { WEEKDAYS } from '../lib/calendar'

export default function WeekdayRow() {
  return (
    <div className="grid grid-cols-7 gap-1.5 px-1 pb-1 pt-3">
      {WEEKDAYS.map((day, i) => (
        <div
          key={i}
          className="text-center text-[12px] font-semibold uppercase tracking-wide text-muted"
        >
          {day}
        </div>
      ))}
    </div>
  )
}
