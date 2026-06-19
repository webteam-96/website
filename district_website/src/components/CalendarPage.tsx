import { useMemo, useState } from 'react'
import { addMonths, isSameDay, startOfDay, startOfMonth, subMonths } from 'date-fns'
import { CalendarDays } from 'lucide-react'
import type { CalendarEntry, EntryType } from '../types'
import { useCalendarEntries } from '../hooks/useCalendarData'
import { entryMatchesDay } from '../lib/calendar'
import { formatLongDate } from '../lib/format'
import { useYearRange } from '../context/YearRangeContext'
import PageBanner from './PageBanner'
import DashboardGrid from './DashboardGrid'
import ListCard from './ListCard'
import EventsCard from './EventsCard'
import MonthCalendar from './MonthCalendar'

export default function CalendarPage() {
  // Capture "today" once so the page stays consistent across renders.
  const [today] = useState(() => startOfDay(new Date()))

  const { yearRange } = useYearRange()
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(today))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const { data, isPending } = useCalendarEntries(yearRange)
  const entries = useMemo<CalendarEntry[]>(() => data ?? [], [data])

  // Filter a type for its list card, optionally narrowing to the selected day.
  const listFor = useMemo(() => {
    return (type: EntryType): CalendarEntry[] => {
      let rows = entries.filter((e) => e.type === type)
      if (selectedDate) rows = rows.filter((e) => entryMatchesDay(e, selectedDate))
      return rows
    }
  }, [entries, selectedDate])

  const handleSelectDate = (day: Date) => {
    setSelectedDate((prev) => (prev && isSameDay(prev, day) ? null : day))
  }

  return (
    <main className="flex-1">
      <PageBanner
        title="Calendar"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Calendar' }]}
        width="max-w-[1720px]"
        rightSlot={
          <div className="flex items-center gap-2.5 rounded-xl bg-white px-5 py-3 shadow-card">
            <CalendarDays className="h-5 w-5 text-brand-blue" strokeWidth={2} />
            <span className="text-sm font-medium text-muted">Date:</span>
            <span className="text-sm font-bold text-brand-blue">{formatLongDate(today)}</span>
          </div>
        }
      />

      <DashboardGrid>
          <div className="card-enter" style={{ animationDelay: '0ms' }}>
            <ListCard variant="birthday" entries={listFor('birthday')} isLoading={isPending} />
          </div>
          <div className="card-enter" style={{ animationDelay: '90ms' }}>
            <ListCard variant="anniversary" entries={listFor('anniversary')} isLoading={isPending} />
          </div>
          <div className="card-enter" style={{ animationDelay: '180ms' }}>
            <EventsCard events={listFor('event')} isLoading={isPending} />
          </div>
          <div className="card-enter" style={{ animationDelay: '270ms' }}>
            <MonthCalendar
              month={visibleMonth}
              today={today}
              entries={entries}
              selectedDate={selectedDate}
              onPrevMonth={() => setVisibleMonth((m) => subMonths(m, 1))}
              onNextMonth={() => setVisibleMonth((m) => addMonths(m, 1))}
              onSelectDate={handleSelectDate}
            />
          </div>
        </DashboardGrid>
    </main>
  )
}
