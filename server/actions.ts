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

/**
 * Authorizes a user based on their role for administrative tasks.
 */
async function isAuthorized(requiredRole: "admin" | "editor" = "editor") {
  try {
    const { getAuthorizedSupabase, touchSession } = await import("@/lib/supabase/server")
    const client = await getAuthorizedSupabase(requiredRole)
    
    if (client) {
      // Valid activity, update session timer
      await touchSession()
      return { authorized: true, client }
    }

    return { authorized: false, client: null }
  } catch (error) {
    console.error("Critical error in isAuthorized:", error)
    return { authorized: false, client: null }
  }
}

// Backward compatibility: maintain old function name for unchanged code
const isAdminAuthorized = () => isAuthorized("admin")

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

  const { authorized, client: supabase } = await isAuthorized("admin")
  if (!authorized || !supabase) {
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

  const { authorized, client: supabase } = await isAuthorized("admin")
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
  const { authorized, client: supabase } = await isAuthorized("admin")
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

  const { authorized, client: supabase } = await isAuthorized("admin")
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

  const { authorized, client: supabase } = await isAuthorized("admin")
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
  const { authorized, client: supabase } = await isAuthorized("admin")
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
  const { authorized, client: supabase } = await isAuthorized("admin")
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
  const { authorized, client: supabase } = await isAuthorized("admin")
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
export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  
  const { createClient, createAdminClient, touchSession } = await import("@/lib/supabase/server")
  const supabase = await createClient()
  const adminClient = await createAdminClient()

  // 1. Check lockout status first (from our custom profiles table)
  const { data: profile } = await adminClient
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single()

  if (profile?.locked_until && new Date(profile.locked_until) > new Date()) {
    const minutesLeft = Math.ceil((new Date(profile.locked_until).getTime() - Date.now()) / (1000 * 60))
    return { error: `Account locked. Please try again in ${minutesLeft} minutes.` }
  }

  // 2. Attempt login through Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // Handle failure
  if (error || !data?.user) {
    const newAttempts = (profile?.failed_login_attempts || 0) + 1
    const shouldLock = newAttempts >= 5
    const lockUntil = shouldLock ? new Date(Date.now() + 15 * 60 * 1000) : null // 15 min lockout

    if (profile) {
      await adminClient.from("profiles").update({
        failed_login_attempts: newAttempts,
        locked_until: lockUntil,
      }).eq("email", email)
    }

    return { error: error?.message || "Invalid credentials. Please try again." }
  }

  // 3. Get or Create Profile & Ensure Metadata matches DB Role
  let userProfile = profile
  if (!userProfile) {
    // Basic auto-creation for first-time admins if they exist in Auth but not DB
    const { data: newProfile } = await adminClient.from("profiles").upsert({
      id: data.user.id,
      email: data.user.email!,
      role: data.user.email === "ziad@barakah.agency" ? "admin" : "editor"
    }).select().single()
    userProfile = newProfile
  }

  // Force update user metadata with the role from the DB
  // This allows the middleware to read the role without a database hit on every request
  await supabase.auth.updateUser({
    data: { role: userProfile?.role || "editor" }
  })

  // 4. Success - Reset security counters
  await adminClient.from("profiles").update({
    failed_login_attempts: 0,
    locked_until: null,
    last_login_at: new Date().toISOString()
  }).eq("id", data.user.id)

  await touchSession()
  return { success: true, role: userProfile?.role || "editor" }
}

export async function logoutAction() {
  const { createClient } = await import("@/lib/supabase/server")
  const supabase = await createClient()
  const cookieStore = await cookies()
  
  await supabase.auth.signOut()
  
  // Clear activity and session cookies
  ;(await cookieStore).delete("last_activity")
  
  return { success: true }
}

export async function requestPasswordReset(email: string) {
  const { createClient } = await import("@/lib/supabase/server")
  const supabase = await createClient()
  
  // Get origin safely for the redirect link
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://barakahagency.com"

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/barakah-login/reset-password`,
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function resetPasswordAction(password: string) {
  const { createClient } = await import("@/lib/supabase/server")
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function getCaseStudiesAdmin() {
  const { createClient } = await import("@/lib/supabase/server")
  const supabase = await createClient()

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


