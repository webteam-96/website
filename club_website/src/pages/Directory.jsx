import { useMemo, useState } from 'react'
import { Search, Users, X } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Avatar from '../components/Avatar'
import Reveal from '../components/Reveal'
import SpotlightCard from '../components/SpotlightCard'

// Full member roster — pulled from the club's official directory
// (rcthanehills.rotaryindia.org). Each entry is a member's name and their
// vocational classification (profession / business).
const members = [
  { name: 'A.S. Shankarnarayan', work: '' },
  { name: 'Aanchal Joshi', work: '' },
  { name: 'Adivarahan Subramanian', work: 'Development Consulting' },
  { name: 'Ajit Gujar', work: 'Rubber Print Block Manufacturing' },
  { name: 'Akanksha Ghotkar', work: 'Branding and Marketing' },
  { name: 'Alpa Dinesh Shah', work: 'Tarot Card Reading, Astrology, Occult Sciences, Aura Healings' },
  { name: 'Amit Choudhury', work: 'Realty Advisors' },
  { name: 'Aniket Kanade', work: 'IT DevOps Engineering' },
  { name: 'Anil Joshi', work: 'Construction Material Supply' },
  { name: 'Anil Kumar Km', work: 'Manufacturing Packaging Machines' },
  { name: 'Anil M. Shinde', work: 'Press & Studio Photography' },
  { name: 'Anindya Dasgupta', work: 'Packaging Machines - Marketing' },
  { name: 'Anup Surve', work: 'Engineering Exports' },
  { name: 'Anuradha Sukhathankar', work: 'Fitness Coach' },
  { name: 'Asawari Anand Palwankar', work: 'HR Consulting' },
  { name: 'Ashes Ganguly', work: 'Analytical Instr. Mktg.' },
  { name: 'Ashok Mulkraj Mahajan', work: 'Microswitch Mfg.' },
  { name: 'Ashutosh Agarwal', work: 'Consulting - Finance' },
  { name: 'Atul Bhide', work: 'Audio Book Publishing' },
  { name: 'Aubrey Rebello', work: '' },
  { name: 'Bhawana Jadhav', work: 'Professional' },
  { name: 'Bijay Yadav', work: '' },
  { name: 'Ca Mahesh Madkholkar', work: 'Chartered Accountant' },
  { name: 'Ca Sukhen Ravindranath Kundu', work: 'Chartered Accountant' },
  { name: 'Dayal Dodeja', work: 'Packaging Products Mfg.' },
  { name: 'Deeba Khan', work: 'Doctor - Physiotherapist, Senior Care home' },
  { name: 'Dr Mansi Baviskar', work: 'Doctor - Paediatric Dentistry' },
  { name: 'Dr Radhika Santosh Bhondve', work: 'Doctor - Medicine' },
  { name: 'Dr. Abhay Purushottam Kulkarni', work: 'Doctor - Orthopaedic Surgeon' },
  { name: 'Dr. Amit Vijay Karkhanis', work: 'Doctor' },
  { name: 'Dr. Anagha Amit Karkhanis', work: 'Gynaecologist' },
  { name: 'Dr. Atul Gupte', work: 'Doctor - General Medicine' },
  { name: 'Dr. Geeta Vaidya', work: 'Doctor - Gynecologist' },
  { name: 'Dr. Raju Subramanian', work: 'Doctor - Pulmonology' },
  { name: 'Dr. Swaroop Kulkarni', work: 'Doctor - Pathology' },
  { name: 'Dr. Vijay Shamrao Kulkarni', work: 'Doctor - Internal Medicine' },
  { name: 'Dr. Yusuf Virani', work: 'Doctor - Opthalmic Surgery' },
  { name: 'Gargi Mitra', work: '' },
  { name: 'Gautam Kumar Banik', work: 'Software Professional' },
  { name: 'Govind Khetan', work: 'Technologist' },
  { name: 'Harshad Avinash Divekar', work: 'Marketing - Switchgear' },
  { name: 'Hemant Kulkarni', work: 'Teaching - Microbiology' },
  { name: 'Jayant Padmakar Nagavkar', work: 'Leadership & Change Management' },
  { name: 'Jayram Nagesh Mendon', work: 'IT Automation' },
  { name: 'John Koshy', work: 'Electronics Goods Mfg.' },
  { name: 'K. R. Suresh', work: 'Facade Consultancy' },
  { name: 'K. S. Rangnathan', work: 'Printing & Packaging' },
  { name: 'Kailash Srichand Golani', work: 'Clean Room Equipment & Precision Fabrication' },
  { name: 'Kalita Moraes Subramanian', work: 'Financial Advisory' },
  { name: 'Kamal Agrawal', work: 'Financial Marketing' },
  { name: 'Kapil Barve', work: 'Shipping Operations' },
  { name: 'Kunal Varma', work: 'Precious Stones & Diamond Trading' },
  { name: 'Madhukar Abaji Chavan', work: 'Financial Auditing' },
  { name: 'Madhumita Rajeev Ghosh', work: 'Digital Transformation Consulting' },
  { name: 'Mahesh Varma', work: 'Diamond Trading' },
  { name: 'Mandar Bhalerao', work: '' },
  { name: 'Manisha Shekhar Kulkarni', work: 'Software Developer' },
  { name: 'Milind Prabhakar Suryawanshi', work: 'Equity Market Consultancy' },
  { name: 'N. D. Joseph', work: 'Scientific Instrument Indenting' },
  { name: 'Narendra Rao', work: 'Information Technology Software Development' },
  { name: 'Nilesh Lad', work: 'Tax & Insurance Consultancy' },
  { name: 'Nilesh Pitale', work: 'IT Infrastructure & Cyber Security' },
  { name: 'Nilesh Puranik', work: 'Real Estate Development' },
  { name: 'Nilesh Vasant Likhite', work: 'Information Systems Audit' },
  { name: 'Padmanabhan Sundaresan', work: 'Financial Services' },
  { name: 'Paresh Katvi', work: '' },
  { name: 'Pawan Adnani', work: 'Stationery Import' },
  { name: 'Prashant Ojha', work: 'Video Games Production & Marketing' },
  { name: 'R Sentilkumar Pillai', work: 'Offshore Engineering Project Management' },
  { name: 'Radhakrishnan Sethuraman', work: '' },
  { name: 'Rajashree Birla', work: '' },
  { name: 'Rajeev Tipnis', work: 'Engineering Construction Services' },
  { name: 'Rajesh B. Salaskar', work: '' },
  { name: 'Rajesh M. Asnani', work: 'Garment Trading' },
  { name: 'Ramesh Satoor', work: 'English Language Training' },
  { name: 'Ranish Jaiswal', work: 'IT Infrastructure Marketing' },
  { name: 'Ravi Iyer', work: '' },
  { name: 'Ravjitsingh H. Khurana', work: 'Commercial Vehicle Marketing' },
  { name: 'Rohit Sharma', work: '' },
  { name: 'Saket Gadkari', work: 'Program Mgmt. & Procurement' },
  { name: 'Sameer Ramakant Korde', work: 'Experiential Tourism' },
  { name: 'Samir Limaye', work: 'Industrial Packaging & Automation' },
  { name: 'Sandeep Bhatia', work: 'Transaction Management' },
  { name: 'Sanjay Handa', work: 'Insurance & Investment - Consultancy' },
  { name: 'Sanjay Namdev Koyande', work: '' },
  { name: 'Sarita Bahl', work: 'Manufacturing - Board Director' },
  { name: 'Satish Shetty', work: 'Corporate Gift Consultancy' },
  { name: 'Satish Vasudeo Rao', work: 'Project Financing' },
  { name: 'Shahaji Ramchandra Khot', work: '' },
  { name: 'Shailesh Waman Mulye', work: 'Construction - Roads & Buildings' },
  { name: 'Shakeel Sheikh', work: 'Revenue Services' },
  { name: 'Shashikant Revankar', work: 'Gold Jewels Mfg' },
  { name: 'Sheetal Pachpande', work: '' },
  { name: 'Shirish Songadkar', work: 'Interior Designing' },
  { name: 'Shrirang Ganesh Date', work: 'Automobile Financing' },
  { name: 'Simantini Arun Patil', work: '' },
  { name: 'Slyvester Jacob Kunder', work: 'Travel & Tourism' },
  { name: 'Sonali Bijur', work: 'Food Manufacturing' },
  { name: 'Sonu Rameshchandra Dhakan', work: '' },
  { name: 'Subramaniam N. Iyer', work: 'Architecture Consultancy' },
  { name: 'Sucheta Rege', work: 'NGO Management' },
  { name: 'Sudipa Deshpande', work: 'Teaching' },
  { name: 'Suhas Venkatesh Kulkarni', work: 'Doctor - Paediatric' },
  { name: 'Sujit Shridhar Uchil', work: 'Office Automation' },
  { name: 'Sujit Venkatesh Gawayi', work: 'Water Management Design & Commissioning' },
  { name: 'Sunanda Ghosh', work: '' },
  { name: 'Sunanda Wadhawan', work: 'Diabetes Consultant' },
  { name: 'Sunil Gwalani', work: 'Behavioural Training' },
  { name: 'Sunil Kishore Sharma', work: '' },
  { name: 'Swapneel Shastri', work: 'IT and Cyber Security Consulting' },
  { name: 'Uday Ashok Gadgil', work: 'Doctor - Eye Specialist' },
  { name: 'Uday Sudhir Pilani', work: 'Venture Capital' },
  { name: 'Umesh Bagul', work: 'Professional' },
  { name: 'V. Chandrasekharan', work: 'Speciality Chemicals Marketing' },
  { name: 'Vaishnavi Harshavardhan Kathaley', work: 'Legal Consultancy' },
  { name: 'Varsha N. Likhite', work: 'Corporate Tax Consultancy' },
  { name: 'Vasant Bhat', work: 'Chartered Accountant' },
  { name: 'Vidya Rohan Pradhan', work: '' },
  { name: 'Vidyadhar Upendra Naik', work: 'Electronics & Telecommunication Engineering' },
  { name: 'Vijay Shetty', work: 'Chartered Accountant & Tax Consultant' },
  { name: 'Vikram Mane', work: 'Sales Networking Consulting & Training' },
  { name: 'Vinod Shetty', work: 'Electrical - Contracting & Consultancy' },
  { name: 'Virendra Singh Tomar', work: 'Industrialist' },
  { name: 'Yamini Kundetkar', work: 'Business Management' },
  { name: 'Yashpal Mewati', work: 'Facility Management Services' },
  { name: 'Yashwant Duduskar', work: 'Civil Law - Practice' },
]

export default function Directory() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return members
    return members.filter(
      (m) => m.name.toLowerCase().includes(q) || m.work.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <>
      <Breadcrumb
        eyebrow="Our Members"
        title="Directory"
        titleClassName="uppercase tracking-wide"
        trail={[{ label: 'Home', href: '#/' }, { label: 'Directory' }]}
      />

      <div className="bg-canvas">
        <div className="container-x py-12">
          {/* search bar */}
          <div className="mx-auto mb-8 flex max-w-3xl items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm focus-within:border-gold/60 focus-within:ring-2 focus-within:ring-gold/20">
            <Search className="h-5 w-5 shrink-0 text-navy" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or profession..."
              className="w-full bg-transparent text-sm text-ink placeholder:text-muted/70 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Clear search" className="text-muted hover:text-navy">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* count */}
          <p className="mb-6 flex items-center justify-center gap-2 text-sm text-muted">
            <Users className="h-4 w-4 text-gold" />
            <span className="font-bold text-navy">{filtered.length}</span> members
          </p>

          {/* members grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((m, i) => (
                <Reveal key={m.name} variant="up" delay={(i % 9) * 50} className="h-full">
                  <SpotlightCard
                    as="article"
                    className="flex h-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover"
                  >
                    <Avatar name={m.name} className="h-12 w-12 text-sm" />
                    <div className="min-w-0">
                      <h3 className="truncate font-heading text-[15px] font-bold text-navy">{m.name}</h3>
                      <p className="truncate text-xs text-muted">{m.work || 'Rotarian'}</p>
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-muted">
              No members found matching &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>
      </div>
    </>
  )
}
