import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // All locales that you support
  locales: ["en", "th"],

  // The default locale if there's no locale in the path
  defaultLocale: "en"
});

export const config = {
  // You can tailor these matchers to your routes.
  matcher: [
    // 1) Match the homepage and redirect it (or rewrite) to /en or /th
    "/",

    // 2) Match sub-paths that already include /en or /th
    "/(en|th)/:path*",

    // 3) Enable redirects that add missing locales 
    //    (e.g. /about -> /en/about if "en" is default)
    "/((?!_next|_vercel|.*\\..*).*)"
  ]
};