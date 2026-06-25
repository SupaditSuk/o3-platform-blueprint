create extension if not exists pgcrypto;

create type public.publish_status as enum ('draft', 'published');

create table public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role text not null default 'admin' check (role in ('admin', 'super_admin')),
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status public.publish_status not null default 'draft',
  title_th text not null,
  title_en text not null,
  excerpt_th text not null default '',
  excerpt_en text not null default '',
  body_th text not null default '',
  body_en text not null default '',
  category_th text not null default 'People Analytics',
  category_en text not null default 'People Analytics',
  read_time_th text not null default 'อ่าน 4 นาที',
  read_time_en text not null default '4 min read',
  cover_image_url text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status public.publish_status not null default 'draft',
  title_th text not null,
  title_en text not null,
  description_th text not null default '',
  description_en text not null default '',
  level_th text not null default 'เริ่มต้น',
  level_en text not null default 'Beginner',
  price_thb integer not null default 0 check (price_thb >= 0),
  cover_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  sort_order integer not null default 0,
  title_th text not null,
  title_en text not null,
  body_th text not null default '',
  body_en text not null default '',
  bunny_video_id text,
  duration_seconds integer not null default 0 check (duration_seconds >= 0),
  status public.publish_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.interest_signups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  full_name text,
  interest text not null default 'online_courses',
  company_name text,
  role text,
  company_size text,
  business_question text,
  available_data_sources jsonb not null default '[]'::jsonb,
  notes text,
  locale text not null default 'th' check (locale in ('th', 'en')),
  source text not null default 'direct' check (source in ('direct', 'google')),
  consent boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint interest_signups_email_check check (position('@' in email) > 1)
);

create table public.assessment_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  assessment_type text not null default 'hr_health_check',
  locale text not null default 'th' check (locale in ('th', 'en')),
  email text not null,
  full_name text,
  company_name text not null,
  role text not null,
  company_size text not null,
  industry text,
  main_challenge text,
  overall_score integer not null check (overall_score between 0 and 100),
  maturity_level text not null,
  category_scores jsonb not null default '{}'::jsonb,
  answers jsonb not null default '{}'::jsonb,
  consent boolean not null default true,
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint assessment_submissions_email_check check (position('@' in email) > 1)
);

create index posts_status_published_at_idx on public.posts (status, published_at desc);
create index courses_status_created_at_idx on public.courses (status, created_at desc);
create index lessons_course_sort_idx on public.lessons (course_id, sort_order);
create unique index interest_signups_email_unique_idx on public.interest_signups (lower(email));
create index interest_signups_created_at_idx on public.interest_signups (created_at desc);
create index assessment_submissions_created_at_idx on public.assessment_submissions (created_at desc);
create index assessment_submissions_type_score_idx on public.assessment_submissions (assessment_type, overall_score desc);
create index assessment_submissions_company_size_idx on public.assessment_submissions (company_size);
create index assessment_submissions_category_scores_idx on public.assessment_submissions using gin (category_scores);

alter table public.admin_profiles enable row level security;
alter table public.posts enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.interest_signups enable row level security;
alter table public.assessment_submissions enable row level security;

create policy "Published posts are public"
  on public.posts for select
  using (status = 'published');

create policy "Published courses are public"
  on public.courses for select
  using (status = 'published');

create policy "Published lessons are public for published courses"
  on public.lessons for select
  using (
    status = 'published'
    and exists (
      select 1 from public.courses
      where courses.id = lessons.course_id
      and courses.status = 'published'
    )
  );

create policy "Admins can read own profile"
  on public.admin_profiles for select
  using (id = auth.uid());

create policy "Admins manage posts"
  on public.posts for all
  using (exists (
    select 1 from public.admin_profiles
    where admin_profiles.id = auth.uid()
    and admin_profiles.role in ('admin', 'super_admin')
  ))
  with check (exists (
    select 1 from public.admin_profiles
    where admin_profiles.id = auth.uid()
    and admin_profiles.role in ('admin', 'super_admin')
  ));

create policy "Admins manage courses"
  on public.courses for all
  using (exists (
    select 1 from public.admin_profiles
    where admin_profiles.id = auth.uid()
    and admin_profiles.role in ('admin', 'super_admin')
  ))
  with check (exists (
    select 1 from public.admin_profiles
    where admin_profiles.id = auth.uid()
    and admin_profiles.role in ('admin', 'super_admin')
  ));

create policy "Admins manage lessons"
  on public.lessons for all
  using (exists (
    select 1 from public.admin_profiles
    where admin_profiles.id = auth.uid()
    and admin_profiles.role in ('admin', 'super_admin')
  ))
  with check (exists (
    select 1 from public.admin_profiles
    where admin_profiles.id = auth.uid()
    and admin_profiles.role in ('admin', 'super_admin')
  ));

create policy "Anyone can create direct interest signups"
  on public.interest_signups for insert
  with check (
    user_id is null
    and source = 'direct'
    and consent = true
  );

create policy "Authenticated users can create own Google interest signup"
  on public.interest_signups for insert
  to authenticated
  with check (
    user_id = auth.uid()
    and source = 'google'
    and consent = true
  );

create policy "Authenticated users can read own interest signup"
  on public.interest_signups for select
  to authenticated
  using (user_id = auth.uid());

create policy "Admins can read interest signups"
  on public.interest_signups for select
  using (exists (
    select 1 from public.admin_profiles
    where admin_profiles.id = auth.uid()
    and admin_profiles.role in ('admin', 'super_admin')
  ));

create policy "Anyone can create assessment submissions"
  on public.assessment_submissions for insert
  with check (
    user_id is null
    and source = 'website'
    and consent = true
  );

create policy "Authenticated users can create own assessment submissions"
  on public.assessment_submissions for insert
  to authenticated
  with check (
    user_id = auth.uid()
    and consent = true
  );

create policy "Authenticated users can read own assessment submissions"
  on public.assessment_submissions for select
  to authenticated
  using (user_id = auth.uid());

create policy "Admins can read assessment submissions"
  on public.assessment_submissions for select
  using (exists (
    select 1 from public.admin_profiles
    where admin_profiles.id = auth.uid()
    and admin_profiles.role in ('admin', 'super_admin')
  ));

grant select on public.admin_profiles to authenticated;
grant select on public.posts, public.courses, public.lessons to anon, authenticated;
grant insert, update, delete on public.posts, public.courses, public.lessons to authenticated;
grant insert on public.interest_signups to anon, authenticated;
grant select on public.interest_signups to authenticated;
grant insert on public.assessment_submissions to anon, authenticated;
grant select on public.assessment_submissions to authenticated;
