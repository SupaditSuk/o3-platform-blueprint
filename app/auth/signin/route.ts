import { NextResponse, type NextRequest } from "next/server";
import { sanitizeNextPath } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Member sign-in entry point. A plain GET so the browser navigates here
 * directly (no client-side JS), then we redirect to Google's OAuth page.
 * This avoids the fragile "server action redirects to a cross-origin URL
 * when invoked via client JS" path, which silently no-ops in the browser.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const next = sanitizeNextPath(url.searchParams.get("next"), "/");
  const supabase = await createSupabaseServerClient();

  const withParam = (path: string, key: string, value: string) =>
    `${path}${path.includes("?") ? "&" : "?"}${key}=${value}`;

  if (!supabase) {
    return NextResponse.redirect(new URL(withParam(next, "error", "setup"), request.url));
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? url.origin;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`
    }
  });

  if (error || !data.url) {
    return NextResponse.redirect(new URL(withParam(next, "error", "google"), request.url));
  }

  return NextResponse.redirect(data.url);
}
