import { addDays, getDate, getMonth, isSameDay, parseISO, startOfMonth, startOfWeek, subDays } from 'date-fns'
import type { CalendarEntry, DayMarkers } from '../types'

/** Monday-first weekday initials, matching the design's "M T W T F S S" row. */
export const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const

/** ISO weeks start on Monday for this calendar. */
const WEEK_OPTS = { weekStartsOn: 1 } as const

/** Always render a full 6-row grid (42 days). */
const GRID_DAYS = 42

/**
 * All days to render for a month's grid (6 rows × 7 cols), including the greyed
 * leading/trailing days of adjacent months. When the 1st already falls on the
 * first weekday column (no natural leading days) a full prior week is prepended,
 * matching the design. Derived from the month itself — never hardcoded.
 */
export function getCalendarDays(month: Date): Date[] {
  const monthStart = startOfMonth(month)
  let start = startOfWeek(monthStart, WEEK_OPTS)
  if (isSameDay(start, monthStart)) start = subDays(start, 7)
  return Array.from({ length: GRID_DAYS }, (_, i) => addDays(start, i))
}

/** Split a flat day list into weeks of 7 for row-based rendering. */
export function chunkIntoWeeks(days: Date[]): Date[][] {
  const weeks: Date[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  return weeks
}

/**
 * True when an entry falls on `day`. Birthdays & anniversaries recur annually,
 * so they match on month+day only; events match the exact date.
 */
export function entryMatchesDay(entry: CalendarEntry, day: Date): boolean {
  const entryDate = parseISO(entry.date)
  if (entry.type === 'event') {
    return isSameDay(entryDate, day)
  }
  return getMonth(entryDate) === getMonth(day) && getDate(entryDate) === getDate(day)
}

/** Marker flags for a single day, derived from the full entry list. */
export function buildDayMarkers(day: Date, entries: CalendarEntry[]): DayMarkers {
  let hasBirthday = false
  let hasAnniversary = false
  let hasEvent = false

  for (const entry of entries) {
    if (!entryMatchesDay(entry, day)) continue
    if (entry.type === 'birthday') hasBirthday = true
    else if (entry.type === 'anniversary') hasAnniversary = true
    else if (entry.type === 'event') hasEvent = true
  }

  return { date: day.toISOString(), hasBirthday, hasAnniversary, hasEvent }
}
