-- Media Bucket & Settings Migration
-- Creates the public media bucket if it doesn't exist and initializes site settings.

-- 1. Create the Storage Bucket for Media Library
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Storage Policies for Media Library
-- Drop existing to avoid conflicts
DROP POLICY IF EXISTS "Public can view media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete media" ON storage.objects;

-- Allow public viewing of media
CREATE POLICY "Public can view media"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Allow authenticated editors/admins to upload
CREATE POLICY "Admins can upload media"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'media' AND
  (auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'editor')
);

-- Allow authenticated editors/admins to update
CREATE POLICY "Admins can update media"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'media' AND
  (auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'editor')
);

-- Allow authenticated editors/admins to delete
CREATE POLICY "Admins can delete media"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'media' AND
  (auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'editor')
);

-- 3. Initialize Site Settings (General, Contact, Integrations)
INSERT INTO public.site_settings (key, value)
VALUES 
  ('general_settings', '{"site_title": "Barakah Agency", "tagline": "Ethical Marketing Excellence", "logo_url": "", "favicon_url": ""}'::jsonb),
  ('contact_settings', '{"email": "", "phone": "", "address": "", "instagram": "", "linkedin": "", "facebook": "", "twitter": "", "youtube": ""}'::jsonb),
  ('integration_settings', '{"gtm_id": "", "ga4_id": "", "gsc_id": "", "header_scripts": "", "footer_scripts": ""}'::jsonb)
ON CONFLICT (key) DO NOTHING;
