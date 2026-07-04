import { NextResponse } from "next/server";
import { site } from "@/lib/site";

// Serverless signup handler. Every booking is forwarded to Martialytics as a
// lead. With RESEND_API_KEY set it also emails a lead alert to the gym, an
// instant confirmation to the customer, class reminders, and Mike's personal
// follow-up (sociable-hours scheduled), and adds the customer to a Resend
// Audience for broadcasts. Without the Resend key it logs the lead so the
// form still works.

const TO_EMAIL = process.env.LEAD_TO_EMAIL ?? "truevirtuesjiujitsu@gmail.com";
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL ?? "onboarding@resend.dev";
// The booker is added to this Resend Audience (fires the gym's follow-up
// automation). If no explicit ID is set, we auto-find/create an audience by
// name — so it works with zero config. Set the name Mike wants to trigger on.
const AUDIENCE_NAME = process.env.RESEND_AUDIENCE_NAME ?? "New Leads";
// Cached across warm invocations so we don't re-resolve on every booking.
let cachedAudienceId = process.env.RESEND_AUDIENCE_ID ?? "";

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

// Find the audience named AUDIENCE_NAME, creating it if it doesn't exist yet.
// Returns its ID (empty string on failure). Result is cached per instance.
async function resolveAudienceId(apiKey: string): Promise<string> {
  if (cachedAudienceId) return cachedAudienceId;
  const headers = { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" };
  try {
    const listRes = await fetch("https://api.resend.com/audiences", { headers });
    if (listRes.ok) {
      const list = await listRes.json();
      const found = (list?.data ?? []).find(
        (a: { id: string; name: string }) => a.name === AUDIENCE_NAME
      );
      if (found?.id) {
        cachedAudienceId = found.id;
        return cachedAudienceId;
      }
    }
    const createRes = await fetch("https://api.resend.com/audiences", {
      method: "POST",
      headers,
      body: JSON.stringify({ name: AUDIENCE_NAME }),
    });
    if (createRes.ok) {
      const created = await createRes.json();
      cachedAudienceId = created?.id ?? "";
      return cachedAudienceId;
    }
    console.error("Resend audience resolve failed:", createRes.status, await createRes.text());
  } catch (err) {
    console.error("Resend audience resolve error:", err);
  }
  return "";
}

const addressLine = `${site.address.venue}, ${site.address.street}, ${site.address.postcode}`;

// UTC instant for `hour:minute` Europe/London on the London date of `ref`
// (DST-aware). Used to schedule the "morning of" reminder at ~7:30am UK.
function londonAt(ref: Date, hour: number, minute: number): Date {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = (d: Date) =>
    fmt.formatToParts(d).reduce<Record<string, string>>((a, p) => ((a[p.type] = p.value), a), {});
  const p = parts(ref);
  const guess = Date.UTC(+p.year, +p.month - 1, +p.day, hour, minute, 0);
  const g = parts(new Date(guess));
  const offset = Date.UTC(+g.year, +g.month - 1, +g.day, +g.hour, +g.minute, +g.second) - guess;
  return new Date(guess - offset);
}

// London wall-clock hour (0-23) for an instant.
function londonHour(d: Date): number {
  return +new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    hourCycle: "h23",
  }).format(d);
}

// Mike's personal follow-up only goes out between these London hours, so nobody
// gets a chatty "just saw your signup" note at 3am.
const FOLLOWUP_FROM_HOUR = 8;
const FOLLOWUP_TO_HOUR = 21;

// Nudge an instant into the next sociable window: before 8am → 8am today,
// 9pm or later → 8am tomorrow, otherwise leave it as-is.
function toSociableHours(t: Date): Date {
  const h = londonHour(t);
  if (h < FOLLOWUP_FROM_HOUR) return londonAt(t, FOLLOWUP_FROM_HOUR, 0);
  if (h >= FOLLOWUP_TO_HOUR)
    return londonAt(new Date(t.getTime() + 24 * 60 * 60 * 1000), FOLLOWUP_FROM_HOUR, 0);
  return t;
}

// Mike's conversational, per-class follow-up — warm, brief, first-person, the
// note a coach would actually send. Tone and kit advice vary by program.
function mikeFollowUp(o: {
  firstName: string;
  program: string;
  whenPhrase: string;
  hasClass: boolean;
}): { subject: string; text: string } {
  const { firstName, program, whenPhrase, hasClass } = o;
  const isJunior = program === "juniors";

  const kit =
    program === "gi"
      ? `You'll need a gi for this one — if you haven't got one, just shout and I'll point you towards a good starter one. Otherwise comfy sportswear (no zips or buttons) and a bottle of water.`
      : program === "juniors"
        ? `They'll need a gi for this one — if you haven't got one yet just let me know and I'll point you towards a good starter one. Otherwise comfy sportswear (no zips or buttons) and a water bottle.`
        : program === "nogi"
          ? `No gi needed for this one — just a rashguard or a plain t-shirt, shorts or leggings (nothing with zips, buttons or pockets), and a bottle of water.`
          : program === "womens"
            ? `Just comfy sportswear (nothing with zips or buttons) and a bottle of water — that's all you need. You'll be paired with someone similar in size and experience, so there's nothing to feel nervous about.`
            : `Just comfy sportswear (no zips or buttons) and a bottle of water — that's everything you need for a first class.`;

  const opener = isJunior
    ? hasClass
      ? `Just saw the signup — looking forward to getting them on the mats ${whenPhrase}!`
      : `Just saw the signup — I'll sort a class that suits and get them on the mats soon.`
    : hasClass
      ? `Just saw your signup — looking forward to catching you in class ${whenPhrase}!`
      : `Just saw your signup — I'll sort you a class that fits and get you on the mats soon.`;

  const early = isJunior
    ? `If you can get here about 15 minutes early so I can say hi and get a quick form filled in, that'd be great.`
    : `If you can get here about 15 minutes early so I can say hi, show you around and get a quick form filled in, that'd be great.`;

  const subject = isJunior
    ? `Looking forward to your little one's first class 🥋`
    : hasClass
      ? `Looking forward to your first class 🥋`
      : `Let's get you on the mats 🥋`;

  const text = [
    `Hey ${firstName},`,
    ``,
    opener,
    ``,
    kit,
    ``,
    early,
    ``,
    `Any questions at all, just text me on ${site.phone}.`,
    ``,
    `Cheers,`,
    `Mike`,
  ].join("\n");

  return { subject, text };
}

// Martialytics school ID for lead forwarding (public value from the leads
// widget; overridable via env). Set to "" in env to disable forwarding.
const MA_SCHOOL_ID =
  process.env.MARTIALYTICS_SCHOOL_ID ?? "03f505c2-a968ab45-b050c125-60c6c2b8";

// Forward the booking to Martialytics as a lead so it lands in the gym's
// management system. Best-effort — never blocks the booking response.
async function forwardToMartialytics(lead: {
  name: string;
  email: string;
  phone: string;
  interests: string;
  localTime: string;
}) {
  if (!MA_SCHOOL_ID) return;
  const params = new URLSearchParams({
    ma_school_id: MA_SCHOOL_ID,
    ma_fullname: lead.name,
    ma_email: lead.email,
    ma_phone: lead.phone,
    ma_interests: lead.interests,
    ma_referral: "Website",
    ma_local_time: lead.localTime,
    email: "", // honeypot must stay empty
  });
  try {
    const res = await fetch("https://services.martialytics.com/widgets/leads", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    if (!res.ok) console.error("Martialytics lead error:", res.status, await res.text());
  } catch (err) {
    console.error("Martialytics lead request failed:", err);
  }
}

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
  const localTime = String(body.localTime ?? "0").trim().slice(0, 6);
  const program = String(body.program ?? "").trim().slice(0, 40);

  if (!name || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Only treat the class time as usable if it parses and is in the future.
  const parsed = sessionAtRaw ? new Date(sessionAtRaw) : null;
  const classAt = parsed && !isNaN(parsed.getTime()) && parsed.getTime() > Date.now() ? parsed : null;
  // Weekday of the class (e.g. "Tuesday") so automations can branch by day.
  const classDay = classAt
    ? new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", weekday: "long" }).format(classAt)
    : "";
  // How soon the class is, in London calendar terms: today | tomorrow | later
  // (empty if no class picked). Lets automations handle short-notice bookings.
  const classWhen = (() => {
    if (!classAt) return "";
    const key = (d: Date) =>
      new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/London",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(d);
    const now = new Date();
    const classKey = key(classAt);
    if (classKey === key(now)) return "today";
    if (classKey === key(new Date(now.getTime() + 24 * 60 * 60 * 1000))) return "tomorrow";
    return "later";
  })();
  // Ready-to-drop-in phrase for the follow-up: "today" / "tomorrow" / "on Tuesday".
  const whenPhrase =
    classWhen === "today"
      ? "today"
      : classWhen === "tomorrow"
        ? "tomorrow"
        : classDay
          ? `on ${classDay}`
          : "soon";

  // Gi and Juniors train in a gi; flag it so the confirmation can nudge them to
  // sort one out. (Women's is intentionally left out for now, no-gi never needs one.)
  const needsGi = program === "gi" || program === "juniors";

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

  // Forward to Martialytics on every booking, regardless of email config.
  await forwardToMartialytics({ name, email, phone, interests: session, localTime });

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
      `They've had an instant confirmation, and Mike's personal follow-up is scheduled to land at a sociable time before the class. Reply here or call/text to confirm.`,
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
      ...(needsGi
        ? [
            `• A gi (kimono) for this class — if you haven't got one yet, just reply and Mike will point you to a good starter one`,
          ]
        : [`• That's everything you need for a first class`]),
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

  const [firstName, ...rest] = name.split(" ");

  // 2b) Class reminders to cut no-shows — scheduled at booking time (Resend
  //     allows up to 30 days out, covering the whole booking window). Only
  //     scheduled when the send time is still in the future.
  if (classAt) {
    const now = Date.now();
    const bring = `Bring comfortable sportswear (no zips or buttons) and water. Arrive about 15 minutes early.`;

    const reminder24h = new Date(classAt.getTime() - 24 * 60 * 60 * 1000);
    if (reminder24h.getTime() > now) {
      await sendEmail(apiKey, {
        from: `True Virtues Jiu Jitsu <${FROM_EMAIL}>`,
        to: [email],
        reply_to: TO_EMAIL,
        scheduled_at: reminder24h.toISOString(),
        subject: "Your trial class is tomorrow 🥋",
        text: [
          `Hi ${firstName || name},`,
          ``,
          `Quick reminder — your trial class at True Virtues is tomorrow:`,
          session,
          ``,
          bring,
          ``,
          `Where: ${addressLine}`,
          `Directions: ${site.address.mapsUrl}`,
          ``,
          `Can't make it? Just reply or call ${site.phone} and we'll rebook you.`,
          ``,
          `See you tomorrow,`,
          `True Virtues Jiu Jitsu`,
        ].join("\n"),
      });
    }

    const morningOf = londonAt(classAt, 7, 30);
    if (morningOf.getTime() > now && morningOf.getTime() < classAt.getTime()) {
      await sendEmail(apiKey, {
        from: `True Virtues Jiu Jitsu <${FROM_EMAIL}>`,
        to: [email],
        reply_to: TO_EMAIL,
        scheduled_at: morningOf.toISOString(),
        subject: "See you today at True Virtues 🥋",
        text: [
          `Hi ${firstName || name},`,
          ``,
          `Today's the day — see you at your trial class:`,
          session,
          ``,
          bring,
          ``,
          `Where: ${addressLine}`,
          ``,
          `If something's come up, reply or call ${site.phone} and we'll rebook you.`,
          ``,
          `See you on the mats,`,
          `True Virtues Jiu Jitsu`,
        ].join("\n"),
      });
    }
  }

  // 3) Add the booker as a contact in the "New Leads" Resend Audience (created
  //    automatically if needed) — a persistent list for broadcasts.
  const audienceId = await resolveAudienceId(apiKey);
  if (audienceId) {
    try {
      const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
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

  // 4) Mike's personal follow-up — the conversational "just saw your signup"
  //    note, sent from code (not a Resend automation) so we control timing.
  //    Held to sociable London hours (8am–9pm) and always landed before the
  //    class; skipped only if the class is so imminent that a prompt send would
  //    already be too late (the confirmation has them covered either way).
  const nowMs = Date.now();
  let followUpAt: Date | null = toSociableHours(new Date(nowMs + 15 * 60 * 1000));
  if (classAt && followUpAt.getTime() >= classAt.getTime()) {
    const prompt = new Date(nowMs + 15 * 60 * 1000);
    followUpAt = prompt.getTime() < classAt.getTime() ? prompt : null;
  }
  if (followUpAt) {
    const fu = mikeFollowUp({
      firstName: firstName || name,
      program,
      whenPhrase,
      hasClass: !!classAt,
    });
    await sendEmail(apiKey, {
      from: `Mike at True Virtues <${FROM_EMAIL}>`,
      to: [email],
      reply_to: TO_EMAIL,
      scheduled_at: followUpAt.toISOString(),
      subject: fu.subject,
      text: fu.text,
    });
  }

  if (!gymOk) {
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
