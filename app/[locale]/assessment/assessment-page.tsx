import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, BarChart3, Building2, CheckCircle2, ClipboardCheck, FileText, Radar, ShieldCheck, Target } from "lucide-react";
import {
  type AssessmentDefinition,
  getAssessmentLevel,
  readinessScale
} from "@/content/assessments";
import { SectionBadge } from "@/components/section-badge";
import { SimplePage } from "@/components/simple-page";
import type { Locale } from "@/lib/i18n";
import { submitAssessment } from "./actions";

type AssessmentPageProps = {
  locale: Locale;
  assessment: AssessmentDefinition;
  query: {
    status?: string;
    score?: string;
    level?: string;
    strong?: string;
    weak?: string;
    scores?: string;
  };
};

const fieldCopy = {
  th: {
    contactTitle: "ข้อมูลผู้ทำและองค์กร",
    answerTitle: "ตอบระดับความพร้อม 1-5",
    scaleTitle: "เกณฑ์ให้คะแนน",
    scaleBody: "ใช้เกณฑ์เดียวกันทุกข้อ เพื่อเปรียบเทียบจุดแข็งและช่องว่างของแต่ละหมวดได้ตรงขึ้น",
    consent:
      "ยินยอมให้ O³ ZONE เก็บข้อมูลนี้เพื่อสรุปผล assessment ติดต่อกลับ และวิเคราะห์ภาพรวมเชิงธุรกิจ โดยไม่เปิดเผยข้อมูลส่วนบุคคลต่อสาธารณะ",
    submit: "ดูผลประเมิน",
    required: "กรุณากรอกข้อมูลจำเป็นและตอบคำถามให้ครบ",
    saved: "บันทึกผลลงฐานข้อมูลแล้ว พร้อมใช้ติดตามและวิเคราะห์ต่อ",
    setup: "แสดงผลได้แล้ว แต่ยังไม่ได้บันทึกลง Supabase เพราะยังไม่ได้ตั้งค่า environment",
    error: "แสดงผลได้แล้ว แต่บันทึกลงฐานข้อมูลไม่สำเร็จ",
    resultTitle: "ผลประเมินเบื้องต้น",
    strong: "จุดแข็งที่เด่น",
    weak: "จุดที่ควรเริ่มยกระดับ",
    next: "90-day focus",
    nextBody: "เลือก 1-2 หมวดที่คะแนนต่ำสุด แล้วออกแบบ quick win, owner, metric และ dashboard เบื้องต้นให้เห็นผลใน 90 วัน",
    noResult: "กรอกข้อมูลด้านล่างเพื่อดูผลประเมินทันที",
    recommended: "คำแนะนำถัดไป",
    nextStepTitle: "ควรทำอะไรต่อ",
    nextStepBody: "ผลประเมินนี้เป็นจุดเริ่มต้นสำหรับคุยเรื่อง business impact ไม่ใช่คะแนนจบในตัวเอง",
    nextSteps: [
      "ยืนยัน pain point และเป้าหมายธุรกิจกับผู้เกี่ยวข้อง",
      "เลือก 1-2 gap ที่แก้แล้วเห็นผลเร็วที่สุด",
      "นัดคุยเพื่อออกแบบ workshop, sprint หรือ dashboard starter"
    ],
    roadmap: "แผนเริ่มต้น 30/60/90 วัน",
    discuss: "นัดคุยผลประเมิน",
    reportBadge: "Executive Report",
    reportTitle: "รายงานสรุปสำหรับผู้บริหาร",
    reportBody: "สรุปผลประเมินเป็นมุมมองที่ใช้คุยต่อได้: ภาพรวมคะแนน จุดแข็ง จุดเสี่ยง และเส้นทางการยกระดับที่เหมาะสม",
    maturity: "ระดับความพร้อม",
    overallScore: "คะแนนรวม",
    priorityGaps: "Priority gaps",
    scorecard: "Dimension scorecard",
    servicePath: "Service path ที่แนะนำ",
    reportNote: "Report นี้เป็นผลประเมินเบื้องต้นจากคำตอบบนเว็บ ควรใช้ร่วมกับข้อมูลจริงขององค์กรก่อนตัดสินใจทำ project"
  },
  en: {
    contactTitle: "Participant and organization",
    answerTitle: "Rate readiness from 1-5",
    scaleTitle: "Scoring guide",
    scaleBody: "Use the same scale for every question so strengths and gaps can be compared consistently.",
    consent:
      "I agree that O³ ZONE may store this information to summarize the assessment, follow up, and analyze aggregate business patterns without publicly disclosing personal data.",
    submit: "View assessment result",
    required: "Please complete required details and answer all questions.",
    saved: "Result saved to the database for follow-up and analysis.",
    setup: "Result is shown, but Supabase is not configured yet so it was not saved.",
    error: "Result is shown, but database saving did not complete.",
    resultTitle: "Initial assessment result",
    strong: "Clear strength",
    weak: "First area to improve",
    next: "90-day focus",
    nextBody: "Pick the lowest 1-2 dimensions, then define quick wins, owners, metrics, and a first dashboard within 90 days.",
    noResult: "Complete the form below to see the assessment result instantly.",
    recommended: "Recommended next step",
    nextStepTitle: "What to do next",
    nextStepBody: "This result is a conversation starter for business impact, not a final scorecard.",
    nextSteps: [
      "Validate the pain point and business goal with stakeholders",
      "Choose the 1-2 gaps most likely to create near-term impact",
      "Discuss the right workshop, sprint, or dashboard starter"
    ],
    roadmap: "Starter 30/60/90-day plan",
    discuss: "Discuss this result",
    reportBadge: "Executive Report",
    reportTitle: "Executive assessment report",
    reportBody: "A boardroom-ready view of the assessment: score overview, strengths, risks, and the right service path to move forward.",
    maturity: "Readiness level",
    overallScore: "Overall score",
    priorityGaps: "Priority gaps",
    scorecard: "Dimension scorecard",
    servicePath: "Recommended service path",
    reportNote: "This report is an initial web-based assessment and should be combined with real organization data before making project decisions."
  }
} satisfies Record<Locale, Record<string, string | string[]>>;

function parseCategoryScores(raw?: string) {
  if (!raw) return {};

  return Object.fromEntries(
    raw
      .split(",")
      .map((item) => item.split(":"))
      .filter(([key, value]) => key && Number.isFinite(Number(value)))
      .map(([key, value]) => [key, Number(value)])
  ) as Record<string, number>;
}

function getStatusText(locale: Locale, status?: string) {
  const t = fieldCopy[locale];

  if (status === "saved") return { tone: "success", text: t.saved };
  if (status === "setup") return { tone: "warning", text: t.setup };
  if (status === "error") return { tone: "error", text: t.error };
  if (status === "invalid" || status === "incomplete") return { tone: "error", text: t.required };

  return null;
}

export function AssessmentPage({ locale, assessment, query }: AssessmentPageProps) {
  const t = fieldCopy[locale];
  const status = getStatusText(locale, query.status);
  const scale = readinessScale[locale];
  const score = Number(query.score);
  const hasResult = Number.isFinite(score) && score >= 0;
  const level = hasResult ? getAssessmentLevel(score, locale) : null;
  const categoryScores = parseCategoryScores(query.scores);
  const strongest = assessment.categories.find((category) => category.id === query.strong);
  const weakest = assessment.categories.find((category) => category.id === query.weak);
  const recommendation =
    (weakest ? assessment.recommendations[weakest.id]?.[locale] : null) ??
    assessment.recommendations[assessment.categories[0].id]?.[locale];
  const contactHref = `/${locale}/contact?interest=${assessment.type}`;

  return (
    <SimplePage locale={locale} eyebrow={assessment.eyebrow[locale]} title={assessment.title[locale]} body={assessment.body[locale]}>
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand">
            <ClipboardCheck size={23} aria-hidden="true" />
          </div>
          <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-[-0.04em]">
            {assessment.introTitle[locale]}
          </h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-white/66">{assessment.introBody[locale]}</p>
          <div className="mt-7 grid gap-3">
            {assessment.categories.map((category, index) => (
              <div key={category.id} className="flex items-start gap-3 rounded-2xl bg-white/[0.045] p-4">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-red-300/25 text-xs font-bold text-red-100">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{category.title[locale]}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-white/52">{category.summary[locale]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="result" className="rounded-[1.5rem] border border-white/10 bg-white p-6 text-neutral-950 sm:p-7">
          <SectionBadge number="O³" label={t.resultTitle} />
          {hasResult && level ? (
            <>
              <div className="mt-6 grid gap-4 sm:grid-cols-[180px_1fr] sm:items-center">
                <div className="relative grid aspect-square place-items-center rounded-full bg-neutral-950 text-white">
                  <div
                    className="absolute inset-3 rounded-full"
                    style={{
                      background: `conic-gradient(#e11d48 ${score * 3.6}deg, rgba(255,255,255,0.1) 0deg)`
                    }}
                  />
                  <div className="relative grid h-[72%] w-[72%] place-items-center rounded-full bg-neutral-950">
                    <p className="text-5xl font-semibold tracking-[-0.08em]">{score}</p>
                    <p className="-mt-3 text-xs font-bold text-white/46">/100</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-red-600">{query.level ?? level.label}</p>
                  <h2 className="mt-2 text-balance text-3xl font-semibold leading-tight tracking-[-0.04em]">{level.label}</h2>
                  <p className="mt-4 text-sm font-semibold leading-7 text-neutral-600">{level.body}</p>
                </div>
              </div>

              <div className="mt-7 grid gap-3">
                {assessment.categories.map((category) => (
                  <div key={category.id}>
                    <div className="flex items-center justify-between gap-4 text-xs font-bold text-neutral-500">
                      <span>{category.title[locale]}</span>
                      <span>{categoryScores[category.id] ?? 0}</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${categoryScores[category.id] ?? 0}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <ResultCard icon={CheckCircle2} label={t.strong} value={strongest?.title[locale] ?? "-"} />
                <ResultCard icon={Radar} label={t.weak} value={weakest?.title[locale] ?? "-"} />
              </div>
              <div className="mt-3 rounded-2xl bg-neutral-950 p-5 text-white">
                <p className="text-sm font-bold text-coral">{t.next}</p>
                <p className="mt-2 text-sm font-semibold leading-7 text-white/70">{t.nextBody}</p>
              </div>
              {recommendation ? (
                <>
                  <div className="mt-3 rounded-2xl border border-red-200/40 bg-red-50 p-5">
                    <Target size={20} className="text-red-600" aria-hidden="true" />
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-red-600">{t.recommended}</p>
                    <h3 className="mt-2 text-balance text-2xl font-semibold leading-tight tracking-[-0.04em] text-neutral-950">
                      {recommendation.service}
                    </h3>
                    <p className="mt-3 text-sm font-semibold leading-7 text-neutral-600">{recommendation.body}</p>
                  </div>
                  <div className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                    <p className="text-sm font-bold text-neutral-950">{t.roadmap}</p>
                    <div className="mt-4 grid gap-3">
                      {recommendation.steps.map((step, index) => (
                        <div key={step} className="grid grid-cols-[42px_1fr] gap-3 rounded-xl bg-white p-3">
                          <span className="grid h-9 w-9 place-items-center rounded-full bg-neutral-950 text-xs font-bold text-white">
                            {index === 0 ? "30" : index === 1 ? "60" : "90"}
                          </span>
                          <p className="text-sm font-bold leading-6 text-neutral-700">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 rounded-2xl border border-neutral-200 bg-white p-5">
                    <p className="text-sm font-bold text-neutral-950">{t.nextStepTitle}</p>
                    <p className="mt-2 text-sm font-semibold leading-7 text-neutral-600">{t.nextStepBody}</p>
                    <div className="mt-4 grid gap-2">
                      {(t.nextSteps as string[]).map((step) => (
                        <div key={step} className="flex items-start gap-3 rounded-xl bg-neutral-50 p-3">
                          <CheckCircle2 className="mt-0.5 shrink-0 text-red-600" size={17} aria-hidden="true" />
                          <p className="text-sm font-bold leading-6 text-neutral-700">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
              <Link
                href={contactHref}
                className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-brand px-5 text-sm font-bold text-white transition-colors hover:bg-coral"
              >
                {t.discuss}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </>
          ) : (
            <div className="mt-8 rounded-2xl bg-neutral-950 p-6 text-white">
              <Radar size={28} className="text-coral" aria-hidden="true" />
              <p className="mt-4 text-xl font-semibold tracking-[-0.03em]">{t.noResult}</p>
            </div>
          )}

          {status ? (
            <div
              className={`mt-5 rounded-2xl border p-4 ${
                status.tone === "success"
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-900"
                  : status.tone === "warning"
                    ? "border-amber-500/20 bg-amber-500/10 text-amber-900"
                    : "border-red-500/20 bg-red-500/10 text-red-900"
              }`}
            >
              <p className="text-sm font-bold leading-6">{status.text}</p>
            </div>
          ) : null}
        </section>
      </div>

      {hasResult && level ? (
        <ExecutiveAssessmentReport
          locale={locale}
          assessment={assessment}
          score={score}
          levelLabel={query.level ?? level.label}
          levelBody={level.body}
          categoryScores={categoryScores}
          strongest={strongest?.title[locale] ?? "-"}
          weakest={weakest?.title[locale] ?? "-"}
          recommendation={recommendation}
          contactHref={contactHref}
          labels={t}
        />
      ) : null}

      <form action={submitAssessment} className="mt-6 grid gap-6">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="assessmentType" value={assessment.type} />
        <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <Building2 className="text-coral" size={24} aria-hidden="true" />
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">{t.contactTitle}</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InputField name="fullName" label={locale === "th" ? "ชื่อผู้ทำ" : "Name"} placeholder={locale === "th" ? "ชื่อของคุณ" : "Your name"} />
            <InputField name="email" type="email" required label="Email" placeholder="you@example.com" />
            <InputField name="companyName" required label={locale === "th" ? "บริษัท" : "Company"} placeholder={locale === "th" ? "ชื่อบริษัท" : "Company name"} />
            <InputField name="role" required label={locale === "th" ? "บทบาท" : "Role"} placeholder={locale === "th" ? "เช่น HR Manager, CEO, Owner" : "e.g. HR Manager, CEO, Owner"} />
            <SelectField
              name="companySize"
              required
              label={locale === "th" ? "ขนาดองค์กร" : "Company size"}
              options={[
                ["", locale === "th" ? "เลือกขนาดองค์กร" : "Select company size"],
                ["1-50", "1-50"],
                ["51-200", "51-200"],
                ["201-500", "201-500"],
                ["501-1000", "501-1000"],
                ["1000+", "1000+"]
              ]}
            />
            <InputField name="industry" label={locale === "th" ? "อุตสาหกรรม" : "Industry"} placeholder={locale === "th" ? "เช่น Retail, Manufacturing, Logistics" : "e.g. Retail, Manufacturing, Logistics"} />
          </div>
          <label className="mt-4 grid gap-2">
            <span className="text-xs font-bold text-white/46">{locale === "th" ? "โจทย์คนที่อยากแก้ตอนนี้" : "Current people challenge"}</span>
            <textarea
              name="mainChallenge"
              rows={4}
              className="assessment-field rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold outline-none transition-colors placeholder:text-white/30 focus:border-red-300/50"
              placeholder={locale === "th" ? "เล่า pain point สั้น ๆ เช่น turnover, productivity, dashboard, AI for HR" : "Briefly describe turnover, productivity, dashboard, or AI for HR challenges."}
            />
          </label>
        </section>

        <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-coral" size={24} aria-hidden="true" />
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">{t.answerTitle}</h2>
          </div>
          <div className="mt-5 rounded-[1.25rem] border border-red-300/15 bg-black/24 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold text-coral">{t.scaleTitle}</p>
                <p className="mt-1 max-w-xl text-xs font-semibold leading-5 text-white/52">{t.scaleBody}</p>
              </div>
              <p className="text-xs font-bold text-white/36">1 → 5</p>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-5">
              {scale.map((item) => (
                <div key={item.score} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-neutral-950">
                      {item.score}
                    </span>
                    <p className="text-sm font-bold text-white">{item.short}</p>
                  </div>
                  <p className="mt-2 text-xs font-semibold leading-5 text-white/46">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-5">
            {assessment.categories.map((category, categoryIndex) => (
              <div key={category.id} className="rounded-[1.25rem] border border-white/10 bg-black/20 p-5">
                <div className="flex flex-col gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-coral">0{categoryIndex + 1}</p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">{category.title[locale]}</h3>
                  </div>
                  <p className="max-w-sm text-xs font-semibold leading-5 text-white/50">{category.summary[locale]}</p>
                </div>
                <div className="mt-4 grid gap-4">
                  {assessment.questions
                    .filter((question) => question.category === category.id)
                    .map((question, questionIndex) => (
                      <QuestionField
                        key={question.id}
                        name={question.id}
                        label={`${questionIndex + 1}. ${question.text[locale]}`}
                        scale={scale}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-sm font-semibold leading-6 text-white/66">
          <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-red-600" />
          <span>{t.consent}</span>
        </label>

        <button
          type="submit"
          className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-brand px-6 text-sm font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-coral sm:w-fit"
        >
          {t.submit}
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </form>
    </SimplePage>
  );
}

function ResultCard({ icon: Icon, label, value }: { icon: typeof CheckCircle2; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
      <Icon size={19} className="text-red-600" aria-hidden="true" />
      <p className="mt-3 text-xs font-bold text-neutral-500">{label}</p>
      <p className="mt-1 text-sm font-bold leading-6 text-neutral-950">{value}</p>
    </div>
  );
}

function ExecutiveAssessmentReport({
  locale,
  assessment,
  score,
  levelLabel,
  levelBody,
  categoryScores,
  strongest,
  weakest,
  recommendation,
  contactHref,
  labels
}: {
  locale: Locale;
  assessment: AssessmentDefinition;
  score: number;
  levelLabel: string;
  levelBody: string;
  categoryScores: Record<string, number>;
  strongest: string;
  weakest: string;
  recommendation?: { service: string; body: string; steps: string[] };
  contactHref: string;
  labels: Record<string, string | string[]>;
}) {
  const sortedCategories = assessment.categories
    .map((category) => ({ ...category, score: categoryScores[category.id] ?? 0 }))
    .sort((a, b) => a.score - b.score);
  const priorityGaps = sortedCategories.slice(0, 3);
  const scoreTone = score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-sky-500" : score >= 40 ? "bg-amber-500" : "bg-brand";

  return (
    <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white text-neutral-950 shadow-soft">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-neutral-950 p-6 text-white sm:p-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-brand">
              <FileText size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">{String(labels.reportBadge)}</p>
              <p className="mt-1 text-xs font-semibold text-white/42">O³ ZONE Assessment</p>
            </div>
          </div>
          <h2 className="mt-8 text-balance text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.055em]">
            {String(labels.reportTitle)}
          </h2>
          <p className="mt-5 text-pretty text-sm font-semibold leading-7 text-white/64">{String(labels.reportBody)}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <ReportTile label={String(labels.overallScore)} value={`${score}/100`} />
            <ReportTile label={String(labels.maturity)} value={levelLabel} />
            <ReportTile label={String(labels.strong)} value={strongest} />
            <ReportTile label={String(labels.weak)} value={weakest} />
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[190px_1fr] lg:items-center">
            <div className="relative grid aspect-square place-items-center rounded-full bg-neutral-100">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: `conic-gradient(#e11d48 ${score * 3.6}deg, #ececec 0deg)` }}
              />
              <div className="relative grid h-[72%] w-[72%] place-items-center rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
                <p className="text-5xl font-semibold tracking-[-0.08em]">{score}</p>
                <p className="-mt-3 text-xs font-bold text-neutral-400">/100</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-red-600">{assessment.title[locale]}</p>
              <h3 className="mt-2 text-balance text-3xl font-semibold leading-tight tracking-[-0.045em]">{levelLabel}</h3>
              <p className="mt-4 text-sm font-semibold leading-7 text-neutral-600">{levelBody}</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-neutral-100">
                <div className={`h-full rounded-full ${scoreTone}`} style={{ width: `${score}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-bold text-neutral-950">{String(labels.scorecard)}</p>
              <BarChart3 size={18} className="text-red-600" aria-hidden="true" />
            </div>
            <div className="mt-5 grid gap-3">
              {assessment.categories.map((category) => {
                const value = categoryScores[category.id] ?? 0;

                return (
                  <div key={category.id} className="grid gap-2 sm:grid-cols-[180px_1fr_42px] sm:items-center">
                    <p className="text-xs font-bold leading-5 text-neutral-600">{category.title[locale]}</p>
                    <div className="h-3 overflow-hidden rounded-full bg-white">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${value}%` }} />
                    </div>
                    <p className="text-right text-xs font-bold text-neutral-500">{value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 p-6 sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="text-sm font-bold text-neutral-950">{String(labels.priorityGaps)}</p>
            <div className="mt-5 grid gap-3">
              {priorityGaps.map((gap, index) => (
                <div key={gap.id} className="grid grid-cols-[42px_1fr_auto] items-center gap-3 rounded-xl bg-white p-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-neutral-950 text-xs font-bold text-white">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-neutral-950">{gap.title[locale]}</p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-neutral-500">{gap.summary[locale]}</p>
                  </div>
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">{gap.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-red-200/60 bg-red-50 p-5">
            <Target size={20} className="text-red-600" aria-hidden="true" />
            <p className="mt-4 text-sm font-bold text-red-700">{String(labels.servicePath)}</p>
            <h3 className="mt-2 text-balance text-2xl font-semibold leading-tight tracking-[-0.04em]">
              {recommendation?.service ?? "O³ Consulting / 90-day Roadmap"}
            </h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-neutral-600">{recommendation?.body}</p>
            {recommendation?.steps.length ? (
              <div className="mt-4 grid gap-2">
                {recommendation.steps.map((step, index) => (
                  <div key={step} className="flex items-start gap-3 rounded-xl bg-white p-3">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-neutral-950 text-[10px] font-bold text-white">
                      {index === 0 ? "30" : index === 1 ? "60" : "90"}
                    </span>
                    <p className="text-sm font-bold leading-6 text-neutral-700">{step}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-5 grid gap-4 rounded-2xl bg-neutral-950 p-5 text-white lg:grid-cols-[1fr_auto] lg:items-center">
          <p className="text-sm font-semibold leading-7 text-white/62">{String(labels.reportNote)}</p>
          <Link
            href={contactHref}
            className="inline-flex min-h-11 w-fit items-center justify-center gap-3 rounded-full bg-white px-4 text-sm font-bold text-neutral-950 transition-colors hover:bg-red-50"
          >
            {String(labels.discuss)}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ReportTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/34">{label}</p>
      <p className="mt-3 text-sm font-bold leading-6 text-white">{value}</p>
    </div>
  );
}

function InputField({
  name,
  label,
  placeholder,
  type = "text",
  required = false
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold text-white/46">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="assessment-field min-h-12 rounded-2xl border border-white/10 px-4 text-sm font-semibold outline-none transition-colors placeholder:text-white/30 focus:border-red-300/50"
        placeholder={placeholder}
      />
    </label>
  );
}

function SelectField({
  name,
  label,
  options,
  required = false
}: {
  name: string;
  label: string;
  options: Array<[string, string]>;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold text-white/46">
        {label}
        {required ? " *" : ""}
      </span>
      <select
        name={name}
        required={required}
        className="assessment-field min-h-12 rounded-2xl border border-white/10 px-4 text-sm font-semibold outline-none transition-colors focus:border-red-300/50"
        defaultValue=""
      >
        {options.map(([value, label]) => (
          <option key={`${name}-${value}`} value={value} className="bg-neutral-950">
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}

function QuestionField({
  name,
  label,
  scale
}: {
  name: string;
  label: string;
  scale: Array<{ score: number; short: string; detail: string }>;
}) {
  return (
    <fieldset className="grid gap-3 rounded-2xl bg-white/[0.035] p-4">
      <legend className="text-sm font-semibold leading-6 text-white/82">{label}</legend>
      <div className="grid grid-cols-5 gap-2">
        {scale.map((item) => (
          <label key={item.score} className="group relative">
            <input className="peer sr-only" type="radio" name={name} value={item.score} required aria-label={`${item.score}: ${item.short}. ${item.detail}`} />
            <span
              className="grid min-h-12 cursor-pointer place-items-center rounded-xl border border-white/10 bg-black/22 px-1 text-center text-white/58 transition-colors peer-checked:border-red-300/60 peer-checked:bg-brand peer-checked:text-white group-hover:bg-white/[0.08]"
              style={{ "--motion-delay": item.score * 20 } as CSSProperties}
              title={`${item.score}: ${item.short} - ${item.detail}`}
            >
              <span className="text-sm font-bold leading-none">{item.score}</span>
              <span className="mt-1 hidden max-w-full text-[10px] font-bold leading-none text-white/54 peer-checked:text-white/80 sm:block">
                {item.short}
              </span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
