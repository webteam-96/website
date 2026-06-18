import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown, Home, Lock, Menu, UserPlus, X } from 'lucide-react'

interface NavItem {
  label: string
  /** Internal route. Items without one are placeholders until their page exists. */
  to?: string
  /** Match the route exactly (used for "/" so it isn't active everywhere). */
  end?: boolean
  icon?: boolean
  caret?: boolean
}

const NAV_LINKS: NavItem[] = [
  { label: 'HOME', to: '/', end: true, icon: true },
  { label: 'DISTRICT COMMITTEE' },
  { label: 'CLUB FINDER', to: '/club-finder' },
  { label: 'CLUB PROJECTS', caret: true },
  { label: 'NEWSLETTERS', caret: true },
  { label: 'CALENDAR', to: '/calendar' },
]

const DESKTOP_BASE =
  'flex items-center gap-1.5 rounded-md px-3.5 py-2.5 text-[16px] tracking-wide transition-colors'
const DESKTOP_ACTIVE = 'font-semibold text-white'
const DESKTOP_IDLE = 'font-medium text-white/85 hover:text-white'

const MOBILE_BASE = 'flex items-center gap-2 rounded-md px-3 py-3 text-sm font-medium transition-colors'
const MOBILE_ACTIVE = 'bg-white/10 text-white'
const MOBILE_IDLE = 'text-white/90 hover:bg-white/10'

export default function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-brand-blue shadow-sm">
      <div className="relative mx-auto flex h-20 max-w-[1440px] items-center pr-4 sm:pr-6">
        {/* Logo on a clean, full-height white panel with a rounded right edge */}
        <NavLink to="/" className="relative z-10 flex h-full items-center">
          <span className="flex h-full items-center rounded-r-2xl bg-white pl-5 pr-7 shadow-sm">
            <img src="/3170.png" alt="Rotary District 3170" className="h-11 w-auto" />
          </span>
        </NavLink>

        {/* Center nav (desktop) */}
        <nav className="ml-6 hidden flex-1 items-center justify-center gap-2 xl:flex">
          {NAV_LINKS.map((link) =>
            link.to ? (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  [DESKTOP_BASE, isActive ? DESKTOP_ACTIVE : DESKTOP_IDLE].join(' ')
                }
              >
                <NavContent link={link} iconClass="h-[18px] w-[18px]" caretClass="h-4 w-4" />
              </NavLink>
            ) : (
              <a key={link.label} href="#" className={[DESKTOP_BASE, DESKTOP_IDLE].join(' ')}>
                <NavContent link={link} iconClass="h-[18px] w-[18px]" caretClass="h-4 w-4" />
              </a>
            ),
          )}
        </nav>

        {/* Right actions (desktop) */}
        <div className="ml-auto hidden items-center gap-3 xl:flex">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-brand-gold px-4 py-2.5 text-[14px] font-semibold text-brand-blue shadow-pill transition-colors hover:bg-brand-goldhover focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <UserPlus className="h-4 w-4" strokeWidth={2} />
            JOIN ROTARY
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[14px] font-semibold text-brand-blue shadow-pill transition-colors hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <Lock className="h-3.5 w-3.5" strokeWidth={2} />
            ADMIN LOGIN
            <span aria-hidden>→</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <nav className="border-t border-white/10 bg-brand-blue px-4 pb-4 xl:hidden">
          <ul className="flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.to ? (
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      [MOBILE_BASE, isActive ? MOBILE_ACTIVE : MOBILE_IDLE].join(' ')
                    }
                  >
                    <NavContent link={link} iconClass="h-4 w-4" caretClass="h-4 w-4" />
                  </NavLink>
                ) : (
                  <a href="#" className={[MOBILE_BASE, MOBILE_IDLE].join(' ')}>
                    <NavContent link={link} iconClass="h-4 w-4" caretClass="h-4 w-4" />
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2.5 pt-2">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg bg-brand-gold px-4 py-3 text-sm font-semibold text-brand-blue"
            >
              <UserPlus className="h-4 w-4" /> JOIN ROTARY
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-brand-blue"
            >
              <Lock className="h-3.5 w-3.5" /> ADMIN LOGIN →
            </button>
          </div>
        </nav>
      )}
    </header>
  )
}

function NavContent({
  link,
  iconClass,
  caretClass,
}: {
  link: NavItem
  iconClass: string
  caretClass: string
}) {
  return (
    <>
      {link.icon && <Home className={iconClass} strokeWidth={1.75} />}
      {link.label}
      {link.caret && <ChevronDown className={`${caretClass} opacity-80`} strokeWidth={2} />}
    </>
  )
}
