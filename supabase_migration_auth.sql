-- 1. Create a table for user profiles with roles and account security
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  role text check (role in ('admin', 'editor')) default 'editor',
  failed_login_attempts int default 0,
  locked_until timestamp with time zone,
  last_login_at timestamp with time zone,
  last_login_ip text,
  updated_at timestamp with time zone default now()
);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 3. Create RLS Policies
-- Users can view their own profile
create policy "Users can view own profile" 
  on public.profiles
  for select 
  using (auth.uid() = id);

-- Admins can view and manage all profiles
create policy "Admins can manage all profiles" 
  on public.profiles
  for all 
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 4. Create a function to handle profile creation on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'editor');
  return new;
end;
$$ language plpgsql security definer;

-- 5. Trigger to create a profile automatically when a new user signs up
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 6. Important: Seed an initial admin user (replace with actual UID or handle manually)
-- FIRST: Create the user in Supabase Dashboard -> Authentication -> Add User
-- THEN: Run this SQL with their specific email:

update public.profiles set role = 'admin' where email = 'admin@barakah.agency';
update public.profiles set role = 'editor' where email = 'editor@barakah.agency';
