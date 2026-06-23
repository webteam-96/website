// Rotary wheel mark — official wheel PNG.
export function GearMark({ className = 'h-9 w-9' }) {
  return (
    <img
      src="/images/logo/wheel.png"
      alt=""
      aria-hidden="true"
      className={`object-contain ${className}`}
    />
  )
}

// Official club wordmark, fetched from the club's site
// (rcthanehills.rotaryindia.org → header logo).
export default function Logo() {
  return (
    <a href="#/" className="flex items-center" aria-label="Rotary Club of Thane Hills — Home">
      <img
        src="/images/logo/rcth-wordmark.png"
        alt="Rotary Club of Thane Hills"
        className="h-9 w-auto md:h-10"
      />
    </a>
  )
}
