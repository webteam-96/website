import { useRef } from 'react'

// Card wrapper with a soft gold spotlight that follows the cursor across the
// surface. The glow is a pointer-events-none overlay, so links/buttons inside
// keep working. Render as any tag via `as` (e.g. as="article").
export default function SpotlightCard({
  as: Tag = 'div',
  className = '',
  spotlightColor = 'rgba(247, 166, 0, 0.16)',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const raf = useRef(0)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty('--spot-x', `${x}px`)
      el.style.setProperty('--spot-y', `${y}px`)
    })
  }

  // recenter the glow on exit so it never pops in stale on re-entry
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--spot-x', '50%')
    el.style.setProperty('--spot-y', '50%')
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`spotlight-card ${className}`}
      style={{ '--spot-color': spotlightColor }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
