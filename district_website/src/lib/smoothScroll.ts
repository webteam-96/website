import type Lenis from 'lenis'

// Single Lenis instance shared across the app so route transitions can reset
// the scroll position through Lenis instead of the native scroller.
let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null): void {
  lenis = instance
}

/** Jump to the top with no animation (used while the route overlay is covering). */
export function scrollToTopImmediate(): void {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else if (typeof window !== 'undefined') window.scrollTo(0, 0)
}

/** Pause scrolling (e.g. while a modal/lightbox is open). */
export function stopScroll(): void {
  lenis?.stop()
}

/** Resume scrolling after a stopScroll(). */
export function startScroll(): void {
  lenis?.start()
}
