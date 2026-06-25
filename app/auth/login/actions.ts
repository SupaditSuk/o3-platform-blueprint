"use server";

import { redirect } from "next/navigation";
import { sanitizeNextPath } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signInWithGoogle(formData: FormData) {
  const next = sanitizeNextPath(formData.get("next") as string | null);
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect(`/auth/login?setup=supabase&next=${encodeURIComponent(next)}`);
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3030"}/auth/callback?next=${encodeURIComponent(next)}`
    }
  });

  if (error || !data.url) {
    redirect(`/auth/login?error=google&next=${encodeURIComponent(next)}`);
  }

  redirect(data.url);
}
