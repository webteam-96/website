import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export interface Crumb {
  label: string
  /** Linked crumb when present; the final crumb is always rendered as plain text. */
  to?: string
}

interface PageBannerProps {
  title: string
  /** Ordered trail, e.g. [{label:'Home',to:'/'}, {label:'Club Finder'}]. */
  breadcrumbs: Crumb[]
  /** Optional supporting line under the title (string or node). */
  subtitle?: ReactNode
  /** Optional right-aligned content (date pill, action buttons, meta tags). */
  rightSlot?: ReactNode
  /** Inner max-width — match the page's content width so the title aligns with it. */
  width?: string
}

/**
 * The single navy banner shared by every interior page. Fixes the title +
 * breadcrumb in one place so pages can't drift into different header styles.
 */
export default function PageBanner({
  title,
  breadcrumbs,
  subtitle,
  rightSlot,
  width = 'max-w-[1440px]',
}: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0a2156] via-[#0c2a66] to-[#0a1f4d] text-white">
      <div className={`mx-auto flex ${width} flex-wrap items-center justify-between gap-x-6 gap-y-4 px-5 py-7 sm:px-8`}>
        <div className="min-w-0">
          <h1 className="text-[26px] font-bold leading-tight tracking-wide sm:text-[30px]">{title}</h1>

          {subtitle && (
            <div className="mt-1.5 max-w-2xl text-sm text-white/75 sm:text-[15px]">{subtitle}</div>
          )}

          <nav aria-label="Breadcrumb" className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1
              return (
                <Fragment key={`${crumb.label}-${i}`}>
                  {i > 0 && <ChevronRight className="h-4 w-4 text-brand-gold" strokeWidth={2.5} />}
                  {isLast || !crumb.to ? (
                    <span className={isLast ? 'font-medium text-brand-gold' : 'text-white/70'}>
                      {crumb.label}
                    </span>
                  ) : (
                    <Link to={crumb.to} className="text-white/70 transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  )}
                </Fragment>
              )
            })}
          </nav>
        </div>

        {rightSlot && <div className="shrink-0">{rightSlot}</div>}
      </div>
    </section>
  )
}
