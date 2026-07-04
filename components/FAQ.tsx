import { faqs as defaultFaqs } from "@/lib/site";

type FaqItem = { q: string; a: string };

export default function FAQ({ items }: { items?: readonly FaqItem[] }) {
  const list = items ?? defaultFaqs;

  // FAQPage schema always matches the questions actually shown on the page.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="py-12 sm:py-18">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Questions? <span className="text-accent">Answered.</span>
        </h2>
        <div className="mt-10 space-y-3">
          {list.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-white/10 bg-panel open:border-accent/40"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-5 font-semibold">
                {f.q}
                <span className="text-accent transition group-open:rotate-45">＋</span>
              </summary>
              <p className="px-6 pb-6 text-sm leading-relaxed text-stone-300">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-stone-300">
          Still unsure?{" "}
          <a
            href="#free-trial"
            data-analytics="faq-book-trial"
            className="font-semibold text-accent underline underline-offset-4"
          >
            Book a trial class
          </a>{" "}
          — it&apos;s the fastest way to find out.
        </p>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
