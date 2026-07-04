import { NextResponse } from "next/server";
import { site } from "@/lib/site";

// Serverless signup handler. With RESEND_API_KEY set it sends three emails via
// Resend's REST API: a lead notification to the gym, an instant confirmation
// to the customer, and a human-like follow-up scheduled for a sensible time.
// Without the key it logs the lead so the form still works out of the box.

const TO_EMAIL = process.env.LEAD_TO_EMAIL ?? "truevirtuesjiujitsu@gmail.com";
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL ?? "onboarding@resend.dev";
const COACH_NAME = process.env.COACH_NAME ?? "Mike";

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
  "referrer",
  "landing_page",
  "form_page",
];

// --- Europe/London time helpers (Vercel functions run in UTC) ---
function londonParts(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, p) => ((acc[p.type] = p.value), acc), {});
}

function londonHour(date: Date): number {
  return Number(londonParts(date).hour);
}

// Offset (ms) of Europe/London at a given instant, for DST-aware conversions.
function londonOffsetMs(date: Date): number {
  const p = londonParts(date);
  const asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return asUTC - date.getTime();
}

// UTC instant for `hour:00` London on ref's London day (+addDays).
function londonAt(ref: Date, hour: number, addDays = 0): Date {
  const p = londonParts(ref);
  const guess = Date.UTC(+p.year, +p.month - 1, +p.day + addDays, hour, 0, 0);
  const offset = londonOffsetMs(new Date(guess));
  return new Date(guess - offset);
}

// When to send the personal follow-up: soon after booking, but never in the
// small hours, and never so late it lands at/after the class itself.
function computeFollowupAt(now: Date, classAt: Date | null): Date | null {
  const QUIET_END = 8; // don't send before 08:00 London
  const QUIET_START = 20; // …or after 20:00 London
  let followup = new Date(now.getTime() + 40 * 60 * 1000); // ~40 min later

  const hour = londonHour(followup);
  if (hour < QUIET_END) followup = londonAt(followup, 9, 0); // this morning
  else if (hour >= QUIET_START) followup = londonAt(followup, 9, 1); // next morning

  if (classAt) {
    if (classAt.getTime() <= now.getTime()) return null; // class already passed
    // Would arrive too close to / after the class — the confirmation covers it.
    if (followup.getTime() > classAt.getTime() - 15 * 60 * 1000) return null;
  }
  return followup;
}

async function sendEmail(apiKey: string, payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend request failed:", err);
    return false;
  }
}

const addressLine = `${site.address.venue}, ${site.address.street}, ${site.address.postcode}`;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — real users never fill it. Return success so bots can't tell.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim(); // optional
  const session = String(body.session ?? "Not sure yet").trim().slice(0, 200);
  const sessionAtRaw = String(body.sessionAt ?? "").trim();

  if (!name || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Only treat the class time as usable if it parses and is in the future.
  const parsed = sessionAtRaw ? new Date(sessionAtRaw) : null;
  const classAt = parsed && !isNaN(parsed.getTime()) && parsed.getTime() > Date.now() ? parsed : null;

  const attribution: Record<string, string> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = body[key];
    if (typeof value === "string" && value.trim()) attribution[key] = value.trim().slice(0, 200);
  }

  const lead = {
    name,
    email,
    phone: phone || "(not provided)",
    session,
    ...attribution,
    receivedAt: new Date().toISOString(),
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("Trial lead (set RESEND_API_KEY to send emails):", lead);
    return NextResponse.json({ ok: true });
  }

  const classDayLabel = classAt
    ? new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", weekday: "long" }).format(classAt)
    : null;

  // 1) Notify the gym.
  const gymOk = await sendEmail(apiKey, {
    from: `True Virtues Website <${FROM_EMAIL}>`,
    to: [TO_EMAIL],
    reply_to: email,
    subject: `🥋 New trial signup: ${name}`,
    text: [
      `New trial booking from the website:`,
      ``,
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Phone:   ${phone || "(not provided)"}`,
      `Class:   ${session}`,
      ``,
      `A confirmation has been sent to them, plus a follow-up${
        classAt ? "" : " (no specific class time selected)"
      }. Reply here or call/text to confirm.`,
      ...(Object.keys(attribution).length
        ? [``, `— Where they came from —`, ...Object.entries(attribution).map(([k, v]) => `${k}: ${v}`)]
        : []),
    ].join("\n"),
  });

  // 2) Confirm to the customer, immediately.
  await sendEmail(apiKey, {
    from: `True Virtues Jiu Jitsu <${FROM_EMAIL}>`,
    to: [email],
    reply_to: TO_EMAIL,
    subject: "You're booked in at True Virtues Jiu Jitsu 🥋",
    text: [
      `Hi ${name},`,
      ``,
      classAt
        ? `Thanks for booking your trial class — you're in for:\n${session}`
        : `Thanks for booking a trial class. We'll be in touch to lock in a time that suits you.`,
      ``,
      `What to bring:`,
      `• Comfortable sportswear (no zips or buttons) and a bottle of water`,
      `• That's it — we'll lend you a gi if you need one`,
      ``,
      `Turn up about 15 minutes early so the coach can meet you, show you around, and pair you with a friendly partner. No experience needed and no pressure — just come and try it.`,
      ``,
      `Where: ${addressLine}`,
      `Directions: ${site.address.mapsUrl}`,
      ``,
      `Any questions, just reply to this email or call ${site.phone}.`,
      ``,
      `See you on the mats,`,
      `True Virtues Jiu Jitsu`,
    ].join("\n"),
  });

  // 3) Personal, human-like follow-up — scheduled for a sensible time.
  const followupAt = computeFollowupAt(new Date(), classAt);
  if (followupAt) {
    await sendEmail(apiKey, {
      from: `${COACH_NAME} at True Virtues <${FROM_EMAIL}>`,
      to: [email],
      reply_to: TO_EMAIL,
      subject: "Looking forward to meeting you",
      scheduled_at: followupAt.toISOString(),
      text: [
        `Hi ${name},`,
        ``,
        `It's ${COACH_NAME} from True Virtues Jiu Jitsu — just a quick personal note to say thanks for booking a trial with us.${
          classDayLabel ? ` We're really looking forward to seeing you on ${classDayLabel}.` : ""
        }`,
        ``,
        `If you've got any questions at all before you come down — what to wear, where to park, first-time nerves, whether it's really for you — just hit reply and I'll get back to you myself.`,
        ``,
        `See you soon,`,
        `${COACH_NAME}`,
      ].join("\n"),
    });
  }

  if (!gymOk) {
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
