import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Search, Users } from 'lucide-react'
import { committees } from '../data/directors'
import DirectorCard from './DirectorCard'
import PageBanner from './PageBanner'

export default function DirectorsPage() {
  const [committeeId, setCommitteeId] = useState(committees[0].id)
  const [query, setQuery] = useState('')

  const committee = useMemo(
    () => committees.find((c) => c.id === committeeId) ?? committees[0],
    [committeeId],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return committee.members
    return committee.members.filter((d) =>
      [d.name, d.role, d.club].some((f) => f.toLowerCase().includes(q)),
    )
  }, [committee, query])

  return (
    <main className="flex-1">
      <PageBanner
        title="District Committee"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'District Committee' }]}
      />

      {/* Controls: committee dropdown + search */}
      <div className="mx-auto max-w-[1440px] px-5 pt-8 sm:px-8">
        <div className="mx-auto flex max-w-[1040px] flex-col gap-3 sm:flex-row sm:items-center">
          <CommitteeDropdown value={committeeId} onChange={setCommitteeId} />

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-1 flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-blue"
                strokeWidth={2}
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or designation..."
                aria-label="Search directors"
                className="w-full rounded-full border border-divider bg-white py-3.5 pl-14 pr-5 text-sm font-medium text-ink shadow-soft outline-none transition-colors placeholder:text-muted focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-brand-gold px-7 py-3.5 text-sm font-semibold text-brand-blue shadow-pill transition-colors hover:bg-brand-goldhover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50"
            >
              <Search className="h-4 w-4 sm:hidden" strokeWidth={2.4} />
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Directors grid */}
      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm font-medium text-muted">
            No members in “{committee.name}” match “{query}”.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filtered.map((d, i) => (
              <DirectorCard key={d.id} director={d} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

/** Styled dropdown to switch between committees. */
function CommitteeDropdown({
  value,
  onChange,
}: {
  value: string
  onChange: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = committees.find((c) => c.id === value) ?? committees[0]

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative shrink-0 sm:w-[280px]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 rounded-full border border-divider bg-white py-3.5 pl-5 pr-4 text-sm font-semibold text-brand-bluedark shadow-soft outline-none transition-colors hover:border-brand-blue/40 focus-visible:ring-2 focus-visible:ring-brand-blue/20"
      >
        <Users className="h-4 w-4 shrink-0 text-brand-blue" strokeWidth={2} />
        <span className="flex-1 truncate text-left">{current.name}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          strokeWidth={2.25}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-divider bg-white py-1 shadow-card"
        >
          {committees.map((c) => {
            const active = c.id === value
            return (
              <li key={c.id} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(c.id)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? 'bg-brand-blue/5 font-semibold text-brand-blue'
                      : 'font-medium text-ink hover:bg-pagebg'
                  }`}
                >
                  <span className="truncate">{c.name}</span>
                  <span className="shrink-0 rounded-full bg-pagebg px-2 py-0.5 text-[11px] font-semibold text-muted">
                    {c.members.length}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
