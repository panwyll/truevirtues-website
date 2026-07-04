import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import ObjectionGrid from "@/components/ObjectionGrid";
import Programs from "@/components/Programs";
import Timetable from "@/components/Timetable";
import Coach from "@/components/Coach";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import TrialSection from "@/components/TrialSection";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import CheckoutNotice from "@/components/CheckoutNotice";

export default function Home() {
  return (
    <>
      <Header />
      <CheckoutNotice />
      <main>
        <Hero />
        <ObjectionGrid />
        <Programs />
        <Timetable />
        <Testimonials />
        <Coach />
        <Pricing />
        <FAQ />
        <TrialSection />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
