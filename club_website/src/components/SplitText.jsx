import { useEffect, useRef, useState } from 'react'

// Splits a heading into per-character spans that stagger in when the element
// enters the viewport (re-triggers every pass). Each letter is also interactive
// on hover. Words are kept intact so text still wraps naturally.
export default function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  charDelay = 32,
  threshold = 0.2,
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

  const words = String(text).split(' ')
  let idx = -1

  return (
    <Tag
      ref={ref}
      aria-label={text}
      className={`split ${shown ? 'is-visible' : ''} ${className}`}
      {...rest}
    >
      {words.map((word, w) => (
        <span key={w} className="split-word" aria-hidden="true">
          {[...word].map((ch, c) => {
            idx += 1
            return (
              <span
                key={c}
                className="split-char"
                style={{ transitionDelay: shown ? `${idx * charDelay}ms` : '0ms' }}
              >
                {ch}
              </span>
            )
          })}
          {w < words.length - 1 && <span className="split-space"> </span>}
        </span>
      ))}
    </Tag>
  )
}
