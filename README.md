# True Virtues Jiu Jitsu — Wimbledon

Conversion-optimised, serverless website for [True Virtues Jiu Jitsu](https://www.truevirtuesjiujitsu.com/), built with Next.js 15 + Tailwind CSS 4 and ready to deploy on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new) — zero config needed.

### Receiving signup leads by email

The form posts to a serverless function at `app/api/trial/route.ts`. Out of the box, leads are written to the Vercel function logs. To get them emailed to the gym inbox:

1. Create a free account at [resend.com](https://resend.com) (3,000 emails/month free)
2. In Vercel → Project → Settings → Environment Variables, add:
   - `RESEND_API_KEY` — your Resend API key (required)
   - `LEAD_TO_EMAIL` — where leads go (defaults to `truevirtuesjiujitsu@gmail.com`)
   - `LEAD_FROM_EMAIL` — a verified sender on your Resend domain (defaults to Resend's test sender)

Every lead — free or paid — carries its **campaign attribution** silently: `utm_source/medium/campaign/term/content`, ad-click IDs (`gclid`, `fbclid`, `msclkid`), referrer and landing page. These appear in a "Where they came from" block in the lead email (and in Stripe metadata for paid trials), so you can tell which ad or post produced each booking. Nothing is shown to the visitor.

### Optional paid trial (Stripe)

The site offers a **free** trial by default. To also offer a paid/reserved trial, set these env vars (see `.env.example`):

1. `STRIPE_SECRET_KEY` — from [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys) (start with a `sk_test_…` key)
2. `NEXT_PUBLIC_PAID_TRIAL_ENABLED=true` — reveals the "Reserve a paid trial" link under the free-trial card
3. Either `STRIPE_PRICE_ID` (a Price you created in Stripe) **or** `PAID_TRIAL_AMOUNT` in pence (e.g. `1000` = £10)

Checkout is handled on **Stripe's hosted page** — no card details ever touch this site. On success the visitor returns to `/?checkout=success` and sees a confirmation banner. Until `STRIPE_SECRET_KEY` is set, the paid trial stays hidden and the checkout endpoint returns a graceful 503.

### Favicon / icons

The browser tab icon, `icon.png` and `apple-icon.png` live in `app/` (Next.js wires them automatically). They're the academy's real logo mark pulled from the live site — replace those three files to change them.

## Can this be moved to WordPress? Will it hurt SEO?

Short answer: **you don't need to, and moving it could cost you.** Notes for the owner:

- **This isn't a WordPress site** — it's a Next.js app hosted free on Vercel. "Porting to WordPress" means *rebuilding* it as a WP theme; the rotating hero, instant signup form, campaign tracking and Stripe flow would all have to be recreated with plugins/page-builders, usually ending up slower and pricier (hosting + plugin licences).
- **SEO does not live in the platform.** It lives in your domain, your content, your URLs, your backlinks and — biggest of all for a local gym — your Google Business Profile (your 5.0★/31 reviews). Swapping platforms is SEO-neutral **if** you keep the same domain, keep the content, and **301-redirect old URLs to new ones**. Ripping pages out *without* redirects is what hurts.
- **URLs already match** the old site's important pages (`/womens-jiu-jitsu-wimbledon`, `/no-gi-jiu-jitsu-wimbledon`, `/junior-jiu-jitsu`) to preserve their ranking. Before switching the live domain, add 301 redirects for any other old URLs (`/bjj-classes-wimbledon`, `/membership`, `/about-us`, `/contact-us`, `/faq`) → their closest new equivalent (mostly the homepage or its anchors).
- **If the goal is owner self-editing:** that's the one real WordPress advantage. Cheaper alternatives that keep this site: (a) all copy/prices/times live in one file, `lib/site.ts`, which a developer edits in minutes, or (b) bolt on a free headless CMS (e.g. Sanity) later so the owner edits content in a friendly dashboard without touching code.

## ⚠️ Before launch — things to confirm with the gym

1. **Free trial for adults** — the current site charges £10 for adult trials (women's/junior are free). This site offers a free trial to everyone, which is the stronger conversion offer (Hormozi-style risk reversal), but the gym must agree to honour it.
2. **Competition team claim** — the FAQ says members get competition support and the team attends UK tournaments. Sanity-check the wording with the coach.
3. **Testimonials** — the reviews section quotes real Google Maps reviews (5.0★, 31 reviews as of July 2026). The named reviewers should be fine with being quoted; swap any on request in `lib/site.ts`.
4. **Domain** — `lib/site.ts` has the canonical URL set to `https://www.truevirtuesjiujitsu.com`. Point the domain at Vercel when ready.

Class times, photos and the logo were taken from the live truevirtuesjiujitsu.com site (July 2026): Tue 17:45 Juniors / 19:00 Gi · Thu 18:00 Women's / 19:00 No-Gi · Sat 11:00 Juniors / 12:15 Gi / 13:45 Open Mat.

## Editing content

All facts (address, pricing, timetable, FAQs, programs, contact details) live in one file: [`lib/site.ts`](lib/site.ts). Components render from it — edit there, not in the components.

## Conversion design decisions

Based on Alex Hormozi's *Gym Launch Secrets* / *$100M Offers* principles and high-converting gym landing pages:

- **Always-visible CTA** — "Book Your Free Trial" is in the fixed header on desktop and a sticky bottom bar on mobile; it never leaves the screen.
- **Outcome-led headline** — sells confidence, fitness and self-defence, not "we teach BJJ".
- **Risk reversal stacked** — free class, no payment details, no contracts, no joining fee, free membership freeze. Every "no" is removed.
- **Pre-emptive objection handling** — a dedicated "Is BJJ for me?" section plus a 10-question FAQ covering the real objections: never trained, not fit, too old, women's class, kids, competition, safety, what to wear.
- **Friction-minimal form** — 3 required fields + a class picker, with a "what happens next" walkthrough to reduce no-shows, honeypot spam protection, and phone/Instagram fallbacks.
- **Proof over promises** — black belt credentials, 14 years coaching, ADCC champion seminars, UKBJJA affiliation.
- **One page, one goal** — every section's CTA routes to the same form.

## SEO

- Title/description targeting "BJJ Wimbledon", "Brazilian Jiu Jitsu Wimbledon", "women's self defence Wimbledon", "kids martial arts SW19"
- `SportsActivityLocation` + `FAQPage` JSON-LD structured data (FAQ rich results eligible)
- `sitemap.xml` and `robots.txt` generated at build
- Open Graph image generated at the edge (`app/opengraph-image.tsx`)
- Semantic HTML, single `h1`, fast static page (only the form ships JavaScript)
