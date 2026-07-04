// Single source of truth for all gym facts. Edit here, not in components.

export const site = {
  name: "True Virtues Jiu Jitsu",
  tagline: "Brazilian Jiu Jitsu in Wimbledon",
  url: "https://www.truevirtuesjiujitsu.com",
  email: "truevirtuesjiujitsu@gmail.com",
  phone: "07947 606137",
  phoneHref: "tel:+447947606137",
  instagram: "truevirtuesjiujitsuacademy",
  instagramUrl: "https://www.instagram.com/truevirtuesjiujitsuacademy",
  address: {
    venue: "YMCA Wimbledon",
    street: "198 The Broadway",
    locality: "Wimbledon, London",
    postcode: "SW19 1RY",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=True+Virtues+Brazilian+Jiu+Jitsu+Wimbledon",
  },
  travel: [
    "8 min walk from Wimbledon Station",
    "10 min walk from South Wimbledon (Northern line)",
    "Street parking free after 18:30",
  ],
  coach: {
    name: "Mike Buckman-Cowling",
    rank: "1st Degree Black Belt",
    experience: "14+ years coaching experience",
  },
  googleRating: { score: "5.0", count: 31 },
};

// All standalone pages, used for the footer sitemap nav and sitemap.xml.
export const sitePages = [
  { href: "/classes", label: "Classes" },
  { href: "/bjj-classes-wimbledon", label: "Gi Jiu Jitsu" },
  { href: "/no-gi-jiu-jitsu-wimbledon", label: "No-Gi Jiu Jitsu" },
  { href: "/womens-jiu-jitsu-wimbledon", label: "Women's Jiu Jitsu" },
  { href: "/junior-jiu-jitsu", label: "Junior Jiu Jitsu" },
  { href: "/membership", label: "Membership" },
  { href: "/seminars-and-events", label: "Seminars & Events" },
  { href: "/about-us", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact-us", label: "Contact" },
  { href: "/legal", label: "Legal" },
  { href: "/ukbjja-policies", label: "UKBJJA Policies" },
] as const;

export const programs = [
  {
    id: "gi",
    name: "Fundamentals (Gi)",
    audience: "Adults 16+ · All levels",
    description:
      "The traditional art in the gi: grips, leverage and technical precision. Mixed-ability classes where beginners are paired with experienced training partners — you will never be thrown in at the deep end.",
    highlight: "Best first class for most beginners",
    image: null,
    href: "/bjj-classes-wimbledon",
  },
  {
    id: "nogi",
    name: "Fundamentals (No-Gi)",
    audience: "Adults 16+ · Thursdays",
    description:
      "Faster-paced submission grappling in shorts and a rash guard. Huge crossover with wrestling and MMA. No gi required — just sportswear.",
    highlight: "No uniform needed",
    image: null,
    href: "/no-gi-jiu-jitsu-wimbledon",
  },
  {
    id: "womens",
    name: "Women's Jiu Jitsu",
    audience: "Women only · Thursday evenings",
    description:
      "A women-only class covering practical self-defence and BJJ fundamentals in a focused, respectful environment. Coached to your pace, with training partners of similar size and experience.",
    highlight: "Trial available",
    image: {
      src: "/womens-class.jpg",
      alt: "Group photo of women training at True Virtues Jiu Jitsu Wimbledon",
    },
    href: "/womens-jiu-jitsu-wimbledon",
  },
  {
    id: "juniors",
    name: "Junior Jiu Jitsu",
    audience: "Ages 8–15 · Tuesdays & Saturdays",
    description:
      "Small, structured classes built around technical development and the Seven Virtues: discipline, respect and confidence that carries over to school and home.",
    highlight: "Trial available",
    image: {
      src: "/juniors-class.jpg",
      alt: "Coach Mike Buckman-Cowling training with a student from the Junior class",
    },
    href: "/junior-jiu-jitsu",
  },
] as const;

// Times published on truevirtuesjiujitsu.com (class banners + programme
// pages), correct as of July 2026. day: 0=Sun … 6=Sat, times are 24h "HH:MM".
export const timetable = [
  { day: 2, dayName: "Tuesday", start: "17:45", end: "18:45", className: "Junior Jiu Jitsu", programId: "juniors", type: "Ages 8–15", bookable: true },
  { day: 2, dayName: "Tuesday", start: "19:00", end: "21:00", className: "Fundamentals (Gi)", programId: "gi", type: "Adults", bookable: true },
  { day: 2, dayName: "Tuesday", start: "21:00", end: "21:30", className: "Open Mat", programId: "gi", type: "Members", bookable: false },
  { day: 4, dayName: "Thursday", start: "18:00", end: "19:00", className: "Women's Jiu Jitsu", programId: "womens", type: "Women only", bookable: true },
  { day: 4, dayName: "Thursday", start: "19:00", end: "21:00", className: "Fundamentals (No-Gi)", programId: "nogi", type: "Adults", bookable: true },
  { day: 4, dayName: "Thursday", start: "21:00", end: "21:30", className: "Open Mat", programId: "nogi", type: "Members", bookable: false },
  { day: 6, dayName: "Saturday", start: "11:00", end: "12:00", className: "Junior Jiu Jitsu", programId: "juniors", type: "Ages 8–15", bookable: true },
  { day: 6, dayName: "Saturday", start: "12:15", end: "13:45", className: "Fundamentals (Gi)", programId: "gi", type: "Adults", bookable: true },
  { day: 6, dayName: "Saturday", start: "13:45", end: "14:15", className: "Open Mat", programId: "gi", type: "Members", bookable: false },
] as const;

export type TimetableEntry = (typeof timetable)[number];

// Pulled from the academy's Google Maps listing (5.0★, 31 reviews).
export const reviews = [
  {
    name: "Danny R",
    when: "Google review",
    text: "I've been training at TVJJ for around five months and, having trained at several different academies over the years, this has been one of the most positive training environments I've experienced.",
  },
  {
    name: "Stan Ruta",
    when: "Google review",
    text: "A top notch school with a top notch instructor. Mike is a heck of a nice guy and a gifted instructor — he breaks down complex ideas into simple concepts.",
  },
  {
    name: "Ben Austen",
    when: "Google review",
    text: "A fantastic place to train. Convenient location, great facilities and lovely people! The whole team were friendly and welcoming, and Mike is clearly a talented coach.",
  },
  {
    name: "Google reviewer",
    when: "Google review",
    text: "Wonderful instructor Mike and great place, very good for beginners.",
  },
] as const;

export const pricing = {
  trial: {
    name: "Trial Class",
    price: "",
    features: [
      "Try any beginner-friendly class",
      "Loan gi available — just bring sportswear",
      "Meet the coach and the team",
      "Zero obligation, zero pressure",
    ],
  },
  tiers: [
    {
      name: "Basic",
      price: "£70",
      period: "/month",
      features: ["1 class per week", "Online curriculum access", "1 free month freeze per year"],
      featured: false,
    },
    {
      name: "Pro",
      price: "£100",
      period: "/month",
      features: [
        "2 classes per week",
        "Online curriculum access",
        "Free grading events",
        "1 free month freeze per year",
      ],
      featured: true,
    },
    {
      name: "Elite",
      price: "£120",
      period: "/month",
      features: [
        "Unlimited classes",
        "Online curriculum access",
        "Free grading events",
        "1 free month freeze per year",
      ],
      featured: false,
    },
  ],
  specialist: [
    { name: "Women's Jiu Jitsu", price: "£60/month", note: "1 women-only class weekly + gradings" },
    { name: "Junior Jiu Jitsu", price: "£60/month", note: "1 class weekly + gradings" },
    { name: "Pay-per-class", price: "£20/session", note: "No commitment at all" },
  ],
};

export const faqs = [
  {
    q: "Is BJJ for me if I've never done any martial art?",
    a: "Yes — most of our members walked in having never trained anything. Every class is coached step by step, you're paired with helpful partners, and nobody expects you to know a single move on day one. Absolute beginners are the people we built this academy for.",
  },
  {
    q: "Do I need to get fit before I start?",
    a: "No. You don't get fit to do Jiu Jitsu — you do Jiu Jitsu to get fit. BJJ uses movement patterns no gym machine replicates, so the only way to build 'BJJ fitness' is on the mats. Go at your own pace; resting out a round is completely normal.",
  },
  {
    q: "Do you do a women's class?",
    a: "Yes. We run a dedicated women-only class every Thursday from 18:00 to 19:00, covering practical self-defence and BJJ fundamentals in a focused, respectful environment. You can book your first women's class as a trial, and many members also train in the mixed adult classes when they're ready.",
  },
  {
    q: "Do you compete?",
    a: "Yes — members who want to compete get full support with competition-focused coaching, and we regularly attend UK tournaments as a team. But competing is completely optional: most members train for fitness, self-defence and fun, and there is zero pressure to step on a competition mat.",
  },
  {
    q: "Am I too old to start?",
    a: "No. BJJ is built on leverage and technique rather than strength or athleticism, which is exactly why people start in their 30s, 40s and 50s. We pair you with suitable partners and adjust the pace to you.",
  },
  {
    q: "What do I wear to my first class?",
    a: "Comfortable sports clothing with no zips, buttons or loops — a t-shirt and shorts or leggings is perfect. You don't need a gi to start; we can arrange a loaner. Bring water and flip-flops for off the mats.",
  },
  {
    q: "Is Jiu Jitsu dangerous?",
    a: "BJJ is considerably safer than striking arts — there are no punches or kicks. You learn to 'tap' from your very first lesson, training intensity is matched to your level, and beginners are never thrown in with full-intensity sparring.",
  },
  {
    q: "Where exactly are you, and is there parking?",
    a: "We train at YMCA Wimbledon, 198 The Broadway, SW19 1RY — 8 minutes' walk from Wimbledon Station and 10 from South Wimbledon tube. Street parking restrictions lift after 18:30, and the venue has changing rooms, lockers and showers.",
  },
  {
    q: "Are there contracts or joining fees?",
    a: "No contracts, ever. All memberships are rolling monthly and include a free month's freeze if life gets in the way. And you can book a trial class first, with no obligation to join.",
  },
  {
    q: "Do you teach kids?",
    a: "Yes — our Junior programme (ages 8–15) runs twice a week: Tuesdays 17:45–18:45 and Saturdays 11:00–12:00. Small, structured classes built around technique and the Seven Virtues. You can book their first class as a trial.",
  },
] as const;
