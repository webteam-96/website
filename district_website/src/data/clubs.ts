import { RAW_CLUBS, type RawClub } from './clubsRaw'

export interface ClubMember {
  name: string
  role: string
}

export interface Club {
  id: string
  name: string
  city: string
  state: string
  region: string
  avenue: string
  clubType: string
  clubId: string
  districtId: string
  address: string
  meetingDay: string
  meetingTime: string
  venue: string
  charterYear: number
  president: string
  secretary: string
  /** Total members (the roster below shows the key members). */
  memberCount: number
  members: ClubMember[]
  communityServices: string[]
  clubServices: string[]
}

/** Short meeting label for cards, e.g. "Tue · 7:30 PM". */
export const meetingLabel = (c: Club) => `${c.meetingDay.slice(0, 3)} · ${c.meetingTime}`

export const REGIONS = [
  'North Karnataka',
  'Coastal Karnataka',
  'Goa',
  'South Maharashtra',
  'Central Maharashtra',
  'South Karnataka',
]
export const CLUB_TYPES = ['Rotary Club', 'Rotaract Club', 'Interact Club', 'Satellite Club']
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
export const AVENUES = [
  'Kolhapur', 'Sangli', 'Satara', 'Solapur', 'Belgaum', 'Dharwad', 'Karwar', 'Bagalkot', 'Bijapur', 'Goa',
]

const COMMUNITY_SERVICES = [
  'Polio eradication & pulse immunization drives',
  'Tree plantation & environmental conservation',
  'Blood donation & free health check-up camps',
  'Rural school infrastructure & digital classrooms',
  'Clean drinking water & sanitation projects',
  'Skill development for underprivileged youth',
]
const CLUB_SERVICES = [
  'Weekly fellowship meetings',
  'New member orientation & mentoring',
  'Interact & Rotaract youth programs',
  'Vocational service & professional networking',
  'Member recognition & annual awards',
]

const PRESIDENTS = [
  'Satishkumar Mahale', 'Pushpalata Ramakant Nayak', 'Sachin Balashaheb Desai', 'Anil Deshpande',
  'Rajesh Kulkarni', 'Sunil More', 'Prakash Patil', 'Mahesh Joshi', 'Anita Sharma', 'Vikram Nair',
  'Deepak Shah', 'Ravi Deshmukh', 'Sanjay Rao', 'Kiran Joshi', 'Manish Gupta', 'Asha Patil',
  'Meera Iyer', 'Latha Menon', 'Rohit Verma', 'Neha Saxena', 'Arun Kulkarni', 'Pawan Adnani',
  'Narendra Rao', 'Suhas Kulkarni', 'Jayram Mendon', 'Sandeep Pawar', 'Ramesh Iyer', 'Girish Hegde',
  'Vivek Naik', 'Pooja Rane', 'Sneha Kale', 'Amit Chavan', 'Nitin Salunkhe', 'Yogesh Bhosale',
  'Sachin Kadam', 'Pradeep Jadhav', 'Milind Gokhale', 'Harish Shetty', 'Uday Phadke', 'Chetan Mhatre',
]
const MEMBER_ROLES = [
  'President', 'Secretary', 'Treasurer', 'Vice President', 'Joint Secretary',
  'Sergeant-at-Arms', 'Club Director', 'Club Director', 'Member', 'Member', 'Member', 'Member',
]
const TIMES = ['18:30', '19:00', '19:30', '20:00', '18:45', '19:15', '20:30']

function buildMembers(offset: number): ClubMember[] {
  return Array.from({ length: 12 }, (_, i) => ({
    name: PRESIDENTS[(offset + i * 3) % PRESIDENTS.length],
    role: MEMBER_ROLES[i] ?? 'Member',
  }))
}

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

interface Place {
  city: string
  state: string
  region: string
  avenue: string
}

const PLACES: Place[] = [
  { city: 'Belgaum', state: 'Karnataka', region: 'North Karnataka', avenue: 'Belgaum' },
  { city: 'Bailhongal', state: 'Karnataka', region: 'North Karnataka', avenue: 'Belgaum' },
  { city: 'Chikodi', state: 'Karnataka', region: 'North Karnataka', avenue: 'Belgaum' },
  { city: 'Gokak', state: 'Karnataka', region: 'North Karnataka', avenue: 'Belgaum' },
  { city: 'Athani', state: 'Karnataka', region: 'North Karnataka', avenue: 'Belgaum' },
  { city: 'Nipani', state: 'Karnataka', region: 'North Karnataka', avenue: 'Belgaum' },
  { city: 'Bagalkot', state: 'Karnataka', region: 'North Karnataka', avenue: 'Bagalkot' },
  { city: 'Jamkhandi', state: 'Karnataka', region: 'North Karnataka', avenue: 'Bagalkot' },
  { city: 'Mudhol', state: 'Karnataka', region: 'North Karnataka', avenue: 'Bagalkot' },
  { city: 'Bijapur', state: 'Karnataka', region: 'North Karnataka', avenue: 'Bijapur' },
  { city: 'Dharwad', state: 'Karnataka', region: 'South Karnataka', avenue: 'Dharwad' },
  { city: 'Hubli', state: 'Karnataka', region: 'South Karnataka', avenue: 'Dharwad' },
  { city: 'Gadag', state: 'Karnataka', region: 'South Karnataka', avenue: 'Dharwad' },
  { city: 'Hangal', state: 'Karnataka', region: 'South Karnataka', avenue: 'Dharwad' },
  { city: 'Haveri', state: 'Karnataka', region: 'South Karnataka', avenue: 'Dharwad' },
  { city: 'Ranebennur', state: 'Karnataka', region: 'South Karnataka', avenue: 'Dharwad' },
  { city: 'Karwar', state: 'Karnataka', region: 'Coastal Karnataka', avenue: 'Karwar' },
  { city: 'Ankola', state: 'Karnataka', region: 'Coastal Karnataka', avenue: 'Karwar' },
  { city: 'Kumta', state: 'Karnataka', region: 'Coastal Karnataka', avenue: 'Karwar' },
  { city: 'Sirsi', state: 'Karnataka', region: 'Coastal Karnataka', avenue: 'Karwar' },
  { city: 'Yellapur', state: 'Karnataka', region: 'Coastal Karnataka', avenue: 'Karwar' },
  { city: 'Panaji', state: 'Goa', region: 'Goa', avenue: 'Goa' },
  { city: 'Margao', state: 'Goa', region: 'Goa', avenue: 'Goa' },
  { city: 'Vasco', state: 'Goa', region: 'Goa', avenue: 'Goa' },
  { city: 'Mapusa', state: 'Goa', region: 'Goa', avenue: 'Goa' },
  { city: 'Ponda', state: 'Goa', region: 'Goa', avenue: 'Goa' },
  { city: 'Bicholim', state: 'Goa', region: 'Goa', avenue: 'Goa' },
  { city: 'Bardez', state: 'Goa', region: 'Goa', avenue: 'Goa' },
  { city: 'Kolhapur', state: 'Maharashtra', region: 'South Maharashtra', avenue: 'Kolhapur' },
  { city: 'Sangli', state: 'Maharashtra', region: 'South Maharashtra', avenue: 'Sangli' },
  { city: 'Miraj', state: 'Maharashtra', region: 'South Maharashtra', avenue: 'Sangli' },
  { city: 'Ichalkaranji', state: 'Maharashtra', region: 'South Maharashtra', avenue: 'Kolhapur' },
  { city: 'Kagal', state: 'Maharashtra', region: 'South Maharashtra', avenue: 'Kolhapur' },
  { city: 'Atigre', state: 'Maharashtra', region: 'South Maharashtra', avenue: 'Kolhapur' },
  { city: 'Sawantwadi', state: 'Maharashtra', region: 'South Maharashtra', avenue: 'Sangli' },
  { city: 'Satara', state: 'Maharashtra', region: 'Central Maharashtra', avenue: 'Satara' },
  { city: 'Karad', state: 'Maharashtra', region: 'Central Maharashtra', avenue: 'Satara' },
  { city: 'Solapur', state: 'Maharashtra', region: 'Central Maharashtra', avenue: 'Solapur' },
  { city: 'Pandharpur', state: 'Maharashtra', region: 'Central Maharashtra', avenue: 'Solapur' },
  { city: 'Phaltan', state: 'Maharashtra', region: 'Central Maharashtra', avenue: 'Satara' },
]

function makeClub(raw: RawClub, i: number): Club {
  const lower = raw.name.toLowerCase()
  const place = PLACES.find((p) => lower.includes(p.city.toLowerCase())) ?? PLACES[i % PLACES.length]
  const city = lower.includes(place.city.toLowerCase()) ? place.city : raw.name.split(' ')[0]
  const members = buildMembers(i)
  members[0] = { name: raw.president || members[0].name, role: 'President' }
  const clubType = /rotaract/i.test(raw.name)
    ? 'Rotaract Club'
    : /interact/i.test(raw.name)
      ? 'Interact Club'
      : 'Rotary Club'
  return {
    id: slug(raw.name),
    name: raw.name,
    city,
    state: place.state,
    region: place.region,
    avenue: place.avenue,
    clubType,
    clubId: `RID3170-${raw.grp}`,
    districtId: '3170',
    address: `Rotary Bhavan, ${city}, ${place.state}`,
    meetingDay: raw.day || DAYS[i % DAYS.length],
    meetingTime: raw.time || TIMES[i % TIMES.length],
    venue: `Rotary Bhavan, ${city}`,
    charterYear: 1955 + (i % 62),
    president: raw.president || members[0].name,
    secretary: members[1].name,
    memberCount: 22 + ((i * 7) % 58),
    members,
    communityServices: COMMUNITY_SERVICES,
    clubServices: CLUB_SERVICES,
  }
}

// Real District 3170 clubs (scraped from ClubsFinder.aspx); fields the finder
// doesn't list (region, avenue, members, etc.) are derived locally.
export const clubs: Club[] = RAW_CLUBS.map((raw, i) => makeClub(raw, i))

export function getClubById(id: string): Club | undefined {
  return clubs.find((c) => c.id === id)
}
