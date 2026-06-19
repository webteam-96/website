// src/App.tsx
//
// AnimatedRoutes lives INSIDE <BrowserRouter> so it can call useLocation().
// It holds a "displayed" location and renders <Routes location={displayed}>,
// so the live URL can change WITHOUT the destination painting until the reveal.
//
// Flow per navigation:  cover  ->  (swap displayed + scrollTo while hidden)  ->
// reveal  ->  idle.  The route swap happens only while the overlay fully covers
// the viewport, so the new page never flashes.

import { useEffect, useRef, useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  type Location,
} from 'react-router-dom'
import Layout from './components/Layout'
import InteriorLayout from './components/InteriorLayout'
import { YearRangeProvider } from './context/YearRangeContext'
import HomePage from './components/HomePage'
import CalendarPage from './components/CalendarPage'
import ClubFinderPage from './components/ClubFinderPage'
import ClubProfilePage from './components/ClubProfilePage'
import NewslettersPage from './components/NewslettersPage'
import ProjectsPage from './components/ProjectsPage'
import ProjectDetailPage from './components/ProjectDetailPage'
import DirectorsPage from './components/DirectorsPage'
import DirectorProfilePage from './components/DirectorProfilePage'
import StaircaseOverlay, {
  COVER_MS,
  HOLD_MS,
  REVEAL_MS,
  type Stage,
} from './components/StaircaseOverlay'
import SmoothScroll from './components/SmoothScroll'
import { scrollToTopImmediate } from './lib/smoothScroll'

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function AnimatedRoutes() {
  const live = useLocation()
  const [displayed, setDisplayed] = useState<Location>(live)
  const [stage, setStage] = useState<Stage>('idle')

  // All pending timers, so rapid navigation can flush + coalesce cleanly.
  const timers = useRef<number[]>([])
  // The location we are actively animating toward; lets the swap abort if a
  // newer navigation has superseded this run.
  const targetKey = useRef(live.key)

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }

  useEffect(() => {
    // Same location we already show (initial mount / StrictMode replay): no-op.
    if (live.key === displayed.key) return

    // A new navigation arrived. Record it as the target for this run.
    targetKey.current = live.key

    // Reduced motion: swap instantly, no overlay, reset scroll.
    if (prefersReducedMotion()) {
      clearTimers()
      setStage('idle')
      setDisplayed(live)
      scrollToTopImmediate()
      return
    }

    // (Re)start the cover stage. Clearing first coalesces a mid-transition
    // navigation into one fresh timeline instead of stacking them.
    clearTimers()
    setStage('cover')

    // 1) Fully covered: swap the rendered route + reset scroll while hidden.
    const swap = window.setTimeout(() => {
      // Abort if a newer navigation superseded this run.
      if (targetKey.current !== live.key) return
      setDisplayed(live)
      scrollToTopImmediate()
      setStage('reveal')

      // 2) Reveal finished -> back to idle (overlay goes display:none).
      const done = window.setTimeout(() => setStage('idle'), REVEAL_MS)
      timers.current.push(done)
    }, COVER_MS + HOLD_MS)
    timers.current.push(swap)

    // Re-run only on a genuine location change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live.key])

  // Flush timers on unmount (and StrictMode dev unmount/remount).
  useEffect(() => clearTimers, [])

  return (
    <>
      <Routes location={displayed}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          {/* Interior pages share the contact/year strip above their banner. */}
          <Route element={<InteriorLayout />}>
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/district-committee" element={<DirectorsPage />} />
            <Route path="/district-committee/:id" element={<DirectorProfilePage />} />
            <Route path="/club-finder" element={<ClubFinderPage />} />
            <Route path="/clubs/:id" element={<ClubProfilePage />} />
            <Route
              path="/newsletters/governors-letter"
              element={<NewslettersPage variant="governor" />}
            />
            <Route
              path="/newsletters/club-newsletter"
              element={<NewslettersPage variant="club" />}
            />
            <Route path="/club-projects/:category" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      {/* Sibling of <Routes>, outside Layout, above the sticky header + modals. */}
      <StaircaseOverlay stage={stage} />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <YearRangeProvider>
        <SmoothScroll />
        <AnimatedRoutes />
      </YearRangeProvider>
    </BrowserRouter>
  )
}
