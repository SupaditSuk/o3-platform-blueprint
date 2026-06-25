"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Send, Sparkles, X } from "lucide-react";
import { aiChat, type ChatMessage } from "@/app/admin/ai-actions";
import { MarkdownContent } from "@/components/markdown-content";

const SUGGESTIONS = [
  "ช่วยร่างบทความเรื่อง People Analytics สั้นๆ",
  "หัวข้อบทความ HR ที่กำลังมา 5 อัน",
  "สรุปไอเดียคอร์สใหม่สำหรับ HR"
];

export function AdminChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    const next: ChatMessage[] = [...messages, { role: "user", text: trimmed }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setError(null);
    try {
      const result = await aiChat(next);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setMessages([...next, { role: "model", text: result.text }]);
    } catch {
      setError("Chat request failed.");
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
        aria-label="Open AI copilot"
      >
        <Sparkles size={18} aria-hidden="true" />
        AI Copilot
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex h-[min(80vh,640px)] w-[min(92vw,400px)] flex-col overflow-hidden rounded-3xl border border-white/12 bg-neutral-950 shadow-lift">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <p className="inline-flex items-center gap-2 text-sm font-bold text-white">
          <Sparkles size={16} className="text-coral" aria-hidden="true" />
          AI Copilot
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="grid h-8 w-8 place-items-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="grid gap-3">
            <p className="text-sm font-semibold leading-6 text-white/56">
              ผู้ช่วย AI สำหรับงานหลังบ้าน — ถามอะไรก็ได้ หรือเริ่มจากนี้:
            </p>
            {SUGGESTIONS.map((s) => (
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
            กำลังคิด...
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
            placeholder="พิมพ์ข้อความ... (Enter ส่ง, Shift+Enter ขึ้นบรรทัด)"
            className="assessment-field max-h-32 min-h-11 flex-1 resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none"
          />
          <button
            type="button"
            onClick={() => void send(input)}
            disabled={busy || !input.trim()}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand text-white transition-colors hover:bg-coral disabled:opacity-40"
            aria-label="Send"
          >
            {busy ? <Loader2 size={17} className="animate-spin" aria-hidden="true" /> : <Send size={17} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </div>
  );
}
