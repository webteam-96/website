import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const links = [
  { label: 'HOME', href: '#/' },
  { label: 'ABOUT', href: '#/about' },
  { label: 'DIRECTORS', href: '#/directors' },
  { label: 'DIRECTORY', href: '#/directory' },
  { label: 'CALENDAR', href: '#/calendar' },
  { label: 'PROJECTS', href: '#/projects' },
  { label: 'MEETINGS', href: '#/meetings' },
  { label: 'PAST PRESIDENT', href: '#/past-presidents' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [route, setRoute] = useState(() => window.location.hash.replace(/^#/, '') || '/')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const onHash = () => setRoute(window.location.hash.replace(/^#/, '') || '/')
    window.addEventListener('hashchange', onHash)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', onHash)
    }
  }, [])

  const isActive = (link) => (link.href === '#/' ? route === '/' : link.href === `#${route}`)

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'pt-2' : 'pt-4'}`}
    >
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
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-[13px] font-semibold tracking-wide transition-colors ${
                  isActive(link)
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-ink/70 hover:bg-navy/5 hover:text-navy'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a href="#" data-magnetic className="btn-navy !rounded-full">
              JOIN ROTARY
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

        {/* Mobile menu — floating rounded panel below the pill */}
        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out lg:hidden ${
            open ? 'mt-2 max-h-[26rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col rounded-3xl border border-white/60 bg-white/90 p-3 shadow-lg shadow-navy/10 backdrop-blur-md">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isActive(link)
                    ? 'bg-navy text-white'
                    : 'text-ink/70 hover:bg-navy/5 hover:text-navy'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3">
              <a href="#" className="btn-navy w-full !rounded-full">
                JOIN ROTARY
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
