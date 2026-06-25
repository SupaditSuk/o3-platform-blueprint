import type { Locale } from "@/lib/i18n";

export type ServiceSlug =
  | "hr-ai-readiness-check"
  | "hr-health-check"
  | "workforce-intelligence-sprint"
  | "intelligence-dashboard-starter"
  | "ai-readiness-advisory";

export type ServiceDetail = {
  slug: ServiceSlug;
  stage: Record<Locale, string>;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  bestFor: Record<Locale, string[]>;
  outcomes: Record<Locale, string[]>;
  deliverables: Record<Locale, string[]>;
  process: Record<Locale, string[]>;
  dataInputs?: Record<Locale, string[]>;
  starterScope?: Record<Locale, string[]>;
  primaryCta: Record<Locale, string>;
  primaryHref: Record<Locale, string>;
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "hr-ai-readiness-check",
    stage: { th: "Lead Magnet", en: "Lead Magnet" },
    title: { th: "HR / AI Readiness Check", en: "HR / AI Readiness Check" },
    summary: {
      th: "แบบประเมินเริ่มต้นสำหรับองค์กรที่อยากเห็นภาพรวมสุขภาพ HR, workforce productivity และความพร้อมด้าน AI ก่อนเลือกบริการถัดไป",
      en: "A starting assessment for teams that want a clear view of HR health, workforce productivity, and AI readiness before choosing the next service path."
    },
    bestFor: {
      th: ["ยังไม่แน่ใจว่าควรเริ่มจาก HR, productivity หรือ AI", "อยากได้ภาพรวมเร็วโดยไม่ต้องเตรียมข้อมูลเยอะ", "ต้องการ lead-in สำหรับคุยกับทีมผู้บริหาร"],
      en: ["Teams unsure whether to start with HR, productivity, or AI", "Organizations that need a quick view without heavy data preparation", "Leaders who need a first conversation starter"]
    },
    outcomes: {
      th: ["เห็นระดับความพร้อมเบื้องต้น", "รู้ gap ที่ควรเริ่มก่อน", "เลือก service path ที่เหมาะกว่าเดาเอง"],
      en: ["Initial readiness level", "First gaps to prioritize", "A clearer service path without guessing"]
    },
    deliverables: {
      th: ["Assessment score", "จุดแข็ง/จุดเสี่ยง", "คำแนะนำ next step"],
      en: ["Assessment score", "Strengths and risk areas", "Recommended next step"]
    },
    process: {
      th: ["ทำ assessment", "อ่านผลเบื้องต้น", "เลือกว่าจะคุยเรื่อง HR Health, Workforce หรือ AI"],
      en: ["Complete the assessment", "Review the initial result", "Choose whether to discuss HR Health, Workforce, or AI"]
    },
    primaryCta: { th: "เริ่มประเมิน", en: "Start assessment" },
    primaryHref: { th: "/th/assessment/hr-health-check", en: "/en/assessment/hr-health-check" }
  },
  {
    slug: "hr-health-check",
    stage: { th: "Entry", en: "Entry" },
    title: { th: "O³ HR Health Check", en: "O³ HR Health Check" },
    summary: {
      th: "Diagnostic สำหรับดูสุขภาพระบบ HR ในมุม structure, workforce, process, data, capability และ AI readiness แล้วสรุปเป็น roadmap 90 วัน",
      en: "A diagnostic for HR system health across structure, workforce, process, data, capability, and AI readiness, translated into a 90-day roadmap."
    },
    bestFor: {
      th: ["SME หรือ mid-market ที่อยากวางระบบ HR ให้ชัด", "HR leader ที่ต้องอธิบาย gap กับผู้บริหาร", "องค์กรที่อยากเริ่มจากข้อมูลจริงก่อนทำ project ใหญ่"],
      en: ["SMEs or mid-market teams that need clearer HR systems", "HR leaders who need to explain gaps to executives", "Organizations that want real signals before a larger project"]
    },
    outcomes: {
      th: ["เห็น HR maturity และ gap heatmap", "รู้ว่าควรเริ่มจาก process, data หรือ capability", "ได้แผนยกระดับ 90 วัน"],
      en: ["HR maturity and gap heatmap", "Clarity on whether to start with process, data, or capability", "A practical 90-day improvement plan"]
    },
    deliverables: {
      th: ["HR Health summary", "Gap heatmap", "90-day roadmap", "Service recommendation"],
      en: ["HR Health summary", "Gap heatmap", "90-day roadmap", "Service recommendation"]
    },
    process: {
      th: ["เก็บข้อมูลและทำ assessment", "สรุป maturity และ gap", "คุย debrief เพื่อเลือก priority", "ออกแบบ next action"],
      en: ["Collect inputs and complete the assessment", "Summarize maturity and gaps", "Run a debrief to choose priorities", "Design next actions"]
    },
    primaryCta: { th: "ทำ HR Health Check", en: "Run HR Health Check" },
    primaryHref: { th: "/th/assessment/hr-health-check", en: "/en/assessment/hr-health-check" }
  },
  {
    slug: "workforce-intelligence-sprint",
    stage: { th: "Core Sprint", en: "Core Sprint" },
    title: { th: "Workforce Intelligence Sprint", en: "Workforce Intelligence Sprint" },
    summary: {
      th: "Sprint สำหรับวิเคราะห์กำลังคน turnover productivity cost OT และ manpower gap เพื่อเปลี่ยนข้อมูลคนให้เป็น insight และ action plan ที่ผู้บริหารใช้ตัดสินใจ",
      en: "A sprint to analyze workforce, turnover, productivity, cost, overtime, and manpower gaps so people data becomes executive insight and an action plan."
    },
    bestFor: {
      th: ["โรงงาน logistics retail service หรือทีม frontline", "มี OT สูง คนขาด คนเกิน หรือ productivity ไม่ชัด", "ต้องการ manpower model และ dashboard แรก"],
      en: ["Manufacturing, logistics, retail, service, or frontline-heavy teams", "Organizations with overtime, staffing gaps, or unclear productivity", "Teams that need a first manpower model and dashboard"]
    },
    outcomes: {
      th: ["เห็น productivity gap", "เข้าใจ cost driver และ workload", "ได้ action plan สำหรับ quick win"],
      en: ["Visible productivity gaps", "Clear cost drivers and workload patterns", "A quick-win action plan"]
    },
    deliverables: {
      th: ["Workforce data review", "Productivity and cost insight", "Manpower gap analysis", "Executive action plan"],
      en: ["Workforce data review", "Productivity and cost insight", "Manpower gap analysis", "Executive action plan"]
    },
    process: {
      th: ["กำหนด business question", "จัดข้อมูล workforce/cost/productivity", "วิเคราะห์ gap", "สรุป dashboard และ action plan"],
      en: ["Define the business question", "Structure workforce, cost, and productivity data", "Analyze gaps", "Summarize dashboard and action plan"]
    },
    primaryCta: { th: "คุยเรื่อง Sprint", en: "Discuss sprint" },
    primaryHref: { th: "/th/contact?interest=workforce_intelligence_sprint", en: "/en/contact?interest=workforce_intelligence_sprint" }
  },
  {
    slug: "intelligence-dashboard-starter",
    stage: { th: "Dashboard", en: "Dashboard" },
    title: { th: "O³ Intelligence Dashboard Starter", en: "O³ Intelligence Dashboard Starter" },
    summary: {
      th: "ออกแบบ dashboard แรกจากข้อมูลที่องค์กรมีอยู่ เพื่อให้ CEO, owner หรือ HR head เห็นสัญญาณสำคัญของคน ต้นทุน productivity และ business impact",
      en: "Design a first dashboard from the data the organization already has, giving CEOs, owners, or HR heads a clearer view of people, cost, productivity, and business impact."
    },
    bestFor: {
      th: ["มีข้อมูลอยู่ใน Excel, payroll, attendance หรือ HR system หลายที่", "ผู้บริหารอยากเห็นตัวเลขคนแบบตัดสินใจได้", "ยังไม่พร้อมซื้อ HR tech ใหญ่ แต่อยากเริ่ม dashboard"],
      en: ["Data lives across Excel, payroll, attendance, or HR systems", "Executives need decision-ready people metrics", "Teams not ready for large HR tech but ready for a first dashboard"]
    },
    outcomes: {
      th: ["เลือก metric ที่ผู้บริหารใช้จริง", "เห็น dashboard prototype", "เปลี่ยน report ให้เป็น insight brief"],
      en: ["Select executive-ready metrics", "See a dashboard prototype", "Turn reports into an insight brief"]
    },
    deliverables: {
      th: ["Metric design", "Dashboard prototype", "Insight brief", "Data quality checklist"],
      en: ["Metric design", "Dashboard prototype", "Insight brief", "Data quality checklist"]
    },
    process: {
      th: ["เลือก decision ที่ dashboard ต้องช่วยตอบ", "ตรวจข้อมูลที่มีอยู่", "ออกแบบ metric และ wireframe", "ทำ dashboard starter พร้อม insight"],
      en: ["Choose the decisions the dashboard must support", "Review available data", "Design metrics and wireframe", "Build a starter dashboard with insights"]
    },
    dataInputs: {
      th: [
        "Employee master / headcount snapshot",
        "Hiring, transfer, promotion และ exit movement",
        "Payroll, OT หรือ workforce cost summary",
        "Attendance, shift, workload หรือ productivity data ถ้ามี"
      ],
      en: [
        "Employee master or headcount snapshot",
        "Hiring, transfer, promotion, and exit movement",
        "Payroll, overtime, or workforce cost summary",
        "Attendance, shift, workload, or productivity data if available"
      ]
    },
    starterScope: {
      th: [
        "เริ่มจาก 1-2 business questions ที่ผู้บริหารต้องใช้ตัดสินใจ",
        "ออกแบบ metric dictionary และ data quality checklist",
        "ทำ dashboard prototype พร้อม insight brief",
        "สรุป next action ว่าควรเก็บข้อมูลเพิ่มหรือทำ sprint ต่อจุดไหน"
      ],
      en: [
        "Start from 1-2 business questions leaders need to answer",
        "Design a metric dictionary and data quality checklist",
        "Build a dashboard prototype with an insight brief",
        "Summarize next actions: data gaps, deeper sprint, or operating rhythm"
      ]
    },
    primaryCta: { th: "ลองดู Dashboard ตัวอย่าง", en: "Explore dashboard demo" },
    primaryHref: {
      th: "/th/services/intelligence-dashboard-starter/demo",
      en: "/en/services/intelligence-dashboard-starter/demo"
    }
  },
  {
    slug: "ai-readiness-advisory",
    stage: { th: "AI + Advisory", en: "AI + Advisory" },
    title: { th: "AI Readiness / Advisory", en: "AI Readiness / Advisory" },
    summary: {
      th: "ช่วยทีม HR เลือก AI use case ที่เหมาะ ออกแบบ prompt toolkit, workflow และ governance เบื้องต้น ก่อนทดลองใช้จริงหรือทำต่อเนื่องแบบ advisory",
      en: "Help HR teams choose practical AI use cases, design prompt toolkits, workflows, and basic governance before piloting or continuing through advisory."
    },
    bestFor: {
      th: ["ทีม HR อยากเริ่มใช้ AI แต่ไม่รู้เริ่มจาก use case ไหน", "มีงาน manual ที่อยากลดเวลา", "ต้องการ governance และวิธีใช้ AI ที่ไม่เสี่ยง"],
      en: ["HR teams that want to use AI but do not know which use case to start with", "Teams with manual work they want to reduce", "Organizations that need governance and safer AI adoption"]
    },
    outcomes: {
      th: ["เลือก AI use case แรกได้ชัด", "มี prompt/workflow prototype", "รู้ guardrail สำหรับใช้จริง"],
      en: ["Clear first AI use case", "Prompt or workflow prototype", "Practical guardrails for real use"]
    },
    deliverables: {
      th: ["AI use case map", "Prompt toolkit", "Workflow prototype", "Governance checklist"],
      en: ["AI use case map", "Prompt toolkit", "Workflow prototype", "Governance checklist"]
    },
    process: {
      th: ["สำรวจงาน HR ที่ใช้เวลาสูง", "เลือก use case ที่ impact เร็ว", "ทำ prompt/workflow prototype", "ออกแบบ adoption rhythm"],
      en: ["Review high-time HR work", "Choose fast-impact use cases", "Prototype prompts or workflows", "Design adoption rhythm"]
    },
    primaryCta: { th: "เริ่ม AI Readiness", en: "Start AI Readiness" },
    primaryHref: { th: "/th/assessment/ai-readiness-hr", en: "/en/assessment/ai-readiness-hr" }
  }
];

export function getServiceBySlug(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}
