import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

const locales = ["en", "th"];
const defaultLocale = "en";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

export async function middleware(request: NextRequest) {
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
  
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(en|th)/:path*",
    "/((?!_next|_vercel|.*\\..*).*)",
    "/dashboard/:path*",
    "/:locale/dashboard/:path*",
  ],
};