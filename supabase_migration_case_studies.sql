-- Case Studies Migration
-- Adds service_tags column and updates RLS policies

-- 1. Add service_tags column
ALTER TABLE public.case_studies
  ADD COLUMN IF NOT EXISTS service_tags TEXT[] DEFAULT NULL;

-- 2. Fix RLS policies
DROP POLICY IF EXISTS "Allow public read for published case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Allow admin full access to case_studies" ON public.case_studies;

-- 3. Public can read published case studies  
CREATE POLICY "Public can view published case studies"
  ON public.case_studies FOR SELECT
  USING (published = true);
 
-- 4. Admins have full access
CREATE POLICY "Admins full access to case_studies"
  ON public.case_studies FOR ALL
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- 5. Editors can read all and update
CREATE POLICY "Editors can read all case_studies"
  ON public.case_studies FOR SELECT
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'editor'
  );

CREATE POLICY "Editors can update case_studies"
  ON public.case_studies FOR UPDATE
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'editor'
  );

CREATE POLICY "Editors can insert case_studies"
  ON public.case_studies FOR INSERT
  WITH CHECK (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'editor'
  );

-- 6. Index for service_tags filtering
CREATE INDEX IF NOT EXISTS idx_case_studies_service_tags ON public.case_studies USING GIN(service_tags);
