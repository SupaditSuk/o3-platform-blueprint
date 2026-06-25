"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/i18n";

const allowedInterests = new Set([
  "hr_health_check",
  "workforce_productivity",
  "ai_readiness_hr",
  "workforce_intelligence_sprint",
  "intelligence_dashboard_starter",
  "hr_os_lite",
  "academy_workshop",
  "advisory"
]);

function cleanValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

async function getOrigin() {
  const headerStore = await headers();
  const host = headerStore.get("host");
  const protocol = headerStore.get("x-forwarded-proto") ?? "http";

  return process.env.NEXT_PUBLIC_SITE_URL ?? (host ? `${protocol}://${host}` : "http://127.0.0.1:3030");
}

function getInterest(formData: FormData) {
  const interest = cleanValue(formData.get("interest"));
  return allowedInterests.has(interest) ? interest : "hr_health_check";
}

function getLocale(formData: FormData): Locale {
  return cleanValue(formData.get("locale")) === "en" ? "en" : "th";
}

export async function submitInterestSignup(formData: FormData) {
  const locale = getLocale(formData);
  const website = cleanValue(formData.get("website"));
  const email = cleanValue(formData.get("email")).toLowerCase();
  const fullName = cleanValue(formData.get("fullName"));
  const interest = getInterest(formData);
  const companyName = cleanValue(formData.get("companyName"));
  const role = cleanValue(formData.get("role"));
  const companySize = cleanValue(formData.get("companySize"));
  const businessQuestion = cleanValue(formData.get("businessQuestion"));
  const notes = cleanValue(formData.get("notes"));
  const availableDataSources = formData
    .getAll("availableDataSources")
    .map((value) => cleanValue(value))
    .filter(Boolean);
  const consent = formData.get("consent") === "on";

  if (website) {
    redirect(`/${locale}/contact?signup=success`);
  }

  if (!email || !email.includes("@") || !consent) {
    redirect(`/${locale}/contact?signup=invalid`);
  }

  if (interest === "intelligence_dashboard_starter" && (!companyName || !role || !businessQuestion)) {
    redirect(`/${locale}/contact?signup=dashboard-required&interest=${interest}`);
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect(`/${locale}/contact?signup=setup`);
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("interest_signups").insert({
    user_id: user?.id ?? null,
    email,
    full_name: fullName || null,
    interest,
    company_name: companyName || null,
    role: role || null,
    company_size: companySize || null,
    business_question: businessQuestion || null,
    available_data_sources: availableDataSources,
    notes: notes || null,
    locale,
    source: "direct",
    consent: true
  });

  if (error) {
    redirect(`/${locale}/contact?signup=${error.code === "23505" ? "exists" : "error"}`);
  }

  redirect(`/${locale}/contact?signup=success`);
}

export async function signUpInterestWithGoogle(formData: FormData) {
  const locale = getLocale(formData);
  const interest = getInterest(formData);
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect(`/${locale}/contact?signup=setup`);
  }

  const origin = await getOrigin();
  const next = `/${locale}/contact?joined=google&interest=${encodeURIComponent(interest)}`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`
    }
  });

  if (error || !data.url) {
    redirect(`/${locale}/contact?signup=google-error`);
  }

  redirect(data.url);
}
