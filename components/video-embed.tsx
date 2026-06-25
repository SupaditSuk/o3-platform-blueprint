function toEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === "vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function VideoEmbed({ url, title }: { url: string; title?: string }) {
  const embed = toEmbedUrl(url);

  if (!embed) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-red-600 underline">
        {title ?? "Watch video"}
      </a>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-neutral-200 bg-black">
      <iframe
        src={embed}
        title={title ?? "Lesson video"}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
