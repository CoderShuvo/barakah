import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 3600 // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://barakahagency.com'

  // Fetch all published items that aren't marked no_index
  const [pagesRes, blogsRes, csRes] = await Promise.all([
    supabase.from('pages').select('slug, updated_at').eq('published', true).eq('no_index', false),
    supabase.from('blogs').select('slug, updated_at').eq('published', true).eq('no_index', false),
    supabase.from('case_studies').select('slug, updated_at').eq('published', true).eq('no_index', false)
  ])

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Pages
  pagesRes.data?.forEach(p => {
    // Handle home page slug
    const path = p.slug === 'home' ? '' : `/${p.slug}`
    sitemapEntries.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: 'monthly',
      priority: p.slug === 'home' ? 1.0 : 0.8
    })
  })

  // Blogs
  blogsRes.data?.forEach(b => {
    sitemapEntries.push({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(b.updated_at),
      changeFrequency: 'weekly',
      priority: 0.7
    })
  })

  // Case Studies
  csRes.data?.forEach(c => {
    sitemapEntries.push({
      url: `${baseUrl}/case-studies/${c.slug}`,
      lastModified: new Date(c.updated_at),
      changeFrequency: 'monthly',
      priority: 0.6
    })
  })

  return sitemapEntries
}
