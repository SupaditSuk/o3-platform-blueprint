import { notFound } from "next/navigation";
import { WebsiteChat } from "@/components/website-chat";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div lang={locale satisfies Locale} className="min-h-dvh bg-bg text-ink">
      {children}
      <WebsiteChat locale={locale} />
    </div>
  );
}
