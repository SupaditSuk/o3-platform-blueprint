import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Home, Radar } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-neutral-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(225,29,72,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_32%)]" />
      <div className="grain pointer-events-none absolute inset-0 opacity-20" />
      <section className="relative mx-auto flex min-h-dvh max-w-[1180px] flex-col justify-center px-5 py-14 sm:px-8 lg:px-12">
        <Link href="/th" className="inline-flex w-fit items-center gap-3 text-white">
          <span className="relative h-11 w-11 overflow-hidden rounded-full border border-white/10 bg-black">
            <Image
              src="/images/o3-zone-logo.jpg"
              alt="O3 Zone Intelligence logo"
              fill
              sizes="44px"
              className="object-cover object-center"
            />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-[0.12em]">O³ ZONE</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-white/46">
              Intelligence
            </span>
          </span>
        </Link>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_0.65fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white/62">
              <span className="h-2 w-2 rounded-full bg-red-600" />
              404 / Signal not found
            </div>
            <h1 className="mt-7 max-w-4xl text-balance text-[clamp(3.2rem,9vw,7.2rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
              This signal is not available.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base font-semibold leading-8 text-white/66 sm:text-lg">
              หน้านี้อาจถูกย้าย เปลี่ยนชื่อ หรือยังไม่เปิดใช้งาน กลับไปเริ่มจากหน้าแรก บริการ หรือแบบประเมินได้เลย
            </p>
            <p className="mt-3 max-w-2xl text-pretty text-sm font-semibold leading-7 text-white/42">
              The page may have moved, changed, or is not published yet. Start again from the main site, services, or HR Health Check.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 shadow-soft">
            <div className="grid aspect-[1.2/1] place-items-center rounded-[1.25rem] border border-white/10 bg-black/24">
              <div className="relative grid h-44 w-44 place-items-center rounded-full border border-red-300/25">
                <div className="absolute h-28 w-28 rounded-full border border-white/15" />
                <div className="absolute h-px w-[150%] bg-white/10" />
                <div className="absolute h-[150%] w-px bg-white/10" />
                <span className="h-4 w-4 rounded-full bg-red-500 shadow-[0_0_32px_rgba(225,29,72,0.75)]" />
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <QuickLink href="/th" icon={<Home size={17} aria-hidden="true" />} label="กลับหน้าแรก" />
              <QuickLink href="/th/services" icon={<ArrowUpRight size={17} aria-hidden="true" />} label="ดูบริการ O³ ZONE" />
              <QuickLink href="/th/assessment/hr-health-check" icon={<Radar size={17} aria-hidden="true" />} label="เริ่ม HR Health Check" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function QuickLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-14 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] px-4 text-sm font-bold text-white transition-colors hover:border-red-300/40 hover:bg-white/[0.08]"
    >
      <span>{label}</span>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-neutral-950 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {icon}
      </span>
    </Link>
  );
}
