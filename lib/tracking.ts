// Silent attribution capture. Reads UTM + ad-click IDs from the URL and
// persists them for the session, so a lead that lands on an ad URL and only
// submits later (or after navigating) still carries its campaign data.

export type Tracking = Record<string, string>;

const STORE_KEY = "tvjj_attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const CLICK_KEYS = ["gclid", "fbclid", "msclkid"];

export function captureTracking(): Tracking {
  if (typeof window === "undefined") return {};

  let stored: Tracking = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(STORE_KEY) || "{}");
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  const fresh: Tracking = {};
  for (const key of [...UTM_KEYS, ...CLICK_KEYS]) {
    const value = params.get(key);
    if (value) fresh[key] = value.slice(0, 200);
  }

  // Latest campaign touch wins; first-touch landing page + referrer are kept.
  const merged: Tracking = { ...stored, ...fresh };
  if (!merged.landing_page) merged.landing_page = window.location.pathname;
  if (!merged.referrer) merged.referrer = document.referrer || "direct";

  try {
    sessionStorage.setItem(STORE_KEY, JSON.stringify(merged));
  } catch {
    /* private mode / storage full — non-fatal, we still return merged */
  }

  return merged;
}
