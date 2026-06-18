import type { CalendarEntry } from '../types'
import ListCard from './ListCard'

interface EventsCardProps {
  events: CalendarEntry[]
  isLoading?: boolean
  onViewAll?: () => void
}

/**
 * Events surface. Reuses {@link ListCard} with the "event" variant so it shares
 * the list-row pattern; the empty "No Data Found..!" illustration is rendered by
 * ListCard when there are no events.
 */
export default function EventsCard({ events, isLoading, onViewAll }: EventsCardProps) {
  return <ListCard variant="event" entries={events} isLoading={isLoading} onViewAll={onViewAll} />
}
