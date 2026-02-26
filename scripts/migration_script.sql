-- Barakah Agency Full Migration Script for New Supabase Instance

-- 1. ENABLE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE TABLES
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT,
  author_name TEXT,
  tags TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client TEXT NOT NULL,
  industry TEXT,
  challenge TEXT,
  solution TEXT,
  results TEXT,
  cover_image TEXT,
  gallery TEXT[],
  metrics JSONB,
  testimonial TEXT,
  testimonial_author TEXT,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contact_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  features TEXT[],
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- 4. CREATE POLICIES
CREATE POLICY "Allow public read for published blogs" ON public.blogs FOR SELECT USING (published = true);
CREATE POLICY "Allow public read for published case studies" ON public.case_studies FOR SELECT USING (published = true);
CREATE POLICY "Allow public read for services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public insert for contact leads" ON public.contact_leads FOR INSERT WITH CHECK (true);

-- Admin policies (requires is_admin: true in user_metadata)
CREATE POLICY "Allow admin full access to blogs" ON public.blogs FOR ALL USING (
  (SELECT (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean) = true
);
CREATE POLICY "Allow admin full access to case_studies" ON public.case_studies FOR ALL USING (
  (SELECT (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean) = true
);
CREATE POLICY "Allow admin full access to contact_leads" ON public.contact_leads FOR ALL USING (
  (SELECT (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean) = true
);
CREATE POLICY "Allow admin full access to services" ON public.services FOR ALL USING (
  (SELECT (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean) = true
);

-- 5. CREATE INDEXES
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs(published);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON public.case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);

-- 6. SETUP UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON public.case_studies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
