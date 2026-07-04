"use client";

import { useEffect, useState } from "react";

// Shows a confirmation/cancel banner after returning from Stripe Checkout
// (?checkout=success | cancelled), then cleans the URL.
export default function CheckoutNotice() {
  const [state, setState] = useState<"success" | "cancelled" | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("checkout");
    if (value === "success" || value === "cancelled") {
      setState(value);
      params.delete("checkout");
      const qs = params.toString();
      window.history.replaceState(
        {},
        "",
        window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash
      );
    }
  }, []);

  if (!state) return null;

  const success = state === "success";
  return (
    <div className="fixed inset-x-0 top-16 z-40 px-4">
      <div
        className={`mx-auto max-w-2xl rounded-lg border p-4 text-center text-sm backdrop-blur ${
          success
            ? "border-accent bg-accent/15 text-white"
            : "border-white/20 bg-panel/90 text-stone-200"
        }`}
        role="status"
      >
        {success ? (
          <>
            <strong>Payment received — you&apos;re booked in! 🥋</strong> We&apos;ll be in touch
            within 24 hours to confirm your class time.
          </>
        ) : (
          <>Checkout cancelled — no payment was taken. You can still book a free trial below.</>
        )}
        <button
          type="button"
          onClick={() => setState(null)}
          className="ml-3 font-semibold underline underline-offset-2"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
