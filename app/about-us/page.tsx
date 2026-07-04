import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Coach from "@/components/Coach";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us | True Virtues Jiu Jitsu Wimbledon",
  description:
    "True Virtues Jiu Jitsu is a Brazilian Jiu Jitsu academy at YMCA Wimbledon, built on expert black belt instruction and the traditional values of Bushido. Beginners always welcome.",
  alternates: { canonical: "/about-us" },
};

const virtues = [
  ["義", "Righteousness"],
  ["勇", "Courage"],
  ["仁", "Compassion"],
  ["礼", "Respect"],
  ["誠", "Honesty"],
  ["名誉", "Honour"],
  ["忠義", "Loyalty"],
];

export default function Page() {
  return (
    <PageShell
      title="About True Virtues"
      intro="Brazilian Jiu Jitsu in Wimbledon, built on expert instruction and the traditional values of Bushido."
    >
      <section className="py-12 sm:py-18">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-lg leading-relaxed text-stone-200">
            True Virtues Jiu Jitsu was founded to teach Brazilian Jiu Jitsu the way it should be
            taught: with technical precision, genuine care for every student, and the character
            values that make a great martial artist off the mats as well as on them.
          </p>
          <p className="mt-4 leading-relaxed text-stone-300">
            We train at {site.address.venue}, a modern, fully-equipped facility in the heart of
            Wimbledon. Whether you&apos;re a complete beginner, returning after a break, or an
            experienced grappler, you&apos;ll find a welcoming, respectful room and coaching matched
            to your level. No experience is needed — absolute beginners are always welcome.
          </p>

          <h2 className="mt-10 text-2xl font-bold">The Seven Virtues</h2>
          <p className="mt-3 text-stone-300">
            Our name and our teaching are rooted in the seven virtues of Bushido — the values we
            carry into every class.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {virtues.map(([kanji, name]) => (
              <li
                key={name}
                className="rounded-xl border border-white/10 bg-panel p-5 text-center"
              >
                <span className="font-display text-3xl text-accent">{kanji}</span>
                <span className="mt-2 block text-sm text-stone-200">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Coach />
    </PageShell>
  );
}
