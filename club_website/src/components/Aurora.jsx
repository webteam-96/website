// Lightweight aurora backdrop — slow-drifting blurred colour bands (gold / blue /
// navy) blended over a dark section. Pure CSS (no WebGL), so it's fast and safe
// on every device; sits as an absolute layer behind hero content.
export default function Aurora({ className = '' }) {
  return (
    <div aria-hidden="true" className={`aurora ${className}`}>
      <span className="aurora-band aurora-band-1" />
      <span className="aurora-band aurora-band-2" />
      <span className="aurora-band aurora-band-3" />
    </div>
  )
}
