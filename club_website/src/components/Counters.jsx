import { useEffect, useRef, useState } from 'react'
import { ArrowRight, BarChart3, Loader2 } from 'lucide-react'
import SplitText from './SplitText'

// Live Rotary Club of Thane Hills project-impact figures.
// In production these arrive from the backend — that's why they load on click,
// not on page render. Swap the simulated fetch in `loadStats` for the real API call.
const STATS = [
  { icon: 'fas fa-briefcase', value: 34, label: 'Projects' },
  { icon: 'fas fa-users', value: 126, label: 'Members' },
  { icon: 'fas fa-coins', value: 16520320, prefix: '₹', label: 'Total Cost' },
  { icon: 'far fa-clock', value: 5287, label: 'Man Hours' },
  { icon: 'fas fa-hand-holding-heart', value: 18437, label: 'Beneficiaries' },
  { icon: 'fas fa-globe-americas', value: 63996, prefix: '$', label: 'TRF (USD)' },
]

function loadStats() {
  // Simulated backend latency. Replace with: return fetch('/api/impact').then(r => r.json())
  return new Promise((resolve) => setTimeout(() => resolve(STATS), 900))
}

// Tracks viewport visibility — toggles every time the element enters/leaves
// so the entrance animation replays on each pass.
function useInView(threshold = 0.25) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function useCountUp(target, run, duration = 2000) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf
    let start
    const tick = (t) => {
      if (start === undefined) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setN(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, target, duration])
  return n
}

function StatCard({ icon, value, prefix = '', label, run, delay }) {
  const n = useCountUp(value, run)
  return (
    <div
      className="group relative transition-transform duration-300 hover:-translate-y-1.5"
      style={{ transitionDelay: run ? `${delay}ms` : '0ms' }}
    >
      {/* gradient border shell */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.18] to-white/[0.04] p-px transition-colors duration-300 group-hover:from-gold/60 group-hover:to-gold/10">
        <div className="relative overflow-hidden rounded-2xl bg-navy/70 p-6 text-center backdrop-blur-sm">
          {/* faint ghost icon watermark */}
          <i
            className={`${icon} pointer-events-none absolute -right-3 -top-3 text-6xl text-white/[0.05]`}
            aria-hidden="true"
          />
          {/* icon badge with hover glow */}
          <div className="relative mx-auto mb-4 h-14 w-14">
            <span className="absolute inset-0 rounded-2xl bg-gold/50 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-gold-light text-navy shadow-lg shadow-gold/30 transition-transform duration-300 group-hover:scale-110">
              <i className={`${icon} text-xl`} aria-hidden="true" />
            </div>
          </div>
          <div className="bg-gradient-to-b from-white to-white/70 bg-clip-text font-heading text-[22px] font-extrabold leading-none tabular-nums text-transparent sm:text-2xl xl:text-[26px]">
            {prefix}
            {n.toLocaleString('en-IN')}
          </div>
          <div className="mx-auto mt-2.5 h-px w-8 bg-gold/50 transition-all duration-300 group-hover:w-12" />
          <div className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/65">
            {label}
          </div>
        </div>
      </div>
    </div>
  )
}

// Interactive call-to-action: the button physically reacts to the cursor —
// a magnetic pull drifts it toward the pointer and a spotlight tracks the mouse.
function ImpactCTA({ onClick }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    // gentle magnetic pull toward the cursor (clamped)
    el.style.setProperty('--tx', `${(x / r.width - 0.5) * 14}px`)
    el.style.setProperty('--ty', `${(y / r.height - 0.5) * 14}px`)
  }

  const reset = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--tx', '0px')
    el.style.setProperty('--ty', '0px')
  }

  return (
    <div className="group/cta relative inline-flex">
      {/* radiating attention rings (idle) */}
      <span className="cta-ring pointer-events-none absolute inset-0 rounded-full border-2 border-gold/40" />
      <span className="cta-ring-delayed pointer-events-none absolute inset-0 rounded-full border-2 border-gold/40" />
      {/* soft glow halo that brightens on hover */}
      <span className="pointer-events-none absolute -inset-1.5 rounded-full bg-gold/25 blur-lg transition-all duration-300 group-hover/cta:bg-gold/45" />

      <button
        ref={ref}
        type="button"
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="cta-magnetic cta-spotlight relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-gold via-gold-light to-gold px-8 py-4 text-[15px] font-bold text-navy shadow-xl shadow-gold/30 transition-shadow duration-200 hover:shadow-2xl hover:shadow-gold/50 active:scale-95"
      >
        <BarChart3 className="cta-icon relative h-5 w-5" />
        <span className="relative">View Our Project Impact</span>
        <ArrowRight className="cta-arrow relative h-4 w-4" />
      </button>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-b from-white/[0.12] to-white/[0.03] p-px">
      <div className="rounded-2xl bg-navy/70 p-6">
        <div className="mx-auto mb-4 h-14 w-14 animate-pulse rounded-2xl bg-white/10" />
        <div className="mx-auto h-6 w-20 animate-pulse rounded bg-white/10" />
        <div className="mx-auto mt-3 h-3 w-16 animate-pulse rounded bg-white/10" />
      </div>
    </div>
  )
}

export default function Counters() {
  const [status, setStatus] = useState('idle') // idle | loading | done
  const [stats, setStats] = useState([])
  const [sectionRef, inView] = useInView(0.2)

  const handleLoad = async () => {
    setStatus('loading')
    const data = await loadStats()
    setStats(data)
    setStatus('done')
  }

  // toggles the entrance animation once the section enters the viewport
  const reveal = inView ? 'reveal is-visible' : 'reveal'

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-deep py-16"
      aria-label="Our project impact"
    >
      {/* dotted texture + glows */}
      <div className="impact-dots pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[60%] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-3xl" />

      <div className="container-x relative">
        {/* heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span
            className={`${reveal} inline-flex cursor-default items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:scale-105 hover:bg-gold/20 hover:shadow-lg hover:shadow-gold/20`}
          >
            Our Impact
          </span>
          <SplitText
            as="h2"
            text="Creating Measurable Change"
            charDelay={28}
            className="mt-4 font-heading text-3xl font-extrabold text-white md:text-[2.6rem] md:leading-tight"
          />
          <p
            className={`${reveal} mt-3 text-sm leading-relaxed text-white/70 md:text-base`}
            style={{ transitionDelay: inView ? '0.2s' : '0s' }}
          >
            A snapshot of the difference we&apos;ve made together — real projects, real impact across Thane.
          </p>
          <div
            className={`${reveal} mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-gold to-gold-light`}
            style={{ transitionDelay: inView ? '0.3s' : '0s' }}
          />
        </div>

        {/* IDLE: invite the user to load the (backend-fetched) figures */}
        {status === 'idle' && (
          <div className="flex flex-col items-center">
            <div
              className={`${reveal} reveal-pop`}
              style={{ transitionDelay: inView ? '0.4s' : '0s' }}
            >
              <ImpactCTA onClick={handleLoad} />
            </div>
            <p
              className={`${reveal} mt-5 flex items-center gap-1.5 text-xs text-white/50`}
              style={{ transitionDelay: inView ? '0.55s' : '0s' }}
            >
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              Hover to interact &middot; click to load the latest figures
            </p>
          </div>
        )}

        {/* LOADING: skeleton placeholders while fetching */}
        {status === 'loading' && (
          <div className="impact-in">
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-6">
              {STATS.map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/60">
              <Loader2 className="h-4 w-4 animate-spin text-gold" />
              Fetching latest figures…
            </div>
          </div>
        )}

        {/* DONE: animated counters */}
        {status === 'done' && (
          <div className="impact-in">
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-6">
              {stats.map((s, i) => (
                <StatCard key={s.label} {...s} run delay={i * 80} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <a href="#" className="btn-gold">
                View All Our Projects <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
