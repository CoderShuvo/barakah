"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import {
  contactFormSchema,
  blogSchema,
  caseStudySchema,
  type ContactFormData,
  type BlogFormData,
  type CaseStudyFormData,
} from "@/lib/validations"
import { cookies } from "next/headers"

// Helper to check if the current user is an authorized admin
async function isAdminAuthorized() {
  try {
    const { createClient, createAdminClient } = await import("@/lib/supabase/server")
    const supabase = await createClient()
    
    // 1. Check Supabase session
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (user?.user_metadata?.is_admin) {
      console.log("SUPABASE_DEBUG: Authorized via Supabase Auth")
      return { authorized: true, user, client: await createAdminClient() }
    }

    if (userError && userError.message !== "Auth session missing!") {
      console.warn("SUPABASE_DEBUG: Supabase auth check warning:", userError.message)
    }

    // 2. Check hardcoded admin cookie
    const cookieStore = await cookies()
    const isAdminAuth = (await cookieStore).get("admin_auth")?.value === "true"
    
    if (isAdminAuth) {
      console.log("SUPABASE_DEBUG: Authorized via Mock Admin Cookie")
      return { 
        authorized: true, 
        user: { 
          id: "hardcoded-admin", 
          email: "admin@barakahagency.com" 
        },
        client: await createAdminClient()
      }
    }

    return { authorized: false, user: null, client: null }
  } catch (error) {
    console.error("Critical error in isAdminAuthorized:", error)
    return { authorized: false, user: null, client: null }
  }
}

// Contact form submission
export async function submitContactForm(data: ContactFormData) {
  const validated = contactFormSchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: validated.error.flatten().fieldErrors }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("contact_leads").insert({
    name: validated.data.name,
    email: validated.data.email,
    company: validated.data.company || null,
    phone: validated.data.phone || null,
    message: validated.data.message,
    service: validated.data.service || null,
    status: "new",
  })

  if (error) {
    console.error("Error submitting contact form:", error)
    return { success: false, error: "Failed to submit form. Please try again." }
  }

  return { success: true }
}

// Admin actions for blogs
export async function createBlog(data: BlogFormData) {
  const validated = blogSchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: validated.error.flatten().fieldErrors }
  }

  const { authorized, user, client: supabase } = await isAdminAuthorized()
  if (!authorized || !user || !supabase) {
    return { success: false, error: "Unauthorized" }
  }

  const tags = validated.data.tags 
    ? validated.data.tags.split(",").map(t => t.trim()).filter(Boolean)
    : null

  const { error } = await supabase.from("blogs").insert({
    title: validated.data.title,
    slug: validated.data.slug,
    excerpt: validated.data.excerpt,
    content: validated.data.content,
    cover_image: validated.data.cover_image || null,
    category: validated.data.category,
    tags,
    published: validated.data.published,
    meta_title: validated.data.meta_title || null,
    meta_description: validated.data.meta_description || null,
    author_name: validated.data.author_name || null,
  })

  if (error) {
    console.error("Error creating blog:", error)
    return { success: false, error }
  }

  revalidatePath("/blog", "page")
  revalidatePath("/admin/blogs", "page")
  return { success: true }
}

export async function updateBlog(id: string, data: BlogFormData) {
  const validated = blogSchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: validated.error.flatten().fieldErrors }
  }

  const { authorized, client: supabase } = await isAdminAuthorized()
  if (!authorized || !supabase) {
    return { success: false, error: "Unauthorized" }
  }

  const tags = validated.data.tags 
    ? validated.data.tags.split(",").map(t => t.trim()).filter(Boolean)
    : null

  const { error } = await supabase
    .from("blogs")
    .update({
      title: validated.data.title,
      slug: validated.data.slug,
      excerpt: validated.data.excerpt,
      content: validated.data.content,
      cover_image: validated.data.cover_image || null,
      category: validated.data.category,
      tags,
      published: validated.data.published,
      meta_title: validated.data.meta_title || null,
      meta_description: validated.data.meta_description || null,
      author_name: validated.data.author_name || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating blog:", error)
    return { success: false, error }
  }

  revalidatePath("/blog", "page")
  revalidatePath(`/blog/${validated.data.slug}`, "page")
  revalidatePath("/admin/blogs", "page")
  return { success: true }
}

export async function deleteBlog(id: string) {
  const { authorized, client: supabase } = await isAdminAuthorized()
  if (!authorized || !supabase) {
    return { success: false, error: "Unauthorized" }
  }
  
  const { error } = await supabase.from("blogs").delete().eq("id", id)

  if (error) {
    console.error("Error deleting blog:", error)
    return { success: false, error }
  }

  revalidatePath("/blog", "page")
  revalidatePath("/admin/blogs", "page")
  return { success: true }
}

// Admin actions for case studies
export async function createCaseStudy(data: CaseStudyFormData) {
  const validated = caseStudySchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: validated.error.flatten().fieldErrors }
  }

  const { authorized, client: supabase } = await isAdminAuthorized()
  if (!authorized || !supabase) {
    return { success: false, error: "Unauthorized" }
  }
  
  const metrics = validated.data.metrics 
    ? JSON.parse(validated.data.metrics)
    : null

  const { error } = await supabase.from("case_studies").insert({
    title: validated.data.title,
    slug: validated.data.slug,
    client: validated.data.client,
    industry: validated.data.industry,
    challenge: validated.data.challenge,
    solution: validated.data.solution,
    results: validated.data.results,
    cover_image: validated.data.cover_image || null,
    gallery: validated.data.gallery || null,
    testimonial: validated.data.testimonial || null,
    testimonial_author: validated.data.testimonial_author || null,
    published: validated.data.published,
    featured: validated.data.featured,
    metrics,
  })

  if (error) {
    console.error("Error creating case study:", error)
    return { success: false, error }
  }

  revalidatePath("/case-studies", "page")
  revalidatePath("/admin/case-studies", "page")
  return { success: true }
}

export async function updateCaseStudy(id: string, data: CaseStudyFormData) {
  const validated = caseStudySchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: validated.error.flatten().fieldErrors }
  }

  const { authorized, client: supabase } = await isAdminAuthorized()
  if (!authorized || !supabase) {
    return { success: false, error: "Unauthorized" }
  }
  
  const metrics = validated.data.metrics 
    ? JSON.parse(validated.data.metrics)
    : null

  const { error } = await supabase
    .from("case_studies")
    .update({
      title: validated.data.title,
      slug: validated.data.slug,
      client: validated.data.client,
      industry: validated.data.industry,
      challenge: validated.data.challenge,
      solution: validated.data.solution,
      results: validated.data.results,
      cover_image: validated.data.cover_image || null,
      gallery: validated.data.gallery || null,
      testimonial: validated.data.testimonial || null,
      testimonial_author: validated.data.testimonial_author || null,
      published: validated.data.published,
      featured: validated.data.featured,
      metrics,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating case study:", error)
    return { success: false, error }
  }

  revalidatePath("/case-studies", "page")
  revalidatePath(`/case-studies/${validated.data.slug}`, "page")
  revalidatePath("/admin/case-studies", "page")
  return { success: true }
}

export async function deleteCaseStudy(id: string) {
  const { authorized, client: supabase } = await isAdminAuthorized()
  if (!authorized || !supabase) {
    return { success: false, error: "Unauthorized" }
  }
  
  const { error } = await supabase.from("case_studies").delete().eq("id", id)

  if (error) {
    console.error("Error deleting case study:", error)
    return { success: false, error }
  }

  revalidatePath("/case-studies", "page")
  revalidatePath("/admin/case-studies", "page")
  return { success: true }
}

// Update lead status
export async function updateLeadStatus(id: string, status: string) {
  const { authorized, client: supabase } = await isAdminAuthorized()
  if (!authorized || !supabase) {
    return { success: false, error: "Unauthorized" }
  }
  
  const { error } = await supabase
    .from("contact_leads")
    .update({ status })
    .eq("id", id)

  if (error) {
    console.error("Error updating lead status:", error)
    return { success: false, error }
  }

  revalidatePath("/admin/leads", "page")
  return { success: true }
}

export async function getBlogsAdmin(options: {
  page: number;
  pageSize: number;
  search?: string;
}) {
  const { authorized, client: supabase } = await isAdminAuthorized()
  if (!authorized || !supabase) {
    return { data: [], count: 0, error: "Unauthorized" }
  }

  const from = (options.page - 1) * options.pageSize
  const to = from + options.pageSize - 1

  let query = supabase
    .from("blogs")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })

  if (options.search) {
    query = query.ilike("title", `%${options.search}%`)
  }

  const { data, error, count } = await query.range(from, to)

  return {
    data: data || [],
    count: count || 0,
    error: error ? error.message : null,
  }
}

export async function getCaseStudiesAdmin() {
  const { authorized, client: supabase } = await isAdminAuthorized()
  if (!authorized || !supabase) {
    return { data: [], count: 0, error: "Unauthorized" }
  }

  const { data, error, count } = await supabase
    .from("case_studies")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })

  return {
    data: data || [],
    count: count || 0,
    error: error ? error.message : null,
  }
}
