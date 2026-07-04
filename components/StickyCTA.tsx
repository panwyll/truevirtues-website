"use client";

import { useEffect, useState } from "react";

// Mobile-only bottom bar so the trial CTA stays in thumb reach — but only
// once the hero (with its own big CTA) has scrolled away. Showing it over the
// hero would stack three identical "Book your free trial" buttons on screen at
// once, so it slides in after roughly one viewport of scroll.
export default function StickyCTA() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/95 p-3 backdrop-blur transition-transform duration-300 md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!shown}
    >
      <a
        href="#free-trial"
        data-analytics="sticky-book-trial"
        tabIndex={shown ? 0 : -1}
        className="block w-full rounded-lg bg-accent py-3.5 text-center text-base font-bold uppercase tracking-wide text-white"
      >
        Book Your Free Trial Class →
      </a>
    </div>
  );
}
