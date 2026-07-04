import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { site } from "@/lib/site";
import Analytics from "@/components/Analytics";
import InstantBookingScroll from "@/components/InstantBookingScroll";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Brazilian Jiu Jitsu in Wimbledon | True Virtues Jiu Jitsu — Free Trial Class",
    template: "%s | True Virtues Jiu Jitsu Wimbledon",
  },
  description:
    "BJJ classes in Wimbledon for complete beginners, women and kids. Black belt coaching at YMCA Wimbledon, SW19. No experience or fitness needed, no contracts. Book your free trial class today.",
  keywords: [
    "BJJ Wimbledon",
    "Brazilian Jiu Jitsu Wimbledon",
    "martial arts Wimbledon",
    "BJJ classes near me",
    "women's self defence Wimbledon",
    "kids martial arts Wimbledon SW19",
    "no gi grappling London",
    "beginner BJJ London",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: "Brazilian Jiu Jitsu in Wimbledon — Free Trial Class",
    description:
      "Beginner-friendly BJJ at YMCA Wimbledon. Black belt coaching, women's and junior classes, no contracts. Book your free trial.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brazilian Jiu Jitsu in Wimbledon — Free Trial Class",
    description:
      "Beginner-friendly BJJ at YMCA Wimbledon. Black belt coaching, women's and junior classes, no contracts.",
  },
  robots: { index: true, follow: true },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: site.name,
  description:
    "Brazilian Jiu Jitsu academy in Wimbledon offering adult gi and no-gi classes, women-only self-defence classes and junior BJJ for ages 8-15.",
  url: site.url,
  telephone: "+447947606137",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.venue}, ${site.address.street}`,
    addressLocality: "London",
    addressRegion: "Greater London",
    postalCode: site.address.postcode,
    addressCountry: "GB",
  },
  geo: { "@type": "GeoCoordinates", latitude: 51.4204, longitude: -0.1996 },
  sameAs: [site.instagramUrl],
  priceRange: "££",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "17:45", closes: "21:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "18:00", closes: "21:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "11:00", closes: "14:15" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${oswald.variable}`}>
      <body>
        <InstantBookingScroll />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
