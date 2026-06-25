import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownContentProps = {
  children: string;
  className?: string;
};

/**
 * Renders Markdown as a light, Medium-style article body. Raw HTML is NOT
 * rendered (react-markdown default), so user content can't inject scripts.
 * Shared by the public article page and the admin editor preview.
 */
export function MarkdownContent({ children, className }: MarkdownContentProps) {
  return (
    <div
      className={`prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:w-full prose-img:border prose-img:border-neutral-200 prose-blockquote:border-l-red-500 prose-blockquote:text-neutral-700 ${className ?? ""}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) =>
            typeof src === "string" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={alt ?? ""} loading="lazy" />
            ) : null
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
