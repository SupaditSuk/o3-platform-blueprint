import { NextResponse, type NextRequest } from "next/server";
import { sanitizeNextPath } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();

  const next = sanitizeNextPath(new URL(request.url).searchParams.get("next"), "/auth/login");

  return NextResponse.redirect(new URL(next, request.url));
}
