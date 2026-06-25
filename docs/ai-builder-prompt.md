# AI Builder Prompt

You are working on O3 ZONE, a bilingual Next.js site for People Intelligence and HR Transformation.

## Product Direction

Keep the positioning focused on:

- Turn people data into business outcomes.
- HR Health Check as the primary entry point.
- Services around assessments, workforce intelligence, dashboard starter, and AI for HR.
- Founder-led credibility from Supadit Suksaweang without making the site feel like an internal note.

## Architecture Rules

- Use Next.js App Router.
- Keep bilingual routes under `/th` and `/en`.
- Use Supabase SSR with the publishable/anon key only.
- Do not introduce a service role key into app code.
- Respect RLS. Admin actions should use the logged-in admin session.
- Keep admin access gated by both `ADMIN_EMAILS` and `admin_profiles`.

## Design Rules

- Maintain dark editorial style with red accent.
- Keep visuals professional and restrained.
- Use dashboard and assessment demos as useful product previews, not decorative filler.
- Avoid oversized images/cards on mobile.

## Current Data Model

Important tables:

- `admin_profiles`
- `posts`
- `courses`
- `lessons`
- `interest_signups`
- `assessment_submissions`

Check `docs/database-schema.md` and `supabase/schema.sql` before changing data behavior.

## Future Product Guardrail

There is a future roadmap for `O3 AI Dashboard & Insight Engine` in `docs/future-ai-dashboard-ml.md`.

Treat it as internal roadmap only until the production baseline is launched. Do not add public pages, upload routes, Supabase Storage, AI integrations, ML services, payment, or tenant administration unless explicitly requested.

When future work starts, begin with:

- Excel/CSV upload.
- Data profiling and PII detection.
- Rule Engine for KPIs.
- LLM structured dashboard JSON.
- HR Dashboard from Excel as the first use case.

Do not start with:

- Heavy ML for every use case.
- Real-time HRIS/ERP integration.
- Full SaaS tenant system.
- Payment.
- Collaborative filtering.
- Complex optimization.

## Before Shipping Changes

Run:

```bash
npm run verify
```

Then verify the critical routes listed in `docs/launch-checklist.md`.

For production deployment steps, use `docs/deployment-runbook.md`.
