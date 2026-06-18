import { forwardRef, type KeyboardEvent } from 'react'
import { getDate } from 'date-fns'
import type { DayMarkers } from '../types'

interface DayCellProps {
  day: Date
  markers: DayMarkers
  inMonth: boolean
  isToday: boolean
  isSelected: boolean
  tabbable: boolean
  onSelect: (day: Date) => void
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void
}

const DayCell = forwardRef<HTMLButtonElement, DayCellProps>(function DayCell(
  { day, markers, inMonth, isToday, isSelected, tabbable, onSelect, onKeyDown },
  ref,
) {
  const dayNum = getDate(day)

  const numberClass = isToday
    ? 'flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-[13px] font-semibold text-white shadow-sm'
    : `text-[13.5px] ${inMonth ? 'font-medium text-ink' : 'font-normal text-muted/40'}`

  return (
    <button
      ref={ref}
      type="button"
      role="gridcell"
      tabIndex={tabbable ? 0 : -1}
      onClick={() => onSelect(day)}
      onKeyDown={onKeyDown}
      aria-label={day.toDateString()}
      aria-current={isToday ? 'date' : undefined}
      aria-pressed={isSelected}
      className={[
        'group relative flex h-full min-h-[44px] w-full flex-col items-center justify-center gap-1 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60',
        isSelected && !isToday ? 'ring-2 ring-brand-blue/40' : '',
        !isToday ? 'hover:bg-brand-blue/5' : '',
      ].join(' ')}
    >
      <span className={numberClass}>{dayNum}</span>

      {isToday ? (
        <span className="text-[7.5px] font-semibold uppercase leading-none tracking-[0.08em] text-brand-blue">
          Today
        </span>
      ) : (
        <span className="flex h-1.5 items-center justify-center gap-1">
          {markers.hasBirthday && <span className="h-1.5 w-1.5 rounded-full bg-bday" aria-hidden />}
          {markers.hasAnniversary && (
            <span className="h-1.5 w-1.5 rounded-full bg-annivdot" aria-hidden />
          )}
        </span>
      )}
    </button>
  )
})

export default DayCell
