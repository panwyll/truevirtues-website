import { NextResponse } from "next/server";
import { site } from "@/lib/site";

// Serverless signup handler. With RESEND_API_KEY set it emails a lead alert to
// the gym and an instant confirmation to the customer, then adds the customer
// to a Resend Audience so a Resend Automation (managed by the gym) can handle
// the follow-up. Without the key it logs the lead so the form still works.

const TO_EMAIL = process.env.LEAD_TO_EMAIL ?? "truevirtuesjiujitsu@gmail.com";
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL ?? "onboarding@resend.dev";
// Resend Audience the booker is added to (fires the gym's follow-up automation).
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

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

  // 1) Notify the gym.
  const gymOk = await sendEmail(apiKey, {
    from: `True Virtues Website <${FROM_EMAIL}>`,
    to: [TO_EMAIL],
    reply_to: email,
    subject: `🥋 New free trial signup: ${name}`,
    text: [
      `New free trial booking from the website:`,
      ``,
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Phone:   ${phone || "(not provided)"}`,
      `Class:   ${session}${classAt ? "" : " (no specific time selected)"}`,
      ``,
      `A confirmation has been sent to them and they've been added to your Resend audience for follow-up. Reply here or call/text to confirm.`,
      ...(Object.keys(attribution).length
        ? [``, `— Where they came from —`, ...Object.entries(attribution).map(([k, v]) => `${k}: ${v}`)]
        : []),
    ].join("\n"),
  });

  // 2) Confirm to the customer, immediately — cc the gym so they see the
  //    exact confirmation the customer received.
  await sendEmail(apiKey, {
    from: `True Virtues Jiu Jitsu <${FROM_EMAIL}>`,
    to: [email],
    cc: [TO_EMAIL],
    reply_to: TO_EMAIL,
    subject: "You're booked in at True Virtues Jiu Jitsu 🥋",
    text: [
      `Hi ${name},`,
      ``,
      classAt
        ? `Thanks for booking your free trial class — you're in for:\n${session}`
        : `Thanks for booking a free trial class. We'll be in touch to lock in a time that suits you.`,
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

  // 3) Add the booker as a contact in the Resend Audience. Mike sets up a
  //    Resend Automation that triggers on "contact added", so he manages the
  //    follow-up sequence himself from the Resend dashboard. No-op if no
  //    audience is configured.
  if (AUDIENCE_ID) {
    const [firstName, ...rest] = name.split(" ");
    try {
      const res = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          first_name: firstName || name,
          last_name: rest.join(" "),
          unsubscribed: false,
        }),
      });
      if (!res.ok) console.error("Resend contact error:", res.status, await res.text());
    } catch (err) {
      console.error("Resend contact request failed:", err);
    }
  }

  if (!gymOk) {
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
