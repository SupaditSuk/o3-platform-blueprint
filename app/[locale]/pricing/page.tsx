import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
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
    title: "Pricing | O³ ZONE",
    description:
      locale === "th"
        ? "แพ็กเกจ O³ ZONE — Free, Starter, Growth, Business และ Enterprise สำหรับ SME และองค์กรไทย"
        : "O³ ZONE plans — Free, Starter, Growth, Business, and Enterprise for Thai SMEs and organizations."
  };
}

type Bi = Record<Locale, string>;

type Tier = {
  name: string;
  price: Bi;
  period?: Bi;
  tagline: Bi;
  who: Bi;
  features: Bi[];
  cta: Bi;
  href: (l: Locale) => string;
  popular?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Free",
    price: { th: "฿0", en: "฿0" },
    tagline: { th: "เข้าใจตัวเอง", en: "Understand yourself" },
    who: { th: "SME ที่อยากเริ่มลอง", en: "SMEs getting started" },
    features: [
      { th: "Dashboard Lite (Template Employee Master)", en: "Dashboard Lite (Employee Master template)" },
      { th: "แบบประเมิน HR ฟรีทั้ง 3 ชุด", en: "All 3 free HR assessments" },
      { th: "AI Analytics 3 คำถาม/วัน", en: "AI Analytics, 3 questions/day" },
      { th: "ประมวลผลในเบราว์เซอร์ · ยังไม่มี Benchmark / Survey เต็ม", en: "Browser processing · no Benchmark / full Survey yet" }
    ],
    cta: { th: "เริ่มฟรี", en: "Start free" },
    href: (l) => `/${l}/workforce`
  },
  {
    name: "Starter",
    price: { th: "฿1,990", en: "฿1,990" },
    period: { th: "/เดือน", en: "/mo" },
    tagline: { th: "วัดผลกำลังคน", en: "Measure workforce" },
    who: { th: "SME 50–200 คน", en: "SMEs of 50–200" },
    features: [
      { th: "ทุกอย่างใน Free", en: "Everything in Free" },
      { th: "Dashboard หลักครบทุกโมดูลพื้นฐาน", en: "Full core dashboard modules" },
      { th: "AI Insight (จำกัด) + Export report", en: "AI insight (limited) + report export" },
      { th: "3 users", en: "3 users" }
    ],
    cta: { th: "สนใจ Starter", en: "Choose Starter" },
    href: (l) => `/${l}/contact?interest=plan_starter`
  },
  {
    name: "Growth",
    popular: true,
    price: { th: "฿5,990", en: "฿5,990" },
    period: { th: "/เดือน", en: "/mo" },
    tagline: { th: "ปรับปรุงกำลังคน", en: "Improve workforce" },
    who: { th: "องค์กร 200–800 คน", en: "Organizations of 200–800" },
    features: [
      { th: "ทุกอย่างใน Starter", en: "Everything in Starter" },
      { th: "Survey Studio + Forecast (basic)", en: "Survey Studio + Forecast (basic)" },
      { th: "Benchmark (basic)", en: "Benchmark (basic)" },
      { th: "AI Analytics ไม่จำกัด + Workforce AI Studio บางโมดูล", en: "Unlimited AI Analytics + select AI Studio modules" }
    ],
    cta: { th: "สนใจ Growth", en: "Choose Growth" },
    href: (l) => `/${l}/contact?interest=plan_growth`
  },
  {
    name: "Business",
    price: { th: "฿14,990", en: "฿14,990" },
    period: { th: "/เดือน", en: "/mo" },
    tagline: { th: "เทียบกับตลาด", en: "Benchmark workforce" },
    who: { th: "องค์กรขนาดกลาง", en: "Mid-size organizations" },
    features: [
      { th: "ทุกอย่างใน Growth", en: "Everything in Growth" },
      { th: "Advanced Benchmark + Multi-dashboard", en: "Advanced benchmark + multi-dashboard" },
      { th: "Workforce AI Studio ครบทุกโมดูล + Team access", en: "Full Workforce AI Studio + team access" },
      { th: "Priority support", en: "Priority support" }
    ],
    cta: { th: "สนใจ Business", en: "Choose Business" },
    href: (l) => `/${l}/contact?interest=plan_business`
  }
];

const ENTERPRISE = {
  price: { th: "Custom / ฿25,000+", en: "Custom / ฿25,000+" },
  tagline: { th: "ทรานส์ฟอร์มองค์กร", en: "Transform workforce" },
  who: { th: "องค์กรใหญ่ / กลุ่มบริษัท", en: "Large organizations / groups" },
  features: { th: "Custom Data Model · Implementation · Advisory Retainer · Advanced Governance · Custom Reports · Security/SSO", en: "Custom data model · implementation · advisory retainer · advanced governance · custom reports · security/SSO" }
};

export default async function PricingPage({ params }: PageProps) {
  const { locale } = await params;
  const isThai = locale === "th";

  return (
    <main className="min-h-dvh bg-bg text-white">
      <Nav locale={locale} />
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <SectionBadge number="O³" label="Pricing" light />
        <div className="mt-8 grid gap-7 lg:grid-cols-[0.95fr_0.6fr] lg:items-end">
          <h1 className="text-balance text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
            {isThai ? "เริ่มฟรี แล้วค่อยโตตามองค์กร" : "Start free, scale as you grow"}
          </h1>
          <p className="text-pretty text-base font-medium leading-[1.75] text-white/68">
            {isThai
              ? "เริ่มจากเครื่องมือฟรี แล้วอัปเกรดเมื่ออยากได้ Survey, Forecast, Benchmark และ AI เชิงลึก — ราคาช่วงเปิดตัวอาจปรับได้"
              : "Begin with the free tools, then upgrade for surveys, forecast, benchmark, and deeper AI — launch pricing may change."}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-[1.35rem] border p-6 ${
                tier.popular ? "border-coral/50 bg-white/[0.06]" : "border-white/10 bg-white/[0.035]"
              }`}
            >
              {tier.popular ? (
                <span className="absolute right-5 top-6 rounded-full bg-coral px-2.5 py-1 text-[11px] font-bold text-white">
                  {isThai ? "ยอดนิยม" : "Popular"}
                </span>
              ) : null}
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">{tier.name}</p>
              <p className="mt-1 text-[13px] font-semibold text-white/72">{tier.tagline[locale]}</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-3xl font-semibold tracking-[-0.04em]">{tier.price[locale]}</span>
                {tier.period ? <span className="pb-1 text-sm font-semibold text-white/50">{tier.period[locale]}</span> : null}
              </div>
              <p className="mt-2 text-sm font-semibold text-white/56">{tier.who[locale]}</p>
              <ul className="mt-6 grid flex-1 gap-3">
                {tier.features.map((f) => (
                  <li key={f.en} className="flex items-start gap-2.5 text-sm font-medium leading-6 text-white/72">
                    <Check size={16} className="mt-0.5 shrink-0 text-coral" aria-hidden="true" />
                    {f[locale]}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href(locale)}
                className={`mt-7 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-bold transition-colors ${
                  tier.popular ? "bg-brand text-white hover:bg-coral" : "border border-white/15 text-white/80 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {tier.cta[locale]} <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>

        {/* Enterprise */}
        <div className="mt-4 rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-6 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">Enterprise</p>
            <p className="mt-1 text-[13px] font-semibold text-white/72">{ENTERPRISE.tagline[locale]}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">{ENTERPRISE.price[locale]}</h2>
            <p className="mt-2 text-sm font-semibold text-white/56">{ENTERPRISE.who[locale]}</p>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-white/64">{ENTERPRISE.features[locale]}</p>
          </div>
          <Link
            href={`/${locale}/contact?interest=plan_enterprise`}
            className="mt-5 inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-bold text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white md:mt-0"
          >
            {isThai ? "คุยกับทีม" : "Talk to the team"} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Note + consulting + CTA */}
        <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_0.7fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
            <h3 className="text-base font-bold tracking-[-0.02em]">{isThai ? "อยากได้ผลลัพธ์เร็ว ไม่อยากทำเอง?" : "Want results faster, hands-off?"}</h3>
            <p className="mt-2 text-sm font-medium leading-7 text-white/56">
              {isThai
                ? "มีบริการ Consulting แบบโปรเจกต์ (Dashboard setup, Survey, HR Transformation) ฿30k–500k ตามขอบเขตงาน"
                : "Project-based consulting (dashboard setup, survey, HR transformation) is available at ฿30k–500k depending on scope."}
            </p>
            <Link href={`/${locale}/services#consulting`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-coral">
              {isThai ? "ดูบริการที่ปรึกษา" : "See consulting"} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="rounded-2xl border border-red-300/20 bg-red-500/[0.07] p-6">
            <h3 className="text-base font-bold tracking-[-0.02em]">{isThai ? "ยังไม่แน่ใจว่าควรเริ่มแพ็กไหน" : "Not sure which plan"}</h3>
            <p className="mt-2 text-sm font-medium leading-7 text-white/56">
              {isThai ? "เริ่มจาก HR Health Check ฟรี แล้วเราช่วยแนะนำ" : "Start with a free HR Health Check and we'll guide you."}
            </p>
            <TextRollButton href={`/${locale}/assessment/hr-health-check`} className="mt-5 w-fit">
              {isThai ? "เริ่มประเมินฟรี" : "Start free assessment"}
            </TextRollButton>
          </div>
        </div>
      </section>
    </main>
  );
}
