import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import RotaryLoader from './components/RotaryLoader/RotaryLoader'
import Home from './pages/Home'
import About from './pages/About'
import Directors from './pages/Directors'
import Directory from './pages/Directory'
import Calendar from './pages/Calendar'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Meetings from './pages/Meetings'
import PastPresidents from './pages/PastPresidents'
import Newsletter from './pages/Newsletter'
import DignitaryProfile from './pages/DignitaryProfile'

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash.replace(/^#/, '') || '/')
  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash.replace(/^#/, '') || '/')
      // instant (not smooth) so the page-enter isn't raced by scroll-behavior
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

function Page({ route }) {
  if (route.startsWith('/dignitary/')) return <DignitaryProfile id={route.slice('/dignitary/'.length)} />
  if (route.startsWith('/project/')) return <ProjectDetail pid={route.slice('/project/'.length)} />
  if (route.startsWith('/projects/')) return <Projects avenue={route.slice('/projects/'.length)} />
  if (route === '/projects') return <Projects />
  if (route === '/about') return <About />
  if (route === '/directors') return <Directors />
  if (route === '/directory') return <Directory />
  if (route === '/calendar') return <Calendar />
  if (route === '/meetings') return <Meetings />
  if (route === '/past-presidents') return <PastPresidents />
  if (route === '/newsletter') return <Newsletter />
  return <Home />
}

export default function App() {
  const route = useHashRoute()
  const reduce = useReducedMotion()

  // Page loader: shows the Rotary loader every time a page opens, then
  // tunnel-dives away to reveal it. ~2s on the first load, ~500ms on every
  // subsequent page change (with a quicker glide so it still settles + spins).
  const [appLoading, setAppLoading] = useState(true)
  const [glideMs, setGlideMs] = useState(1200)
  const firstLoad = useRef(true)
  useEffect(() => {
    const first = firstLoad.current
    firstLoad.current = false
    setGlideMs(first ? 1200 : 300)
    setAppLoading(true)
    const t = setTimeout(() => setAppLoading(false), first ? 2000 : 500)
    return () => clearTimeout(t)
  }, [route])

  // Global magnetic delegator: any element with [data-magnetic] drifts toward
  // the cursor via --tx/--ty (composed into .btn's transform). One listener for
  // the whole app, no per-component JS; disabled under reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const move = (e) => {
      const btn = e.target.closest?.('[data-magnetic]')
      if (!btn) return
      const r = btn.getBoundingClientRect()
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        btn.style.setProperty('--tx', `${((e.clientX - r.left) / r.width - 0.5) * 10}px`)
        btn.style.setProperty('--ty', `${((e.clientY - r.top) / r.height - 0.5) * 10}px`)
      })
    }
    const reset = (e) => {
      const btn = e.target.closest?.('[data-magnetic]')
      if (btn) {
        btn.style.setProperty('--tx', '0px')
        btn.style.setProperty('--ty', '0px')
      }
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseout', reset)
    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseout', reset)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-clip bg-canvas">
      <RotaryLoader active={appLoading} duration={glideMs} minDuration={400} label="Rotary Club of Thane Hills" />
      <Navbar />
      <main>
        {/* enter-only page transition — new page mounts & animates in
            immediately (no exit gap), keyed by route */}
        <motion.div
          key={route}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Page route={route} />
        </motion.div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
