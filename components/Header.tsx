import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "#programs", label: "Classes" },
  { href: "#timetable", label: "Timetable" },
  { href: "#reviews", label: "Reviews" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Header({ minimal = false }: { minimal?: boolean }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="True Virtues Jiu Jitsu Wimbledon logo"
            width={40}
            height={38}
            priority
          />
          <span className="hidden font-display text-lg font-bold uppercase tracking-wide sm:block">
            True Virtues <span className="text-accent">Jiu Jitsu</span>
          </span>
        </Link>
        {!minimal && (
          <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#free-trial"
            data-analytics="header-book-trial"
            className="rounded-lg bg-accent px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-accent/25 transition hover:bg-accent-strong sm:px-5 sm:text-base"
          >
            Book Your Trial Class
          </a>
          {!minimal && <MobileMenu links={navLinks} />}
        </div>
      </div>
    </header>
  );
}
