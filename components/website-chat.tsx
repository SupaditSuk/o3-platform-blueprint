"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2, Send, Sparkles, X } from "lucide-react";
import { websiteChat, type WebsiteChatMessage } from "@/app/website-chat-actions";
import { MarkdownContent } from "@/components/markdown-content";
import type { Locale } from "@/lib/i18n";

const SUGGESTIONS: Record<Locale, string[]> = {
  th: ["O³ ZONE มีบริการอะไรบ้าง", "เริ่มต้นยังไงดี", "อยากลองเครื่องมือฟรี"],
  en: ["What does O³ ZONE offer?", "How do I get started?", "Show me a free tool"]
};

export function WebsiteChat({ locale }: { locale: Locale }) {
  const isThai = locale === "th";
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<WebsiteChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  // The dashboard (/workforce) has its own AI Analytics chat — hide the generic website chat there.
  if (pathname?.endsWith("/workforce")) return null;

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    const next: WebsiteChatMessage[] = [...messages, { role: "user", text: trimmed }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setError(null);
    try {
      const result = await websiteChat(next);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setMessages([...next, { role: "model", text: result.text }]);
    } catch {
      setError(isThai ? "ส่งข้อความไม่สำเร็จ" : "Could not send the message.");
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white shadow-lift transition-colors hover:bg-coral"
        aria-label={isThai ? "เปิดผู้ช่วย AI" : "Open AI assistant"}
      >
        <Sparkles size={18} aria-hidden="true" />
        {isThai ? "ถาม AI" : "Ask AI"}
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex h-[min(80vh,600px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border border-white/12 bg-neutral-950 text-white shadow-lift">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <p className="inline-flex items-center gap-2 text-sm font-bold">
          <Sparkles size={16} className="text-coral" aria-hidden="true" />
          {isThai ? "ผู้ช่วย O³ ZONE" : "O³ ZONE Assistant"}
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="grid h-8 w-8 place-items-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label={isThai ? "ปิด" : "Close"}
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="grid gap-3">
            <p className="text-sm font-semibold leading-6 text-white/56">
              {isThai ? "สวัสดีครับ ถามเรื่องบริการของ O³ ZONE ได้เลย หรือเริ่มจากนี้:" : "Hi! Ask anything about O³ ZONE, or start here:"}
            </p>
            {SUGGESTIONS[locale].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => void send(s)}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-left text-sm font-semibold text-white/72 transition-colors hover:border-coral/40 hover:bg-white/[0.06] hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>
        ) : (
          messages.map((message, index) =>
            message.role === "user" ? (
              <div key={index} className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-brand px-3.5 py-2.5 text-sm font-medium leading-6 text-white">
                {message.text}
              </div>
            ) : (
              <div key={index} className="max-w-[90%] rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5">
                <MarkdownContent className="prose-sm">{message.text}</MarkdownContent>
              </div>
            )
          )
        )}

        {busy ? (
          <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-sm bg-white/[0.06] px-3.5 py-2.5 text-sm font-semibold text-white/60">
            <Loader2 size={14} className="animate-spin" aria-hidden="true" />
            {isThai ? "กำลังพิมพ์..." : "Typing..."}
          </div>
        ) : null}

        {error ? <p className="text-xs font-semibold text-red-300">{error}</p> : null}
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void send(input);
              }
            }}
            rows={1}
            placeholder={isThai ? "พิมพ์ข้อความ..." : "Type a message..."}
            className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/40"
          />
          <button
            type="button"
            onClick={() => void send(input)}
            disabled={busy || !input.trim()}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand text-white transition-colors hover:bg-coral disabled:opacity-40"
            aria-label={isThai ? "ส่ง" : "Send"}
          >
            {busy ? <Loader2 size={17} className="animate-spin" aria-hidden="true" /> : <Send size={17} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </div>
  );
}
