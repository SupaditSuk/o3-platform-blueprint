import { ArrowRight, CheckCircle2, Mail, UserRound } from "lucide-react";
import { signUpInterestWithGoogle, submitInterestSignup } from "@/app/[locale]/contact/actions";
import { SimplePage } from "@/components/simple-page";
import { contactEmail } from "@/lib/contact";
import type { Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{
    signup?: string;
    joined?: string;
    interest?: string;
  }>;
};

const interestOptions = {
  th: [
    { value: "hr_health_check", label: "HR Health Check" },
    { value: "workforce_productivity", label: "Workforce Productivity Check" },
    { value: "ai_readiness_hr", label: "AI Readiness for HR" },
    { value: "workforce_intelligence_sprint", label: "Workforce Intelligence Sprint" },
    { value: "intelligence_dashboard_starter", label: "O³ Intelligence Dashboard Starter" },
    { value: "hr_os_lite", label: "HR Operating System Lite" },
    { value: "academy_workshop", label: "เวิร์กช็อป / Academy" },
    { value: "advisory", label: "Advisory รายเดือน" }
  ],
  en: [
    { value: "hr_health_check", label: "HR Health Check" },
    { value: "workforce_productivity", label: "Workforce Productivity Check" },
    { value: "ai_readiness_hr", label: "AI Readiness for HR" },
    { value: "workforce_intelligence_sprint", label: "Workforce Intelligence Sprint" },
    { value: "intelligence_dashboard_starter", label: "O³ Intelligence Dashboard Starter" },
    { value: "hr_os_lite", label: "HR Operating System Lite" },
    { value: "academy_workshop", label: "Workshop / Academy" },
    { value: "advisory", label: "Monthly advisory" }
  ]
} satisfies Record<Locale, Array<{ value: string; label: string }>>;

function getStatusMessage(locale: Locale, signup?: string, joined?: string) {
  if (joined === "google") {
    return locale === "th"
      ? { tone: "success", text: "สมัครด้วย Google สำเร็จแล้วครับ เดี๋ยวใช้รายชื่อนี้ติดตาม assessment และนัดคุยต่อได้เลย" }
      : { tone: "success", text: "Google signup is complete. This list can now support assessment follow-up." };
  }

  if (signup === "success") {
    return locale === "th"
      ? { tone: "success", text: "รับข้อมูลเรียบร้อยครับ เดี๋ยวใช้ช่องทางนี้สำหรับติดตาม assessment หรือโจทย์ที่เกี่ยวข้อง" }
      : { tone: "success", text: "Signup received. This channel can be used for assessment and related follow-up." };
  }

  if (signup === "exists") {
    return locale === "th"
      ? { tone: "success", text: "อีเมลนี้อยู่ในรายชื่อแล้วครับ ไม่ต้องสมัครซ้ำ" }
      : { tone: "success", text: "This email is already on the interest list." };
  }

  if (signup === "setup") {
    return locale === "th"
      ? { tone: "warning", text: "ยังไม่ได้ตั้งค่า Supabase ใน environment ตอน deploy จริงให้เพิ่มค่า Supabase ก่อนใช้ฟอร์มนี้" }
      : { tone: "warning", text: "Supabase is not configured yet. Add the Supabase environment variables before using this form in production." };
  }

  if (signup === "dashboard-required") {
    return locale === "th"
      ? { tone: "error", text: "สำหรับ Dashboard Starter กรุณากรอกบริษัท บทบาท และคำถามธุรกิจที่อยากให้ dashboard ช่วยตอบ" }
      : { tone: "error", text: "For Dashboard Starter, please add company, role, and the business question the dashboard should answer." };
  }

  if (signup) {
    return locale === "th"
      ? { tone: "error", text: "สมัครไม่สำเร็จ ลองอีกครั้ง หรือส่งอีเมลตรงได้ครับ" }
      : { tone: "error", text: "Signup did not complete. Try again or send a direct email." };
  }

  return null;
}

export default async function ContactPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const query = await searchParams;
  const status = getStatusMessage(locale, query.signup, query.joined);
  const options = interestOptions[locale];
  const defaultInterest = options.some((option) => option.value === query.interest) ? query.interest : "hr_health_check";
  const isDashboardInterest = defaultInterest === "intelligence_dashboard_starter";
  const dashboardDataSources =
    locale === "th"
      ? [
          ["employee_master", "Employee master / Headcount"],
          ["movement", "Hiring / Transfer / Promotion / Exit"],
          ["payroll_ot", "Payroll / OT / Workforce cost"],
          ["attendance_shift", "Attendance / Shift / Schedule"],
          ["productivity", "Workload / Productivity / Output"]
        ]
      : [
          ["employee_master", "Employee master / Headcount"],
          ["movement", "Hiring / Transfer / Promotion / Exit"],
          ["payroll_ot", "Payroll / OT / Workforce cost"],
          ["attendance_shift", "Attendance / Shift / Schedule"],
          ["productivity", "Workload / Productivity / Output"]
        ];

  return (
    <SimplePage
      locale={locale}
      eyebrow={locale === "th" ? "ติดต่อ" : "Contact"}
      title={locale === "th" ? "เริ่มจาก assessment หรือคุยโจทย์คนในองค์กร" : "Start with an assessment or discuss a workforce project"}
      body={
        locale === "th"
          ? "ลงชื่อเพื่อเริ่ม HR Health Check, Workforce Productivity Check, AI Readiness for HR หรือส่งโจทย์เรื่องกำลังคน productivity และ AI-enabled HR ที่อยากคุยต่อ"
          : "Register interest in HR Health Check, Workforce Productivity Check, AI Readiness for HR, or share the workforce, productivity, and AI-enabled HR questions you want to explore."
      }
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand">
            <UserRound size={22} aria-hidden="true" />
          </div>
          <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-[-0.04em]">
            {locale === "th" ? "สมัครด้วย Google" : "Sign up with Google"}
          </h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-white/66">
            {locale === "th"
              ? "เหมาะสำหรับผู้สนใจ assessment หรืออยากให้ O³ ZONE จำอีเมลไว้สำหรับติดตามผลและนัดคุยต่อ"
              : "Best for people interested in an assessment who want O³ ZONE to remember their email for follow-up."}
          </p>

          <form action={signUpInterestWithGoogle} className="mt-7">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="interest" value={defaultInterest} />
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-white px-5 text-sm font-bold text-neutral-950 transition-colors hover:bg-red-50"
            >
              <Mail size={18} aria-hidden="true" />
              {locale === "th" ? "สมัครด้วย Google" : "Continue with Google"}
            </button>
          </form>

          <div className="mt-6 grid gap-3 border-t border-white/10 pt-6">
            {[
              locale === "th" ? "ใช้สำหรับผู้สนใจ assessment และบริการ O³ ZONE" : "For assessment and O³ ZONE service interest",
              locale === "th" ? "ไม่ให้สิทธิ์เข้าหลังบ้าน admin" : "Does not grant admin access",
              locale === "th" ? "ต่อยอดเป็น assessment หรือ member area ได้ภายหลัง" : "Can become an assessment or member area later"
            ].map((item) => (
              <p key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-white/64">
                <CheckCircle2 className="mt-0.5 shrink-0 text-coral" size={17} aria-hidden="true" />
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.04em]">
            {locale === "th" ? "สมัครตรงด้วยอีเมล" : "Sign up directly"}
          </h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-white/66">
            {locale === "th"
              ? "กรอกข้อมูลสั้น ๆ เพื่อเริ่ม assessment หรือแจ้งความสนใจเรื่อง sprint, workshop, dashboard และ advisory"
              : "Leave a few details to start an assessment or discuss sprints, workshops, dashboards, and advisory."}
          </p>

          {status ? (
            <div
              className={`mt-6 rounded-2xl border p-4 ${
                status.tone === "success"
                  ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-50"
                  : status.tone === "warning"
                    ? "border-amber-300/20 bg-amber-300/10 text-amber-50"
                    : "border-red-400/20 bg-red-500/10 text-red-50"
              }`}
            >
              <p className="text-sm font-semibold leading-6">{status.text}</p>
            </div>
          ) : null}

          <form action={submitInterestSignup} className="mt-6 grid gap-4">
            <input type="hidden" name="locale" value={locale} />
            <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label>
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs font-bold text-white/46">{locale === "th" ? "ชื่อ" : "Name"}</span>
                <input
                  name="fullName"
                  type="text"
                  className="min-h-12 rounded-2xl border border-white/10 bg-black/22 px-4 text-sm font-semibold text-white outline-none transition-colors placeholder:text-white/30 focus:border-red-300/50"
                  placeholder={locale === "th" ? "ชื่อของคุณ" : "Your name"}
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-bold text-white/46">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="min-h-12 rounded-2xl border border-white/10 bg-black/22 px-4 text-sm font-semibold text-white outline-none transition-colors placeholder:text-white/30 focus:border-red-300/50"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="grid gap-2">
              <span className="text-xs font-bold text-white/46">{locale === "th" ? "สนใจเรื่อง" : "Interested in"}</span>
              <select
                name="interest"
                className="min-h-12 rounded-2xl border border-white/10 bg-black/22 px-4 text-sm font-semibold text-white outline-none transition-colors focus:border-red-300/50"
                defaultValue={defaultInterest}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value} className="bg-neutral-950">
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="grid gap-4 md:grid-cols-3">
              <label className="grid gap-2">
                <span className="text-xs font-bold text-white/46">{locale === "th" ? "บริษัท" : "Company"}</span>
                <input
                  name="companyName"
                  type="text"
                  required={isDashboardInterest}
                  className="min-h-12 rounded-2xl border border-white/10 bg-black/22 px-4 text-sm font-semibold text-white outline-none transition-colors placeholder:text-white/30 focus:border-red-300/50"
                  placeholder={locale === "th" ? "ชื่อบริษัท" : "Company name"}
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-bold text-white/46">{locale === "th" ? "บทบาท" : "Role"}</span>
                <input
                  name="role"
                  type="text"
                  required={isDashboardInterest}
                  className="min-h-12 rounded-2xl border border-white/10 bg-black/22 px-4 text-sm font-semibold text-white outline-none transition-colors placeholder:text-white/30 focus:border-red-300/50"
                  placeholder={locale === "th" ? "เช่น HR, CEO, Owner" : "e.g. HR, CEO, Owner"}
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-bold text-white/46">{locale === "th" ? "ขนาดองค์กร" : "Company size"}</span>
                <select
                  name="companySize"
                  className="min-h-12 rounded-2xl border border-white/10 bg-black/22 px-4 text-sm font-semibold text-white outline-none transition-colors focus:border-red-300/50"
                  defaultValue=""
                >
                  <option value="" className="bg-neutral-950">{locale === "th" ? "เลือกถ้าทราบ" : "Select if known"}</option>
                  {["1-50", "51-200", "201-500", "501-1000", "1000+"].map((size) => (
                    <option key={size} value={size} className="bg-neutral-950">
                      {size}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {isDashboardInterest ? (
              <div className="rounded-2xl border border-red-300/20 bg-red-500/[0.08] p-5">
                <p className="text-sm font-bold text-red-100">
                  {locale === "th" ? "Dashboard Starter intake" : "Dashboard Starter intake"}
                </p>
                <p className="mt-2 text-xs font-semibold leading-5 text-white/58">
                  {locale === "th"
                    ? "กรอกเท่าที่ทราบได้เลย เพื่อให้คุยครั้งแรกเริ่มจากโจทย์และข้อมูลจริง"
                    : "Fill in what you know so the first conversation can start from real questions and data."}
                </p>
                <div className="mt-5 grid gap-4">
                  <label className="grid gap-2">
                    <span className="text-xs font-bold text-white/46">
                      {locale === "th" ? "คำถามธุรกิจที่อยากให้ Dashboard ช่วยตอบ" : "Business question the dashboard should answer"}
                    </span>
                    <textarea
                      name="businessQuestion"
                      rows={3}
                      required
                      className="min-h-28 rounded-2xl border border-white/10 bg-black/22 px-4 py-3 text-sm font-semibold text-white outline-none transition-colors placeholder:text-white/30 focus:border-red-300/50"
                      placeholder={
                        locale === "th"
                          ? "เช่น OT สูงเพราะคนไม่พอหรือ schedule ไม่แม่น / turnover เกิดที่กลุ่มไหน / productivity gap อยู่ตรงไหน"
                          : "e.g. Is overtime caused by staffing or scheduling? Where is turnover concentrated? Where are productivity gaps?"
                      }
                    />
                  </label>
                  <div>
                    <p className="text-xs font-bold text-white/46">
                      {locale === "th" ? "ข้อมูลที่มีอยู่ตอนนี้" : "Available data sources"}
                    </p>
                    <div className="mt-3 grid gap-2 md:grid-cols-2">
                      {dashboardDataSources.map(([value, label]) => (
                        <label key={value} className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-3 text-sm font-semibold leading-6 text-white/68">
                          <input name="availableDataSources" type="checkbox" value={value} className="mt-1 h-4 w-4 accent-red-600" />
                          <span>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <label className="grid gap-2">
                    <span className="text-xs font-bold text-white/46">{locale === "th" ? "รายละเอียดเพิ่มเติม" : "Additional notes"}</span>
                    <textarea
                      name="notes"
                      rows={3}
                      className="min-h-24 rounded-2xl border border-white/10 bg-black/22 px-4 py-3 text-sm font-semibold text-white outline-none transition-colors placeholder:text-white/30 focus:border-red-300/50"
                      placeholder={locale === "th" ? "เล่า context สั้น ๆ ถ้ามี" : "Add brief context if useful"}
                    />
                  </label>
                </div>
              </div>
            ) : null}
            <label className="flex items-start gap-3 text-sm font-semibold leading-6 text-white/62">
              <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-red-600" />
              <span>
                {locale === "th"
                  ? "ยินยอมให้ O³ ZONE ใช้อีเมลนี้เพื่อติดต่อเรื่อง assessment, workshop, advisory และโปรเจกต์ที่เกี่ยวข้อง"
                  : "I agree that O³ ZONE may use this email for relevant assessment, workshop, advisory, and project updates."}
              </span>
            </label>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-brand px-5 text-sm font-bold text-white transition-colors hover:bg-coral"
            >
              {locale === "th" ? "ส่งข้อมูลสมัคร" : "Submit signup"}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-sm font-semibold leading-7 text-white/62">
          {locale === "th"
            ? "ถ้าเป็นโปรเจกต์ด่วนหรืออยากส่งรายละเอียดเพิ่ม สามารถส่งอีเมลตรงได้ที่"
            : "For urgent projects or longer details, you can also email directly at"}{" "}
          <a className="font-bold text-white underline decoration-red-400/70 underline-offset-4" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </p>
      </div>
    </SimplePage>
  );
}
