# Barakah Agency - Next.js Full Stack Dashboard

## Deployment & Environment Protocol

This application has been structured and designed for zero-downtime, continuous deployment scaling natively on **Vercel** and **Supabase**.

### 1. Vercel Deployment & Builds

- **Triggering Deployments**: ALL application builds and deployments must be triggered natively via the **Vercel Dashboard** or pushed via a connected Git repository. Do not build manually (`next build`) on the local codebase for deployment uploads.
- **Environment Targeting**: Vercel handles deployments across environments:
  - **Staging / Preview**: Any branch pushed (other than `main`) will automatically generate a separate Vercel Preview URL. Use these branch domains for your **Staging Environment** before merging changes to production.
  - **Production**: Merging or pushing to the `main` branch will automatically trigger a production build.

### 2. Sensitive Keys & Environment Variables

- **Do not hardcode keys in the repository**.
- All environment variables (e.g., Supabase URLs, Service Role Keys, GA4 Measurement IDs) **must be stored exclusively within the Vercel Dashboard Settings (`Settings -> Environment Variables`)**.
- Required Production Environment Variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - _(Optional)_ `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`
- Note: Variables modifying public behavior (like `NEXT_PUBLIC_SUPABASE_URL`) will automatically be injected into the client bundle at build time by Vercel.

### 3. Database Management & Automated Backups

- **Database Scaling**: Your database relies on Supabase PostgreSQL.
- **Automated Backups Require Supabase Pro**: Daily automated database backups, Point-In-Time-Recovery (PITR), and branching are natively handled by Supabase, but only if the workspace relies on the **Supabase Pro Plan**.
- To enable:
  1. Access the **Supabase Dashboard**.
  2. Upgrade the project to the Pro tier.
  3. Go to `Database -> Backups` to verify daily schedule.
- Ensure any schema migrations (found in the root directory like `supabase_migration_advanced.sql`) are safely run in the Supabase SQL editor on Staging first if experimenting with destructive data.

## Features Currently Enabled

- Full custom-built CMS dashboard (`/admin`) with Media Library
- Form capture & Leads tracking
- Deep SEO Controls (Sitemap, OpenGraph, Canonical URLs, and GTM hooks)
- Custom URL Redirects (301/302) evaluated dynamically via Edge middleware
- Live Custom 404 pages configured cleanly from the dashboard
