import Header from "./Header";
import Footer from "./Footer";
import StickyCTA from "./StickyCTA";
import TrialSection from "./TrialSection";

// Chrome for the standalone content pages: minimal header (logo + CTA), a
// title banner, the page content, then a booking section (so the header/sticky
// CTAs always have a #free-trial target) and the footer.
export default function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header minimal />
      <main>
        <section className="border-b border-white/5 pt-28 pb-8 sm:pt-36 sm:pb-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
            {intro && <p className="mt-4 max-w-2xl text-lg text-stone-300">{intro}</p>}
          </div>
        </section>
        {children}
        <TrialSection />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
