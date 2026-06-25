# Production Launch Checklist

Use `docs/deployment-runbook.md` for the exact launch sequence.

## Code And Build

- [ ] GitHub repository exists.
- [ ] Local `origin` remote points to the GitHub repository.
- [ ] `main` has been pushed to GitHub.
- [ ] `npm run typecheck` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] `npm run preflight` passes.
- [ ] `npm run verify` passes.
- [ ] `npm run smoke` passes against the running local or production site.
- [ ] `npm run smoke:sitemap` passes against the running local or production site.
- [ ] `npm run check:production` passes locally.
- [ ] GitHub Actions CI is enabled later when token access includes workflow permissions.
- [ ] No service role key appears in frontend or server app code.
- [ ] Security headers are active.
- [ ] `/api/health` returns `{ ok: true }`.
- [ ] `/robots.txt` and `/sitemap.xml` are available.
- [ ] Public forms validate required fields.
- [ ] Public forms include basic anti-spam handling.
- [ ] Privacy and terms pages are published and mention lead, assessment, aggregate analysis, and decision-support limitations.

## Supabase

- [ ] `docs/supabase-production-setup.md` has been followed.
- [ ] `supabase/schema.sql` has been applied.
- [ ] `supabase/verify.sql` returns only `ok` rows.
- [ ] RLS is enabled on all exposed public tables.
- [ ] Anonymous lead submission works.
- [ ] Anonymous assessment submission works.
- [ ] Non-admin authenticated users cannot read other users' leads or assessments.
- [ ] Admin user exists in `admin_profiles`.
- [ ] Supabase backup/restore plan is noted.

## Auth And Admin

- [ ] Google Auth provider is enabled.
- [ ] Local callback URL is configured if testing locally.
- [ ] Production callback URL is configured.
- [ ] `ADMIN_EMAILS` is set in Vercel.
- [ ] Non-admin Google account cannot open `/admin`.
- [ ] Admin Google account can open `/admin`.
- [ ] Guest users are redirected from `/admin` to `/auth/login`.
- [ ] Invalid locale paths redirect safely instead of returning 500.
- [ ] Missing content routes show a branded 404 instead of a raw error page.

## Vercel

- [ ] `docs/vercel-production-setup.md` has been followed.
- [ ] Vercel project `o3-zone-website` is linked to GitHub.
- [ ] Production and Preview environment variables are separate.
- [ ] `NEXT_PUBLIC_SITE_URL` matches the production domain.
- [ ] `npm run env:check` passes with the real production environment values.
- [ ] Custom domain is connected.
- [ ] HTTPS is active.
- [ ] Build command is `npm run build`.

## Manual Route Checks

- [ ] `/th`
- [ ] `/en`
- [ ] `/th/services`
- [ ] `/th/services/intelligence-dashboard-starter/demo`
- [ ] `/th/assessment/hr-health-check`
- [ ] `/th/contact?interest=intelligence_dashboard_starter`
- [ ] `/admin`
- [ ] `/auth/login`
- [ ] `/api/health`
- [ ] `/favicon.ico`
- [ ] `/manifest.webmanifest`
- [ ] `/robots.txt`
- [ ] `/sitemap.xml`

## Planned Later

- [ ] Monitoring and analytics.
- [ ] Payment.
- [ ] Member-only e-learning.
- [ ] PDF assessment report export.
- [ ] AI Dashboard & ML product from `docs/future-ai-dashboard-ml.md`.

The AI Dashboard & ML product is intentionally outside this production launch baseline. Do not add file upload, AI processing, Supabase Storage, or ML workflows before GitHub, Supabase, Vercel, admin, lead capture, and assessment foundation are stable.
