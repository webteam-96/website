import type { CalendarEntry } from '../types'
import { mockEntries } from '../data/mockData'

/**
 * Returns the real June special dates (birthdays & anniversaries) scraped from
 * the original site's AllSpecialDates.aspx, seeded locally in {@link mockEntries}.
 * The short delay only simulates a network round-trip so the loading skeletons
 * stay exercised; the rest of the app consumes this through TanStack Query.
 */
export async function fetchCalendarEntries(yearRange: string): Promise<CalendarEntry[]> {
  await new Promise((resolve) => setTimeout(resolve, 650))
  return mockEntries[yearRange] ?? []
}
