import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "BJJ FAQs | True Virtues Jiu Jitsu Wimbledon",
  description:
    "Common questions about starting Brazilian Jiu Jitsu at True Virtues Wimbledon: is it for beginners, women's classes, kids, what to wear, safety, contracts and more.",
  alternates: { canonical: "/faq" },
};

export default function Page() {
  return (
    <PageShell
      title="Questions? Answered."
      intro="Everything people usually want to know before their first class. Still unsure? Book a trial and see for yourself."
    >
      <FAQ />
    </PageShell>
  );
}
