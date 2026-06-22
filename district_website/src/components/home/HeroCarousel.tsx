import { useCallback, useEffect, useState, type TransitionEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export interface CarouselSlide {
  image: string
  alt: string
  /** When set, the slide becomes a clickable link (e.g. an ad creative). */
  href?: string
}

interface HeroCarouselProps {
  slides: CarouselSlide[]
  /** ms between auto-advances; 0 disables autoplay. */
  autoplayMs?: number
  /** show prev/next arrows */
  arrows?: boolean
  /** optional corner label, e.g. "Advertisement" */
  badge?: string
  /** wrapper sizing classes (height) */
  className?: string
  /** accessible region label */
  label?: string
  /** how slide images fill the box: 'cover' (crop) or 'contain' (centred, whole image) */
  fit?: 'cover' | 'contain'
}

/**
 * Auto-rotating image carousel for both the main hero banner and the ad slot.
 *
 * Infinite loop: the track is `[lastClone, ...slides, firstClone]`. Wrapping
 * past either end animates into a clone (seamless), then on transition end it
 * snaps — without animation — back to the matching real slide, so there's no
 * visible "rewind" from the last slide to the first.
 */
export default function HeroCarousel({
  slides,
  autoplayMs = 5000,
  arrows = false,
  badge,
  className = '',
  label,
  fit = 'cover',
}: HeroCarouselProps) {
  const count = slides.length
  const loop = count > 1
  const items = loop ? [slides[count - 1], ...slides, slides[0]] : slides

  // `pos` indexes `items`; real slide i lives at pos i+1 when looping.
  const [pos, setPos] = useState(loop ? 1 : 0)
  const [anim, setAnim] = useState(true)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setAnim(true)
    setPos((p) => p + 1)
  }, [])
  const prev = useCallback(() => {
    setAnim(true)
    setPos((p) => p - 1)
  }, [])
  const goToReal = useCallback(
    (realIndex: number) => {
      setAnim(true)
      setPos(loop ? realIndex + 1 : realIndex)
    },
    [loop],
  )

  // Autoplay forward.
  useEffect(() => {
    if (paused || !loop || !autoplayMs || prefersReducedMotion()) return
    const id = window.setInterval(next, autoplayMs)
    return () => window.clearInterval(id)
  }, [paused, loop, autoplayMs, next])

  // When a wrap into a clone finishes, jump (no transition) to the real slide.
  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (!loop || e.target !== e.currentTarget) return
    if (pos === count + 1) {
      setAnim(false)
      setPos(1)
    } else if (pos === 0) {
      setAnim(false)
      setPos(count)
    }
  }

  // Re-enable the transition on the frame after a no-animation snap.
  useEffect(() => {
    if (anim) return
    let raf2 = 0
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => setAnim(true))
    })
    return () => {
      window.cancelAnimationFrame(raf1)
      window.cancelAnimationFrame(raf2)
    }
  }, [anim])

  const realIndex = loop ? (pos - 1 + count) % count : pos

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-divider/40 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div
        className={`flex h-full ${anim ? 'transition-transform duration-700 ease-out' : ''}`}
        style={{ transform: `translateX(-${pos * 100}%)` }}
        onTransitionEnd={onTransitionEnd}
      >
        {items.map((slide, i) => {
          const img = (
            <img
              src={slide.image}
              alt={slide.alt}
              loading={i <= 1 ? 'eager' : 'lazy'}
              className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
            />
          )
          return slide.href ? (
            <a key={i} href={slide.href} aria-label={slide.alt} className="h-full w-full shrink-0">
              {img}
            </a>
          ) : (
            <div key={i} className="h-full w-full shrink-0">
              {img}
            </div>
          )
        })}
      </div>

      {badge && (
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/90">
          {badge}
        </span>
      )}

      {arrows && loop && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-brand-bluedark shadow transition hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-brand-bluedark shadow transition hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </>
      )}

      {loop && (
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToReal(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === realIndex}
              className={`h-2.5 rounded-full transition-all ${
                i === realIndex ? 'w-6 bg-brand-gold' : 'w-2.5 bg-brand-bluedark/25 hover:bg-brand-bluedark/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
