import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { AiEvolutionExplorer } from "@/components/ai-evolution-explorer";
import { ArticleVisual } from "@/components/article-visual";
import { MarkdownContent } from "@/components/markdown-content";
import { Nav } from "@/components/nav";
import { PeopleAnalyticsLab } from "@/components/people-analytics-lab";
import { loadPublishedPost } from "@/lib/cms-store";
import type { Locale } from "@/lib/i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const article = await loadPublishedPost(await createSupabaseServerClient(), slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-dvh bg-white text-neutral-900">
      <div className="bg-neutral-950">
        <Nav locale={locale} />
      </div>

      <article className="mx-auto max-w-[720px] px-5 py-12 sm:px-6 lg:py-16">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-600 transition-colors hover:border-neutral-300 hover:text-neutral-900"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {locale === "th" ? "บทความทั้งหมด" : "All writing"}
        </Link>

        <p className="mt-10 text-sm font-bold uppercase tracking-[0.12em] text-red-600">{article.category[locale]}</p>
        <h1 className="mt-3 text-balance text-[clamp(2.1rem,5.5vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-neutral-950">
          {article.title[locale]}
        </h1>
        <p className="mt-5 text-lg font-medium leading-8 text-neutral-500">{article.excerpt[locale]}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.08em] text-neutral-400">
          <span>{article.readTime[locale]}</span>
          <span className="h-1 w-1 rounded-full bg-neutral-300" />
          <span>{article.updatedAt}</span>
        </div>

        <div className="mt-10">
          {article.coverImageUrl ? (
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.coverImageUrl} alt={article.title[locale]} className="h-full w-full object-contain" />
            </div>
          ) : (
            <ArticleVisual slug={article.slug} locale={locale} />
          )}
        </div>

        <div className="mt-10">
          <MarkdownContent className="prose-lg">{article.body[locale]}</MarkdownContent>
        </div>
      </article>

      <section className="bg-neutral-950 text-white">
        <div className="mx-auto max-w-[1080px] px-5 py-14 sm:px-8 lg:py-20">
          {article.slug === "ai-evolution-in-hr" ? (
            <AiEvolutionExplorer locale={locale} />
          ) : (
            <PeopleAnalyticsLab locale={locale} />
          )}
        </div>
      </section>
    </main>
  );
}
