import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Briefcase,
  ClipboardCheck,
  GraduationCap,
  Sparkles
} from "lucide-react";
import { HomeScrollSnap } from "@/components/home-scroll-snap";
import { Nav } from "@/components/nav";
import { SectionDots } from "@/components/section-dots";
import { SectionBadge } from "@/components/section-badge";
import { TextRollButton } from "@/components/text-roll-button";
import { copy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "O³ ZONE | AI Workforce Platform",
    description:
      locale === "th"
        ? "AI Workforce Platform สำหรับ SME ไทย: ประเมิน HR ฟรี ดู Dashboard กำลังคน และใช้ AI ช่วยงาน HR ได้จริง"
        : "AI Workforce Platform for Thai SMEs: a free HR assessment, a workforce dashboard, and practical AI tools for HR teams."
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = copy[locale];
  const healthCheckHref = `/${locale}/assessment/hr-health-check`;

  const dotLabels =
    locale === "th"
      ? ["หน้าหลัก", "ปัญหา", "วิธีช่วย", "สินค้า", "ผลลัพธ์", "ราคา", "เริ่มต้น"]
      : ["Intro", "Problems", "How it works", "Products", "Proof", "Pricing", "Start"];

  const productIcons = [ClipboardCheck, BarChart3, Sparkles, GraduationCap];

  return (
    <main>
      <HomeScrollSnap />
      <SectionDots labels={dotLabels} />

      <section className="relative flex min-h-[calc(100dvh-1px)] flex-col overflow-hidden bg-neutral-950 text-white">
        <Nav locale={locale} />
        <div className="flex flex-1 items-center">
          <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12">
            <div className="relative z-10 max-w-2xl">
              <p
                className="motion-hero-item mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-coral sm:mb-8"
                style={{ "--motion-delay": 80 } as CSSProperties}
              >
                {t.hero.eyebrow}
              </p>
              <h1
                className="motion-hero-item text-balance text-[clamp(2.6rem,6.4vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
                style={{ "--motion-delay": 190 } as CSSProperties}
              >
                {t.hero.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p
                className="motion-hero-item text-pretty mt-7 max-w-xl text-base font-medium leading-[1.75] text-white/72 sm:text-lg"
                style={{ "--motion-delay": 310 } as CSSProperties}
              >
                {t.hero.subtitle}
              </p>
              <div
                className="motion-hero-item mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-5"
                style={{ "--motion-delay": 430 } as CSSProperties}
              >
                <TextRollButton href={healthCheckHref}>{t.hero.primaryCta}</TextRollButton>
                <TextRollButton href={`/${locale}#products`} variant="dark">
                  {t.hero.secondaryCta}
                </TextRollButton>
              </div>
              <p className="motion-hero-item text-pretty mt-7 max-w-md text-sm font-medium leading-7 text-white/52" style={{ "--motion-delay": 520 } as CSSProperties}>
                {t.hero.smallNote}
              </p>
            </div>

            <div className="motion-reveal rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-soft" data-motion="right">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-bold">{t.hero.snapshot.label}</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/68">
                  {t.hero.snapshot.pill}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {t.hero.snapshot.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <b className="block text-3xl font-semibold tracking-[-0.03em]">{metric.value}</b>
                    <span className="text-xs font-semibold text-white/56">{metric.label}</span>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${metric.width}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-white p-5 text-neutral-950">
                <h3 className="text-base font-bold">{t.hero.snapshot.insightTitle}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-neutral-600">{t.hero.snapshot.insightBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 text-center sm:px-8 lg:px-12">
          <div className="motion-reveal" data-motion="clip">
            <SectionBadge number="1" label={t.problems.kicker} light />
            <h2 className="mx-auto mt-7 max-w-3xl text-balance text-[clamp(1.9rem,4.6vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
              {t.problems.title.split("\n").map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base font-medium leading-[1.75] text-white/64">
              {t.problems.sub}
            </p>
          </div>

          <div className="mt-12 grid gap-4 text-left md:grid-cols-3">
            {t.problems.items.map((item, index) => (
              <div
                key={item.title}
                className="motion-card motion-reveal rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 hover:border-red-300/30 hover:bg-white/[0.065]"
                style={{ "--motion-delay": index * 90 } as CSSProperties}
              >
                <h3 className="text-xl font-semibold tracking-[-0.025em]">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-white/64">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-16 text-neutral-950 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 text-center sm:px-8 lg:px-12">
          <div className="motion-reveal" data-motion="clip">
            <SectionBadge number="2" label={t.howItWorks.kicker} />
            <h2 className="mx-auto mt-7 max-w-3xl text-balance text-[clamp(1.9rem,4.6vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
              {t.howItWorks.title}
            </h2>
          </div>

          <div className="mt-12 grid gap-4 text-left md:grid-cols-4">
            {t.howItWorks.steps.map((step, index) => (
              <div
                key={step.title}
                className="motion-card motion-reveal rounded-[1.5rem] border border-neutral-200 bg-white p-6"
                style={{ "--motion-delay": index * 90 } as CSSProperties}
              >
                <div className="mb-6 grid h-10 w-10 place-items-center rounded-xl bg-brand text-sm font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 text-sm font-medium leading-7 text-neutral-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="bg-bg py-16 text-white sm:py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="motion-reveal text-center" data-motion="clip">
            <SectionBadge number="3" label={t.products.kicker} light />
            <h2 className="mx-auto mt-7 max-w-3xl text-balance text-[clamp(1.9rem,4.6vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
              {t.products.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base font-medium leading-[1.75] text-white/64">
              {t.products.sub}
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {t.products.items.map((product, index) => {
              const Icon = productIcons[index] ?? Briefcase;
              return (
                <Link
                  key={product.title}
                  href={`/${locale}/${product.href}`}
                  className="motion-card motion-reveal group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 hover:border-red-300/30 hover:bg-white/[0.065]"
                  style={{ "--motion-delay": index * 90 } as CSSProperties}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(220,38,38,0.18),transparent_34%)] opacity-80" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-coral">
                        {product.tag}
                      </span>
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-neutral-950">
                        <Icon size={18} aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">{product.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-7 text-white/64">{product.body}</p>
                    <div className="mt-5 grid gap-2 border-t border-white/10 pt-4">
                      {product.points.map((point) => (
                        <div key={point} className="flex items-center gap-2 text-xs font-bold text-white/58">
                          <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">
                      <span>{product.cta}</span>
                      <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={16} aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-4 md:grid-cols-3">
            {t.proof.items.map((stat) => (
              <div key={stat.value} className="motion-reveal rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-7" data-motion="clip">
                <b className="block text-4xl font-semibold tracking-[-0.04em]">{stat.value}</b>
                <p className="mt-3 text-sm font-medium leading-7 text-white/62">{stat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-neutral-950 py-16 text-white sm:py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 text-center sm:px-8 lg:px-12">
          <div className="motion-reveal" data-motion="clip">
            <SectionBadge number="4" label={t.pricingTeaser.kicker} light />
            <h2 className="mx-auto mt-7 max-w-3xl text-balance text-[clamp(1.9rem,4.6vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
              {t.pricingTeaser.title}
            </h2>
          </div>

          <div className="mt-12 grid gap-4 text-left md:grid-cols-3">
            {t.pricingTeaser.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-[1.5rem] border p-6 ${
                  tier.popular ? "border-coral/50 bg-white/[0.06]" : "border-white/10 bg-white/[0.035]"
                }`}
              >
                {tier.popular ? (
                  <span className="absolute right-5 top-6 rounded-full bg-coral px-2.5 py-1 text-[11px] font-bold text-white">
                    {locale === "th" ? "ยอดนิยม" : "Popular"}
                  </span>
                ) : null}
                <h3 className="text-lg font-bold tracking-[-0.02em]">{tier.name}</h3>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-3xl font-semibold tracking-[-0.04em]">{tier.price}</span>
                  {tier.period ? <span className="pb-1 text-sm font-semibold text-white/50">{tier.period}</span> : null}
                </div>
                <p className="mt-3 text-sm font-medium leading-7 text-white/64">{tier.body}</p>
                <Link
                  href={`/${locale}/${tier.href}`}
                  className={`mt-6 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-bold transition-colors ${
                    tier.popular ? "bg-brand text-white hover:bg-coral" : "border border-white/15 text-white/80 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {tier.cta} <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>

          <Link
            href={`/${locale}/${t.pricingTeaser.allPlansHref}`}
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-coral"
          >
            {t.pricingTeaser.allPlansCta} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-16 text-neutral-950 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="motion-reveal rounded-[1.75rem] bg-neutral-950 p-6 text-white sm:p-10 lg:p-14" data-motion="clip">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <SectionBadge number="O³" label={t.finalCta.kicker} light />
                <h2 className="text-balance mt-7 max-w-3xl text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.07] tracking-[-0.04em]">
                  {t.finalCta.title.split("\n").map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                <p className="mt-5 max-w-2xl text-pretty text-base font-medium leading-[1.75] text-white/70">
                  {t.finalCta.body}
                </p>
              </div>
              <TextRollButton href={healthCheckHref} className="w-fit">
                {t.finalCta.cta}
              </TextRollButton>
            </div>
          </div>
          <footer className="flex flex-col gap-3 py-8 text-sm font-semibold text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
            <p>O³ ZONE Intelligence</p>
            <p>{t.footer}</p>
          </footer>
        </div>
      </section>
    </main>
  );
}
