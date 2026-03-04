import { type NextRequest, NextResponse } from "next/server"
import { updateSession } from "@/lib/supabase/proxy"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Refresh session if expired - filling in common Supabase pattern
  const response = await updateSession(request)

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
