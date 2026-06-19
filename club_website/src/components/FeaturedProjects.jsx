import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import SplitText from './SplitText'

const projects = [
  {
    img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    title: 'Education Support',
    desc: 'Books, fees & mentorship for underprivileged students.',
    stat: '250+ Students Supported',
  },
  {
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
    title: 'Health Checkup Camps',
    desc: 'Free medical screenings for rural communities.',
    stat: '12K+ Lives Impacted',
  },
  {
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    title: 'Tree Plantation Drive',
    desc: 'Greening Thane through community plantation.',
    stat: '5K+ Trees Planted',
  },
  {
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80',
    title: 'Women Empowerment',
    desc: 'Skill training & micro-finance for women.',
    stat: '320+ Women Empowered',
  },
]

export default function FeaturedProjects() {
  return (
    <div className="flex flex-col">
      <div className="mb-5 flex items-center justify-between">
        <SplitText
          as="h3"
          text="Featured Projects"
          charDelay={30}
          className="font-heading text-2xl font-bold text-navy"
        />
        <Reveal
          as="a"
          variant="right"
          href="#"
          className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gold-cta transition-all hover:gap-2"
        >
          View All Projects <ArrowRight className="h-3.5 w-3.5" />
        </Reveal>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {projects.map((p, i) => (
          <Reveal as="article" key={p.title} variant="up" delay={i * 110} className="h-full">
            <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card transition-all hover:-translate-y-1.5 hover:shadow-cardHover">
              <div className="h-40 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h4 className="font-heading text-[15px] font-bold leading-snug text-navy">{p.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{p.desc}</p>
                <p className="mt-auto pt-3 text-sm font-extrabold text-gold-cta">{p.stat}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
