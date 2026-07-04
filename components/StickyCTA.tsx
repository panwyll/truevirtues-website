// Mobile-only bottom bar so the trial CTA stays on screen even when the
// header CTA scrolls out of thumb reach.
export default function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/95 p-3 backdrop-blur md:hidden">
      <a
        href="#free-trial"
        data-analytics="sticky-book-trial"
        className="block w-full rounded-lg bg-accent py-3.5 text-center text-base font-bold uppercase tracking-wide text-white"
      >
        Book Your Trial Class →
      </a>
    </div>
  );
}
