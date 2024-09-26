import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyEmail';

  const token = request.cookies.get('token')?.value || '';

  // If the user is authenticated (token exists) and tries to access public paths, redirect to /profile
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // If the user is not authenticated (no token) and tries to access private paths, redirect to /login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

}

// Match specific paths for the middleware to apply to
export const config = {
  matcher: [
    '/profile',
    '/login',
    '/signup',
    '/verifyEmail',
  ],
}
