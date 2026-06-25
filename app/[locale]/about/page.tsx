import Image from "next/image";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Handshake,
  Lightbulb,
  Linkedin,
  MapPin,
  Network,
  Presentation,
  RefreshCcw,
  Sparkles,
  UsersRound
} from "lucide-react";
import type { CSSProperties } from "react";
import { Nav } from "@/components/nav";
import { TextRollButton } from "@/components/text-roll-button";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { profile } from "@/content/profile";
import type { Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const isThai = locale === "th";
  const points = isThai
    ? ["People Analytics และอินไซต์ด้านกำลังคน", "AI for HR ที่เริ่มจากโจทย์ธุรกิจ", "แบ่งปัน HR Practice จากประสบการณ์จริง"]
    : ["People Analytics and workforce insight", "AI for HR grounded in business problems", "HR Practice sharing from real work"];
  const profileCards = [
    {
      icon: BriefcaseBusiness,
      label: "Current",
      value: profile.currentCompany
    },
    {
      icon: GraduationCap,
      label: "Education",
      value: profile.education
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location
    }
  ];
  const practiceIcons = {
    transformation: RefreshCcw,
    community: UsersRound,
    technology: Bot,
    career: GraduationCap,
    practice: Presentation,
    analytics: BarChart3,
    exchange: Handshake,
    opportunity: Lightbulb
  };

  return (
    <main className="min-h-dvh bg-bg text-white">
      <Nav locale={locale} />
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-start lg:px-12 lg:py-20">
        <div className="motion-hero-item relative order-2 mx-auto w-full max-w-[360px] lg:order-1 lg:mx-0" style={{ "--motion-delay": 160 } as CSSProperties}>
          <div className="sticky top-8 overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.05] p-2 shadow-soft">
            <div className="motion-tilt relative aspect-[4/5] max-h-[520px] overflow-hidden rounded-[1.05rem] bg-neutral-900">
              <Image
                src="/images/por-portrait.jpg"
                alt={isThai ? "ภาพโปรไฟล์ของ Supadit Suksaweang" : "Professional portrait of Supadit Suksaweang"}
                fill
                priority
                sizes="(min-width: 1024px) 360px, 86vw"
                className="object-cover object-[50%_20%]"
              />
              <div className="absolute left-3 top-3 rounded-full border border-white/12 bg-black/55 px-3 py-1.5 backdrop-blur-md">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/86">
                  {isThai ? "People Intelligence" : "People Intelligence"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:pt-6">
          <p className="motion-hero-item mb-5 text-sm font-semibold text-coral" style={{ "--motion-delay": 90 } as CSSProperties}>
            {isThai ? "โปรไฟล์" : "Profile"}
          </p>
          <h1 className="motion-hero-item text-balance text-[clamp(2.35rem,7vw,5.4rem)] font-semibold leading-[1.04] tracking-[-0.04em]" style={{ "--motion-delay": 170 } as CSSProperties}>
            {profile.name}
          </h1>
          <p className="motion-hero-item mt-5 max-w-3xl text-pretty text-xl font-semibold leading-[1.55] text-white/88" style={{ "--motion-delay": 260 } as CSSProperties}>
            {profile.headline[locale]}
          </p>
          <p className="motion-hero-item mt-7 max-w-3xl text-pretty text-lg font-medium leading-[1.8] text-white/72" style={{ "--motion-delay": 340 } as CSSProperties}>
            {profile.intro[locale]}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {profile.focusAreas.map((area, index) => (
              <span
                key={area}
                className="motion-reveal rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white/78"
                style={{ "--motion-delay": index * 45 } as CSSProperties}
              >
                {area}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-3">
            {points.map((point, index) => (
              <div
                key={point}
                className="motion-card motion-reveal flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:border-red-400/30 hover:bg-white/[0.08]"
                style={{ "--motion-delay": index * 70 } as CSSProperties}
              >
                <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-coral" aria-hidden="true" />
                <p className="text-sm font-semibold leading-6 text-white/82">{point}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {profileCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.label}
                  className="motion-card motion-reveal rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:border-red-400/30 hover:bg-white/[0.08]"
                  style={{ "--motion-delay": profileCards.indexOf(card) * 70 } as CSSProperties}
                >
                  <Icon size={20} className="text-coral" aria-hidden="true" />
                  <p className="mt-4 text-xs font-semibold text-white/45">{card.label}</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-white/82">{card.value}</p>
                </div>
              );
            })}
          </div>

          <p className="mt-9 max-w-3xl text-pretty text-base font-medium leading-[1.8] text-white/68">
            {profile.mission[locale]}
          </p>

          <div className="motion-reveal mt-10 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 shadow-soft" style={{ "--motion-delay": 180 } as CSSProperties}>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-coral text-white shadow-[0_18px_50px_rgba(231,0,18,0.28)]">
                <Presentation size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-coral">{profile.sharingPractice[locale].eyebrow}</p>
                <h2 className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-[-0.025em] text-white sm:text-3xl">
                  {profile.sharingPractice[locale].title}
                </h2>
                <p className="mt-4 text-pretty text-sm font-medium leading-7 text-white/68 sm:text-base">
                  {profile.sharingPractice[locale].body}
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {profile.sharingPractice[locale].items.map((item, index) => (
                <div
                  key={item}
                  className="motion-card motion-reveal flex items-start gap-3 rounded-2xl border border-white/10 bg-black/18 p-4 hover:border-red-400/30 hover:bg-black/28"
                  style={{ "--motion-delay": index * 55 } as CSSProperties}
                >
                  <Sparkles size={17} className="mt-1 shrink-0 text-coral" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-white/82">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <TextRollButton href={`/${locale}/blog`}>
              {isThai ? "อ่านบทความ" : "Read writing"}
            </TextRollButton>
            <TextRollButton href={`/${locale}/contact`} variant="light">
              {isThai ? "ติดต่อ" : "Contact"}
            </TextRollButton>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/14 px-5 text-sm font-semibold text-white/78 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Linkedin size={17} aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#090909] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="motion-reveal">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-coral">{profile.practicePortfolio[locale].eyebrow}</p>
              <h2 className="mt-5 max-w-xl text-balance text-[clamp(2rem,4vw,4rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                {profile.practicePortfolio[locale].title}
              </h2>
              <p className="mt-5 max-w-lg text-pretty text-sm font-medium leading-7 text-white/62 sm:text-base">
                {profile.practicePortfolio[locale].body}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { value: "8", label: isThai ? "ตัวอย่างเวที" : "sharing examples" },
                  { value: "2023+", label: isThai ? "ช่วงเวลาการแลกเปลี่ยน" : "practice timeline" },
                  { value: "HR", label: isThai ? "หัวข้อหลัก" : "core domain" },
                  { value: "AI", label: isThai ? "ประเด็นต่อยอด" : "emerging theme" }
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                    <p className="text-2xl font-semibold tracking-[-0.03em] text-white">{stat.value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/42">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="flex items-start gap-3">
                  <Network size={18} className="mt-0.5 shrink-0 text-coral" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-white/62">
                    {isThai
                      ? "จัดกลุ่มตามธีมของงาน sharing เพื่อให้เห็นภาพประสบการณ์ได้เร็วขึ้น"
                      : "Grouped by sharing theme so the experience is easier to scan and understand."}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {profile.practicePortfolio[locale].items.map((item, index) => (
                (() => {
                  const Icon = practiceIcons[item.icon as keyof typeof practiceIcons] ?? Presentation;

                  return (
                    <a
                      key={`${item.organization}-${item.topic}`}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="motion-card motion-reveal group overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-5 hover:border-red-400/35 hover:bg-white/[0.075]"
                      style={{ "--motion-delay": index * 70 } as CSSProperties}
                    >
                      <div className="flex items-start justify-between gap-5">
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-400/20 bg-coral/10 text-coral shadow-[0_20px_70px_rgba(231,0,18,0.14)] group-hover:border-red-400/45 group-hover:bg-coral/15">
                            <Icon size={24} aria-hidden="true" />
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coral">{item.year}</p>
                            <h3 className="mt-2 text-pretty text-lg font-semibold leading-tight tracking-[-0.02em] text-white">
                              {item.organization}
                            </h3>
                          </div>
                        </div>
                        <ArrowUpRight size={18} className="mt-1 shrink-0 text-white/34 transition-colors group-hover:text-coral" aria-hidden="true" />
                      </div>
                      <div className="mt-5 border-t border-white/10 pt-5">
                        <p className="text-base font-semibold leading-6 text-white/88">{item.topic}</p>
                        <p className="mt-3 text-sm font-medium leading-6 text-white/58">{item.context}</p>
                      </div>
                    </a>
                  );
                })()
              ))}
            </div>
          </div>
        </div>
      </section>

      <LogoCloud locale={locale} logos={profile.practicePortfolio[locale].logos} />
    </main>
  );
}
