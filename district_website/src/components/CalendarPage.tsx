import { useMemo, useState } from 'react'
import { addMonths, isSameDay, startOfDay, startOfMonth, subMonths } from 'date-fns'
import type { CalendarEntry, EntryType } from '../types'
import { useCalendarEntries } from '../hooks/useCalendarData'
import { entryMatchesDay } from '../lib/calendar'
import ContactStrip from './ContactStrip'
import PageTitleRow from './PageTitleRow'
import DashboardGrid from './DashboardGrid'
import ListCard from './ListCard'
import EventsCard from './EventsCard'
import MonthCalendar from './MonthCalendar'

export default function CalendarPage() {
  // Capture "today" once so the page stays consistent across renders.
  const [today] = useState(() => startOfDay(new Date()))

  const [yearRange, setYearRange] = useState('2025-2026')
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
    <>
      <ContactStrip yearRange={yearRange} onYearChange={setYearRange} />

      <main className="flex-1">
        <PageTitleRow today={today} />

        <DashboardGrid>
          <ListCard variant="birthday" entries={listFor('birthday')} isLoading={isPending} />
          <ListCard variant="anniversary" entries={listFor('anniversary')} isLoading={isPending} />
          <EventsCard events={listFor('event')} isLoading={isPending} />
          <MonthCalendar
            month={visibleMonth}
            today={today}
            entries={entries}
            selectedDate={selectedDate}
            onPrevMonth={() => setVisibleMonth((m) => subMonths(m, 1))}
            onNextMonth={() => setVisibleMonth((m) => addMonths(m, 1))}
            onSelectDate={handleSelectDate}
          />
        </DashboardGrid>
      </main>
    </>
  )
}
