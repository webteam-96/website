import { useEffect, useMemo, useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  LayoutGrid,
  List,
  RotateCcw,
  Search,
} from 'lucide-react'
import PageBanner from './PageBanner'
import { DAYS, clubs, type Club } from '../data/clubs'

const PAGE_SIZE = 12

type Icon = ComponentType<{ className?: string; strokeWidth?: string | number }>

const initials = (s: string) =>
  s.replace(/\b(Rotary|Club|of)\b/gi, '').trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()

const AVATAR_COLORS = [
  'bg-brand-blue/10 text-brand-blue',
  'bg-emerald-500/10 text-emerald-600',
  'bg-brand-gold/15 text-amber-600',
  'bg-violet-500/10 text-violet-600',
  'bg-rose-500/10 text-rose-600',
]

export default function ClubFinderPage() {
  const [query, setQuery] = useState('')
  const [day, setDay] = useState('')
  const [sort, setSort] = useState<'az' | 'za'>('az')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const r = clubs.filter((c) => {
      if (day && c.meetingDay !== day) return false
      if (q && ![c.name, c.president].some((f) => f.toLowerCase().includes(q))) return false
      return true
    })
    r.sort((a, b) => (sort === 'az' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))
    return r
  }, [query, day, sort])

  // Reset to page 1 whenever the result set changes.
  useEffect(() => setPage(1), [query, day, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, totalPages)
  const start = (current - 1) * PAGE_SIZE
  const visible = filtered.slice(start, start + PAGE_SIZE)

  const resetFilters = () => {
    setQuery('')
    setDay('')
  }

  return (
    <main className="flex-1">
      <PageBanner
        title="Club Finder"
        subtitle="Explore Rotary clubs across District 3170. Connect, collaborate and make a difference together."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Club Finder' }]}
      />

      <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8">
          {/* Filter bar */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-divider/50 lg:flex-row lg:flex-wrap lg:items-center"
          >
            <div className="relative min-w-0 flex-1 lg:basis-[260px]">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" strokeWidth={2} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by club name or president…"
                aria-label="Search clubs"
                className="w-full rounded-xl border border-divider bg-pagebg/40 py-2.5 pl-10 pr-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-brand-blue/40 focus:bg-white focus:ring-2 focus:ring-brand-blue/15"
              />
            </div>

            <Select icon={CalendarDays} value={day} onChange={setDay} placeholder="All Days" options={DAYS} />

            <div className="flex items-center gap-2.5">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-bluehover"
              >
                <Search className="h-4 w-4" strokeWidth={2.25} /> Search
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center gap-2 rounded-xl border border-divider px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-pagebg"
              >
                <RotateCcw className="h-4 w-4" strokeWidth={2.25} /> Reset
              </button>
            </div>
          </form>

          {/* Results info + view toggle + sort */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-muted">
              {filtered.length === 0
                ? 'No clubs found'
                : `Showing ${start + 1} – ${Math.min(start + PAGE_SIZE, filtered.length)} of ${filtered.length} clubs`}
            </p>

            <div className="flex items-center gap-3">
              <div className="flex rounded-lg border border-divider p-0.5">
                <ToggleBtn active={view === 'grid'} onClick={() => setView('grid')} icon={LayoutGrid} label="Grid View" />
                <ToggleBtn active={view === 'list'} onClick={() => setView('list')} icon={List} label="List View" />
              </div>
              <label className="flex items-center gap-2 text-sm text-muted">
                <span className="hidden sm:inline">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as 'az' | 'za')}
                  className="rounded-lg border border-divider bg-white px-3 py-2 text-sm font-medium text-ink outline-none focus:border-brand-blue/40"
                >
                  <option value="az">A – Z</option>
                  <option value="za">Z – A</option>
                </select>
              </label>
            </div>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="mt-8 flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl bg-white text-center shadow-card ring-1 ring-divider/50">
              <Search className="h-9 w-9 text-muted" strokeWidth={1.75} />
              <p className="text-sm font-semibold text-muted">No clubs match your filters.</p>
              <button onClick={resetFilters} className="text-sm font-semibold text-brand-blue hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div
              className={
                view === 'grid'
                  ? 'mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'
                  : 'mt-6 flex flex-col gap-3'
              }
            >
              {visible.map((club, i) => (
                <ClubCard key={club.id} club={club} view={view} color={AVATAR_COLORS[i % AVATAR_COLORS.length]} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination page={current} totalPages={totalPages} onChange={setPage} />
          )}
        </div>
    </main>
  )
}

function ClubCard({ club, view, color }: { club: Club; view: 'grid' | 'list'; color: string }) {
  const avatar = (
    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${color}`}>
      {initials(club.name)}
    </span>
  )

  if (view === 'list') {
    return (
      <Link
        to={`/clubs/${club.id}`}
        className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-divider/50 transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        {avatar}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-bold text-brand-bluedark">{club.name}</h3>
          <p className="truncate text-[13px] text-muted">President: {club.president}</p>
        </div>
        <span className="hidden items-center gap-1.5 text-[13px] font-medium text-muted sm:flex">
          <CalendarDays className="h-4 w-4 text-brand-blue" strokeWidth={2} /> {club.meetingDay}
        </span>
        <span className="hidden items-center gap-1.5 text-[13px] font-medium text-muted sm:flex">
          <Clock className="h-4 w-4 text-brand-blue" strokeWidth={2} /> {club.meetingTime}
        </span>
        <ChevronRight className="h-5 w-5 shrink-0 text-muted" strokeWidth={2.25} />
      </Link>
    )
  }

  return (
    <Link
      to={`/clubs/${club.id}`}
      className="group flex flex-col rounded-2xl bg-white p-4 shadow-card ring-1 ring-divider/50 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        {avatar}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-bold text-brand-bluedark">{club.name}</h3>
          <p className="truncate text-[12.5px] text-muted">President: {club.president}</p>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-divider/70 pt-3">
        <MeetingCell icon={CalendarDays} label="Meeting Day" value={club.meetingDay} />
        <MeetingCell icon={Clock} label="Meeting Time" value={club.meetingTime} />
      </div>
    </Link>
  )
}

function MeetingCell({ icon: Icon, label, value }: { icon: Icon; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" strokeWidth={2} />
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">{label}</p>
        <p className="text-[13px] font-semibold text-ink">{value}</p>
      </div>
    </div>
  )
}

function Select({
  icon: Icon,
  value,
  onChange,
  placeholder,
  options,
}: {
  icon?: Icon
  value: string
  onChange: (v: string) => void
  placeholder: string
  options: string[]
}) {
  return (
    <div className="relative lg:basis-[160px]">
      {Icon && <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" strokeWidth={2} />}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
        className={`w-full appearance-none rounded-xl border border-divider bg-pagebg/40 py-2.5 pr-8 text-sm font-medium text-ink outline-none transition-colors focus:border-brand-blue/40 focus:bg-white ${Icon ? 'pl-9' : 'pl-3'}`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronRight className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-muted" strokeWidth={2} />
    </div>
  )
}

function ToggleBtn({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: Icon
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors ${
        active ? 'bg-brand-blue text-white' : 'text-muted hover:text-ink'
      }`}
    >
      <Icon className="h-4 w-4" strokeWidth={2} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number
  totalPages: number
  onChange: (p: number) => void
}) {
  // Build a compact page list with ellipses.
  const pages: (number | '…')[] = []
  const push = (n: number | '…') => pages.push(n)
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) push(i)
  } else {
    push(1)
    if (page > 3) push('…')
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) push(i)
    if (page < totalPages - 2) push('…')
    push(totalPages)
  }

  const btn = 'flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition-colors'

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={`${btn} border-divider text-ink hover:bg-pagebg disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
        <span className="ml-1 hidden sm:inline">Previous</span>
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`e${i}`} className="px-1.5 text-muted">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`${btn} ${
              p === page
                ? 'border-brand-blue bg-brand-blue text-white'
                : 'border-divider text-ink hover:bg-pagebg'
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className={`${btn} border-divider text-ink hover:bg-pagebg disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <span className="mr-1 hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
      </button>
    </nav>
  )
}

