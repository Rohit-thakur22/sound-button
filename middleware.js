import { NextResponse } from 'next/server'

// Supported locales
const locales = ['en', 'fr', 'de', 'es', 'bn', 'hi', 'ja', 'ko', 'it', 'pt', 'ru', 'ta', 'ml', 'ar']
const defaultLocale = 'en'

// Get the preferred locale from Accept-Language header or cookie
function getLocale(request) {
  // Check if locale is already in the URL
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (!pathnameIsMissingLocale) {
    return pathname.split('/')[1]
  }

  // Check cookie first
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().split('-')[0])
      .find(lang => locales.includes(lang))
    
    if (preferredLocale) {
      return preferredLocale
    }
  }

  return defaultLocale
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname
  
  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/sw.js') ||
    pathname.startsWith('/workbox') ||
    pathname.startsWith('/ads.txt') ||
    pathname.startsWith('/yandex_') ||
    pathname.startsWith('/6386f351fc704689bd684bb41e47ceea.txt')
  ) {
    return NextResponse.next()
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    
    // Prevent infinite redirects by checking if we're already redirecting
    if (pathname === `/${locale}` || pathname === `/${locale}/`) {
      return NextResponse.next()
    }
    
    // Redirect to the locale-specific URL
    const url = new URL(`/${locale}${pathname}`, request.url)
    
    // Set the locale cookie for future requests
    const response = NextResponse.redirect(url)
    response.cookies.set('NEXT_LOCALE', locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
    
    return response
  }

  // Extract locale from pathname
  const locale = pathname.split('/')[1]
  
  // If locale is not supported, redirect to default locale
  if (!locales.includes(locale)) {
    const url = new URL(`/${defaultLocale}${pathname}`, request.url)
    return NextResponse.redirect(url)
  }

  // Set locale cookie based on URL
  const response = NextResponse.next()
  const urlLocale = pathname.split('/')[1]
  
  if (locales.includes(urlLocale)) {
    response.cookies.set('NEXT_LOCALE', urlLocale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
  }

  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc.)
    '/((?!_next|api|static|favicon|robots|sitemap|sw.js|workbox|ads.txt|yandex_|6386f351fc704689bd684bb41e47ceea.txt).*)',
  ],
}
