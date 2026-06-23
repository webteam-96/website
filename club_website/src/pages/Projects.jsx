import { useMemo, useState } from 'react'
import { Search, X, HeartHandshake, ArrowRight, FolderOpen } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Reveal from '../components/Reveal'
import SpotlightCard from '../components/SpotlightCard'
import { projects, projectAvenues, projectsByAvenue, avenueOf } from '../data/projects'

// "Club Events" (CE) is the same content as the dedicated Meetings page, so it's
// excluded from the Projects page (tabs + the "All" list) to avoid duplicates.
const visibleProjects = projects.filter((p) => p.avenue !== 'CE')
const visibleAvenues = projectAvenues.filter((a) => a.code !== 'CE')

function ProjectCard({ p, i }) {
  const av = avenueOf(p.avenue)
  return (
    <Reveal variant="up" delay={(i % 9) * 60} className="h-full">
      <a href={`#/project/${p.id}`} className="block h-full">
        <SpotlightCard
          as="article"
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cardHover"
        >
          <div className="relative h-44 overflow-hidden">
            <img
              src={p.img}
              alt={p.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow ${av?.color}`}>
              {av?.label}
            </span>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
              {p.date}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="font-heading text-[15px] font-bold leading-snug text-navy line-clamp-2">{p.title}</h3>
            {p.desc && <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">{p.desc}</p>}
            <div className="mt-auto flex items-center justify-between pt-3">
              {p.beneficiaries && p.beneficiaries !== '0' ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-cta">
                  <HeartHandshake className="h-3.5 w-3.5" /> {p.beneficiaries} beneficiaries
                </span>
              ) : (
                <span />
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm transition-all duration-300 group-hover:bg-gold group-hover:text-navy group-hover:shadow-md group-hover:shadow-gold/30">
                Read More
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </SpotlightCard>
      </a>
    </Reveal>
  )
}

export default function Projects({ avenue = null }) {
  const [active, setActive] = useState(avenue)
  const [query, setQuery] = useState('')

  const base = active ? projectsByAvenue(active) : visibleProjects
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return base
    return base.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.cause.toLowerCase().includes(q),
    )
  }, [base, query])

  const setAvenue = (code) => {
    setActive(code)
    window.history.replaceState(null, '', code ? `#/projects/${code}` : '#/projects')
  }

  const activeMeta = active ? avenueOf(active) : null

  return (
    <>
      <Breadcrumb
        eyebrow="Service Above Self · 2025-26"
        title={activeMeta ? activeMeta.label : 'Our Projects'}
        trail={[
          { label: 'Home', href: '#/' },
          { label: 'Projects', href: '#/projects' },
          ...(activeMeta ? [{ label: activeMeta.label }] : []),
        ]}
      />

      <div className="bg-canvas">
        <div className="container-x py-12">
          {/* avenue filter tabs */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setAvenue(null)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                !active ? 'bg-navy text-white shadow-sm' : 'border border-gray-200 bg-white text-ink/70 hover:border-navy/30 hover:text-navy'
              }`}
            >
              All ({visibleProjects.length})
            </button>
            {visibleAvenues.map((a) => {
              const count = projectsByAvenue(a.code).length
              return (
                <button
                  key={a.code}
                  onClick={() => setAvenue(a.code)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    active === a.code
                      ? 'bg-navy text-white shadow-sm'
                      : 'border border-gray-200 bg-white text-ink/70 hover:border-navy/30 hover:text-navy'
                  }`}
                >
                  {a.label} ({count})
                </button>
              )
            })}
          </div>

          {/* search */}
          <div className="mx-auto mb-8 flex max-w-xl items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm focus-within:border-gold/60 focus-within:ring-2 focus-within:ring-gold/20">
            <Search className="h-5 w-5 shrink-0 text-navy" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects by name, focus or description..."
              className="w-full bg-transparent text-sm text-ink placeholder:text-muted/70 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Clear" className="text-muted hover:text-navy">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => (
                <ProjectCard key={`${p.avenue}-${p.id}`} p={p} i={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-20 text-center text-muted">
              <FolderOpen className="h-10 w-10 text-gray-300" />
              {active && projectsByAvenue(active).length === 0
                ? `No ${activeMeta?.label} projects recorded for 2025-26 yet.`
                : `No projects match “${query}”.`}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
