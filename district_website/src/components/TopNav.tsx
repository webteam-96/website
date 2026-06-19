import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, ChevronDown, Menu, UserPlus, X } from 'lucide-react'

interface NavItem {
  label: string
  /** Internal route. Items without one are placeholders until their page exists. */
  to?: string
  /** Match the route exactly (used for "/" so it isn't active everywhere). */
  end?: boolean
  caret?: boolean
  /** Dropdown sub-items. */
  children?: { label: string; to: string }[]
}

const NAV_LINKS: NavItem[] = [
  { label: 'HOME', to: '/', end: true },
  { label: 'DISTRICT COMMITTEE', to: '/district-committee' },
  { label: 'CLUB FINDER', to: '/club-finder' },
  {
    label: 'CLUB PROJECTS',
    caret: true,
    children: [
      { label: 'Community Service', to: '/club-projects/community-service' },
      { label: 'Club Service', to: '/club-projects/club-service' },
      { label: 'Vocational Service', to: '/club-projects/vocational-service' },
      { label: 'New Generation Service', to: '/club-projects/new-generation-service' },
      { label: 'International Service', to: '/club-projects/international-service' },
      { label: 'Public Image', to: '/club-projects/public-image' },
    ],
  },
  {
    label: 'NEWSLETTERS',
    caret: true,
    children: [
      { label: "Governor's Monthly Letter", to: '/newsletters/governors-letter' },
      { label: 'Club Newsletter', to: '/newsletters/club-newsletter' },
    ],
  },
  { label: 'CALENDAR', to: '/calendar' },
]

// A single pill slides between active items (the "magic pill"). The links sit
// above it (z-[1]); the active link's text is white, idle is dimmed.
const DESKTOP_BASE =
  'slot-link relative z-[1] flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] tracking-wide transition-colors'
const DESKTOP_ACTIVE = 'font-semibold text-white'
const DESKTOP_IDLE = 'font-medium text-white/85 hover:text-white'

export default function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  // Which mobile dropdown (by label) is currently expanded, if any.
  const [openSub, setOpenSub] = useState<string | null>(null)
  const location = useLocation()
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [pill, setPill] = useState({ left: 0, top: 0, width: 0, height: 0, visible: false })

  // Which top-level nav route is active (mirrors NavLink's matching).
  const activePath = useMemo(() => {
    const m = NAV_LINKS.find(
      (l) =>
        l.to &&
        (l.end
          ? location.pathname === l.to
          : location.pathname === l.to || location.pathname.startsWith(l.to + '/')),
    )
    return m?.to ?? null
  }, [location.pathname])

  // Measure the active item so the single pill can slide to it.
  const measurePill = useCallback(() => {
    const el = activePath ? itemRefs.current[activePath] : null
    if (el && el.offsetWidth) {
      setPill({ left: el.offsetLeft, top: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight, visible: true })
    } else {
      setPill((p) => ({ ...p, visible: false }))
    }
  }, [activePath])

  useLayoutEffect(measurePill, [measurePill])
  useEffect(() => {
    window.addEventListener('resize', measurePill)
    document.fonts?.ready.then(measurePill).catch(() => {})
    return () => window.removeEventListener('resize', measurePill)
  }, [measurePill])

  return (
    <header className="site-header sticky top-0 z-[1000] h-[70px] w-full bg-[#0d47a1] shadow-sm md:h-20">
      <div className="relative flex h-full w-full items-center pr-4 sm:pr-6">
        {/* White logo wedge — the clip-path is on this layer only. The blue
            header behind it shows wherever the wedge is clipped, forming the
            diagonal transition on the left. */}
        <div aria-hidden className="logo-curve absolute inset-0 z-[1] bg-white" />

        {/* Logo area (content; never clipped) */}
        <NavLink
          to="/"
          className="logo-area relative z-[2] flex h-full shrink-0 items-center pl-6"
        >
          <img src={`${import.meta.env.BASE_URL}3170.png`} alt="Rotary District 3170" className="h-9 w-auto md:h-11" />
        </NavLink>

        {/* Main nav (desktop) */}
        <nav className="main-nav relative z-[2] mx-3 hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">
          {/* Single pill that slides to the active item */}
          <span
            aria-hidden
            className="pointer-events-none absolute z-0 rounded-full border border-white/60 bg-white/15 transition-all duration-300 ease-out"
            style={{
              left: pill.left,
              top: pill.top,
              width: pill.width,
              height: pill.height,
              opacity: pill.visible ? 1 : 0,
            }}
          />
          {NAV_LINKS.map((link) =>
            link.children ? (
              <DesktopDropdown key={link.label} link={link} />
            ) : link.to ? (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.end}
                ref={(el) => {
                  itemRefs.current[link.to!] = el
                }}
                className={({ isActive }) =>
                  [DESKTOP_BASE, isActive ? DESKTOP_ACTIVE : DESKTOP_IDLE].join(' ')
                }
              >
                <NavContent link={link} caretClass="h-4 w-4" />
              </NavLink>
            ) : (
              <a key={link.label} href="#" className={[DESKTOP_BASE, DESKTOP_IDLE].join(' ')}>
                <NavContent link={link} caretClass="h-4 w-4" />
              </a>
            ),
          )}
        </nav>

        {/* Header actions (desktop) */}
        <div className="header-actions relative z-[2] hidden shrink-0 items-center gap-2.5 xl:flex">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-brand-gold px-4 py-2.5 text-[14px] font-semibold text-[#0d47a1] shadow-pill transition-colors hover:bg-brand-goldhover focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <UserPlus className="h-4 w-4" strokeWidth={2.25} />
            JOIN ROTARY
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[14px] font-semibold text-[#0d47a1] shadow-pill transition-colors hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            ADMIN LOGIN
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="relative z-[2] ml-auto flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile / tablet menu — big, left-aligned, animated "text roll" links */}
      {mobileOpen && (
        <nav className="border-t border-white/10 bg-[#0d47a1] px-6 pb-8 pt-5 xl:hidden">
          <ul className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => setOpenSub((s) => (s === link.label ? null : link.label))}
                    aria-expanded={openSub === link.label}
                    className="slot-link flex w-full items-center justify-between gap-3 py-1.5 text-[30px] font-extrabold uppercase leading-[0.95] tracking-tight text-white/90 transition-colors hover:text-white sm:text-[38px]"
                  >
                    <span className="sr-only">{link.label}</span>
                    <SlotText text={link.label} />
                    <ChevronDown
                      className={`h-7 w-7 shrink-0 text-brand-gold transition-transform duration-200 ${
                        openSub === link.label ? 'rotate-180' : ''
                      }`}
                      strokeWidth={2.5}
                    />
                  </button>
                  {openSub === link.label && (
                    <ul className="mb-2 mt-1.5 flex flex-col gap-0.5 border-l-2 border-brand-gold/40 pl-4">
                      {link.children.map((c) => (
                        <li key={c.label}>
                          <NavLink
                            to={c.to}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                              `block py-1.5 text-[15px] font-semibold uppercase tracking-wide transition-colors ${
                                isActive ? 'text-brand-gold' : 'text-white/75 hover:text-white'
                              }`
                            }
                          >
                            {c.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : link.to ? (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `slot-link block w-fit py-1.5 text-[30px] font-extrabold uppercase leading-[0.95] tracking-tight transition-colors sm:text-[38px] ${
                        isActive ? 'text-brand-gold' : 'text-white/90 hover:text-white'
                      }`
                    }
                  >
                    <span className="sr-only">{link.label}</span>
                    <SlotText text={link.label} />
                  </NavLink>
                </li>
              ) : null,
            )}
          </ul>
          <div className="mt-7 flex flex-col gap-2.5">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg bg-brand-gold px-4 py-3 text-sm font-semibold text-[#0d47a1]"
            >
              <UserPlus className="h-4 w-4" /> JOIN ROTARY
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-[#0d47a1]"
            >
              ADMIN LOGIN <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </nav>
      )}
    </header>
  )
}

function NavContent({ link, caretClass }: { link: NavItem; caretClass: string }) {
  return (
    <>
      <span className="sr-only">{link.label}</span>
      <SlotText text={link.label} />
      {link.caret && <ChevronDown className={`${caretClass} opacity-80`} strokeWidth={2} />}
    </>
  )
}

/** Desktop nav label rendered as per-letter "slot machine" reels (see .slot-*
 *  in index.css). Decorative/aria-hidden — pair with an sr-only label. */
function SlotText({ text }: { text: string }) {
  return (
    <span className="slot-text" aria-hidden="true">
      {[...text].map((ch, i) => {
        const c = ch === ' ' ? ' ' : ch
        return (
          <span key={i} className="slot-col">
            <span className="slot-reel" style={{ '--d': `${i * 45}ms` } as CSSProperties}>
              <span>{c}</span>
              <span>{c}</span>
              <span>{c}</span>
              <span>{c}</span>
            </span>
          </span>
        )
      })}
    </span>
  )
}

/** Desktop nav item with a hover/focus dropdown of sub-pages. */
function DesktopDropdown({ link }: { link: NavItem }) {
  return (
    <div className="group relative">
      <button type="button" className={[DESKTOP_BASE, DESKTOP_IDLE].join(' ')}>
        <span className="sr-only">{link.label}</span>
        <SlotText text={link.label} />
        <ChevronDown className="h-4 w-4 opacity-80 transition-transform group-hover:rotate-180" strokeWidth={2} />
      </button>
      {/* pt-2 keeps a hover bridge between the button and the menu */}
      <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="overflow-hidden rounded-xl bg-white py-1.5 shadow-card ring-1 ring-divider">
          {link.children!.map((c) => (
            <li key={c.label}>
              <NavLink
                to={c.to}
                className={({ isActive }) =>
                  `block px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-brand-blue/5 text-brand-blue' : 'text-ink hover:bg-pagebg'
                  }`
                }
              >
                {c.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
