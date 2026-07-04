"use client";

import { useEffect, useRef, useState } from "react";

type NavLink = { href: string; label: string };

export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Close on any pointer-down outside the panel and the burger button
    // (header, page content, dimmed backdrop — anywhere but the menu itself).
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white transition hover:border-white/40"
      >
        <span className="relative block h-4 w-5" aria-hidden>
          <span
            className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
              open ? "top-1.5 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-all duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
              open ? "top-1.5 -rotate-45" : "top-3"
            }`}
          />
        </span>
      </button>

      {open && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 top-16 z-40 bg-ink/70 backdrop-blur-sm"
          />
          <nav
            ref={panelRef}
            id="mobile-menu"
            className="fixed inset-x-0 top-16 z-40 border-b border-white/10 bg-ink px-4 py-4 shadow-2xl shadow-black/50"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    data-analytics={`mobile-nav-${l.label.toLowerCase()}`}
                    className="block border-b border-white/5 py-3 text-lg font-medium text-stone-200 transition hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#free-trial"
              onClick={() => setOpen(false)}
              data-analytics="mobile-nav-book-trial"
              className="mt-4 block rounded-lg bg-accent py-3.5 text-center text-base font-bold uppercase tracking-wide text-white transition hover:bg-accent-strong"
            >
              Book Your Free Trial
            </a>
          </nav>
        </>
      )}
    </div>
  );
}
