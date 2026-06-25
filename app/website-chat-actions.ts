"use server";

import { loadAiRole } from "@/lib/ai-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type WebsiteChatMessage = { role: "user" | "model"; text: string };
export type WebsiteChatResult = { ok: true; text: string } | { ok: false; message: string };

const WEBSITE_CONTEXT =
  "You are the public website assistant for O3 ZONE. Help visitors understand O3 ZONE's products and services — Workforce Intelligence dashboard, Survey Studio, Workforce AI Studio (which includes a Labor Law Knowledge assistant), Academy, HR assessments, and consulting — and guide them to a sensible next step (try a free tool, take an assessment, or contact the team). Be concise, warm, and helpful. Framing for compliance: the Labor Law Knowledge assistant inside Workforce AI Studio is for education and HR support, NOT formal legal advice (suggest consulting a lawyer for matters with legal effect); Workforce AI Studio tools are decision support, not automated decisions; benchmarks use anonymized, consent-based, aggregated data. Do NOT invent prices, numbers, or commitments; if asked for specifics like pricing, suggest contacting the team. Reply in the visitor's language (Thai or English).";

export async function websiteChat(messages: WebsiteChatMessage[]): Promise<WebsiteChatResult> {
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
  const role = supabase ? await loadAiRole(supabase, "ai_role_website") : "";
  const model = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: `${role}\n\n${WEBSITE_CONTEXT}`.trim() }] },
          contents: recent.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
          generationConfig: { maxOutputTokens: 1000, temperature: 0.7 }
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
