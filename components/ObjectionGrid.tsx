const objections = [
  {
    title: "“I've never done a martial art”",
    answer:
      "Perfect — you're exactly who our fundamentals classes are built for. Every technique is taught step by step, and you'll be paired with partners who remember their own first class.",
  },
  {
    title: "“I'm not fit enough”",
    answer:
      "You don't get fit to do Jiu Jitsu — you do Jiu Jitsu to get fit. Go at your own pace, rest when you need to, and let the fitness come as a side effect.",
  },
  {
    title: "“Is there a class for women?”",
    answer:
      "Yes — a dedicated women-only class every Thursday evening, focused on practical self-defence in a respectful environment. You can book your first one as a trial.",
  },
  {
    title: "“Am I too old for this?”",
    answer:
      "BJJ runs on leverage and technique, not youth or strength. People start with us in their 30s, 40s and 50s — we match partners and pace to you.",
  },
  {
    title: "“What about my kids?”",
    answer:
      "Our Junior programme (ages 8–15) runs Tuesday evenings: small classes teaching technique, discipline and the Seven Virtues. Book their first class online.",
  },
  {
    title: "“I'm nervous about walking in”",
    answer:
      "Everyone was. Message us before you come and we'll meet you at the door, introduce you to the coach, and walk you through everything.",
  },
];

export default function ObjectionGrid() {
  return (
    <section id="is-it-for-me" className="border-t border-white/5 bg-panel/40 py-12 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">
          “Is BJJ for me?” <span className="text-accent">Almost certainly — here&apos;s why</span>
        </h2>
        <p className="mt-4 max-w-2xl text-stone-300">
          These are the six things people worry about before their first class. None of them
          should stop you.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {objections.map((o) => (
            <div
              key={o.title}
              className="rounded-xl border border-white/10 bg-panel p-6 transition hover:border-accent/40"
            >
              <h3 className="font-display text-lg font-semibold normal-case tracking-normal text-accent">
                {o.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-300">{o.answer}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="#free-trial"
            data-analytics="objections-book-trial"
            className="inline-block rounded-lg bg-accent px-8 py-4 text-lg font-bold uppercase tracking-wide text-white transition hover:bg-accent-strong"
          >
            Try a class and see for yourself
          </a>
        </div>
      </div>
    </section>
  );
}
