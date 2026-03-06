export interface SEOFields {
  meta_title: string | null
  meta_description: string | null
  og_title: string | null
  og_description: string | null
  og_image: string | null
  canonical_url: string | null
  no_index: boolean
}

export interface Blog extends SEOFields {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string | null
  category: string
  tags: string[] | null
  published: boolean
  scheduled_publish_at: string | null
  author_name: string | null
  created_at: string
  updated_at: string
}

export interface CaseStudy extends SEOFields {
  id: string
  title: string
  slug: string
  client: string
  industry: string
  challenge: string
  solution: string
  results: string
  cover_image: string | null
  gallery: string[] | null
  testimonial: string | null
  testimonial_author: string | null
  published: boolean
  featured: boolean
  service_tags: string[] | null
  metrics: Record<string, string> | null
  created_at: string
  updated_at: string
}

export interface ContactLead {
  id: string
  name: string
  email: string
  company: string | null
  phone: string | null
  message: string
  service: string | null
  budget: string | null
  source: string | null
  status: "new" | "contacted" | "qualified" | "closed"
  created_at: string
}

export interface Service {
  id: string
  name: string
  slug: string
  description: string
  features: string[] | null
  icon: string | null
  order_index: number
  created_at: string
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface PageContent extends SEOFields {
  id: string
  slug: string
  title: string
  hero_headline: string | null
  hero_subheadline: string | null
  content: any
  cta_text: string | null
  cta_link: string | null
  featured_image: string | null
  visible_sections: any
  published: boolean
  created_at: string
  updated_at: string
}

export interface SiteSettings {
  google_search_console_id: string
  google_analytics_id: string
  robots_txt: string
  site_name: string
  default_og_image: string
}

export interface GeneralSettings {
  site_title: string
  tagline?: string
  logo_url?: string
  favicon_url?: string
}

export interface ContactSettings {
  email?: string
  phone?: string
  address?: string
  instagram?: string
  linkedin?: string
  facebook?: string
  twitter?: string
  youtube?: string
}

export interface IntegrationSettings {
  gtm_id?: string
  ga4_id?: string
  gsc_id?: string
  header_scripts?: string
  footer_scripts?: string
}

export interface NotFoundSettings {
  headline: string
  message: string
  cta_text: string
  cta_link: string
}

export interface FormSettings {
  success_headline: string
  success_message: string
  submit_button_text: string
  show_budget: boolean
  show_service: boolean
  show_company: boolean
}

export interface Redirect {
  id: string
  source: string
  destination: string
  permanent: boolean
  created_at: string
}


