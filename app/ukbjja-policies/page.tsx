import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "UKBJJA Policies | True Virtues Jiu Jitsu Wimbledon",
  description:
    "True Virtues Jiu Jitsu is affiliated with the UKBJJA and follows its codes of conduct, safeguarding and complaints policies. Learn how we keep training safe for everyone.",
  alternates: { canonical: "/ukbjja-policies" },
};

export default function Page() {
  return (
    <PageShell
      title="UKBJJA Policies"
      intro="We're affiliated with the United Kingdom Brazilian Jiu Jitsu Association and train under its codes and safeguarding standards."
    >
      <section className="py-12 sm:py-18">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-stone-300 sm:px-6">
          <p className="leading-relaxed">
            As a UKBJJA-affiliated academy, True Virtues Jiu Jitsu follows the Association&apos;s
            code of conduct, safeguarding policy (for both children and adults at risk), equality
            and diversity policy, and complaints and disciplinary procedures. These exist to keep
            every session safe, fair and respectful for all our members.
          </p>
          <p className="leading-relaxed">
            You can read the full, up-to-date policies on the UKBJJA website:
          </p>
          <p>
            <a
              href="https://www.ukbjja.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-accent hover:text-accent"
            >
              Visit ukbjja.org →
            </a>
          </p>
          <p className="leading-relaxed">
            If you have a safeguarding concern or a complaint, please speak to a coach in confidence
            or email{" "}
            <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-4">
              {site.email}
            </a>
            . We take every concern seriously.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
