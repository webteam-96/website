import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, CalendarDays, Search, Users } from 'lucide-react'
import { getCategory, projectsByCategory } from '../data/projects'
import PageBanner from './PageBanner'

export default function ProjectsPage() {
  const { category } = useParams<{ category: string }>()
  const cat = category ? getCategory(category) : undefined
  const [query, setQuery] = useState('')

  const all = useMemo(() => (category ? projectsByCategory(category) : []), [category])
  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return all
    return all.filter((p) => [p.title, p.description, p.clubName].some((f) => f.toLowerCase().includes(q)))
  }, [all, query])

  return (
    <main className="flex-1 bg-[#f5f8fc]">
      <PageBanner
        title={cat?.label ?? 'Club Projects'}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Club Projects' },
          { label: cat?.label ?? 'Projects' },
        ]}
        width="max-w-[1280px]"
      />

      <div className="mx-auto max-w-[1280px] px-5 py-8 sm:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-muted">
            {items.length} project{items.length === 1 ? '' : 's'} in {cat?.label ?? 'this category'}
          </p>
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" strokeWidth={2} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              aria-label="Search projects"
              className="w-full rounded-xl border border-divider bg-white py-2.5 pl-10 pr-3 text-sm text-ink shadow-soft outline-none placeholder:text-muted focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/15"
            />
          </div>
        </div>

        {items.length === 0 ? (
          <p className="py-16 text-center text-sm font-medium text-muted">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <article key={p.id} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-divider/50 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-44 overflow-hidden">
                  <img src={p.images[0]} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-brand-blue px-3 py-1 text-[11px] font-semibold text-white">
                    {p.categoryLabel}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[16px] font-bold leading-snug text-brand-bluedark">{p.title}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-[12.5px] font-medium text-muted">
                    <CalendarDays className="h-4 w-4 text-brand-gold" strokeWidth={2} /> {p.date}
                  </p>
                  <p className="mt-2.5 line-clamp-2 flex-1 text-[13.5px] leading-relaxed text-muted">{p.description}</p>
                  <div className="mt-3 flex items-center gap-4 border-t border-divider/70 pt-3 text-[12.5px] font-medium text-ink">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-brand-blue" strokeWidth={2} /> {p.beneficiaries.toLocaleString('en-IN')} beneficiaries
                    </span>
                  </div>
                  <Link
                    to={`/projects/${p.id}`}
                    className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-lg bg-brand-blue px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-brand-bluehover"
                  >
                    Read More <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
