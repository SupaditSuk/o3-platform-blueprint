# Supabase SQL Files

Run these files in this order for a new production project.

## 1. Schema

Run `schema.sql` first. It creates the launch baseline tables and RLS policies:

- `admin_profiles`
- `posts`
- `courses`
- `lessons`
- `interest_signups`
- `assessment_submissions`

## 2. Verify

Run `verify.sql` after the schema. Every row should return `ok`.

If any row does not return `ok`, stop and fix the schema or policy before deploying.

## 3. Seed Data

Run `seed.sql` only if starter posts/courses are needed.

## 4. First Admin

After the admin signs in once with Google, run `create-admin-profile.sql`.

Replace `your.email@gmail.com` with the same email used in `ADMIN_EMAILS`.

Admin access requires both:

- The email is in `ADMIN_EMAILS`.
- The user has a row in `public.admin_profiles` with role `admin` or `super_admin`.

Never place a service role key in this app or in Vercel environment variables for this app.
