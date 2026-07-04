"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type HeroSlide = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  sub: string;
  image: { src: string; alt: string; position: string };
};

const ROTATE_MS = 5500;

// Rotating hero. The first slide's title renders as the page <h1> (so SEO and
// message-match stay tied to the page's own class); later slides use <p> so
// there's exactly one h1. `children` is the CTA block rendered below the
// rotating text.
export default function HeroCarousel({
  slides,
  children,
}: {
  slides: HeroSlide[];
  children?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  return (
    <section
      className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Classes and highlights"
    >
      {slides.map((s, i) => (
        <Image
          key={s.image.src + i}
          src={s.image.src}
          alt={s.image.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover opacity-0 transition-opacity duration-1000 ${s.image.position} ${
            i === active ? "!opacity-25" : ""
          }`}
        />
      ))}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`col-start-1 row-start-1 transition-all duration-700 ${
                i === active
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-3 opacity-0"
              }`}
              aria-hidden={i !== active}
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                {s.eyebrow}
              </p>
              {i === 0 ? (
                <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
                  {s.titleLead} <span className="text-accent">{s.titleAccent}</span>
                </h1>
              ) : (
                <p className="max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-[0.02em] sm:text-6xl">
                  {s.titleLead} <span className="text-accent">{s.titleAccent}</span>
                </p>
              )}
              <p className="mt-5 max-w-2xl text-lg text-stone-200 sm:text-xl">{s.sub}</p>
            </div>
          ))}
        </div>

        {slides.length > 1 && (
          <div className="mt-6 flex gap-2.5" role="tablist" aria-label="Choose class">
            {slides.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                role="tab"
                aria-selected={i === active}
                aria-label={s.eyebrow}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-8 bg-accent" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
