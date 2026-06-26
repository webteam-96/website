// "Dignitaries of Rotary" profiles — mirrors the live site's diginitary.aspx
// pages reached from the home-page "Know More" / View Profile links.
import { asset } from '../lib/asset'

export const dignitaries = [
  {
    id: 'ri-president',
    name: 'Francesco Arezzo',
    role: 'RI President',
    designation: 'President, Rotary International 2025-26',
    year: '2025-26',
    img: '/images/WebsiteData/International_President/PRESIDENT160620251053175875643AM.png',
    bio: [
      "Francesco Arezzo, a member of the Rotary Club of Ragusa, Italy, has been selected by the Board of Directors to become Rotary International's president for 2025-26. Arezzo will become president on 1 July.",
      'The Board conducted a special session following the unexpected resignation of RI President-elect Mário César Martins de Camargo on 8 June. Guided by the RI code and policies, the Board selected the new president-elect from a pool of candidates who were considered by the Nominating Committee for President of Rotary International in August 2023.',
      'The 2025-26 presidential message, announced at the 2025 Rotary International Assembly in February, will remain Unite for Good, which calls on Rotary members to be a force for unity in a world increasingly divided by politics, geography, and ideology. Through service projects, Rotary brings together people of every background — across races, religions, and professions — in a shared mission to do good in their communities.',
      'Arezzo is an orthodontist in private practice. He is active internationally as a member of the Italian, European, and American orthodontics associations. He is vice president of the National Association of Italian Dentists for the province of Ragusa and was the founder and head for seven years of the delegation for Ragusa of the National Trust for Italy. He is a Knight of Honor and Devotion in Obedience within the Sovereign Order of Malta.',
      'A Rotary member for more than 30 years, Arezzo has served as vice chair of the Joint Strategic Planning Committee and as RI director, learning facilitator, and as district conference presidential representative.',
      'Arezzo is a Benefactor of The Rotary Foundation. He is married to Anna Maria Criscione, an entrepreneur in the tourism field. They have two children.',
    ],
  },
  {
    id: 'district-governor',
    name: 'Harsh V. Makol',
    role: 'District Governor',
    designation: 'District Governor 2025-26',
    year: '2025-26',
    img: '/images/AGDG/GOVERNOR311020250251473497930PM.png',
    bio: [],
  },
  {
    id: 'club-president',
    name: 'Rtn. Samir Limaye',
    role: 'Club President',
    designation: 'Club President',
    year: '2025-26',
    img: '/images/directory/SAMIR_LIMAY28092016111836PM.png',
    bio: [
      'Profession — Director, WIMCO Limited, a fully owned company by ITC Limited. Domain expertise in industrial packaging machines, automation and mechanization. Exposure and expertise in industrial sales & marketing, project management, business strategy, change management, factory operations and resource management. WIMCO provides industrial packaging and mechanization solutions to a variety of segments, with direct engagement across Pharma, Cosmetics, Consumer products, Beverage and Engineering segments.',
      'Education — B.E. Production Engineering, University of Nagpur; Post Graduate in Management, International Management Institute, New Delhi.',
      'Association — Director of the Packaging Machinery Manufacturers Association (IPMMI), Past President IPMMI 2018-20, and Member of the Rotary Club of Thane Hills.',
      'Family — Happily married to Manjiri (B.Com + MA Economics) and a home maker, blessed with two sons. Resides at Thane.',
    ],
    email: 'samir_limaye@rediffmail.com',
    phone: '+91 98200 63775',
  },
  {
    id: 'club-secretary',
    name: 'Rtn. Nilesh Pitale',
    role: 'Club Secretary',
    designation: 'Club Secretary',
    year: '2025-26',
    img: '/images/directory/ContactPhotoRetouching-IMG_20240421_09351021042024094123AM.jpg',
    bio: [],
    phone: '9820063775',
  },
]

// Prefix local dignitary photos with the deploy base (Vercel sub-path).
dignitaries.forEach((d) => { if (d.img) d.img = asset(d.img) })

export const getDignitary = (id) => dignitaries.find((d) => d.id === id)
