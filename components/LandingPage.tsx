import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import TrialSection from "@/components/TrialSection";
import FAQ from "@/components/FAQ";
import StickyCTA from "@/components/StickyCTA";
import HeroCarousel from "@/components/HeroCarousel";
import { site } from "@/lib/site";
import { landings, type Landing } from "@/lib/landing";

export default function LandingPage({ data }: { data: Landing }) {
  // This page's own class leads the carousel; the other classes follow.
  const slides = [data.hero, ...landings.filter((l) => l.slug !== data.slug).map((l) => l.hero)];

  return (
    <>
      <Header minimal />
      <main>
        <HeroCarousel slides={slides}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#free-trial"
              data-analytics="landing-hero-book-trial"
              className="rounded-lg bg-accent px-8 py-4 text-center text-lg font-bold uppercase tracking-wide text-white shadow-xl shadow-accent/30 transition hover:bg-accent-strong"
            >
              Book Your Free Trial Class
            </a>
            <a
              href={site.phoneHref}
              data-analytics="landing-hero-call"
              className="rounded-lg border border-white/25 px-8 py-4 text-center text-lg font-semibold text-white transition hover:border-white/60"
            >
              Call {site.phone}
            </a>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-stone-300">
            <span className="text-gold" aria-hidden>
              ★★★★★
            </span>
            <strong className="text-white">{site.googleRating.score}</strong> from{" "}
            {site.googleRating.count} Google reviews
          </p>
        </HeroCarousel>

        {/* Benefits / objection handling */}
        <section className="border-t border-white/5 bg-panel/40 py-12 sm:py-18">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold sm:text-4xl">{data.benefitsHeading}</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-xl border border-white/10 bg-panel p-6 transition hover:border-accent/40"
                >
                  <h3 className="font-display text-lg font-semibold normal-case tracking-normal text-accent">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-300">{b.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <a
                href="#free-trial"
                className="inline-block rounded-lg bg-accent px-8 py-4 text-lg font-bold uppercase tracking-wide text-white transition hover:bg-accent-strong"
              >
                Book your free class
              </a>
            </div>
          </div>
        </section>

        {/* Class details */}
        <section className="py-12 sm:py-18">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold sm:text-4xl">{data.details.heading}</h2>
                <ul className="mt-6 space-y-3">
                  {data.details.bullets.map((line) => (
                    <li key={line} className="flex gap-3 text-stone-200">
                      <span className="mt-0.5 text-accent">✓</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block text-sm font-semibold text-accent underline underline-offset-4 hover:text-accent-strong"
                >
                  Get directions on Google Maps →
                </a>
              </div>
              <div className="relative min-h-64 overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={data.hero.image.src}
                  alt={data.hero.image.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={`object-cover ${data.hero.image.position}`}
                />
              </div>
            </div>
          </div>
        </section>

        <Testimonials />

        <TrialSection
          preselectProgram={data.programId}
          heading={
            <>
              Book your <span className="text-accent">free trial class</span>
            </>
          }
        />

        <FAQ items={data.faqs} />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
