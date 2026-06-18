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
    <div className="border-b border-divider bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-end gap-x-6 gap-y-2 px-5 py-2.5 sm:px-8">
        <a
          href={`mailto:${EMAIL}`}
          className="flex items-center gap-2 text-[13px] font-medium text-ink/75 transition-colors hover:text-brand-blue"
        >
          <Mail className="h-4 w-4 text-brand-blue" strokeWidth={2} />
          <span className="hidden sm:inline">{EMAIL}</span>
        </a>
        <a
          href={`tel:${PHONE}`}
          className="flex items-center gap-2 text-[13px] font-medium text-ink/75 transition-colors hover:text-brand-blue"
        >
          <Phone className="h-4 w-4 text-brand-blue" strokeWidth={2} />
          {PHONE}
        </a>
        {yearRange !== undefined && onYearChange && (
          <>
            <span className="hidden h-5 w-px bg-divider sm:inline-block" />
            <YearSelect value={yearRange} onChange={onYearChange} />
          </>
        )}
      </div>
    </div>
  )
}
