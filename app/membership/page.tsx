import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Pricing from "@/components/Pricing";

export const metadata: Metadata = {
  title: "Membership & Pricing | True Virtues Jiu Jitsu Wimbledon",
  description:
    "Simple, rolling-monthly BJJ membership in Wimbledon. No contracts, no joining fees, free month's freeze. Plans from £60/month, plus pay-per-class. Book a free trial first.",
  alternates: { canonical: "/membership" },
};

export default function Page() {
  return (
    <PageShell
      title="Membership & Pricing"
      intro="Rolling monthly, no contracts, no joining fees — and a free trial first so you only commit once you know you love it."
    >
      <Pricing />
    </PageShell>
  );
}
