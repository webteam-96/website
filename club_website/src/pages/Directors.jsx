import { useMemo, useState } from 'react'
import { Search, UserSearch } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import DirectorCard from '../components/DirectorCard'

// Board of Directors 2025-26, crawled from the club's official site
// (rcthanehills.rotaryindia.org → Directors.aspx?year=2025-2026), including the
// members' real photos.
const directors = [
  {
    name: 'Samir Limaye',
    role: 'Club President',
    img: '/images/directory/SAMIR_LIMAY28092016111836PM.png',
  },
  {
    name: 'Nilesh Pitale',
    role: 'Club Secretary',
    img: '/images/directory/ContactPhotoRetouching-IMG_20240421_09351021042024094123AM.jpg',
  },
  {
    name: 'Vijay Shetty',
    role: 'Club Learning Facilitator',
    img: null,
  },
  {
    name: 'Jayram Nagesh Mendon',
    role: 'Club Vice President',
    img: '/images/directory/20102021041355PM.png',
  },
  {
    name: 'Vasant Bhat',
    role: 'Club Treasurer',
    img: '/images/directory/20082023092950PM.png',
  },
  {
    name: 'Anindya Dasgupta',
    role: 'Club Foundation Chair',
    img: '/images/directory/anindya09072023051823PM.jpg',
  },
  {
    name: 'Suhas Venkatesh Kulkarni',
    role: 'Club Membership Chair',
    img: '/images/directory/DR._SUHAS_KULKARNI30072015081843PM.png',
  },
  {
    name: 'Aniket Kanade',
    role: 'Club Public Image Chair',
    img: null,
  },
  {
    name: 'Pawan Adnani',
    role: 'Club Service Projects Chair',
    img: '/images/directory/25022018040837PM.png',
  },
  {
    name: 'Narendra Rao',
    role: 'Club Executive Secretary / Director',
    img: '/images/directory/IMG_9282_(1)19042025041753PM.jpeg',
  },
  {
    name: 'Deeba Khan',
    role: 'Director - Youth Service',
    img: '/images/directory/9B131129-A741-4433-8E5A-FBFEAD88222819122024111731PM.jpeg',
  },
]

export default function Directors() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return directors
    return directors.filter(
      (d) => d.name.toLowerCase().includes(q) || d.role.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <>
      <Breadcrumb
        title="Directors"
        titleClassName="uppercase tracking-wide"
        trail={[{ label: 'Home', href: '#/' }, { label: 'Directors' }]}
      />

      <div className="bg-canvas">
        <div className="container-x py-12">
          {/* search bar */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mb-10 flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center"
          >
            <div className="flex flex-1 items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm focus-within:border-gold/60 focus-within:ring-2 focus-within:ring-gold/20">
              <Search className="h-5 w-5 shrink-0 text-navy" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or designation..."
                className="w-full bg-transparent text-sm text-ink placeholder:text-muted/70 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-bold text-navy shadow-sm transition-all hover:bg-gold-light hover:shadow-md sm:w-auto"
            >
              <UserSearch className="h-4 w-4" />
              Search
            </button>
          </form>

          {/* directors grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((d) => (
                <DirectorCard key={d.name} {...d} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-muted">
              No directors found matching &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>
      </div>
    </>
  )
}
