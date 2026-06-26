import { Link } from 'react-router-dom'
import {
  CalendarClock,
  CalendarDays,
  FileText,
  HeartHandshake,
  Images,
  Mail,
  type LucideIcon,
} from 'lucide-react'
import { quickLinks } from '../../data/home'

const iconMap: Record<string, LucideIcon> = {
  CalendarDays,
  CalendarClock,
  Mail,
  HeartHandshake,
  FileText,
  Images,
}

/**
 * QuickLinksSection — navigation shortcuts to real district pages
 * (calendar, newsletters, projects, governor's letter, gallery).
 */
export default function QuickLinksSection() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="text-center">
          <h2 className="text-[24px] font-bold text-brand-bluedark sm:text-[28px]">Quick Links</h2>
          <span className="mx-auto mt-2 block h-1 w-12 rounded-full bg-brand-gold" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {quickLinks.map((link) => {
            const Icon = iconMap[link.icon]
            return (
              <Link
                key={link.label}
                to={link.to}
                className="group flex flex-col items-center rounded-2xl bg-white p-5 text-center shadow-card ring-1 ring-divider/50 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${link.bg}`}
                >
                  {Icon ? <Icon className={`h-6 w-6 ${link.fg}`} strokeWidth={2} /> : null}
                </span>
                <span className="mt-3 text-[14px] font-bold text-brand-bluedark">{link.label}</span>
                <span className="mt-0.5 text-[12px] text-muted">{link.sub}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { QuickLinksSection }
