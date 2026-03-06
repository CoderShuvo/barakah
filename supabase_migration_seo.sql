-- SEO Migration
-- Adds missing per-page SEO fields and creates global site_settings table

-- 1. Add fields to pages
ALTER TABLE public.pages
  ADD COLUMN IF NOT EXISTS og_title TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS og_description TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS og_image TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS canonical_url TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS no_index BOOLEAN DEFAULT FALSE;

-- 2. Add fields to blogs
ALTER TABLE public.blogs
  ADD COLUMN IF NOT EXISTS og_title TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS og_description TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS og_image TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS canonical_url TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS no_index BOOLEAN DEFAULT FALSE;

-- 3. Add fields to case_studies
-- Note: Re-adding meta_title/meta_description as well if missing for consistency
ALTER TABLE public.case_studies
  ADD COLUMN IF NOT EXISTS meta_title TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS meta_description TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS og_title TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS og_description TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS og_image TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS canonical_url TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS no_index BOOLEAN DEFAULT FALSE;

-- 4. Create site_settings table for global SEO/Config
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL, -- e.g., 'seo_global'
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable RLS on site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies for site_settings
DROP POLICY IF EXISTS "Public can view site_settings" ON public.site_settings;
CREATE POLICY "Public can view site_settings" 
  ON public.site_settings FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Admins can manage site_settings" ON public.site_settings;
CREATE POLICY "Admins can manage site_settings" 
  ON public.site_settings FOR ALL 
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- 7. Seed initial global SEO settings
INSERT INTO public.site_settings (key, value)
VALUES (
  'seo_global',
  '{
    "google_search_console_id": "",
    "google_analytics_id": "",
    "robots_txt": "User-agent: *\nAllow: /",
    "site_name": "Barakah Agency",
    "default_og_image": ""
  }'::jsonb
)
ON CONFLICT (key) DO NOTHING;
