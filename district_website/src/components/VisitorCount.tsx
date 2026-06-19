import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import gsap from 'gsap'

/**
 * Client-side visitor display. There's no backend, so this is NOT true global
 * tracking — it's a launch baseline that grows over time plus a per-browser
 * bump on each visit (localStorage). Swap `computeCount` for a real API call
 * (or the district's analytics/backend) to show genuine cross-visitor totals.
 */
function computeCount(): number {
  const BASE = 18420 // baseline "visitors since launch"
  const LAUNCH = Date.UTC(2025, 6, 1) // 1 Jul 2025
  const PER_DAY = 73 // simulated average daily visits
  const days = Math.max(0, Math.floor((Date.now() - LAUNCH) / 86_400_000))

  let mine = 1
  try {
    const KEY = 'rid3170-visits'
    mine = Number(localStorage.getItem(KEY) || '0') + 1
    localStorage.setItem(KEY, String(mine))
  } catch {
    /* private mode / storage blocked — ignore */
  }

  return BASE + days * PER_DAY + mine
}

export default function VisitorCount() {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const target = computeCount()
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(target)
      return
    }
    // Odometer count-up on first paint.
    const obj = { v: 0 }
    const tween = gsap.to(obj, {
      v: target,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => setDisplay(Math.floor(obj.v)),
    })
    return () => {
      tween.kill()
    }
  }, [])

  const formatted = display.toLocaleString('en-IN')

  return (
    <div className="inline-flex flex-col rounded-xl bg-white/[0.06] p-3 ring-1 ring-white/10 backdrop-blur-sm">
      <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65">
        <Eye className="h-3.5 w-3.5 text-brand-gold" strokeWidth={2.25} aria-hidden="true" />
        Visitors
        <span className="relative ml-0.5 flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
      </span>

      <div className="mt-2 flex items-center gap-1" aria-label={`${formatted} visitors`}>
        {[...formatted].map((ch, i) =>
          ch === ',' ? (
            <span key={i} className="px-0.5 text-[15px] font-bold text-white/35">
              ,
            </span>
          ) : (
            <span
              key={i}
              className="flex h-8 w-[22px] items-center justify-center rounded-md bg-gradient-to-b from-white/20 to-white/5 text-[15px] font-extrabold tabular-nums text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] ring-1 ring-white/15"
            >
              {ch}
            </span>
          ),
        )}
      </div>
    </div>
  )
}
