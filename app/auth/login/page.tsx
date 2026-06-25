import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { signInWithGoogle } from "@/app/auth/login/actions";
import { getSupabaseConfig, sanitizeNextPath } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
    setup?: string;
    error?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Admin Login | O3 Zone",
  description: "Sign in to O3 Zone admin."
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = sanitizeNextPath(params.next);
  const config = getSupabaseConfig();
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  return (
    <main className="grid min-h-dvh bg-neutral-950 text-white lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative hidden overflow-hidden lg:block">
        <Image
          src="/images/por-hero-b.png"
          alt="O3 Zone admin background"
          fill
          priority
          sizes="50vw"
          className="object-cover object-[58%_50%] grayscale"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82),rgba(0,0,0,0.34)),radial-gradient(circle_at_24%_20%,rgba(220,38,38,0.24),transparent_28%)]" />
        <div className="absolute bottom-8 left-8 right-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-red-300">O³ Zone Intelligence</p>
          <h1 className="mt-4 max-w-xl text-6xl font-semibold leading-[0.95] tracking-[-0.06em]">
            Admin access for serious content work.
          </h1>
        </div>
      </section>

      <section className="flex items-center px-5 py-10 sm:px-8 lg:px-14">
        <div className="w-full max-w-xl">
          <Link
            href="/en"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm font-bold text-white/64 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to site
          </Link>

          <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-soft sm:p-8">
            <div className="relative mb-8 h-16 w-16 overflow-hidden rounded-full border border-white/10 bg-black">
              <Image src="/images/o3-zone-logo.jpg" alt="O3 Zone logo" fill sizes="64px" className="object-cover" />
            </div>

            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-red-300">
              <LockKeyhole size={16} aria-hidden="true" />
              Admin Login
            </p>
            <h2 className="mt-4 text-balance text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
              Sign in with Gmail
            </h2>
            <p className="mt-5 text-sm font-semibold leading-7 text-white/62">
              ใช้บัญชี Gmail/Google ของคุณเพื่อเข้าไปจัดการบทความ คอร์ส และระบบหลังบ้านของ O³ ZONE
            </p>

            {!config.isConfigured ? (
              <div className="mt-7 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
                <p className="text-sm font-bold text-amber-100">ต้องตั้งค่า Supabase ก่อน</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-amber-50/70">
                  เพิ่มค่า `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` และ `NEXT_PUBLIC_SITE_URL`
                  ในไฟล์ environment ก่อนใช้ Google login จริง
                </p>
              </div>
            ) : params.error === "unauthorized" ? (
              <div className="mt-7 rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
                <p className="text-sm font-bold text-red-100">บัญชีนี้ยังไม่ได้รับสิทธิ์ Admin</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-red-50/70">
                  เพิ่มอีเมลนี้ใน `ADMIN_EMAILS` แล้ว login ใหม่อีกครั้ง
                </p>
              </div>
            ) : params.error === "admin-config" ? (
              <div className="mt-7 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
                <p className="text-sm font-bold text-amber-100">ยังไม่ได้ตั้งค่า Admin Email</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-amber-50/70">
                  เพิ่มอีเมล admin ใน `ADMIN_EMAILS` ก่อนเปิดใช้งานหลังบ้านบน production
                </p>
              </div>
            ) : params.error === "admin-profile" ? (
              <div className="mt-7 rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
                <p className="text-sm font-bold text-red-100">ยังไม่มีสิทธิ์ใน Supabase Admin Profile</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-red-50/70">
                  หลัง login ด้วย Google แล้ว ให้เพิ่ม user id นี้ใน `admin_profiles` ก่อนเข้า `/admin`
                </p>
              </div>
            ) : params.error ? (
              <div className="mt-7 rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
                <p className="text-sm font-bold text-red-100">เข้าสู่ระบบไม่สำเร็จ</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-red-50/70">ลองกด login ด้วย Google อีกครั้งครับ</p>
              </div>
            ) : null}

            {user ? (
              <div className="mt-8 grid gap-3">
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-4">
                  <ShieldCheck className="text-emerald-300" size={20} aria-hidden="true" />
                  <p className="text-sm font-semibold text-white/72">Signed in as {user.email}</p>
                </div>
                <Link
                  href={next}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-5 text-sm font-bold text-white transition-colors hover:bg-coral"
                >
                  Open admin
                </Link>
              </div>
            ) : (
              <form action={signInWithGoogle} className="mt-8">
                <input type="hidden" name="next" value={next} />
                <button
                  type="submit"
                  disabled={!config.isConfigured}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-white px-5 text-sm font-bold text-neutral-950 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <Mail size={18} aria-hidden="true" />
                  Continue with Google
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
