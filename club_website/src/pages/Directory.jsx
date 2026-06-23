import { useMemo, useState } from 'react'
import {
  Search, Users, X, Crown, LayoutGrid, List,
  ChevronLeft, ChevronRight, Briefcase,
} from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Avatar from '../components/Avatar'
import Reveal from '../components/Reveal'
import SpotlightCard from '../components/SpotlightCard'
import { members as staticMembers } from '../data/directory'
import { useApiData } from '../contexts/ClubData'
import { getDirectory } from '../lib/clubApi'
import { adaptDirectory } from '../lib/adapters'

const PAGE_SIZE = 16
const CROWN_TINTS = [
  'bg-amber-100 text-amber-500',
  'bg-blue-100 text-blue-500',
  'bg-emerald-100 text-emerald-500',
  'bg-rose-100 text-rose-500',
]

// page-number list with ellipsis for long ranges
function pageNums(cur, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const out = [1]
  const start = Math.max(2, cur - 1)
  const end = Math.min(total - 1, cur + 1)
  if (start > 2) out.push('…')
  for (let p = start; p <= end; p++) out.push(p)
  if (end < total - 1) out.push('…')
  out.push(total)
  return out
}

function MemberCard({ m, i }) {
  return (
    <SpotlightCard
      as="article"
      className="group relative flex h-full flex-col items-center rounded-2xl border border-gray-100 bg-white px-5 py-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover"
    >
      {/* crown badge */}
      <span className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full ${CROWN_TINTS[i % CROWN_TINTS.length]}`}>
        <Crown className="h-4 w-4" />
      </span>

      {m.img ? (
        <img
          src={m.img}
          alt={m.name}
          loading="lazy"
          className="h-20 w-20 rounded-full object-cover object-top shadow-sm ring-4 ring-gray-100 transition-all duration-300 group-hover:ring-gold/40"
        />
      ) : (
        <Avatar name={m.name} className="h-20 w-20 text-xl ring-4 ring-gray-100" />
      )}

      <h3 className="mt-4 font-heading text-[15px] font-bold leading-tight text-navy">{m.name}</h3>
      <p className="mt-2 line-clamp-2 min-h-[32px] text-xs leading-relaxed text-muted">{m.work || ''}</p>
    </SpotlightCard>
  )
}

function MemberRow({ m, i }) {
  return (
    <SpotlightCard
      as="article"
      className="group relative flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-card transition-all duration-300 hover:shadow-cardHover"
    >
      {m.img ? (
        <img src={m.img} alt={m.name} loading="lazy" className="h-14 w-14 shrink-0 rounded-full object-cover object-top ring-2 ring-gray-100" />
      ) : (
        <Avatar name={m.name} className="h-14 w-14 text-base ring-2 ring-gray-100" />
      )}

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-heading text-[15px] font-bold text-navy">{m.name}</h3>
        {m.work && (
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
            <Briefcase className="h-3 w-3 shrink-0 text-muted" /> {m.work}
          </p>
        )}
      </div>

      <span className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-full sm:flex ${CROWN_TINTS[i % CROWN_TINTS.length]}`}>
        <Crown className="h-4 w-4" />
      </span>
    </SpotlightCard>
  )
}

export default function Directory() {
  const [query, setQuery] = useState('')
  const [view, setView] = useState('grid') // 'grid' | 'list'
  const [page, setPage] = useState(1)

  // Live member directory from the API, falling back to the bundled snapshot.
  const { data: members } = useApiData(
    () => getDirectory().then(adaptDirectory),
    [],
    staticMembers,
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return members
    return members.filter(
      (m) => m.name.toLowerCase().includes(q) || (m.work || '').toLowerCase().includes(q),
    )
  }, [query, members])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const onSearch = (v) => {
    setQuery(v)
    setPage(1)
  }
  const goPage = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Breadcrumb
        eyebrow="Our Members"
        title="Directory"
        titleClassName="uppercase tracking-wide"
        trail={[{ label: 'Home', href: '#/' }, { label: 'Directory' }]}
      />

      <div className="bg-canvas">
        <div className="container-x py-10">
          {/* ── toolbar: count · search · view toggle ── */}
          <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-card lg:flex-row lg:items-center">
            <div className="flex shrink-0 items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-navy">
                <Users className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading text-2xl font-extrabold leading-none text-navy">{filtered.length}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">Members Found</p>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-2 rounded-full border border-gray-200 bg-canvas px-4 py-2.5 focus-within:border-gold/60 focus-within:ring-2 focus-within:ring-gold/20">
              <Search className="h-5 w-5 shrink-0 text-navy" />
              <input
                type="text"
                value={query}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search by name or profession..."
                className="w-full bg-transparent text-sm text-ink placeholder:text-muted/70 focus:outline-none"
              />
              {query && (
                <button onClick={() => onSearch('')} aria-label="Clear search" className="text-muted hover:text-navy">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button
                onClick={() => setView('grid')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  view === 'grid' ? 'bg-navy text-white shadow-sm' : 'border border-gray-200 text-navy hover:bg-canvas'
                }`}
              >
                <LayoutGrid className="h-4 w-4" /> Grid View
              </button>
              <button
                onClick={() => setView('list')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  view === 'list' ? 'bg-navy text-white shadow-sm' : 'border border-gray-200 text-navy hover:bg-canvas'
                }`}
              >
                <List className="h-4 w-4" /> List View
              </button>
            </div>
          </div>

          {/* ── members ── */}
          {pageItems.length > 0 ? (
            <>
              {view === 'grid' ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {pageItems.map((m, i) => (
                    <Reveal key={m.name + i} variant="up" delay={(i % 8) * 40} className="h-full">
                      <MemberCard m={m} i={(safePage - 1) * PAGE_SIZE + i} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {pageItems.map((m, i) => (
                    <Reveal key={m.name + i} variant="up" delay={(i % 8) * 35}>
                      <MemberRow m={m} i={(safePage - 1) * PAGE_SIZE + i} />
                    </Reveal>
                  ))}
                </div>
              )}

              {/* ── pagination ── */}
              {pageCount > 1 && (
                <div className="mt-10 flex items-center justify-center gap-1.5">
                  <button
                    onClick={() => goPage(safePage - 1)}
                    disabled={safePage === 1}
                    aria-label="Previous page"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-navy transition hover:bg-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-navy"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {pageNums(safePage, pageCount).map((p, idx) =>
                    p === '…' ? (
                      <span key={`e${idx}`} className="px-2 text-sm text-muted">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => goPage(p)}
                        className={`flex h-9 min-w-[36px] items-center justify-center rounded-lg px-2 text-sm font-bold transition ${
                          p === safePage ? 'bg-navy text-white shadow-sm' : 'border border-gray-200 bg-white text-navy hover:bg-canvas'
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                  <button
                    onClick={() => goPage(safePage + 1)}
                    disabled={safePage === pageCount}
                    aria-label="Next page"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-navy transition hover:bg-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-navy"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 py-16 text-center text-muted">
              <Users className="h-10 w-10 text-gray-300" />
              No members found matching &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
