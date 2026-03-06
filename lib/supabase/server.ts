import { createServerClient } from "@supabase/ssr"
import { createClient as createBaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

/**
 * Standard Supabase client for Server Components, Actions and Route Handlers.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  )
}

/**
 * Admin client that bypasses RLS. USE CAREFULLY.
 */
export async function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  return createBaseClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

/**
 * Gets the current user's profile from the public.profiles table.
 */
export async function getUserProfile() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  console.log("DEBUG PROFILE FETCH:", { user_id: user.id, profile, error })

  return profile
}

/**
 * Checks authorization for a specific role.
 */
export async function getAuthorizedSupabase(requiredRole: "admin" | "editor" = "editor") {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Check role from profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role, locked_until")
    .eq("id", user.id)
    .single()

  console.log("DEBUG AUTH FETCH:", { profile, error })

  if (!profile) return null

  // Check lockout
  if (profile.locked_until && new Date(profile.locked_until) > new Date()) return null

  // Role hierarchy
  const roles = { admin: 2, editor: 1 }
  const userRoleRank = roles[profile.role as "admin" | "editor"] || 0
  const requiredRoleRank = roles[requiredRole]

  if (userRoleRank >= requiredRoleRank) {
    return supabase
  }

  return null
}

/**
 * Updates the last activity timestamp in the user's cookies.
 */
export async function touchSession() {
  const cookieStore = await cookies()
  cookieStore.set("last_activity", new Date().toISOString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })
}

