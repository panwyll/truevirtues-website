import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { shop } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop — Gis, Rashguards & Kit | True Virtues Jiu Jitsu Wimbledon",
  description:
    "Order your True Virtues kit — team gis, rashguards, shorts, leggings, tees and patches. Place your order online, then pay and collect at your next class.",
  alternates: { canonical: "/shop" },
};

function OrderButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={shop.orderFormUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics="shop-order"
      className={`inline-block rounded-lg bg-accent px-8 py-4 text-center text-lg font-bold uppercase tracking-wide text-white shadow-xl shadow-accent/25 transition hover:bg-accent-strong ${className}`}
    >
      Order kit →
    </a>
  );
}

export default function Page() {
  return (
    <PageShell
      title="Shop"
      intro="Team gis, rashguards and TVJJ kit — all in club colours and designs."
    >
      <section className="py-12 sm:py-18">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* How it works — payment & collection are in class */}
          <div className="rounded-xl border-2 border-accent bg-accent/10 p-6 sm:p-8">
            <h2 className="text-xl font-bold sm:text-2xl">How ordering works</h2>
            <ol className="mt-4 space-y-2 text-stone-200">
              <li>
                <span className="font-semibold text-accent">1.</span> Browse the kit below and note
                what you want (item, design, size).
              </li>
              <li>
                <span className="font-semibold text-accent">2.</span> Fill in the order form.
              </li>
              <li>
                <span className="font-semibold text-accent">3.</span>{" "}
                <span className="font-semibold text-white">
                  Pay and collect in class — by card or cash at training.
                </span>{" "}
                No payment is taken online.
              </li>
            </ol>
            <OrderButton className="mt-6" />
          </div>

          {/* Catalogue */}
          {shop.categories.map((cat) => (
            <div key={cat.name} className="mt-12">
              <h2 className="text-2xl font-bold sm:text-3xl">{cat.name}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-panel p-5"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      {item.detail && (
                        <p className="mt-1 text-sm text-stone-400">{item.detail}</p>
                      )}
                    </div>
                    <p className="shrink-0 font-display text-2xl font-bold text-accent">
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Designs */}
          <div className="mt-12 rounded-xl border border-white/10 bg-panel p-6">
            <h2 className="text-xl font-bold">No-gi designs</h2>
            <p className="mt-2 text-sm text-stone-400">
              Rashguards, shorts, leggings and sets come in:
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {shop.designs.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-white/10 bg-ink px-3 py-1 text-sm text-stone-200"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Sizing */}
          <div className="mt-6 rounded-xl border border-white/10 bg-panel p-6">
            <h2 className="text-xl font-bold">Sizing</h2>
            <ul className="mt-3 space-y-2 text-sm text-stone-300">
              {shop.sizing.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="text-accent">•</span> {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Closing CTA */}
          <div className="mt-12 text-center">
            <p className="text-stone-300">Ready to order?</p>
            <p className="mt-1 text-sm text-stone-400">
              You&apos;ll pay and pick it up at your next class — nothing is charged online.
            </p>
            <OrderButton className="mt-5" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
