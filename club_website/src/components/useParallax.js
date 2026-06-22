import { useEffect, useRef } from 'react'

// Dependency-free scroll parallax. Returns a ref; while the element is on screen
// it writes a `--py` custom property (px) you can use in a transform, e.g.
//   <div ref={useParallax(-0.06)} style={{ transform: 'translateY(var(--py,0))' }} />
// rAF-throttled, passive listeners, and a no-op under prefers-reduced-motion.
export default function useParallax(speed = 0.08) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const center = r.top + r.height / 2
      const delta = center - window.innerHeight / 2
      el.style.setProperty('--py', `${(-delta * speed).toFixed(1)}px`)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed])
  return ref
}
