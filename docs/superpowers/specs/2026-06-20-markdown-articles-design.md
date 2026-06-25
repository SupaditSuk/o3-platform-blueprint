# Markdown Articles + Inline Images + Medium Reading View (design/spec)

Date: 2026-06-20
Status: approved (design + decisions accepted by user)

## Goal
Let the admin write articles in **Markdown** with **inline images**, and render the
public article page as a **clean light "Medium" reader**. Landing and all other pages
keep the existing dark theme.

## Decisions
- Editor: **Markdown** (textarea + toolbar + live preview + image upload). Not WYSIWYG.
- Article reading page theme: **light/white, Medium-style** (only `/[locale]/blog/[slug]`).
  Everything else stays dark.
- Images stored in **Supabase Storage** (new public bucket, admin-only write).
- No DB schema change: `body_th`/`body_en` (text) now hold Markdown. Backward compatible
  (existing plain-paragraph bodies are valid Markdown).

## Dependencies (new)
- `react-markdown` + `remark-gfm` — render Markdown safely (no raw HTML → no XSS).
- `@tailwindcss/typography` — `prose` classes for Medium-like typography.

## Components / files
New:
- `components/markdown-content.tsx` — shared renderer: `react-markdown` + `remark-gfm`
  wrapped in `prose` (light). Used by both the article page and the editor preview.
- `components/admin/markdown-editor.tsx` — client editor: controlled `<textarea>` +
  toolbar (H2/H3/bold/italic/list/quote/link/**image**) that inserts Markdown at the
  cursor, a **live preview** pane (white box, uses MarkdownContent), and an image-upload
  button (file picker → upload action → insert `![alt](url)`).

Modified:
- `app/[locale]/blog/[slug]/page.tsx` — restructure to a light Medium reader: dark `Nav`
  on top, then `bg-white text-neutral-900` article column (~`max-w-[680px]`): eyebrow,
  title, meta (date · read time), cover image (object-contain), then `MarkdownContent`
  for the body. Keep the existing interactive widgets (AiEvolutionExplorer /
  PeopleAnalyticsLab) below in their own band.
- `components/admin/admin-console.tsx` — replace the body TH/EN `Field` textareas with
  `MarkdownEditor`.
- `app/admin/actions.ts` (or new `app/admin/upload-actions.ts`) — `uploadArticleImage`
  server action: admin-gated (session + `admin_profiles` role), uploads the file to the
  bucket, returns the public URL.
- `tailwind.config.*` — add `@tailwindcss/typography` plugin.
- `package.json` — add the 3 deps.

## Supabase Storage
- Bucket `article-images`, `public = true` (public read).
- RLS on `storage.objects` for this bucket: `select` public; `insert/update/delete`
  restricted to admins (user has a row in `public.admin_profiles`). Created via migration.

## Editor behavior
- Toolbar buttons wrap/insert Markdown around the current textarea selection.
- Image: hidden `<input type=file>` → `uploadArticleImage(FormData)` → on success insert
  `![](publicUrl)` at the cursor; show a small uploading state + error toast on failure.
- Live preview renders the current value via `MarkdownContent` in a white panel so the
  author sees the real (light) result.

## Reading view styling
- `prose prose-neutral` (light) tuned to a Medium feel: large readable body, clear H2/H3,
  styled blockquotes, rounded full-width images with captions (alt as caption optional),
  comfortable measure (~680px).

## Out of scope (later)
- Cover-image upload from admin (currently a URL field) — easy follow-up reusing the same
  upload action; not required here.
- Draft autosave, image alt/caption editing UI, image resizing/CDN transforms.

## Verification
- `npm run typecheck` + `lint` + `build` pass.
- Live (127.0.0.1:3030): a markdown body with a `##` heading, list, blockquote, and an
  uploaded image renders correctly on the light article page; admin preview matches; the
  upload returns a working public URL; landing/other pages stay dark.
