// Rotary gear wheel mark — gold cog with navy inner gear ring + keyway
export function GearMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {/* outer cog teeth */}
      <g>
        {Array.from({ length: 24 }).map((_, i) => (
          <rect
            key={i}
            x="30.6"
            y="0.5"
            width="2.8"
            height="8"
            rx="0.8"
            fill="#F7A600"
            transform={`rotate(${i * 15} 32 32)`}
          />
        ))}
      </g>
      <circle cx="32" cy="32" r="22" fill="#F7A600" />
      <circle cx="32" cy="32" r="9.5" fill="#fff" />
      {/* inner gear teeth ring */}
      <g>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x="31"
            y="20"
            width="2"
            height="4"
            fill="#F7A600"
            transform={`rotate(${i * 30} 32 32)`}
          />
        ))}
      </g>
      <circle cx="32" cy="32" r="6.5" fill="none" stroke="#F7A600" strokeWidth="3" />
      {/* keyway */}
      <rect x="30.8" y="26" width="2.4" height="6" fill="#F7A600" />
    </svg>
  )
}

export default function Logo({ variant = 'dark' }) {
  const dark = variant === 'dark'
  return (
    <a href="#/" className="flex flex-col leading-none">
      <div className="flex items-start gap-1">
        <span
          className={`font-heading text-[26px] font-extrabold tracking-tight ${
            dark ? 'text-navy' : 'text-white'
          }`}
        >
          Rotary
        </span>
        <GearMark className="-mt-0.5 h-7 w-7" />
      </div>
      <span
        className={`mt-1 text-[12px] font-semibold tracking-wide ${
          dark ? 'text-[#0a52b8]' : 'text-white/85'
        }`}
      >
        Club of Thane Hills
      </span>
      <span
        className={`text-[11px] italic ${dark ? 'text-gray-500' : 'text-white/60'}`}
      >
        Service Above Self
      </span>
    </a>
  )
}
