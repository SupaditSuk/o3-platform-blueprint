# Member Dashboard — Phase 1 (design/spec)

Date: 2026-06-20
Status: approved (design accepted by user)

## Goal
Give a logged-in member a personal `/dashboard` after Google login: their profile,
their own assessment results, the topics they asked about, and a browse list of
courses. No enrollment, lesson content, progress, or payments yet (Phase 2/3).

## Decisions
- **Login method:** Google OAuth only (no email/password). Member = any authenticated
  Supabase user. Admin ⊂ member (admin = email in `ADMIN_EMAILS` + `admin_profiles` row).
- **Courses on the dashboard:** show real published courses as browse links only
  (badge "ลงทะเบียนเรียน — เร็วๆ นี้"). Real enrollment is Phase 3.
- No new DB tables. Reuse `assessment_submissions`, `interest_signups`, `courses`, `auth.users`.

## Auth model
- `/auth/login` (admin login) stays unchanged.
- Header shows an account control everywhere `<Nav>` renders. Because `<Nav>` is rendered
  per-page (not in a layout), the header reads auth state via a **browser** Supabase client
  (new `lib/supabase/client.ts`) instead of threading a prop through every page.
- The admin-only link to `/admin` is rendered **server-side on the dashboard** (so
  `ADMIN_EMAILS` never reaches the client).

## Components / files
New:
- `lib/supabase/client.ts` — `@supabase/ssr` browser client (uses existing public env).
- `app/[locale]/dashboard/page.tsx` — server component, `dynamic = "force-dynamic"`.
  - Not authed → "เข้าสู่ระบบด้วย Google" CTA (server action).
  - Authed → 4 cards: Profile (name/email/avatar/logout, +/admin link if admin),
    My assessment results (`assessment_submissions` where `user_id = me`),
    My interests (`interest_signups` where `user_id = me`),
    Courses (browse links from `loadPublishedCourses`). Each card has an empty state + CTA.
- `app/[locale]/dashboard/actions.ts` — `signInMemberWithGoogle` (OAuth, `next=/<locale>/dashboard`).

Modified:
- `components/nav.tsx` — account widget (browser client; logged-out → "เข้าสู่ระบบ" → /dashboard,
  logged-in → avatar/name → /dashboard). Stable placeholder until auth resolves.
- `app/[locale]/assessment/actions.ts` — attach `user_id` on submit when logged in.
- `app/[locale]/contact/actions.ts` — attach `user_id` on direct submit when logged in.
- `app/auth/logout/route.ts` — honor a sanitized `next` param (member logout → home).
- `content/site.ts` — add nav copy keys `signIn` + `dashboard` (th/en).

## RLS / data notes
- RLS already allows authenticated users to read their own `assessment_submissions` /
  `interest_signups`. Setting `user_id` on submit is what makes them appear.
- Submissions made while logged out won't link to the account — acceptable for a new feature.

## Out of scope (later)
Enrollment table, lesson content/video player, progress tracking, payments, member-only gating.

## Verification
- `npm run build` (or lint/typecheck) passes.
- Live (port 3030 / main): logged-out `/th/dashboard` shows Google CTA; header shows "เข้าสู่ระบบ".
  After login: dashboard renders profile + cards; taking an assessment while logged in then
  shows it under "ผล Assessment ของฉัน".
