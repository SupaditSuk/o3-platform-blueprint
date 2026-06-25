import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  ClipboardCheck,
  Database,
  GraduationCap,
  MessageSquare,
  Radar,
  Scale,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";
import { Nav } from "@/components/nav";
import { SectionBadge } from "@/components/section-badge";
import { TextRollButton } from "@/components/text-roll-button";
import type { Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Services & Solutions | O³ ZONE",
    description:
      locale === "th"
        ? "เปลี่ยน People Data ให้เป็น Business Outcomes — เลือกจุดเริ่มต้นจากปัญหาของคุณ: Understand, Measure, Improve, Transform, Benchmark"
        : "Turn people data into business outcomes — start from your problem: Understand, Measure, Improve, Transform, Benchmark."
  };
}

type Bi = Record<Locale, string>;

// ---- 1. Outcome-based starting points (Observe → Optimize → Outcome) ----
const OUTCOMES: Array<{ icon: typeof Radar; step: string; title: Bi; desc: Bi; items: Bi; href: (l: Locale) => string; cta: Bi }> = [
  {
    icon: Radar,
    step: "01",
    title: { th: "เข้าใจองค์กร", en: "Understand" },
    desc: { th: "รู้สุขภาพคนและความเสี่ยงก่อนลงทุนทำระบบ", en: "Know your workforce health and risks before investing in systems." },
    items: { th: "HR Health Check · Workforce Productivity Check · AI Readiness Check", en: "HR Health Check · Workforce Productivity Check · AI Readiness Check" },
    href: (l) => `/${l}/assessment/hr-health-check`,
    cta: { th: "เริ่มประเมินฟรี", en: "Start free assessment" }
  },
  {
    icon: BarChart3,
    step: "02",
    title: { th: "วัดผลด้วยข้อมูล", en: "Measure" },
    desc: { th: "เปลี่ยนข้อมูลที่มีอยู่ให้เป็น Dashboard และ Insight", en: "Turn the data you already have into dashboards and insight." },
    items: { th: "Workforce Intelligence Platform · Survey Studio · Dashboard Starter", en: "Workforce Intelligence Platform · Survey Studio · Dashboard Starter" },
    href: (l) => `/${l}/workforce`,
    cta: { th: "ลอง Dashboard ฟรี", en: "Try the dashboard free" }
  },
  {
    icon: Sparkles,
    step: "03",
    title: { th: "ปรับปรุงด้วย AI", en: "Improve" },
    desc: { th: "ใช้ AI ช่วยลดงาน manual และยกคุณภาพงาน HR ประจำวัน", en: "Use AI to cut manual work and raise the quality of daily HR tasks." },
    items: { th: "Workforce AI Studio (รวม Labor Law) · Process Toolkit", en: "Workforce AI Studio (incl. Labor Law) · Process Toolkit" },
    href: (l) => `/${l}/services#products`,
    cta: { th: "ดูเครื่องมือ", en: "See the tools" }
  },
  {
    icon: Workflow,
    step: "04",
    title: { th: "ทรานส์ฟอร์ม", en: "Transform" },
    desc: { th: "ปรับ HR Operating Model, Workforce Planning และ AI Roadmap", en: "Reshape the HR operating model, workforce planning, and AI roadmap." },
    items: { th: "HR Transformation · Workforce Planning · AI Readiness Consulting", en: "HR Transformation · Workforce Planning · AI Readiness Consulting" },
    href: (l) => `/${l}/services#consulting`,
    cta: { th: "ดูบริการที่ปรึกษา", en: "See consulting" }
  },
  {
    icon: Database,
    step: "05",
    title: { th: "เทียบกับตลาด", en: "Benchmark" },
    desc: { th: "เทียบ HR ของคุณกับอุตสาหกรรม ขนาดองค์กร และพื้นที่ (เร็วๆ นี้)", en: "Compare your HR against industry, company size, and region (soon)." },
    items: { th: "Benchmark Center · Salary / Turnover / Productivity Benchmark", en: "Benchmark Center · Salary / Turnover / Productivity Benchmark" },
    href: (l) => `/${l}/services#products`,
    cta: { th: "ดูรายละเอียด", en: "Learn more" }
  }
];

// ---- 2. Products & platforms ----
const PRODUCTS: Array<{ icon: typeof BarChart3; name: Bi; desc: Bi; status: Bi; live: boolean; note?: Bi; href?: (l: Locale) => string }> = [
  {
    icon: BarChart3,
    name: { th: "Workforce Intelligence Platform", en: "Workforce Intelligence Platform" },
    desc: {
      th: "เปลี่ยนข้อมูล HR เป็น Dashboard, AI Analytics, Forecast และ Benchmark — กรอก Template มาตรฐานแล้วได้ Insight อัตโนมัติ",
      en: "Turn HR data into dashboards, AI analytics, forecast, and benchmark — fill a standard template and get insight automatically."
    },
    status: { th: "เปิดให้ลองฟรี", en: "Free to try" },
    live: true,
    href: (l) => `/${l}/workforce`
  },
  {
    icon: MessageSquare,
    name: { th: "Survey Studio", en: "Survey Studio" },
    desc: {
      th: "Engagement / Employee Experience / Pulse / Exit Survey พร้อมวิเคราะห์ธีมและ driver ด้วย AI",
      en: "Engagement, experience, pulse, and exit surveys with AI theme and driver analysis."
    },
    status: { th: "เร็วๆ นี้", en: "Coming soon" },
    live: false
  },
  {
    icon: Sparkles,
    name: { th: "Workforce AI Studio", en: "Workforce AI Studio" },
    desc: {
      th: "ชุดเครื่องมือ AI ช่วยออกแบบงานคน — JD, KPI, Competency, Career Path, สัมภาษณ์, เอกสาร HR และผู้ช่วยกฎหมายแรงงาน — แบบ Decision Support",
      en: "AI tools to design HR work — JDs, KPIs, competencies, career paths, interviews, HR documents, and a labor-law assistant — as decision support."
    },
    status: { th: "เร็วๆ นี้", en: "Coming soon" },
    live: false,
    note: {
      th: "7 studio: Talent / Performance / Organization / Workforce Planning / Reward / HR Document / Labor Law Knowledge — ช่วยร่างและวิเคราะห์ ไม่ตัดสินใจแทน HR · ส่วน Labor Law เป็นข้อมูลเพื่อการศึกษา ไม่ใช่คำปรึกษากฎหมาย",
      en: "7 studios: Talent / Performance / Organization / Workforce Planning / Reward / HR Document / Labor Law Knowledge — assists, never decides for HR; the Labor Law part is for education, not legal advice."
    }
  },
  {
    icon: GraduationCap,
    name: { th: "O³ Academy", en: "O³ Academy" },
    desc: {
      th: "คอร์สและเวิร์กช็อป Data-Driven HR และ AI for HR สำหรับ HR ผู้บริหาร และ SME",
      en: "Data-Driven HR and AI-for-HR courses and workshops for HR, executives, and SMEs."
    },
    status: { th: "เปิดแล้ว", en: "Available" },
    live: true,
    href: (l) => `/${l}/courses`
  }
];

// ---- 3. Consulting services ----
const CONSULTING: Array<{ name: Bi; uses: Bi; desc: Bi }> = [
  { name: { th: "Workforce Intelligence Consulting", en: "Workforce Intelligence Consulting" }, uses: { th: "Workforce Intelligence Platform", en: "Workforce Intelligence Platform" }, desc: { th: "Dashboard, People KPI, วิเคราะห์ Turnover/Recruitment, Executive Report", en: "Dashboards, people KPIs, turnover/recruitment analysis, executive reports" } },
  { name: { th: "Employee Experience Consulting", en: "Employee Experience Consulting" }, uses: { th: "Survey Studio", en: "Survey Studio" }, desc: { th: "ออกแบบ Engagement Survey, EX Journey, Heatmap, Action Plan", en: "Engagement survey design, EX journey, heatmaps, action plans" } },
  { name: { th: "Workforce Design Consulting", en: "Workforce Design Consulting" }, uses: { th: "Workforce AI Studio", en: "Workforce AI Studio" }, desc: { th: "JD, Competency, KPI, Career Path, Job Architecture", en: "JDs, competencies, KPIs, career paths, job architecture" } },
  { name: { th: "Workforce Planning Consulting", en: "Workforce Planning Consulting" }, uses: { th: "Workforce Intelligence Platform", en: "Workforce Intelligence Platform" }, desc: { th: "Headcount Plan, Scenario, Labor Cost Forecast 3 ปี", en: "Headcount plans, scenarios, 3-year labor cost forecast" } },
  { name: { th: "AI Readiness & HR AI Adoption", en: "AI Readiness & HR AI Adoption" }, uses: { th: "Academy + Workforce AI Studio", en: "Academy + Workforce AI Studio" }, desc: { th: "AI Readiness, HR Use Case, Prompt Workshop, Governance", en: "AI readiness, HR use cases, prompt workshops, governance" } },
  { name: { th: "HR Transformation Advisory", en: "HR Transformation Advisory" }, uses: { th: "ทุก Product", en: "All products" }, desc: { th: "HR Operating Model, Process Redesign, Transformation Roadmap", en: "HR operating model, process redesign, transformation roadmap" } }
];

// ---- 4. Risk & trust ----
const TRUST: Array<{ icon: typeof ShieldCheck; title: Bi; desc: Bi }> = [
  {
    icon: ShieldCheck,
    title: { th: "Privacy by Design", en: "Privacy by Design" },
    desc: { th: "แนะนำให้ใช้รหัสพนักงานแทนชื่อจริง ไม่บังคับข้อมูลส่วนบุคคลที่ไม่จำเป็น", en: "We recommend employee IDs over real names and never force unnecessary personal data." }
  },
  {
    icon: Database,
    title: { th: "Anonymous Benchmark", en: "Anonymous Benchmark" },
    desc: { th: "Benchmark ใช้ข้อมูลนิรนามแบบรวม ขอความยินยอม และเลือก opt-in / opt-out ได้", en: "Benchmarks use aggregated anonymized data, with consent and opt-in / opt-out." }
  },
  {
    icon: Scale,
    title: { th: "Legal Disclaimer", en: "Legal Disclaimer" },
    desc: { th: "Labor Law Studio เป็น Knowledge Assistant เพื่อการศึกษา ไม่ใช่คำปรึกษากฎหมายอย่างเป็นทางการ", en: "Labor Law Studio is a knowledge assistant for education — not formal legal advice." }
  },
  {
    icon: Sparkles,
    title: { th: "AI Decision Support", en: "AI Decision Support" },
    desc: { th: "AI ช่วยวิเคราะห์และแนะนำ ไม่ตัดสินใจเรื่องคนแทน HR และอิงเฉพาะข้อมูลที่มี", en: "AI assists and recommends — it does not decide on people for HR, and relies only on available data." }
  }
];

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  const isThai = locale === "th";

  return (
    <main className="min-h-dvh bg-bg text-white">
      <Nav locale={locale} />
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <SectionBadge number="O³" label="Services & Solutions" light />
        <div className="mt-8 grid gap-7 lg:grid-cols-[0.95fr_0.6fr] lg:items-end">
          <h1 className="text-balance text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
            {isThai ? "เปลี่ยน People Data ให้เป็น Business Outcomes" : "Turn people data into business outcomes"}
          </h1>
          <p className="text-pretty text-base font-medium leading-[1.75] text-white/68">
            {isThai
              ? "เริ่มจากปัญหาของคุณ ไม่ใช่จากชื่อ Product — Observe → Optimize → Outcome ด้วย Dashboard, AI, Consulting และ Academy ที่ออกแบบสำหรับองค์กรไทย"
              : "Start from your problem, not a product name — Observe → Optimize → Outcome with dashboards, AI, consulting, and academy built for Thai organizations."}
          </p>
        </div>

        {/* 1. Choose your starting point */}
        <p className="mt-14 text-sm font-bold uppercase tracking-[0.18em] text-coral">{isThai ? "เลือกจุดเริ่มต้นของคุณ" : "Choose your starting point"}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((o) => {
            const Icon = o.icon;
            return (
              <Link
                key={o.step}
                href={o.href(locale)}
                className="motion-card group relative flex min-h-[230px] flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-6 transition-colors hover:border-red-300/30 hover:bg-white/[0.065]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(220,38,38,0.16),transparent_38%)] opacity-80" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-neutral-950">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <span className="text-2xl font-semibold text-white/22">{o.step}</span>
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold leading-tight tracking-[-0.04em]">{o.title[locale]}</h2>
                  <p className="mt-2 text-sm font-medium leading-7 text-white/64">{o.desc[locale]}</p>
                  <p className="mt-4 text-xs font-bold leading-6 text-white/44">{o.items[locale]}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-coral">
                    {o.cta[locale]} <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 2. Products & platforms */}
        <p id="products" className="mt-16 scroll-mt-24 text-sm font-bold uppercase tracking-[0.18em] text-coral">{isThai ? "Products & Platforms" : "Products & Platforms"}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => {
            const Icon = product.icon;
            const inner = (
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center justify-between gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-neutral-950">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${product.live ? "bg-emerald-300/15 text-emerald-200" : "bg-white/10 text-white/56"}`}>
                    {product.status[locale]}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight tracking-[-0.04em]">{product.name[locale]}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-white/64">{product.desc[locale]}</p>
                {product.note ? (
                  <p className="mt-3 rounded-xl border border-amber-300/20 bg-amber-400/[0.07] px-3 py-2 text-xs font-semibold leading-5 text-amber-200/90">
                    {product.note[locale]}
                  </p>
                ) : null}
                {product.live ? (
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-coral">
                    {isThai ? "เปิดใช้งาน" : "Open"} <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                ) : null}
              </div>
            );
            const cls = "motion-card group relative flex min-h-[230px] flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-6 transition-colors hover:border-red-300/30 hover:bg-white/[0.065]";
            return product.live && product.href ? (
              <Link key={product.name.en} href={product.href(locale)} className={cls}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(220,38,38,0.18),transparent_36%)] opacity-80" />
                {inner}
              </Link>
            ) : (
              <div key={product.name.en} className={cls}>{inner}</div>
            );
          })}
        </div>

        {/* 3. Consulting */}
        <p id="consulting" className="mt-16 scroll-mt-24 text-sm font-bold uppercase tracking-[0.18em] text-coral">{isThai ? "Consulting Services" : "Consulting Services"}</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {CONSULTING.map((item) => (
            <div key={item.name.en} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <h3 className="text-base font-bold tracking-[-0.02em]">{item.name[locale]}</h3>
              <p className="mt-2 text-sm font-medium leading-6 text-white/56">{item.desc[locale]}</p>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-coral/80">{isThai ? "ใช้ " : "Uses "}{item.uses[locale]}</p>
            </div>
          ))}
        </div>

        {/* 3.5 Strategic Data Asset */}
        <p className="mt-16 text-sm font-bold uppercase tracking-[0.18em] text-coral">{isThai ? "Strategic Data Asset" : "Strategic Data Asset"}</p>
        <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-6 md:flex md:items-start md:gap-6">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-neutral-950">
            <Database size={20} aria-hidden="true" />
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-semibold tracking-[-0.03em]">O³ Benchmark Center</h3>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/56">{isThai ? "เร็วๆ นี้" : "Coming soon"}</span>
            </div>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-white/64">
              {isThai
                ? "ไม่ใช่สินค้าที่ขายแยก แต่เป็นสินทรัพย์ข้อมูลระยะยาว — รวบรวมข้อมูลนิรนามจากผู้ใช้ฟรี เพื่อสร้าง Benchmark ของ Turnover, Salary, Productivity และ Engagement ตามอุตสาหกรรม ขนาดองค์กร และพื้นที่"
                : "Not a standalone product but a long-term data asset — aggregated anonymized data from free users builds benchmarks for turnover, salary, productivity, and engagement by industry, company size, and region."}
            </p>
            <p className="mt-3 rounded-xl border border-amber-300/20 bg-amber-400/[0.07] px-3 py-2 text-xs font-semibold leading-5 text-amber-200/90">
              {isThai ? "ใช้ข้อมูลระดับกลุ่มเท่านั้น ไม่เปิดเผยรายบริษัท และต้องได้รับความยินยอม (Consent)" : "Group-level data only, never per company, and only with consent."}
            </p>
          </div>
        </div>

        {/* 4. Risk & trust */}
        <p className="mt-16 text-sm font-bold uppercase tracking-[0.18em] text-coral">{isThai ? "Risk & Trust" : "Risk & Trust"}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.title.en} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <Icon className="text-coral" size={22} aria-hidden="true" />
                <h3 className="mt-4 text-base font-bold tracking-[-0.02em]">{t.title[locale]}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-white/56">{t.desc[locale]}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-sm font-bold text-coral">{isThai ? "ยังไม่แน่ใจว่าจะเริ่มตรงไหน" : "Not sure where to start"}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
              {isThai ? "เริ่มจาก HR Health Check ฟรี หรือคุยกับทีม" : "Start with a free HR Health Check, or talk to the team"}
            </h2>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 md:mt-0">
            <TextRollButton href={`/${locale}/assessment/hr-health-check`} className="w-fit">
              {isThai ? "เริ่มประเมินฟรี" : "Start free assessment"}
            </TextRollButton>
            <Link href={`/${locale}/contact`} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-bold text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white">
              {isThai ? "คุยกับทีม" : "Talk to the team"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
