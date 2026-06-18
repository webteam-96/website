import type { CalendarEntry } from '../types'

/**
 * Mock dataset, keyed by Rotary year-range (the value chosen in the year
 * selector). In a real deployment this would be fetched from the API; here it
 * lets the page render fully without a backend.
 *
 * Birthdays & anniversaries recur every year, so only the day/month matters for
 * the calendar markers — the year is kept on the current Rotary year for tidy
 * "DD-MM" display. Events are date-specific.
 */
export const mockEntries: Record<string, CalendarEntry[]> = {
  '2025-2026': [
    // ---- Birthdays ----
    { id: 'b1', name: 'Satish Tukaram Jadhav', date: '2026-06-01', type: 'birthday', clubName: 'RC Kolhapur' },
    { id: 'b2', name: 'Satyawan Madhukar Hake', date: '2026-06-03', type: 'birthday', clubName: 'RC Sangli' },
    { id: 'b3', name: 'Rajgonda Nemgonda Patil', date: '2026-06-05', type: 'birthday', clubName: 'RC Ichalkaranji' },
    { id: 'b4', name: 'Bhimgonda Kallappa Borgave', date: '2026-06-08', type: 'birthday', clubName: 'RC Miraj' },
    { id: 'b5', name: 'Kondiba Sakharam Jadhav', date: '2026-06-12', type: 'birthday', clubName: 'RC Karad' },
    { id: 'b6', name: 'Prakash Anna Patil', date: '2026-06-17', type: 'birthday', clubName: 'RC Satara' },
    { id: 'b7', name: 'Vishal Dattatray More', date: '2026-06-21', type: 'birthday', clubName: 'RC Kolhapur Mid Town' },
    { id: 'b8', name: 'Sanjay Ramchandra Pawar', date: '2026-06-26', type: 'birthday', clubName: 'RC Sangli Riverside' },

    // ---- Anniversaries ----
    { id: 'a1', name: 'Chandrakant A. Rajmane', date: '2026-06-02', type: 'anniversary', clubName: 'RC Kolhapur' },
    { id: 'a2', name: 'Roshan V. Jejurikar', date: '2026-06-04', type: 'anniversary', clubName: 'RC Sangli' },
    { id: 'a3', name: 'Akshay Raju Wadekar', date: '2026-06-06', type: 'anniversary', clubName: 'RC Miraj' },
    { id: 'a4', name: 'Nagaraj Amareshwar Charantimath', date: '2026-06-10', type: 'anniversary', clubName: 'RC Karad' },
    { id: 'a5', name: 'Ramdas Datta Khatal', date: '2026-06-15', type: 'anniversary', clubName: 'RC Satara' },
    { id: 'a6', name: 'Mahesh & Sunita Deshpande', date: '2026-06-17', type: 'anniversary', clubName: 'RC Ichalkaranji' },
    { id: 'a7', name: 'Anil Kumar Shinde', date: '2026-06-24', type: 'anniversary', clubName: 'RC Karad' },

    // ---- Events ----
    // Empty by default to mirror the "No Data Found..!" state in the design.
    // Add CalendarEntry objects with type 'event' here to populate the card.
  ],
  '2024-2025': [],
  '2026-2027': [],
}
