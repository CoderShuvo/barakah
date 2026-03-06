-- Leads (contact_leads) Migration
-- Adds budget, source columns and updates status constraint + RLS

-- 1. Add new columns
ALTER TABLE public.contact_leads
  ADD COLUMN IF NOT EXISTS budget TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS source TEXT DEFAULT NULL;

-- 2. Update status constraint to include 'qualified'
-- Drop existing check constraint
ALTER TABLE public.contact_leads
  DROP CONSTRAINT IF EXISTS contact_leads_status_check;

ALTER TABLE public.contact_leads
  ADD CONSTRAINT contact_leads_status_check
    CHECK (status IN ('new', 'contacted', 'qualified', 'closed'));

-- 3. Update status default
ALTER TABLE public.contact_leads
  ALTER COLUMN status SET DEFAULT 'new';

-- 4. Drop old RLS policies and recreate
DROP POLICY IF EXISTS "Allow public insert for contact leads" ON public.contact_leads;
DROP POLICY IF EXISTS "Allow admin full access to contact_leads" ON public.contact_leads;

-- 5. Public can insert (contact form)
CREATE POLICY "Public can submit contact leads"
  ON public.contact_leads FOR INSERT
  WITH CHECK (true);

-- 6. Admins have full access
CREATE POLICY "Admins full access to contact_leads"
  ON public.contact_leads FOR ALL
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- 7. Indexes
CREATE INDEX IF NOT EXISTS idx_contact_leads_status ON public.contact_leads(status);
CREATE INDEX IF NOT EXISTS idx_contact_leads_source ON public.contact_leads(source);
CREATE INDEX IF NOT EXISTS idx_contact_leads_created ON public.contact_leads(created_at DESC);
