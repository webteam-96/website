// ─────────────────────────────────────────────────────────────────────────
// Real content crawled from the club's official site (rcthanehills.rotaryindia.org).
// This is the single source of truth for the data-driven pages so the same
// records can be reused across Projects, Meetings, Newsletter, About, etc.
// ─────────────────────────────────────────────────────────────────────────

import { asset } from '../lib/asset'

export const meetingInfo = {
  venue: 'Smt. Savitridevi Thirani High School, Road No. 1, Vartak Nagar, Thane West, 400606, Maharashtra, India',
  day: 'Thursday',
  time: '19:30',
}

// Home-page banner artwork (carousel).
export const banners = [
  '/images/WebsiteData/Group1/BANNERS/Banners130820250621053863068PM.png',
  '/images/WebsiteData/Group1/BANNERS/Banners130820250620490629771PM.png',
  '/images/WebsiteData/Group1/BANNERS/Banners190820251106042949229PM.png',
  '/images/WebsiteData/Group1/BANNERS/Banners190820251107265295315PM.png',
  '/images/WebsiteData/Group1/BANNERS/Banners190820251109211705088PM.png',
]

// Promotional advertisements shown on the home page (carousel).
// To add more, append { img, url } objects — the slider picks them up automatically.
export const advertisements = [
  {
    img: '/images/WebsiteData/Group1/ADERTISEMENT/ADERTISEMENT060120260513057197482PM.png',
    url: 'https://www.thanelitfest.in/',
  },
  // { img: '/images/ads/your-ad-2.png', url: 'https://example.com' },
  // { img: '/images/ads/your-ad-3.png', url: 'https://example.com' },
]

// Sponsored Rotaract clubs, exactly as listed on the source home page.
export const rotaractClubs = [
  'Rotaract Club of Chennai',
  'Rotaract Club of New College',
  'Rotaract Club of Loyola College',
  'Rotaract Club of MOP Vaishnav College for Women',
  'Rotaract Club of Madras',
  'Rotaract Club of GSS Jain College for Women',
  'Rotaract Club of DNB Vaishnav College',
  'Rotaract Club of Jeppiar Engineering College',
  'Rotaract Club of Aarupadai Veedu Institute of Technology',
  'Rotaract Club of ISSM Business School',
]

// 18 landmark projects completed by the club (About page).
export const landmarkProjects = [
  'Earthen Dam Project at Shirol',
  'Tribal Employment Scheme',
  'Self-employment Centre for Destitute Women at Premdhaan, Airoli, Navi Mumbai',
  'Triumph Garden at Jidd School',
  'Infrastructure for Vocational Training in Special School',
  'Upgradation of Crematorium at Thane',
  'Career Training Centre at Holy Cross Convent Special School, Thane',
  'Infrastructural Assistance to Tribal School, Utavali Village, Wada',
  'Triumph Blood Bank and Thalassemia Day-care Centre',
  "'Right to Go' — building toilet blocks for villagers in Sogav",
  'Check dams at Shahpur and Murbad',
  "'Virtual Eye' — a learning tool for the visually impaired",
  'Pediatric Heart Surgeries',
  "'Mission for Vision' — eyesight corrective surgeries",
  'Hamari Pari — installation of sanitary pad machines in schools',
  'Rotarian Rakesh Wadhawan Memorial Education Complex at Shenve Village, Taluka Shahpur',
  'Check dams at Ambadi and Umroli in Shahpur',
  'Triumph Foundation & Seetabai Gadgil Trust joint eye-care centre at Thane',
]

// HILLS ECHOES club newsletters (PDF e-bulletins).
export const newsletters = [
  { title: 'HILLS ECHOES — Issue 12', date: 'June 2026', url: '/images/ebulletin/Group1/HILLS_ECHOES__Issue_1204062026062501PM.pdf' },
  { title: 'HILLS ECHOES — Issue 11', date: 'May 2026', url: '/images/ebulletin/Group1/HILLS_ECHOES__Issue_1105052026062016PM.pdf' },
  { title: 'HILLS ECHOES — Issue 10', date: 'April 2026', url: '/images/ebulletin/Group1/HILLS_ECHOES__Issue_10_APRIL_202605042026063404PM.pdf' },
  { title: 'HILLS ECHOES — Issue 9', date: 'March 2026', url: '/images/ebulletin/Group1/HILLS_ECHOES__Issue_9__AMARCH_202605042026063519PM.pdf' },
  { title: 'HILLS ECHOES — Issue 8', date: 'February 2026', url: '/images/ebulletin/Group1/HILLS_ECHOES__Issue_805052026061552PM.pdf' },
  { title: 'HILLS ECHOES — Issue 7', date: 'January 2026', url: '/images/ebulletin/Group1/HILLS_ECHOES__Issue_7JANUARY_202614012026080704PM.pdf' },
  { title: 'HILLS ECHOES — Issue 6', date: 'December 2025', url: '/images/ebulletin/Group1/HILLS_ECHOES__Issue_6DECEMBER_202514012026080622PM.pdf' },
  { title: 'HILLS ECHOES — Issue 5', date: 'November 2025', url: '/images/ebulletin/Group1/HILLS_ECHOES__Issue_5_1NOVEMBER_202524112025030511PM.pdf' },
  { title: 'HILLS ECHOES — Issue 4', date: 'October 2025', url: '/images/ebulletin/Group1/HILLS_ECHOES__Issue_4_1OCTOBER_202524112025030416PM.pdf' },
  { title: 'HILLS ECHOES — Issue 3', date: 'September 2025', url: '/images/ebulletin/Group1/HILLS_ECHOES__Issue_301092025073835PM.pdf' },
  { title: 'HILLS ECHOES — Issue 2', date: 'August 2025', url: '/images/ebulletin/Group1/HILLS_ECHOESAUG30082025024034PM.pdf' },
  { title: 'HILLS ECHOES — Installation Day Special', date: 'July 2025', url: '/images/ebulletin/Group1/HILLS_ECHOES_Installation_Day_Special30082025024546PM.pdf' },
]

// Club meetings & events (Club Events / CE). Shared by the Meetings page and
// the "Club Service" project category.
export const clubMeetings = [
  { title: 'Club Meeting', date: '04 Jun 2026', desc: 'Review and planning for the fund-raiser musical event.', img: '/images/gallery/Group1/Album153959/22_JAN_06062026085329PM.jpeg' },
  { title: 'Club Meeting - 47', date: '28 May 2026', desc: 'Panel discussion with partners of women members of the club.', img: '/images/gallery/Group1/Album149441/RCTH_PARTNERS_PANEL_DISCUSSION431052026041826PM.jpeg' },
  { title: '11th BOD Meeting', date: '27 May 2026', desc: 'Eleventh Board of Directors meeting of the year.', img: '/images/gallery/Group1/Album153952/BOD06062026084544PM.jpeg' },
  { title: 'Charter Day Celebration', date: '23 May 2026', desc: '36th Charter Day of RC Thane Hills.', img: '/images/gallery/Group1/Album145966/CHARTER226052026105223AM.jpeg' },
  { title: 'Club Meeting with Recognitions', date: '14 May 2026', desc: 'Member recognition gathering.', img: '/images/gallery/Group1/Album142833/CLUB_MEETING_14TH_MAY_217052026051035PM.jpeg' },
  { title: 'Rotary Action Group D3142 Chapter Launch', date: '08 May 2026', desc: 'Completed the administrative process for forming the new chapter.', img: '/images/gallery/Group1/Album142837/RAG_MHI_217052026051810PM.jpg' },
  { title: 'Club Meeting & Guest Speaker from IDBI', date: '07 May 2026', desc: 'Team IDBI provided insights about preparing a will.', img: '/images/gallery/Group1/Album142832/IDBI_TEAM_117052026050841PM.jpeg' },
  { title: 'Club Meeting & New Member Induction', date: '30 Apr 2026', desc: 'New member induction followed by a Salsa workshop.', img: '/images/gallery/Group1/Album142828/SALSA_WORSHOP_217052026045910PM.JPG' },
  { title: 'Vocational Excellence Awards', date: '25 Apr 2026', desc: 'Recognising the work and contribution of citizens from different fields.', img: '/images/gallery/Group1/Album142817/VEA_217052026045306PM.jpg' },
  { title: 'Festivals of India Celebration', date: '18 Apr 2026', desc: 'Celebrating festivals of India with music, dance and food.', img: '/images/gallery/Group1/Album142815/TAMIL_NEW_YEAR_BAISAKHI_217052026045033PM.JPG' },
  { title: '10th BOD Meeting', date: '16 Apr 2026', desc: 'Tenth Board of Directors meeting of the year.', img: '/images/gallery/Group1/Album153950/IMG20250717WA007906062026084055PM.jpg' },
  { title: 'Club Meeting with Fellowship', date: '09 Apr 2026', desc: 'Master Chef competition.', img: '/images/gallery/Group1/Album142812/MASTER_CHEF_317052026044305PM.JPG' },
  { title: 'Club Meeting', date: '02 Apr 2026', desc: 'Panel discussion about the journey of RC Thane Hills over three decades.', img: '/images/gallery/Group1/Album142801/2nd_APRIL_CLUB_MEETING17052026042550PM.jpeg' },
  { title: 'Regular Meeting with Guest Speaker', date: '26 Mar 2026', desc: 'Dr. Khushboo Taori shared her experience working with the municipality.', img: '/images/gallery/Group1/Album122034/WhatsApp_Image_20260331_at_15.09.0701042026035646PM.jpeg' },
  { title: 'Festival Celebration', date: '21 Mar 2026', desc: 'Hillers celebrated Gudi Padwa along with Ugadi and Cheti Chand.', img: '/images/gallery/Group1/Album122031/WhatsApp_Image_20260322_at_10.21.45_101042026035453PM.jpeg' },
  { title: '9th BOD Meeting', date: '16 Mar 2026', desc: 'Ninth Board of Directors meeting, held online.', img: '/images/gallery/Group1/Album124625/WhatsApp_Image_20260126_at_8.17.43_PM05042026103646PM.jpeg' },
  { title: 'Regular Club Meeting with Rotaract', date: '12 Mar 2026', desc: 'Vibrant energy of youth with new ideas to engage members.', img: '/images/gallery/Group1/Album122028/WhatsApp_Image_20260312_at_22.32.5001042026035119PM.jpeg' },
  { title: "Women's Day Celebration", date: '08 Mar 2026', desc: 'Recognised women leaders from partners in service with a panel discussion.', img: '/images/gallery/Group1/Album122018/WhatsApp_Image_20260401_at_15.29.25_101042026034258PM.jpeg' },
  { title: 'Holi Celebration', date: '03 Mar 2026', desc: 'Celebrating the festival of colours along with Hillers.', img: '/images/gallery/Group1/Album122019/WhatsApp_Image_20260330_at_16.59.01_101042026034423PM.jpeg' },
  { title: 'Club Assembly', date: '26 Feb 2026', desc: 'Club assembly gathering.', img: '/images/gallery/Group1/Album111124/WhatsApp_Image_20260226_at_11.47.03_PM05032026092932PM.jpeg' },
]

// Community-Service projects (CP).
const communityProjects = [
  { title: 'Mee Saksham - District Thrust Area', date: '06 Jun 2026', desc: "Supporting women's self-help groups through micro-finance and market access.", img: '/images/gallery/Group1/Album153764/SHG_DISTRICT_EVENT06062026041245PM.jpeg' },
  { title: 'Project Restore', date: '04 Jun 2026', desc: 'Repair and rectification of an old check dam constructed in 2016, with side wings.', img: '/images/gallery/Group1/Album152252/KARVELE_CHECK_DAM104062026052535PM.jpeg' },
  { title: 'Global Grant for Pediatric Heart Surgeries', date: '31 May 2026', desc: 'Funding initiative for pediatric cardiac surgical procedures.', img: '/images/gallery/Group1/Album149491/GG131052026051231PM.jpeg' },
  { title: 'Cataract Surgeries', date: '31 May 2026', desc: 'MOU signed with Dr Wavikar Eye Hospital and Institute for cataract surgeries.', img: '/images/gallery/Group1/Album149463/WAVIKAR_MOU_131052026044106PM.jpeg' },
  { title: 'Pediatric Heart Surgery', date: '31 May 2026', desc: 'Conducting pediatric heart surgeries at Jupiter Hospital.', img: '/images/gallery/Group1/Album149461/JUPITER_MOU331052026043553PM.jpeg' },
  { title: 'Ann Daan', date: '16 May 2026', desc: 'Providing grocery and daily-need items to the poor and blind.', img: '/images/gallery/Group1/Album143052/Ann_daan__418052026121906PM.jpg' },
  { title: 'Ann Daan', date: '17 Apr 2026', desc: 'Providing grocery and daily-need items to the poor and blind.', img: '/images/gallery/Group1/Album143050/ANN_DAAN__16TH_MAY_202618052026121610PM.jpeg' },
  { title: 'HPV Vaccination', date: '30 Mar 2026', desc: 'Administration of the second dose to 136 girl beneficiaries.', img: '/images/gallery/Group1/Album122045/WhatsApp_Image_20260331_at_14.57.0701042026040118PM.jpeg' },
  { title: 'Annapoorna - Anna Daan', date: '18 Mar 2026', desc: 'Providing grocery and provisions to blind persons.', img: '/images/gallery/Group1/Album122050/WhatsApp_Image_20260321_at_17.12.3401042026040447PM.jpeg' },
  { title: 'Happy Street Carnival', date: '22 Feb 2026', desc: 'Organising a Sunday-morning fun fair and carnival.', img: '/images/gallery/Group1/Album107195/HAPPY_STREET126022026020555PM.jpeg' },
  { title: 'Annapoorna - Anna Daan', date: '17 Feb 2026', desc: 'Providing grocery and provisions to the blind.', img: '/images/gallery/Group1/Album122056/WhatsApp_Image_20260321_at_17.05.1101042026040852PM.jpeg' },
  { title: 'Eco Quiz', date: '24 Jan 2026', desc: 'Organised a quiz on ecology and environment awareness.', img: '/images/gallery/Group1/Album143075/ECO_QUIZ__218052026125052PM.jpg' },
  { title: 'Aanapoorna', date: '18 Jan 2026', desc: 'Distribution of groceries to the blind.', img: '/images/gallery/Group1/Album94717/WhatsApp_Image_20260126_at_7.59.43_PM26012026080706PM.jpeg' },
  { title: 'Triumph Run and Carnival', date: '04 Jan 2026', desc: 'Triumph Run and Carnival community event.', img: '/images/gallery/Group1/Album94749/triumph26012026090943PM.jpeg' },
  { title: 'Triumph Run and Carnival', date: '04 Jan 2026', desc: 'Wholesome entertainment and engagement for special kids.', img: '/images/gallery/Group1/Album144479/TRC_321052026044528PM.jpg' },
  { title: 'Aanapoorna', date: '20 Dec 2025', desc: 'Distribution of groceries to the blind.', img: '/images/gallery/Group1/Album94713/ANNPOORNA26012026075724PM.jpg' },
  { title: 'Aanadan to Blind', date: '20 Nov 2025', desc: 'Distribution of groceries to the blind.', img: '/images/gallery/Group1/Album92164/IMG20250724WA002016012026040114PM.jpg' },
  { title: 'Susauwaad - A Dialogue for Change', date: '15 Nov 2025', desc: 'Panel discussion about citizen issues and urban challenges.', img: '/images/gallery/Group1/Album144481/SUSAUWAAD21052026045031PM.jpg' },
  { title: 'Between the Covers', date: '08 Nov 2025', desc: 'Contest for school students to inculcate the habit of reading.', img: '/images/gallery/Group1/Album144465/BETWEEN_THE_COVER521052026042213PM.jpg' },
  { title: 'Thane Literature Festival', date: '01 Nov 2025', desc: 'First edition of the Thane Literature Festival.', img: '/images/gallery/Group1/Album69049/TLF_221112025034801PM.jpg' },
  { title: 'Annapoorna', date: '19 Oct 2025', desc: 'Aanadan distribution of groceries to the visually challenged.', img: '/images/gallery/Group1/Album62999/WhatsApp_Image_20251019_at_10.54.53_AM05112025090204PM.jpeg' },
  { title: 'Right to Go', date: '11 Oct 2025', desc: 'Constructing toilets for schools.', img: '/images/gallery/Group1/Album144456/ZP_Toilet__421052026040950PM.jpg' },
  { title: 'HPV Vaccination', date: '01 Oct 2025', desc: 'HPV vaccination at Shahu Maharaj Vidyalaya, Rabale.', img: '/images/gallery/Group1/Album47371/WhatsApp_Image_20251001_at_7.59.33_PM02102025022208PM.jpeg' },
  { title: 'HPV Vaccination', date: '28 Sep 2025', desc: 'HPV vaccination camp at Village Chinchale, Taluka Dahanu, Dist. Palghar.', img: '/images/gallery/Group1/Album47368/WhatsApp_Image_20250928_at_5.50.38_PM02102025021744PM.jpeg' },
  { title: 'Aanadan', date: '21 Sep 2025', desc: 'Distribution of groceries to the visually challenged.', img: '/images/gallery/Group1/Album47361/WhatsApp_Image_20250922_at_8.00.40_AM02102025021141PM.jpeg' },
  { title: 'Educational App Distribution', date: '18 Sep 2025', desc: 'Educational app distribution to 10th-standard students at a TMC school.', img: '/images/gallery/Group1/Album47356/WhatsApp_Image_20250918_at_4.30.58_PM02102025020511PM.jpeg' },
  { title: 'Education App Distribution', date: '10 Sep 2025', desc: 'Alternate methods for exam preparation for 10th-standard students.', img: '/images/gallery/Group1/Album144472/EDUCATION_APP_DISTRIBUTION_221052026043009PM.jpg' },
  { title: 'Educational App Distribution', date: '23 Aug 2025', desc: 'Ideal Education app distribution to 10th-standard students.', img: '/images/gallery/Group1/Album35201/WhatsApp_Image_20250905_at_5.32.17_PM05092025103557PM.jpeg' },
  { title: 'Aanapurna', date: '23 Aug 2025', desc: 'Grocery kits distributed to 1000 blind persons.', img: '/images/gallery/Group1/Album33767/WhatsApp_Image_20250823_at_1.00.05_PM04092025042941PM.jpeg' },
  { title: 'Ganapati Idol Making Workshop', date: '07 Aug 2025', desc: 'Idol-making workshop organised for special children.', img: '/images/gallery/Group1/Album33756/WhatsApp_Image_20250808_at_11.20.50_AM04092025041834PM.jpeg' },
  { title: 'Tree Plantation', date: '27 Jul 2025', desc: 'Tree plantation drive at Rabale MIDC, Navi Mumbai, planting 50 saplings.', img: '/images/gallery/Group1/Album15678/TREE_PLANTATION_27TH_JULY04082025113554PM.jpeg' },
  { title: 'Annapoorna', date: '24 Jul 2025', desc: 'Grocery kits distributed to 1000 blind persons.', img: '/images/gallery/Group1/Album15670/ANNAPORNA_24TH_JULY04082025113100PM.jpeg' },
  { title: 'School Bag & Material Distribution', date: '20 Jul 2025', desc: 'School bags and educational material distributed to 767 students in Nasik.', img: '/images/gallery/Group1/Album15650/NASIK_PROJECT_20TH_JULY04082025112216PM.jpeg' },
  { title: 'Blood Donation Camp', date: '18 Jul 2025', desc: 'Blood donation camp held at the Luna Technologies office, Navi Mumbai.', img: '/images/gallery/Group1/Album15637/BLOOD_DONATION_LUNA_04082025111519PM.jpeg' },
  { title: 'Mobile Addiction Awareness', date: '15 Jul 2025', desc: 'Awareness session on mobile addiction at R S Deokar School.', img: '/images/gallery/Group1/Album15633/MOBILE_ADDITION_18_JULY04082025111142PM.jpeg' },
  { title: 'HPV Vaccination', date: '12 Jul 2025', desc: 'HPV vaccination camp at Amarnath School, Govandi and AFAC.', img: '/images/gallery/Group1/Album15622/IMG20250711WA016205082025040720PM.jpg' },
  { title: 'HPV Vaccination', date: '11 Jul 2025', desc: 'HPV vaccination camp at a TMC school, Kisan Nagar, Thane, for 124 girls.', img: '/images/gallery/Group1/Album15615/HPV_VACCINATION__11TH_JULY04082025110209PM.jpeg' },
  { title: 'School Bag & Material Distribution', date: '05 Jul 2025', desc: 'School material distributed to 165 students at Navjeevan School.', img: '/images/gallery/Group1/Album15591/SCHOOL_BAG_DISTRIBUTION__NAVJEEVAN__SCHOOL_5TH_JUL04082025104640PM.jpeg' },
  { title: 'School Bag & Material Distribution', date: '05 Jul 2025', desc: 'School bags and material distributed to 60 students at Signal School.', img: '/images/gallery/Group1/Album15596/SCHOOL_BAG_DISTRIBUTION__SIGNAL_SCHOOL_5TH_JULY04082025104949PM.jpeg' },
  { title: 'Gynaecological Health Awareness', date: '05 Jul 2025', desc: 'Awareness session on gynaecological health, nutrition and cervical cancer.', img: '/images/gallery/Group1/Album15601/AWARNESS_SECTION_5TH_JULY04082025105451PM.jpeg' },
  { title: 'Blood Donation Camp', date: '05 Jul 2025', desc: 'Blood donation camp at Vasant Vihar Club House, collecting 20 units.', img: '/images/gallery/Group1/Album15569/BLOOD_DONATION_VASANT_VIHAR_104082025102919PM.jpeg' },
]

// Vocational, International and Public-Image projects.
const vocationalProjects = [
  { title: 'Vocational Excellence Awards', date: '25 Apr 2026', desc: 'Recognising the professional excellence of selected personalities from various fields.', img: '/images/gallery/Group1/Album136723/VEA_103052026092738PM.jpg' },
]
const internationalProjects = [
  { title: 'International Friendship Exchange', date: '31 May 2026', desc: 'Hosted visiting Rotarians from Canada as part of the International Friendship Exchange.', img: '/images/gallery/Group1/Album149437/INTERNATIONAL_FRIENDSHIP_HOST31052026041415PM.jpeg' },
  { title: 'RAG Mental Health Initiative', date: '08 May 2026', desc: 'Formation of the Rotary Action Group Mental Health Initiative for RID 3142.', img: '/images/gallery/Group1/Album136725/RAG_MHI__103052026093211PM.jpeg' },
]
const publicImageProjects = [
  { title: 'Triumph Run and Carnival', date: '04 Jan 2026', desc: 'Outdoor hoarding advertising in Thane promoting the Triumph Run and Carnival.', img: '/images/gallery/Group1/Album143273/OUTDOOR_MEDIA__TRIUMPH_RUN_AND_CARNIVAL18052026044822PM.jpeg' },
  { title: 'Thane Dialogue - Panel Discussion', date: '15 Nov 2025', desc: 'Panel discussion addressing issues of urban living and possibilities.', img: '/images/gallery/Group1/Album69060/SUSAUWAAD21112025040620PM.jpg' },
  { title: 'Thane Literature Festival', date: '01 Nov 2025', desc: 'Hindustan Times coverage of the first edition of the Thane Literature Festival.', img: '/images/gallery/Group1/Album149449/TLF_NEWSPAPER_COVERAGE_IN_HINDUSTAN_TIMES_16TH_NOV31052026042637PM.jpeg' },
]

// Colour for each project-category pill / filter.
export const projectTagColors = {
  'Community Service': 'bg-blue-500',
  'Club Service': 'bg-emerald-500',
  'Vocational Service': 'bg-amber-500',
  'International Service': 'bg-violet-500',
  'Public Image': 'bg-rose-500',
}

const tag = (list, t) => list.map((p) => ({ ...p, tag: t }))

// Every project across all service avenues, tagged by category. Club Service =
// the club meetings/events list (as organised on the source site).
export const clubProjects = [
  ...tag(communityProjects, 'Community Service'),
  ...tag(clubMeetings, 'Club Service'),
  ...tag(vocationalProjects, 'Vocational Service'),
  ...tag(internationalProjects, 'International Service'),
  ...tag(publicImageProjects, 'Public Image'),
]

// Resolve local asset paths against the deploy base so images load both in dev
// ("/") and under the production sub-path ("/club_website/" on Vercel).
banners.forEach((b, i) => { banners[i] = asset(b) })
advertisements.forEach((a) => { a.img = asset(a.img) })
newsletters.forEach((n) => { n.url = asset(n.url) })
