# Deployment Runbook

Use this runbook for the first GitHub, Supabase, and Vercel production launch.

## 1. Preflight

- Confirm `.env.example` is current.
- Confirm no service role key is present in app code or Vercel env.
- Run:

```bash
npm run verify
```

- `npm run verify` includes preflight, typecheck, lint, and build.
- Check the routes in `docs/launch-checklist.md`.

If the site is already running locally, run:

```bash
npm run smoke
npm run smoke:sitemap
```

## 2. GitHub

- Initialize or connect the repository.
- Commit source files, `package-lock.json`, `supabase/schema.sql`, `supabase/seed.sql`, and `docs/`.
- Do not commit `.env`, `.env.local`, `.next`, `.vercel`, `node_modules`, or logs.
- GitHub Actions can be enabled later from `docs/github-actions-ci-template.yml` after GitHub token access includes workflow permissions.

## 3. Supabase

Follow `docs/supabase-production-setup.md` for the detailed setup.

- Create the production Supabase project.
- Apply `supabase/schema.sql` in SQL Editor.
- Run `supabase/verify.sql` and confirm every result row says `ok`.
- Optionally apply `supabase/seed.sql`.
- Enable Google Auth provider.
- Add callback URLs:
  - `http://localhost:3030/auth/callback`
  - `https://your-domain.com/auth/callback`
- Keep RLS enabled on all public tables.

## 4. Admin User

1. Set `ADMIN_EMAILS` in Vercel.
2. Log in once with the admin Google account.
3. In Supabase SQL Editor, create the admin profile:

```sql
insert into public.admin_profiles (id, display_name, role)
select id, coalesce(raw_user_meta_data ->> 'full_name', email), 'admin'
from auth.users
where email = 'your.email@gmail.com'
on conflict (id) do update
set role = 'admin';
```

4. Confirm `/admin` loads for the admin account.
5. Confirm another Google account cannot open `/admin`.

## 5. Vercel

The project is linked as `supadit-suksaweangs-projects/o3-zone-website`. Use `docs/vercel-production-setup.md` for the detailed env and deploy gate.

Set Production and Preview environment variables separately:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-or-anon-key
ADMIN_EMAILS=your.email@gmail.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@o3zone.com
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/supadit-suk/
NEXT_PUBLIC_X_URL=
NEXT_PUBLIC_YOUTUBE_URL=
```

After setting real values, run:

```bash
npm run env:check
```

Build command:

```bash
npm run build
```

Use Node.js 22 or newer. The repository includes `.nvmrc` and `package.json` engines for this.

Before deploying, you can run the optimized production server locally and verify it:

```bash
npm run check:production
```

## 6. Post-Deploy Verification

Check:

- `/api/health`
- `/th`
- `/en`
- `/th/services`
- `/th/services/intelligence-dashboard-starter/demo`
- `/th/assessment/hr-health-check`
- `/th/contact?interest=intelligence_dashboard_starter`
- `/auth/login`
- `/admin`
- `/favicon.ico`
- `/robots.txt`
- `/sitemap.xml`

Submit test data:

- Anonymous direct lead.
- Anonymous assessment.
- Dashboard Starter interest lead.

Then verify the rows appear in Supabase and the admin console.

You can also run the route smoke check against production:

```bash
SITE_URL=https://your-domain.com npm run smoke
SITE_URL=https://your-domain.com npm run smoke:sitemap
```

The smoke check expects `/admin` to redirect unauthenticated visitors to `/auth/login`.

## 7. First Launch Boundaries

Do not add these before the baseline is stable:

- Payment.
- Member-only e-learning.
- File upload product.
- Supabase Storage.
- AI/ML processing.
- PDF export.
- Monitoring beyond basic platform logs.
