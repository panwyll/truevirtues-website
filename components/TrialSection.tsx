import { site } from "@/lib/site";
import TrialForm from "./TrialForm";
import MartialyticsBooking from "./MartialyticsBooking";

// When the gym's Martialytics widget is configured, it becomes the booking
// path (Option B). Until then, the built-in form is used as a fallback.
const martialyticsEnabled = Boolean(
  process.env.NEXT_PUBLIC_MARTIALYTICS_SCHOOL && process.env.NEXT_PUBLIC_MARTIALYTICS_HASH
);

export default function TrialSection({
  preselectProgram,
  heading,
}: {
  preselectProgram?: string;
  heading?: React.ReactNode;
}) {
  return (
    <section
      id="free-trial"
      className="border-t border-white/5 bg-[radial-gradient(ellipse_at_center,rgba(230,58,31,0.08),transparent_70%)] py-12 sm:py-18"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold sm:text-5xl">
              {heading ?? (
                <>
                  Book your <span className="text-accent">free trial class</span>
                </>
              )}
            </h2>
            <p className="mt-5 text-lg text-stone-300">
              Fill in the form and we&apos;ll confirm your class within 24 hours. Here&apos;s
              exactly what happens next:
            </p>
            <ol className="mt-6 space-y-4">
              {[
                "We call or text to confirm your class time and answer any questions.",
                "Turn up 15 minutes early — the coach will meet you, show you around and pair you with a friendly partner.",
                "Train the full class at your own pace. No pressure, no hard sell afterwards.",
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-display font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-stone-200">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-stone-400">
              Prefer to talk to a human?{" "}
              <a href={site.phoneHref} className="font-semibold text-accent">
                {site.phone}
              </a>{" "}
              · DM{" "}
              <a href={site.instagramUrl} className="font-semibold text-accent">
                @{site.instagram}
              </a>
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-panel p-6 sm:p-8">
            {martialyticsEnabled ? (
              <MartialyticsBooking />
            ) : (
              <TrialForm preselectProgram={preselectProgram} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
