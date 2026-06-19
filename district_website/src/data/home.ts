import { projects } from './projects'
import { clubs } from './clubs'

// Content for the Home / landing dashboard. Single source so every section
// stays consistent. Photos use Pexels (Indian portraits) + picsum placeholders.

const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400`
const pic = (seed: string) => `https://picsum.photos/seed/${seed}/600/420`

export interface HeroStat {
  value: string
  label: string
}
export const heroStats: HeroStat[] = [
  { value: '128+', label: 'Clubs' },
  { value: '2,850+', label: 'Members' },
  { value: '14', label: 'Avenues' },
  { value: '5', label: 'Regions' },
]

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
}
export const dignitaries: Dignitary[] = [
  { name: 'Francesco Arezzo', role: 'President', term: 'Rotary International 2025-26', photo: 'https://rotaryindia.org/Documents/WebsiteData/International_President/PRESIDENT160620251053175875643AM.png' },
  { name: 'Arun Daniel Bhandare', role: 'District Governor', term: '2025-26', photo: pexels(7581040) },
]

export interface SnapshotStat {
  icon: string
  value: string
  label: string
  fg: string
  bg: string
}
// Real aggregates from the project + club datasets.
const compact = (n: number): string =>
  n >= 1e7
    ? `${(n / 1e7).toFixed(1).replace(/\.0$/, '')}Cr`
    : n >= 1e5
      ? `${(n / 1e5).toFixed(1).replace(/\.0$/, '')}L`
      : n.toLocaleString('en-IN')

const snapTotals = {
  projects: projects.length,
  clubs: new Set(projects.map((p) => p.clubId)).size,
  beneficiaries: projects.reduce((sum, p) => sum + p.beneficiaries, 0),
  cost: projects.reduce((sum, p) => sum + p.cost, 0),
  manHours: projects.reduce((sum, p) => sum + p.manHours, 0),
  members: clubs.reduce((sum, c) => sum + c.memberCount, 0),
}

export const snapshot: SnapshotStat[] = [
  { icon: 'Target', value: String(snapTotals.projects), label: 'Total Projects', fg: 'text-amber-600', bg: 'bg-amber-500/15' },
  { icon: 'Building2', value: String(snapTotals.clubs), label: 'Clubs Involved', fg: 'text-brand-blue', bg: 'bg-brand-blue/10' },
  { icon: 'HandHeart', value: compact(snapTotals.beneficiaries), label: 'Beneficiaries', fg: 'text-rose-500', bg: 'bg-rose-500/10' },
  { icon: 'IndianRupee', value: `₹${compact(snapTotals.cost)}`, label: 'Cost', fg: 'text-violet-600', bg: 'bg-violet-500/10' },
  { icon: 'Clock', value: compact(snapTotals.manHours), label: 'Man Hours', fg: 'text-sky-600', bg: 'bg-sky-500/10' },
  { icon: 'Users', value: compact(snapTotals.members), label: 'Members', fg: 'text-emerald-600', bg: 'bg-emerald-500/10' },
]

export interface FeaturedProject {
  title: string
  tag: string
  families: string
  cost: string
  image: string
  to: string
}
export const featuredProjects: FeaturedProject[] = [
  { title: 'Village Sanitation Drive', tag: 'Water & Sanitation', families: '500 Families Benefited', cost: '₹8.5 Lakh', image: pic('village-sanitation-drive-0'), to: '/projects/village-sanitation-drive' },
  { title: 'Digital Classroom Initiative', tag: 'Education', families: '320 Students Benefited', cost: '₹12.2 Lakh', image: pic('digital-classroom-0'), to: '/club-projects/new-generation-service' },
  { title: 'Health Check-up Camp', tag: 'Health', families: '1,200 People Benefited', cost: '₹6.8 Lakh', image: pic('health-checkup-0'), to: '/club-projects/community-service' },
]

export interface UpcomingEvent {
  day: string
  month: string
  title: string
  location: string
  time: string
}
export const upcomingEvents: UpcomingEvent[] = [
  { day: '25', month: 'AUG', title: 'District Assembly 2025-26', location: 'Rotary Bhavan, Pune', time: '10:00 AM – 04:00 PM' },
  { day: '12', month: 'JUL', title: 'Club Secretary Training Session', location: 'Online (Zoom)', time: '06:00 PM – 08:00 PM' },
  { day: '18', month: 'JUL', title: 'District Conference 2025', location: 'Pune, Maharashtra', time: '09:00 AM Onwards' },
]

export interface Leader {
  name: string
  role: string
  photo: string
}
export const leadership: Leader[] = [
  { name: 'Arun Daniel Bhandare', role: 'District Governor', photo: pexels(7581040) },
  { name: 'Sandeep Agarwal', role: 'Chairman', photo: pexels(7580766) },
  { name: 'Deepak Shah', role: 'Conference Secretary', photo: pexels(7581022) },
  { name: 'Ketan Desai', role: 'District Secretary', photo: pexels(7580768) },
  { name: 'Bharat Kumar', role: 'Treasurer', photo: pexels(7580761) },
  { name: 'Vikram Nair', role: 'Trainer', photo: pexels(7580640) },
]

export interface NewsItem {
  title: string
  snippet: string
  date: string
  image: string
}
export const news: NewsItem[] = [
  { title: 'District Bulletin – June 2025 Edition', snippet: 'Stay updated with the latest news and activities.', date: '24 Jun 2025', image: pic('news-bulletin') },
  { title: 'Club Achievement: Honored with Best Project Award', snippet: 'RC Kolhapur Midtown wins district best-project award.', date: '18 Jun 2025', image: pic('news-award') },
  { title: "Governor's Message – June 2025", snippet: 'A message of inspiration from our District Governor.', date: '10 Jun 2025', image: pic('news-governor') },
]

export interface Region {
  name: string
  clubs: string
  color: string
}
export const regions: Region[] = [
  { name: 'Region 1', clubs: '28 Clubs', color: '#9DB8E8' },
  { name: 'Region 2', clubs: '31 Clubs', color: '#A7D9B8' },
  { name: 'Region 3', clubs: '22 Clubs', color: '#F6D38A' },
  { name: 'Region 4', clubs: '25 Clubs', color: '#F2A9A0' },
  { name: 'Region 5', clubs: '22 Clubs', color: '#C3A8EE' },
]

export const moments: string[] = [
  pexels(12327289), pexels(13141398), pexels(6722952), pexels(14120649), pexels(9174125), pexels(11091375),
]

export const homeContact = {
  email: 'dgarun.rid3170@gmail.com',
  phone: '9823120618',
  governorPhoto: 'https://images.pexels.com/photos/7581040/pexels-photo-7581040.jpeg?auto=compress&cs=tinysrgb&w=700',
}
