"use server"

import { createClient } from "@/lib/supabase/server"
import { MEDIA_BUCKET } from "@/lib/media-constants"

async function isAuthorized() {
  const { getAuthorizedSupabase } = await import("@/lib/supabase/server")
  const client = await getAuthorizedSupabase("editor") // Editors can upload
  return { authorized: !!client, client }
}

export async function listMedia() {
  const { authorized, client: supabase } = await isAuthorized()
  if (!authorized || !supabase) return { error: "Unauthorized", data: [] }

  const { data, error } = await supabase.storage.from(MEDIA_BUCKET).list("", {
    limit: 100,
    offset: 0,
    sortBy: { column: "created_at", order: "desc" },
  })

  if (error) {
    console.error("Error listing media:", error)
    return { error: error.message, data: [] }
  }

  // Map to attach public URLs
  const filesInfo = data
    .filter((file) => file.name !== ".emptyFolderPlaceholder")
    .map((file) => {
      const { data: publicData } = supabase.storage
        .from(MEDIA_BUCKET)
        .getPublicUrl(file.name)
        
      return {
        id: file.id,
        name: file.name,
        created_at: file.created_at,
        size: file.metadata?.size || 0,
        url: publicData.publicUrl,
      }
    })

  return { error: null, data: filesInfo }
}

export async function deleteMedia(filename: string) {
  const { authorized, client: supabase } = await isAuthorized()
  if (!authorized || !supabase) return { error: "Unauthorized" }

  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([filename])
  
  if (error) {
    console.error("Error deleting media:", error)
    return { error: error.message }
  }

  return { success: true }
}
