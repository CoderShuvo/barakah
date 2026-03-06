import { MetadataRoute } from 'next'

export const revalidate = 86400 // Revalidate once a day

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://barakahagency.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/_next/', '/barakah-login/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
