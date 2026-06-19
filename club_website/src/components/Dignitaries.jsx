import { ArrowRight } from 'lucide-react'
import { GearMark } from './Logo'
import Reveal from './Reveal'
import SplitText from './SplitText'

const leaders = [
  {
    name: 'Francesco Arezzo',
    role: 'RI President',
    year: '2025-26',
    img: 'https://rizones45678.org/API/Documents/WebsiteData/International_President/PRESIDENT160620251053175875643AM.png',
  },
  {
    name: 'Harsh V. Makol',
    role: 'District Governor',
    year: '2025-26',
    img: 'https://rizones45678.org/API/Documents/AGDG/GOVERNOR311020250251473497930PM.png',
  },
  {
    name: 'Rtn. Samir Limaye',
    role: 'Club President',
    year: '2024-25',
    img: 'https://rizones45678.org/API/Documents/directory/SAMIR_LIMAY28092016111836PM.png',
  },
  {
    name: 'Rtn. Nilesh Pitale',
    role: 'Club Secretary',
    year: '2024-25',
    img: 'https://rizones45678.org/API/Documents/directory/ContactPhotoRetouching-IMG_20240421_09351021042024094123AM.jpg',
  },
]

export default function Dignitaries() {
  return (
    <section className="bg-canvas py-14">
      <div className="container-x">
        <div className="mb-12 text-center">
          <SplitText
            as="h2"
            text="Dignitaries & Leaders"
            charDelay={30}
            className="font-heading text-3xl font-extrabold text-navy"
          />
          <Reveal variant="zoom" delay={300} className="mx-auto mt-3 h-1 w-20 rounded-full bg-gold" />
        </div>

        <div className="grid grid-cols-1 gap-6 pt-20 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((l, i) => (
            <Reveal key={l.name} variant="up" delay={i * 120}>
              <div className="group relative rounded-2xl border border-white/15 bg-navy px-6 pb-7 pt-16 text-center shadow-card transition-transform duration-300 hover:-translate-y-1.5">
              {/* lighter inner border frame */}
              <span className="pointer-events-none absolute inset-[5px] rounded-[14px] border border-white/15" />

              {/* photo sits mostly above the card, only the bottom rests on the navy */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[65%]">
                <div className="relative">
                  <img
                    src={l.img}
                    alt={l.name}
                    className="h-28 w-28 rounded-full border-2 border-white object-cover shadow-lg ring-2 ring-gold transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-1 left-0 flex h-9 w-9 items-center justify-center rounded-full bg-navy shadow-md ring-2 ring-white transition-transform duration-700 ease-out group-hover:rotate-[360deg]">
                    <GearMark className="h-6 w-6" />
                  </span>
                </div>
              </div>

              <h3 className="relative font-heading text-lg font-bold text-white">{l.name}</h3>
              <p className="relative mt-1 text-sm font-semibold text-gold">{l.role}</p>
              <a
                href="#"
                className="relative mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-gold transition-all hover:gap-2.5"
              >
                View Profile <ArrowRight className="h-3 w-3" />
              </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
