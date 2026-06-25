import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Database, Layers3 } from "lucide-react";
import { Nav } from "@/components/nav";
import { HrDashboard } from "@/components/dashboard/hr-dashboard";
import { SectionBadge } from "@/components/section-badge";
import { TextRollButton } from "@/components/text-roll-button";
import { getServiceBySlug } from "@/content/services";
import type { Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === "th" ? "Dashboard Demo | O³ ZONE" : "Dashboard Demo | O³ ZONE",
    description:
      locale === "th"
        ? "ทดลองดู Dashboard ตัวอย่างสำหรับ Workforce Intelligence และ HR Analytics"
        : "Explore a sample Workforce Intelligence and HR Analytics dashboard."
  };
}

export default async function DashboardDemoPage({ params }: PageProps) {
  const { locale } = await params;
  const isThai = locale === "th";
  const service = getServiceBySlug("intelligence-dashboard-starter");

  return (
    <main className="min-h-dvh bg-bg text-white">
      <Nav locale={locale} />
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <Link
          href={`/${locale}/services/intelligence-dashboard-starter`}
          className="mb-10 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/72 transition-colors hover:text-white"
        >
          {isThai ? "กลับไปบริการ Dashboard" : "Back to Dashboard service"}
        </Link>

        <SectionBadge number="Free" label={isThai ? "Template-First" : "Template-First"} light />
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_0.6fr] lg:items-end">
          <h1 className="text-balance text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
            {isThai ? "Template มาตรฐาน แล้วได้ HR Dashboard" : "Standard template, instant HR dashboard"}
          </h1>
          <p className="text-pretty text-base font-medium leading-[1.75] text-white/68">
            {isThai
              ? "ดาวน์โหลด Template มาตรฐาน → กรอกข้อมูล → อัปโหลด → ระบบตรวจข้อมูล วัด Data Readiness และสร้าง Dashboard ให้ — ฟรี ประมวลผลในเครื่องคุณ ไม่ขึ้น server"
              : "Download a standard template → fill it → upload → the system validates, scores data readiness, and builds your dashboard — free, processed in your browser."}
          </p>
        </div>

        <div className="mt-8">
          <Link
            href={`/${locale}/workforce`}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-neutral-950 transition-colors hover:bg-red-50"
          >
            {isThai ? "เปิด Workforce Intelligence เต็มระบบ →" : "Open the full Workforce Intelligence app →"}
          </Link>
        </div>

        <div className="mt-12">
          <HrDashboard locale={locale} />
        </div>

        {service?.dataInputs && service.starterScope ? (
          <div className="mt-12 grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
              <Database className="text-coral" size={24} aria-hidden="true" />
              <h2 className="mt-6 text-2xl font-semibold tracking-[-0.035em]">
                {isThai ? "ถ้าจะทำกับข้อมูลจริง ต้องมีอะไรบ้าง" : "What you need to build this with real data"}
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-white/54">
                {isThai
                  ? "เริ่มจากไฟล์ที่มีอยู่ได้ ไม่ต้องรอระบบใหญ่ จุดสำคัญคือเลือก business question ให้ชัดก่อนค่อยออกแบบ metric"
                  : "You can start from existing files. The key is to choose the business question first, then design the right metrics."}
              </p>
              <div className="mt-5 grid gap-3">
                {service.dataInputs[locale].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-black/24 p-4">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-coral" size={18} aria-hidden="true" />
                    <p className="text-sm font-bold leading-6 text-white/72">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-red-300/20 bg-red-500/[0.08] p-5">
              <Layers3 className="text-red-200" size={24} aria-hidden="true" />
              <h2 className="mt-6 text-2xl font-semibold tracking-[-0.035em]">
                {isThai ? "Dashboard Starter จะช่วยจัดอะไรให้" : "What Dashboard Starter helps structure"}
              </h2>
              <div className="mt-5 grid gap-3">
                {service.starterScope[locale].map((item, index) => (
                  <div key={item} className="grid grid-cols-[42px_1fr] gap-3 rounded-2xl bg-black/20 p-4">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-xs font-bold text-neutral-950">
                      {index + 1}
                    </span>
                    <p className="text-sm font-bold leading-6 text-white/76">{item}</p>
                  </div>
                ))}
              </div>
              <TextRollButton href={`/${locale}/contact?interest=intelligence_dashboard_starter`} className="mt-6 w-fit">
                {isThai ? "เริ่มจากข้อมูลขององค์กรคุณ" : "Start with your organization data"}
              </TextRollButton>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
