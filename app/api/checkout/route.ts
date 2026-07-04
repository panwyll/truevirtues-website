import { NextResponse } from "next/server";
import Stripe from "stripe";

// Optional paid-trial checkout. Disabled until STRIPE_SECRET_KEY is set, so
// the trial form remains the default and the build works with no Stripe
// config. Uses Stripe Checkout (hosted) — no card data ever touches this site.

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

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Paid trial is not configured yet." }, { status: 503 });
  }

  const stripe = new Stripe(secret);

  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    /* empty body is fine */
  }

  // Campaign IDs ride through to Stripe metadata so paid signups are
  // attributable in the Stripe dashboard, same as the trial leads.
  const metadata: Record<string, string> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = body[key];
    if (typeof value === "string" && value.trim()) {
      metadata[key] = value.trim().slice(0, 490);
    }
  }
  if (typeof body.session === "string" && body.session.trim()) {
    metadata.class = body.session.trim().slice(0, 490);
  }

  const origin =
    request.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.truevirtuesjiujitsu.com";

  // Use a pre-made Price if provided, else an inline £-amount (pence).
  const priceId = process.env.STRIPE_PRICE_ID;
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = priceId
    ? [{ price: priceId, quantity: 1 }]
    : [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            unit_amount: Number(process.env.PAID_TRIAL_AMOUNT ?? 1000),
            product_data: {
              name: "Jiu Jitsu Trial Class — True Virtues Wimbledon",
              description: "Reserved trial class at YMCA Wimbledon.",
            },
          },
        },
      ];

  try {
    const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      metadata,
      payment_intent_data: { metadata },
      phone_number_collection: { enabled: true },
      success_url: `${origin}/?checkout=success`,
      cancel_url: `${origin}/?checkout=cancelled`,
    });
    return NextResponse.json({ url: checkout.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Could not start checkout." }, { status: 502 });
  }
}
