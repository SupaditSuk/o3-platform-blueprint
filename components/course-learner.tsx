"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { setLessonComplete } from "@/app/[locale]/courses/[slug]/learn/actions";
import { MarkdownContent } from "@/components/markdown-content";
import { VideoEmbed } from "@/components/video-embed";
import type { LearningCourse } from "@/lib/cms-store";
import type { Locale } from "@/lib/i18n";

type CourseLearnerProps = {
  course: LearningCourse;
  locale: Locale;
  initialCompleted: string[];
};

export function CourseLearner({ course, locale, initialCompleted }: CourseLearnerProps) {
  const isThai = locale === "th";
  const [completed, setCompleted] = useState<Set<string>>(() => new Set(initialCompleted));
  const [, startTransition] = useTransition();

  const total = course.lessons.length;
  const doneCount = course.lessons.filter((lesson) => completed.has(lesson.id)).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  const toggle = (lessonId: string) => {
    const willComplete = !completed.has(lessonId);
    setCompleted((prev) => {
      const next = new Set(prev);
      if (willComplete) next.add(lessonId);
      else next.delete(lessonId);
      return next;
    });
    startTransition(async () => {
      const result = await setLessonComplete(lessonId, willComplete);
      if (!result.ok) {
        // revert on failure
        setCompleted((prev) => {
          const next = new Set(prev);
          if (willComplete) next.delete(lessonId);
          else next.add(lessonId);
          return next;
        });
      }
    });
  };

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-5 mb-10 border-b border-neutral-200 bg-white/90 px-5 py-4 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex items-center justify-between text-sm font-bold text-neutral-700">
          <span>
            {doneCount}/{total} {isThai ? "บทเรียน" : "lessons"}
          </span>
          <span>{pct}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-200">
          <div className="h-full rounded-full bg-red-600 transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="grid gap-12">
        {course.lessons.map((lesson, index) => {
          const isDone = completed.has(lesson.id);
          return (
            <section key={lesson.id} className="scroll-mt-24">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-red-600">
                {isThai ? "บทที่" : "Lesson"} {index + 1}
              </p>
              <h2 className="mt-2 text-[clamp(1.6rem,3.5vw,2.2rem)] font-semibold tracking-[-0.02em] text-neutral-950">
                {lesson.title[locale]}
              </h2>

              {lesson.videoUrl ? (
                <div className="mt-5">
                  <VideoEmbed url={lesson.videoUrl} title={lesson.title[locale]} />
                </div>
              ) : null}

              <div className="mt-5">
                <MarkdownContent>{lesson.body[locale]}</MarkdownContent>
              </div>

              <button
                type="button"
                onClick={() => toggle(lesson.id)}
                className={`mt-6 inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold transition-colors ${
                  isDone
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "border border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:text-neutral-900"
                }`}
              >
                {isDone ? <CheckCircle2 size={18} aria-hidden="true" /> : <Circle size={18} aria-hidden="true" />}
                {isDone ? (isThai ? "เรียนจบแล้ว" : "Completed") : isThai ? "ทำเครื่องหมายว่าเรียนจบ" : "Mark complete"}
              </button>
            </section>
          );
        })}
      </div>

      {doneCount === total && total > 0 ? (
        <div className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <p className="text-lg font-bold text-emerald-800">{isThai ? "🎉 เรียนจบคอร์สนี้แล้ว!" : "🎉 Course complete!"}</p>
          <p className="mt-1 text-sm font-semibold text-emerald-700">
            {isThai ? "เยี่ยมมาก — ดูคอร์สอื่นต่อได้เลย" : "Great work — explore another course next."}
          </p>
        </div>
      ) : null}
    </div>
  );
}
