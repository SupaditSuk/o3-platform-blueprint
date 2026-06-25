"use server";

import { redirect } from "next/navigation";
import {
  getAssessmentByType,
  getAssessmentLevel
} from "@/content/assessments";
import type { Locale } from "@/lib/i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function cleanValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function getLocale(formData: FormData): Locale {
  return cleanValue(formData.get("locale")) === "en" ? "en" : "th";
}

function clampScore(value: string) {
  const score = Number.parseInt(value, 10);
  return Number.isFinite(score) && score >= 1 && score <= 5 ? score : 0;
}

function encodeScores(scores: Record<string, number>) {
  return Object.entries(scores)
    .map(([key, value]) => `${key}:${value}`)
    .join(",");
}

export async function submitAssessment(formData: FormData) {
  const locale = getLocale(formData);
  const assessmentType = cleanValue(formData.get("assessmentType")) || "hr_health_check";
  const assessment = getAssessmentByType(assessmentType);
  const slug = assessment?.slug ?? "hr-health-check";

  if (!assessment) {
    redirect(`/${locale}/assessment/hr-health-check?status=invalid`);
  }

  const website = cleanValue(formData.get("website"));
  const email = cleanValue(formData.get("email")).toLowerCase();
  const fullName = cleanValue(formData.get("fullName"));
  const companyName = cleanValue(formData.get("companyName"));
  const role = cleanValue(formData.get("role"));
  const companySize = cleanValue(formData.get("companySize"));
  const industry = cleanValue(formData.get("industry"));
  const mainChallenge = cleanValue(formData.get("mainChallenge"));
  const consent = formData.get("consent") === "on";

  if (website) {
    redirect(`/${locale}/assessment/${slug}`);
  }

  if (!email || !email.includes("@") || !companyName || !role || !companySize || !consent) {
    redirect(`/${locale}/assessment/${slug}?status=invalid`);
  }

  const answers = Object.fromEntries(
    assessment.questions.map((question) => [question.id, clampScore(cleanValue(formData.get(question.id)))])
  ) as Record<string, number>;

  const hasMissingAnswer = assessment.questions.some((question) => answers[question.id] === 0);

  if (hasMissingAnswer) {
    redirect(`/${locale}/assessment/${slug}?status=incomplete`);
  }

  const categoryScores = Object.fromEntries(
    assessment.categories.map((category) => {
      const categoryQuestions = assessment.questions.filter((question) => question.category === category.id);
      const total = categoryQuestions.reduce((sum, question) => sum + answers[question.id], 0);
      return [category.id, Math.round((total / (categoryQuestions.length * 5)) * 100)];
    })
  ) as Record<string, number>;

  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const overallScore = Math.round((totalScore / (assessment.questions.length * 5)) * 100);
  const maturityLevel = getAssessmentLevel(overallScore, locale).label;
  const weakestCategory = [...assessment.categories].sort((a, b) => categoryScores[a.id] - categoryScores[b.id])[0];
  const strongestCategory = [...assessment.categories].sort((a, b) => categoryScores[b.id] - categoryScores[a.id])[0];

  const supabase = await createSupabaseServerClient();
  let status = "setup";

  if (supabase) {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("assessment_submissions").insert({
      user_id: user?.id ?? null,
      assessment_type: assessment.type,
      locale,
      email,
      full_name: fullName || null,
      company_name: companyName,
      role,
      company_size: companySize,
      industry: industry || null,
      main_challenge: mainChallenge || null,
      overall_score: overallScore,
      maturity_level: maturityLevel,
      category_scores: categoryScores,
      answers,
      consent: true,
      source: "website"
    });

    status = error ? "error" : "saved";
  }

  const params = new URLSearchParams({
    status,
    score: String(overallScore),
    level: maturityLevel,
    strong: strongestCategory.id,
    weak: weakestCategory.id,
    scores: encodeScores(categoryScores)
  });

  redirect(`/${locale}/assessment/${slug}?${params.toString()}#result`);
}
