import Image from "next/image";
import Link from "next/link";
import { programs } from "@/lib/site";

export default function Programs() {
  return (
    <section id="programs" className="py-12 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Four programmes. <span className="text-accent">One free first class.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-stone-300">
          Whether you want fitness, self-defence, competition or something great for your kids,
          there&apos;s a class for you.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {programs.map((p) => (
            <div
              key={p.id}
              className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-panel"
            >
              {p.image && (
                <div className="relative h-52 w-full">
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    fill
                    className="object-cover object-[center_30%]"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <span className="shrink-0 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                    {p.highlight}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-stone-400">{p.audience}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-300">
                  {p.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <a
                    href="#free-trial"
                    data-analytics={`program-${p.id}-book-trial`}
                    className="inline-block text-sm font-bold uppercase tracking-wide text-accent transition hover:text-accent-strong"
                  >
                    Book a free trial →
                  </a>
                  {p.href && (
                    <Link
                      href={p.href}
                      data-analytics={`program-${p.id}-learn-more`}
                      className="inline-block text-sm font-semibold text-stone-300 underline underline-offset-4 transition hover:text-white"
                    >
                      More about this class
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
