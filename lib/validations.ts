import { z } from "zod"

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  service: z.string().optional(),
  budget: z.string().optional(),
  source: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const seoFieldsSchema = z.object({
  meta_title: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
  og_title: z.string().optional().nullable(),
  og_description: z.string().optional().nullable(),
  og_image: z.string().optional().nullable(),
  canonical_url: z.string().url("Please enter a valid URL").optional().or(z.literal("")).nullable(),
  no_index: z.boolean().default(false),
})

export const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with dashes"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  cover_image: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
  category: z.string().min(2, "Category is required"),
  author_name: z.string().transform(val => val === "" ? null : val).nullable(),
  tags: z.string().optional(),
  published: z.boolean().default(false),
  scheduled_publish_at: z.string().optional().nullable(),
}).merge(seoFieldsSchema)

export type BlogFormData = z.infer<typeof blogSchema>

export const caseStudySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with dashes"),
  client: z.string().min(2, "Client name is required"),
  industry: z.string().min(2, "Industry is required"),
  challenge: z.string().min(20, "Challenge description must be at least 20 characters"),
  solution: z.string().min(20, "Solution description must be at least 20 characters"),
  results: z.string().min(20, "Results description must be at least 20 characters"),
  cover_image: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
  gallery: z.array(z.string().url()).optional(),
  testimonial: z.string().optional(),
  testimonial_author: z.string().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  service_tags: z.array(z.string()).optional(),
  metrics: z.string().optional(),
}).merge(seoFieldsSchema)

export type CaseStudyFormData = z.infer<typeof caseStudySchema>

export const seoSettingsSchema = z.object({
  google_search_console_id: z.string().optional(),
  google_analytics_id: z.string().optional(),
  robots_txt: z.string().optional(),
  site_name: z.string().min(2, "Site name is required"),
  default_og_image: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
})

export type SEOSettingsFormData = z.infer<typeof seoSettingsSchema>

export const generalSettingsSchema = z.object({
  site_title: z.string().min(2, "Site title is required"),
  tagline: z.string().optional(),
  logo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  favicon_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
})
export type GeneralSettingsFormData = z.infer<typeof generalSettingsSchema>

export const contactSettingsSchema = z.object({
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  instagram: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  facebook: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
  youtube: z.string().url("Invalid URL").optional().or(z.literal("")),
})
export type ContactSettingsFormData = z.infer<typeof contactSettingsSchema>

export const integrationSettingsSchema = z.object({
  gtm_id: z.string().optional(),
  ga4_id: z.string().optional(),
  gsc_id: z.string().optional(),
  header_scripts: z.string().optional(),
  footer_scripts: z.string().optional(),
})
export type IntegrationSettingsFormData = z.infer<typeof integrationSettingsSchema>

// Keep siteSettingsSchema for backwards compatibility for now, pointing to seoSettings
export const siteSettingsSchema = seoSettingsSchema
export type SiteSettingsFormData = z.infer<typeof siteSettingsSchema>


export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const notFoundSettingsSchema = z.object({
  headline: z.string().min(2, "Headline is required").default("Oops! Page Not Found"),
  message: z.string().min(5, "Message must be at least 5 characters").default("The page you are looking for might have been removed or is temporarily unavailable."),
  cta_text: z.string().min(2, "CTA text is required").default("Back to Home"),
  cta_link: z.string().min(1, "CTA link is required").default("/"),
})
export type NotFoundSettingsFormData = z.infer<typeof notFoundSettingsSchema>

export const formSettingsSchema = z.object({
  success_headline: z.string().min(2, "Success headline is required").default("Message Sent!"),
  success_message: z.string().min(5, "Success message is required").default("Thank you for reaching out. We will get back to you shortly."),
  submit_button_text: z.string().min(2, "Button text is required").default("Send Message"),
  show_budget: z.boolean().default(true),
  show_service: z.boolean().default(true),
  show_company: z.boolean().default(false),
})
export type FormSettingsFormData = z.infer<typeof formSettingsSchema>

export const redirectSchema = z.object({
  source: z.string().min(1, "Source path is required").startsWith("/", "Source must start with /"),
  destination: z.string().min(1, "Destination is required"),
  permanent: z.boolean().default(true),
})
export type RedirectFormData = z.infer<typeof redirectSchema>

