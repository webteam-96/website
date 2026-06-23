import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  IndianRupee,
  Users,
  HeartHandshake,
  Clock,
  CalendarDays,
  Target,
  Tag,
  User,
  Mail,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Images,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
} from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Reveal from '../components/Reveal'
import SpotlightCard from '../components/SpotlightCard'
import { getProject, projectsByAvenue, avenueOf } from '../data/projects'

const STATS = [
  { key: 'cost', label: 'Total Cost', icon: IndianRupee, accent: 'from-amber-400 to-amber-600', prefix: '₹' },
  { key: 'beneficiaries', label: 'Beneficiaries', icon: HeartHandshake, accent: 'from-rose-400 to-rose-600' },
  { key: 'rotarians', label: 'Rotarians Involved', icon: Users, accent: 'from-blue-400 to-blue-600' },
  { key: 'manHours', label: 'Man Hours', icon: Clock, accent: 'from-emerald-400 to-emerald-600' },
]

export default function ProjectDetail({ pid }) {
  const project = getProject(pid)
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  // Dedicated, mount-only portal container so the lightbox's createPortal target
  // is always a valid DOM node — prevents "Target container is not a DOM element"
  // during concurrent re-renders / HMR reloads.
  const [portalEl, setPortalEl] = useState(null)
  useEffect(() => {
    const el = document.createElement('div')
    el.setAttribute('data-lightbox-root', '')
    document.body.appendChild(el)
    setPortalEl(el)
    return () => el.remove()
  }, [])

  if (!project) {
    return (
      <div className="container-x py-24 text-center">
        <p className="text-lg font-semibold text-navy">Project not found.</p>
        <a href="#/projects" className="mt-4 inline-flex items-center gap-2 text-gold-cta hover:gap-3">
          <ArrowLeft className="h-4 w-4" /> Back to all projects
        </a>
      </div>
    )
  }

  const avenue = avenueOf(project.avenue)
  const siblings = projectsByAvenue(project.avenue)
  const idx = siblings.findIndex((p) => p.id === project.id)
  const prev = idx > 0 ? siblings[idx - 1] : null
  const next = idx < siblings.length - 1 ? siblings[idx + 1] : null

  const focus = [project.cause, project.subCat, project.subSub].filter(Boolean)
  const gallery = project.gallery && project.gallery.length ? project.gallery : [project.img]
  const go = (d) => setActive((i) => (i + d + gallery.length) % gallery.length)

  const liveStats = STATS.filter((s) => project[s.key] && project[s.key] !== '0')

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `${project.title} — Rotary Club of Thane Hills`
  const shares = [
    { Icon: Facebook, label: 'Facebook', color: 'hover:bg-[#1877F2]', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { Icon: Twitter, label: 'X', color: 'hover:bg-black', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}` },
    { Icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-[#0A66C2]', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
    { Icon: MessageCircle, label: 'WhatsApp', color: 'hover:bg-[#25D366]', href: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}` },
  ]

  return (
    <>
      <Breadcrumb
        eyebrow={`${avenue?.label} · ${project.date}`}
        title={project.title}
        trail={[
          { label: 'Home', href: '#/' },
          { label: 'Projects', href: '#/projects' },
          { label: avenue?.label, href: `#/projects/${project.avenue}` },
          { label: project.title },
        ]}
      />

      <div className="bg-canvas">
        <div className="container-x py-10 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            {/* ── Gallery ── */}
            <Reveal variant="left" className="h-full min-w-0">
              <div className="flex flex-col gap-3 lg:sticky lg:top-24">
                <button
                  type="button"
                  onClick={() => setLightbox(true)}
                  className="group relative block overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-card"
                >
                  <img
                    src={gallery[active]}
                    alt={project.title}
                    className="h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[460px]"
                  />
                  {gallery.length > 1 && (
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      <Images className="h-3.5 w-3.5" /> {active + 1}/{gallery.length}
                    </span>
                  )}
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all duration-300 group-hover:bg-navy/15 group-hover:opacity-100">
                    <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-navy shadow">View Gallery</span>
                  </span>
                </button>

                {gallery.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {gallery.map((g, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={`Photo ${i + 1}`}
                        className={`h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                          active === i ? 'border-gold shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={g} alt="" loading="lazy" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            {/* ── Details ── */}
            <Reveal variant="right" className="h-full min-w-0">
              <div className="flex h-full flex-col gap-5">
                {/* category chip */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white ${avenue?.color}`}>
                    <Tag className="h-3.5 w-3.5" /> {avenue?.label}
                  </span>
                </div>

                <h1 className="font-heading text-2xl font-extrabold leading-tight text-navy md:text-[2rem] md:leading-[1.15]">
                  {project.title}
                </h1>

                {project.desc && (
                  <div>
                    <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-muted">Overview</p>
                    <p className="text-[15px] leading-relaxed text-ink/80">{project.desc}</p>
                  </div>
                )}

                {focus.length > 0 && (
                  <div>
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
                      <Target className="h-4 w-4 text-gold" /> Area of Focus
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {focus.map((f, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-navy/15 bg-white px-3 py-1 text-xs font-semibold text-navy"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* meta panel — always present, keeps the column balanced */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <dl className="divide-y divide-gray-100 text-sm">
                    <div className="flex items-center gap-3 pb-3">
                      <CalendarDays className="h-4 w-4 shrink-0 text-gold" />
                      <dt className="w-28 shrink-0 font-semibold text-muted">Date</dt>
                      <dd className="font-semibold text-navy">{project.date}</dd>
                    </div>
                    <div className="flex items-center gap-3 py-3">
                      <Tag className="h-4 w-4 shrink-0 text-gold" />
                      <dt className="w-28 shrink-0 font-semibold text-muted">Category</dt>
                      <dd className="font-semibold text-navy">{avenue?.label}</dd>
                    </div>
                    {project.presidentName && (
                      <div className="flex items-start gap-3 pt-3">
                        <User className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <dt className="w-28 shrink-0 font-semibold text-muted">President</dt>
                        <dd className="min-w-0">
                          <span className="font-semibold text-navy">{project.presidentName}</span>
                          {project.presidentEmail && (
                            <a
                              href={`mailto:${project.presidentEmail}`}
                              className="mt-0.5 flex min-w-0 items-center gap-1.5 text-gold-cta hover:underline"
                            >
                              <Mail className="h-3.5 w-3.5 shrink-0" />
                              <span className="truncate">{project.presidentEmail}</span>
                            </a>
                          )}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Share on */}
                <div className="mt-auto flex items-center gap-3">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
                    <Share2 className="h-4 w-4 text-gold" /> Share
                  </p>
                  <div className="flex gap-2">
                    {shares.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Share on ${s.label}`}
                        className={`flex h-9 w-9 items-center justify-center rounded-full bg-navy/5 text-navy transition-colors hover:text-white ${s.color}`}
                      >
                        <s.Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Impact stats ── */}
          {liveStats.length > 0 && (
            <div className="mt-12">
              <div className="mb-5 flex items-center gap-3">
                <h2 className="font-heading text-xl font-extrabold text-navy">Project Impact</h2>
                <span className="h-px flex-1 bg-gray-200" />
              </div>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {liveStats.map((s, i) => (
                  <Reveal key={s.key} variant="up" delay={i * 90} className="h-full">
                    <SpotlightCard className="group relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-transform duration-300 hover:-translate-y-1">
                      <span className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md ${s.accent}`}>
                        <s.icon className="h-6 w-6" />
                      </span>
                      <div className="font-heading text-2xl font-extrabold leading-none text-navy">
                        {s.prefix || ''}
                        {project[s.key]}
                      </div>
                      <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
                        {s.label}
                      </div>
                    </SpotlightCard>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* ── Prev / Next + back ── */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
            {prev ? (
              <a
                href={`#/project/${prev.id}`}
                className="group inline-flex max-w-[45%] items-center gap-2 text-sm font-semibold text-navy hover:text-gold-cta"
              >
                <ChevronLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-1" />
                <span className="truncate">{prev.title}</span>
              </a>
            ) : (
              <span />
            )}

            <a
              href={`#/projects/${project.avenue}`}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-navy-deep"
            >
              All {avenue?.label}
            </a>

            {next ? (
              <a
                href={`#/project/${next.id}`}
                className="group inline-flex max-w-[45%] items-center justify-end gap-2 text-sm font-semibold text-navy hover:text-gold-cta"
              >
                <span className="truncate">{next.title}</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </a>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>

      {/* ── Lightbox (portaled above the sticky header via a mounted container) ── */}
      {lightbox && portalEl && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setLightbox(false)}
            aria-label="Close gallery"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          {gallery.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); go(-1) }}
              aria-label="Previous photo"
              className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gold hover:text-navy md:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          <img
            src={gallery[active]}
            alt={`${project.title} — photo ${active + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="w-auto max-w-[92vw] rounded-xl object-contain shadow-2xl"
            style={{ height: 'min(85vh, 820px)' }}
          />

          {gallery.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); go(1) }}
              aria-label="Next photo"
              className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gold hover:text-navy md:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white">
            {active + 1} / {gallery.length}
          </span>
        </div>,
        portalEl,
      )}
    </>
  )
}
