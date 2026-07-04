import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal & Privacy | True Virtues Jiu Jitsu Wimbledon",
  description:
    "Privacy and legal information for True Virtues Jiu Jitsu, Wimbledon — how we use the details you submit through the website, and how to get in touch.",
  alternates: { canonical: "/legal" },
  robots: { index: false, follow: true },
};

// NOTE FOR THE GYM: the privacy summary below is accurate to how this site
// works, but full Terms & Conditions and a complete Privacy Policy should be
// reviewed/finalised by the academy (or its solicitor) before launch. Replace
// the placeholder sections with your approved wording.
export default function Page() {
  return (
    <PageShell title="Legal & Privacy">
      <section className="py-12 sm:py-18">
        <div className="mx-auto max-w-3xl space-y-8 px-4 text-stone-300 sm:px-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Your privacy</h2>
            <p className="mt-3 leading-relaxed">
              When you book a trial through this website we collect your name, phone number and email
              address, and the class you&apos;re interested in. We use these details only to contact
              you to arrange your class. We do not sell or share your information, and we do not store
              any card or payment details on this website — payments, where taken, are handled by our
              secure payment provider.
            </p>
            <p className="mt-3 leading-relaxed">
              You can ask us to update or delete your details at any time by emailing{" "}
              <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Terms &amp; conditions</h2>
            <p className="mt-3 leading-relaxed">
              Membership terms, class rules, cancellation and freeze policies are provided when you
              join and are available on request. Please{" "}
              <a href="/contact-us" className="text-accent underline underline-offset-4">
                get in touch
              </a>{" "}
              if you&apos;d like a copy before signing up.
            </p>
          </div>

          <p className="text-sm text-stone-500">
            True Virtues Jiu Jitsu · {site.address.venue}, {site.address.street},{" "}
            {site.address.postcode}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
