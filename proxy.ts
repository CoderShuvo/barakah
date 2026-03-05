import { type NextRequest, NextResponse } from "next/server"
import { updateSession } from "@/lib/supabase/proxy"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Refresh session if expired - filling in common Supabase pattern
  const response = await updateSession(request)

  const lastActivity = request.cookies.get('last_activity')?.value
  const isAuthPage = pathname.startsWith('/barakah-login')
  const isAdminPage = pathname.startsWith('/admin')

  // 1. Session Timeout Logic (30 minutes)
  if (isAdminPage && lastActivity) {
    const lastActivityDate = new Date(lastActivity)
    const now = new Date()
    const diffInMinutes = (now.getTime() - lastActivityDate.getTime()) / (1000 * 60)
    
    if (diffInMinutes > 30) {
      const url = request.nextUrl.clone()
      url.pathname = '/barakah-login'
      url.searchParams.set('reason', 'timeout')
      const timeoutResponse = NextResponse.redirect(url)
      timeoutResponse.cookies.delete('last_activity')
      return timeoutResponse
    }
  }

  // 2. Redirect legacy login to new custom path
  if (pathname === '/admin/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/barakah-login'
    return NextResponse.redirect(url)
  }

  // 3. Track origin for password reset redirects
  if (isAuthPage) {
    response.cookies.set('x-origin', request.nextUrl.origin, { path: '/' })
  }

  // Add security headers to the SAME response object returned by updateSession
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  )

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
