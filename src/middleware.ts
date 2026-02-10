///scr/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of supported locales
const locales = ['en', 'ja'];
const defaultLocale = 'en';

// Get the preferred locale from headers
function getLocale(request: NextRequest) {
  // Check if locale is set in URL
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = locales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameLocale) return pathnameLocale;

  // Check Accept-Language header
  const acceptedLanguages = request.headers.get('accept-language');
  if (acceptedLanguages) {
    const preferredLocale = acceptedLanguages
      .split(',')
      .map(lang => lang.split(';')[0].trim().substring(0, 2))
      .find(lang => locales.includes(lang));
    if (preferredLocale) return preferredLocale;
  }

  // Default to English
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split('/').filter(Boolean);

  // Get current locale from URL if it exists
  const currentLocale = segments[0] && locales.includes(segments[0]) ? segments[0] : null;

  // If no locale in URL, redirect to appropriate locale
  if (!currentLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname === '/' ? '' : pathname}`,
        request.url
      )
    );
  }

  const res = NextResponse.next();

  // Add CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.headers.set('Access-Control-Max-Age', '3600');
  }

  // Check for session cookie
  const sessionCookie = request.cookies.get('session');
  let sessionData = null;
  
  try {
    if (sessionCookie) {
      sessionData = JSON.parse(sessionCookie.value);
    }
  } catch (error) {
    console.error('Failed to parse session cookie:', error);
  }
  
  // Protected routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!sessionData) {
      // No session cookie, redirect to login
      return NextResponse.redirect(new URL(`/${currentLocale}`, request.url));
    }
    
    // Check if user has admin role
    if (sessionData.role !== 'admin' && sessionData.role !== 'creator') {
      // User doesn't have admin role, redirect to home
      return NextResponse.redirect(new URL(`/${currentLocale}`, request.url));
    }
  }
  
  // Auth routes
  if (request.nextUrl.pathname === '/login' && sessionData) {
    // Already logged in, redirect to appropriate page
    if (sessionData.role === 'admin' || sessionData.role === 'creator') {
      return NextResponse.redirect(new URL(`/${currentLocale}/admin`, request.url));
    } else {
      return NextResponse.redirect(new URL(`/${currentLocale}`, request.url));
    }
  }

  return res;
}

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /static (static files)
  // - favicon.ico, robots.txt, etc.
  matcher: ['/((?!api|_next|static|.*\\..*).*)']
};