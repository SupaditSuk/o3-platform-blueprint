import Image from "next/image";
import type { Locale } from "@/lib/i18n";

type LogoCloudProps = {
  locale: Locale;
  logos: Array<{ name: string; image: string }>;
};

export function LogoCloud({ locale, logos }: LogoCloudProps) {
  const isThai = locale === "th";
  const cloudItems = [...logos, ...logos];

  return (
    <section className="border-t border-white/10 bg-[#050505] px-5 py-12 text-white sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="motion-reveal overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.035]">
          <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-center">
            <div className="shrink-0 lg:w-64 lg:border-r lg:border-white/10 lg:pr-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">
                {isThai ? "องค์กรและเครือข่าย" : "Organizations & Networks"}
              </p>
              <p className="mt-3 text-sm font-semibold leading-6 text-white/58">
                {isThai
                  ? "ภาพรวมขององค์กรและเครือข่ายที่เคยมีการแลกเปลี่ยน HR Practice"
                  : "A concise view of organizations and networks connected through HR Practice sharing."}
              </p>
            </div>

            <div className="logo-cloud-mask relative min-h-[132px] flex-1 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 sm:min-h-[150px] lg:min-h-[164px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_58%)]" />
              <div className="logo-cloud-track absolute inset-y-0 left-0 flex items-center gap-16 py-5 will-change-transform">
                {cloudItems.map((logo, index) => (
                  <div key={`${logo.name}-${index}`} className="relative h-20 w-36 shrink-0 sm:h-24 sm:w-44 lg:h-28 lg:w-52" title={logo.name}>
                    <Image
                      src={logo.image}
                      alt={`${logo.name} logo`}
                      fill
                      sizes="(min-width: 1024px) 208px, 45vw"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
