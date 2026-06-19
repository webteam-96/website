import {
  Building2,
  Clock,
  HandHeart,
  IndianRupee,
  Target,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { snapshot } from '../../data/home'

const iconMap: Record<string, LucideIcon> = {
  Target,
  Building2,
  HandHeart,
  IndianRupee,
  Clock,
  Users,
}

export default function DistrictSnapshotSection() {
  return (
    <section className="bg-pagebg">
      <div className="mx-auto max-w-[1200px] px-5 py-7 sm:px-8 sm:py-8">
        <div className="text-center">
          <h2 className="text-[24px] font-bold text-brand-bluedark sm:text-[28px]">
            DISTRICT SNAPSHOT
          </h2>
          <span className="mx-auto mt-2 block h-1 w-12 rounded-full bg-brand-gold" />
        </div>

        <div className="mt-5 grid grid-cols-2 divide-x divide-divider/60 rounded-2xl bg-white shadow-card ring-1 ring-divider/50 sm:grid-cols-3 lg:grid-cols-6">
          {snapshot.map((stat) => {
            const Icon = iconMap[stat.icon]
            return (
              <div
                key={stat.label}
                className="px-3 py-4 text-center"
              >
                <span
                  className={`mx-auto flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg} ${stat.fg}`}
                >
                  {Icon ? <Icon className="h-5 w-5" strokeWidth={2} /> : null}
                </span>
                <p className="mt-2 text-[20px] font-extrabold text-brand-bluedark">
                  {stat.value}
                </p>
                <p className="mt-1 text-[12.5px] text-muted">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
