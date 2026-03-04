import { createClient } from "@/lib/supabase/server"
import type { Blog, CaseStudy, ContactLead, PaginatedResult } from "@/types"

export async function getBlogs(options?: {
  page?: number
  pageSize?: number
  category?: string
  published?: boolean
}): Promise<PaginatedResult<Blog>> {
  const supabase = await createClient()
  const page = options?.page || 1
  const pageSize = options?.pageSize || 10
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from("blogs")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })

  if (options?.published !== undefined) {
    query = query.eq("published", options.published)
  }

  if (options?.category) {
    query = query.eq("category", options.category)
  }

  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    console.error("Error fetching blogs:", error)
    return { data: [], total: 0, page, pageSize, totalPages: 0 }
  }

  const total = count || 0
  return {
    data: data as Blog[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle()

  if (error) {
    console.error("Error fetching blog:", error)
    return null
  }

  return data as Blog
}

export async function getBlogCategories(): Promise<string[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blogs")
    .select("category")
    .eq("published", true)

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  const categories = [...new Set(data.map((b) => b.category))]
  return categories.filter(Boolean)
}

export async function getCaseStudies(options?: {
  page?: number
  pageSize?: number
  industry?: string
  published?: boolean
  featured?: boolean
}): Promise<PaginatedResult<CaseStudy>> {
  const supabase = await createClient()
  const page = options?.page || 1
  const pageSize = options?.pageSize || 10
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from("case_studies")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })

  if (options?.published !== undefined) {
    query = query.eq("published", options.published)
  }

  // if (options?.featured !== undefined) {
  //   query = query.eq("featured", options.featured)
  // }

  if (options?.industry) {
    query = query.eq("industry", options.industry)
  }

  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    console.error("Error fetching case studies:", error)
    return { data: [], total: 0, page, pageSize, totalPages: 0 }
  }

  const total = count || 0
  return {
    data: data as CaseStudy[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle()

  if (error) {
    console.error("Error fetching case study:", error)
    return null
  }

  return data as CaseStudy
}

export async function getContactLeads(options?: {
  page?: number
  pageSize?: number
  status?: string
}): Promise<PaginatedResult<ContactLead>> {
  const supabase = await createClient()
  const page = options?.page || 1
  const pageSize = options?.pageSize || 20
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from("contact_leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })

  if (options?.status) {
    query = query.eq("status", options.status)
  }

  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    console.error("Error fetching leads:", error)
    return { data: [], total: 0, page, pageSize, totalPages: 0 }
  }

  const total = count || 0
  return {
    data: data as ContactLead[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}
