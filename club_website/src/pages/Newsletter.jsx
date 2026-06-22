import { FileText, Download, Calendar } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Reveal from '../components/Reveal'
import { newsletters } from '../data/site'

// HILLS ECHOES — the club's monthly e-bulletins. Each card links to the source PDF.
export default function Newsletter() {
  return (
    <>
      <Breadcrumb
        eyebrow="HILLS ECHOES"
        title="Newsletters"
        titleClassName="uppercase tracking-wide"
        trail={[{ label: 'Home', href: '#/' }, { label: 'Newsletters' }]}
      />

      <div className="bg-canvas">
        <div className="container-x py-12">
          <p className="mb-8 flex items-center justify-center gap-2 text-sm text-muted">
            <FileText className="h-4 w-4 text-gold" />
            <span className="font-bold text-navy">{newsletters.length}</span> issues of our monthly e-bulletin
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {newsletters.map((n, i) => (
              <Reveal
                as="a"
                key={n.url}
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="up"
                delay={(i % 6) * 60}
                className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-deep text-gold ring-2 ring-gold/30">
                  <FileText className="h-7 w-7" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-heading text-[15px] font-bold text-navy">{n.title}</h3>
                  <span className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                    <Calendar className="h-3.5 w-3.5 text-gold" /> {n.date}
                  </span>
                </div>
                <Download className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-gold" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
