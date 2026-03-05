import { createServerClient } from '@supabase/ssr'
import { createClient as createBaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

/**
 * Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
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
              cookieStore.set(name, value, options),
            )
          } catch {
            // The "setAll" method was called from a Server Component.
            // This can be ignored if you have proxy refreshing
            // user sessions.
          }
        },
      },
    },
  )
}

/**
 * Creates a Supabase client with the service role key.
 * This client bypasses Row Level Security (RLS) and should ONLY be used in Server Actions
 * for administrative tasks after proper authorization checks.
 */
export async function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = 
    process.env.SUPABASE_SERVICE_ROLE_KEY || 
    process.env.SERVICE_ROLE_KEY || 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url) {
    console.error('SUPABASE_DEBUG: URL missing')
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is missing')
  }

  // Debug log (masked)
  const isServiceRole = !!(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY)
  console.log(`SUPABASE_DEBUG: Creating admin client. URL: ${url.substring(0, 15)}... Key Type: ${isServiceRole ? 'Service Role' : 'Anon Fallback'}`)

  if (!serviceRoleKey) {
    console.error('SUPABASE_DEBUG: All keys missing')
    throw new Error('Supabase API key is missing')
  }

  // Use the base client for admin tasks as it's more direct for service role usage
  return createBaseClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

/**
 * Gets the current user's profile from the public.profiles table.
 */
export async function getUserProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const cookieStore = await cookies()
  const isAdminAuth = (await cookieStore).get("admin_auth")?.value === "true"
  const adminRole = (await cookieStore).get("admin_role")?.value || "editor"

  if (!user) {
    if (isAdminAuth) {
      return {
        id: 'mock-admin',
        email: adminRole === 'admin' ? 'admin@barakah.agency' : 'editor@barakah.agency',
        role: adminRole as 'admin' | 'editor'
      }
    }
    return null
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
}

/**
 * Gets an authorized Supabase client based on the required role.
 */
export async function getAuthorizedSupabase(requiredRole: 'admin' | 'editor' = 'editor') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // 1. Check for hardcoded admin cookie (fallback for dev)
  const cookieStore = await cookies()
  const isAdminAuth = (await cookieStore).get("admin_auth")?.value === "true"
  if (isAdminAuth) return await createAdminClient()

  if (!user) return null

  // 2. Lookup role from profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, locked_until')
    .eq('id', user.id)
    .single()

  if (!profile) return null

  // Check lockout
  if (profile.locked_until && new Date(profile.locked_until) > new Date()) return null

  // Role hierarchy: admin can do everything editor can
  const roles = { admin: 2, editor: 1 }
  if (roles[profile.role as 'admin' | 'editor'] >= roles[requiredRole]) {
    return await createAdminClient()
  }
  
  return null
}

/**
 * Updates the last activity timestamp in the user's cookies.
 */
export async function touchSession() {
  const cookieStore = await cookies()
  cookieStore.set('last_activity', new Date().toISOString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  })
}

/**
 * Checks if the session has timed out (default 30 minutes).
 */
export async function checkSessionTimeout(timeoutMinutes: number = 30) {
  const cookieStore = await cookies()
  const lastActivity = cookieStore.get('last_activity')?.value
  
  if (!lastActivity) return false

  const lastActivityDate = new Date(lastActivity)
  const now = new Date()
  const diffInMinutes = (now.getTime() - lastActivityDate.getTime()) / (1000 * 60)

  return diffInMinutes > timeoutMinutes
}
