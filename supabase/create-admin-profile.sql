-- Run this after the first admin signs in once with Google.
-- Replace your.email@gmail.com with the same email listed in ADMIN_EMAILS.

insert into public.admin_profiles (id, display_name, role)
select id, coalesce(raw_user_meta_data ->> 'full_name', email), 'admin'
from auth.users
where email = 'your.email@gmail.com'
on conflict (id) do update
set
  display_name = excluded.display_name,
  role = 'admin',
  updated_at = now();

-- Confirm the row exists.
select
  admin_profiles.id,
  admin_profiles.display_name,
  admin_profiles.role,
  users.email
from public.admin_profiles
join auth.users on users.id = admin_profiles.id
where users.email = 'your.email@gmail.com';
