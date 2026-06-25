# Production Readiness Status

Last checked: 2026-06-19

## Ready In Code

- Public Thai and English site.
- Service pages and service detail pages.
- Assessment funnel for HR Health Check, Workforce Productivity Check, and AI Readiness for HR.
- Contact and assessment lead capture.
- Dashboard Starter demo.
- Admin route with two-layer access control: `ADMIN_EMAILS` and `admin_profiles`.
- Google login flow with safe same-site redirect handling.
- Supabase schema baseline with RLS policies.
- Privacy and terms pages.
- Security headers.
- Robots and sitemap.
- `/api/health` deployment health check.
- GitHub Actions CI template documented for later enablement.
- Local git repository with initial baseline commit.
- GitHub repository connected and baseline pushed to `SupaditSuk/o3-zone-website`.
- Vercel project `supadit-suksaweangs-projects/o3-zone-website` created and connected to GitHub.
- Vercel production deployment is live at `https://o3-zone-website.vercel.app`.
- Internal documentation for product, database, security, launch, and future AI dashboard roadmap.

## Verified Locally

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run verify`
- `PORT=3032 npm run check:production`
- `SITE_URL=https://o3-zone-website.vercel.app npm run smoke`
- `SITE_URL=https://o3-zone-website.vercel.app npm run smoke:sitemap`

## Needs Real Production Setup

- Create production Supabase project.
- Apply `supabase/schema.sql`.
- Enable Google Auth in Supabase.
- Add local and production auth callback URLs.
- Set remaining Vercel Production and Preview environment variables for Supabase, admin, and contact values.
- Create the first admin row in `admin_profiles` after the admin logs in once.
- Submit test lead and assessment records against production Supabase.
- Confirm non-admin users cannot access `/admin`.

## Vercel Deployment Attempt

- Initial deployments from the original local path stayed in `UNKNOWN`.
- Deployment succeeded after using a clean copy at `/private/tmp/o3-zone-deploy` and `vercel deploy --prebuilt --prod --archive=tgz`.
- Current production alias is `https://o3-zone-website.vercel.app`.
- Production smoke and sitemap checks pass.

## Launch Blockers

- No hard blocker in the application code based on the latest local verification.
- Production shell is live.
- Production cannot be considered fully complete until Supabase, admin profile, remaining Vercel env, and optional custom domain setup are done.

## Deferred On Purpose

- Payment.
- Member-only e-learning.
- Full course progress tracking.
- PDF assessment report export.
- AI file upload dashboard product.
- Supabase Storage.
- Production monitoring beyond platform logs.

## Next Recommended Action

Move to deployment setup in this order:

1. GitHub repository.
2. Supabase project and schema.
3. Remaining Vercel environment variables.
4. Production domain and callback URLs.
5. Production Supabase/admin smoke test using `docs/launch-checklist.md`.
