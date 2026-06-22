import { Calendar } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Reveal from '../components/Reveal'
import SpotlightCard from '../components/SpotlightCard'

// Club meetings & events, sourced from the club's official site
// (rcthanehills.rotaryindia.org → Club Events). Each entry keeps the real
// title, date, write-up and event photograph.
const RAW = [
  { title: 'Club Meeting', date: '04 Jun 2026', desc: 'Review and planning for fund raiser musical event.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album153959/22_JAN_06062026085329PM.jpeg' },
  { title: 'Club Meeting - 47', date: '28 May 2026', desc: 'Panel discussion featuring partners of women Rotary members.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album149441/RCTH_PARTNERS_PANEL_DISCUSSION431052026041826PM.jpeg' },
  { title: '11th BOD Meeting', date: '27 May 2026', desc: 'Eleventh Board of Directors meeting of the year.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album153952/BOD06062026084544PM.jpeg' },
  { title: 'Charter Day Celebration', date: '23 May 2026', desc: '36th Charter Day of RC Thane Hills.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album145966/CHARTER226052026105223AM.jpeg' },
  { title: 'Club Meeting with Recognitions', date: '14 May 2026', desc: 'Recognition event honouring members for their contributions.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album142833/CLUB_MEETING_14TH_MAY_217052026051035PM.jpeg' },
  { title: 'Rotary Action Group D3142 Launch', date: '08 May 2026', desc: 'Initiative to establish a new action group chapter.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album142837/RAG_MHI_217052026051810PM.jpg' },
  { title: 'Club Meeting & Guest Speaker', date: '07 May 2026', desc: 'Team IDBI provided insights about preparing a will.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album142832/IDBI_TEAM_117052026050841PM.jpeg' },
  { title: 'Club Meeting & New Member Induction', date: '30 Apr 2026', desc: 'Induction ceremony followed by a Salsa workshop.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album142828/SALSA_WORSHOP_217052026045910PM.JPG' },
  { title: 'Vocational Excellence Awards', date: '25 Apr 2026', desc: 'Recognising professional achievements across sectors.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album142817/VEA_217052026045306PM.jpg' },
  { title: 'Festivals of India Celebration', date: '18 Apr 2026', desc: 'Celebrating festivals of India with music, dance and food.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album142815/TAMIL_NEW_YEAR_BAISAKHI_217052026045033PM.JPG' },
  { title: '10th BOD Meeting', date: '16 Apr 2026', desc: 'Tenth Board of Directors meeting of the year.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album153950/IMG20250717WA007906062026084055PM.jpg' },
  { title: 'Club Meeting with Fellowship', date: '09 Apr 2026', desc: 'Master Chef competition event with fellowship.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album142812/MASTER_CHEF_317052026044305PM.JPG' },
  { title: 'Club Meeting', date: '02 Apr 2026', desc: 'Panel discussion on the journey of RC Thane Hills over 3 decades.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album142801/2nd_APRIL_CLUB_MEETING17052026042550PM.jpeg' },
  { title: 'Regular Meeting with Guest Speaker', date: '26 Mar 2026', desc: 'Municipal work insights from Dr. Khushboo Taori.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album122034/WhatsApp_Image_20260331_at_15.09.0701042026035646PM.jpeg' },
  { title: 'Festival Celebration', date: '21 Mar 2026', desc: 'Hillers celebrated Gudi Padwa along with Ugadi in style.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album122031/WhatsApp_Image_20260322_at_10.21.45_101042026035453PM.jpeg' },
  { title: '9th BOD Meeting', date: '16 Mar 2026', desc: 'Ninth Board of Directors meeting, held online.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album124625/WhatsApp_Image_20260126_at_8.17.43_PM05042026103646PM.jpeg' },
  { title: 'Regular Club Meeting', date: '12 Mar 2026', desc: 'Joint session with the Rotaract Club featuring youth engagement.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album122028/WhatsApp_Image_20260312_at_22.32.5001042026035119PM.jpeg' },
  { title: "Women's Day Celebration", date: '08 Mar 2026', desc: 'Recognition of women leaders from partner organisations.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album122018/WhatsApp_Image_20260401_at_15.29.25_101042026034258PM.jpeg' },
  { title: 'Holi Celebration', date: '03 Mar 2026', desc: 'Celebrating the festival of colours along with Hillers.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album122019/WhatsApp_Image_20260330_at_16.59.01_101042026034423PM.jpeg' },
  { title: 'Club Assembly', date: '26 Feb 2026', desc: 'Regular club assembly gathering.', img: 'https://rizones45678.org/API/Documents/gallery/Group1/Album111124/WhatsApp_Image_20260226_at_11.47.03_PM05032026092932PM.jpeg' },
]

const meetings = RAW.map((m) => {
  const [day, mon] = m.date.split(' ')
  return { ...m, day, mon }
})

export default function Meetings() {
  return (
    <>
      <Breadcrumb
        eyebrow="Fellowship & Programs"
        title="Meetings"
        titleClassName="uppercase tracking-wide"
        trail={[{ label: 'Home', href: '#/' }, { label: 'Meetings' }]}
      />

      <div className="bg-canvas">
        <div className="container-x py-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {meetings.map((m, i) => (
              <Reveal key={m.title + m.date} variant="up" delay={(i % 6) * 70} className="h-full">
                <SpotlightCard
                  as="article"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cardHover"
                >
                <div className="relative h-48 overflow-hidden bg-navy/5">
                  <img
                    src={m.img}
                    alt={m.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute left-3 top-3 flex flex-col items-center rounded-lg bg-white px-2.5 py-1.5 text-center shadow-md">
                    <span className="font-heading text-base font-extrabold leading-none text-navy">{m.day}</span>
                    <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-gold">{m.mon}</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-heading text-[15px] font-bold leading-snug text-navy">{m.title}</h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">{m.desc}</p>
                  <span className="mt-auto flex items-center gap-1.5 pt-4 text-[11px] font-medium text-muted">
                    <Calendar className="h-3.5 w-3.5 text-gold" /> {m.date}
                  </span>
                </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
