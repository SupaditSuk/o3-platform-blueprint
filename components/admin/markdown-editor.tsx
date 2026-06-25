"use client";

import { useRef, useState } from "react";
import { Bold, Check, Copy, Eye, Heading2, Heading3, Image as ImageIcon, Italic, Link2, List, Loader2, Pencil, Quote, Sparkles, X } from "lucide-react";
import { aiAssist, type AiTask } from "@/app/admin/ai-actions";
import { uploadArticleImage } from "@/app/admin/upload-actions";
import { MarkdownContent } from "@/components/markdown-content";

type MarkdownEditorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  lang: "th" | "en";
};

const AI_ACTIONS: Array<{ task: AiTask; label: string }> = [
  { task: "draft", label: "ร่างจากหัวข้อ" },
  { task: "improve", label: "เกลาให้ดีขึ้น" },
  { task: "excerpt", label: "สรุป excerpt" },
  { task: "titles", label: "เสนอหัวข้อ" },
  { task: "translate", label: "แปล TH↔EN" }
];

export function MarkdownEditor({ label, value, onChange, lang }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiBusy, setAiBusy] = useState<AiTask | null>(null);
  const [aiInstruction, setAiInstruction] = useState("");
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const runAi = async (task: AiTask) => {
    setAiBusy(task);
    setAiError(null);
    setAiResult(null);
    try {
      const result = await aiAssist({ task, text: value, instruction: aiInstruction, lang });
      if (!result.ok) {
        setAiError(result.message);
        return;
      }
      setAiResult(result.text);
    } catch {
      setAiError("AI request failed. Please try again.");
    } finally {
      setAiBusy(null);
    }
  };

  const copyResult = () => {
    if (!aiResult) return;
    void navigator.clipboard.writeText(aiResult);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const focusRange = (start: number, end: number) => {
    requestAnimationFrame(() => {
      const ta = textareaRef.current;
      if (!ta) return;
      ta.focus();
      ta.setSelectionRange(start, end);
    });
  };

  const wrap = (before: string, after = before) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart: start, selectionEnd: end } = ta;
    const selected = value.slice(start, end);
    onChange(value.slice(0, start) + before + selected + after + value.slice(end));
    focusRange(start + before.length, start + before.length + selected.length);
  };

  const linePrefix = (prefix: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    onChange(value.slice(0, lineStart) + prefix + value.slice(lineStart));
    focusRange(start + prefix.length, start + prefix.length);
  };

  const insert = (text: string) => {
    const ta = textareaRef.current;
    if (!ta) {
      onChange(value + text);
      return;
    }
    const { selectionStart: start, selectionEnd: end } = ta;
    onChange(value.slice(0, start) + text + value.slice(end));
    const pos = start + text.length;
    focusRange(pos, pos);
  };

  const handleImage = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadArticleImage(formData);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      insert(`\n\n![](${result.url})\n\n`);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const tools = [
    { icon: Heading2, title: "Heading", run: () => linePrefix("## ") },
    { icon: Heading3, title: "Subheading", run: () => linePrefix("### ") },
    { icon: Bold, title: "Bold", run: () => wrap("**") },
    { icon: Italic, title: "Italic", run: () => wrap("*") },
    { icon: List, title: "List", run: () => linePrefix("- ") },
    { icon: Quote, title: "Quote", run: () => linePrefix("> ") },
    { icon: Link2, title: "Link", run: () => wrap("[", "](https://)") }
  ];

  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/56">{label}</span>

      <div className="mt-2 rounded-xl border border-white/10 bg-black/28">
        <div className="flex flex-wrap items-center gap-1 border-b border-white/10 p-2">
          {tools.map(({ icon: Icon, title, run }) => (
            <button
              key={title}
              type="button"
              title={title}
              onClick={run}
              className="grid h-8 w-8 place-items-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Icon size={15} aria-hidden="true" />
            </button>
          ))}
          <button
            type="button"
            title="Upload image"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="grid h-8 w-8 place-items-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            {uploading ? <Loader2 size={15} className="animate-spin" aria-hidden="true" /> : <ImageIcon size={15} aria-hidden="true" />}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleImage(file);
              event.target.value = "";
            }}
          />
          <button
            type="button"
            title="AI assist"
            onClick={() => setAiOpen((open) => !open)}
            className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-bold transition-colors ${
              aiOpen ? "bg-brand text-white" : "text-coral hover:bg-white/10"
            }`}
          >
            <Sparkles size={14} aria-hidden="true" />
            AI
          </button>
          <span className="mx-1 h-5 w-px bg-white/10" />
          <button
            type="button"
            onClick={() => setPreview((value) => !value)}
            className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-bold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            {preview ? <Pencil size={14} aria-hidden="true" /> : <Eye size={14} aria-hidden="true" />}
            {preview ? "Write" : "Preview"}
          </button>
        </div>

        {aiOpen ? (
          <div className="border-b border-white/10 bg-black/20 p-3">
            <input
              value={aiInstruction}
              onChange={(event) => setAiInstruction(event.target.value)}
              placeholder={lang === "th" ? "บอก AI เช่น หัวข้อที่อยากให้ร่าง หรือคำสั่งเพิ่มเติม" : "Tell AI a topic or an extra instruction"}
              className="assessment-field w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {AI_ACTIONS.map(({ task, label: actionLabel }) => (
                <button
                  key={task}
                  type="button"
                  disabled={aiBusy !== null}
                  onClick={() => void runAi(task)}
                  className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/12 px-3 text-xs font-bold text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
                >
                  {aiBusy === task ? (
                    <Loader2 size={13} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Sparkles size={13} className="text-coral" aria-hidden="true" />
                  )}
                  {actionLabel}
                </button>
              ))}
            </div>

            {aiError ? <p className="mt-2 text-xs font-semibold text-red-300">{aiError}</p> : null}

            {aiResult ? (
              <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-white">
                <div className="max-h-72 overflow-y-auto p-4">
                  <MarkdownContent>{aiResult}</MarkdownContent>
                </div>
                <div className="flex flex-wrap items-center gap-2 border-t border-neutral-200 bg-neutral-50 p-3">
                  <button
                    type="button"
                    onClick={() => insert(aiResult)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full bg-neutral-950 px-4 text-xs font-bold text-white transition-colors hover:bg-neutral-800"
                  >
                    {lang === "th" ? "แทรกที่เคอร์เซอร์" : "Insert at cursor"}
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange(aiResult)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-neutral-300 px-4 text-xs font-bold text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900"
                  >
                    {lang === "th" ? "แทนที่ทั้งหมด" : "Replace all"}
                  </button>
                  <button
                    type="button"
                    onClick={copyResult}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-neutral-300 px-4 text-xs font-bold text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900"
                  >
                    {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
                    {copied ? (lang === "th" ? "คัดลอกแล้ว" : "Copied") : lang === "th" ? "คัดลอก" : "Copy"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAiResult(null)}
                    className="ml-auto inline-flex h-9 items-center gap-1 rounded-full px-3 text-xs font-bold text-neutral-400 transition-colors hover:text-neutral-700"
                  >
                    <X size={13} aria-hidden="true" />
                    {lang === "th" ? "ปิด" : "Dismiss"}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {preview ? (
          <div className="min-h-48 rounded-b-xl bg-white p-5">
            {value.trim() ? (
              <MarkdownContent>{value}</MarkdownContent>
            ) : (
              <p className="text-sm text-neutral-400">Nothing to preview yet.</p>
            )}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            spellCheck={false}
            className="assessment-field min-h-48 w-full resize-y rounded-b-xl border-0 bg-transparent p-4 font-mono text-sm leading-7 text-white outline-none"
            placeholder="เขียนด้วย Markdown — ## หัวข้อ, **ตัวหนา**, - ลิสต์, > quote, แทรกรูปจากปุ่มด้านบน"
          />
        )}
      </div>

      {error ? <span className="mt-2 block text-xs font-semibold text-red-300">{error}</span> : null}
    </label>
  );
}
