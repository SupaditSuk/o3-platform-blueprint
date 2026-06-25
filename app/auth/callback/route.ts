import { NextResponse, type NextRequest } from "next/server";
import { sanitizeNextPath } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = sanitizeNextPath(requestUrl.searchParams.get("next"));
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createSupabaseServerClient();
    await supabase?.auth.exchangeCodeForSession(code);

    if (supabase) {
      const nextUrl = new URL(next, origin);

      if (nextUrl.searchParams.get("joined") === "google") {
        const {
          data: { user }
        } = await supabase.auth.getUser();

        if (user?.email) {
          const email = user.email.toLowerCase();

          await supabase.from("interest_signups").insert({
            user_id: user.id,
            email,
            full_name:
              (typeof user.user_metadata.full_name === "string" && user.user_metadata.full_name) ||
              (typeof user.user_metadata.name === "string" && user.user_metadata.name) ||
              null,
            interest: nextUrl.searchParams.get("interest") ?? "hr_health_check",
            locale: nextUrl.pathname.startsWith("/en") ? "en" : "th",
            source: "google",
            consent: true
          });
        }
      }
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
