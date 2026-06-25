-- O3 ZONE Supabase production verification
-- Run this after applying supabase/schema.sql.
-- Every row should return status = 'ok'.

with expected_tables(table_name) as (
  values
    ('admin_profiles'),
    ('posts'),
    ('courses'),
    ('lessons'),
    ('interest_signups'),
    ('assessment_submissions')
)
select
  'table_exists' as check_name,
  table_name as target,
  case
    when exists (
      select 1
      from information_schema.tables
      where table_schema = 'public'
        and tables.table_name = expected_tables.table_name
    )
    then 'ok'
    else 'fail'
  end as status
from expected_tables
order by table_name;

with expected_rls(table_name) as (
  values
    ('admin_profiles'),
    ('posts'),
    ('courses'),
    ('lessons'),
    ('interest_signups'),
    ('assessment_submissions')
)
select
  'rls_enabled' as check_name,
  table_name as target,
  case
    when exists (
      select 1
      from pg_class
      join pg_namespace on pg_namespace.oid = pg_class.relnamespace
      where pg_namespace.nspname = 'public'
        and pg_class.relname = expected_rls.table_name
        and pg_class.relrowsecurity = true
    )
    then 'ok'
    else 'fail'
  end as status
from expected_rls
order by table_name;

with expected_policies(table_name, policy_name) as (
  values
    ('admin_profiles', 'Admins can read own profile'),
    ('posts', 'Published posts are public'),
    ('posts', 'Admins manage posts'),
    ('courses', 'Published courses are public'),
    ('courses', 'Admins manage courses'),
    ('lessons', 'Published lessons are public for published courses'),
    ('lessons', 'Admins manage lessons'),
    ('interest_signups', 'Anyone can create direct interest signups'),
    ('interest_signups', 'Authenticated users can create own Google interest signup'),
    ('interest_signups', 'Authenticated users can read own interest signup'),
    ('interest_signups', 'Admins can read interest signups'),
    ('assessment_submissions', 'Anyone can create assessment submissions'),
    ('assessment_submissions', 'Authenticated users can create own assessment submissions'),
    ('assessment_submissions', 'Authenticated users can read own assessment submissions'),
    ('assessment_submissions', 'Admins can read assessment submissions')
)
select
  'policy_exists' as check_name,
  table_name || ' / ' || policy_name as target,
  case
    when exists (
      select 1
      from pg_policies
      where schemaname = 'public'
        and tablename = expected_policies.table_name
        and policyname = expected_policies.policy_name
    )
    then 'ok'
    else 'fail'
  end as status
from expected_policies
order by table_name, policy_name;

with expected_grants(table_name, grantee, privilege_type) as (
  values
    ('admin_profiles', 'authenticated', 'SELECT'),
    ('posts', 'anon', 'SELECT'),
    ('posts', 'authenticated', 'SELECT'),
    ('posts', 'authenticated', 'INSERT'),
    ('posts', 'authenticated', 'UPDATE'),
    ('posts', 'authenticated', 'DELETE'),
    ('courses', 'anon', 'SELECT'),
    ('courses', 'authenticated', 'SELECT'),
    ('courses', 'authenticated', 'INSERT'),
    ('courses', 'authenticated', 'UPDATE'),
    ('courses', 'authenticated', 'DELETE'),
    ('lessons', 'anon', 'SELECT'),
    ('lessons', 'authenticated', 'SELECT'),
    ('lessons', 'authenticated', 'INSERT'),
    ('lessons', 'authenticated', 'UPDATE'),
    ('lessons', 'authenticated', 'DELETE'),
    ('interest_signups', 'anon', 'INSERT'),
    ('interest_signups', 'authenticated', 'INSERT'),
    ('interest_signups', 'authenticated', 'SELECT'),
    ('assessment_submissions', 'anon', 'INSERT'),
    ('assessment_submissions', 'authenticated', 'INSERT'),
    ('assessment_submissions', 'authenticated', 'SELECT')
)
select
  'grant_exists' as check_name,
  table_name || ' / ' || grantee || ' / ' || privilege_type as target,
  case
    when exists (
      select 1
      from information_schema.role_table_grants
      where table_schema = 'public'
        and role_table_grants.table_name = expected_grants.table_name
        and role_table_grants.grantee = expected_grants.grantee
        and role_table_grants.privilege_type = expected_grants.privilege_type
    )
    then 'ok'
    else 'fail'
  end as status
from expected_grants
order by table_name, grantee, privilege_type;
