import Link from "next/link";
import { BookOpenCheck, CheckCircle2, LockKeyhole, PlayCircle } from "lucide-react";
import type { CSSProperties } from "react";
import { PeopleAnalyticsLab } from "@/components/people-analytics-lab";
import { SimplePage } from "@/components/simple-page";
import { loadPublishedCourses } from "@/lib/cms-store";
import type { Locale } from "@/lib/i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export const dynamic = "force-dynamic";

export default async function LearnPage({ params }: PageProps) {
  const { locale } = await params;
  const courses = await loadPublishedCourses(await createSupabaseServerClient());
  const isThai = locale === "th";

  return (
    <SimplePage
      locale={locale}
      eyebrow={isThai ? "ทดลองเรียน" : "Learning Lab"}
      title={isThai ? "ลองเรียนและทดลองเครื่องมือก่อนลงคอร์ส" : "Try lessons and tools before joining a course"}
      body={
        isThai
          ? "พื้นที่สำหรับลองบทเรียน ตัวอย่าง workflow และ interactive demo ด้าน People Analytics เพื่อดูว่าวิธีคิดของ O³ ZONE ใช้กับงานจริงอย่างไร"
          : "A place to try sample lessons, workflows, and interactive demos so you can see how O³ ZONE thinking applies to real work."
      }
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <section className="grid gap-4">
          {courses.map((course, index) => (
            <article
              key={course.id}
              className="motion-card motion-reveal rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:border-red-400/30 hover:bg-white/[0.08]"
              style={{ "--motion-delay": index * 90 } as CSSProperties}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-coral">{course.level[locale]}</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{course.title[locale]}</h2>
                  <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-white/62">
                    {course.description[locale]}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-bold text-white/50">
                  {isThai ? "ตัวอย่างคอร์ส" : "Course sample"}
                </span>
              </div>
              <div className="mt-5 grid gap-2">
                {course.lessons[locale].slice(0, 3).map((lesson) => (
                  <div key={lesson} className="flex items-center gap-3 border-t border-white/10 pt-3">
                    <PlayCircle size={17} className="text-red-400" aria-hidden="true" />
                    <p className="text-sm font-semibold text-white/70">{lesson}</p>
                  </div>
                ))}
              </div>
              <Link
                href={`/${locale}/courses/${course.slug}`}
                className="mt-5 inline-flex min-h-10 items-center rounded-full border border-white/10 px-4 text-xs font-bold text-white/62 transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-white/[0.06] hover:text-white"
              >
                {isThai ? "ดูรายละเอียดคอร์ส" : "View course details"}
              </Link>
            </article>
          ))}
        </section>

        <aside className="motion-reveal rounded-2xl border border-red-400/20 bg-red-500/[0.08] p-5" data-motion="right">
          <BookOpenCheck className="text-red-300" size={24} aria-hidden="true" />
          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
            {isThai ? "ต่างจากหน้าคอร์สอย่างไร" : "How this differs from Courses"}
          </h2>
          <div className="mt-5 grid gap-3">
            {(isThai
              ? ["คอร์สคือหน้าดูหลักสูตร ราคา และการสมัคร", "ทดลองเรียนคือพื้นที่ลองบทเรียนและเครื่องมือ", "เหมาะสำหรับดูแนวทางก่อนตัดสินใจเรียนจริง"]
              : ["Courses show programs, pricing, and enrollment intent", "Learning Lab lets you try lessons and tools", "Use this space to preview the learning style before joining"]
            ).map((item) => (
              <div key={item} className="flex items-start gap-3 border-t border-white/10 pt-3">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-red-300" aria-hidden="true" />
                <p className="text-sm font-semibold leading-6 text-white/70">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-black/24 p-4">
            <LockKeyhole size={18} className="mt-0.5 shrink-0 text-white/60" aria-hidden="true" />
            <p className="text-sm font-semibold leading-6 text-white/58">
              {isThai
                ? "ในอนาคตส่วนนี้สามารถกลายเป็นพื้นที่เรียนของสมาชิกหลัง login ได้"
                : "Later, this can become a member learning area after login."}
            </p>
          </div>
        </aside>
      </div>
      <div className="mt-8">
        <PeopleAnalyticsLab locale={locale} />
      </div>
    </SimplePage>
  );
}
