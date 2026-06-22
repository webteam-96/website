import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Directors from './pages/Directors'
import Directory from './pages/Directory'
import Calendar from './pages/Calendar'
import Projects from './pages/Projects'
import Meetings from './pages/Meetings'
import PastPresidents from './pages/PastPresidents'
import Newsletter from './pages/Newsletter'

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

export default function App() {
  const route = useHashRoute()

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
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main>
        <div key={route} className="route-enter">
          {route === '/about' ? (
            <About />
          ) : route === '/directors' ? (
            <Directors />
          ) : route === '/directory' ? (
            <Directory />
          ) : route === '/calendar' ? (
            <Calendar />
          ) : route === '/projects' ? (
            <Projects />
          ) : route === '/meetings' ? (
            <Meetings />
          ) : route === '/past-presidents' ? (
            <PastPresidents />
          ) : route === '/newsletter' ? (
            <Newsletter />
          ) : (
            <Home />
          )}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
