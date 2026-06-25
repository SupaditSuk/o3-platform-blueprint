import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ClipboardCheck, GraduationCap, LockKeyhole, LogOut, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { SimplePage } from "@/components/simple-page";
import { loadCompletedLessonIds, loadCoursesWithLessonIds, loadMyAssessmentSubmissions, loadMyInterestSignups } from "@/lib/cms-store";
import { getAdminEmails, getSupabaseConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "บัญชีของฉัน | O3 Zone",
  description: "พื้นที่สมาชิก O3 Zone — ผล assessment เรื่องที่สนใจ และคอร์สเรียน"
};

type PageProps = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ error?: string }>;
};

const interestLabels: Record<string, { th: string; en: string }> = {
  hr_health_check: { th: "HR Health Check", en: "HR Health Check" },
  workforce_productivity: { th: "Workforce Productivity Check", en: "Workforce Productivity Check" },
  ai_readiness_hr: { th: "AI Readiness for HR", en: "AI Readiness for HR" },
  workforce_intelligence_sprint: { th: "Workforce Intelligence Sprint", en: "Workforce Intelligence Sprint" },
  intelligence_dashboard_starter: { th: "Intelligence Dashboard Starter", en: "Intelligence Dashboard Starter" },
  hr_os_lite: { th: "HR OS Lite", en: "HR OS Lite" },
  academy_workshop: { th: "Academy / Workshop", en: "Academy / Workshop" },
  advisory: { th: "Advisory", en: "Advisory" },
  online_courses: { th: "คอร์สออนไลน์", en: "Online courses" }
};

const assessmentLabels: Record<string, { th: string; en: string }> = {
  hr_health_check: { th: "HR Health Check", en: "HR Health Check" },
  workforce_productivity: { th: "Workforce Productivity Check", en: "Workforce Productivity Check" },
  ai_readiness_hr: { th: "AI Readiness for HR", en: "AI Readiness for HR" }
};

function labelFor(map: Record<string, { th: string; en: string }>, key: string, locale: Locale) {
  return map[key]?.[locale] ?? key.replace(/_/g, " ");
}

function formatDate(iso: string, locale: Locale) {
  try {
    return new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

const cardClass = "rounded-2xl border border-white/10 bg-white/[0.04] p-6";

export default async function DashboardPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { error } = await searchParams;
  const isThai = locale === "th";
  const config = getSupabaseConfig();
  const supabase = config.isConfigured ? await createSupabaseServerClient() : null;
  const {
    data: { user }
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  // ---- Logged-out state: Google sign-in CTA ----
  if (!user) {
    return (
      <SimplePage
        locale={locale}
        eyebrow={isThai ? "พื้นที่สมาชิก" : "Member area"}
        title={isThai ? "เข้าสู่ระบบเพื่อดูบัญชีของคุณ" : "Sign in to view your account"}
        body={
          isThai
            ? "ดูผล assessment ของคุณ เรื่องที่คุณสนใจ และคอร์สเรียนของ O³ ZONE — เข้าสู่ระบบด้วย Google"
            : "See your assessment results, the topics you're interested in, and O³ ZONE courses — sign in with Google."
        }
      >
        <div className={`${cardClass} max-w-md`}>
          {!config.isConfigured ? (
            <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
              <p className="text-sm font-bold text-amber-100">{isThai ? "ต้องตั้งค่า Supabase ก่อน" : "Supabase not configured"}</p>
            </div>
          ) : (
            <>
              {error === "google" ? (
                <p className="mb-5 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm font-semibold text-red-100">
                  {isThai ? "เข้าสู่ระบบไม่สำเร็จ ลองอีกครั้ง" : "Sign-in failed, please try again."}
                </p>
              ) : null}
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-red-300">
                <LockKeyhole size={16} aria-hidden="true" />
                {isThai ? "เข้าสู่ระบบ" : "Sign in"}
              </p>
              <a
                href={`/auth/signin?next=${encodeURIComponent(`/${locale}/dashboard`)}`}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-white px-5 text-sm font-bold text-neutral-950 transition-colors hover:bg-red-50"
              >
                <Mail size={18} aria-hidden="true" />
                {isThai ? "เข้าสู่ระบบด้วย Google" : "Continue with Google"}
              </a>
              <p className="mt-5 text-xs font-semibold leading-6 text-white/50">
                {isThai
                  ? "ใช้บัญชี Google ของคุณ — ไม่ต้องตั้งรหัสผ่าน"
                  : "Use your Google account — no password needed."}
              </p>
            </>
          )}
        </div>
      </SimplePage>
    );
  }

  // ---- Logged-in state ----
  const adminEmails = getAdminEmails();
  const email = user.email?.toLowerCase();
  let isAdmin = false;

  if (supabase && email && adminEmails.includes(email)) {
    const { data: profile } = await supabase.from("admin_profiles").select("role").eq("id", user.id).maybeSingle();
    isAdmin = Boolean(profile && ["admin", "super_admin"].includes(profile.role as string));
  }

  const [assessments, interests, courses, completedLessonIds] = await Promise.all([
    loadMyAssessmentSubmissions(supabase, user.id),
    loadMyInterestSignups(supabase, user.id),
    loadCoursesWithLessonIds(supabase),
    loadCompletedLessonIds(supabase, user.id)
  ]);
  const completedSet = new Set(completedLessonIds);

  const meta = user.user_metadata ?? {};
  const displayName =
    (typeof meta.full_name === "string" && meta.full_name) ||
    (typeof meta.name === "string" && meta.name) ||
    user.email ||
    (isThai ? "สมาชิก" : "Member");
  const avatarUrl =
    (typeof meta.avatar_url === "string" && meta.avatar_url) ||
    (typeof meta.picture === "string" && meta.picture) ||
    "";

  return (
    <SimplePage
      locale={locale}
      eyebrow={isThai ? "พื้นที่สมาชิก" : "Member area"}
      title={isThai ? `สวัสดี ${displayName}` : `Hi ${displayName}`}
      body={
        isThai
          ? "ภาพรวมบัญชีของคุณ — ผล assessment เรื่องที่สนใจ และคอร์สเรียนของ O³ ZONE"
          : "Your account overview — assessment results, interests, and O³ ZONE courses."
      }
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Profile */}
        <section className={cardClass}>
          <div className="flex items-center gap-4">
            <span className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border border-white/10 bg-white/10 text-lg font-bold text-white">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt={displayName} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                displayName.slice(0, 1).toUpperCase()
              )}
            </span>
            <div className="min-w-0">
              <p className="truncate text-lg font-bold text-white">{displayName}</p>
              <p className="truncate text-sm font-semibold text-white/56">{user.email}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {isAdmin ? (
              <Link
                href="/admin"
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-brand px-4 text-sm font-bold text-white transition-colors hover:bg-coral"
              >
                <ShieldCheck size={16} aria-hidden="true" />
                {isThai ? "เข้าหลังบ้าน Admin" : "Open admin"}
              </Link>
            ) : null}
            <a
              href={`/auth/logout?next=/${locale}`}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-white/72 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <LogOut size={16} aria-hidden="true" />
              {isThai ? "ออกจากระบบ" : "Sign out"}
            </a>
          </div>
        </section>

        {/* Assessment results */}
        <section className={cardClass}>
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-coral">
            <ClipboardCheck size={16} aria-hidden="true" />
            {isThai ? "ผล Assessment ของฉัน" : "My assessment results"}
          </h2>
          {assessments.length === 0 ? (
            <div className="mt-4">
              <p className="text-sm font-semibold leading-7 text-white/56">
                {isThai ? "ยังไม่มีผล assessment — ลองทำ HR Health Check ดูครับ" : "No assessments yet — try the HR Health Check."}
              </p>
              <Link
                href={`/${locale}/assessment/hr-health-check`}
                className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-neutral-950 transition-colors hover:bg-red-50"
              >
                {isThai ? "ทำ HR Health Check" : "Take HR Health Check"}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <ul className="mt-4 grid gap-3">
              {assessments.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/24 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">{labelFor(assessmentLabels, item.assessmentType, locale)}</p>
                    <p className="mt-1 text-xs font-semibold text-white/50">
                      {item.maturityLevel} · {formatDate(item.createdAt, locale)}
                    </p>
                  </div>
                  <span className="shrink-0 text-2xl font-bold tracking-[-0.03em] text-white">{item.overallScore}%</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Interests */}
        <section className={cardClass}>
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-coral">
            <Sparkles size={16} aria-hidden="true" />
            {isThai ? "เรื่องที่ฉันสนใจ" : "My interests"}
          </h2>
          {interests.length === 0 ? (
            <div className="mt-4">
              <p className="text-sm font-semibold leading-7 text-white/56">
                {isThai ? "ยังไม่ได้แจ้งความสนใจ — บอกเราได้ในหน้าติดต่อ" : "No interests yet — tell us on the contact page."}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-white/72 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                {isThai ? "ไปหน้าติดต่อ" : "Go to contact"}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <ul className="mt-4 grid gap-3">
              {interests.map((item) => (
                <li key={item.id} className="rounded-xl border border-white/10 bg-black/24 p-4">
                  <p className="text-sm font-bold text-white">{labelFor(interestLabels, item.interest, locale)}</p>
                  <p className="mt-1 text-xs font-semibold text-white/50">
                    {item.company_name ? `${item.company_name} · ` : ""}
                    {formatDate(item.created_at, locale)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Courses */}
        <section className={cardClass}>
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-coral">
            <GraduationCap size={16} aria-hidden="true" />
            {isThai ? "คอร์สเรียน" : "Courses"}
          </h2>
          {courses.length === 0 ? (
            <p className="mt-4 text-sm font-semibold leading-7 text-white/56">
              {isThai ? "ยังไม่มีคอร์สที่เผยแพร่" : "No published courses yet."}
            </p>
          ) : (
            <ul className="mt-4 grid gap-3">
              {courses.map((course) => {
                const total = course.lessonIds.length;
                const done = course.lessonIds.filter((id) => completedSet.has(id)).length;
                const pct = total ? Math.round((done / total) * 100) : 0;
                return (
                  <li key={course.slug} className="rounded-xl border border-white/10 bg-black/24 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="min-w-0 truncate text-sm font-bold text-white">{course.title[locale]}</p>
                      <span className="shrink-0 text-xs font-bold text-white/70">{pct}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-coral transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-white/50">
                        {done}/{total} {isThai ? "บทเรียน" : "lessons"}
                      </span>
                      <Link
                        href={`/${locale}/courses/${course.slug}/learn`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-coral transition-colors hover:text-white"
                      >
                        {done === 0
                          ? isThai
                            ? "เริ่มเรียน"
                            : "Start"
                          : done === total
                            ? isThai
                              ? "ทบทวน"
                              : "Review"
                            : isThai
                              ? "เรียนต่อ"
                              : "Continue"}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <p className="mt-4 text-xs font-semibold leading-6 text-white/40">
            {isThai ? "ระบบลงทะเบียน/จ่ายเงินจะมาในเฟสถัดไป" : "Enrollment and payments are coming next."}
          </p>
        </section>
      </div>
    </SimplePage>
  );
}
