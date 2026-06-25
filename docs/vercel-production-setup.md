# Vercel Production Setup

The project is linked to Vercel as:

```text
supadit-suksaweangs-projects/o3-zone-website
```

GitHub repository:

```text
https://github.com/SupaditSuk/o3-zone-website
```

## Current State

- Vercel project exists.
- GitHub repository is connected.
- `NEXT_PUBLIC_SITE_URL` is configured for `https://o3-zone-website.vercel.app`.
- Production deployment is live at `https://o3-zone-website.vercel.app`.
- Supabase, admin, and contact environment values still need to be configured before the backend flows are fully production-ready.

## Required Environment Variables

Set these in Vercel for Production. Set Preview separately when preview testing is needed.

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

Do not add a Supabase service role key to Vercel for this app.

## CLI Commands

Check the linked project:

```bash
vercel project ls
vercel env ls
```

Add values:

```bash
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY production
vercel env add ADMIN_EMAILS production
vercel env add NEXT_PUBLIC_CONTACT_EMAIL production
vercel env add NEXT_PUBLIC_LINKEDIN_URL production
```

Use the Vercel dashboard if that is easier.

## Deploy Gate

Deploy only after:

- `docs/supabase-production-setup.md` is complete.
- Supabase `schema.sql` and `verify.sql` pass.
- Google Auth redirect URLs are configured.
- Vercel Production env is configured.
- `NEXT_PUBLIC_SITE_URL` matches the final production domain.

Then deploy:

```bash
vercel --prod
```

If the normal deploy hangs at `Building...`, use the prebuilt flow:

```bash
vercel pull --yes --environment production
vercel build --prod
vercel deploy --prebuilt --prod --yes --archive=tgz
```

If deployment from the main project folder stays in `UNKNOWN`, create a clean copy in `/private/tmp/o3-zone-deploy` excluding `.git`, `.next`, `.vercel`, `node_modules`, and local planning folders, then run the prebuilt flow from there.

After deploy:

```bash
SITE_URL=https://your-domain.com npm run smoke
SITE_URL=https://your-domain.com npm run smoke:sitemap
```

The deployment is complete only when `vercel ls o3-zone-website` shows `READY` and the URL returns the site. `UNKNOWN` with no logs should be treated as not deployed yet.
