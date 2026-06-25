"use client";

import { Clock, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { copy } from "@/content/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { otherLocale } from "@/lib/i18n";
import { TextRollButton } from "@/components/text-roll-button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type NavProps = {
  locale: Locale;
};

type Account = { name: string; avatarUrl: string };

export function Nav({ locale }: NavProps) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  // undefined = still resolving, null = signed out, object = signed in
  const [account, setAccount] = useState<Account | null | undefined>(undefined);
  const t = copy[locale].nav;
  const switchLocale = otherLocale(locale);
  const pathname = usePathname();
  const switchHref = pathname.startsWith(`/${locale}`)
    ? pathname.replace(`/${locale}`, `/${switchLocale}`)
    : `/${switchLocale}`;

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Bangkok"
        }).format(new Date())
      );
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setAccount(null);
      return;
    }

    let active = true;
    const resolve = (user: { user_metadata?: Record<string, unknown> | null; email?: string | null } | null) => {
      if (!active) return;
      if (!user) {
        setAccount(null);
        return;
      }
      const meta = user.user_metadata ?? {};
      const name =
        (typeof meta.full_name === "string" && meta.full_name) ||
        (typeof meta.name === "string" && meta.name) ||
        user.email ||
        "Member";
      const avatarUrl =
        (typeof meta.avatar_url === "string" && meta.avatar_url) ||
        (typeof meta.picture === "string" && meta.picture) ||
        "";
      setAccount({ name, avatarUrl });
    };

    supabase.auth.getUser().then(({ data }) => resolve(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => resolve(session?.user ?? null));

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const links = [
    { href: `/${locale}`, label: t.home },
    { href: `/${locale}/services`, label: t.courses },
    { href: `/${locale}/pricing`, label: t.pricing },
    { href: `/${locale}/blog`, label: t.writing },
    { href: `/${locale}/learn`, label: t.learn },
    { href: `/${locale}/about`, label: t.about },
    { href: `/${locale}/contact`, label: t.contact }
  ];

  return (
    <>
      <header className="relative z-30 border-b border-white/10 bg-neutral-950/76 px-3 py-0 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between text-white">
          <div className="flex items-center gap-6">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 text-white"
              aria-label="O3 Zone home"
            >
              <span className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-black">
                <Image
                  src="/images/o3-zone-logo.jpg"
                  alt="O3 Zone Intelligence logo"
                  fill
                  sizes="40px"
                  className="object-cover object-center"
                />
              </span>
              <span className="hidden leading-tight sm:block">
                <span className="block text-sm font-bold tracking-[0.12em]">O³ ZONE</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-white/46">
                  Intelligence
                </span>
              </span>
            </Link>
            <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1 xl:flex" aria-label="Primary navigation">
              {links.map((link) => {
                const active = link.href === `/${locale}` ? pathname === link.href : pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3 py-2 text-[11px] font-semibold leading-tight transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:text-white",
                      active ? "bg-white text-neutral-950 shadow-[0_10px_30px_rgba(255,255,255,0.12)]" : "text-white/68"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden items-center gap-4 xl:flex">
            <p className="hidden items-center gap-2 text-[12px] font-semibold text-white lg:flex">
              <span className="h-2 w-2 rounded-full bg-red-600" />
              LIVE
            </p>
            <p className="hidden items-center gap-1.5 whitespace-nowrap text-[12px] font-semibold text-white/62 xl:flex">
              <Clock size={14} aria-hidden="true" />
              <span>{time || "--:--"} in Bangkok</span>
            </p>
            <Link
              href={switchHref}
              className="rounded-full border border-white/15 px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              {switchLocale.toUpperCase()}
            </Link>
            {account === undefined ? null : account ? (
              <Link
                href={`/${locale}/dashboard`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 py-1.5 pl-1.5 pr-3.5 text-[12px] font-semibold text-white transition-colors hover:bg-white/10"
                aria-label={t.dashboard}
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full bg-white/15 text-[11px]">
                  {account.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={account.avatarUrl} alt={account.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    account.name.slice(0, 1).toUpperCase()
                  )}
                </span>
                <span className="max-w-[7rem] truncate">{account.name.split(" ")[0]}</span>
              </Link>
            ) : (
              <a
                href={`/auth/signin?next=${encodeURIComponent(`/${locale}/dashboard`)}`}
                className="rounded-full border border-white/15 px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t.signIn}
              </a>
            )}
            <TextRollButton href={`/${locale}/assessment/hr-health-check`} variant="brand" className="min-h-10 shrink-0 py-1 text-[13px]">
              {t.cta}
            </TextRollButton>
          </div>

          <button
            type="button"
            className="grid h-10 min-w-20 place-items-center rounded-full border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="flex items-center gap-2">
              {open ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
              {open ? t.close : t.menu}
            </span>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 xl:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          aria-label={t.close}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-3 bottom-3 rounded-[1.25rem] bg-white p-5 text-neutral-950 shadow-soft transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? "translate-y-0" : "translate-y-[115%]"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <p className="rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-600">
              {time || "--:--"} in Bangkok
            </p>
            <Link
              href={switchHref}
              className="rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white"
            >
              {switchLocale.toUpperCase()}
            </Link>
          </div>
          <nav className="grid gap-3" aria-label="Mobile navigation">
            {links.map((link) => {
              const active = link.href === `/${locale}` ? pathname === link.href : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-2xl px-2 py-2 text-[28px] font-semibold leading-8 tracking-[-0.03em] transition-colors",
                    active ? "bg-neutral-950 px-4 text-white" : "text-neutral-950"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={account ? `/${locale}/dashboard` : `/auth/signin?next=${encodeURIComponent(`/${locale}/dashboard`)}`}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-2 py-2 text-[28px] font-semibold leading-8 tracking-[-0.03em] text-neutral-950"
            >
              {account ? t.dashboard : t.signIn}
            </a>
          </nav>
          <TextRollButton href={`/${locale}/assessment/hr-health-check`} variant="brand" className="mt-7 w-full justify-between">
            {t.cta}
          </TextRollButton>
        </div>
      </div>
    </>
  );
}
