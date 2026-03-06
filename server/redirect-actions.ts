"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { redirectSchema, type RedirectFormData } from "@/lib/validations"

async function isAuthorized() {
  const { getAuthorizedSupabase } = await import("@/lib/supabase/server")
  const client = await getAuthorizedSupabase("admin")
  return { authorized: !!client, client }
}

export async function getRedirects() {
  const { authorized, client: supabase } = await isAuthorized()
  if (!authorized || !supabase) return { error: "Unauthorized", data: [] }

  const { data, error } = await supabase
    .from("redirects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching redirects:", error)
    return { error: error.message, data: [] }
  }

  return { error: null, data }
}

export async function createRedirect(data: RedirectFormData) {
  const { authorized, client: supabase } = await isAuthorized()
  if (!authorized || !supabase) return { error: "Unauthorized" }

  const validated = redirectSchema.safeParse(data)
  if (!validated.success) return { error: "Invalid data", fieldErrors: validated.error.flatten().fieldErrors }

  const { error } = await supabase
    .from("redirects")
    .insert([validated.data])

  if (error) {
    console.error("Error creating redirect:", error)
    return { error: error.code === '23505' ? "Source path already exists" : error.message }
  }

  revalidatePath("/", "layout")
  return { success: true }
}

export async function updateRedirect(id: string, data: RedirectFormData) {
  const { authorized, client: supabase } = await isAuthorized()
  if (!authorized || !supabase) return { error: "Unauthorized" }

  const validated = redirectSchema.safeParse(data)
  if (!validated.success) return { error: "Invalid data", fieldErrors: validated.error.flatten().fieldErrors }

  const { error } = await supabase
    .from("redirects")
    .update({ ...validated.data, updated_at: new Date().toISOString() })
    .eq("id", id)

  if (error) {
    console.error("Error updating redirect:", error)
    return { error: error.code === '23505' ? "Source path already exists" : error.message }
  }

  revalidatePath("/", "layout")
  return { success: true }
}

export async function deleteRedirect(id: string) {
  const { authorized, client: supabase } = await isAuthorized()
  if (!authorized || !supabase) return { error: "Unauthorized" }

  const { error } = await supabase
    .from("redirects")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting redirect:", error)
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  return { success: true }
}
