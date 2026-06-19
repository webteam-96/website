import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { setLenis } from '../lib/smoothScroll'

gsap.registerPlugin(ScrollTrigger)

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Site-wide smooth scrolling. Lenis drives the real window scroll (so sticky/
 * fixed elements and the WebGL galleries keep working) and is wired into GSAP's
 * ticker + ScrollTrigger so scroll-reveal animations stay in sync. Renders nothing.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    setLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)
    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return null
}
