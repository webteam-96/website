// Decorative dotted-world-map background. The SVG (CC0, public domain) is used
// as a CSS mask so the dots can be tinted any colour via `color`, kept subtle
// with `opacity`. Purely decorative — pointer-events-none, aria-hidden.
const MASK = {
  WebkitMaskImage: 'url(/images/bg/world-dotted.svg)',
  maskImage: 'url(/images/bg/world-dotted.svg)',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
}

export default function WorldMapBg({
  className = '',
  color = '#ffffff',
  opacity = 0.12,
  size = 'cover', // 'cover' fills the band, 'contain' shows the whole map
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        ...MASK,
        WebkitMaskSize: size,
        maskSize: size,
        backgroundColor: color,
        opacity,
      }}
    />
  )
}
