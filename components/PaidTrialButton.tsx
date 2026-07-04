"use client";

import { useState } from "react";
import { captureTracking } from "@/lib/tracking";

// Renders only when NEXT_PUBLIC_PAID_TRIAL_ENABLED === "true". Sends the
// visitor to Stripe Checkout, carrying campaign IDs through as metadata.
const ENABLED = process.env.NEXT_PUBLIC_PAID_TRIAL_ENABLED === "true";

export default function PaidTrialButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  if (!ENABLED) return null;

  async function reserve() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(captureTracking()),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("No checkout URL");
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 text-center">
      <button
        type="button"
        onClick={reserve}
        disabled={loading}
        className="text-sm font-semibold text-stone-300 underline underline-offset-4 transition hover:text-white disabled:opacity-60"
      >
        {loading ? "Redirecting to secure checkout…" : "Prefer to pre-pay and lock in your spot? Reserve a paid trial →"}
      </button>
      {error && (
        <p className="mt-2 text-xs text-red-400">
          Couldn&apos;t start checkout — please use the trial form above instead.
        </p>
      )}
    </div>
  );
}
