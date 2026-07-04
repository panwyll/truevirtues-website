import Image from "next/image";
import { site } from "@/lib/site";

const credentials = [
  { stat: "Black Belt", label: "1st degree, head coach" },
  { stat: "14+ yrs", label: "Coaching experience" },
  { stat: "ADCC", label: "Hosted world champion Ffion Davies" },
  { stat: "UKBJJA", label: "Affiliated academy" },
];

export default function Coach() {
  return (
    <section id="coach" className="py-12 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Learn from a black belt, <span className="text-accent">not a YouTube tutorial</span>
            </h2>
            <p className="mt-5 leading-relaxed text-stone-300">
              {site.coach.name} is a {site.coach.rank} with {site.coach.experience}. He has built
              True Virtues around expert instruction and the traditional values of Bushido —
              respect, discipline and honesty on and off the mats.
            </p>
            <p className="mt-4 leading-relaxed text-stone-300">
              The academy regularly hosts world-class seminars — including ADCC World Champion
              Ffion Davies — and supports a growing competition team. Want to compete? You&apos;ll
              get dedicated coaching. Just want to train? That&apos;s equally respected.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {credentials.map((c) => (
                <div
                  key={c.stat}
                  className="rounded-xl border border-white/10 bg-panel p-4 text-center"
                >
                  <p className="font-display text-2xl font-bold uppercase text-accent">{c.stat}</p>
                  <p className="mt-1 text-xs text-stone-300">{c.label}</p>
                </div>
              ))}
            </div>
            <a
              href="#free-trial"
              data-analytics="coach-book-trial"
              className="mt-8 inline-block rounded-lg bg-accent px-8 py-4 text-lg font-bold uppercase tracking-wide text-white transition hover:bg-accent-strong"
            >
              Train with us — first class free
            </a>
          </div>
          <figure>
            <div className="relative aspect-[1204/518] overflow-hidden rounded-xl border border-white/10 lg:aspect-[4/3]">
              <Image
                src="/seminar-ffion-davies.webp"
                alt="Group photo after the Ffion Davies seminar at True Virtues Jiu Jitsu"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <figcaption className="mt-3 text-sm text-stone-400">
              The True Virtues team after hosting ADCC World Champion Ffion Davies.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
