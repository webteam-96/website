import { useEffect, useState } from 'react'
import { Menu, X, ChevronDown, CalendarRange, LogIn } from 'lucide-react'
import Logo from './Logo'
import { projectAvenues } from '../data/projects'
import { useYear } from '../contexts/YearContext'

const fmtYear = (y) => y.replace(/^(\d{4})-\d{2}(\d{2})$/, '$1-$2')

// Compact Rotary-year selector shown in the header.
function YearSelect({ className = '' }) {
  const { years, selectedYearLabel, selectYear } = useYear()
  return (
    <div className={`relative ${className}`}>
      <CalendarRange className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gold" />
      <select
        value={selectedYearLabel}
        onChange={(e) => selectYear(e.target.value)}
        aria-label="Select Rotary year"
        className="h-10 cursor-pointer appearance-none rounded-full border border-navy/20 bg-white pl-9 pr-9 text-sm font-bold text-navy shadow-sm transition-colors hover:border-navy/40 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
      >
        {years.map((y) => (
          <option key={y.yearLabel} value={y.yearLabel}>
            {fmtYear(y.yearLabel)}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-navy/50" />
    </div>
  )
}

// Top-level nav. PROJECTS is a dropdown ("Club Projects") listing the six
// Rotary service avenues, mirroring the club's official menu.
const links = [
  { label: 'HOME', href: '#/' },
  { label: 'ABOUT', href: '#/about' },
  { label: 'DIRECTORS', href: '#/directors' },
  { label: 'DIRECTORY', href: '#/directory' },
  { label: 'CALENDAR', href: '#/calendar' },
  {
    label: 'PROJECTS',
    href: '#/projects',
    children: [
      { label: 'All Projects', href: '#/projects' },
      ...projectAvenues
        .filter((a) => a.code !== 'CE' && a.code !== 'CS')
        .map((a) => ({ label: a.label, href: `#/projects/${a.code}` })),
    ],
  },
  { label: 'MEETINGS', href: '#/meetings' },
  { label: 'PAST PRESIDENTS', href: '#/past-presidents' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [projOpen, setProjOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [route, setRoute] = useState(() => window.location.hash.replace(/^#/, '') || '/')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const onHash = () => {
      setRoute(window.location.hash.replace(/^#/, '') || '/')
      setOpen(false)
      setProjOpen(false)
    }
    window.addEventListener('hashchange', onHash)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', onHash)
    }
  }, [])

  // lock body scroll + allow Escape to close while the mobile drawer is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isActive = (link) => {
    if (link.href === '#/') return route === '/'
    if (link.label === 'PROJECTS') return route.startsWith('/projects') || route.startsWith('/project/')
    return link.href === `#${route}`
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'pt-2' : 'pt-4'}`}>
      <div className="container-x">
        {/* Floating glass pill bar */}
        <div
          className={`flex items-center justify-between gap-3 rounded-full border border-white/60 bg-white/80 pl-5 pr-3 shadow-lg shadow-navy/10 backdrop-blur-md transition-all duration-300 ${
            scrolled ? 'h-14' : 'h-16'
          }`}
        >
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {links.map((link) =>
              link.children ? (
                <div key={link.label} className="group relative">
                  <a
                    href={link.href}
                    className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold tracking-wide transition-colors ${
                      isActive(link)
                        ? 'bg-navy text-white shadow-sm'
                        : 'text-ink/70 hover:bg-navy/5 hover:text-navy'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  </a>
                  {/* dropdown (hover bridge via pt-2) */}
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="w-60 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-navy/10">
                      {link.children.map((c) => (
                        <a
                          key={c.label}
                          href={c.href}
                          className={`block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                            `#${route}` === c.href
                              ? 'bg-navy/5 text-navy'
                              : 'text-ink/70 hover:bg-navy/5 hover:text-navy'
                          }`}
                        >
                          {c.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={`whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold tracking-wide transition-colors ${
                    isActive(link)
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-ink/70 hover:bg-navy/5 hover:text-navy'
                  }`}
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <YearSelect />
            <a
              href="https://www.rotaryindia.org/Login.aspx"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="btn-navy !h-10 whitespace-nowrap !rounded-full"
            >
              <LogIn className="h-4 w-4" /> ADMIN LOGIN
            </a>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile menu — full-screen overlay drawer (covers the page, not pushed inline) */}
      {/* dimming backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[55] bg-navy/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* sliding drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed right-0 top-0 z-[60] flex h-[100dvh] w-[86%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
          <Logo />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {links.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  onClick={() => setProjOpen((v) => !v)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive(link) ? 'bg-navy text-white' : 'text-ink/80 hover:bg-navy/5 hover:text-navy'
                  }`}
                >
                  {link.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${projOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-[max-height] duration-300 ${projOpen ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="flex flex-col py-1 pl-3">
                    {link.children.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className="rounded-xl px-4 py-2.5 text-[13px] font-medium text-ink/70 hover:bg-navy/5 hover:text-navy"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive(link) ? 'bg-navy text-white' : 'text-ink/80 hover:bg-navy/5 hover:text-navy'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="space-y-3 border-t border-navy/10 p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-navy">
              <CalendarRange className="h-4 w-4 text-gold" /> Rotary Year
            </span>
            <YearSelect />
          </div>
          <a
            href="https://www.rotaryindia.org/Login.aspx"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn-navy w-full !rounded-full"
          >
            <LogIn className="h-4 w-4" /> ADMIN LOGIN
          </a>
        </div>
      </div>
    </header>
  )
}
