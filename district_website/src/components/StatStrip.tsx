import { type ComponentType } from 'react'

type Icon = ComponentType<{ className?: string; strokeWidth?: string | number }>

export interface Stat {
  icon: Icon
  value: string
  label: string
  /** Tailwind background + foreground classes for the icon chip. */
  bg: string
  fg: string
}

interface StatStripProps {
  stats: Stat[]
  /** Match the host page's content width so the cards align with it. */
  width?: string
}

/** Reusable row of white stat cards that sits directly beneath a PageBanner. */
export default function StatStrip({ stats, width = 'max-w-[1440px]' }: StatStripProps) {
  return (
    <div className={`mx-auto ${width} px-5 pt-7 sm:px-8`}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-3.5 rounded-xl bg-white p-4 shadow-card ring-1 ring-divider/40"
          >
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${s.bg} ${s.fg}`}>
              <s.icon className="h-6 w-6" strokeWidth={2} />
            </span>
            <div>
              <p className="text-[22px] font-extrabold leading-none text-brand-bluedark">{s.value}</p>
              <p className="mt-1 text-[13px] font-medium text-muted">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
