"use client";

import { Bot, ChevronRight, Gauge, LineChart, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";

type SegmentKey = "sales" | "operations" | "digital";
type ViewKey = "retention" | "productivity" | "readiness";

type DataPoint = {
  month: string;
  retention: number;
  productivity: number;
  readiness: number;
};

const data: Record<SegmentKey, DataPoint[]> = {
  sales: [
    { month: "Jan", retention: 82, productivity: 68, readiness: 54 },
    { month: "Feb", retention: 84, productivity: 71, readiness: 57 },
    { month: "Mar", retention: 79, productivity: 66, readiness: 61 },
    { month: "Apr", retention: 87, productivity: 76, readiness: 68 },
    { month: "May", retention: 89, productivity: 79, readiness: 72 },
    { month: "Jun", retention: 91, productivity: 83, readiness: 76 }
  ],
  operations: [
    { month: "Jan", retention: 76, productivity: 72, readiness: 43 },
    { month: "Feb", retention: 78, productivity: 74, readiness: 46 },
    { month: "Mar", retention: 81, productivity: 77, readiness: 50 },
    { month: "Apr", retention: 80, productivity: 75, readiness: 55 },
    { month: "May", retention: 84, productivity: 81, readiness: 60 },
    { month: "Jun", retention: 86, productivity: 84, readiness: 64 }
  ],
  digital: [
    { month: "Jan", retention: 88, productivity: 75, readiness: 69 },
    { month: "Feb", retention: 90, productivity: 78, readiness: 73 },
    { month: "Mar", retention: 92, productivity: 82, readiness: 78 },
    { month: "Apr", retention: 89, productivity: 84, readiness: 82 },
    { month: "May", retention: 93, productivity: 87, readiness: 86 },
    { month: "Jun", retention: 94, productivity: 89, readiness: 90 }
  ]
};

const viewMeta: Record<ViewKey, { color: string; icon: typeof Gauge }> = {
  retention: { color: "oklch(var(--brand))", icon: UsersRound },
  productivity: { color: "oklch(var(--coral))", icon: Gauge },
  readiness: { color: "oklch(0.76 0.13 86)", icon: Bot }
};

const copy = {
  th: {
    eyebrow: "Interactive demo",
    title: "ลองสำรวจอินไซต์จากข้อมูลคนตัวอย่าง",
    body: "เลือกทีมและมุมมองเพื่อดูว่า dashboard ขนาดเล็กสามารถเปลี่ยนตัวเลขให้กลายเป็นคำถามทางธุรกิจได้อย่างไร",
    segments: {
      sales: "ฝ่ายขาย",
      operations: "ปฏิบัติการ",
      digital: "ดิจิทัล"
    },
    views: {
      retention: "Retention",
      productivity: "Productivity",
      readiness: "AI Readiness"
    },
    score: "คะแนนล่าสุด",
    points: "คะแนน",
    trend: "แนวโน้ม 6 เดือน",
    ai: "AI summary",
    prompt: "คำถามที่ควรถามต่อ",
    prompts: {
      retention: "ทีมไหนมีสัญญาณเสี่ยงลาออก และมีปัจจัยอะไรที่ควรดูเพิ่ม?",
      productivity: "งานส่วนไหนใช้เวลามากแต่สร้างผลลัพธ์ต่ำกว่าที่ควร?",
      readiness: "กลุ่มไหนพร้อมเริ่มใช้ AI และควรเริ่มจาก use case อะไร?"
    },
    summaries: {
      retention: "Retention ดีขึ้นต่อเนื่อง แต่ควรแยกดู role สำคัญและกลุ่มพนักงานใหม่ เพื่อป้องกันการเสียคนก่อนส่งผลต่อธุรกิจ",
      productivity: "Productivity ขยับขึ้นชัดในช่วงท้าย แปลว่าทีมอาจตอบสนองดีต่อการปรับ process หรือเครื่องมือใหม่",
      readiness: "AI readiness เพิ่มขึ้นเร็ว เหมาะกับการเริ่ม pilot เล็ก ๆ และวัดผลจากเวลาที่ลดลงกับคุณภาพงานที่ดีขึ้น"
    }
  },
  en: {
    eyebrow: "Interactive demo",
    title: "Explore sample workforce insights",
    body: "Choose a team and a lens to see how a small dashboard turns numbers into better business questions.",
    segments: {
      sales: "Sales",
      operations: "Operations",
      digital: "Digital"
    },
    views: {
      retention: "Retention",
      productivity: "Productivity",
      readiness: "AI Readiness"
    },
    score: "Latest score",
    points: "pts",
    trend: "6-month trend",
    ai: "AI summary",
    prompt: "Next question",
    prompts: {
      retention: "Which roles show early attrition risk, and what signals should HR inspect next?",
      productivity: "Which work patterns consume time without creating enough business value?",
      readiness: "Which group is ready for AI adoption, and which use case should start first?"
    },
    summaries: {
      retention: "Retention is improving, but critical roles and new hires need a closer cut before people risk becomes business risk.",
      productivity: "Productivity rises late in the period, suggesting the team may be responding to process improvements or better tools.",
      readiness: "AI readiness is accelerating. Start with a small pilot and measure time saved alongside output quality."
    }
  }
} satisfies Record<Locale, unknown>;

type PeopleAnalyticsLabProps = {
  locale: Locale;
};

export function PeopleAnalyticsLab({ locale }: PeopleAnalyticsLabProps) {
  const [segment, setSegment] = useState<SegmentKey>("digital");
  const [view, setView] = useState<ViewKey>("readiness");
  const t = copy[locale];
  const series = data[segment];
  const meta = viewMeta[view];
  const Icon = meta.icon;

  const values = useMemo(() => series.map((point) => point[view]), [series, view]);
  const latest = values[values.length - 1];
  const previous = values[values.length - 2];
  const delta = latest - previous;
  const path = values
    .map((value, index) => {
      const x = 16 + index * (268 / (values.length - 1));
      const y = 136 - value * 1.16;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <section className="motion-reveal overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-950 text-white shadow-soft">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-white/10 p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <p className="text-sm font-bold text-coral">{t.eyebrow}</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-white/62">{t.body}</p>

          <div className="mt-7 grid gap-3">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(t.segments) as SegmentKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                    segment === key ? "bg-white text-neutral-950" : "border border-white/10 text-white/62 hover:bg-white/[0.06] hover:text-white"
                  }`}
                  onClick={() => setSegment(key)}
                >
                  {t.segments[key]}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(t.views) as ViewKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                    view === key ? "bg-brand text-white" : "border border-white/10 text-white/62 hover:bg-white/[0.06] hover:text-white"
                  }`}
                  onClick={() => setView(key)}
                >
                  {t.views[key]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-500/[0.08] p-4">
            <div className="flex items-center gap-3 text-red-100">
              <Bot size={18} aria-hidden="true" />
              <p className="text-sm font-bold">{t.ai}</p>
            </div>
            <p className="mt-3 text-sm font-semibold leading-7 text-white/72">{t.summaries[view]}</p>
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-xs font-bold text-white/40">{t.prompt}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-white/76">{t.prompts[view]}</p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-white/42">{t.score}</p>
              <div className="mt-2 flex items-end gap-3">
                <p className="text-6xl font-semibold tracking-[-0.08em]">{latest}</p>
                <p className={`mb-2 text-sm font-bold ${delta >= 0 ? "text-emerald-300" : "text-red-300"}`}>
                  {delta >= 0 ? "+" : ""}
                  {delta} {t.points}
                </p>
              </div>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-neutral-950">
              <Icon size={22} aria-hidden="true" />
            </div>
          </div>

          <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-white/74">{t.trend}</p>
              <LineChart size={18} className="text-coral" aria-hidden="true" />
            </div>
            <svg viewBox="0 0 304 150" className="h-48 w-full overflow-visible" role="img" aria-label={`${t.views[view]} ${t.trend}`}>
              {[35, 55, 75, 95].map((line) => (
                <line key={line} x1="16" x2="288" y1={136 - line * 1.16} y2={136 - line * 1.16} stroke="rgba(255,255,255,0.08)" />
              ))}
              <path d={path} fill="none" stroke={meta.color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              {series.map((point, index) => {
                const x = 16 + index * (268 / (series.length - 1));
                const y = 136 - point[view] * 1.16;

                return (
                  <g key={point.month}>
                    <circle cx={x} cy={y} r="5" fill="white" stroke={meta.color} strokeWidth="3" />
                    <text x={x} y="148" textAnchor="middle" className="fill-white/45 text-[10px] font-bold">
                      {point.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {series.slice(-3).map((point) => (
              <div key={point.month} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-bold text-white/42">{point.month}</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.06em]">{point[view]}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${point[view]}%` }} />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 flex items-center gap-2 text-xs font-bold text-white/40">
            Mock data
            <ChevronRight size={14} aria-hidden="true" />
            O³ ZONE People Analytics Lab
          </p>
        </div>
      </div>
    </section>
  );
}
