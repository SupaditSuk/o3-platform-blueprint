# Admin + Gmail Login Setup

This project uses Supabase Auth with Google login for `/admin`.

## 1. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3030
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-or-anon-key
ADMIN_EMAILS=your.email@gmail.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@o3zone.com
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/supadit-suk/
```

`ADMIN_EMAILS` protects the Next.js admin route. Supabase RLS is protected separately by `public.admin_profiles`.

Do not add a Supabase service role key to this app. Public pages, forms, and the admin console must use the Supabase publishable/anon key plus RLS.

## 2. Supabase SQL

Run `supabase/schema.sql` in the Supabase SQL editor.

Then optionally run `supabase/seed.sql` to load starter posts, courses, and lessons.

After you log in once with Gmail, add your user to the admin table. You can also use `supabase/create-admin-profile.sql`.

```sql
insert into public.admin_profiles (id, display_name, role)
select id, coalesce(raw_user_meta_data ->> 'full_name', email), 'admin'
from auth.users
where email = 'your.email@gmail.com'
on conflict (id) do update
set role = 'admin';
```

Admin access requires both:

- the email is listed in `ADMIN_EMAILS`
- the matching Supabase user exists in `public.admin_profiles` with role `admin` or `super_admin`

## 3. Google OAuth

In Supabase dashboard:

- Go to Authentication > Providers
- Enable Google
- Add your Google OAuth client id and secret
- Add redirect URL:

```text
http://127.0.0.1:3030/auth/callback
```

For production, also add:

```text
https://your-domain.com/auth/callback
```

## 4. Admin workflow

- Visit `/admin`
- Sign in with Google
- Edit an article or course
- Click `Save to database`
- Published posts appear on `/th/blog` and `/en/blog`
- Published courses appear on `/th/courses` and `/en/courses`

## 5. Production launch checks

- Set Vercel Production and Preview environment variables separately.
- Set `NEXT_PUBLIC_SITE_URL` to the exact production domain.
- Add the exact production callback URL in Supabase Google Auth.
- Run `npm run typecheck`, `npm run lint`, and `npm run build`.
- Confirm `/admin` rejects non-admin Google accounts.
- Confirm anonymous lead and assessment forms still submit after RLS is enabled.
