"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  Clock3,
  GitBranch,
  LineChart,
  ShieldAlert,
  UsersRound
} from "lucide-react";
import type { Locale } from "@/lib/i18n";

type Lens = "workforceShape" | "movementRetention" | "planCost" | "talentFlow";
type Tone = "good" | "watch" | "risk" | "neutral";
type MetricIcon = typeof UsersRound;

type Indicator = {
  label: string;
  value: string;
  detail: string;
  tone: Tone;
  icon: MetricIcon;
};

type SegmentSignal = {
  segment: string;
  indicator: string;
  value: string;
  tone: Tone;
};

type TrendPoint = {
  label: string;
  plan: number;
  actual: number;
};

type LensData = {
  question: Record<Locale, string>;
  lensNote: Record<Locale, string>;
  indicators: Indicator[];
  trendLabel: Record<Locale, string>;
  trend: TrendPoint[];
  segments: SegmentSignal[];
  insight: Record<Locale, string>;
  action: Record<Locale, string>;
};

type DashboardDemoProps = {
  locale: Locale;
};

const lensOrder: Lens[] = ["workforceShape", "movementRetention", "planCost", "talentFlow"];

const demoCopy = {
  th: {
    eyebrow: "Interactive sample",
    title: "Dashboard ที่เริ่มจากคำถาม ไม่ใช่เริ่มจากกราฟ",
    body:
      "ตัวอย่างนี้ปรับให้ใกล้แนว People Analytics product มากขึ้น: แยกมุมมอง กำหนด indicator สำคัญ แล้วสรุปเป็น insight ที่ผู้บริหารใช้ตัดสินใจได้",
    tabs: {
      workforceShape: "Workforce Shape",
      movementRetention: "Movement & Retention",
      planCost: "Plan vs Cost",
      talentFlow: "Talent Flow"
    },
    ask: "Business question",
    indicators: "Decision indicators",
    diagnostic: "Segment diagnostics",
    insight: "Insight brief",
    action: "Recommended next move",
    plan: "Plan",
    actual: "Actual",
    contact: "อยากทำ Dashboard จากข้อมูลจริง",
    back: "กลับไปบริการ Dashboard"
  },
  en: {
    eyebrow: "Interactive sample",
    title: "A dashboard that starts with questions, not charts",
    body:
      "This sample is closer to a people analytics product: define the lens, choose decision indicators, and turn signals into executive insight.",
    tabs: {
      workforceShape: "Workforce Shape",
      movementRetention: "Movement & Retention",
      planCost: "Plan vs Cost",
      talentFlow: "Talent Flow"
    },
    ask: "Business question",
    indicators: "Decision indicators",
    diagnostic: "Segment diagnostics",
    insight: "Insight brief",
    action: "Recommended next move",
    plan: "Plan",
    actual: "Actual",
    contact: "Build this with real data",
    back: "Back to Dashboard service"
  }
} satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  body: string;
  tabs: Record<Lens, string>;
  ask: string;
  indicators: string;
  diagnostic: string;
  insight: string;
  action: string;
  plan: string;
  actual: string;
  contact: string;
  back: string;
}>;

const demoData = {
  workforceShape: {
    question: {
      th: "โครงสร้างกำลังคนปัจจุบันพร้อมรองรับแผนธุรกิจหรือยัง",
      en: "Is the current workforce shape ready to support the business plan?"
    },
    lensNote: {
      th: "ใช้ดู headcount, FTE, vacancy, critical role และ plan variance เพื่อรู้ว่ากำลังคนอยู่ตรงไหนก่อนตัดสินใจเพิ่ม/ปรับ/ย้ายคน",
      en: "Track headcount, FTE, vacancy, critical roles, and plan variance before deciding where to hire, redeploy, or redesign work."
    },
    indicators: [
      { label: "Headcount / FTE", value: "486 / 472", detail: "+4.2% YoY", tone: "neutral", icon: UsersRound },
      { label: "Vacancy rate", value: "6.8%", detail: "critical roles 31", tone: "watch", icon: BriefcaseBusiness },
      { label: "Plan variance", value: "+18", detail: "above approved plan", tone: "risk", icon: ShieldAlert },
      { label: "Span of control", value: "1:8.6", detail: "ops team high", tone: "watch", icon: GitBranch }
    ],
    trendLabel: { th: "Headcount plan vs actual", en: "Headcount plan vs actual" },
    trend: [
      { label: "Jan", plan: 450, actual: 448 },
      { label: "Feb", plan: 456, actual: 462 },
      { label: "Mar", plan: 461, actual: 469 },
      { label: "Apr", plan: 468, actual: 481 },
      { label: "May", plan: 472, actual: 486 }
    ],
    segments: [
      { segment: "Operations", indicator: "Vacancy", value: "9.4%", tone: "risk" },
      { segment: "Sales", indicator: "FTE plan", value: "+7", tone: "watch" },
      { segment: "Support", indicator: "Span", value: "1:6.1", tone: "good" },
      { segment: "Critical roles", indicator: "Open", value: "31", tone: "risk" }
    ],
    insight: {
      th: "ภาพรวมกำลังคนไม่ได้ขาดทั้งองค์กร แต่ gap กระจุกใน critical roles และ Operations ทำให้ OT และ workload สูงแม้ headcount รวมเกินแผน",
      en: "The organization is not broadly understaffed. Gaps are concentrated in critical roles and Operations, causing overtime and workload pressure despite total headcount being above plan."
    },
    action: {
      th: "แยก decision เป็น 3 ทาง: hire เฉพาะ critical roles, redeploy จากทีมที่เกินแผน และปรับ span ของ Operations ก่อนเพิ่ม headcount ใหม่",
      en: "Split the decision into three moves: hire critical roles, redeploy from over-plan teams, and adjust Operations span before adding more headcount."
    }
  },
  movementRetention: {
    question: {
      th: "คนเข้า-ออกกลุ่มไหนกำลังกระทบ capability และ continuity ของธุรกิจ",
      en: "Which workforce movements are affecting capability and business continuity?"
    },
    lensNote: {
      th: "ดู starts, exits, voluntary turnover, new hire retention และ regretted loss เพื่อแยก turnover ปกติออกจาก turnover ที่กระทบธุรกิจจริง",
      en: "Review starts, exits, voluntary turnover, new hire retention, and regretted loss to separate normal churn from business-impacting attrition."
    },
    indicators: [
      { label: "Voluntary turnover", value: "14.8%", detail: "+2.1 pts vs target", tone: "risk", icon: Activity },
      { label: "New hire retention", value: "71%", detail: "first 180 days", tone: "risk", icon: Clock3 },
      { label: "Regretted loss", value: "19", detail: "critical talent exits", tone: "risk", icon: ShieldAlert },
      { label: "Net movement", value: "+24", detail: "starts minus exits", tone: "neutral", icon: LineChart }
    ],
    trendLabel: { th: "Starts vs exits", en: "Starts vs exits" },
    trend: [
      { label: "Jan", plan: 34, actual: 22 },
      { label: "Feb", plan: 28, actual: 31 },
      { label: "Mar", plan: 42, actual: 38 },
      { label: "Apr", plan: 31, actual: 44 },
      { label: "May", plan: 46, actual: 29 }
    ],
    segments: [
      { segment: "Frontline < 6M", indicator: "Turnover", value: "29%", tone: "risk" },
      { segment: "Supervisors", indicator: "Regretted loss", value: "8", tone: "risk" },
      { segment: "Sales", indicator: "New hire retention", value: "83%", tone: "good" },
      { segment: "Operations", indicator: "Exit spike", value: "+12", tone: "watch" }
    ],
    insight: {
      th: "Turnover สูงไม่ได้เกิดทุกกลุ่ม แต่เกิดใน frontline อายุงานต่ำกว่า 6 เดือนและ supervisor บางหน่วย ซึ่งกระทบ productivity มากกว่า turnover เฉลี่ยทั้งองค์กร",
      en: "Turnover is not evenly distributed. It is concentrated among frontline employees under six months and selected supervisors, creating more productivity risk than the company-wide rate suggests."
    },
    action: {
      th: "ทำ retention deep dive เฉพาะ 180 วันแรก และแยก regretted loss ของ supervisor เพื่อออกแบบ onboarding, manager check-in และ stay interview",
      en: "Run a first-180-days retention deep dive and isolate supervisor regretted loss to design onboarding, manager check-ins, and stay interviews."
    }
  },
  planCost: {
    question: {
      th: "ต้นทุนคนที่เพิ่มขึ้นมาจากแผนธุรกิจจริง หรือมาจาก inefficiency ของระบบงาน",
      en: "Is rising people cost driven by business demand or operating inefficiency?"
    },
    lensNote: {
      th: "เชื่อม workforce plan, labor cost, OT, cost per FTE และ productivity เพื่อบอกว่าควรเพิ่มคน ลด OT หรือปรับวิธีทำงาน",
      en: "Connect workforce plan, labor cost, overtime, cost per FTE, and productivity to decide whether to hire, reduce overtime, or redesign work."
    },
    indicators: [
      { label: "Labor cost variance", value: "+8.7%", detail: "above plan", tone: "risk", icon: LineChart },
      { label: "OT cost", value: "1.8M", detail: "THB/month", tone: "risk", icon: Clock3 },
      { label: "Cost / FTE", value: "42K", detail: "+6% QoQ", tone: "watch", icon: UsersRound },
      { label: "Productivity offset", value: "3.1%", detail: "below cost growth", tone: "risk", icon: Activity }
    ],
    trendLabel: { th: "Cost plan vs actual", en: "Cost plan vs actual" },
    trend: [
      { label: "Jan", plan: 82, actual: 84 },
      { label: "Feb", plan: 84, actual: 91 },
      { label: "Mar", plan: 86, actual: 94 },
      { label: "Apr", plan: 88, actual: 99 },
      { label: "May", plan: 90, actual: 103 }
    ],
    segments: [
      { segment: "Warehouse", indicator: "OT cost", value: "+18%", tone: "risk" },
      { segment: "Branch A", indicator: "Cost/FTE", value: "48K", tone: "watch" },
      { segment: "Support", indicator: "Cost plan", value: "-2%", tone: "good" },
      { segment: "Operations", indicator: "Productivity offset", value: "Low", tone: "risk" }
    ],
    insight: {
      th: "ต้นทุนเพิ่มเร็วกว่า productivity โดยเฉพาะ OT ใน Warehouse และ Operations สัญญาณนี้ชี้ว่าควรแยก OT ที่เกิดจาก demand จริงออกจาก OT ที่เกิดจาก scheduling/process",
      en: "Cost is growing faster than productivity, especially overtime in Warehouse and Operations. This suggests separating demand-driven overtime from scheduling or process-driven overtime."
    },
    action: {
      th: "ทำ OT driver analysis แล้วออกแบบ 3 action: demand forecast, schedule rule, approval threshold พร้อม tracking รายเดือน",
      en: "Run overtime driver analysis, then design three actions: demand forecast, schedule rules, and approval thresholds with monthly tracking."
    }
  },
  talentFlow: {
    question: {
      th: "องค์กรใช้ talent ภายในได้ดีพอหรือยัง หรือยังพึ่ง hiring ภายนอกมากเกินไป",
      en: "Is the organization using internal talent well enough, or relying too heavily on external hiring?"
    },
    lensNote: {
      th: "ดู internal mobility, promotion rate, internal fill, readiness และ bench strength เพื่อเชื่อม talent strategy กับ growth",
      en: "Track internal mobility, promotion rate, internal fill, readiness, and bench strength to connect talent strategy with growth."
    },
    indicators: [
      { label: "Internal fill rate", value: "34%", detail: "target 45%", tone: "watch", icon: GitBranch },
      { label: "Promotion rate", value: "7.2%", detail: "frontline low", tone: "watch", icon: LineChart },
      { label: "Ready-now bench", value: "22", detail: "critical roles", tone: "risk", icon: ShieldAlert },
      { label: "External hire ratio", value: "66%", detail: "above norm", tone: "risk", icon: BriefcaseBusiness }
    ],
    trendLabel: { th: "Internal fill target vs actual", en: "Internal fill target vs actual" },
    trend: [
      { label: "Jan", plan: 40, actual: 33 },
      { label: "Feb", plan: 41, actual: 35 },
      { label: "Mar", plan: 42, actual: 34 },
      { label: "Apr", plan: 44, actual: 37 },
      { label: "May", plan: 45, actual: 34 }
    ],
    segments: [
      { segment: "Supervisor pipeline", indicator: "Ready now", value: "7", tone: "risk" },
      { segment: "Sales", indicator: "Internal fill", value: "48%", tone: "good" },
      { segment: "Tech roles", indicator: "External hire", value: "82%", tone: "risk" },
      { segment: "Operations", indicator: "Promotion", value: "4.1%", tone: "watch" }
    ],
    insight: {
      th: "องค์กรมี movement ภายในบางส่วน แต่ยังไม่พอสำหรับ critical roles โดยเฉพาะ supervisor pipeline และ tech roles ทำให้ hiring ภายนอกสูงและเสี่ยงเรื่อง ramp-up",
      en: "Internal movement exists but is not enough for critical roles, especially supervisor pipeline and tech roles. This drives external hiring dependence and ramp-up risk."
    },
    action: {
      th: "ทำ critical role pipeline review และตั้ง internal fill target รายไตรมาส พร้อมแผน development สำหรับ ready-soon talent",
      en: "Run a critical role pipeline review and set quarterly internal fill targets, supported by development plans for ready-soon talent."
    }
  }
} satisfies Record<Lens, LensData>;

const toneStyle = {
  good: "border-emerald-300/20 bg-emerald-400/10 text-emerald-100",
  watch: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  risk: "border-red-300/25 bg-red-500/10 text-red-100",
  neutral: "border-white/10 bg-white/[0.045] text-white"
} satisfies Record<Tone, string>;

const toneDot = {
  good: "bg-emerald-300",
  watch: "bg-amber-300",
  risk: "bg-coral",
  neutral: "bg-white/42"
} satisfies Record<Tone, string>;

export function DashboardDemo({ locale }: DashboardDemoProps) {
  const [lens, setLens] = useState<Lens>("workforceShape");
  const copy = demoCopy[locale];
  const active = demoData[lens];
  const contactHref = `/${locale}/contact?interest=intelligence_dashboard_starter`;
  const maxTrend = Math.max(...active.trend.flatMap((point) => [point.plan, point.actual]));

  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-4 shadow-soft sm:p-6 lg:p-8">
      <div className="grid gap-8 xl:grid-cols-[370px_1fr]">
        <aside>
          <p className="text-sm font-bold text-coral">{copy.eyebrow}</p>
          <h2 className="mt-4 text-balance text-[clamp(2rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.055em]">
            {copy.title}
          </h2>
          <p className="mt-5 text-pretty text-base font-medium leading-[1.75] text-white/68">{copy.body}</p>

          <div className="mt-7 grid gap-2">
            {lensOrder.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLens(item)}
                className={`group rounded-2xl border p-4 text-left transition-colors ${
                  lens === item
                    ? "border-white bg-white text-neutral-950"
                    : "border-white/10 bg-black/24 text-white/62 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="text-sm font-bold">{copy.tabs[item]}</span>
                  <ArrowUpRight
                    className={`transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                      lens === item ? "text-neutral-950/54" : "text-white/34"
                    }`}
                    size={16}
                    aria-hidden="true"
                  />
                </span>
                <span className={`mt-2 block text-xs font-semibold leading-5 ${lens === item ? "text-neutral-600" : "text-white/42"}`}>
                  {demoData[item].lensNote[locale]}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={contactHref}
              className="inline-flex min-h-12 items-center gap-3 rounded-full bg-brand px-5 text-sm font-bold text-white transition-colors hover:bg-coral"
            >
              {copy.contact}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href={`/${locale}/services/intelligence-dashboard-starter`}
              className="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/10 px-5 text-sm font-bold text-white/72 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {copy.back}
            </Link>
          </div>
        </aside>

        <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-neutral-950">
          <div className="border-b border-white/10 bg-white/[0.035] p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/36">O³ Workforce Intelligence</p>
                <h3 className="mt-2 text-balance text-3xl font-semibold leading-tight tracking-[-0.045em]">
                  {copy.tabs[lens]} View
                </h3>
              </div>
              <div className="rounded-2xl border border-red-300/20 bg-red-500/10 p-4 lg:max-w-[360px]">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-100/70">{copy.ask}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-white">{active.question[locale]}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-4 sm:p-5">
            <div>
              <p className="mb-3 text-sm font-bold text-white/62">{copy.indicators}</p>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {active.indicators.map((indicator) => {
                  const Icon = indicator.icon;

                  return (
                    <div key={indicator.label} className={`rounded-2xl border p-4 ${toneStyle[indicator.tone]}`}>
                      <div className="flex items-center justify-between gap-3">
                        <Icon size={19} aria-hidden="true" />
                        <span className={`h-2 w-2 rounded-full ${toneDot[indicator.tone]}`} />
                      </div>
                      <p className="mt-6 text-3xl font-semibold tracking-[-0.07em]">{indicator.value}</p>
                      <p className="mt-1 text-xs font-bold opacity-70">{indicator.label}</p>
                      <p className="mt-2 text-xs font-bold opacity-64">{indicator.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-bold text-white/62">{active.trendLabel[locale]}</p>
                  <div className="flex items-center gap-4 text-xs font-bold text-white/46">
                    <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-white/40" />{copy.plan}</span>
                    <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-coral" />{copy.actual}</span>
                  </div>
                </div>
                <div className="mt-8 grid h-60 grid-cols-5 items-end gap-4 border-b border-white/10 pb-4">
                  {active.trend.map((point) => (
                    <div key={point.label} className="grid h-full grid-rows-[1fr_auto] gap-2">
                      <div className="flex items-end justify-center gap-2">
                        <div className="flex h-full w-5 items-end rounded-full bg-white/[0.04]">
                          <div
                            className="w-full rounded-full bg-white/34 transition-all duration-500"
                            style={{ height: `${Math.max(12, (point.plan / maxTrend) * 100)}%` }}
                          />
                        </div>
                        <div className="flex h-full w-5 items-end rounded-full bg-red-500/10">
                          <div
                            className="w-full rounded-full bg-gradient-to-t from-red-700 via-brand to-coral transition-all duration-500"
                            style={{ height: `${Math.max(12, (point.actual / maxTrend) * 100)}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-center text-[10px] font-bold text-white/34">{point.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <p className="text-sm font-bold text-white/62">{copy.diagnostic}</p>
                <div className="mt-5 grid gap-2">
                  {active.segments.map((segment) => (
                    <div key={`${segment.segment}-${segment.indicator}`} className="grid grid-cols-[1fr_auto] gap-3 rounded-xl border border-white/10 bg-black/18 p-3">
                      <div>
                        <p className="text-sm font-bold text-white">{segment.segment}</p>
                        <p className="mt-1 text-xs font-semibold text-white/42">{segment.indicator}</p>
                      </div>
                      <span className={`h-fit rounded-full border px-3 py-1 text-xs font-bold ${toneStyle[segment.tone]}`}>
                        {segment.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <InsightPanel title={copy.insight} body={active.insight[locale]} />
              <InsightPanel title={copy.action} body={active.action[locale]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightPanel({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">{title}</p>
      <p className="mt-3 text-sm font-semibold leading-7 text-white/72">{body}</p>
    </div>
  );
}
