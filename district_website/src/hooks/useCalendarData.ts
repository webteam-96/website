import { useQuery } from '@tanstack/react-query'
import { fetchCalendarEntries } from '../api/calendar'
import type { CalendarEntry } from '../types'

/**
 * Loads all calendar entries for the selected Rotary year-range.
 *
 * The visible month does not change the request (birthdays/anniversaries recur
 * and the whole year is small), so day-level markers and the three list cards
 * are derived client-side from this single cached query. The month is still
 * accepted so callers can include it in the key if they later move month
 * filtering server-side.
 */
export function useCalendarEntries(yearRange: string) {
  return useQuery<CalendarEntry[]>({
    queryKey: ['calendar-entries', yearRange],
    queryFn: () => fetchCalendarEntries(yearRange),
    placeholderData: (prev) => prev, // keep previous data while a new year loads
  })
}
