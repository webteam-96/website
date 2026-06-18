import type { CalendarEntry } from '../types'
import { mockEntries } from '../data/mockData'

/**
 * Mock fetcher that simulates a network round-trip so the loading skeletons are
 * exercised. Swap the body for a real `fetch(...)` call when a backend exists —
 * the rest of the app already consumes this through TanStack Query.
 */
export async function fetchCalendarEntries(yearRange: string): Promise<CalendarEntry[]> {
  await new Promise((resolve) => setTimeout(resolve, 650))
  return mockEntries[yearRange] ?? []
}
