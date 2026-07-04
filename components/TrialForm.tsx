"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { site, timetable } from "@/lib/site";
import { captureTracking, type Tracking } from "@/lib/tracking";

type Status = "idle" | "submitting" | "success" | "error";
// `value` is the ISO datetime (unique per session, machine-readable for the
// server's time guards); `label` is what the user reads.
type Session = { value: string; label: string; programId: string };

// Fire a "trial_booked" conversion into whatever analytics is present
// (GTM dataLayer, GA4/Ads gtag, Vercel Analytics, or a DOM event). No-ops
// safely when no analytics tag is installed.
function trackConversion(detail: Record<string, string>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "trial_booked", ...detail });
  if (typeof w.gtag === "function") {
    w.gtag("event", "trial_booked", detail);
  }
  // Vercel Analytics custom event (no-op until Web Analytics is enabled).
  track("trial_booked", detail);
  window.dispatchEvent(new CustomEvent("trial_booked", { detail }));
}

// Upcoming bookable sessions from the weekly timetable, computed on the
// client only (dates depend on "now", so SSR would hydration-mismatch).
function upcomingSessions(daysAhead = 14): Session[] {
  const now = new Date();
  const sessions: { at: Date; entry: (typeof timetable)[number] }[] = [];
  for (let offset = 0; offset < daysAhead; offset++) {
    const date = new Date(now);
    date.setDate(now.getDate() + offset);
    for (const entry of timetable) {
      if (!entry.bookable || date.getDay() !== entry.day) continue;
      const [h, m] = entry.start.split(":").map(Number);
      const at = new Date(date);
      at.setHours(h, m, 0, 0);
      if (at <= now) continue;
      sessions.push({ at, entry });
    }
  }
  sessions.sort((a, b) => a.at.getTime() - b.at.getTime());
  return sessions.map(({ at, entry }) => {
    const day = at.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
    const label = `${entry.className} — ${day}, ${entry.start}–${entry.end} (${entry.type})`;
    return { value: at.toISOString(), label, programId: entry.programId };
  });
}

export default function TrialForm({ preselectProgram }: { preselectProgram?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selected, setSelected] = useState("");
  const [tracking, setTracking] = useState<Tracking>({});

  useEffect(() => {
    const upcoming = upcomingSessions();
    setSessions(upcoming);
    if (preselectProgram) {
      const match = upcoming.find((s) => s.programId === preselectProgram);
      if (match) setSelected(match.value);
    }
    setTracking(captureTracking());
  }, [preselectProgram]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    // The select submits the ISO datetime; translate to a readable label and
    // pass the ISO separately so the server can reason about the class time.
    const chosen = sessions.find((s) => s.value === data.session);
    const sessionLabel = chosen ? chosen.label : "Not sure yet — recommend one for me";
    const sessionAt = chosen ? chosen.value : "";
    setStatus("submitting");
    try {
      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Attribution rides along silently — never shown in the UI.
        body: JSON.stringify({
          ...data,
          session: sessionLabel,
          sessionAt,
          ...tracking,
          form_page: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
      form.reset();
      setSelected("");
      trackConversion({ session: sessionLabel, ...tracking });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border-2 border-accent bg-accent/10 p-8 text-center">
        <p className="font-display text-2xl font-bold uppercase text-accent">
          You&apos;re booked in! 🥋
        </p>
        <p className="mt-3 text-stone-200">
          We&apos;ll text or email you within 24 hours to confirm your free trial class and answer any
          questions. Just bring sportswear and water — we&apos;ll sort the rest.
        </p>
        <p className="mt-4 text-sm text-stone-400">
          Can&apos;t wait? Call us on{" "}
          <a href={site.phoneHref} className="text-accent underline">
            {site.phone}
          </a>{" "}
          or DM{" "}
          <a href={site.instagramUrl} className="text-accent underline">
            @{site.instagram}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot: bots fill every field; humans never see this one. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-stone-300">First name *</span>
          <input
            required
            name="name"
            autoComplete="given-name"
            placeholder="Alex"
            className="w-full rounded-lg border border-white/15 bg-ink px-4 py-3 text-white placeholder-stone-500 outline-none transition focus:border-accent"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-stone-300">
            Phone <span className="text-stone-500">(optional)</span>
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="07XXX XXXXXX"
            className="w-full rounded-lg border border-white/15 bg-ink px-4 py-3 text-white placeholder-stone-500 outline-none transition focus:border-accent"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-stone-300">Email *</span>
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full rounded-lg border border-white/15 bg-ink px-4 py-3 text-white placeholder-stone-500 outline-none transition focus:border-accent"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-stone-300">
          Pick your free class *
        </span>
        <select
          required
          name="session"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-ink px-4 py-3 text-white outline-none transition focus:border-accent"
        >
          <option value="" disabled>
            {sessions.length ? "Choose a class and date…" : "Loading upcoming classes…"}
          </option>
          {sessions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
          <option value="unsure">Not sure yet — recommend one for me</option>
        </select>
      </label>
      <button
        type="submit"
        data-analytics="trial-form-submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-accent py-4 text-lg font-bold uppercase tracking-wide text-white shadow-xl shadow-accent/30 transition hover:bg-accent-strong disabled:opacity-60"
      >
        {status === "submitting" ? "Booking…" : "Claim My Free Trial Class"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong — please call {site.phone} or email{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>{" "}
          and we&apos;ll book you in directly.
        </p>
      )}
      <p className="text-center text-xs text-stone-500">
        No obligation, no payment details needed. We&apos;ll only use your details to arrange your
        free trial class.
      </p>
    </form>
  );
}
