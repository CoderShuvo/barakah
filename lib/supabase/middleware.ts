import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: DO NOT REMOVE getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // 1. Redirect logic for /admin routes
  if (pathname.startsWith("/admin")) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = "/barakah-login"
      return NextResponse.redirect(url)
    }

    // Role-based access control (RBAC)
    // We can check the role from user metadata (if set) or skip to layout level
    // For tighter security, we can query profiles here, but it adds latency.
    // Let's rely on the layout for deep role checks and metadata for quick ones.
    const role = user.user_metadata?.role || "editor"

    // Example: Editor cannot access Settings or Analytics
    if (role === "editor") {
      if (pathname.startsWith("/admin/settings") || pathname.startsWith("/admin/analytics")) {
        const url = request.nextUrl.clone()
        url.pathname = "/admin" // Redirect back to general dashboard
        return NextResponse.redirect(url)
      }
    }
  }

  // 2. Redirect logged-in users away from login page
  if (pathname === "/barakah-login" && user) {
    // Only redirect to admin if there's no error or reason specified in the query
    if (!request.nextUrl.searchParams.has("error") && !request.nextUrl.searchParams.has("reason")) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin"
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

