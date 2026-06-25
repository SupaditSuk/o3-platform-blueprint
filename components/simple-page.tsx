import Link from "next/link";
import type { CSSProperties } from "react";
import { Nav } from "@/components/nav";
import type { Locale } from "@/lib/i18n";

type SimplePageProps = {
  locale: Locale;
  title: string;
  eyebrow: string;
  body: string;
  children?: React.ReactNode;
};

export function SimplePage({ locale, title, eyebrow, body, children }: SimplePageProps) {
  return (
    <main className="min-h-dvh bg-bg text-white">
      <Nav locale={locale} />
      <section className="mx-auto max-w-[1080px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <Link
          href={`/${locale}`}
          className="motion-hero-item mb-10 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/72 transition-colors hover:text-white"
          style={{ "--motion-delay": 70 } as CSSProperties}
        >
          {locale === "th" ? "กลับหน้าแรก" : "Back home"}
        </Link>
        <p className="motion-hero-item mb-5 text-sm font-semibold text-coral" style={{ "--motion-delay": 130 } as CSSProperties}>
          {eyebrow}
        </p>
        <h1 className="motion-hero-item text-balance text-[clamp(2.3rem,7vw,5rem)] font-semibold leading-[1.05] tracking-[-0.04em]" style={{ "--motion-delay": 210 } as CSSProperties}>
          {title}
        </h1>
        <p className="motion-hero-item mt-7 max-w-3xl text-pretty text-lg font-medium leading-[1.75] text-white/70" style={{ "--motion-delay": 310 } as CSSProperties}>
          {body}
        </p>
        {children ? (
          <div className="motion-reveal mt-12" style={{ "--motion-delay": 120 } as CSSProperties}>
            {children}
          </div>
        ) : null}
      </section>
    </main>
  );
}
