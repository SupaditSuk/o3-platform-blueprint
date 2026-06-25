"use client";

import { useEffect, useRef, useState } from "react";
import { BarChart3, Loader2, Send, X } from "lucide-react";
import { analyticsChat, type AnalyticsChatMessage } from "@/app/dashboard-ai-actions";
import { MarkdownContent } from "@/components/markdown-content";
import type { Locale } from "@/lib/i18n";

const SUGGESTIONS: Record<Locale, string[]> = {
  th: ["สรุปภาพรวมกำลังคนให้หน่อย", "แผนกไหนเสี่ยง turnover สูงสุด", "ควรโฟกัสอะไรใน 90 วัน"],
  en: ["Summarize the workforce overview", "Which function has the highest turnover risk?", "What should we focus on in 90 days?"]
};

// Freemium: a few free AI Analytics questions per day, then prompt to upgrade.
// (Soft client-side limit; hard per-user enforcement arrives with the subscription system.)
const FREE_LIMIT = 3;
const usedKey = () => `o3-ai-analytics-${new Date().toISOString().slice(0, 10)}`;

export function AnalyticsChat({
  locale,
  dataSummary,
  open,
  onOpenChange
}: {
  locale: Locale;
  dataSummary: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const isThai = locale === "th";
  const [messages, setMessages] = useState<AnalyticsChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [used, setUsed] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    try {
      setUsed(Number(localStorage.getItem(usedKey()) || 0));
    } catch {
      // localStorage unavailable
    }
  }, []);

  const limited = used >= FREE_LIMIT;
  const upgradeHref = `/${locale}/contact?interest=workforce_intelligence_pro`;

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy || limited) return;
    const next: AnalyticsChatMessage[] = [...messages, { role: "user", text: trimmed }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setError(null);
    try {
      const result = await analyticsChat(next, dataSummary);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setMessages([...next, { role: "model", text: result.text }]);
      const nextUsed = used + 1;
      setUsed(nextUsed);
      try {
        localStorage.setItem(usedKey(), String(nextUsed));
      } catch {
        // localStorage unavailable
      }
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
        onClick={() => onOpenChange(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-coral"
        aria-label={isThai ? "เปิด AI Analytics" : "Open AI Analytics"}
      >
        <BarChart3 size={18} aria-hidden="true" />
        AI Analytics
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex h-[min(80vh,600px)] w-[min(92vw,390px)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
        <p className="inline-flex items-center gap-2 text-sm font-bold">
          <BarChart3 size={16} className="text-coral" aria-hidden="true" />
          AI Analytics
        </p>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
          aria-label={isThai ? "ปิด" : "Close"}
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="grid gap-3">
            <p className="text-sm font-semibold leading-6 text-slate-500">
              {isThai ? "ถามเกี่ยวกับข้อมูลในแดชบอร์ดนี้ได้เลย — ตอบจากข้อมูลที่โหลดอยู่เท่านั้น" : "Ask about the data in this dashboard — answers come only from the loaded data."}
            </p>
            {!limited &&
              SUGGESTIONS[locale].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => void send(s)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition-colors hover:border-coral/40 hover:bg-white"
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
              <div key={index} className="max-w-[92%] rounded-2xl rounded-bl-sm bg-slate-100 px-3.5 py-2.5">
                <MarkdownContent className="prose-sm prose-slate">{message.text}</MarkdownContent>
              </div>
            )
          )
        )}

        {busy ? (
          <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-sm bg-slate-100 px-3.5 py-2.5 text-sm font-semibold text-slate-500">
            <Loader2 size={14} className="animate-spin" aria-hidden="true" />
            {isThai ? "กำลังวิเคราะห์..." : "Analyzing..."}
          </div>
        ) : null}

        {error ? <p className="text-xs font-semibold text-red-500">{error}</p> : null}
      </div>

      <div className="border-t border-slate-200 p-3">
        {limited ? (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-3.5 text-center">
            <p className="text-sm font-bold text-slate-900">{isThai ? "ใช้ครบโควต้าฟรีแล้ว" : "Free quota reached"}</p>
            <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
              {isThai
                ? `ทดลองฟรี ${FREE_LIMIT} คำถาม/วัน — อัปเกรด Pro เพื่อวิเคราะห์เชิงลึกแบบไม่จำกัด`
                : `${FREE_LIMIT} free questions/day — upgrade to Pro for unlimited deep analysis.`}
            </p>
            <a
              href={upgradeHref}
              className="mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-full bg-brand px-4 text-xs font-bold text-white transition-colors hover:bg-coral"
            >
              {isThai ? "อัปเกรด Pro" : "Upgrade to Pro"}
            </a>
          </div>
        ) : (
          <>
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
                placeholder={isThai ? "ถามข้อมูลในแดชบอร์ด..." : "Ask about the dashboard..."}
                className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-coral/50"
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
            <div className="mt-2 flex items-center justify-between gap-2 text-[10px] font-medium leading-4 text-slate-400">
              <span>{isThai ? "AI สนับสนุนการตัดสินใจ ไม่ใช่คำตัดสินแทน HR" : "Decision support, not a replacement for HR judgment."}</span>
              <span className="shrink-0 font-bold text-slate-500">{isThai ? `เหลือ ${FREE_LIMIT - used} ฟรี` : `${FREE_LIMIT - used} free left`}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
