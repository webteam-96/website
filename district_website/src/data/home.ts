// Content for the Home / landing dashboard. Only real data that exists on the
// official District 3170 site (rid3170.rotaryindia.org). No fabricated stats.

/** Slides for the home banner carousel (70% column). Plain photos. */
export interface HeroSlide {
  image: string
  alt: string
}
// Live banners + ads pulled from the official District 3170 site
// (rid3170.rotaryindia.org → rotaryindia.org media server).
const RID_MEDIA = 'https://rotaryindia.org/Documents/WebsiteData/Group31685'
const ridBanner = (f: string) => `${RID_MEDIA}/BANNERS/${f}.png`
const ridAd = (f: string) => `${RID_MEDIA}/ADERTISEMENT/${f}.png`

export const heroSlides: HeroSlide[] = [
  { image: ridBanner('Banners040820250633584413105PM'), alt: 'Rotary District 3170 banner' },
  { image: ridBanner('Banners040820250640083196142PM'), alt: 'Rotary District 3170 banner' },
  { image: ridBanner('Banners040820250644023210571PM'), alt: 'Rotary District 3170 banner' },
  { image: ridBanner('Banners040820250650282154104PM'), alt: 'Rotary District 3170 banner' },
  { image: ridBanner('Banners040820250653546220477PM'), alt: 'Rotary District 3170 banner' },
  { image: ridBanner('Banners040820250656149966494PM'), alt: 'Rotary District 3170 banner' },
  { image: ridBanner('Banners280720251109535550444PM'), alt: 'Rotary District 3170 banner' },
]

/** Advertisement slides for the slot beside the carousel (30% column). */
export interface HeroAd {
  image: string
  alt: string
  href: string
}
export const heroAds: HeroAd[] = [
  { image: ridAd('ADERTISEMENT040820251204483957463AM'), alt: 'Advertisement', href: 'https://rid3170.rotaryindia.org/' },
  { image: ridAd('ADERTISEMENT241220251037112948641PM'), alt: 'Advertisement', href: 'https://rid3170.rotaryindia.org/' },
  { image: ridAd('ADERTISEMENT241220251039339160784PM'), alt: 'Advertisement', href: 'https://rid3170.rotaryindia.org/' },
]

export interface QuickLink {
  /** lucide icon name to render */
  icon: string
  label: string
  sub: string
  to: string
  /** tailwind text color class for the icon */
  fg: string
  bg: string
}
export const quickLinks: QuickLink[] = [
  { icon: 'CalendarDays', label: 'Calendar', sub: 'View full calendar', to: '/calendar', fg: 'text-brand-blue', bg: 'bg-brand-blue/10' },
  { icon: 'CalendarClock', label: 'Upcoming Events', sub: 'Stay updated', to: '/calendar', fg: 'text-amber-600', bg: 'bg-amber-500/15' },
  { icon: 'Mail', label: 'Newsletters', sub: 'Read latest newsletters', to: '/newsletters/club-newsletter', fg: 'text-rose-500', bg: 'bg-rose-500/10' },
  { icon: 'HeartHandshake', label: 'District Activities', sub: 'Programs & service', to: '/club-projects/community-service', fg: 'text-emerald-600', bg: 'bg-emerald-500/10' },
  { icon: 'FileText', label: 'Monthly Letter', sub: 'From the Governor', to: '/newsletters/governors-letter', fg: 'text-violet-600', bg: 'bg-violet-500/10' },
  { icon: 'Images', label: 'Photo Gallery', sub: 'Moments in action', to: '/club-finder', fg: 'text-sky-600', bg: 'bg-sky-500/10' },
]

export interface Dignitary {
  name: string
  role: string
  term: string
  photo: string
  /** Home Rotary club — shown for the District Governor. */
  club?: string
}
export const dignitaries: Dignitary[] = [
  { name: 'Francesco Arezzo', role: 'President', term: 'Rotary International 2025-26', photo: 'https://rotaryindia.org/Documents/WebsiteData/International_President/PRESIDENT160620251053175875643AM.png' },
  { name: 'Arun Daniel Bhandare', role: 'District Governor', term: '2025-26', club: 'Ichalkaranji Executive, Mah.', photo: 'https://rotaryindia.org/Documents/directory/F5C83540-FE0C-4F37-B7C0-210228483FC324052024010524.jpeg' },
]

export const homeContact = {
  email: 'dgarun.rid3170@gmail.com',
  phone: '9823120618',
}
