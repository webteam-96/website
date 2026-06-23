import { motion, useReducedMotion } from 'framer-motion'

// Splits a heading into per-character spans that stagger in (once) when the
// element scrolls into view, powered by Framer Motion. Letters animate with
// transform + opacity only (no blur) for smooth motion, and lift on hover.
const EASE = [0.22, 1, 0.36, 1]

const charVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export default function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  charDelay = 32,
  threshold = 0.2,
  ...rest
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    const Plain = Tag
    return (
      <Plain className={className} {...rest}>
        {text}
      </Plain>
    )
  }

  const MotionTag = motion[Tag] || motion.span
  const words = String(text).split(' ')

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: charDelay / 1000, delayChildren: 0.05 } },
  }

  return (
    <MotionTag
      aria-label={text}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: threshold }}
      {...rest}
    >
      {words.map((word, w) => (
        <span key={w} className="split-word" aria-hidden="true">
          {[...word].map((ch, c) => (
            <motion.span
              key={c}
              className="inline-block"
              variants={charVariants}
              whileHover={{ y: -6, scale: 1.15, color: '#f7a600', transition: { duration: 0.2, ease: EASE } }}
            >
              {ch}
            </motion.span>
          ))}
          {w < words.length - 1 && <span className="split-space"> </span>}
        </span>
      ))}
    </MotionTag>
  )
}
