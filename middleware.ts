import { type NextRequest, NextResponse } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Refresh session and handle basic auth redirects
  const response = await updateSession(request)

  // 2. Inactivity Timeout Logic (Optional, but requested)
  const lastActivity = request.cookies.get('last_activity')?.value
  const isAdminPage = pathname.startsWith('/admin')

  if (isAdminPage && lastActivity) {
    const lastActivityDate = new Date(lastActivity)
    const now = new Date()
    const diffInMinutes = (now.getTime() - lastActivityDate.getTime()) / (1000 * 60)
    
    if (diffInMinutes > 60) { // 60 minutes inactivity
      const url = request.nextUrl.clone()
      url.pathname = '/barakah-login'
      url.searchParams.set('reason', 'timeout')
      const timeoutResponse = NextResponse.redirect(url)
      timeoutResponse.cookies.delete('last_activity')
      // Important: Supabase session is still there, but we force re-login for dashboard
      return timeoutResponse
    }
  }

  // 3. Redirect legacy paths to new custom auth paths
  if (pathname === '/admin/login' || pathname === '/admin/signup') {
    const url = request.nextUrl.clone()
    url.pathname = '/barakah-login'
    return NextResponse.redirect(url)
  }


  // 4. Security headers
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

