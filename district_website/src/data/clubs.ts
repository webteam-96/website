import { RAW_CLUBS } from './clubsRaw'

export interface Club {
  id: string
  name: string
  clubId: string
  president: string
  meetingDay: string
  meetingTime: string
}

/** Weekday names used by the Club Finder day filter. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

/** Short meeting label for cards, e.g. "Tue · 7:30 PM". */
export const meetingLabel = (c: Club) => `${c.meetingDay.slice(0, 3)} · ${c.meetingTime}`

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// Real District 3170 clubs, scraped from ClubsFinder.aspx. Only the five fields
// the original Club Finder exposes are kept — nothing is derived or invented.
export const clubs: Club[] = RAW_CLUBS.map((raw) => ({
  id: slug(raw.name),
  name: raw.name,
  clubId: raw.grp,
  president: raw.president,
  meetingDay: raw.day,
  meetingTime: raw.time,
}))

export function getClubById(id: string): Club | undefined {
  return clubs.find((c) => c.id === id)
}
