import type { ComponentType, CSSProperties } from 'react'
import { ArrowRight, CalendarDays, Gift, Megaphone, PartyPopper, Sparkles, User } from 'lucide-react'
import type { CalendarEntry, EntryType } from '../types'
import { formatDayMonth } from '../lib/format'
import { CalendarStarIcon, RingsIcon } from './BrandIcons'

type IconCmp = ComponentType<{
  className?: string
  style?: CSSProperties
  strokeWidth?: string | number
}>

interface VariantStyle {
  title: string
  accent: string
  /** Tailwind class for the soft tinted background (avatar / badge / button). */
  soft: string
  softText: string
  HeaderIcon: IconCmp
  BadgeIcon: IconCmp
  viewAllLabel: string
}

const VARIANTS: Record<EntryType, VariantStyle> = {
  birthday: {
    title: 'Birthday',
    accent: '#2E9E5B',
    soft: 'bg-bdaysoft',
    softText: 'text-bday',
    HeaderIcon: CalendarDays,
    BadgeIcon: PartyPopper,
    viewAllLabel: 'View All',
  },
  anniversary: {
    title: 'Anniversary',
    accent: '#F08020',
    soft: 'bg-annivsoft',
    softText: 'text-anniv',
    HeaderIcon: RingsIcon,
    BadgeIcon: Gift,
    viewAllLabel: 'View All',
  },
  event: {
    title: 'Events',
    accent: '#16429B',
    soft: 'bg-evtsoft',
    softText: 'text-evt',
    HeaderIcon: CalendarStarIcon,
    BadgeIcon: Megaphone,
    viewAllLabel: 'View All Events',
  },
}

interface ListCardProps {
  variant: EntryType
  entries: CalendarEntry[]
  isLoading?: boolean
  onViewAll?: () => void
}

/**
 * Reusable list card for Birthday / Anniversary / Events. Icon, accent colour,
 * underline and the View-All button are all driven by the `variant` prop.
 */
export default function ListCard({ variant, entries, isLoading = false, onViewAll }: ListCardProps) {
  const v = VARIANTS[variant]
  const { HeaderIcon, BadgeIcon, accent } = v

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-divider/70">
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-6">
        <div>
          <div className="flex items-center gap-2.5">
            <HeaderIcon className="h-[22px] w-[22px]" strokeWidth={2} style={{ color: accent }} />
            <h2 className="text-[17px] font-semibold text-ink">{v.title}</h2>
          </div>
          <span
            className="mt-2 block h-[3px] w-14 rounded-full"
            style={{ backgroundColor: accent }}
          />
        </div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-full ${v.soft}`}>
          <BadgeIcon className="h-5 w-5" strokeWidth={2} style={{ color: accent }} />
        </span>
      </div>

      {/* Body */}
      <div className="slim-scroll mt-4 max-h-[440px] flex-1 overflow-y-auto px-4 xl:max-h-none">
        {isLoading ? (
          <SkeletonRows accent={accent} />
        ) : entries.length === 0 ? (
          <EmptyState accent={accent} />
        ) : (
          <ul className="flex flex-col">
            {entries.map((entry) => (
              <EntryRow key={entry.id} entry={entry} accent={accent} soft={v.soft} />
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 pt-3">
        <button
          type="button"
          onClick={onViewAll}
          className={`flex w-full items-center justify-center gap-2 rounded-full border ${v.soft} ${v.softText} py-2.5 text-[13px] font-semibold transition-colors hover:brightness-95 focus:outline-none focus-visible:ring-2`}
          style={{ borderColor: `${accent}33`, outlineColor: accent }}
        >
          {v.viewAllLabel}
          <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
        </button>
      </div>
    </section>
  )
}

function EntryRow({ entry, accent, soft }: { entry: CalendarEntry; accent: string; soft: string }) {
  return (
    <li className="row-animate flex items-center gap-3.5 rounded-xl px-2 py-2.5 transition-colors hover:bg-pagebg">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${soft}`}
      >
        <User className="h-[22px] w-[22px]" strokeWidth={1.9} style={{ color: accent }} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[14px] font-semibold text-ink" title={entry.name}>
          {entry.name}
        </p>
        <p className="mt-0.5 text-[12.5px] font-medium text-muted">{formatDayMonth(entry.date)}</p>
      </div>
    </li>
  )
}

function SkeletonRows({ accent }: { accent: string }) {
  return (
    <ul className="flex flex-col" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="flex items-center gap-3.5 px-2 py-2.5">
          <span
            className="h-11 w-11 shrink-0 animate-pulse rounded-full opacity-20"
            style={{ backgroundColor: accent }}
          />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/4 animate-pulse rounded bg-divider" />
            <div className="h-2.5 w-1/3 animate-pulse rounded bg-divider" />
          </div>
        </li>
      ))}
    </ul>
  )
}

function EmptyState({ accent }: { accent: string }) {
  return (
    <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="relative">
        <svg width="92" height="92" viewBox="0 0 92 92" fill="none" aria-hidden>
          <rect x="14" y="20" width="64" height="58" rx="9" fill="#EEF3FB" stroke="#CBD5E6" strokeWidth="2.5" />
          <path d="M14 35h64" stroke="#CBD5E6" strokeWidth="2.5" />
          <rect x="27" y="11" width="5" height="15" rx="2.5" fill="#CBD5E6" />
          <rect x="60" y="11" width="5" height="15" rx="2.5" fill="#CBD5E6" />
          <circle cx="32" cy="50" r="3.6" fill="#CBD5E6" />
          <circle cx="46" cy="50" r="3.6" fill="#CBD5E6" />
          <circle cx="60" cy="50" r="3.6" fill="#CBD5E6" />
          <circle cx="32" cy="63" r="3.6" fill="#CBD5E6" />
          <circle cx="46" cy="63" r="3.6" fill="#CBD5E6" />
        </svg>
        <Sparkles
          className="absolute -right-2 -top-1 h-7 w-7"
          strokeWidth={2}
          style={{ color: accent }}
        />
      </div>
      <p className="text-sm font-semibold text-muted">No Data Found..!</p>
    </div>
  )
}
