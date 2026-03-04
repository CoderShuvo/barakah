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
 * Gets an authorized Supabase client for administrative tasks.
 * It checks for both a valid Supabase session with is_admin metadata
 * and the hardcoded admin_auth cookie.
 */
export async function getAdminSupabase() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const cookieStore = await cookies()
  const isAdminAuth = (await cookieStore).get("admin_auth")?.value === "true"
  
  if (user?.user_metadata?.is_admin || isAdminAuth) {
    return await createAdminClient()
  }
  
  return null
}
