"use client";

import { ArrowRight, Bot, Boxes, Code2, FileText, Sparkles, Workflow } from "lucide-react";
import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";

type LevelKey = 1 | 2 | 3 | 4 | 5;

type Level = {
  key: LevelKey;
  icon: typeof FileText;
  title: Record<Locale, string>;
  role: Record<Locale, string>;
  useCases: Record<Locale, string[]>;
  workflow: Record<Locale, string[]>;
  takeaway: Record<Locale, string>;
  tools: string[];
};

const levels: Level[] = [
  {
    key: 1,
    icon: FileText,
    title: { th: "Generative Task Execution", en: "Generative Task Execution" },
    role: { th: "ผู้ช่วยส่วนตัว", en: "Personal assistant" },
    useCases: {
      th: ["ร่างประกาศและอีเมล", "สรุปประชุม", "แปลและปรับข้อความ", "ทำโครง presentation"],
      en: ["Draft announcements", "Summarize meetings", "Translate and refine copy", "Shape presentation outlines"]
    },
    workflow: {
      th: ["ตั้งโจทย์การสื่อสาร", "ให้ AI ช่วยร่าง", "HR ตรวจความถูกต้องและน้ำเสียง"],
      en: ["Frame the communication task", "Let AI draft the first version", "HR reviews accuracy and tone"]
    },
    takeaway: {
      th: "เริ่มจากงานสื่อสารที่ทำซ้ำบ่อย เพื่อเพิ่มความเร็วโดยยังรักษาคุณภาพของข้อความ",
      en: "Start with repeatable communication work, then use human review to protect accuracy and tone."
    },
    tools: ["ChatGPT", "Claude", "Gemini", "Copilot"]
  },
  {
    key: 2,
    icon: Bot,
    title: { th: "Domain-Specific AI", en: "Domain-Specific AI" },
    role: { th: "ผู้เชี่ยวชาญความรู้ HR", en: "HR knowledge specialist" },
    useCases: {
      th: ["วิเคราะห์ employee survey", "อ่าน exit interview", "สร้าง HR knowledge base", "ทำ research และ benchmark"],
      en: ["Analyze employee surveys", "Review exit interviews", "Build an HR knowledge base", "Research and benchmark"]
    },
    workflow: {
      th: ["รวบรวมข้อมูลและเอกสาร", "ให้ AI สังเคราะห์ pattern", "แปลง insight เป็นคำถามธุรกิจ"],
      en: ["Collect documents and evidence", "Let AI synthesize patterns", "Turn insight into business questions"]
    },
    takeaway: {
      th: "คุณค่าจะเพิ่มขึ้นเมื่อ AI ได้รับ context ที่ถูกต้อง ไม่ใช่แค่ prompt ที่สวย",
      en: "The value rises when AI has the right context, not just a better prompt."
    },
    tools: ["NotebookLM", "Perplexity", "Vertex AI"]
  },
  {
    key: 3,
    icon: Workflow,
    title: { th: "Agentic Workflow Automation", en: "Agentic Workflow Automation" },
    role: { th: "ผู้จัดการ workflow", en: "Workflow operator" },
    useCases: {
      th: ["คัดกรองผู้สมัคร", "HR reporting อัตโนมัติ", "เชื่อม HRIS ไป dashboard", "notification และ approval"],
      en: ["Screen candidates", "Automate HR reporting", "Connect HRIS to dashboards", "Trigger notifications and approvals"]
    },
    workflow: {
      th: ["วาด process ปัจจุบัน", "ตัดงานซ้ำที่ไม่จำเป็น", "ให้ agent ทำงานตามเงื่อนไข"],
      en: ["Map the current process", "Remove low-value repetition", "Let agents run conditional steps"]
    },
    takeaway: {
      th: "อย่า automate process ที่ยังไม่คม ควรออกแบบงานใหม่ก่อนให้ AI ทำแทน",
      en: "Do not automate a weak process. Redesign the work before asking AI to run it."
    },
    tools: ["n8n", "Make", "Zapier", "Manus"]
  },
  {
    key: 4,
    icon: Boxes,
    title: { th: "Natural Language App Generation", en: "Natural Language App Generation" },
    role: { th: "ผู้สร้าง prototype", en: "Prototype builder" },
    useCases: {
      th: ["Workforce Planning App", "HR Analytics Dashboard", "Career Path Simulator", "Internal HR Service Portal"],
      en: ["Workforce planning app", "HR analytics dashboard", "Career path simulator", "Internal HR service portal"]
    },
    workflow: {
      th: ["เขียน requirement เป็นภาษาคน", "สร้าง prototype", "ให้ผู้ใช้ลองก่อนลงทุนต่อ"],
      en: ["Write requirements in plain language", "Generate a working prototype", "Test with users before scaling"]
    },
    takeaway: {
      th: "สิ่งที่เคยต้องรอหลายสัปดาห์ สามารถกลายเป็น prototype ที่ทดสอบได้ในไม่กี่ชั่วโมง",
      en: "Ideas that used to wait for weeks can become testable prototypes in hours."
    },
    tools: ["AI Studio", "Lovable", "v0", "Bolt"]
  },
  {
    key: 5,
    icon: Code2,
    title: { th: "Autonomous Software Engineering", en: "Autonomous Software Engineering" },
    role: { th: "คู่คิดด้าน engineering", en: "Engineering partner" },
    useCases: {
      th: ["เขียนและ review code", "debug application", "สร้าง data solution", "เร่ง prototype ให้ใช้จริง"],
      en: ["Write and review code", "Debug applications", "Build data solutions", "Move prototypes closer to production"]
    },
    workflow: {
      th: ["นิยามโจทย์ธุรกิจ", "แยก logic และข้อมูลที่ต้องใช้", "ใช้ AI ช่วยสร้างและตรวจ solution"],
      en: ["Define the business problem", "Separate logic and data requirements", "Use AI to build and review the solution"]
    },
    takeaway: {
      th: "HR ไม่จำเป็นต้องกลายเป็น programmer แต่ต้องอธิบายโจทย์ธุรกิจ ข้อมูล และผลลัพธ์ให้คมพอ",
      en: "HR does not need to become a programmer, but must frame the business, data, and outcome clearly."
    },
    tools: ["Claude Code", "Codex", "Cursor", "Devin"]
  }
];

const copy = {
  th: {
    eyebrow: "Interactive demo",
    title: "สำรวจ 5 ระดับของ AI ในงาน HR",
    body: "กดแต่ละระดับเพื่อดูว่า AI ขยับจากผู้ช่วยเขียนงาน ไปสู่เพื่อนร่วมทีมดิจิทัลได้อย่างไร",
    useCases: "ตัวอย่างงาน HR",
    workflow: "workflow ที่ควรคิด",
    tools: "เครื่องมือที่พบในระดับนี้",
    takeaway: "ประเด็นสำคัญ",
    maturity: "AI maturity",
    start: "เริ่มจาก",
    next: "ไปต่อที่"
  },
  en: {
    eyebrow: "Interactive demo",
    title: "Explore the 5 levels of AI in HR",
    body: "Select each level to see how AI moves from writing assistant to digital teammate.",
    useCases: "HR use cases",
    workflow: "Workflow to consider",
    tools: "Tools at this level",
    takeaway: "Key takeaway",
    maturity: "AI maturity",
    start: "Start with",
    next: "Move toward"
  }
} satisfies Record<Locale, Record<string, string>>;

type AiEvolutionExplorerProps = {
  locale: Locale;
};

export function AiEvolutionExplorer({ locale }: AiEvolutionExplorerProps) {
  const [selected, setSelected] = useState<LevelKey>(3);
  const t = copy[locale];
  const active = useMemo(() => levels.find((level) => level.key === selected) ?? levels[0], [selected]);
  const Icon = active.icon;
  const progress = (active.key / levels.length) * 100;

  return (
    <section className="motion-reveal overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-950 text-white shadow-soft">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative border-b border-white/10 p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(239,68,68,0.22),transparent_26%)]" />
          <div className="grain absolute inset-0 opacity-20" />
          <div className="relative">
            <p className="flex items-center gap-2 text-sm font-bold text-coral">
              <Sparkles size={16} aria-hidden="true" />
              {t.eyebrow}
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
              {t.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm font-semibold leading-7 text-white/62">{t.body}</p>

            <div className="mt-8 grid gap-2">
              {levels.map((level) => {
                const LevelIcon = level.icon;
                const isActive = level.key === active.key;

                return (
                  <button
                    key={level.key}
                    type="button"
                    className={`grid grid-cols-[42px_1fr_auto] items-center gap-3 border p-3 text-left transition-colors ${
                      isActive
                        ? "border-red-400/40 bg-red-500/[0.14]"
                        : "border-white/10 bg-white/[0.035] text-white/62 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    }`}
                    onClick={() => setSelected(level.key)}
                  >
                    <span className={isActive ? "grid h-10 w-10 place-items-center rounded-full bg-brand text-white" : "grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white"}>
                      <LevelIcon size={18} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold text-white/42">Level {level.key}</span>
                      <span className="mt-1 block truncate text-sm font-semibold">{level.title[locale]}</span>
                    </span>
                    <ArrowRight
                      size={17}
                      className={`transition-transform ${isActive ? "translate-x-0 text-red-100" : "text-white/28"}`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-bold text-white/42">{t.maturity}</p>
              <h3 className="mt-3 text-balance text-4xl font-semibold leading-tight tracking-[-0.055em] sm:text-5xl">
                Level {active.key}
              </h3>
              <p className="mt-3 text-lg font-semibold text-red-100">{active.role[locale]}</p>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-neutral-950">
              <Icon size={24} aria-hidden="true" />
            </div>
          </div>

          <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
            <div className="h-full rounded-full bg-brand transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-7 grid gap-4">
            <InfoBlock title={t.useCases} items={active.useCases[locale]} />
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm font-bold text-white/46">{t.workflow}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {active.workflow[locale].map((step, index) => (
                  <div key={step} className="min-h-28 border border-white/10 bg-black/18 p-3">
                    <p className="text-xl font-semibold tracking-[-0.06em] text-red-100">0{index + 1}</p>
                    <p className="mt-3 text-sm font-semibold leading-6 text-white/72">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-red-400/20 bg-red-500/[0.08] p-4">
              <p className="text-sm font-bold text-red-100">{t.takeaway}</p>
              <p className="mt-3 text-sm font-semibold leading-7 text-white/76">{active.takeaway[locale]}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {active.tools.map((tool) => (
              <span key={tool} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-bold text-white/68">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-sm font-bold text-white/46">{title}</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-white/72">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
