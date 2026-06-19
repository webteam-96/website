import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealProps {
  children: ReactNode
  /** Distance (px) the block rises from as it reveals. */
  y?: number
  delay?: number
  className?: string
}

/**
 * Fades + lifts its children into view once, when they scroll near the viewport
 * (GSAP ScrollTrigger). No-op under prefers-reduced-motion, where content just
 * renders in its final state.
 */
export default function Reveal({ children, y = 28, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y,
        duration: 0.7,
        delay,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    }, el)

    return () => ctx.revert()
  }, [y, delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
