import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, CheckCircle2, ClipboardCheck, Database, Layers3, Target } from "lucide-react";
import { Nav } from "@/components/nav";
import { SectionBadge } from "@/components/section-badge";
import { TextRollButton } from "@/components/text-roll-button";
import { getServiceBySlug, serviceDetails } from "@/content/services";
import type { Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: Locale; service: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, service: slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service | O³ ZONE" };
  }

  return {
    title: `${service.title[locale]} | O³ ZONE`,
    description: service.summary[locale]
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale, service: slug } = await params;
  const service = getServiceBySlug(slug);
  const isThai = locale === "th";

  if (!service) {
    notFound();
  }

  const otherServices = serviceDetails.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <main className="min-h-dvh bg-bg text-white">
      <Nav locale={locale} />
      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <Link
          href={`/${locale}/services`}
          className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/72 transition-colors hover:text-white"
        >
          {isThai ? "กลับไปหน้าบริการ" : "Back to services"}
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <SectionBadge number="O³" label={service.stage[locale]} light />
            <h1 className="mt-7 text-balance text-[clamp(2.5rem,7vw,5.9rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
              {service.title[locale]}
            </h1>
            <p className="mt-7 max-w-3xl text-pretty text-lg font-medium leading-[1.75] text-white/70">
              {service.summary[locale]}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TextRollButton href={service.primaryHref[locale]}>{service.primaryCta[locale]}</TextRollButton>
              <TextRollButton href={`/${locale}/contact`} variant="light">
                {isThai ? "คุยกับ O³ ZONE" : "Talk to O³ ZONE"}
              </TextRollButton>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
            <ClipboardCheck className="text-coral" size={28} aria-hidden="true" />
            <p className="mt-6 text-sm font-bold text-white/46">{isThai ? "ผลลัพธ์ที่ควรได้" : "Expected outcomes"}</p>
            <div className="mt-4 grid gap-3">
              {service.outcomes[locale].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/[0.045] p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-coral" size={18} aria-hidden="true" />
                  <p className="text-sm font-bold leading-6 text-white/78">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <InfoPanel
            icon={Target}
            title={isThai ? "เหมาะกับใคร" : "Best for"}
            items={service.bestFor[locale]}
          />
          <InfoPanel
            icon={Layers3}
            title={isThai ? "สิ่งที่จะได้รับ" : "Deliverables"}
            items={service.deliverables[locale]}
          />
          <InfoPanel
            icon={ArrowRight}
            title={isThai ? "วิธีทำงาน" : "Process"}
            items={service.process[locale]}
            numbered
          />
        </div>

        {service.dataInputs && service.starterScope ? (
          <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
              <Database className="text-coral" size={24} aria-hidden="true" />
              <h2 className="mt-6 text-2xl font-semibold tracking-[-0.035em]">
                {isThai ? "ข้อมูลที่ใช้เริ่มต้นได้" : "Data you can start with"}
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-white/54">
                {isThai
                  ? "ไม่จำเป็นต้องมี data warehouse หรือ HR tech ใหญ่ก่อน แค่มีไฟล์หรือรายงานพื้นฐานก็เริ่มออกแบบ dashboard ได้"
                  : "You do not need a data warehouse or large HR tech stack first. Basic files or reports are enough to design the first dashboard."}
              </p>
              <div className="mt-5 grid gap-3">
                {service.dataInputs[locale].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-black/24 p-4">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-coral" size={18} aria-hidden="true" />
                    <p className="text-sm font-bold leading-6 text-white/72">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-red-300/20 bg-red-500/[0.08] p-5">
              <Layers3 className="text-red-200" size={24} aria-hidden="true" />
              <h2 className="mt-6 text-2xl font-semibold tracking-[-0.035em]">
                {isThai ? "ขอบเขต Dashboard Starter" : "Dashboard Starter scope"}
              </h2>
              <div className="mt-5 grid gap-3">
                {service.starterScope[locale].map((item, index) => (
                  <div key={item} className="grid grid-cols-[42px_1fr] gap-3 rounded-2xl bg-black/20 p-4">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-xs font-bold text-neutral-950">
                      {index + 1}
                    </span>
                    <p className="text-sm font-bold leading-6 text-white/76">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-12 rounded-[1.75rem] border border-red-300/20 bg-red-500/[0.08] p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-bold text-red-200">{isThai ? "Next action" : "Next action"}</p>
              <h2 className="mt-2 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.045em]">
                {isThai ? "ถ้าโจทย์นี้ใกล้กับสถานการณ์ขององค์กร เริ่มจาก conversation สั้น ๆ ได้เลย" : "If this fits your situation, start with a short conversation."}
              </h2>
            </div>
            <TextRollButton href={service.primaryHref[locale]} className="w-fit">
              {service.primaryCta[locale]}
            </TextRollButton>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-sm font-bold text-white/46">{isThai ? "บริการอื่นที่เกี่ยวข้อง" : "Related services"}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {otherServices.map((item) => (
              <Link
                key={item.slug}
                href={`/${locale}/services/${item.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-red-300/30 hover:bg-white/[0.06]"
              >
                <p className="text-xs font-bold text-coral">{item.stage[locale]}</p>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold leading-tight">{item.title[locale]}</h3>
                  <ArrowUpRight className="shrink-0 text-white/32 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" size={17} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoPanel({
  icon: Icon,
  title,
  items,
  numbered = false
}: {
  icon: typeof Target;
  title: string;
  items: string[];
  numbered?: boolean;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
      <Icon className="text-coral" size={24} aria-hidden="true" />
      <h2 className="mt-6 text-2xl font-semibold tracking-[-0.035em]">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item, index) => (
          <div key={item} className="flex items-start gap-3 border-t border-white/10 pt-3 first:border-t-0 first:pt-0">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-neutral-950">
              {numbered ? index + 1 : "✓"}
            </span>
            <p className="text-sm font-semibold leading-6 text-white/68">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
