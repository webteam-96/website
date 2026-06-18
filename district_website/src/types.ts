export type EntryType = 'birthday' | 'anniversary' | 'event'

export interface CalendarEntry {
  id: string
  name: string
  /** ISO date string. Displayed as "DD-MM". */
  date: string
  type: EntryType
  clubName?: string
}

export interface DayMarkers {
  /** ISO day */
  date: string
  hasBirthday: boolean
  hasAnniversary: boolean
  hasEvent: boolean
}
