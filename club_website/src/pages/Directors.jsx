import { useMemo, useState } from 'react'
import { Search, UserSearch } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import DirectorCard from '../components/DirectorCard'

const directors = [
  {
    name: 'Samir Limaye',
    role: 'Club President',
    img: 'https://rizones45678.org/API/Documents/directory/SAMIR_LIMAY28092016111836PM.png',
  },
  {
    name: 'Nilesh Pitale',
    role: 'Club Secretary',
    img: 'https://rizones45678.org/API/Documents/directory/ContactPhotoRetouching-IMG_20240421_09351021042024094123AM.jpg',
  },
  {
    name: 'Jayram Nagesh Mendon',
    role: 'Club Vice President',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Vasant Bhat',
    role: 'Club Treasurer',
    img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Anindya Dasgupta',
    role: 'Club Foundation Chair',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Suhas Venkatesh Kulkarni',
    role: 'Club Membership Chair',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Pawan Adnani',
    role: 'Club Service Projects Chair',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Narendra Rao',
    role: 'Club Executive Secretary / Director',
    img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
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
            className="mx-auto mb-10 flex max-w-3xl items-center gap-3"
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
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-bold text-navy shadow-sm transition-all hover:bg-gold-light hover:shadow-md"
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
