import { useMemo, useState } from 'react'
import { Award, Search, X } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Avatar from '../components/Avatar'
import Reveal from '../components/Reveal'
import SpotlightCard from '../components/SpotlightCard'
import CountUp from '../components/CountUp'
import { presidents } from '../data/presidents'

export default function PastPresidents() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return presidents
    return presidents.filter(
      (p) => p.name.toLowerCase().includes(q) || p.year.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <>
      <Breadcrumb
        eyebrow="Roll of Honour"
        title="Past Presidents"
        titleClassName="uppercase tracking-wide"
        trail={[{ label: 'Home', href: '#/' }, { label: 'Past Presidents' }]}
      />

      <div className="bg-canvas">
        <div className="container-x py-12">
          <p className="mb-6 flex items-center justify-center gap-2 text-sm text-muted">
            <Award className="h-4 w-4 text-gold" />
            Celebrating <CountUp to={presidents.length} className="font-bold text-navy" /> years of leadership since 1991
          </p>

          {/* search bar */}
          <div className="mx-auto mb-4 flex max-w-3xl items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm focus-within:border-gold/60 focus-within:ring-2 focus-within:ring-gold/20">
            <Search className="h-5 w-5 shrink-0 text-navy" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or year..."
              className="w-full bg-transparent text-sm text-ink placeholder:text-muted/70 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Clear search" className="text-muted hover:text-navy">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {query && (
            <p className="mb-6 text-center text-sm text-muted">
              <span className="font-bold text-navy">{filtered.length}</span> result{filtered.length === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
            </p>
          )}

          {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <Reveal key={p.year} variant="up" delay={(i % 8) * 50} className="h-full">
                <SpotlightCard
                  as="article"
                  className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover"
                >
                  {/* gold year ribbon */}
                  <span className="absolute right-0 top-4 rounded-l-full bg-gold px-3 py-1 text-[11px] font-bold text-navy shadow-sm">
                    {p.year}
                  </span>

                  {p.img ? (
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="h-32 w-32 rounded-full object-cover object-top shadow-md ring-4 ring-gold/40"
                    />
                  ) : (
                    <Avatar name={p.name} className="h-32 w-32 text-3xl ring-4" />
                  )}

                  <h3 className="mt-4 font-heading text-base font-bold leading-tight text-navy">{p.name}</h3>
                  <span className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-gold-cta">
                    <Award className="h-3.5 w-3.5" /> President
                  </span>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
          ) : (
            <p className="py-16 text-center text-muted">
              No past president found matching &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>
      </div>
    </>
  )
}
