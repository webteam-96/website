import { useEffect, useRef, useState } from 'react'

// Scroll-reveal wrapper. Re-triggers EVERY time the element enters the viewport
// (it also animates back out when it leaves), so the motion replays on each pass.
export default function Reveal({
  as: Tag = 'div',
  variant = 'up', // up | down | left | right | zoom | fade
  delay = 0,
  threshold = 0.15,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setShown(entry.isIntersecting),
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${shown ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
