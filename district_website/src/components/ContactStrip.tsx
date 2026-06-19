import { Mail, Phone } from 'lucide-react'
import YearSelect from './YearSelect'

interface ContactStripProps {
  /** Calendar-specific year selector; omitted on pages that don't need it. */
  yearRange?: string
  onYearChange?: (value: string) => void
}

const EMAIL = 'dgarun.rid3170@gmail.com'
const PHONE = '9823120618'

export default function ContactStrip({ yearRange, onYearChange }: ContactStripProps) {
  return (
    <div className="relative border-b border-white/45 bg-gradient-to-b from-white/55 to-white/25 shadow-[0_10px_30px_-14px_rgba(13,38,92,0.55)] backdrop-blur-xl backdrop-saturate-150">
      {/* hairline sheen along the top edge sells the glass */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70" />
      <div className="relative mx-auto flex max-w-[1720px] flex-wrap items-center justify-end gap-x-2.5 gap-y-2 px-5 py-2.5 sm:px-8">
        <a
          href={`mailto:${EMAIL}`}
          className="flex items-center gap-2 rounded-full bg-white/55 px-3.5 py-1.5 text-[13px] font-medium text-ink/80 shadow-sm ring-1 ring-inset ring-white/60 backdrop-blur-md transition hover:bg-white/80 hover:text-brand-blue"
        >
          <Mail className="h-4 w-4 text-brand-blue" strokeWidth={2} />
          <span className="hidden sm:inline">{EMAIL}</span>
        </a>
        <a
          href={`tel:${PHONE}`}
          className="flex items-center gap-2 rounded-full bg-white/55 px-3.5 py-1.5 text-[13px] font-medium text-ink/80 shadow-sm ring-1 ring-inset ring-white/60 backdrop-blur-md transition hover:bg-white/80 hover:text-brand-blue"
        >
          <Phone className="h-4 w-4 text-brand-blue" strokeWidth={2} />
          {PHONE}
        </a>
        {yearRange !== undefined && onYearChange && (
          <YearSelect value={yearRange} onChange={onYearChange} />
        )}
      </div>
    </div>
  )
}
