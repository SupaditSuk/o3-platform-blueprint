"use server";

import { isAiRoleKey, loadAiRole } from "@/lib/ai-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AiTask = "draft" | "improve" | "excerpt" | "titles" | "translate";

export type AiResult = { ok: true; text: string } | { ok: false; message: string };

type AiInput = {
  task: AiTask;
  text: string;
  instruction?: string;
  lang: "th" | "en";
};

const LANG_NAME = { th: "Thai", en: "English" } as const;

function buildPrompt({ task, text, instruction, lang }: AiInput, persona: string): string {
  const language = LANG_NAME[lang];
  const target = lang === "th" ? "English" : "Thai";

  switch (task) {
    case "draft":
      return `${persona}\nWrite a well-structured ${language} article in Markdown about: "${instruction || text}".\nUse ## and ### headings, short paragraphs, and a bullet list where helpful. Do not include the title as an H1. Return ONLY the Markdown body.`;
    case "improve":
      return `${persona}\nImprove and polish the following ${language} article. Keep the meaning and any Markdown structure, improve clarity, flow, and tone.${
        instruction ? ` Extra instruction: ${instruction}.` : ""
      }\nReturn ONLY the improved Markdown.\n\n---\n${text}`;
    case "excerpt":
      return `${persona}\nWrite a single compelling ${language} excerpt (1-2 sentences, max ~200 characters) that summarizes the article below. Return ONLY the excerpt text, no quotes.\n\n---\n${text}`;
    case "titles":
      return `${persona}\nSuggest 5 compelling ${language} article titles for the content below. Return ONLY a Markdown bullet list of the titles.\n\n---\n${text}`;
    case "translate":
      return `${persona}\nTranslate the following Markdown article into ${target}. Keep all Markdown formatting intact and keep the tone natural. Return ONLY the translated Markdown.\n\n---\n${text}`;
    default:
      return text;
  }
}

export async function aiAssist(input: AiInput): Promise<AiResult> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "Supabase is not configured." };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, message: "You must be signed in." };
  }

  const { data: profile } = await supabase.from("admin_profiles").select("role").eq("id", user.id).maybeSingle();
  if (!profile || !["admin", "super_admin"].includes((profile as { role?: string }).role ?? "")) {
    return { ok: false, message: "Admin access required." };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { ok: false, message: "GEMINI_API_KEY is not set." };
  }
  if (!input.text.trim() && !input.instruction?.trim()) {
    return { ok: false, message: "Nothing to work with yet." };
  }

  const model = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
  const role = await loadAiRole(supabase, "ai_role_admin");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: buildPrompt(input, role) }] }],
          generationConfig: { maxOutputTokens: 2048, temperature: 0.7 }
        })
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const message = (data as { error?: { message?: string } })?.error?.message ?? `Gemini error ${response.status}`;
      return { ok: false, message };
    }

    const text: string =
      (data as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> })?.candidates?.[0]?.content
        ?.parts?.[0]?.text ?? "";
    if (!text.trim()) {
      return { ok: false, message: "The model returned no content." };
    }
    return { ok: true, text: text.trim() };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "AI request failed." };
  }
}

export type ChatMessage = { role: "user" | "model"; text: string };

const CHAT_CONTEXT =
  "You are the admin's content copilot: help write and improve articles and course content, brainstorm ideas, summarize, plan content, and answer HR / People-Analytics questions. Be concise, concrete, and practical. Use Markdown when it helps.";

export async function aiChat(messages: ChatMessage[]): Promise<AiResult> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "Supabase is not configured." };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, message: "You must be signed in." };
  }

  const { data: profile } = await supabase.from("admin_profiles").select("role").eq("id", user.id).maybeSingle();
  if (!profile || !["admin", "super_admin"].includes((profile as { role?: string }).role ?? "")) {
    return { ok: false, message: "Admin access required." };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { ok: false, message: "GEMINI_API_KEY is not set." };
  }

  const recent = messages.slice(-12).filter((m) => m.text.trim());
  if (!recent.length) {
    return { ok: false, message: "No message to send." };
  }

  const model = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

  const role = await loadAiRole(supabase, "ai_role_admin");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: `${role}\n\n${CHAT_CONTEXT}` }] },
          contents: recent.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
          generationConfig: { maxOutputTokens: 1500, temperature: 0.7 }
        })
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const message = (data as { error?: { message?: string } })?.error?.message ?? `Gemini error ${response.status}`;
      return { ok: false, message };
    }

    const text: string =
      (data as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> })?.candidates?.[0]?.content
        ?.parts?.[0]?.text ?? "";
    if (!text.trim()) {
      return { ok: false, message: "The model returned no reply." };
    }
    return { ok: true, text: text.trim() };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "AI chat failed." };
  }
}

export async function saveAiRoleAction(key: string, role: string): Promise<{ ok: boolean; message?: string }> {
  if (!isAiRoleKey(key)) {
    return { ok: false, message: "Unknown AI role." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "Supabase is not configured." };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, message: "You must be signed in." };
  }

  const { data: profile } = await supabase.from("admin_profiles").select("role").eq("id", user.id).maybeSingle();
  if (!profile || !["admin", "super_admin"].includes((profile as { role?: string }).role ?? "")) {
    return { ok: false, message: "Admin access required." };
  }

  const { error } = await supabase
    .from("app_settings")
    .upsert({ key, value: role.trim(), updated_at: new Date().toISOString() }, { onConflict: "key" });

  return error ? { ok: false, message: error.message } : { ok: true };
}
