import type { SVGProps } from 'react'

/**
 * Two interlocking rings — the Anniversary section icon. Uses currentColor so it
 * can be tinted via `style={{ color }}` like the lucide icons around it.
 */
export function RingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="9" cy="14.5" r="5.3" />
      <circle cx="15" cy="9.5" r="5.3" />
    </svg>
  )
}

/** A calendar with a star in the body — the Events section icon. */
export function CalendarStarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9.5h18" />
      <path d="M8 2.5v3" />
      <path d="M16 2.5v3" />
      <path
        d="M12 11.6 12.73 13.6 14.9 13.66 13.18 14.99 13.79 17.1 12 15.85 10.21 17.1 10.82 14.99 9.1 13.66 11.27 13.6 Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}
