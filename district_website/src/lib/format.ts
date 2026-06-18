import { format, parseISO } from 'date-fns'

/** "2026-06-01" → "01-06" (Indian day-month order). */
export function formatDayMonth(iso: string): string {
  return format(parseISO(iso), 'dd-MM')
}

/** Date → "17-Jun-2026". */
export function formatLongDate(date: Date): string {
  return format(date, 'dd-MMM-yyyy')
}

/** Date → "June 2026" for the calendar header. */
export function formatMonthYear(date: Date): string {
  return format(date, 'MMMM yyyy')
}
