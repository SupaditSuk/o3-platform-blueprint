import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { CSSProperties } from "react";
import { SimplePage } from "@/components/simple-page";
import { loadPublishedCourses } from "@/lib/cms-store";
import type { Locale } from "@/lib/i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export const dynamic = "force-dynamic";

export default async function CoursesPage({ params }: PageProps) {
  const { locale } = await params;
  const courses = await loadPublishedCourses(await createSupabaseServerClient());

  return (
    <SimplePage
      locale={locale}
      eyebrow={locale === "th" ? "คอร์ส" : "Courses"}
      title={locale === "th" ? "คอร์สออนไลน์ O³ ZONE" : "O³ ZONE Online Courses"}
      body={
        locale === "th"
          ? "เรียน People Analytics, HR Analytics และ AI for HR ผ่านกรอบ Observe, Optimize, Outcome เพื่อเปลี่ยนข้อมูลคนให้เป็นอินไซต์ที่ใช้ตัดสินใจได้จริง"
          : "Learn People Analytics, HR Analytics, and AI for HR through the Observe, Optimize, Outcome framework so workforce data becomes useful decision insight."
      }
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {courses.map((course, index) => (
          <Link
            key={course.id}
            href={`/${locale}/courses/${course.slug}`}
            className="motion-card motion-reveal group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-red-400/30 hover:bg-white/[0.08]"
            style={{ "--motion-delay": index * 90 } as CSSProperties}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-coral">{course.level[locale]}</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em]">
                  {course.title[locale]}
                </h2>
              </div>
              <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-bold text-amber-100">
                {locale === "th" ? "กำลังเตรียมเปิด" : "Opening soon"}
              </span>
            </div>
            <p className="mt-5 text-sm font-medium leading-7 text-white/64">{course.description[locale]}</p>
            <p className="mt-6 text-sm font-bold text-white/52">
              {locale === "th" ? "รายละเอียดรอบเรียนและเงื่อนไขจะแจ้งเมื่อเปิดรับสมัคร" : "Cohort and access details will be shared when enrollment opens."}
            </p>
            <div className="mt-6 grid gap-3">
              {course.lessons[locale].map((lesson) => (
                <div key={lesson} className="flex items-start gap-3 border-t border-white/10 pt-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-red-400" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-white/76">{lesson}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm font-bold text-white transition-colors group-hover:text-coral">
              {locale === "th" ? "ดูรายละเอียดคอร์ส" : "View course details"}
            </p>
          </Link>
        ))}
      </div>
      <Link
        href={`/${locale}/contact`}
        className="motion-reveal mt-8 inline-flex min-h-12 items-center rounded-full bg-brand px-5 text-sm font-bold text-white transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-coral active:translate-y-0"
        style={{ "--motion-delay": 160 } as CSSProperties}
      >
        {locale === "th" ? "คุยเรื่องคอร์ส" : "Discuss courses"}
      </Link>
    </SimplePage>
  );
}
