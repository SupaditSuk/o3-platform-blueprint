import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/lib/i18n";
import { getSupabaseConfig } from "@/lib/supabase/config";

// Paths that are never locale-prefixed (so they skip the locale redirect).
const localeSkipPrefixes = ["/_next", "/api", "/admin", "/auth", "/images"];
const systemFiles = new Set(["/favicon.ico", "/robots.txt", "/sitemap.xml"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) Locale redirect for non-locale, non-system first segments.
  const skipLocale =
    pathname === "/" ||
    systemFiles.has(pathname) ||
    localeSkipPrefixes.some((prefix) => pathname.startsWith(prefix)) ||
    pathname.includes(".");

  if (!skipLocale) {
    const firstSegment = pathname.split("/").filter(Boolean)[0];
    if (firstSegment && !isLocale(firstSegment)) {
      return NextResponse.redirect(new URL("/th", request.url));
    }
  }

  // 2) Refresh the Supabase session so it survives past the access-token TTL
  //    (uses the refresh token + rewrites cookies). Skip static assets / _next / api.
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const { url, anonKey, isConfigured } = getSupabaseConfig();
  if (!isConfigured || !url || !anonKey) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      }
    }
  });

  // Touch the session — this refreshes it and writes updated cookies onto `response`.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"]
};
