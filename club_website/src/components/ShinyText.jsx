// Eyebrow/label shimmer: a light band sweeps across the text. The base colour is
// inherited (use text-gold / text-white), the sweep colour is configurable.
export default function ShinyText({
  text,
  as: Tag = 'span',
  className = '',
  speed = 4,
  highlight = 'rgba(255,255,255,0.9)',
  ...rest
}) {
  return (
    <Tag
      className={`shiny-text ${className}`}
      style={{ '--shine-speed': `${speed}s`, '--shine-highlight': highlight }}
      {...rest}
    >
      {text}
    </Tag>
  )
}
