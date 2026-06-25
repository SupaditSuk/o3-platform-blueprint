import type { Metadata } from "next";
import { getAssessmentBySlug } from "@/content/assessments";
import type { Locale } from "@/lib/i18n";
import { AssessmentPage } from "../assessment-page";

type PageProps = {
  params: Promise<{ locale: Locale }>;
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
  const { locale } = await params;

  return {
    title: locale === "th" ? "HR Health Check | O³ ZONE" : "HR Health Check | O³ ZONE",
    description:
      locale === "th"
        ? "ประเมินสุขภาพระบบ HR และความพร้อมในการสร้าง Business Impact"
        : "Assess HR system health and readiness to create business impact."
  };
}

export default async function HrHealthCheckPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const query = await searchParams;
  const assessment = getAssessmentBySlug("hr-health-check");

  if (!assessment) {
    throw new Error("HR Health Check assessment is missing");
  }

  return <AssessmentPage locale={locale} assessment={assessment} query={query} />;
}
