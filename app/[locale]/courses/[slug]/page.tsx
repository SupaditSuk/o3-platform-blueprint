import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2, Clock3, LockKeyhole, PlayCircle } from "lucide-react";
import { SimplePage } from "@/components/simple-page";
import { loadPublishedCourse } from "@/lib/cms-store";
import type { Locale } from "@/lib/i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const course = await loadPublishedCourse(await createSupabaseServerClient(), slug);

  if (!course) {
    notFound();
  }

  const isThai = locale === "th";

  return (
    <SimplePage
      locale={locale}
      eyebrow={isThai ? "รายละเอียดคอร์ส" : "Course detail"}
      title={course.title[locale]}
      body={course.description[locale]}
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-bold text-white/62">
              {course.level[locale]}
            </span>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-100">
              {isThai ? "เปิดเรียนแล้ว" : "Lessons available"}
            </span>
          </div>

          <h2 className="mt-8 text-3xl font-semibold tracking-[-0.04em]">
            {isThai ? "โครงสร้างบทเรียน" : "Lesson structure"}
          </h2>
          <div className="mt-6 grid gap-3">
            {course.lessons[locale].map((lesson, index) => (
              <div key={lesson} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/24 p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-sm font-bold text-neutral-950">
                  {index + 1}
                </span>
                <div>
                  <p className="text-base font-bold leading-7 text-white">{lesson}</p>
                  <p className="mt-1 flex items-center gap-2 text-xs font-semibold text-white/42">
                    <PlayCircle size={14} aria-hidden="true" />
                    {isThai ? "บทเรียนออนไลน์" : "Online lesson"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm font-bold text-white/42">{isThai ? "สถานะ" : "Status"}</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.05em]">
            {isThai ? "เริ่มเรียนได้เลย" : "Start learning now"}
          </p>
          <Link
            href={`/${locale}/courses/${slug}/learn`}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-bold text-white transition-colors hover:bg-coral"
          >
            <PlayCircle size={18} aria-hidden="true" />
            {isThai ? "เริ่มเรียน" : "Start learning"}
          </Link>
          <div className="mt-6 grid gap-3">
            <div className="flex items-start gap-3 border-t border-white/10 pt-3">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-red-400" aria-hidden="true" />
              <p className="text-sm font-semibold leading-6 text-white/70">
                {isThai ? "สอบถามรอบเปิดเรียนและเงื่อนไขการเข้าเรียนได้" : "Ask about the next cohort and access details"}
              </p>
            </div>
            <div className="flex items-start gap-3 border-t border-white/10 pt-3">
              <Clock3 size={18} className="mt-0.5 shrink-0 text-red-400" aria-hidden="true" />
              <p className="text-sm font-semibold leading-6 text-white/70">
                {isThai ? "ต่อยอดไปยังพื้นที่ทดลองเรียนและบทเรียนออนไลน์" : "Connects to the Learning Lab and online lessons"}
              </p>
            </div>
            <div className="flex items-start gap-3 border-t border-white/10 pt-3">
              <LockKeyhole size={18} className="mt-0.5 shrink-0 text-red-400" aria-hidden="true" />
              <p className="text-sm font-semibold leading-6 text-white/70">
                {isThai ? "จัดการสิทธิ์เข้าเรียนตามรายคอร์ส" : "Course access is managed per learner"}
              </p>
            </div>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-bold text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            {isThai ? "คุยเรื่องคอร์สนี้" : "Discuss this course"}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </SimplePage>
  );
}
