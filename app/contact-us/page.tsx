import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { site, timetable } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Find Us | True Virtues Jiu Jitsu Wimbledon",
  description:
    "Get in touch with True Virtues Jiu Jitsu at YMCA Wimbledon, 198 The Broadway, SW19 1RY. Call 07947 606137, email, or DM us on Instagram. 8 minutes from Wimbledon Station.",
  alternates: { canonical: "/contact-us" },
};

// Distinct training days, for the "when we train" summary.
const days = [...new Set(timetable.map((c) => c.dayName))];

export default function Page() {
  return (
    <PageShell
      title="Contact & Find Us"
      intro="Questions before you start, or want to arrange your free trial by phone? We're happy to help."
    >
      <section className="py-12 sm:py-18">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:grid-cols-2 sm:px-6">
          <div>
            <h2 className="text-2xl font-bold">Get in touch</h2>
            <ul className="mt-5 space-y-4 text-stone-200">
              <li>
                <span className="block text-sm uppercase tracking-wider text-stone-400">Phone</span>
                <a href={site.phoneHref} className="text-lg font-semibold text-accent">
                  {site.phone}
                </a>
              </li>
              <li>
                <span className="block text-sm uppercase tracking-wider text-stone-400">Email</span>
                <a href={`mailto:${site.email}`} className="text-lg font-semibold text-accent">
                  {site.email}
                </a>
              </li>
              <li>
                <span className="block text-sm uppercase tracking-wider text-stone-400">
                  Instagram
                </span>
                <a href={site.instagramUrl} className="text-lg font-semibold text-accent">
                  @{site.instagram}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Where we train</h2>
            <address className="mt-5 text-lg not-italic leading-relaxed text-stone-200">
              {site.address.venue}
              <br />
              {site.address.street}
              <br />
              {site.address.locality} {site.address.postcode}
            </address>
            <a
              href={site.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-semibold text-accent underline underline-offset-4"
            >
              Open in Google Maps →
            </a>
            <ul className="mt-5 space-y-1 text-stone-300">
              {site.travel.map((t) => (
                <li key={t}>· {t}</li>
              ))}
            </ul>
            <p className="mt-5 text-stone-300">
              <span className="font-semibold text-white">We train:</span> {days.join(", ")}. See the{" "}
              <a href="/classes" className="text-accent underline underline-offset-4">
                full timetable
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
