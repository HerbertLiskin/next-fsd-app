import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log(`[Middleware] ${request.method} ${request.url}`)
  console.log(
    `[Middleware] Cookies: ${request.cookies
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ')}`
  )

  const response = NextResponse.next()

  // Set a debug cookie to verify "Set-Cookie" works
  response.cookies.set('debug-cookie', 'hello-from-middleware', {
    path: '/',
    secure: false, // For local dev
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
  })

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
