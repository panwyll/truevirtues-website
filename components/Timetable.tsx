import { timetable, site } from "@/lib/site";

const typeStyles: Record<string, string> = {
  "Ages 8–15": "border-l-gold",
  "Women only": "border-l-fuchsia-400",
  Adults: "border-l-accent",
  Members: "border-l-stone-500",
};

const days = ["Tuesday", "Thursday", "Saturday"] as const;

export default function Timetable() {
  return (
    <section id="timetable" className="border-t border-white/5 bg-panel/40 py-12 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">Weekly timetable</h2>
        <p className="mt-4 max-w-2xl text-stone-300">
          All classes at {site.address.venue}, {site.address.street}, {site.address.postcode} —{" "}
          {site.travel[0]}.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {days.map((day) => (
            <div key={day} className="rounded-xl border border-white/10 bg-ink/60">
              <h3 className="border-b border-white/10 px-5 py-4 text-center text-lg font-bold tracking-wider">
                {day}
              </h3>
              <div className="space-y-3 p-4">
                {timetable
                  .filter((c) => c.dayName === day)
                  .map((c) => (
                    <div
                      key={`${c.dayName}-${c.start}`}
                      className={`rounded-lg border border-white/10 border-l-4 bg-panel p-4 ${
                        typeStyles[c.type] ?? "border-l-accent"
                      }`}
                    >
                      <p className="font-display text-sm font-semibold uppercase tracking-wide text-stone-400">
                        {c.start} – {c.end}
                      </p>
                      <p className="mt-1 font-semibold text-white">{c.className}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-stone-400">{c.type}</span>
                        {c.bookable && (
                          <a
                            href="#free-trial"
                            data-analytics={`timetable-${c.dayName}-${c.programId}`}
                            className="text-xs font-bold uppercase tracking-wide text-accent hover:text-accent-strong"
                          >
                            Book →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-stone-400">
          Arrive 10–15 minutes early for your first visit — changing rooms, lockers and showers on
          site. Open Mat is free extra mat time for members after class on Tuesdays, Thursdays and
          Saturdays.
        </p>
      </div>
    </section>
  );
}
