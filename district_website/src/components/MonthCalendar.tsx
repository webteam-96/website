import { useMemo, useRef, type KeyboardEvent } from 'react'
import { isSameDay, isSameMonth } from 'date-fns'
import type { CalendarEntry } from '../types'
import { buildDayMarkers, chunkIntoWeeks, getCalendarDays } from '../lib/calendar'
import CalendarHeader from './CalendarHeader'
import WeekdayRow from './WeekdayRow'
import DayCell from './DayCell'
import Legend from './Legend'

interface MonthCalendarProps {
  month: Date
  today: Date
  entries: CalendarEntry[]
  selectedDate: Date | null
  onPrevMonth: () => void
  onNextMonth: () => void
  onSelectDate: (day: Date) => void
}

export default function MonthCalendar({
  month,
  today,
  entries,
  selectedDate,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
}: MonthCalendarProps) {
  const days = useMemo(() => getCalendarDays(month), [month])
  const weeks = useMemo(() => chunkIntoWeeks(days), [days])
  const dayRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Roving tab index: today if it's in view, otherwise the first day.
  const tabbableIndex = useMemo(() => {
    const idx = days.findIndex((d) => isSameDay(d, today))
    return idx >= 0 ? idx : 0
  }, [days, today])

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const cols = 7
    let next = index
    switch (e.key) {
      case 'ArrowRight':
        next = index + 1
        break
      case 'ArrowLeft':
        next = index - 1
        break
      case 'ArrowDown':
        next = index + cols
        break
      case 'ArrowUp':
        next = index - cols
        break
      case 'Home':
        next = index - (index % cols)
        break
      case 'End':
        next = index - (index % cols) + (cols - 1)
        break
      default:
        return
    }
    if (next >= 0 && next < days.length) {
      e.preventDefault()
      dayRefs.current[next]?.focus()
    }
  }

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-card ring-1 ring-divider/70">
      <CalendarHeader month={month} onPrev={onPrevMonth} onNext={onNextMonth} />
      <WeekdayRow />

      <div role="grid" className="mt-1 flex flex-1 flex-col gap-1.5">
        {weeks.map((week, wi) => (
          <div role="row" key={wi} className="grid flex-1 grid-cols-7 gap-1.5">
            {week.map((day, di) => {
              const index = wi * 7 + di
              return (
                <DayCell
                  key={day.toISOString()}
                  ref={(el) => {
                    dayRefs.current[index] = el
                  }}
                  day={day}
                  markers={buildDayMarkers(day, entries)}
                  inMonth={isSameMonth(day, month)}
                  isToday={isSameDay(day, today)}
                  isSelected={selectedDate ? isSameDay(day, selectedDate) : false}
                  tabbable={index === tabbableIndex}
                  onSelect={onSelectDate}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              )
            })}
          </div>
        ))}
      </div>

      <Legend />
    </section>
  )
}
