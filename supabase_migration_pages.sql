-- 1. Create table for Pages
create table if not exists public.pages (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  hero_headline text,
  hero_subheadline text,
  content jsonb default '{}'::jsonb,
  cta_text text,
  cta_link text,
  featured_image text,
  meta_title text,
  meta_description text,
  visible_sections jsonb default '[]'::jsonb,
  published boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 2. Enable Row Level Security
alter table public.pages enable row level security;

-- 3. Create RLS Policies
create policy "Pages are viewable by everyone"
  on public.pages for select using (true);

create policy "Admins can insert pages"
  on public.pages for insert with check (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

create policy "Admins and editors can update pages"
  on public.pages for update using (
    (auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'editor')
  );

create policy "Admins can delete pages"
  on public.pages for delete using (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- 4. Create updated_at trigger
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_pages_updated_at on public.pages;
create trigger update_pages_updated_at
  before update on public.pages
  for each row execute procedure public.update_updated_at_column();

-- 5. Seed initial pages
insert into public.pages (slug, title, published) values
  ('home', 'Home', true),
  ('why-barakah', 'Why Barakah', true),
  ('services', 'Services', true),
  ('services/branding-identity', 'Branding & Identity', true),
  ('services/performance-marketing', 'Performance Marketing', true),
  ('barakah-method', 'The Barakah Method', true),
  ('ecosystem', 'The Barakah Ecosystem', true),
  ('case-studies', 'Case Studies', true),
  ('zeroframe', 'ZeroFrame™', true),
  ('ethical-marketing', 'Ethical Marketing', true),
  ('contact', 'Contact', true),
  ('blog', 'Blog', true)
on conflict (slug) do nothing;
