-- Blog Section Migration
-- Adds scheduled_publish_at column and updates RLS policies

-- 1. Add scheduled publishing column
ALTER TABLE public.blogs
  ADD COLUMN IF NOT EXISTS scheduled_publish_at TIMESTAMPTZ DEFAULT NULL;

-- 2. Drop old conflicting policies (recreate with correct names)
DROP POLICY IF EXISTS "Allow public read for published blogs" ON public.blogs;
DROP POLICY IF EXISTS "Allow admin full access to blogs" ON public.blogs;

-- 3. New public read policy: show published posts OR scheduled posts whose time has passed
CREATE POLICY "Public can view live blogs"
  ON public.blogs FOR SELECT
  USING (
    published = true
    OR (
      published = false
      AND scheduled_publish_at IS NOT NULL
      AND scheduled_publish_at <= now()
    )
  );

-- 4. Admins have full access
CREATE POLICY "Admins full access to blogs"
  ON public.blogs FOR ALL
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- 5. Editors can read and update (but not delete or insert)
CREATE POLICY "Editors can read all blogs"
  ON public.blogs FOR SELECT
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'editor'
  );

CREATE POLICY "Editors can update blogs"
  ON public.blogs FOR UPDATE
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'editor'
  );

CREATE POLICY "Editors can insert blogs"
  ON public.blogs FOR INSERT
  WITH CHECK (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'editor'
  );

-- 6. Index for scheduled publishing
CREATE INDEX IF NOT EXISTS idx_blogs_scheduled ON public.blogs(scheduled_publish_at);
