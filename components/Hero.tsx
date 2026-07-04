"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";

const slides = [
  {
    eyebrow: "Brazilian Jiu Jitsu · Wimbledon SW19",
    title: (
      <>
        Beginner-friendly BJJ,
        <br />
        <span className="text-accent">first class free</span>
      </>
    ),
    body: "Get fit, get confident and learn real self-defence with black belt coaching at YMCA Wimbledon. No experience needed.",
    image: {
      src: "/seminar-ffion-davies.webp",
      alt: "True Virtues Jiu Jitsu members training together in Wimbledon",
      position: "object-top",
    },
  },
  {
    eyebrow: "Women's Jiu Jitsu · Thursdays",
    title: (
      <>
        A women-only class,
        <br />
        <span className="text-accent">every week</span>
      </>
    ),
    body: "Practical self-defence and BJJ fundamentals in a focused, respectful environment. Partners of similar size and experience. Your first class is free.",
    image: {
      src: "/womens-class.jpg",
      alt: "Group of women training at True Virtues Jiu Jitsu Wimbledon",
      position: "object-[center_25%]",
    },
  },
  {
    eyebrow: "World-class seminars",
    title: (
      <>
        Train with
        <br />
        <span className="text-accent">world champions</span>
      </>
    ),
    body: "We regularly host elite seminars — including ADCC World Champion Ffion Davies — so you learn from the very best without leaving Wimbledon.",
    image: {
      src: "/seminar-ffion-davies.webp",
      alt: "Group photo after the Ffion Davies seminar at True Virtues Jiu Jitsu",
      position: "object-center",
    },
  },
  {
    eyebrow: "Junior Jiu Jitsu · Ages 8–15",
    title: (
      <>
        Confidence &amp; discipline
        <br />
        <span className="text-accent">for your kids</span>
      </>
    ),
    body: "Small, structured classes built around technique and the Seven Virtues — twice a week, Tuesdays and Saturdays. The first junior class is free.",
    image: {
      src: "/juniors-class.jpg",
      alt: "Junior class training at True Virtues Jiu Jitsu Wimbledon",
      position: "object-[center_30%]",
    },
  },
];

const ROTATE_MS = 5500;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      className="relative overflow-hidden pt-32 pb-20 sm:pt-44 sm:pb-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Classes and highlights"
    >
      {/* Slides stack: only opacity changes so the layout never shifts. */}
      {slides.map((slide, i) => (
        <Image
          key={slide.image.src + i}
          src={slide.image.src}
          alt={slide.image.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover opacity-0 transition-opacity duration-1000 ${
            slide.image.position
          } ${i === active ? "!opacity-25" : ""}`}
        />
      ))}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Text block: slides are stacked in a single CSS grid cell, so the
            container auto-sizes to the tallest slide — no fixed height, no
            overflow onto the dots/CTA at any viewport aspect ratio. */}
        <div className="grid">
          {slides.map((slide, i) => (
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
                {slide.eyebrow}
              </p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
                {slide.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-stone-200 sm:text-xl">{slide.body}</p>
            </div>
          ))}
        </div>

        {/* Slide indicators */}
        <div className="mt-6 flex gap-2.5" role="tablist" aria-label="Choose highlight">
          {slides.map((slide, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={slide.eyebrow}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-8 bg-accent" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Always-present CTA + proof, independent of the rotating slide */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#free-trial"
            data-analytics="hero-book-trial"
            className="rounded-lg bg-accent px-8 py-4 text-center text-lg font-bold uppercase tracking-wide text-white shadow-xl shadow-accent/30 transition hover:bg-accent-strong"
          >
            Book Your Free Trial Class
          </a>
          <a
            href="#timetable"
            data-analytics="hero-see-timetable"
            className="rounded-lg border border-white/25 px-8 py-4 text-center text-lg font-semibold text-white transition hover:border-white/60"
          >
            See the timetable
          </a>
        </div>
        <p className="mt-6 flex items-center gap-2 text-sm text-stone-300">
          <span className="text-gold" aria-hidden>
            ★★★★★
          </span>
          <strong className="text-white">{site.googleRating.score}</strong> from{" "}
          {site.googleRating.count} Google reviews
        </p>
      </div>
    </section>
  );
}
