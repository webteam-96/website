import { motion, useReducedMotion } from 'framer-motion'

// Scroll-reveal wrapper, powered by Framer Motion. Reveals once when it scrolls
// into view (no replay-on-scroll), animating only GPU-friendly transform +
// opacity for smooth motion. Keeps the original API: as / variant / delay (ms) /
// threshold / className.
const VARIANTS = {
  up: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -28 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -42 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 42 }, show: { opacity: 1, x: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
}

// house "emphasized" glide
const EASE = [0.22, 1, 0.36, 1]

export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  threshold = 0.15,
  className = '',
  children,
  ...rest
}) {
  const reduce = useReducedMotion()

  // Reduced motion: render the element as-is, no entrance animation.
  if (reduce) {
    const Plain = Tag
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    )
  }

  const MotionTag = motion[Tag] || motion.div

  return (
    <MotionTag
      className={className}
      variants={VARIANTS[variant] || VARIANTS.up}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: threshold }}
      transition={{ duration: 0.6, ease: EASE, delay: delay / 1000 }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
