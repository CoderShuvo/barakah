import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Fast fail for common static extensions and admin paths (to save Vercel Edge Execution limits)
  const pathname = request.nextUrl.pathname
  if (
    pathname.includes('.') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/assets') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  try {
    // We use the REST API via native fetch with Next Cache so this is blazing fast
    // and doesn't hit Supabase constantly.
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (url && key) {
      const dbRes = await fetch(`${url}/rest/v1/redirects?select=source,destination,permanent`, {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`
        },
        // Cache the redirects query for 60 seconds site-wide.
        // It's a trade-off: saves DB cost drastically, but redirects take up to 60s to apply.
        next: { revalidate: 60 } 
      })
      
      if (dbRes.ok) {
        const redirects = await dbRes.json()
        const match = redirects.find((r: any) => r.source === pathname)
        
        if (match) {
          // If it's a full URL (http...), redirect directly to it
          const isExternal = match.destination.startsWith('http')
          const targetUrl = isExternal ? match.destination : new URL(match.destination, request.url)
          return NextResponse.redirect(targetUrl, match.permanent ? 308 : 307)
        }
      }
    }
  } catch (error) {
    // Fail silently allowing the request to proceed if redirect engine faults
    console.error("Edge redirect check failed", error)
  }

  return NextResponse.next()
}

export const config = {
  // Only match routes that could be pages
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.).*)'],
}
