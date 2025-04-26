import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

const locales = ["en", "th"];
const defaultLocale = "en";

// Enhanced security headers
const securityHeaders = {
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  
  // Enable XSS protection
  'X-XSS-Protection': '1; mode=block',
  
  // Control referrer information
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Enhanced CSP with comprehensive external service support
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel.app;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com data:;
    img-src 'self' data: https: blob:;
    connect-src 'self' 
      https://*.vercel.app 
      https://fonts.googleapis.com 
      https://fonts.gstatic.com 
      https://*.stepzen.net
      wss://*.stepzen.net
      https://api.sendgrid.com
      https://*.sendgrid.net
      https://*.sendgrid.com
      https://*.googleapis.com
      https://*.google.com
      https://*.stripe.com
      https://*.auth0.com
      https://*.auth0.com
      https://*.cloudflare.com
      https://*.cloudflare.com
      https://*.algolia.net
      https://*.algolianet.com;
    frame-ancestors 'none';
    form-action 'self';
    base-uri 'self';
    object-src 'none';
  `.replace(/\s+/g, ' ').trim(),
  
  // Enable HSTS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Feature policy
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  
  // Prevent browsers from trying to guess the content type
  'X-Download-Options': 'noopen',
  
  // Prevent IE from executing downloads in the context of your site
  'X-Permitted-Cross-Domain-Policies': 'none',
};

// Rate limiting configuration
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100;
const API_MAX_REQUESTS = 50; // Lower limit for API routes

function checkRateLimit(ip: string, isApiRoute: boolean): boolean {
  const now = Date.now();
  const maxRequests = isApiRoute ? API_MAX_REQUESTS : MAX_REQUESTS;
  const userData = rateLimitStore.get(ip);

  if (!userData || now > userData.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userData.count >= maxRequests) {
    return false;
  }

  userData.count++;
  return true;
}

export async function middleware(request: NextRequest) {
  // Skip rate limiting for static files and images
  const isStaticFile = request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|ico|svg|css|js)$/);
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  
  if (!isStaticFile) {
    // Apply rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip, isApiRoute)) {
      return new NextResponse('Too Many Requests', { 
        status: 429,
        headers: {
          'Retry-After': '900', // 15 minutes in seconds
        }
      });
    }
  }

  // Handle internationalization
  const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale,
  });

  const response = await intlMiddleware(request);

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Check for dashboard routes
  const isDashboard = request.nextUrl.pathname.includes("/dashboard");
  
  if (isDashboard) {
    const token = await getToken({ req: request });
    
    if (!token) {
      // Extract locale from the current URL
      const locale = request.nextUrl.pathname.split('/')[1];
      const isLocaleValid = locales.includes(locale);
      const redirectLocale = isLocaleValid ? locale : defaultLocale;
      
      return NextResponse.redirect(new URL(`/${redirectLocale}/login`, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/(en|th)/:path*",
    "/((?!_next|_vercel|.*\\..*).*)",
    "/dashboard/:path*",
    "/:locale/dashboard/:path*"
  ],
};