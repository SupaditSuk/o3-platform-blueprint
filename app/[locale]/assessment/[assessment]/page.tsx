import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAssessmentBySlug } from "@/content/assessments";
import type { Locale } from "@/lib/i18n";
import { AssessmentPage } from "../assessment-page";

type PageProps = {
  params: Promise<{ locale: Locale; assessment: string }>;
  searchParams: Promise<{
    status?: string;
    score?: string;
    level?: string;
    strong?: string;
    weak?: string;
    scores?: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, assessment: slug } = await params;
  const assessment = getAssessmentBySlug(slug);

  if (!assessment) {
    return {};
  }

  return {
    title: `${assessment.title[locale]} | O³ ZONE`,
    description: assessment.body[locale]
  };
}

export default async function DynamicAssessmentPage({ params, searchParams }: PageProps) {
  const { locale, assessment: slug } = await params;
  const query = await searchParams;
  const assessment = getAssessmentBySlug(slug);

  if (!assessment || assessment.slug === "hr-health-check") {
    notFound();
  }

  return <AssessmentPage locale={locale} assessment={assessment} query={query} />;
}
