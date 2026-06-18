interface RotaryLogoProps {
  /** Pixel size of the square wheel. */
  size?: number
  className?: string
}

/**
 * Stylised Rotary wheel: a gold cogwheel (24 teeth) with a white field, six
 * gold spokes and a hub keyway. Used in the top nav and the footer.
 */
export default function RotaryLogo({ size = 40, className }: RotaryLogoProps) {
  const cx = 32
  const cy = 32
  const teeth = Array.from({ length: 24 }, (_, i) => i * 15)
  const spokes = Array.from({ length: 6 }, (_, i) => i * 60)

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Rotary International wheel"
    >
      {/* gear teeth */}
      <g fill="#F5A623">
        {teeth.map((angle) => (
          <rect
            key={angle}
            x={cx - 1.7}
            y={1.5}
            width={3.4}
            height={8}
            rx={1}
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        ))}
      </g>
      {/* rim */}
      <circle cx={cx} cy={cy} r={25} fill="#F5A623" />
      {/* white field */}
      <circle cx={cx} cy={cy} r={20.5} fill="#FFFFFF" />
      {/* spokes */}
      <g stroke="#F5A623" strokeWidth={2.4} strokeLinecap="round">
        {spokes.map((angle) => (
          <line
            key={angle}
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - 19}
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        ))}
      </g>
      {/* hub */}
      <circle cx={cx} cy={cy} r={8} fill="#F5A623" />
      {/* keyway */}
      <rect x={cx - 1.3} y={cy - 1.3} width={2.6} height={6.5} rx={1} fill="#FFFFFF" />
      <circle cx={cx} cy={cy} r={2.4} fill="#FFFFFF" />
    </svg>
  )
}
