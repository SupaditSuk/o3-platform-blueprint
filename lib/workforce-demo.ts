// Mockup dataset for the Workforce Intelligence in-app dashboard.
// Mirrors the prototype org ("Siam Growth Foods") so the page looks fully
// populated on first load (demo mode). When a user uploads their own
// Employee Master file, the free modules recompute from that file instead.

export type Tone = "info" | "amber" | "red" | "green";
export type TemplateStatus = "uploaded" | "completed" | "partial" | "not";

export type DemoInsight = { tone: Tone; title?: string; text: string };
export type Series = { label: string; data: number[]; color?: string };

export const DEMO_ORG = {
  name: "Siam Growth Foods Co., Ltd.",
  industry: "Food & Beverage",
  size: "501 - 1,000",
  period: "YTD 2026",
  region: "Thailand",
  dataStatus: "Validated 82%",
  headcount: 742,
  businessType: "Manufacturing + Sales",
  businessNote: "FMCG supply chain",
  benchmarkSegment: "F&B · 501-1,000",
  consent: "Benchmark Opt-in",
  consentNote: "Aggregated only"
};

export const DEMO_BENCHMARK_READINESS = {
  score: 68,
  delta: "+18% after adding Job Function Mapping",
  note: "ต้องเพิ่ม Compensation และ Engagement เพื่อปลดล็อก Benchmark ที่ลึกขึ้น"
};

export const DEMO_TEMPLATES: Array<{ name: string; desc: string; status: TemplateStatus; tags: string[]; pro?: boolean }> = [
  { name: "Employee Master", desc: "Required: Employee ID, Department, Position, Level, Join Date, Status", status: "uploaded", tags: ["742 rows"] },
  { name: "Turnover / Exit", desc: "Exit Date, Exit Type, Exit Reason, Regrettable Loss, Manager", status: "uploaded", tags: ["64 rows"] },
  { name: "Recruitment", desc: "Requisition, Stage, Source, Time to Fill, Offer Reason", status: "uploaded", tags: ["128 records"] },
  { name: "Training", desc: "Course, Hours, Cost, Completion, Pre/Post Score", status: "partial", tags: ["Pre/Post missing"] },
  { name: "Company Profile", desc: "Industry, size, revenue range, operating model, location", status: "completed", tags: [] },
  { name: "Performance & Talent", desc: "Performance, Potential, 9-Box, Critical Talent, Readiness", status: "partial", tags: ["Pro"], pro: true },
  { name: "Compensation", desc: "Salary, grade, pay mix, compa ratio, benefits, OT cost", status: "not", tags: ["Pro"], pro: true },
  { name: "Engagement Survey", desc: "Engagement, eNPS, manager score, well-being, burnout", status: "not", tags: ["Pro"], pro: true }
];

export const DEMO_DASHBOARD_READINESS: Array<{ label: string; pct: number }> = [
  { label: "Executive Summary", pct: 92 },
  { label: "Turnover + Exit Insights", pct: 86 },
  { label: "Recruitment Funnel", pct: 78 },
  { label: "Training Analytics", pct: 61 },
  { label: "Compensation Benchmark", pct: 22 }
];

export const DEMO_VALIDATION: Array<{ issue: string; severity: "warning" | "error"; rows: number; action: string }> = [
  { issue: "Department naming inconsistency: Sales, Sale, ฝ่ายขาย", severity: "warning", rows: 41, action: "Map to Sales Function" },
  { issue: "Missing Manager ID in Exit Template", severity: "warning", rows: 9, action: "Optional but recommended" },
  { issue: "Exit Date before Join Date", severity: "error", rows: 2, action: "Fix required" },
  { issue: "Training post-score missing", severity: "warning", rows: 73, action: "Required for ROI insight" }
];

// ---- Executive Summary ----
export const DEMO_EXEC_KPIS: Array<{ label: string; value: string; delta: string; dir: "up" | "down" | "warn" }> = [
  { label: "Headcount", value: "742", delta: "+4.8% YoY", dir: "up" },
  { label: "Turnover Rate", value: "14.6%", delta: "+2.1 pts vs LY", dir: "down" },
  { label: "Time to Fill", value: "38d", delta: "Sales roles 52d", dir: "warn" },
  { label: "Training Hours/FTE", value: "16.8", delta: "+3.2 hrs", dir: "up" },
  { label: "Productivity Index", value: "104", delta: "+7%", dir: "up" }
];

export const DEMO_HEADCOUNT_TREND = { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], data: [708, 715, 721, 728, 735, 742] };
export const DEMO_HEALTH_RADAR = [
  { label: "Productivity", value: 78 },
  { label: "Retention", value: 62 },
  { label: "Hiring", value: 71 },
  { label: "Learning", value: 74 },
  { label: "Engagement", value: 66 }
];
export const DEMO_AI_EXEC_BRIEF: DemoInsight[] = [
  { tone: "red", title: "Critical", text: "Sales turnover is rising while recruitment time is increasing." },
  { tone: "amber", title: "Watch", text: "Production overtime increased for 3 consecutive months." },
  { tone: "green", title: "Positive", text: "Training completion improved in the supervisor group." }
];

// ---- Workforce Productivity ----
export const DEMO_REV_FTE = { labels: ["Sales", "Production", "Supply Chain", "HR", "Finance", "IT"], data: [132, 104, 91, 73, 76, 88] };
export const DEMO_PRODUCTIVITY_SCATTER = [
  { x: 14, y: 104, label: "Sales" },
  { x: 22, y: 112, label: "Production" },
  { x: 9, y: 91, label: "Supply Chain" },
  { x: 18, y: 96, label: "Support" },
  { x: 7, y: 88, label: "IT" }
];
export const DEMO_PRODUCTIVITY_SIGNALS: DemoInsight[] = [
  { tone: "amber", text: "Production output/FTE improved 6%, but OT hours rose 18%." },
  { tone: "info", text: "Sales revenue/FTE is highest, but new-hire ramp-up is slower than average." },
  { tone: "red", text: "Logistics absence frequency is 1.6x the company average." }
];

// ---- Employee Demographic ----
export const DEMO_GENERATION_MIX = [
  { label: "Gen Z", value: 18 },
  { label: "Gen Y", value: 46 },
  { label: "Gen X", value: 31 },
  { label: "Baby Boomer", value: 5 }
];
export const DEMO_FUNCTION_MIX = { labels: ["Sales", "Production", "Supply Chain", "Support", "IT"], data: [196, 282, 118, 104, 42] };
export const DEMO_TENURE = { labels: ["0-1y", "1-3y", "3-5y", "5-10y", "10y+"], data: [148, 210, 132, 168, 84] };
export const DEMO_JOB_LEVEL = [
  { label: "L1 Staff", value: 362 },
  { label: "L2 Senior", value: 184 },
  { label: "L3 Sup", value: 108 },
  { label: "L4 Mgr", value: 70 },
  { label: "L5+", value: 18 }
];

// ---- Recruitment ----
export const DEMO_FUNNEL = { labels: ["Applied", "Screened", "Interview", "Offer", "Hired"], data: [1280, 420, 188, 92, 64] };
export const DEMO_SOURCE = { labels: ["Referral", "Job Board", "Facebook", "Agency", "Campus"], data: [86, 72, 68, 64, 75] };
export const DEMO_RECRUIT_BOTTLENECKS: Array<{ stage: string; days: number; issue: string }> = [
  { stage: "Hiring Manager Review", days: 9.4, issue: "Delay" },
  { stage: "Offer Approval", days: 6.2, issue: "Salary gap" },
  { stage: "Interview Scheduling", days: 4.1, issue: "No-show" }
];

// ---- Training ----
export const DEMO_TRAINING_HOURS = { labels: ["Sales", "Production", "Supply Chain", "Support", "IT"], data: [12, 18, 15, 20, 24] };
export const DEMO_TRAINING_OUTCOME: { labels: string[]; series: Series[] } = {
  labels: ["Course A", "Course B", "Course C", "Course D"],
  series: [
    { label: "Completion %", data: [92, 81, 76, 88] },
    { label: "Post Score", data: [78, 74, 69, 82] }
  ]
};
export const DEMO_TRAINING_READINESS: Array<{ label: string; pct: number }> = [
  { label: "Training Hours", pct: 100 },
  { label: "Cost Data", pct: 82 },
  { label: "Pre/Post Assessment", pct: 39 }
];

// ---- Turnover + Exit ----
export const DEMO_TURNOVER_KPIS: Array<{ label: string; value: string; delta: string; dir: "up" | "down" | "warn" }> = [
  { label: "Voluntary Turnover", value: "11.2%", delta: "Above target 8%", dir: "down" },
  { label: "New Hire Turnover", value: "18.4%", delta: "Critical for Sales", dir: "down" },
  { label: "Regrettable Loss", value: "27", delta: "High performers: 9", dir: "warn" },
  { label: "Exit Survey Response", value: "72%", delta: "Good quality", dir: "up" }
];
export const DEMO_EXIT_REASON = { labels: ["Career Growth", "Manager", "Compensation", "Workload", "Commute", "Culture Fit"], data: [18, 14, 11, 9, 7, 5] };
export const DEMO_TURNOVER_BY_TENURE = { labels: ["0-6m", "6-12m", "1-3y", "3-5y", "5y+"], data: [22, 18, 13, 9, 6] };
export const DEMO_EXIT_DRIVERS: DemoInsight[] = [
  { tone: "red", title: "Pattern", text: "0-12 months tenure accounts for 38% of exits." },
  { tone: "amber", title: "Reason", text: "Career growth and manager relationship are the top 2 reasons." },
  { tone: "info", title: "Action", text: "Add an onboarding manager check-in at month 2, 5, and 8." }
];

// ---- Premium (locked mockups) ----
export const DEMO_NINEBOX = [
  { x: 3, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 1 }
].map((p) => ({ ...p, label: "" }));
export const DEMO_CRITICAL_TALENT: Array<{ group: string; hc: number; risk: string }> = [
  { group: "High Performer + Low Engagement", hc: 18, risk: "High" },
  { group: "Critical Role No Successor", hc: 11, risk: "High" }
];
export const DEMO_SUCCESSION_COVERAGE = 54;
export const DEMO_SALARY_COST = { labels: ["Sales", "Production", "Supply Chain", "Support", "IT"], data: [42, 58, 25, 31, 18] };
export const DEMO_COMPA_DIST = { labels: ["<0.8", "0.8-0.9", "0.9-1.1", "1.1-1.2", ">1.2"], data: [46, 138, 421, 96, 41] };
export const DEMO_PAY_RISK: DemoInsight[] = [
  { tone: "red", text: "High performers in Sales have a compa ratio below 0.85." },
  { tone: "amber", text: "Production OT cost increased 22% YTD." }
];
export const DEMO_ENGAGEMENT_DRIVERS = { labels: ["Career", "Manager", "Reward", "Workload", "Culture"], data: [66, 61, 64, 58, 72] };
export const DEMO_ABSENCE: { labels: string[]; series: Series[] } = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  series: [
    { label: "Absence Days/FTE", data: [0.8, 0.9, 1.1, 1.0, 1.3, 1.4] },
    { label: "OT Hours/FTE", data: [12, 13, 15, 14, 17, 18] }
  ]
};
export const DEMO_MANAGER_EFFECTIVENESS: Array<{ segment: string; turnover: string; engagement: number }> = [
  { segment: "Top Quartile", turnover: "6.2%", engagement: 84 },
  { segment: "Bottom Quartile", turnover: "19.8%", engagement: 61 }
];
export const DEMO_BENCHMARK_INDUSTRY = { yours: "14.6%", median: "12.1%", percentile: "P68" };
export const DEMO_BENCHMARK_FUNCTION: Array<{ fn: string; yours: string; median: string }> = [
  { fn: "Sales Turnover", yours: "21%", median: "15%" },
  { fn: "Production OT/FTE", yours: "18h", median: "13h" }
];
export const DEMO_BENCHMARK_UNLOCK = [
  "Complete the Company Profile and Employee Master mapping",
  "Upload at least 3 insight templates: Exit, Recruitment, Training",
  "Opt-in to the aggregated anonymous benchmark pool"
];
export const DEMO_AI_RISK: DemoInsight[] = [
  { tone: "red", title: "Critical", text: "Sales turnover risk is driven by low manager score, long time-to-fill, and low compa ratio." },
  { tone: "amber", title: "Watch", text: "Training data is insufficient to confirm skill-gap impact on productivity." },
  { tone: "green", title: "Opportunity", text: "Production productivity increased after the supervisor training cohort." }
];
