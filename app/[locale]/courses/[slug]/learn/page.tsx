import Link from "next/link";
import { ArrowLeft, LockKeyhole, Mail } from "lucide-react";
import { notFound } from "next/navigation";
import { CourseLearner } from "@/components/course-learner";
import { Nav } from "@/components/nav";
import { loadCompletedLessonIds, loadCourseForLearning } from "@/lib/cms-store";
import type { Locale } from "@/lib/i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function CourseLearnPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const isThai = locale === "th";
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  const course = await loadCourseForLearning(supabase, slug);
  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-dvh bg-white text-neutral-900">
      <div className="bg-neutral-950">
        <Nav locale={locale} />
      </div>

      <div className="mx-auto max-w-[760px] px-5 py-12 sm:px-6 lg:py-16">
        <Link
          href={`/${locale}/courses/${slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-600 transition-colors hover:border-neutral-300 hover:text-neutral-900"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {isThai ? "กลับหน้าคอร์ส" : "Back to course"}
        </Link>

        <p className="mt-10 text-sm font-bold uppercase tracking-[0.12em] text-red-600">{course.level[locale]}</p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-neutral-950">
          {course.title[locale]}
        </h1>
        <p className="mt-4 text-lg font-medium leading-8 text-neutral-500">{course.description[locale]}</p>

        <div className="mt-10">
          {user ? (
            <CourseLearner
              course={course}
              locale={locale}
              initialCompleted={await loadCompletedLessonIds(supabase, user.id)}
            />
          ) : (
            <div className="max-w-md rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-red-600">
                <LockKeyhole size={16} aria-hidden="true" />
                {isThai ? "ต้องเข้าสู่ระบบ" : "Sign in required"}
              </p>
              <p className="mt-3 text-sm font-semibold leading-7 text-neutral-600">
                {isThai
                  ? "เข้าสู่ระบบด้วย Google เพื่อเริ่มเรียนและบันทึกความคืบหน้าของคุณ"
                  : "Sign in with Google to start learning and save your progress."}
              </p>
              <a
                href={`/auth/signin?next=${encodeURIComponent(`/${locale}/courses/${slug}/learn`)}`}
                className="mt-5 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-neutral-950 px-5 text-sm font-bold text-white transition-colors hover:bg-neutral-800"
              >
                <Mail size={18} aria-hidden="true" />
                {isThai ? "เข้าสู่ระบบด้วย Google" : "Continue with Google"}
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
