"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import type { PageContent } from "@/types"

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
    console.error("Critical error in isAuthorized (pages):", error)
    return { authorized: false, client: null }
  }
}

export async function getPagesAdmin() {
  const { authorized, client: supabase } = await isAuthorized("editor")
  if (!authorized || !supabase) {
    return { data: [], error: "Unauthorized" }
  }

  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .order("title", { ascending: true })

  return {
    data: data || [],
    error: error ? error.message : null,
  }
}

export async function getPageAdmin(slug: string) {
  const { authorized, client: supabase } = await isAuthorized("editor")
  if (!authorized || !supabase) {
    return { data: null, error: "Unauthorized" }
  }

  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single()

  return {
    data: data as PageContent | null,
    error: error ? error.message : null,
  }
}

export async function updatePageAdmin(slug: string, updates: Partial<PageContent>) {
  const { authorized, client: supabase } = await isAuthorized("editor")
  if (!authorized || !supabase) {
    return { success: false, error: "Unauthorized" }
  }

  // Remove id from updates to prevent attempting to change it
  const { id, updated_at, created_at, ...allowedUpdates } = updates as any

  const { error } = await supabase
    .from("pages")
    .update(allowedUpdates)
    .eq("slug", slug)

  if (error) {
    console.error("Error updating page:", error)
    return { success: false, error: error.message }
  }

  // Revalidate paths. Next.js router handles nested slugs automatically if we revalidate them.
  revalidatePath(`/${slug === 'home' ? '' : slug}`, "page")
  revalidatePath("/admin/pages", "page")
  
  return { success: true }
}
