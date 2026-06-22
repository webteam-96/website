import { useRef } from 'react'

// 3D tilt-on-hover wrapper (best on image blocks). The element rotates toward
// the cursor and an optional glare highlight tracks the pointer. Pure transforms
// + CSS vars, no dependencies. Keep `max` small (8–12deg) for a tasteful feel.
export default function TiltedCard({
  as: Tag = 'div',
  className = '',
  max = 9,
  glare = true,
  children,
  ...rest
}) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rx = (0.5 - py) * max * 2
    const ry = (px - 0.5) * max * 2
    el.style.setProperty('--rx', `${rx}deg`)
    el.style.setProperty('--ry', `${ry}deg`)
    el.style.setProperty('--gx', `${px * 100}%`)
    el.style.setProperty('--gy', `${py * 100}%`)
    // drop-shadow leans opposite the tilt for a light-source feel
    el.style.setProperty('--sx', `${ry * -1.4}px`)
    el.style.setProperty('--sy', `${rx * 1.4 + 10}px`)
    el.dataset.tilt = 'on'
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--sx', '0px')
    el.style.setProperty('--sy', '10px')
    el.dataset.tilt = 'off'
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilted-card ${glare ? 'tilted-glare' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
