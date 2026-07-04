import { site, reviews } from "@/lib/site";

export default function Testimonials() {
  // Two copies of the list so the marquee can loop seamlessly at -50%.
  const track = [...reviews, ...reviews];

  return (
    <section id="reviews" className="border-t border-white/5 bg-panel/40 py-12 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Rated <span className="text-gold">{site.googleRating.score} ★</span> on Google
        </h2>
        <p className="mt-3 text-stone-300">
          {site.googleRating.count} reviews. Every single one five stars.
        </p>
      </div>

      {/* Full-bleed rolling marquee; fades at both edges. */}
      <div className="marquee-viewport group relative mt-10 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent sm:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent sm:w-28"
        />
        <ul className="marquee-track flex w-max gap-6 px-3">
          {track.map((r, i) => (
            <li
              key={i}
              className="flex w-[85vw] max-w-sm shrink-0 flex-col rounded-xl border border-white/10 bg-panel p-6 sm:w-96"
              aria-hidden={i >= reviews.length}
            >
              <p className="text-gold" aria-label="5 out of 5 stars">
                ★★★★★
              </p>
              <blockquote className="mt-3 flex-1 leading-relaxed text-stone-200">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-4 text-sm text-stone-400">
                <strong className="text-stone-200">{r.name}</strong> · {r.when}
              </figcaption>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-4 text-center sm:px-6">
        <a
          href={site.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold hover:text-gold"
        >
          <span className="text-gold">★★★★★</span>
          Read all {site.googleRating.count} reviews on Google →
        </a>
      </div>
    </section>
  );
}
