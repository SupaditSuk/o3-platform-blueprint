# Security Guardrails

## Admin Access

Admin access has two layers:

1. `ADMIN_EMAILS` in the app environment.
2. `public.admin_profiles` in Supabase RLS.

Both must pass before `/admin` loads. A Google account that is not in both places should be rejected.

## Supabase Keys

- Use only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in the app.
- Do not add service role keys to `.env.local`, Vercel, client code, or server actions for this baseline.
- Admin actions use the logged-in user's Supabase session and RLS.

## RLS Rules

- Anonymous users can insert leads and assessments only when consent is true.
- Authenticated users can read only their own lead/assessment rows.
- Admins can read lead/assessment rows and manage content.
- Public users can read only published posts, courses, and lessons.

## Redirect Safety

Auth redirect paths must stay on the same site. The app sanitizes `next` values so login redirects cannot become external redirects.

## Data Privacy

Before production launch:

- Publish privacy and terms pages.
- Avoid collecting unnecessary sensitive personal data.
- Explain that assessment data may be used to prepare follow-up recommendations.
- Keep exports and admin access limited to approved admins.

## Public Form Abuse

Public lead and assessment forms include a lightweight honeypot field to reduce basic bot submissions.

This is not a full rate-limit or bot-protection system. If spam increases after launch, add platform-level protection such as Turnstile, rate limiting, or Vercel Firewall rules.
