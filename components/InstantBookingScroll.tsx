"use client";

import { useEffect } from "react";

// The booking section sits at the bottom of a long page, so the global
// smooth-scroll makes "Book Your Trial Class" feel slow. This makes every
// booking CTA (any link to #free-trial) jump instantly, while short nav
// links keep the smooth scroll. One delegated listener covers them all.
export default function InstantBookingScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const link = (e.target as HTMLElement).closest?.('a[href="#free-trial"]');
      if (!link) return;
      const target = document.getElementById("free-trial");
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
      history.replaceState(null, "", "#free-trial");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
