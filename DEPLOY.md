# Deployment & domain cutover — one-sitting guide

Everything to take the site live on `truevirtuesjiujitsu.com` with the owner
present. **Golden rule: get everything working on the temporary `.vercel.app`
URL first, and touch the real domain _last_.** If DNS is slow to propagate, the
old site keeps serving until it flips — so there's no downtime window.

---

## The day before (optional but makes the cutover near-instant)

DNS changes are cached for the length of each record's **TTL**. If the current
records have a long TTL (often 1 hour or more), the cutover could take that long
to take effect. To avoid it:

1. Log into **IONOS → the domain's DNS settings**.
2. Find the current **A record** (`@` / root) and the **`www` CNAME** that point
   at the existing site.
3. Lower their **TTL to 300 seconds (5 minutes)**. Don't change the values yet —
   just the TTL.

Do this at least a few hours (ideally 24h) before the session, so the *old* long
TTL expires and resolvers start honouring the new 5-minute one. Then when you
change the records during the session, the switch propagates in ~5 minutes
instead of hours.

If you can't plan a day ahead, skip this — it just means the cutover may take a
few hours to fully propagate (still no downtime).

---

## Before the session — have ready

- His **GitHub**, **Google**, and **Vercel** logins (create accounts as _him_).
- His **IONOS login** (this is where the DNS lives).
- A **card for Vercel Pro** ($20/mo — required for commercial use).

---

## Step 1 — Get the code into his GitHub (browser)

1. Signed into GitHub **as him**, go to **github.com/new/import**.
2. Clone URL: `https://github.com/panwyll/truevirtues-website`
3. Name it `truevirtues-website`, set **Private**, **Begin import**.

## Step 2 — Deploy on Vercel (browser)

1. **vercel.com → "Continue with GitHub"**, signed in as him.
2. **Add New… → Project** → import `truevirtues-website`.
3. It auto-detects Next.js — leave defaults → **Deploy**.
4. ~90s later it's live on a `…vercel.app` URL. Keep that tab open.

## Step 3 — Resend (so the emails send)

Domain verification is DNS-only — **no mailbox needed**. You send *from* a
made-up address like `hello@truevirtuesjiujitsu.com`; replies route to Gmail.

1. Sign up at **resend.com** (free: 3,000/mo).
2. **Domains → Add Domain** → `truevirtuesjiujitsu.com`. Resend shows ~3 records
   (SPF, DKIM, and a bounce **MX on a `send.` subdomain**). Note them — you'll add
   them in Step 6 alongside the Vercel ones. The `send.` subdomain means these
   **don't touch his existing email**.
3. **API Keys → Create API Key** → copy it (`re_…`, shown once).

## Step 4 — Environment variables (Vercel → Project → Settings → Environment Variables)

| Name | Value |
|---|---|
| `RESEND_API_KEY` | the `re_…` key |
| `LEAD_FROM_EMAIL` | `hello@truevirtuesjiujitsu.com` (virtual sender on the verified domain) |
| `LEAD_TO_EMAIL` | `truevirtuesjiujitsu@gmail.com` (where he reads bookings) |
| `COACH_NAME` | `Mike` |

Optional / skip unless needed:
- `NEXT_PUBLIC_SITE_URL` = `https://www.truevirtuesjiujitsu.com` — only a fallback
  for Stripe return links; not needed for the site or emails.
- `NEXT_PUBLIC_GA_ID`, Stripe vars, Martialytics vars — all in `.env.example`,
  all dormant until set.

**Redeploy** after adding vars (Deployments → ⋯ → Redeploy).

## Step 5 — Test BEFORE touching the domain

On the `.vercel.app` URL, submit a real trial booking. Confirm:
- Gym inbox gets the **lead alert** + the **CC'd confirmation**.
- The test email address gets the **confirmation** and (shortly after) the
  **follow-up**.

Only proceed once email works.

## Step 6 — The domain cutover

1. **Vercel → Project → Settings → Domains → Add** `truevirtuesjiujitsu.com`.
   Vercel shows the exact records it wants (typically an **A record** `@` →
   `76.76.21.21` and a **CNAME** `www` → `cname.vercel-dns.com`).
2. **In IONOS DNS, in one pass, add/update:**
   - **Vercel:** the A record (`@`) and the `www` CNAME to Vercel's values above.
   - **Resend:** the SPF, DKIM, and `send.` MX records from Step 3.
   - **Leave the MX records for the root domain alone** (they route email).
   - **Do NOT change nameservers** — only edit individual records.
3. Back in Vercel, set **www as the primary domain** so the apex redirects to
   `www.truevirtuesjiujitsu.com` (matches the site's canonical URLs).
4. Wait for propagation (≈5 min if you lowered TTL, otherwise up to a few hours).
   Vercel auto-issues the **HTTPS certificate** once DNS resolves; Resend flips to
   **Verified**.

## Step 7 — Verify & tidy up

- Visit **https://www.truevirtuesjiujitsu.com** — new site, padlock (HTTPS) shows.
- Submit one more test booking on the live domain.
- Old URLs still work: try `https://www.truevirtuesjiujitsu.com/about-us/` — it
  should land on the page (trailing slash auto-redirects). SEO carries over
  because the URLs match; no manual redirects needed.
- **Add yourself as collaborator:** his GitHub repo → Settings → Collaborators;
  and invite yourself to his Vercel project — so you can push updates.
- **Delete** the public `panwyll/truevirtues-website` (it was only the transfer
  vehicle).

## Notes

- **Change DNS records, not nameservers.** Editing just the A/CNAME repoints the
  website while leaving email untouched. Switching nameservers to Vercel would
  force you to recreate every record (including email) — don't.
- **Registration stays at IONOS.** You only repoint DNS; no need to transfer the
  domain registration to Vercel.
- **Node:** Vercel manages its own (modern) Node, so the local Node-16 issue is
  irrelevant to deployment.
