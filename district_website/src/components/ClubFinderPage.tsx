import { useMemo, useState } from 'react'
import { ArrowRight, Building2, CalendarClock, MapPin, Search, SearchX, Users } from 'lucide-react'
import ContactStrip from './ContactStrip'

interface Club {
  id: string
  name: string
  city: string
  members: number
  meeting: string
}

/**
 * Placeholder club directory so the page renders without a backend. Swap this
 * for a real clubs API the same way the calendar does in `src/api/calendar.ts`.
 */
const CLUBS: Club[] = [
  { id: 'kolhapur-central', name: 'Rotary Club of Kolhapur Central', city: 'Kolhapur', members: 84, meeting: 'Tue · 7:30 PM' },
  { id: 'sangli', name: 'Rotary Club of Sangli', city: 'Sangli', members: 61, meeting: 'Wed · 7:00 PM' },
  { id: 'belgaum-midtown', name: 'Rotary Club of Belgaum Midtown', city: 'Belgaum', members: 72, meeting: 'Mon · 7:15 PM' },
  { id: 'solapur-east', name: 'Rotary Club of Solapur East', city: 'Solapur', members: 49, meeting: 'Thu · 6:45 PM' },
  { id: 'miraj', name: 'Rotary Club of Miraj', city: 'Miraj', members: 38, meeting: 'Fri · 7:30 PM' },
  { id: 'ichalkaranji', name: 'Rotary Club of Ichalkaranji', city: 'Ichalkaranji', members: 55, meeting: 'Wed · 8:00 PM' },
  { id: 'karad', name: 'Rotary Club of Karad', city: 'Karad', members: 44, meeting: 'Tue · 7:00 PM' },
  { id: 'satara', name: 'Rotary Club of Satara', city: 'Satara', members: 67, meeting: 'Mon · 7:30 PM' },
]

export default function ClubFinderPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return CLUBS
    return CLUBS.filter(
      (c) => c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <>
      <ContactStrip />

      <main className="flex-1">
        {/* Title + search */}
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-7 sm:px-8">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white shadow-card">
              <Users className="h-[22px] w-[22px]" strokeWidth={2} />
            </span>
            <span className="h-8 w-1.5 rounded-full bg-brand-gold" />
            <h1 className="text-[26px] font-bold uppercase tracking-wide text-brand-blue">
              Club Finder
            </h1>
          </div>

          <div className="relative w-full sm:w-80">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              strokeWidth={2}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search clubs by name or city…"
              aria-label="Search clubs by name or city"
              className="w-full rounded-xl border border-divider bg-white py-3 pl-10 pr-4 text-sm text-ink shadow-card placeholder:text-muted focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
        </div>

        {/* Results */}
        <div className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8">
          <p className="mb-4 text-sm font-medium text-muted">
            {filtered.length} club{filtered.length === 1 ? '' : 's'} found
          </p>

          {filtered.length === 0 ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-2xl bg-white px-6 py-12 text-center shadow-card ring-1 ring-divider/70">
              <SearchX className="h-10 w-10 text-muted" strokeWidth={1.75} />
              <p className="text-sm font-semibold text-muted">
                No clubs match “{query}”.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((club) => (
                <ClubCard key={club.id} club={club} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

function ClubCard({ club }: { club: Club }) {
  return (
    <article className="flex flex-col rounded-2xl bg-white p-5 shadow-card ring-1 ring-divider/70 transition-shadow hover:shadow-lg">
      <div className="flex items-start gap-3.5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
          <Building2 className="h-6 w-6" strokeWidth={1.9} />
        </span>
        <div className="min-w-0">
          <h2 className="text-[15px] font-semibold leading-snug text-ink">{club.name}</h2>
          <p className="mt-1 flex items-center gap-1.5 text-[13px] font-medium text-muted">
            <MapPin className="h-4 w-4 text-brand-gold" strokeWidth={2} />
            {club.city}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] font-medium text-muted">
        <span className="flex items-center gap-1.5">
          <Users className="h-4 w-4 text-brand-blue" strokeWidth={2} />
          {club.members} members
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarClock className="h-4 w-4 text-brand-blue" strokeWidth={2} />
          {club.meeting}
        </span>
      </div>

      <button
        type="button"
        className="mt-5 flex items-center justify-center gap-2 rounded-full bg-brand-blue/5 py-2.5 text-[13px] font-semibold text-brand-blue transition-colors hover:bg-brand-blue/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
      >
        View club
        <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
      </button>
    </article>
  )
}
