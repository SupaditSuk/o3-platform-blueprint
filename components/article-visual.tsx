import { ArrowUpRight, Bot, Boxes, Code2, FileText, Workflow } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type ArticleVisualProps = {
  slug: string;
  locale: Locale;
  compact?: boolean;
};

const levels = [
  {
    icon: FileText,
    th: "Generative Task Execution",
    en: "Generative Task Execution",
    roleTh: "ผู้ช่วยส่วนตัว",
    roleEn: "Personal assistant",
    tools: ["ChatGPT", "Claude", "Gemini", "Copilot"]
  },
  {
    icon: Bot,
    th: "Domain-Specific AI",
    en: "Domain-Specific AI",
    roleTh: "ผู้เชี่ยวชาญความรู้ HR",
    roleEn: "Knowledge specialist",
    tools: ["NotebookLM", "Perplexity", "Vertex AI"]
  },
  {
    icon: Workflow,
    th: "Agentic Workflow Automation",
    en: "Agentic Workflow Automation",
    roleTh: "ผู้จัดการ workflow",
    roleEn: "Workflow operator",
    tools: ["n8n", "Make", "Zapier", "Manus"]
  },
  {
    icon: Boxes,
    th: "Natural Language App Generation",
    en: "Natural Language App Generation",
    roleTh: "ผู้สร้าง prototype",
    roleEn: "Prototype builder",
    tools: ["AI Studio", "Lovable", "v0", "Bolt"]
  },
  {
    icon: Code2,
    th: "Autonomous Software Engineering",
    en: "Autonomous Software Engineering",
    roleTh: "คู่คิดด้าน engineering",
    roleEn: "Engineering partner",
    tools: ["Claude Code", "Codex", "Cursor", "Devin"]
  }
];

export function ArticleVisual({ slug, locale, compact = false }: ArticleVisualProps) {
  if (slug !== "ai-evolution-in-hr") {
    return <DefaultArticleVisual compact={compact} />;
  }

  const isThai = locale === "th";
  const headline = isThai ? "5 ระดับของ AI ในงาน HR" : "5 Levels of AI in HR";
  const subhead = isThai
    ? "จากผู้ช่วยเขียนงาน สู่เพื่อนร่วมทีมดิจิทัล"
    : "From writing assistant to digital teammate";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 ${
        compact ? "aspect-[16/9] p-5" : "p-5 sm:p-7"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(239,68,68,0.34),transparent_28%),linear-gradient(126deg,rgba(255,255,255,0.1),transparent_34%,rgba(255,255,255,0.04)_64%,transparent)]" />
      <div className="grain absolute inset-0 opacity-25" />
      <div className="absolute -right-24 top-8 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[72%] w-[44%] border-l border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-xs font-bold text-red-200">
            <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_18px_rgba(239,68,68,0.8)]" />
            {isThai ? "AI ในงาน HR" : "AI in HR"}
          </p>
          <span className="rounded-full border border-red-300/20 bg-red-400/10 px-3 py-1 text-xs font-bold text-red-100">
            5 Levels
          </span>
        </div>

        {compact ? (
          <div className="mt-6 grid h-[calc(100%-2.25rem)] grid-cols-[1fr_0.86fr] gap-5">
            <div className="flex min-w-0 flex-col justify-end">
              <p className="max-w-[11ch] text-balance text-3xl font-semibold leading-[1.03] tracking-[-0.055em] text-white sm:text-4xl">
                {headline}
              </p>
              <p className="mt-3 max-w-[21ch] text-xs font-semibold leading-5 text-white/58">{subhead}</p>
            </div>
            <div className="grid content-end gap-1.5">
              {levels.map((level, index) => {
                const Icon = level.icon;

                return (
                  <div
                    key={level.en}
                    className="grid grid-cols-[24px_1fr_auto] items-center gap-2 border-t border-white/10 py-1.5"
                  >
                    <div className={index === levels.length - 1 ? "grid h-6 w-6 place-items-center rounded-full bg-brand text-white" : "grid h-6 w-6 place-items-center rounded-full bg-white/10 text-white/72"}>
                      <Icon size={12} aria-hidden="true" />
                    </div>
                    <p className="truncate text-[10px] font-bold text-white/76">{isThai ? level.roleTh : level.roleEn}</p>
                    <p className="text-[10px] font-bold text-red-200">L{index + 1}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-7 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div className="min-w-0">
              <p className="text-balance text-[clamp(2.4rem,7vw,5.2rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-white">
                {headline}
              </p>
              <p className="mt-5 max-w-md text-base font-semibold leading-7 text-white/64">{subhead}</p>
              <div className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-bold text-neutral-950">
                {isThai ? "อ่านเป็น framework" : "Read as a framework"}
                <ArrowUpRight size={16} aria-hidden="true" />
              </div>
            </div>
            <div className="grid gap-2.5">
              {levels.map((level, index) => {
                const Icon = level.icon;
                const isPeak = index === levels.length - 1;

                return (
                  <div
                    key={level.en}
                    className={`grid gap-3 border border-white/10 p-3 transition-colors sm:grid-cols-[44px_1fr_0.8fr] sm:items-center ${
                      isPeak ? "bg-red-500/[0.14]" : "bg-white/[0.045]"
                    }`}
                  >
                    <div className={isPeak ? "grid h-10 w-10 place-items-center rounded-full bg-brand text-white" : "grid h-10 w-10 place-items-center rounded-full bg-white text-neutral-950"}>
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white/38">Level {index + 1}</p>
                      <h3 className="mt-1 truncate text-sm font-semibold text-white sm:text-base">{isThai ? level.th : level.en}</h3>
                      <p className="mt-1 text-xs font-semibold text-red-100/72">{isThai ? level.roleTh : level.roleEn}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {level.tools.slice(0, 3).map((tool) => (
                        <span key={tool} className="rounded-full border border-white/10 bg-black/22 px-2.5 py-1 text-[10px] font-bold text-white/68">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DefaultArticleVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 ${compact ? "aspect-[16/9]" : "min-h-[300px]"}`}>
      <div className="absolute inset-0 hero-texture opacity-70" />
      <div className="grain absolute inset-0 opacity-35" />
      <div className="absolute bottom-[24%] right-[22%] h-12 w-5 bg-white/80" />
    </div>
  );
}
