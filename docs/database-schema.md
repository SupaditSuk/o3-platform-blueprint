# Database Schema

Baseline schema lives in `supabase/schema.sql`.

After applying the schema in Supabase, run `supabase/verify.sql`. Every returned row should have `status = 'ok'`.

## Tables

`admin_profiles`

- Stores admin authorization rows linked to Supabase Auth users.
- Roles: `admin`, `super_admin`.
- Required for admin RLS access.

`posts`

- Bilingual article content.
- Public can read only `published` rows.
- Admin can create, update, and delete.

`courses`

- Bilingual course or academy content.
- Public can read only `published` rows.
- Admin can create, update, and delete.

`lessons`

- Lesson rows linked to courses.
- Public can read only published lessons under published courses.
- Admin can manage.

`interest_signups`

- Stores direct and Google lead capture.
- Anonymous visitors can insert only direct submissions with consent.
- Authenticated users can insert and read their own Google signup.
- Admin can read all.

`assessment_submissions`

- Stores assessment metadata, scores, category scores, answers, and consent.
- Anonymous visitors can insert website submissions with consent.
- Authenticated users can insert/read their own rows.
- Admin can read all.

## RLS Summary

- RLS is enabled on every public table.
- Public content reads are limited to published status.
- Lead and assessment inserts require consent.
- User-owned reads require `user_id = auth.uid()`.
- Admin access requires a matching row in `admin_profiles`.

## Migration Notes

For a new Supabase project, run:

1. `supabase/schema.sql`
2. `supabase/verify.sql`
3. `supabase/seed.sql` if starter content is needed
4. create the admin profile after the first Google login

For an existing project, compare the live schema before applying this file. Back up data first, then add missing columns, indexes, constraints, and policies incrementally.
