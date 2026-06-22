import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowRight,
  ClipboardList,
  TrendingUp,
  Users,
  Check,
  X,
} from 'lucide-react'
import { GearMark } from '../components/Logo'
import Aurora from '../components/Aurora'
import SplitText from '../components/SplitText'
import CountUp from '../components/CountUp'
import SpotlightCard from '../components/SpotlightCard'

// Hero impact stats shown on the navy banner.
const STATS = [
  { icon: ClipboardList, color: 'bg-blue-500', num: 41, suffix: '', label: 'Total Projects' },
  { icon: TrendingUp, color: 'bg-green-500', num: 6, suffix: '', label: 'Focus Areas' },
  { icon: Users, color: 'bg-purple-500', num: 2500, suffix: '+', label: 'Communities Impacted' },
]

// Category tag → colour map for the small pill on each project image. Short
// labels map onto Rotary's official areas of focus (see CATEGORY_FULL below).
const TAGS = {
  Community: 'bg-blue-500',
  Health: 'bg-emerald-500',
  Education: 'bg-indigo-500',
  Environment: 'bg-teal-500',
  WASH: 'bg-cyan-500',
  Economic: 'bg-amber-500',
}
const CATEGORIES = Object.keys(TAGS)

// Project photos are served from the club's media API; only the album/file
// suffix is stored per project and prefixed at build time below.
const PHOTO_BASE = 'https://rizones45678.org/API/Documents/gallery/Group1/'
// Generic community photo shown if a project's image fails to load.
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80'

// Real Community-Service projects (rcthanehills.rotaryindia.org → All Projects),
// newest first. `img` holds the album/file suffix appended to PHOTO_BASE.
const RAW = [
  { title: 'Mee Saksham - District Thrust', date: '06 Jun 2026', tag: 'Economic', desc: 'Helping women self-help groups through micro-finance and market linkage.', img: 'Album153764/SHG_DISTRICT_EVENT06062026041245PM.jpeg' },
  { title: 'Project Restore', date: '04 Jun 2026', tag: 'Environment', desc: 'Repair and rectification of an old check dam built in 2016.', img: 'Album152252/KARVELE_CHECK_DAM104062026052535PM.jpeg' },
  { title: 'Global Grant for Pediatric Heart Surgeries', date: '31 May 2026', tag: 'Health', desc: 'Surgical intervention program for children in need.', img: 'Album149491/GG131052026051231PM.jpeg' },
  { title: 'Cataract Surgeries', date: '31 May 2026', tag: 'Health', desc: 'MOU signed with Dr Wavikar Eye Hospital and Institute.', img: 'Album149463/WAVIKAR_MOU_131052026044106PM.jpeg' },
  { title: 'Pediatric Heart Surgery', date: '31 May 2026', tag: 'Health', desc: 'Conducting pediatric heart surgeries at Jupiter Hospital.', img: 'Album149461/JUPITER_MOU331052026043553PM.jpeg' },
  { title: 'Ann Daan', date: '16 May 2026', tag: 'Community', desc: 'Providing grocery and daily-need items to the poor and blind.', img: 'Album143052/Ann_daan__418052026121906PM.jpg' },
  { title: 'Ann Daan', date: '17 Apr 2026', tag: 'Community', desc: 'Providing grocery and daily-need items to the poor and blind.', img: 'Album143050/ANN_DAAN__16TH_MAY_202618052026121610PM.jpeg' },
  { title: 'HPV Vaccination', date: '30 Mar 2026', tag: 'Health', desc: 'Administration of the second dose to 136 girl beneficiaries.', img: 'Album122045/WhatsApp_Image_20260331_at_14.57.0701042026040118PM.jpeg' },
  { title: 'Annapoorna - Anna Daan', date: '18 Mar 2026', tag: 'Community', desc: 'Providing grocery and provisions to blind persons.', img: 'Album122050/WhatsApp_Image_20260321_at_17.12.3401042026040447PM.jpeg' },
  { title: 'Happy Street Carnival', date: '22 Feb 2026', tag: 'Community', desc: 'Organising a Sunday-morning fun fair and carnival.', img: 'Album107195/HAPPY_STREET126022026020555PM.jpeg' },
  { title: 'Annapoorna - Anna Daan', date: '17 Feb 2026', tag: 'Community', desc: 'Providing grocery and provisions to the blind.', img: 'Album122056/WhatsApp_Image_20260321_at_17.05.1101042026040852PM.jpeg' },
  { title: 'Eco Quiz', date: '24 Jan 2026', tag: 'Environment', desc: 'Organised quiz on ecology and environment awareness.', img: 'Album143075/ECO_QUIZ__218052026125052PM.jpg' },
  { title: 'Aanapoorna', date: '18 Jan 2026', tag: 'Community', desc: 'Distribution of groceries to the blind.', img: 'Album94717/WhatsApp_Image_20260126_at_7.59.43_PM26012026080706PM.jpeg' },
  { title: 'Triumph Run and Carnival', date: '04 Jan 2026', tag: 'Community', desc: 'Triumph Run and Carnival celebrations.', img: 'Album94749/triumph26012026090943PM.jpeg' },
  { title: 'Triumph Run and Carnival', date: '04 Jan 2026', tag: 'Community', desc: 'Wholesome entertainment and engagement for special kids.', img: 'Album144479/TRC_321052026044528PM.jpg' },
  { title: 'Aanapoorna', date: '20 Dec 2025', tag: 'Community', desc: 'Distribution of groceries to the blind.', img: 'Album94713/ANNPOORNA26012026075724PM.jpg' },
  { title: 'Aanadan to Blind', date: '20 Nov 2025', tag: 'Community', desc: 'Distribution of groceries to the blind.', img: 'Album92164/IMG20250724WA002016012026040114PM.jpg' },
  { title: 'Susauwaad - A Dialogue for Change', date: '15 Nov 2025', tag: 'Community', desc: 'Panel discussion about citizen issues and urban challenges.', img: 'Album144481/SUSAUWAAD21052026045031PM.jpg' },
  { title: 'Between the Covers', date: '08 Nov 2025', tag: 'Education', desc: 'Contest for school students, inculcating the habit of reading.', img: 'Album144465/BETWEEN_THE_COVER521052026042213PM.jpg' },
  { title: 'Thane Literature Festival', date: '01 Nov 2025', tag: 'Education', desc: 'First edition of the Thane Literature Festival.', img: 'Album69049/TLF_221112025034801PM.jpg' },
  { title: 'Annapoorna', date: '19 Oct 2025', tag: 'Community', desc: 'Aanadan - distribution of groceries to the visually challenged.', img: 'Album62999/WhatsApp_Image_20251019_at_10.54.53_AM05112025090204PM.jpeg' },
  { title: 'Right to Go', date: '11 Oct 2025', tag: 'WASH', desc: 'Constructing toilets for schools.', img: 'Album144456/ZP_Toilet__421052026040950PM.jpg' },
  { title: 'HPV Vaccination', date: '01 Oct 2025', tag: 'Health', desc: 'HPV vaccination at Shahu Maharaj Vidyalaya, Rabale.', img: 'Album47371/WhatsApp_Image_20251001_at_7.59.33_PM02102025022208PM.jpeg' },
  { title: 'HPV Vaccination', date: '28 Sep 2025', tag: 'Health', desc: 'HPV vaccination camp at Village Chinchale, Taluka Dahanu.', img: 'Album47368/WhatsApp_Image_20250928_at_5.50.38_PM02102025021744PM.jpeg' },
  { title: 'Aanadan', date: '21 Sep 2025', tag: 'Community', desc: 'Distribution of groceries to the visually challenged.', img: 'Album47361/WhatsApp_Image_20250922_at_8.00.40_AM02102025021141PM.jpeg' },
  { title: 'Educational App Distribution', date: '18 Sep 2025', tag: 'Education', desc: 'Educational app distribution to 10th-std students at a TMC school.', img: 'Album47356/WhatsApp_Image_20250918_at_4.30.58_PM02102025020511PM.jpeg' },
  { title: 'Education App Distribution', date: '10 Sep 2025', tag: 'Education', desc: 'Alternate methods for exam preparation for the 10th standard.', img: 'Album144472/EDUCATION_APP_DISTRIBUTION_221052026043009PM.jpg' },
  { title: 'Educational App Distribution', date: '23 Aug 2025', tag: 'Education', desc: 'Ideal Education app distribution to 10th-std students.', img: 'Album35201/WhatsApp_Image_20250905_at_5.32.17_PM05092025103557PM.jpeg' },
  { title: 'Aanapurna', date: '23 Aug 2025', tag: 'Community', desc: 'Grocery kits distributed to 1000 blind persons.', img: 'Album33767/WhatsApp_Image_20250823_at_1.00.05_PM04092025042941PM.jpeg' },
  { title: 'Ganapati Idol Making Workshop', date: '07 Aug 2025', tag: 'Community', desc: 'Crafts and creativity workshop for specially-abled children.', img: 'Album33756/WhatsApp_Image_20250808_at_11.20.50_AM04092025041834PM.jpeg' },
  { title: 'Tree Plantation', date: '27 Jul 2025', tag: 'Environment', desc: 'Tree plantation drive conducted at Rabale MIDC, Navi Mumbai.', img: 'Album15678/TREE_PLANTATION_27TH_JULY04082025113554PM.jpeg' },
  { title: 'Annapoorna', date: '24 Jul 2025', tag: 'Community', desc: 'Grocery kits distributed to 1000 blind persons.', img: 'Album15670/ANNAPORNA_24TH_JULY04082025113100PM.jpeg' },
  { title: 'School Bag & Material Distribution', date: '20 Jul 2025', tag: 'Education', desc: 'School bags and educational material distributed to 767 students.', img: 'Album15650/NASIK_PROJECT_20TH_JULY04082025112216PM.jpeg' },
  { title: 'Blood Donation Camp', date: '18 Jul 2025', tag: 'Health', desc: 'Blood donation camp held at the Luna Technologies office.', img: 'Album15637/BLOOD_DONATION_LUNA_04082025111519PM.jpeg' },
  { title: 'Mobile Addiction Awareness', date: '15 Jul 2025', tag: 'Education', desc: 'Awareness session on mobile addiction at R S Deokar School.', img: 'Album15633/MOBILE_ADDITION_18_JULY04082025111142PM.jpeg' },
  { title: 'HPV Vaccination', date: '12 Jul 2025', tag: 'Health', desc: 'HPV vaccination camp at Amarnath School, Govandi.', img: 'Album15622/IMG20250711WA016205082025040720PM.jpg' },
  { title: 'HPV Vaccination', date: '11 Jul 2025', tag: 'Health', desc: 'HPV vaccination camp at a TMC school, Kisan Nagar, Thane.', img: 'Album15615/HPV_VACCINATION__11TH_JULY04082025110209PM.jpeg' },
  { title: 'School Bag & Material Distribution', date: '05 Jul 2025', tag: 'Education', desc: 'School materials distributed to students at Navjeevan School.', img: 'Album15591/SCHOOL_BAG_DISTRIBUTION__NAVJEEVAN__SCHOOL_5TH_JUL04082025104640PM.jpeg' },
  { title: 'School Bag & Material Distribution', date: '05 Jul 2025', tag: 'Education', desc: 'School bags and material distributed to 60 students at Signal School.', img: 'Album15596/SCHOOL_BAG_DISTRIBUTION__SIGNAL_SCHOOL_5TH_JULY04082025104949PM.jpeg' },
  { title: 'Gynaecological Health Awareness', date: '05 Jul 2025', tag: 'Health', desc: 'Awareness on gynaecological health, nutrition & cervical cancer.', img: 'Album15601/AWARNESS_SECTION_5TH_JULY04082025105451PM.jpeg' },
  { title: 'Blood Donation Camp', date: '05 Jul 2025', tag: 'Health', desc: 'Blood donation camp organised at Vasant Vihar Club House.', img: 'Album15569/BLOOD_DONATION_VASANT_VIHAR_104082025102919PM.jpeg' },
]

const projects = RAW.map((p) => {
  const [day, mon] = p.date.split(' ')
  return { ...p, day, mon, img: PHOTO_BASE + p.img }
})

// ── Date helpers (parse "04 Jan 2026" for sorting / year filtering) ──────
const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }
const parseDate = (d) => {
  const [day, mon, yr] = d.split(' ')
  return new Date(+yr, MONTHS[mon] ?? 0, +day).getTime()
}
const yearOf = (d) => d.split(' ')[2]
const YEARS = [...new Set(projects.map((p) => yearOf(p.date)))].sort().reverse()

const SORTS = [
  { key: 'default', label: 'All Projects' },
  { key: 'newest', label: 'Newest First' },
  { key: 'oldest', label: 'Oldest First' },
  { key: 'az', label: 'Title A – Z' },
]

// Flat community illustration for the hero (clouds + cheering people + heart),
// with the Rotary wheel rising behind it.
function CommunityArt() {
  const skin = '#F4C9A0'
  const people = [
    { x: 120, color: '#0A2472', h: 70 },
    { x: 178, color: '#F7A600', h: 92 },
    { x: 244, color: '#0a52b8', h: 104 },
    { x: 310, color: '#22C55E', h: 88 },
    { x: 368, color: '#EF4444', h: 74 },
  ]
  const Y = 322 // ground line

  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      <GearMark className="absolute right-6 top-0 h-20 w-20 drop-shadow-lg md:h-24 md:w-24" />
      <svg viewBox="0 0 480 360" className="w-full">
        {/* clouds */}
        <g fill="#ffffff" opacity="0.85">
          <ellipse cx="70" cy="70" rx="34" ry="18" />
          <ellipse cx="100" cy="62" rx="26" ry="20" />
          <ellipse cx="410" cy="120" rx="30" ry="16" />
          <ellipse cx="385" cy="114" rx="22" ry="16" />
        </g>
        {/* heart above the crowd */}
        <g transform="translate(212 96) scale(2.1)">
          <path
            d="M16,28.6C9.5,19.3,0,16.8,0,8.4C0,3.8,3.8,0,8.4,0c3.4,0,6.3,2.7,7.6,5.6C17.3,2.7,20.2,0,23.6,0C28.2,0,32,3.8,32,8.4C32,16.8,22.5,19.3,16,28.6z"
            fill="#EF4444"
          />
          <path
            d="M16,28.6C9.5,19.3,0,16.8,0,8.4C0,3.8,3.8,0,8.4,0c3.4,0,6.3,2.7,7.6,5.6C17.3,2.7,20.2,0,23.6,0C28.2,0,32,3.8,32,8.4"
            fill="#ffffff"
            opacity="0.18"
          />
        </g>
        {/* confetti */}
        <g>
          <circle cx="150" cy="120" r="4" fill="#F7A600" />
          <circle cx="330" cy="150" r="4" fill="#22C55E" />
          <circle cx="300" cy="90" r="3" fill="#FFB81C" />
          <circle cx="180" cy="170" r="3" fill="#0a52b8" />
          <rect x="356" y="190" width="7" height="7" rx="1.5" fill="#F7A600" transform="rotate(20 359 193)" />
          <rect x="120" y="200" width="7" height="7" rx="1.5" fill="#EF4444" transform="rotate(-15 123 203)" />
        </g>
        {/* cheering people */}
        {people.map((p) => {
          const head = Y - p.h
          const shoulder = head + 22
          return (
            <g key={p.x}>
              {/* raised arms */}
              <path
                d={`M${p.x - 12},${shoulder} L${p.x - 30},${head - 8}`}
                stroke={skin}
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={`M${p.x + 12},${shoulder} L${p.x + 30},${head - 8}`}
                stroke={skin}
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx={p.x - 31} cy={head - 9} r="4.5" fill={skin} />
              <circle cx={p.x + 31} cy={head - 9} r="4.5" fill={skin} />
              {/* head */}
              <circle cx={p.x} cy={head} r="14" fill={skin} />
              {/* body */}
              <rect x={p.x - 16} y={head + 10} width="32" height={p.h - 4} rx="15" fill={p.color} />
            </g>
          )
        })}
        {/* ground */}
        <rect x="40" y={Y} width="400" height="6" rx="3" fill="#ffffff" opacity="0.25" />
      </svg>
    </div>
  )
}

// Small reusable option row used inside every dropdown menu.
function Opt({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
        active ? 'bg-navy text-white' : 'text-navy hover:bg-navy/5'
      }`}
    >
      <span>{children}</span>
      {active && <Check className="h-4 w-4 shrink-0" />}
    </button>
  )
}

export default function Projects() {
  const [query, setQuery] = useState('')
  const [view, setView] = useState('grid') // grid | list
  const [category, setCategory] = useState('All')
  const [year, setYear] = useState('All')
  const [sort, setSort] = useState('default')
  const [openMenu, setOpenMenu] = useState(null) // 'cat' | 'sort' | 'year' | null
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const toolbarRef = useRef(null)
  const resultsRef = useRef(null)

  const PER_PAGE = 8

  // Close any open dropdown when clicking outside the toolbar.
  useEffect(() => {
    if (!openMenu) return
    const onDown = (e) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target)) setOpenMenu(null)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [openMenu])

  const toggleMenu = (name) => setOpenMenu((cur) => (cur === name ? null : name))

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = projects.filter((p) => {
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
      const matchCat = category === 'All' || p.tag === category
      const matchYear = year === 'All' || yearOf(p.date) === year
      return matchQ && matchCat && matchYear
    })
    if (sort === 'newest') list = [...list].sort((a, b) => parseDate(b.date) - parseDate(a.date))
    else if (sort === 'oldest') list = [...list].sort((a, b) => parseDate(a.date) - parseDate(b.date))
    else if (sort === 'az') list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    return list
  }, [query, category, year, sort])

  const activeCount = (category !== 'All' ? 1 : 0) + (year !== 'All' ? 1 : 0)
  const sortLabel = SORTS.find((s) => s.key === sort)?.label ?? 'All Projects'

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  // Reset to the first page whenever the result set changes (filters/search/sort).
  useEffect(() => setPage(1), [query, category, year, sort])
  // Keep the page in range if the result set shrinks below the current page.
  useEffect(() => setPage((p) => Math.min(p, totalPages)), [totalPages])

  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const goToPage = (p) => {
    const next = Math.min(Math.max(1, p), totalPages)
    setPage(next)
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const resetAll = () => {
    setCategory('All')
    setYear('All')
    setSort('default')
    setQuery('')
  }

  return (
    <>
      {/* ── Hero banner ─────────────────────────────────────────────── */}
      <section className="relative -mt-20 overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-deep">
        <div className="impact-dots pointer-events-none absolute inset-0 opacity-50" />
        <Aurora className="opacity-45" />
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

        <div className="container-x relative pb-24 pt-28 md:pb-28 md:pt-32">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <h1 className="font-heading text-4xl font-extrabold uppercase tracking-tight text-white md:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
                <SplitText text="Community" /> <SplitText text="Services" className="text-gold" />
              </h1>
              <p className="mt-3 text-base text-white/80 md:text-lg">
                Making a difference through service
              </p>

              <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                {STATS.map(({ icon: Icon, color, num, suffix, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm"
                  >
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-lg ${color}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="leading-none">
                      <CountUp
                        to={num}
                        suffix={suffix}
                        className="font-heading text-2xl font-extrabold text-white"
                      />
                      <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/70">
                        {label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* illustration (desktop) */}
            <div className="hidden lg:block">
              <CommunityArt />
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ────────────────────────────────────────────────────── */}
      <div className="bg-canvas">
        <div className="container-x">
          {/* Toolbar card — overlaps the hero base */}
          <div
            ref={toolbarRef}
            className="relative z-10 -mt-14 rounded-2xl border border-gray-100 bg-white p-4 shadow-card md:p-5"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              {/* Category dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleMenu('cat')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy shadow-sm transition-colors hover:bg-gold-light lg:w-auto"
                >
                  {category === 'All' ? 'Club Projects' : category}
                  <ChevronDown className={`h-4 w-4 transition-transform ${openMenu === 'cat' ? 'rotate-180' : ''}`} />
                </button>
                {openMenu === 'cat' && (
                  <div className="absolute left-0 top-full z-30 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-1.5 shadow-cardHover">
                    <Opt active={category === 'All'} onClick={() => { setCategory('All'); setOpenMenu(null) }}>
                      All Categories
                    </Opt>
                    {CATEGORIES.map((c) => (
                      <Opt key={c} active={category === c} onClick={() => { setCategory(c); setOpenMenu(null) }}>
                        {c}
                      </Opt>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-1 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 focus-within:border-gold/60 focus-within:ring-2 focus-within:ring-gold/20">
                <Search className="h-4 w-4 shrink-0 text-navy" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by keyword..."
                  className="w-full bg-transparent text-sm text-ink placeholder:text-muted/70 focus:outline-none"
                />
                {query && (
                  <button onClick={() => setQuery('')} aria-label="Clear search" className="text-muted hover:text-navy">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowFilters((v) => !v)}
                className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  showFilters || activeCount > 0
                    ? 'border-navy bg-navy text-white'
                    : 'border-gray-200 bg-white text-navy hover:border-navy'
                }`}
              >
                <Filter className="h-4 w-4" /> Filters
                {activeCount > 0 && (
                  <span className="ml-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[11px] font-bold text-navy">
                    {activeCount}
                  </span>
                )}
              </button>

              <div className="inline-flex items-center rounded-full border border-gray-200 bg-white p-1">
                <button
                  onClick={() => setView('grid')}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    view === 'grid' ? 'bg-navy text-white shadow-sm' : 'text-muted hover:text-navy'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" /> Grid View
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    view === 'list' ? 'bg-navy text-white shadow-sm' : 'text-muted hover:text-navy'
                  }`}
                >
                  <List className="h-3.5 w-3.5" /> List View
                </button>
              </div>
            </div>

            {/* Collapsible filter panel (toggled by the Filters button) */}
            {showFilters && (
              <div className="mt-4 rounded-xl border border-gray-100 bg-canvas/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wide text-muted">Filter by category</span>
                  {activeCount > 0 && (
                    <button
                      onClick={resetAll}
                      className="text-xs font-semibold text-gold-cta hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => setCategory('All')}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      category === 'All' ? 'bg-navy text-white' : 'border border-gray-200 bg-white text-navy hover:border-navy'
                    }`}
                  >
                    All
                  </button>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        category === c ? 'bg-navy text-white' : 'border border-gray-200 bg-white text-navy hover:border-navy'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleMenu('sort')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-navy sm:w-auto"
                >
                  {sortLabel} <ChevronDown className={`h-4 w-4 text-muted transition-transform ${openMenu === 'sort' ? 'rotate-180' : ''}`} />
                </button>
                {openMenu === 'sort' && (
                  <div className="absolute left-0 top-full z-30 mt-2 w-52 rounded-xl border border-gray-100 bg-white p-1.5 shadow-cardHover">
                    {SORTS.map((s) => (
                      <Opt key={s.key} active={sort === s.key} onClick={() => { setSort(s.key); setOpenMenu(null) }}>
                        {s.label}
                      </Opt>
                    ))}
                  </div>
                )}
              </div>

              {/* Year dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleMenu('year')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-navy sm:w-auto"
                >
                  {year === 'All' ? 'All Years' : year}
                  <ChevronDown className={`h-4 w-4 text-muted transition-transform ${openMenu === 'year' ? 'rotate-180' : ''}`} />
                </button>
                {openMenu === 'year' && (
                  <div className="absolute right-0 top-full z-30 mt-2 w-44 rounded-xl border border-gray-100 bg-white p-1.5 shadow-cardHover">
                    <Opt active={year === 'All'} onClick={() => { setYear('All'); setOpenMenu(null) }}>
                      All Years
                    </Opt>
                    {YEARS.map((y) => (
                      <Opt key={y} active={year === y} onClick={() => { setYear(y); setOpenMenu(null) }}>
                        {y}
                      </Opt>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results count */}
          <p ref={resultsRef} className="mt-6 scroll-mt-24 text-sm text-muted">
            Showing{' '}
            <span className="font-bold text-navy">
              {filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)}
            </span>{' '}
            of {filtered.length} projects
          </p>

          {/* Projects grid / list */}
          <div className="py-6">
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-muted">No projects match your filters.</p>
                <button
                  onClick={resetAll}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-navy px-5 py-2 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white"
                >
                  Clear filters
                </button>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {visible.map((p, i) => (
                  <SpotlightCard
                    as="article"
                    key={i}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cardHover"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.title}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG }}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute left-3 top-3 flex flex-col items-center rounded-lg bg-white px-2.5 py-1.5 text-center shadow-md">
                        <span className="font-heading text-base font-extrabold leading-none text-navy">{p.day}</span>
                        <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-gold">{p.mon}</span>
                      </div>
                      {p.tag && (
                        <span className={`absolute right-3 top-3 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow ${TAGS[p.tag]}`}>
                          {p.tag}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-heading text-[13px] font-extrabold uppercase leading-snug text-navy">{p.title}</h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">{p.desc}</p>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted">
                          <Calendar className="h-3.5 w-3.5 text-gold" /> {p.date}
                        </span>
                        <a
                          href="#"
                          className="inline-flex items-center gap-1 rounded-md bg-navy px-3 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-navy-deep"
                        >
                          Read More <ArrowRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {visible.map((p, i) => (
                  <SpotlightCard
                    as="article"
                    key={i}
                    className="group flex gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-card transition-all duration-300 hover:shadow-cardHover sm:p-4"
                  >
                    <div className="relative h-28 w-36 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-52">
                      <img
                        src={p.img}
                        alt={p.title}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG }}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute left-2 top-2 flex flex-col items-center rounded-lg bg-white px-2 py-1 text-center shadow-md">
                        <span className="font-heading text-sm font-extrabold leading-none text-navy">{p.day}</span>
                        <span className="mt-0.5 text-[8px] font-bold uppercase tracking-wide text-gold">{p.mon}</span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col py-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-heading text-sm font-extrabold uppercase leading-snug text-navy">{p.title}</h3>
                        {p.tag && (
                          <span className={`hidden shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow sm:inline ${TAGS[p.tag]}`}>
                            {p.tag}
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted sm:text-sm">{p.desc}</p>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted sm:text-xs">
                          <Calendar className="h-3.5 w-3.5 text-gold" /> {p.date}
                        </span>
                        <a
                          href="#"
                          className="inline-flex items-center gap-1 rounded-md bg-navy px-3 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-navy-deep"
                        >
                          Read More <ArrowRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && totalPages > 1 && (
              <div className="mt-10 flex flex-col items-center gap-6">
                {page < totalPages && (
                  <button
                    onClick={() => goToPage(page + 1)}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-navy px-7 py-3 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white"
                  >
                    View More Projects
                  </button>
                )}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    aria-label="Previous page"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-muted transition-colors hover:border-navy hover:text-navy disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-muted"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => goToPage(n)}
                      aria-current={n === page ? 'page' : undefined}
                      className={`h-9 w-9 rounded-lg text-sm font-semibold transition-colors ${
                        n === page
                          ? 'bg-navy font-bold text-white'
                          : 'border border-gray-200 bg-white text-navy hover:border-navy'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    aria-label="Next page"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-muted transition-colors hover:border-navy hover:text-navy disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-muted"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
