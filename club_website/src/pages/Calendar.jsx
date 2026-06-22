import { Cake, Heart, CalendarDays } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Avatar from '../components/Avatar'
import Reveal from '../components/Reveal'
import SpotlightCard from '../components/SpotlightCard'

// Special dates for the current Rotary month, sourced from the club's official
// calendar (rcthanehills.rotaryindia.org → AllSpecialDates).
const MONTH = 'June 2026'

const birthdays = [
  { name: 'Yashwant Duduskar', date: 'June 2' },
  { name: 'Yamini Kundetkar', date: 'June 2' },
  { name: 'Bhawana Jadhav', date: 'June 10' },
  { name: 'Dr. Amit Vijay Karkhanis', date: 'June 14' },
  { name: 'Rajeev Tipnis', date: 'June 24' },
  { name: 'Anup Surve', date: 'June 25' },
  { name: 'Rohit Sharma', date: 'June 25' },
  { name: 'Ranish Jaiswal', date: 'June 30' },
  { name: 'Dr. Vijay Shamrao Kulkarni', date: 'June 30' },
]

const anniversaries = [
  { name: 'Dayal Dodeja', date: 'June 1' },
  { name: 'Dr. Vijay Shamrao Kulkarni', date: 'June 8' },
  { name: 'Madhukar Abaji Chavan', date: 'June 15' },
  { name: 'V. Chandrasekharan', date: 'June 19' },
  { name: 'Padmanabhan Sundaresan', date: 'June 23' },
  { name: 'Uday Sudhir Pilani', date: 'June 27' },
]

function DateCard({ name, date, accent, i }) {
  return (
    <Reveal variant="up" delay={(i % 8) * 60} className="h-full">
      <SpotlightCard
        as="article"
        className="flex h-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover"
      >
        <Avatar name={name} className="h-12 w-12 text-sm" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-heading text-[15px] font-bold text-navy">{name}</h3>
          <span
            className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${accent}`}
          >
            <CalendarDays className="h-3.5 w-3.5" /> {date}
          </span>
        </div>
      </SpotlightCard>
    </Reveal>
  )
}

function Section({ icon: Icon, title, items, accent, iconWrap }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md ${iconWrap}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-heading text-xl font-extrabold text-navy">{title}</h2>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {items.length} this month
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <DateCard key={it.name + it.date} {...it} accent={accent} i={i} />
        ))}
      </div>
    </div>
  )
}

export default function Calendar() {
  return (
    <>
      <Breadcrumb
        eyebrow={`Special Dates · ${MONTH}`}
        title="Calendar"
        titleClassName="uppercase tracking-wide"
        trail={[{ label: 'Home', href: '#/' }, { label: 'Calendar' }]}
      />

      <div className="bg-canvas">
        <div className="container-x space-y-12 py-12">
          <Section
            icon={Cake}
            title="Birthdays"
            items={birthdays}
            iconWrap="bg-gold"
            accent="bg-gold/10 text-gold-cta"
          />
          <Section
            icon={Heart}
            title="Wedding Anniversaries"
            items={anniversaries}
            iconWrap="bg-rose-500"
            accent="bg-rose-50 text-rose-500"
          />
        </div>
      </div>
    </>
  )
}
