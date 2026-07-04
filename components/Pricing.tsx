import { pricing } from "@/lib/site";
import PaidTrialButton from "./PaidTrialButton";

// Each plan's "Join now" button links to its Martialytics One Touch Sign Up
// page (joinUrl in lib/site.ts).

export default function Pricing() {
  return (
    <section id="pricing" className="border-t border-white/5 bg-panel/40 py-12 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Simple pricing. <span className="text-accent">No contracts. No joining fees.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-stone-300">
          Every membership is rolling monthly with a free month&apos;s freeze included. But start
          with the free trial — you don&apos;t pay a penny until you know you love it.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          <div className="flex flex-col rounded-xl border-2 border-accent bg-accent/10 p-7">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">Start here</p>
            <h3 className="mt-2 text-2xl font-semibold">{pricing.trial.name}</h3>
            {pricing.trial.price && (
              <p className="mt-2 font-display text-4xl font-bold text-accent">
                {pricing.trial.price}
              </p>
            )}
            <ul className="mt-5 flex-1 space-y-2 text-sm text-stone-200">
              {pricing.trial.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-accent">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="#free-trial"
              data-analytics="pricing-trial-book"
              className="mt-6 rounded-lg bg-accent py-3 text-center font-bold uppercase tracking-wide text-white transition hover:bg-accent-strong"
            >
              Book free trial
            </a>
            <PaidTrialButton />
          </div>

          {pricing.tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-xl border bg-panel p-7 ${
                tier.featured ? "border-white/30" : "border-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">{tier.name}</h3>
                {tier.featured && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase text-stone-200">
                    Most popular
                  </span>
                )}
              </div>
              <p className="mt-2 font-display text-4xl font-bold">
                {tier.price}
                <span className="text-base font-normal text-stone-400">{tier.period}</span>
              </p>
              <ul className="mt-5 flex-1 space-y-2 text-sm text-stone-300">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-accent">✓</span> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-2">
                <a
                  href={tier.joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics={`pricing-${tier.name.toLowerCase()}-join`}
                  className="rounded-lg bg-accent py-3 text-center font-bold uppercase tracking-wide text-white transition hover:bg-accent-strong"
                >
                  Join now
                </a>
                <a
                  href="#free-trial"
                  data-analytics={`pricing-${tier.name.toLowerCase()}-start`}
                  className="text-center text-sm font-semibold text-stone-300 underline underline-offset-4 transition hover:text-white"
                >
                  or try a free class first
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pricing.specialist.map((s) => (
            <div
              key={s.name}
              className="flex flex-col rounded-xl border border-white/10 bg-panel px-6 py-5"
            >
              <p className="font-semibold">{s.name}</p>
              <p className="mt-1 text-accent">{s.price}</p>
              <p className="mt-1 flex-1 text-sm text-stone-400">{s.note}</p>
              <a
                href={s.joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics={`pricing-${s.name.toLowerCase().replace(/[^a-z]+/g, "-")}-join`}
                className="mt-4 text-sm font-bold uppercase tracking-wide text-accent transition hover:text-accent-strong"
              >
                Join now →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
