import { useEffect, useRef, useState } from 'react'

// Premium "scroll reveal" for body copy and sub-headings: each word fades up
// and de-blurs in a soft stagger when the block enters the viewport. Re-triggers
// every pass, matching the house Reveal/SplitText behaviour. No dependencies.
export default function ScrollReveal({
  text,
  as: Tag = 'p',
  className = '',
  wordDelay = 34,
  threshold = 0.2,
  ...rest
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => setShown(entry.isIntersecting), {
      threshold,
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  const words = String(text).split(' ')

  return (
    <Tag ref={ref} aria-label={text} className={`sr ${shown ? 'is-visible' : ''} ${className}`} {...rest}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="sr-word"
          style={{ transitionDelay: shown ? `${Math.min(Math.pow(i, 0.82) * wordDelay, 460)}ms` : '0ms' }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
