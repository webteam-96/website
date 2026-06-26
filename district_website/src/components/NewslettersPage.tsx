import { useMemo, useState } from 'react'
import { Download, ExternalLink, Eye, FileText, Search, X } from 'lucide-react'
import { clubNewsletters, governorLetters, type NewsletterItem } from '../data/newsletters'
import PageBanner from './PageBanner'

export default function NewslettersPage({ variant }: { variant: 'governor' | 'club' }) {
  const all = variant === 'governor' ? governorLetters : clubNewsletters
  const pageTitle = variant === 'governor' ? "Governor's Monthly Letter" : 'Club Newsletter'

  const [query, setQuery] = useState('')
  const [preview, setPreview] = useState<NewsletterItem | null>(null)

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return all
    return all.filter((n) => [n.title, n.club, n.date].some((f) => f.toLowerCase().includes(q)))
  }, [all, query])

  return (
    <main className="flex-1 bg-[#f5f8fc]">
      <PageBanner
        title={pageTitle}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Newsletters' }, { label: pageTitle }]}
        width="max-w-[1280px]"
      />

      <div className="mx-auto max-w-[1280px] px-5 py-8 sm:px-8">
        {variant === 'governor' ? (
          <div className="flex flex-col items-center rounded-2xl bg-white py-20 shadow-card ring-1 ring-divider/50">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
              <FileText className="h-7 w-7" strokeWidth={2} />
            </span>
            <p className="mt-4 text-base font-bold text-brand-bluedark">No record found.</p>
          </div>
        ) : (
          <>
            {/* Search */}
            <div className="relative mb-6 max-w-md">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" strokeWidth={2} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, club or date…"
                aria-label="Search newsletters"
                className="w-full rounded-xl border border-divider bg-white py-2.5 pl-10 pr-3 text-sm text-ink shadow-soft outline-none placeholder:text-muted focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/15"
              />
            </div>

            {items.length === 0 ? (
              <p className="py-16 text-center text-sm font-medium text-muted">No newsletters match “{query}”.</p>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((n) => (
                  <div
                    key={n.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setPreview(n)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setPreview(n)}
                    className="group flex cursor-pointer flex-col rounded-2xl bg-white p-5 shadow-card ring-1 ring-divider/50 transition-all hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600">
                        <FileText className="h-6 w-6" strokeWidth={2} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[15px] font-bold leading-snug text-brand-bluedark">{n.title}</h3>
                        <p className="truncate text-[13px] font-semibold text-ink">{n.club}</p>
                      </div>
                    </div>
                    {n.date && <p className="mt-3 text-[12.5px] font-semibold text-brand-gold">Published: {n.date}</p>}
                    <div className="mt-4 flex items-center gap-2">
                      <span className="flex items-center gap-1.5 rounded-lg bg-brand-blue px-3.5 py-2 text-[13px] font-semibold text-white">
                        <Eye className="h-4 w-4" strokeWidth={2} /> Preview
                      </span>
                      <a
                        href={n.pdf}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 rounded-lg border border-divider px-3.5 py-2 text-[13px] font-semibold text-ink hover:bg-pagebg"
                      >
                        <Download className="h-4 w-4" strokeWidth={2} /> Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Preview modal */}
      {preview && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 p-4 sm:p-8"
          onClick={() => setPreview(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${preview.title} preview`}
        >
          <div
            className="flex h-full w-full max-w-[900px] flex-col overflow-hidden rounded-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-divider px-5 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-brand-bluedark">{preview.title}</p>
                <p className="truncate text-[12px] text-muted">
                  {preview.club}
                  {preview.date && ` · ${preview.date}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={preview.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden items-center gap-1.5 rounded-lg border border-divider px-3 py-2 text-[13px] font-semibold text-ink hover:bg-pagebg sm:flex"
                >
                  <ExternalLink className="h-4 w-4" strokeWidth={2} /> Open
                </a>
                <a
                  href={preview.pdf}
                  download
                  className="flex items-center gap-1.5 rounded-lg bg-brand-blue px-3 py-2 text-[13px] font-semibold text-white hover:bg-brand-bluehover"
                >
                  <Download className="h-4 w-4" strokeWidth={2} /> Download
                </a>
                <button
                  type="button"
                  onClick={() => setPreview(null)}
                  aria-label="Close preview"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-pagebg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <iframe src={preview.pdf} title={`${preview.title} — ${preview.club}`} className="h-full w-full flex-1 bg-pagebg" />
          </div>
        </div>
      )}
    </main>
  )
}
