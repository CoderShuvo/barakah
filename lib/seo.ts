import { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { getSiteSettings } from "@/server/seo-actions"

export async function constructMetadata({
  type,
  slug,
  fallbackTitle,
  fallbackDescription,
  fallbackImage,
}: {
  type: 'pages' | 'blogs' | 'case_studies'
  slug: string
  fallbackTitle?: string
  fallbackDescription?: string
  fallbackImage?: string
}): Promise<Metadata> {
  const supabase = await createClient()
  const { data: global } = await getSiteSettings()
  
  const { data: item } = await supabase
    .from(type)
    .select("*")
    .eq("slug", slug)
    .single()

  const siteName = global?.site_name || "Barakah Agency"
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://barakahagency.com'

  if (!item) {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      openGraph: {
        title: fallbackTitle,
        description: fallbackDescription,
        siteName,
        images: fallbackImage ? [{ url: fallbackImage }] : undefined,
      }
    }
  }

  const title = item.meta_title || item.title || fallbackTitle
  const description = item.meta_description || item.excerpt || fallbackDescription
  const ogTitle = item.og_title || title
  const ogDescription = item.og_description || description
  const ogImage = item.og_image || item.cover_image || fallbackImage || global?.default_og_image
  const noIndex = item.no_index

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: item.canonical_url || `${baseUrl}/${slug === 'home' ? '' : slug}`,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${baseUrl}/${slug === 'home' ? '' : slug}`,
      title: ogTitle,
      description: ogDescription,
      siteName,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}
