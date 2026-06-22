import { Award } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Avatar from '../components/Avatar'
import Reveal from '../components/Reveal'
import SpotlightCard from '../components/SpotlightCard'
import CountUp from '../components/CountUp'

// Roll of honour — every past president of RC Thane Hills, newest first,
// sourced from the club's official site (rcthanehills.rotaryindia.org).
const presidents = [
  { name: 'Harshad Divekar', year: '2024-2025' },
  { name: 'Govind Khetan', year: '2023-2024' },
  { name: 'Jayaram Mendon', year: '2022-2023' },
  { name: 'Varsha Likhite', year: '2021-2022' },
  { name: 'Bijay Yadav', year: '2020-2021' },
  { name: 'Dr Radhika Bondve', year: '2019-2020' },
  { name: 'Nilesh Puranik', year: '2018-2019' },
  { name: 'Bhavik Mehta', year: '2017-2018' },
  { name: 'Anindya Dasgupta', year: '2016-2017' },
  { name: 'Shirish Songadkar', year: '2015-2016' },
  { name: 'Nilesh Likhite', year: '2014-2015' },
  { name: 'Atul Bhide', year: '2013-2014' },
  { name: 'S N Ravi Iyer', year: '2012-2013' },
  { name: 'Mahesh Madkholkar', year: '2011-2012' },
  { name: 'Vijay Shetty', year: '2010-2011' },
  { name: 'Rajeev Tipnis', year: '2009-2010' },
  { name: 'Late Sharath Ail', year: '2008-2009' },
  { name: 'Rajesh Salaskar', year: '2007-2008' },
  { name: 'Dr Ashes Ganguly', year: '2006-2007' },
  { name: 'Sucheta Rege', year: '2005-2006' },
  { name: 'N D Joseph', year: '2004-2005' },
  { name: 'Dr. Vijay Kulkarni', year: '2003-2004' },
  { name: 'Vikram Mane', year: '2002-2003' },
  { name: 'Dr Raju Subramanyam', year: '2001-2002' },
  { name: 'K S Rangnathan', year: '2000-2001' },
  { name: 'Chandrasekharan V', year: '1999-2000' },
  { name: 'Late Suresh Nayak', year: '1998-1999' },
  { name: 'Late Balwant Sachdev', year: '1997-1998' },
  { name: 'Late Ramesh Raman', year: '1996-1997' },
  { name: 'Chandu Rathi', year: '1995-1996' },
  { name: 'Dr Suhas Kulkarni', year: '1994-1995' },
  { name: 'Narayan Rathi', year: '1993-1994' },
  { name: 'Madhu Reddy', year: '1992-1993' },
  { name: 'Late Vasant Zalani', year: '1991-1992' },
]

export default function PastPresidents() {
  return (
    <>
      <Breadcrumb
        eyebrow="Roll of Honour"
        title="Past Presidents"
        titleClassName="uppercase tracking-wide"
        trail={[{ label: 'Home', href: '#/' }, { label: 'Past Presidents' }]}
      />

      <div className="bg-canvas">
        <div className="container-x py-12">
          <p className="mb-8 flex items-center justify-center gap-2 text-sm text-muted">
            <Award className="h-4 w-4 text-gold" />
            Celebrating <CountUp to={presidents.length} className="font-bold text-navy" /> years of leadership since 1991
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {presidents.map((p, i) => (
              <Reveal key={p.year} variant="up" delay={(i % 8) * 50} className="h-full">
                <SpotlightCard
                  as="article"
                  className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover"
                >
                {/* gold year ribbon */}
                <span className="absolute right-0 top-4 rounded-l-full bg-gold px-3 py-1 text-[11px] font-bold text-navy shadow-sm">
                  {p.year}
                </span>

                <Avatar name={p.name} className="h-20 w-20 text-xl" />
                <h3 className="mt-4 font-heading text-base font-bold leading-tight text-navy">{p.name}</h3>
                <span className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-gold-cta">
                  <Award className="h-3.5 w-3.5" /> President
                </span>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
