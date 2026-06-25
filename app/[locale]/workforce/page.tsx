import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { WorkforceApp } from "@/components/dashboard/workforce-app";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Workforce Intelligence | O³ ZONE",
    description:
      locale === "th"
        ? "O³ Workforce Intelligence — Dashboard HR Analytics แบบ Template-First พร้อม Data Readiness, Validation และโมดูล Premium/AI"
        : "O³ Workforce Intelligence — a template-first HR analytics dashboard with data readiness, validation, and Premium/AI modules."
  };
}

export default async function WorkforcePage({ params }: PageProps) {
  const { locale } = await params;
  const supabase = await createSupabaseServerClient();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;

  if (!user) {
    return <WorkforceGate locale={locale} />;
  }

  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const account = {
    name: (meta.full_name as string) || (meta.name as string) || user.email?.split("@")[0] || "User",
    email: user.email ?? "",
    avatar: (meta.avatar_url as string) || (meta.picture as string) || null
  };

  return <WorkforceApp locale={locale} account={account} />;
}

function WorkforceGate({ locale }: { locale: Locale }) {
  const isThai = locale === "th";
  const next = encodeURIComponent(`/${locale}/workforce`);

  return (
    <main className="grid min-h-dvh place-items-center bg-neutral-950 px-5 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.18),transparent_42%)]" aria-hidden="true" />
      <div className="relative z-10 w-full max-w-md">
        <Link href={`/${locale}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/44 transition-colors hover:text-white">
          <ArrowLeft size={13} aria-hidden="true" /> {isThai ? "กลับเว็บไซต์" : "Back to site"}
        </Link>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-lift">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white">
            <BarChart3 size={26} aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">
            {isThai ? "เข้าสู่ระบบเพื่อใช้ Workforce Intelligence" : "Sign in to use Workforce Intelligence"}
          </h1>
          <p className="mt-3 text-sm font-medium leading-7 text-white/60">
            {isThai
              ? "ทดลองฟรี — อัปโหลด Template แล้วได้ Dashboard, Validation และ AI Analytics เข้าสู่ระบบด้วย Google เพื่อเริ่มใช้งาน"
              : "Free to try — upload a template to get a dashboard, validation, and AI Analytics. Sign in with Google to start."}
          </p>
          <a
            href={`/auth/signin?next=${next}`}
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-neutral-950 transition-colors hover:bg-red-50"
          >
            {isThai ? "เข้าสู่ระบบด้วย Google" : "Continue with Google"}
          </a>
          <p className="mt-4 text-xs font-semibold text-white/40">
            {isThai ? "ข้อมูลที่อัปโหลดประมวลผลในเบราว์เซอร์ของคุณ ไม่ขึ้น server" : "Uploaded data is processed in your browser, never sent to a server."}
          </p>
        </div>
      </div>
    </main>
  );
}
