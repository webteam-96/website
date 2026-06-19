import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'
import { GearMark } from './Logo'

const quickLinks = [
  { label: 'Home', href: '#/' },
  { label: 'About Us', href: '#/about' },
  { label: 'Projects', href: '#' },
  { label: 'Events', href: '#' },
  { label: 'Newsletters', href: '#' },
  { label: 'Directory', href: '#/directors' },
  { label: 'Contact Us', href: '#' },
]
const socials = [Facebook, Twitter, Instagram, Linkedin, Youtube]

function Column({ title, items }) {
  return (
    <div>
      <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-gold">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i.label}>
            <a href={i.href} className="text-sm text-white/70 transition-colors hover:text-gold">{i.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <GearMark className="h-10 w-10" />
            <div className="leading-none">
              <span className="block font-heading text-base font-extrabold text-white">Rotary</span>
              <span className="text-[10px] uppercase tracking-wide text-white/70">Club of Thane Hills</span>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Service Above Self. We are committed to making a positive difference in the lives of
            people across Thane through fellowship and service.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold hover:text-navy"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <Column title="Quick Links" items={quickLinks} />

        {/* Contact */}
        <div>
          <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-gold">Contact Us</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              Rotary Hall, Gokhale Road, Thane (W), Maharashtra 400602
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              <a href="tel:9820063775" className="hover:text-gold">9820063775</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              <a href="mailto:info@rcthanehills.org" className="hover:text-gold">info@rcthanehills.org</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/60 sm:flex-row">
          <p>© 2025 Rotary Club of Thane Hills. All Rights Reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
