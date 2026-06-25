# O3 ZONE Website

Bilingual Next.js website for O3 ZONE, a founder-led People Intelligence and HR Transformation platform.

The current production baseline includes:

- Public Thai and English website.
- Services and service detail pages.
- HR / workforce / AI readiness assessments.
- Dashboard demo for the Intelligence Dashboard Starter.
- Lead capture through contact and assessment flows.
- Supabase-backed admin console for posts, courses, and assessment review.
- Production metadata, security headers, robots, and sitemap.

## Local Development

```bash
npm install
npm run dev -- -p 3030
```

Open:

- `http://localhost:3030/th`
- `http://localhost:3030/en`

## Required Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3030
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-or-anon-key
ADMIN_EMAILS=your.email@gmail.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@o3zone.com
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/supadit-suk/
```

Do not add a Supabase service role key to this app.

## Production Checks

Run before deployment:

```bash
npm run verify
```

This includes preflight checks, typecheck, lint, and build. A GitHub Actions template is available in `docs/github-actions-ci-template.yml` and can be enabled after GitHub token access includes workflow permissions.

After starting the site locally or deploying to production, run:

```bash
npm run smoke
npm run smoke:sitemap
```

For production:

```bash
SITE_URL=https://your-domain.com npm run smoke
SITE_URL=https://your-domain.com npm run smoke:sitemap
```

To test the optimized production server locally:

```bash
npm run check:production
```

Before deploying with real production variables:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com \
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co \
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-key \
ADMIN_EMAILS=your.email@gmail.com \
NEXT_PUBLIC_CONTACT_EMAIL=hello@o3zone.com \
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/supadit-suk/ \
npm run env:check
```

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql`.
3. Run `supabase/verify.sql` and confirm every result is `ok`.
4. Optionally run `supabase/seed.sql`.
5. Enable Google Auth.
6. Add redirect URLs:
   - local: `http://localhost:3030/auth/callback`
   - production: `https://your-domain.com/auth/callback`
7. After the admin logs in once with Google, create the matching row in `public.admin_profiles`.

See `docs/supabase-production-setup.md` for the full production setup flow, `supabase/README.md` for SQL order, and `supabase/create-admin-profile.sql` for the first admin.

## Documentation

- `docs/product-requirements.md` - product positioning and current MVP.
- `docs/database-schema.md` - Supabase tables and RLS summary.
- `docs/security.md` - admin/auth/RLS/env guardrails.
- `docs/supabase-production-setup.md` - production Supabase, Google Auth, and admin setup.
- `docs/vercel-production-setup.md` - Vercel project, env, and deploy gate.
- `docs/github-setup.md` - GitHub repository setup and push steps.
- `docs/launch-checklist.md` - deployment checklist.
- `docs/production-readiness-status.md` - current readiness snapshot and remaining setup.
- `docs/ai-builder-prompt.md` - guardrails for future AI/Codex work.
- `docs/future-ai-dashboard-ml.md` - internal future roadmap for the AI Dashboard & ML product.

## Future Scope

The AI Dashboard & ML product is intentionally internal roadmap only. Do not add upload routes, Supabase Storage, AI calls, ML services, payment, or tenant administration until the production baseline is launched and validated.
