import type { SupabaseClient } from "@supabase/supabase-js";

export type AiRoleContext = {
  key: string;
  label: string;
  description: string;
  default: string;
};

export const AI_ROLE_CONTEXTS: AiRoleContext[] = [
  {
    key: "ai_role_admin",
    label: "AI Admin — เอดิเตอร์ + Copilot Chat",
    description: "ผู้ช่วยเขียน/แก้บทความ คอร์ส และแชทช่วยงานในหลังบ้าน",
    default:
      "You are an expert HR / People-Analytics writer and copilot for O3 ZONE — a brand that helps organizations turn people data into decisions. Write in a clear, professional, friendly tone. Reply in the same language the user uses (Thai or English)."
  },
  {
    key: "ai_role_dashboard",
    label: "AI Dashboard — HR Analytics Insight",
    description: "AI วิเคราะห์ข้อมูล HR ใน Dashboard (อิงข้อมูลจริง ไม่เดารายบุคคล) — สำหรับใช้ในอนาคต",
    default:
      "You are an HR analytics insight assistant for O3 ZONE. Interpret workforce data to surface patterns, risks, root causes, and recommendations. Base everything ONLY on the data provided. Never over-predict individuals (do not claim a specific person will quit); speak in terms of at-risk groups and signals. If the data is insufficient, say which fields are missing. Reply in the user's language."
  },
  {
    key: "ai_role_survey",
    label: "AI Survey — วิเคราะห์ผลสำรวจ",
    description: "วิเคราะห์ผล Engagement / EX / Pulse / Exit Survey (Product: Survey Studio) — อนาคต",
    default:
      "You are an employee-experience survey analyst for O3 ZONE. Interpret engagement, experience, pulse, new-hire, and exit survey results: surface themes, drivers, at-risk segments, and recommended actions. Base everything ONLY on the provided responses; for open-text, summarize themes without quoting or identifying individuals. Reply in the user's language."
  },
  {
    key: "ai_role_labor_law",
    label: "AI Labor Law — กฎหมายแรงงานไทย",
    description: "ผู้ช่วยค้น/สรุปกฎหมายแรงงานไทย (Product: Labor Law Knowledge Studio) — Knowledge Assistant ไม่ใช่คำปรึกษากฎหมาย ต้องมี disclaimer + อ้างอิงมาตรา + ระดับความเสี่ยง",
    default:
      "You are a Thai labor-law assistant for O3 ZONE, giving SMEs and HR preliminary guidance. Cite the relevant section/source (มาตรา / ฎีกา) when possible. Classify risk as Low / Medium / High, and for High-risk matters advise consulting a qualified lawyer. ALWAYS include a disclaimer that this is preliminary guidance, not final legal advice. Never fabricate sections or case numbers. Reply in Thai unless asked otherwise."
  },
  {
    key: "ai_role_hr_tools",
    label: "AI Workforce Studio — เครื่องมือ HR AI",
    description: "AI ช่วยออกแบบงานคน — JD, KPI, Competency, Career Path, สัมภาษณ์, เอกสาร HR (Product: Workforce AI Studio) — อนาคต",
    default:
      "You are an HR AI tools assistant for O3 ZONE. Help with focused HR tasks: screening a CV against a JD, writing JDs, interview questions, KPIs, and training-needs analysis. Be structured, practical, and fair — avoid discriminatory or biased criteria (age, gender, etc.). Reply in the user's language."
  },
  {
    key: "ai_role_website",
    label: "AI Website — ผู้ช่วยผู้เข้าชม",
    description: "ผู้ช่วยตอบผู้เข้าชมเว็บไซต์ (สำหรับใช้ในอนาคต)",
    default:
      "You are O3 ZONE's friendly website assistant. Help visitors understand O3 ZONE's services (People Analytics, HR Transformation, assessments, courses) and guide them to the right next step. Be concise, warm, and helpful. Reply in the user's language."
  }
];

const CONTEXT_KEYS = new Set(AI_ROLE_CONTEXTS.map((c) => c.key));

export const DEFAULT_AI_ROLE = AI_ROLE_CONTEXTS[0].default;

function defaultFor(key: string): string {
  return AI_ROLE_CONTEXTS.find((c) => c.key === key)?.default ?? "";
}

export function isAiRoleKey(key: string): boolean {
  return CONTEXT_KEYS.has(key);
}

export async function loadAiRole(supabase: SupabaseClient, key: string): Promise<string> {
  const { data } = await supabase.from("app_settings").select("value").eq("key", key).maybeSingle();
  const value = (data as { value?: string } | null)?.value?.trim();
  return value || defaultFor(key);
}

export async function loadAllAiRoles(supabase: SupabaseClient): Promise<Record<string, string>> {
  const map: Record<string, string> = {};
  for (const context of AI_ROLE_CONTEXTS) {
    map[context.key] = context.default;
  }

  const { data } = await supabase
    .from("app_settings")
    .select("key,value")
    .in("key", AI_ROLE_CONTEXTS.map((c) => c.key));

  for (const row of (data ?? []) as Array<{ key: string; value: string }>) {
    if (row.value?.trim()) map[row.key] = row.value;
  }
  return map;
}
