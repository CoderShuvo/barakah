"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { siteSettingsSchema, type SiteSettingsFormData } from "@/lib/validations"
import type { SiteSettings } from "@/types"

async function isAuthorized(requiredRole: "admin" | "editor" = "editor") {
  try {
    const { getAuthorizedSupabase, touchSession } = await import("@/lib/supabase/server")
    const client = await getAuthorizedSupabase(requiredRole)
    if (client) {
      await touchSession()
      return { authorized: true, client }
    }
    return { authorized: false, client: null }
  } catch (error) {
    console.error("Critical error in isAuthorized (SEO):", error)
    return { authorized: false, client: null }
  }
}

export async function getSiteSettings(): Promise<{ data: SiteSettings | null; error: string | null }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "seo_global")
    .single()

  if (error) {
    console.error("Error fetching site settings:", error)
    return { data: null, error: error.message }
  }

  return { data: data.value as SiteSettings, error: null }
}

export async function updateSiteSettings(data: SiteSettingsFormData) {
  const validated = siteSettingsSchema.safeParse(data)
  if (!validated.success) {
    return { success: false, error: validated.error.flatten().fieldErrors }
  }

  const { authorized, client: supabase } = await isAuthorized("admin")
  if (!authorized || !supabase) {
    return { success: false, error: "Unauthorized" }
  }

  const { error } = await supabase
    .from("site_settings")
    .update({ 
      value: validated.data,
      updated_at: new Date().toISOString() 
    })
    .eq("key", "seo_global")

  if (error) {
    console.error("Error updating site settings:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/", "layout")
  return { success: true }
}

// Unified action for updating SEO fields only on any item
export async function updateItemSEO(
  type: "pages" | "blogs" | "case_studies",
  id: string,
  seoData: any
) {
  const { authorized, client: supabase } = await isAuthorized("editor")
  if (!authorized || !supabase) {
    return { success: false, error: "Unauthorized" }
  }

  const { error } = await supabase
    .from(type)
    .update({
      meta_title: seoData.meta_title || null,
      meta_description: seoData.meta_description || null,
      og_title: seoData.og_title || null,
      og_description: seoData.og_description || null,
      og_image: seoData.og_image || null,
      canonical_url: seoData.canonical_url || null,
      no_index: seoData.no_index || false,
      updated_at: new Date().toISOString(),
    })
    .eq(type === "pages" ? "slug" : "id", id)

  if (error) {
    console.error(`Error updating SEO for ${type}:`, error)
    return { success: false, error: error.message }
  }

  revalidatePath("/", "layout")
  return { success: true }
}
