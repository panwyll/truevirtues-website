// Content for the standalone, ad-ready landing pages. Each doubles as an SEO
// page (unique title/description/canonical) and a paid-traffic landing page
// (minimal header, one audience, one CTA, pre-selected class).

export type Benefit = { title: string; body: string };
export type LandingFaq = { q: string; a: string };

export type Landing = {
  slug: string;
  programId: string; // pre-selects the matching class in the trial form
  meta: { title: string; description: string; keywords: string[] };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    sub: string;
    image: { src: string; alt: string; position: string };
  };
  benefitsHeading: string;
  benefits: Benefit[];
  details: { heading: string; bullets: string[] };
  faqs: LandingFaq[];
};

export const landings: Landing[] = [
  {
    slug: "womens-jiu-jitsu-wimbledon",
    programId: "womens",
    meta: {
      title:
        "Women's Brazilian Jiu Jitsu in Wimbledon | Ladies-Only BJJ & Self-Defence",
      description:
        "Women-only BJJ and self-defence classes in Wimbledon every Thursday. Beginner-friendly, black belt coaching, a respectful environment — book a trial class. YMCA Wimbledon SW19.",
      keywords: [
        "women's BJJ Wimbledon",
        "women's self defence Wimbledon",
        "ladies jiu jitsu London",
        "women's martial arts SW19",
      ],
    },
    hero: {
      eyebrow: "Women's Jiu Jitsu · Wimbledon SW19",
      titleLead: "Women's Jiu Jitsu & self-defence in Wimbledon —",
      titleAccent: "book a trial class",
      sub: "A women-only class every Thursday. Practical self-defence and BJJ fundamentals, coached to your pace in a focused, respectful environment. No experience needed.",
      image: {
        src: "/womens-class.jpg",
        alt: "Group of women training at True Virtues Jiu Jitsu Wimbledon",
        position: "object-[center_25%]",
      },
    },
    benefitsHeading: "Is this class for me?",
    benefits: [
      {
        title: "“I've never trained before”",
        body: "Perfect — this class is built for beginners. Everything is taught step by step and you'll be shown each move slowly before trying it.",
      },
      {
        title: "“Will I have to grapple with big guys?”",
        body: "No. This is a women-only session, and you'll be paired with training partners of similar size and experience.",
      },
      {
        title: "“Is it actually useful self-defence?”",
        body: "Yes. BJJ is the art of controlling and neutralising a larger, stronger person using leverage — the most proven self-defence there is for exactly that situation.",
      },
      {
        title: "“I'm not fit or flexible enough”",
        body: "You don't need to be. You get fit by doing Jiu Jitsu, not before it. Rest whenever you need to and go entirely at your own pace.",
      },
      {
        title: "“What do I wear?”",
        body: "Comfortable sports clothing with no zips or buttons — leggings and a fitted top are ideal. You don't need a gi to start; we can lend you one.",
      },
      {
        title: "“I'd feel nervous walking in alone”",
        body: "Everyone was nervous first time. Message us before you come and we'll meet you at the door and introduce you to the group.",
      },
    ],
    details: {
      heading: "Women's class details",
      bullets: [
        "Every Thursday, 18:00 – 19:00",
        "YMCA Wimbledon, 198 The Broadway, SW19 1RY",
        "Women only · all levels · ages 16+",
        "Trial class available · loan gi provided",
        "Changing rooms, lockers and showers on site",
      ],
    },
    faqs: [
      {
        q: "Do I need to book my first women's class?",
        a: "Yes — fill in the form and we'll confirm your trial class within 24 hours so we know to expect you and can have a loan gi ready.",
      },
      {
        q: "Can I also train in the mixed classes?",
        a: "Absolutely. Many members start in the women's class and add the mixed adult classes once they feel ready — your membership can cover both.",
      },
      {
        q: "Is there a women's changing room?",
        a: "Yes, YMCA Wimbledon has full changing rooms, lockers and showers.",
      },
    ],
  },
  {
    slug: "no-gi-jiu-jitsu-wimbledon",
    programId: "nogi",
    meta: {
      title:
        "No-Gi Jiu Jitsu & Submission Grappling in Wimbledon | True Virtues",
      description:
        "No-Gi BJJ and submission grappling in Wimbledon every Thursday, 19:00–21:00. Wrestling and MMA crossover, beginners paired with experienced partners — book a trial class. YMCA Wimbledon SW19.",
      keywords: [
        "no gi jiu jitsu Wimbledon",
        "submission grappling London",
        "no gi BJJ SW19",
        "MMA grappling Wimbledon",
      ],
    },
    hero: {
      eyebrow: "Fundamentals (No-Gi) · Thursdays",
      titleLead: "No-Gi grappling in Wimbledon —",
      titleAccent: "book a trial class",
      sub: "Faster-paced submission grappling in shorts and a rash guard, with huge crossover to wrestling and MMA. Beginners are paired with experienced partners and given time to find their feet.",
      image: {
        src: "/seminar-ffion-davies.webp",
        alt: "No-Gi grappling seminar with ADCC champion Ffion Davies at True Virtues Jiu Jitsu",
        position: "object-center",
      },
    },
    benefitsHeading: "New to No-Gi? Here's what to know",
    benefits: [
      {
        title: "What's the difference from Gi?",
        body: "No-Gi is trained without the traditional uniform, so there are no cloth grips. It's faster, more dynamic, and the style used in MMA and modern grappling competition.",
      },
      {
        title: "Do I need any experience?",
        body: "No. Beginners are welcome every week, paired with experienced partners and coached through the fundamentals at their own pace.",
      },
      {
        title: "What do I wear?",
        body: "Tight-fitting sportswear without pockets or zips. A rash guard and shorts are ideal, but a fitted sports top works fine for a first class.",
      },
      {
        title: "Is it good for MMA?",
        body: "Yes — No-Gi is the grappling base for MMA. Each class covers takedowns, transitions and submissions, finishing with live positional sparring.",
      },
      {
        title: "Can I compete?",
        body: "If you want to. We support members who want to compete and attend UK tournaments as a team — but competing is entirely optional.",
      },
      {
        title: "Do you host high-level training?",
        body: "We regularly run elite seminars, including with ADCC World Champion Ffion Davies, so you can learn from the very best in Wimbledon.",
      },
    ],
    details: {
      heading: "No-Gi class details",
      bullets: [
        "Every Thursday, 19:00 – 21:00",
        "YMCA Wimbledon, 198 The Broadway, SW19 1RY",
        "Adults 16+ · all levels welcome",
        "Trial class available · no gi needed",
        "Changing rooms, lockers and showers on site",
      ],
    },
    faqs: [
      {
        q: "Do I need a gi for the No-Gi class?",
        a: "No — that's the point. Just bring a rash guard or fitted top and shorts without pockets or zips.",
      },
      {
        q: "Is No-Gi harder than Gi for beginners?",
        a: "It's just different. Without grips it can feel faster, but you'll be paired with partners who control the pace and help you learn.",
      },
      {
        q: "Can I train both Gi and No-Gi?",
        a: "Yes. Many members do both — our Pro and Elite memberships cover multiple classes per week.",
      },
    ],
  },
  {
    slug: "junior-jiu-jitsu",
    programId: "juniors",
    meta: {
      title:
        "Kids' Brazilian Jiu Jitsu in Wimbledon (Ages 8–15) | Junior BJJ",
      description:
        "Kids' BJJ classes in Wimbledon for ages 8–15, Tuesdays and Saturdays. Build confidence, discipline and anti-bullying skills in small, structured classes — book a trial class. YMCA Wimbledon SW19.",
      keywords: [
        "kids BJJ Wimbledon",
        "children's martial arts Wimbledon",
        "junior jiu jitsu SW19",
        "kids self defence London",
      ],
    },
    hero: {
      eyebrow: "Junior Jiu Jitsu · Ages 8–15",
      titleLead: "Brazilian Jiu Jitsu for kids in Wimbledon —",
      titleAccent: "book a trial class",
      sub: "Small, structured classes built around technique and the Seven Virtues: discipline, respect and confidence that carries over to school and home. Twice a week, Tuesdays and Saturdays.",
      image: {
        src: "/juniors-class.jpg",
        alt: "Junior class training at True Virtues Jiu Jitsu Wimbledon",
        position: "object-[center_30%]",
      },
    },
    benefitsHeading: "Why parents choose Jiu Jitsu for their kids",
    benefits: [
      {
        title: "Confidence that lasts",
        body: "Learning to handle themselves calmly under pressure gives kids a quiet confidence that shows up at school, not just on the mats.",
      },
      {
        title: "Genuine anti-bullying skills",
        body: "BJJ teaches how to control a situation and stay safe without throwing a punch — real, practical skills for dealing with bullies.",
      },
      {
        title: "Focus and discipline",
        body: "Small, structured classes and a clear grading path teach kids to listen, set goals and earn progress through effort.",
      },
      {
        title: "“Is it safe?”",
        body: "BJJ is far safer than striking arts — no punches or kicks. Kids learn to 'tap' from day one and train at a level matched to them.",
      },
      {
        title: "“Will my child be pushed too hard?”",
        body: "No. Coaching is patient and pace is matched to each child. The goal is that they leave wanting to come back.",
      },
      {
        title: "“My child is shy / has never done a sport”",
        body: "That's who this class helps most. The structure and friendly group make it easy for quieter kids to settle in.",
      },
    ],
    details: {
      heading: "Junior class details",
      bullets: [
        "Tuesdays 17:45 – 18:45 and Saturdays 11:00 – 12:00",
        "YMCA Wimbledon, 198 The Broadway, SW19 1RY",
        "Ages 8–15 · all levels · small class sizes",
        "Trial class available · loan gi provided",
        "Structured grading path and the Seven Virtues",
      ],
    },
    faqs: [
      {
        q: "What ages is the junior class for?",
        a: "Ages 8 to 15. From 16, students move into the adult classes. We pair children with others of similar age and size.",
      },
      {
        q: "Does my child need a gi to start?",
        a: "No — bring comfortable sportswear for the first class and we can lend a gi. Most families buy one once they've decided to continue.",
      },
      {
        q: "Can I watch my child's class?",
        a: "Yes, parents are welcome to watch. Come along to the trial class and see how they get on.",
      },
    ],
  },
  {
    slug: "bjj-classes-wimbledon",
    programId: "gi",
    meta: {
      title: "Gi Brazilian Jiu Jitsu Classes in Wimbledon | Fundamentals BJJ",
      description:
        "Traditional Gi Brazilian Jiu Jitsu in Wimbledon for all levels. Beginner-friendly fundamentals with black belt coaching at YMCA Wimbledon, SW19. Book a trial class.",
      keywords: [
        "gi BJJ Wimbledon",
        "brazilian jiu jitsu classes Wimbledon",
        "fundamentals BJJ SW19",
        "beginner jiu jitsu London",
      ],
    },
    hero: {
      eyebrow: "Fundamentals (Gi) · Tuesdays & Saturdays",
      titleLead: "Traditional Gi Jiu Jitsu in Wimbledon —",
      titleAccent: "book a trial class",
      sub: "The classic art in the gi: grips, leverage and technical precision. Mixed-ability classes where beginners are paired with experienced partners, so you're never thrown in at the deep end.",
      image: {
        src: "/seminar-ffion-davies.webp",
        alt: "Brazilian Jiu Jitsu training at True Virtues Jiu Jitsu Wimbledon",
        position: "object-top",
      },
    },
    benefitsHeading: "New to the Gi? Here's what to know",
    benefits: [
      {
        title: "What is the Gi?",
        body: "The gi is the traditional uniform: durable, hygienic, and it lets you grip without ripping clothing. Most technique, sparring and gradings use it.",
      },
      {
        title: "Do I need a gi to start?",
        body: "No. Come in comfortable sportswear for your first class and we can lend you one. You'll want your own once you decide to continue.",
      },
      {
        title: "I've never trained — is that OK?",
        body: "Ideal. Classes are mixed-ability, every move is taught step by step, and you're paired with experienced partners who look after you.",
      },
      {
        title: "Do I need to be fit?",
        body: "No — you get fit by doing Jiu Jitsu, not before it. Go at your own pace and rest whenever you need to.",
      },
      {
        title: "Is there a belt path?",
        body: "Yes. Progress is marked by belts and stripes, awarded on technique and consistency at regular grading events (free for members).",
      },
      {
        title: "Can I compete?",
        body: "If you want to. We support members who choose to compete and attend UK tournaments as a team — but it's entirely optional.",
      },
    ],
    details: {
      heading: "Gi class details",
      bullets: [
        "Tuesdays 19:00 – 21:00 and Saturdays 12:15 – 13:45",
        "Free members' Open Mat after Saturday class (13:45 – 14:15)",
        "YMCA Wimbledon, 198 The Broadway, SW19 1RY",
        "Adults 16+ · all levels welcome",
        "Trial class available · loan gi provided",
      ],
    },
    faqs: [
      {
        q: "What should I wear if I don't have a gi yet?",
        a: "Comfortable athletic clothing with no zips or buttons — a t-shirt and shorts or leggings. We can lend you a gi for your trial class.",
      },
      {
        q: "Where can I buy a gi?",
        a: "We recommend Tatami or Kingz, and we stock our own kit from time to time. There's no brand restriction.",
      },
      {
        q: "How often should I train?",
        a: "Once a week builds steady progress; twice or more accelerates it. Our Pro and Elite memberships cover multiple classes per week.",
      },
    ],
  },
];

export function getLanding(slug: string): Landing | undefined {
  return landings.find((l) => l.slug === slug);
}
