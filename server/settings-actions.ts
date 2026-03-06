"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { 
  generalSettingsSchema, type GeneralSettingsFormData,
  contactSettingsSchema, type ContactSettingsFormData,
  integrationSettingsSchema, type IntegrationSettingsFormData,
  notFoundSettingsSchema, type NotFoundSettingsFormData,
  formSettingsSchema, type FormSettingsFormData
} from "@/lib/validations"
import type { 
  GeneralSettings, ContactSettings, IntegrationSettings, NotFoundSettings, FormSettings
} from "@/types"

async function isAuthorized(requiredRole: "admin" | "editor" = "admin") {
  try {
    const { getAuthorizedSupabase, touchSession } = await import("@/lib/supabase/server")
    const client = await getAuthorizedSupabase(requiredRole)
    if (client) {
      await touchSession()
      return { authorized: true, client }
    }
    return { authorized: false, client: null }
  } catch (error) {
    console.error("Critical error in isAuthorized:", error)
    return { authorized: false, client: null }
  }
}

async function getSetting<T>(key: string, defaultValue: T): Promise<{ data: T; error: string | null }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .single()

  if (error && error.code !== "PGRST116") { // Ignore "no rows" error explicitly
    console.error(`Error fetching settings for ${key}:`, error)
    return { data: defaultValue, error: error.message }
  }

  return { data: (data?.value as T) || defaultValue, error: null }
}

async function updateSetting<T>(key: string, value: T) {
  const { authorized, client: supabase } = await isAuthorized("admin")
  if (!authorized || !supabase) {
    return { success: false, error: "Unauthorized" }
  }

  const { error } = await supabase
    .from("site_settings")
    .upsert({ 
      key,
      value,
      updated_at: new Date().toISOString() 
    }, { onConflict: "key" })

  if (error) {
    console.error(`Error updating settings for ${key}:`, error)
    return { success: false, error: error.message }
  }

  revalidatePath("/", "layout")
  return { success: true }
}

export async function getGeneralSettings() {
  return getSetting<GeneralSettings>("general_settings", { site_title: "Barakah Agency" })
}

export async function updateGeneralSettings(data: GeneralSettingsFormData) {
  const validated = generalSettingsSchema.safeParse(data)
  if (!validated.success) return { success: false, error: validated.error.flatten().fieldErrors }
  return updateSetting("general_settings", validated.data)
}

export async function getContactSettings() {
  return getSetting<ContactSettings>("contact_settings", {})
}

export async function updateContactSettings(data: ContactSettingsFormData) {
  const validated = contactSettingsSchema.safeParse(data)
  if (!validated.success) return { success: false, error: validated.error.flatten().fieldErrors }
  return updateSetting("contact_settings", validated.data)
}

export async function getIntegrationSettings() {
  return getSetting<IntegrationSettings>("integration_settings", {})
}

export async function updateIntegrationSettings(data: IntegrationSettingsFormData) {
  const validated = integrationSettingsSchema.safeParse(data)
  if (!validated.success) return { success: false, error: validated.error.flatten().fieldErrors }
  return updateSetting("integration_settings", validated.data)
}

export async function getNotFoundSettings() {
  return getSetting<NotFoundSettings>("not_found_settings", {
    headline: "Oops! Page Not Found",
    message: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
    cta_text: "Back to Home",
    cta_link: "/"
  })
}

export async function updateNotFoundSettings(data: NotFoundSettingsFormData) {
  const validated = notFoundSettingsSchema.safeParse(data)
  if (!validated.success) return { success: false, error: validated.error.flatten().fieldErrors }
  return updateSetting("not_found_settings", validated.data)
}

export async function getFormSettings() {
  return getSetting<FormSettings>("form_settings", {
    success_headline: "Message Sent!",
    success_message: "Thank you for reaching out. We will get back to you shortly.",
    submit_button_text: "Send Message",
    show_budget: true,
    show_service: true,
    show_company: false
  })
}

export async function updateFormSettings(data: FormSettingsFormData) {
  const validated = formSettingsSchema.safeParse(data)
  if (!validated.success) return { success: false, error: validated.error.flatten().fieldErrors }
  return updateSetting("form_settings", validated.data)
}

