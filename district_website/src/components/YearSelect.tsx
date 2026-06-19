import { ChevronDown } from 'lucide-react'

interface YearSelectProps {
  value: string
  onChange: (value: string) => void
  options?: string[]
}

const DEFAULT_OPTIONS = ['2024-2025', '2025-2026', '2026-2027']

/** Outlined pill dropdown for the Rotary year-range. */
export default function YearSelect({ value, onChange, options = DEFAULT_OPTIONS }: YearSelectProps) {
  return (
    <div className="relative inline-flex">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Select Rotary year"
        className="appearance-none rounded-full border border-white/60 bg-white/55 py-2 pl-4 pr-10 text-[13px] font-semibold text-ink shadow-sm ring-1 ring-inset ring-white/60 backdrop-blur-md transition-colors hover:bg-white/80 focus:border-brand-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-blue"
        strokeWidth={2.25}
      />
    </div>
  )
}
