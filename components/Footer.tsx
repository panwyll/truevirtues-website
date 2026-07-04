import Link from "next/link";
import { site, sitePages } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-panel/60 pb-24 pt-12 md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-display text-lg font-bold uppercase">
            True Virtues <span className="text-accent">Jiu Jitsu</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-stone-400">
            Brazilian Jiu Jitsu in Wimbledon, built on expert instruction and the traditional
            values of Bushido. Absolute beginners always welcome.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-stone-300">Find us</p>
          <address className="mt-3 text-sm not-italic leading-relaxed text-stone-400">
            <a href={site.address.mapsUrl} className="hover:text-accent">
              {site.address.venue}
              <br />
              {site.address.street}
              <br />
              {site.address.locality} {site.address.postcode}
            </a>
          </address>
          <ul className="mt-3 space-y-1 text-sm text-stone-400">
            {site.travel.map((t) => (
              <li key={t}>· {t}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-stone-300">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-400">
            <li>
              <a href={site.phoneHref} className="hover:text-accent">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-accent">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.instagramUrl} className="hover:text-accent">
                Instagram @{site.instagram}
              </a>
            </li>
          </ul>
          <a
            href="#free-trial"
            data-analytics="footer-book-trial"
            className="mt-5 inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-accent-strong"
          >
            Book Your Trial Class
          </a>
        </div>
      </div>
      <nav className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-8 sm:px-6">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-stone-400">
          <li>
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
          </li>
          {sitePages.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="hover:text-accent">
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="mt-8 text-center text-xs text-stone-600">
        © {new Date().getFullYear()} True Virtues Jiu Jitsu · UKBJJA affiliated · Wimbledon, London
        SW19
      </p>
    </footer>
  );
}
