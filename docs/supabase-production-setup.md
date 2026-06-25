# Supabase Production Setup

Use this guide after the code has been pushed to GitHub and before the first Vercel production deployment.

## 1. Create The Project

- Create a new Supabase project for production.
- Keep the project region close to Thailand or the main customer base.
- Save these values for Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Do not use a service role key in this Next.js app.

## 2. Apply Database Schema

Open Supabase SQL Editor and run:

```sql
-- paste the full contents of supabase/schema.sql
```

Then verify the setup:

```sql
-- paste the full contents of supabase/verify.sql
```

Every result row should return `ok`.

Optional starter data:

```sql
-- paste the full contents of supabase/seed.sql
```

## 3. Confirm RLS Intent

The launch baseline expects:

- Public visitors can read published posts, courses, and lessons.
- Anonymous visitors can insert leads and assessment submissions only when consent is true.
- Authenticated non-admin users cannot read other organizations' leads or assessment submissions.
- Admin users can read leads, assessments, and manage content.

If any policy is changed, update `docs/database-schema.md` and rerun `supabase/verify.sql`.

## 4. Configure Google Auth

In Supabase:

- Go to Authentication > Providers.
- Enable Google.
- Add the Google OAuth client ID and secret.
- In Authentication > URL Configuration, set the Site URL:

```text
https://your-domain.com
```

Add redirect URLs:

```text
http://localhost:3030/auth/callback
https://your-domain.com/auth/callback
```

If Vercel Preview auth testing is needed later, add the exact preview callback URL only for the preview environment.

## 5. Create First Admin

Admin access has two gates:

- `ADMIN_EMAILS` in the app environment.
- A matching row in `public.admin_profiles`.

Steps:

1. Set `ADMIN_EMAILS` in Vercel with the real admin Google email.
2. Log in once through `/auth/login` with that Google account.
3. Run `supabase/create-admin-profile.sql` in Supabase, replacing the email:

```sql
insert into public.admin_profiles (id, display_name, role)
select id, coalesce(raw_user_meta_data ->> 'full_name', email), 'admin'
from auth.users
where email = 'your.email@gmail.com'
on conflict (id) do update
set role = 'admin';
```

Use `super_admin` only if a second elevated role is needed later.

## 6. Vercel Environment Values

Set Production and Preview separately:

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

Before deploy, run locally with the real production values:

```bash
npm run env:check
```

## 7. Production Behavior Checks

After deployment:

- Submit a contact lead.
- Submit an HR Health Check assessment.
- Confirm both rows appear in Supabase.
- Visit `/admin` while logged out and confirm it redirects to login.
- Log in with a non-admin Google account and confirm `/admin` is blocked.
- Log in with the admin Google account and confirm `/admin` loads.
- Confirm the admin page can read assessment and lead records.

## 8. Backup Note

Before collecting real leads, enable or document a backup plan in Supabase. At minimum, confirm the project plan supports point-in-time recovery or scheduled database backups.
