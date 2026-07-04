import type { Metadata } from "next";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Seminars & Events | True Virtues Jiu Jitsu Wimbledon",
  description:
    "True Virtues Jiu Jitsu hosts world-class BJJ seminars in Wimbledon — including ADCC World Champion Ffion Davies — plus gradings and team events. Follow us for upcoming dates.",
  alternates: { canonical: "/seminars-and-events" },
};

export default function Page() {
  return (
    <PageShell
      title="Seminars & Events"
      intro="Learn from the very best without leaving Wimbledon. We regularly host world-class instructors, run gradings, and compete as a team."
    >
      <section className="py-12 sm:py-18">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <figure className="overflow-hidden rounded-xl border border-white/10">
            <div className="relative aspect-[1204/518]">
              <Image
                src="/seminar-ffion-davies.webp"
                alt="Group photo after the Ffion Davies seminar at True Virtues Jiu Jitsu Wimbledon"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 960px, 100vw"
              />
            </div>
            <figcaption className="bg-panel px-5 py-3 text-sm text-stone-400">
              The True Virtues team after hosting ADCC World Champion Ffion Davies.
            </figcaption>
          </figure>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                h: "World-class seminars",
                p: "We host elite instructors — including ADCC World Champion Ffion Davies — so members can train with the best in the sport.",
              },
              {
                h: "Gradings",
                p: "Regular belt and stripe gradings recognise your progress. Grading events are free for Pro and Elite members.",
              },
              {
                h: "Competition team",
                p: "Members who want to compete get dedicated coaching and travel to UK tournaments together as a team.",
              },
            ].map((c) => (
              <div key={c.h} className="rounded-xl border border-white/10 bg-panel p-6">
                <h2 className="text-lg font-semibold text-accent">{c.h}</h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-300">{c.p}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-stone-300">
            Upcoming seminar and event dates are announced on Instagram{" "}
            <a href={site.instagramUrl} className="font-semibold text-accent underline underline-offset-4">
              @{site.instagram}
            </a>{" "}
            — or{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-accent underline underline-offset-4">
              email us
            </a>{" "}
            to be added to the list.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
