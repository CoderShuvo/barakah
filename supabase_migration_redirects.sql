-- Migrations for Redirects and new Settings

-- 1. Create Redirects Table
CREATE TABLE IF NOT EXISTS public.redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL UNIQUE,
  destination TEXT NOT NULL,
  permanent BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Redirects RLS
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read redirects" ON public.redirects;
CREATE POLICY "Public can read redirects" 
  ON public.redirects FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Admins can manage redirects" ON public.redirects;
CREATE POLICY "Admins can manage redirects" 
  ON public.redirects FOR ALL 
  USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- 3. Seed new Site Settings for 404 Page and Form Management
INSERT INTO public.site_settings (key, value)
VALUES 
  ('not_found_settings', '{"headline": "Oops! Page Not Found", "message": "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.", "cta_text": "Back to Home", "cta_link": "/"}'::jsonb),
  ('form_settings', '{"success_headline": "Message Sent!", "success_message": "Thank you for reaching out. We will get back to you shortly.", "submit_button_text": "Send Message", "show_budget": true, "show_service": true, "show_company": false}'::jsonb)
ON CONFLICT (key) DO NOTHING;
