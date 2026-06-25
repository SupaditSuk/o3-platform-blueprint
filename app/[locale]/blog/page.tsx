import Link from "next/link";
import type { CSSProperties } from "react";
import { ArticleVisual } from "@/components/article-visual";
import { SimplePage } from "@/components/simple-page";
import { loadPublishedPosts } from "@/lib/cms-store";
import type { Locale } from "@/lib/i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export const dynamic = "force-dynamic";

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const posts = await loadPublishedPosts(await createSupabaseServerClient());

  return (
    <SimplePage
      locale={locale}
      eyebrow={locale === "th" ? "บทความ" : "Writing"}
      title={locale === "th" ? "บทความล่าสุด" : "Latest writing"}
      body={
        locale === "th"
          ? "บทความด้าน People Analytics, HR Analytics และ AI for HR ที่ต่อยอดจากประสบการณ์ทำงานจริง"
          : "Essays on People Analytics, HR Analytics, and AI for HR shaped by practical work."
      }
    >
      <div className="grid gap-4">
        {posts.map((article, index) => (
          <Link
            key={article.slug}
            href={`/${locale}/blog/${article.slug}`}
            className="motion-card motion-reveal rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-red-400/30 hover:bg-white/[0.08]"
            style={{ "--motion-delay": index * 80 } as CSSProperties}
          >
            {article.coverImageUrl ? (
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.coverImageUrl} alt={article.title[locale]} className="h-full w-full object-contain" />
              </div>
            ) : (
              <ArticleVisual slug={article.slug} locale={locale} compact />
            )}
            <p className="mt-5 text-sm font-semibold text-coral">{article.category[locale]}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{article.title[locale]}</h2>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-white/64">{article.excerpt[locale]}</p>
          </Link>
        ))}
      </div>
    </SimplePage>
  );
}
