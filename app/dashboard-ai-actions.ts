"use server";

import { loadAiRole } from "@/lib/ai-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AnalyticsChatMessage = { role: "user" | "model"; text: string };
export type AnalyticsChatResult = { ok: true; text: string } | { ok: false; message: string };

const ANALYTICS_CONTEXT =
  "You are the AI Analytics assistant inside the O3 ZONE Workforce Intelligence dashboard. Answer questions about the workforce data summarized below. Rules: (1) Use ONLY the data in DATA SUMMARY — never invent numbers; if a figure is not present, say which template/field is missing. (2) Speak in terms of at-risk groups, trends, and signals — never predict that a specific named individual will leave. (3) Be concise and practical: lead with the answer, then 1–3 short recommendations when useful. (4) This is decision support for HR, not an automated decision. (5) Reply in the user's language (Thai or English).";

export async function analyticsChat(messages: AnalyticsChatMessage[], dataSummary: string): Promise<AnalyticsChatResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { ok: false, message: "AI is not configured." };
  }

  const recent = messages.slice(-10).filter((m) => m.text.trim());
  if (!recent.length) {
    return { ok: false, message: "No message to send." };
  }
  if (recent.some((m) => m.text.length > 2000)) {
    return { ok: false, message: "Message is too long." };
  }

  const supabase = await createSupabaseServerClient();
  const role = supabase ? await loadAiRole(supabase, "ai_role_dashboard") : "";
  const model = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
  const summary = dataSummary.slice(0, 6000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: `${role}\n\n${ANALYTICS_CONTEXT}\n\nDATA SUMMARY:\n${summary}`.trim() }] },
          contents: recent.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
          generationConfig: { maxOutputTokens: 1100, temperature: 0.6 }
        })
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const message = (data as { error?: { message?: string } })?.error?.message ?? `AI error ${response.status}`;
      return { ok: false, message };
    }

    const text: string =
      (data as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> })?.candidates?.[0]?.content
        ?.parts?.[0]?.text ?? "";
    if (!text.trim()) {
      return { ok: false, message: "No reply." };
    }
    return { ok: true, text: text.trim() };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Chat failed." };
  }
}
