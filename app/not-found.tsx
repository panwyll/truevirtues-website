import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { sitePages } from "@/lib/site";

// Branded 404 — the safety net for any old/orphaned URL that doesn't map to a
// current page, so visitors land somewhere useful instead of a blank error.
export default function NotFound() {
  return (
    <>
      <Header minimal />
      <main className="mx-auto max-w-3xl px-4 pt-36 pb-24 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Error 404</p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-lg text-stone-300">
          The page you&apos;re after has moved or doesn&apos;t exist. Here&apos;s where to head
          instead:
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-lg bg-accent px-8 py-4 text-lg font-bold uppercase tracking-wide text-white transition hover:bg-accent-strong"
          >
            Back to home
          </Link>
          <Link
            href="/classes"
            className="rounded-lg border border-white/25 px-8 py-4 text-lg font-semibold text-white transition hover:border-white/60"
          >
            See the classes
          </Link>
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-stone-400">
          {sitePages.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="hover:text-accent">
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
