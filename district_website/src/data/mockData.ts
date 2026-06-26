import type { CalendarEntry } from '../types'

/**
 * Real special-dates data scraped from the original district site
 * (rid3170.rotaryindia.org/AllSpecialDates.aspx), June listing. The source
 * shows two sections — Birthdays and Anniversaries — each with only a Name and
 * a "DD-MM" date (no club column). The Events section shows "No Data Found..!",
 * so events are intentionally empty here.
 *
 * Keyed by Rotary year-range (the value chosen in the year selector). Birthdays
 * & anniversaries recur every year, so only the day/month matters; the dates are
 * seeded under 2026 purely for tidy "DD-MM" display and calendar markers.
 */
export const mockEntries: Record<string, CalendarEntry[]> = {
  '2025-2026': [
    // ---- Birthdays (June) ----
    { id: 'b1', name: 'Satish Tukaram Jadhav', date: '2026-06-01', type: 'birthday' },
    { id: 'b2', name: 'Satyawan Madhukar Hake', date: '2026-06-01', type: 'birthday' },
    { id: 'b3', name: 'Rajgonda Nemgonda Patil', date: '2026-06-01', type: 'birthday' },
    { id: 'b4', name: 'Bhimgonda Kallappa Borgave', date: '2026-06-01', type: 'birthday' },
    { id: 'b5', name: 'Kondiba Sakharan Jankar', date: '2026-06-01', type: 'birthday' },
    { id: 'b6', name: 'Chandrakant A. Rajmane', date: '2026-06-01', type: 'birthday' },
    { id: 'b7', name: 'Mahadev S Giddoli', date: '2026-06-01', type: 'birthday' },
    { id: 'b8', name: 'Chrispanus G', date: '2026-06-01', type: 'birthday' },
    { id: 'b9', name: 'Er Vipul Sureshchandra Shah', date: '2026-06-01', type: 'birthday' },
    { id: 'b10', name: 'Prakash Jivandhar Admuthe', date: '2026-06-01', type: 'birthday' },
    { id: 'b11', name: 'Chandrashekar Shivappa Bagewadi', date: '2026-06-01', type: 'birthday' },
    { id: 'b12', name: 'Damodar Varma', date: '2026-06-01', type: 'birthday' },
    { id: 'b13', name: 'Shantinath M. Gubachi', date: '2026-06-01', type: 'birthday' },
    { id: 'b14', name: 'Mahantesh Narasanagoudra', date: '2026-06-01', type: 'birthday' },
    { id: 'b15', name: 'Ananda Pandurang Madhav', date: '2026-06-01', type: 'birthday' },
    { id: 'b16', name: 'Sharad Keshavrao Desai', date: '2026-06-01', type: 'birthday' },
    { id: 'b17', name: 'NandiniPatodia', date: '2026-06-01', type: 'birthday' },
    { id: 'b18', name: 'Shakir Hussain Tahir', date: '2026-06-01', type: 'birthday' },
    { id: 'b19', name: 'Dadagouda S. Patil', date: '2026-06-01', type: 'birthday' },
    { id: 'b20', name: 'Deelipkumar M. Pujari', date: '2026-06-01', type: 'birthday' },
    { id: 'b21', name: 'Dhareppagouda Biradar', date: '2026-06-01', type: 'birthday' },
    { id: 'b22', name: 'Dr. Raveendra Madaraki', date: '2026-06-01', type: 'birthday' },
    { id: 'b23', name: 'Guralingappa Dundappa Angadi', date: '2026-06-01', type: 'birthday' },
    { id: 'b24', name: 'Pundalik Mallappa Vannur', date: '2026-06-01', type: 'birthday' },
    { id: 'b25', name: 'Ishwar Siddappa Shigihalli', date: '2026-06-01', type: 'birthday' },
    { id: 'b26', name: 'Chandrashekhar Chambanna Kadewadi', date: '2026-06-01', type: 'birthday' },
    { id: 'b27', name: 'Ashokrao Kondiram Mane', date: '2026-06-01', type: 'birthday' },
    { id: 'b28', name: 'Mohan Shantaram Taggarsi', date: '2026-06-01', type: 'birthday' },
    { id: 'b29', name: 'Rachayya S. Warikalmath', date: '2026-06-01', type: 'birthday' },
    { id: 'b30', name: 'Vimal Bhandari', date: '2026-06-01', type: 'birthday' },
    { id: 'b31', name: 'Deepak K Shetty', date: '2026-06-01', type: 'birthday' },
    { id: 'b32', name: 'Chandrashekhar V Mudgal', date: '2026-06-01', type: 'birthday' },
    { id: 'b33', name: 'Nagnath Ambaji Basude', date: '2026-06-01', type: 'birthday' },
    { id: 'b34', name: 'Rama D. Naik', date: '2026-06-01', type: 'birthday' },
    { id: 'b35', name: 'Manish Damodar Salkar', date: '2026-06-01', type: 'birthday' },
    { id: 'b36', name: 'Bhalchandra Babgonda Patil', date: '2026-06-01', type: 'birthday' },
    { id: 'b37', name: 'Sanjay Raghunath Patil', date: '2026-06-01', type: 'birthday' },
    { id: 'b38', name: 'Mahesh Yashwant Patil', date: '2026-06-01', type: 'birthday' },
    { id: 'b39', name: 'Anil Maruti Jadhav', date: '2026-06-01', type: 'birthday' },
    { id: 'b40', name: 'Tanaji Ambaji Salunkhe', date: '2026-06-01', type: 'birthday' },
    { id: 'b41', name: 'Chandrakant Jagannath Shinde', date: '2026-06-01', type: 'birthday' },
    { id: 'b42', name: 'Prof. Sadashiv Tukaram Bhendwade', date: '2026-06-01', type: 'birthday' },
    { id: 'b43', name: 'Mohanlal Sogaji Gehlot', date: '2026-06-01', type: 'birthday' },
    { id: 'b44', name: 'Shridhar M. Hegde', date: '2026-06-01', type: 'birthday' },
    { id: 'b45', name: 'Subhash M. Japhale', date: '2026-06-01', type: 'birthday' },
    { id: 'b46', name: 'Tanajirao Bhanudas Borade', date: '2026-06-01', type: 'birthday' },
    { id: 'b47', name: 'Balasaheb Abasaheb Aware', date: '2026-06-01', type: 'birthday' },
    { id: 'b48', name: 'Somalingappa C Jakati', date: '2026-06-01', type: 'birthday' },
    { id: 'b49', name: 'Bapuso Ganpati Gangdhar', date: '2026-06-01', type: 'birthday' },
    { id: 'b50', name: 'Sunil Mohan Bagadi', date: '2026-06-01', type: 'birthday' },

    // ---- Anniversaries (June) ----
    { id: 'a1', name: 'Chandrakant A. Rajmane', date: '2026-06-01', type: 'anniversary' },
    { id: 'a2', name: 'Rushabh V Jaju', date: '2026-06-01', type: 'anniversary' },
    { id: 'a3', name: 'Akshay Raju Wadekar', date: '2026-06-01', type: 'anniversary' },
    { id: 'a4', name: 'Nagayya. Annadanayya Charantimath', date: '2026-06-01', type: 'anniversary' },
    { id: 'a5', name: 'Ramdas Dattu Khatal', date: '2026-06-01', type: 'anniversary' },
    { id: 'a6', name: 'Dr. Laxmi Pattan', date: '2026-06-01', type: 'anniversary' },
    { id: 'a7', name: 'Dilip Vinayakrao Rampurkar', date: '2026-06-01', type: 'anniversary' },
    { id: 'a8', name: 'Dipti Dilip Rampurkar', date: '2026-06-01', type: 'anniversary' },
    { id: 'a9', name: 'UdayB.Sardesai', date: '2026-06-01', type: 'anniversary' },
    { id: 'a10', name: 'Sharad Shrinivas Pai', date: '2026-06-02', type: 'anniversary' },
    { id: 'a11', name: 'Indranil Shrikant Chougule', date: '2026-06-02', type: 'anniversary' },
    { id: 'a12', name: 'Vijayraj Jaypal Magdum', date: '2026-06-02', type: 'anniversary' },
    { id: 'a13', name: 'Kiran B Hebsur', date: '2026-06-02', type: 'anniversary' },
    { id: 'a14', name: 'Nilesh Loliencar', date: '2026-06-02', type: 'anniversary' },
    { id: 'a15', name: 'Narahar Ghanashyam Thakur', date: '2026-06-02', type: 'anniversary' },
    { id: 'a16', name: 'Vijay Priyolker', date: '2026-06-02', type: 'anniversary' },
    { id: 'a17', name: 'Sameer Ratnakar Kapadi', date: '2026-06-02', type: 'anniversary' },
    { id: 'a18', name: 'Er.vinayak Sheshagiri Shet', date: '2026-06-02', type: 'anniversary' },
    { id: 'a19', name: 'Rajendra N. Patil', date: '2026-06-02', type: 'anniversary' },
    { id: 'a20', name: 'Sumit Sanjay Munot', date: '2026-06-02', type: 'anniversary' },
    { id: 'a21', name: 'Subhash Gundappa Kutte', date: '2026-06-02', type: 'anniversary' },
    { id: 'a22', name: 'Deepak Anvekar', date: '2026-06-02', type: 'anniversary' },
    { id: 'a23', name: 'Vasudev V. Deshingkar', date: '2026-06-02', type: 'anniversary' },
    { id: 'a24', name: 'Shreevalli Hebsur', date: '2026-06-02', type: 'anniversary' },
    { id: 'a25', name: 'Narsinha Shamkant Kanekar', date: '2026-06-02', type: 'anniversary' },
    { id: 'a26', name: 'Makarand Madhusudan Karmarkar', date: '2026-06-03', type: 'anniversary' },
    { id: 'a27', name: 'Akhil Anil Samani', date: '2026-06-03', type: 'anniversary' },
    { id: 'a28', name: 'Amit Padamchand Chordiya', date: '2026-06-03', type: 'anniversary' },
    { id: 'a29', name: 'Shrinivas Vishnu Dhabade', date: '2026-06-03', type: 'anniversary' },
    { id: 'a30', name: 'Sharad Keshavrao Desai', date: '2026-06-03', type: 'anniversary' },

    // ---- Events ----
    // Original AllSpecialDates.aspx / DistrictEvents.aspx show "No Data Found..!".
  ],
  '2024-2025': [],
  '2026-2027': [],
}
