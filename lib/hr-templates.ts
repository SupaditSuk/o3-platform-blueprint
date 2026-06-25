import type { WorkforceRow } from "@/lib/workforce-analytics";

export type FieldTier = "required" | "recommended" | "insight";
export type TemplateField = { key: string; label: string; tier: FieldTier; example: string };

// Increment 1 uses a single "Employee Master" template (with exit fields folded in)
// so Executive Summary, Demographic, and Turnover can be computed from one file.
export const EMPLOYEE_MASTER_FIELDS: TemplateField[] = [
  { key: "employee_id", label: "Employee ID", tier: "required", example: "E1001" },
  { key: "department", label: "Department", tier: "required", example: "Sales" },
  { key: "position", label: "Position", tier: "required", example: "Sales Executive" },
  { key: "level", label: "Level", tier: "required", example: "O2" },
  { key: "join_date", label: "Join Date", tier: "required", example: "2021-05-01" },
  { key: "employment_status", label: "Employment Status", tier: "required", example: "Active" },
  { key: "gender", label: "Gender", tier: "recommended", example: "M" },
  { key: "birth_date", label: "Birth Date", tier: "recommended", example: "1992-03-15" },
  { key: "location", label: "Location", tier: "recommended", example: "Bangkok" },
  { key: "job_family", label: "Job Family", tier: "recommended", example: "Commercial" },
  { key: "manager_id", label: "Manager ID", tier: "recommended", example: "E0500" },
  { key: "monthly_salary", label: "Monthly Salary", tier: "recommended", example: "32000" },
  { key: "exit_date", label: "Exit Date", tier: "insight", example: "" },
  { key: "exit_reason", label: "Exit Reason", tier: "insight", example: "" },
  { key: "critical_role", label: "Critical Role (Y/N)", tier: "insight", example: "N" }
];

export type DashboardModule = {
  id: string;
  name: string;
  group: string;
  tier: "free" | "pro";
  /** Increment 1 implements a few modules for real; the rest are teasers. */
  ready: boolean;
};

export const DASHBOARD_MODULES: DashboardModule[] = [
  { id: "executive", name: "Executive Summary", group: "Executive", tier: "free", ready: true },
  { id: "demographic", name: "Employee Demographic", group: "Workforce", tier: "free", ready: true },
  { id: "turnover", name: "Turnover Analytics", group: "Retention", tier: "free", ready: true },
  { id: "productivity", name: "Workforce Productivity", group: "Workforce", tier: "free", ready: false },
  { id: "planning", name: "Workforce Planning", group: "Workforce", tier: "free", ready: false },
  { id: "recruitment", name: "Recruitment Status", group: "Talent", tier: "free", ready: false },
  { id: "people", name: "People Analytics", group: "Talent", tier: "pro", ready: false },
  { id: "succession", name: "Succession & Talent", group: "Talent", tier: "pro", ready: false },
  { id: "training", name: "Training Analytics", group: "Learning", tier: "free", ready: false },
  { id: "movement", name: "Employee Movement", group: "Retention", tier: "free", ready: false },
  { id: "compensation", name: "Compensation", group: "Reward", tier: "pro", ready: false },
  { id: "engagement", name: "Engagement & Culture", group: "Reward", tier: "pro", ready: false },
  { id: "absence", name: "Absenteeism & Well-being", group: "Reward", tier: "pro", ready: false },
  { id: "manager", name: "Manager Effectiveness", group: "Reward", tier: "pro", ready: false }
];

const ALIASES: Record<string, string[]> = {
  employee_id: ["employee_id", "employee id", "emp_id", "id", "รหัสพนักงาน"],
  department: ["department", "dept", "แผนก", "ฝ่าย"],
  position: ["position", "title", "ตำแหน่ง"],
  level: ["level", "grade", "ระดับ"],
  join_date: ["join_date", "hire_date", "start_date", "วันเริ่มงาน"],
  employment_status: ["employment_status", "status", "สถานะ"],
  gender: ["gender", "sex", "เพศ"],
  birth_date: ["birth_date", "dob", "วันเกิด"],
  location: ["location", "site", "สถานที่"],
  job_family: ["job_family", "family"],
  manager_id: ["manager_id", "manager", "หัวหน้า"],
  monthly_salary: ["monthly_salary", "salary", "เงินเดือน"],
  exit_date: ["exit_date", "resign_date", "วันลาออก"],
  exit_reason: ["exit_reason", "reason", "เหตุผลลาออก"],
  critical_role: ["critical_role", "critical", "key_role"]
};

function normalize(key: string): string {
  return key.trim().toLowerCase().replace(/\s+/g, "_");
}

function value(row: WorkforceRow, fieldKey: string): unknown {
  const aliases = ALIASES[fieldKey] ?? [fieldKey];
  for (const k of Object.keys(row)) {
    if (aliases.includes(normalize(k))) return row[k];
  }
  return undefined;
}

function filled(v: unknown): boolean {
  return v !== undefined && v !== null && String(v).trim() !== "";
}

export type ValidationIssue = {
  type: string;
  count: number;
  severity: "critical" | "warning";
  action: string;
};

export function validateRows(rows: WorkforceRow[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const missingId = rows.filter((r) => !filled(value(r, "employee_id"))).length;
  if (missingId) issues.push({ type: "Missing Employee ID", count: missingId, severity: "critical", action: "เติมก่อน Generate" });

  const ids = rows.map((r) => String(value(r, "employee_id") ?? "").trim()).filter(Boolean);
  const dupCount = ids.length - new Set(ids).size;
  if (dupCount > 0) issues.push({ type: "Duplicate Employee ID", count: dupCount, severity: "critical", action: "Merge / Remove" });

  let exitBeforeJoin = 0;
  for (const r of rows) {
    const join = Date.parse(String(value(r, "join_date") ?? ""));
    const exit = Date.parse(String(value(r, "exit_date") ?? ""));
    if (!Number.isNaN(join) && !Number.isNaN(exit) && exit < join) exitBeforeJoin += 1;
  }
  if (exitBeforeJoin) issues.push({ type: "Exit Date before Join Date", count: exitBeforeJoin, severity: "critical", action: "แก้แถวที่ผิด" });

  const missingDept = rows.filter((r) => !filled(value(r, "department"))).length;
  if (missingDept) issues.push({ type: "Missing Department", count: missingDept, severity: "warning", action: "เติม / Map" });

  const missingManager = rows.filter((r) => !filled(value(r, "manager_id"))).length;
  if (missingManager) issues.push({ type: "Missing Manager ID", count: missingManager, severity: "warning", action: "แนะนำให้เติม" });

  // Department naming variants (e.g. Sales / SALE / ฝ่ายขาย)
  const deptVariants = new Map<string, Set<string>>();
  for (const r of rows) {
    const raw = String(value(r, "department") ?? "").trim();
    if (!raw) continue;
    const norm = raw.toLowerCase().replace(/[^a-z0-9ก-๙]/g, "");
    if (!deptVariants.has(norm)) deptVariants.set(norm, new Set());
    deptVariants.get(norm)!.add(raw);
  }
  const mismatched = [...deptVariants.values()].filter((s) => s.size > 1).reduce((sum, s) => sum + s.size, 0);
  if (mismatched) issues.push({ type: "Department naming mismatch", count: mismatched, severity: "warning", action: "Map ให้เป็นชื่อเดียว" });

  return issues;
}

function completion(rows: WorkforceRow[], tier: FieldTier): number {
  const fields = EMPLOYEE_MASTER_FIELDS.filter((f) => f.tier === tier);
  if (!fields.length || !rows.length) return 0;
  let filledCells = 0;
  for (const r of rows) {
    for (const f of fields) if (filled(value(r, f.key))) filledCells += 1;
  }
  return filledCells / (fields.length * rows.length);
}

export type Readiness = { score: number; status: string; required: number; recommended: number; insight: number };

export function readiness(rows: WorkforceRow[]): Readiness {
  const required = completion(rows, "required");
  const recommended = completion(rows, "recommended");
  const insight = completion(rows, "insight");
  const score = Math.round((required * 50 + recommended * 25 + insight * 25));
  const status = score >= 90 ? "Ready + AI" : score >= 70 ? "Dashboard Ready" : score >= 50 ? "Basic Only" : "Not Ready";
  return { score, status, required: Math.round(required * 100), recommended: Math.round(recommended * 100), insight: Math.round(insight * 100) };
}

// Demo data filled per the template (with a couple intentional quirks to show validation).
export const SAMPLE_HR: WorkforceRow[] = [
  { employee_id: "E1001", department: "Sales", position: "Executive", level: "O2", join_date: "2023-08-01", employment_status: "Active", gender: "M", birth_date: "1996-04-10", location: "Bangkok", manager_id: "E0500", monthly_salary: 32000, exit_date: "", exit_reason: "" },
  { employee_id: "E1002", department: "Sales", position: "Manager", level: "M2", join_date: "2018-06-15", employment_status: "Active", gender: "F", birth_date: "1988-02-02", location: "Bangkok", manager_id: "E0400", monthly_salary: 58000, exit_date: "", exit_reason: "" },
  { employee_id: "E1003", department: "SALE", position: "Executive", level: "O2", join_date: "2023-09-01", employment_status: "Resigned", gender: "M", birth_date: "1997-09-20", location: "Bangkok", manager_id: "E0500", monthly_salary: 31000, exit_date: "2024-09-01", exit_reason: "Career Growth" },
  { employee_id: "E1004", department: "Operations", position: "Officer", level: "O1", join_date: "2021-01-10", employment_status: "Active", gender: "F", birth_date: "1994-11-05", location: "Rayong", manager_id: "E0420", monthly_salary: 28000, exit_date: "", exit_reason: "" },
  { employee_id: "E1005", department: "Operations", position: "Supervisor", level: "S1", join_date: "2017-04-20", employment_status: "Active", gender: "M", birth_date: "1985-07-30", location: "Rayong", manager_id: "E0420", monthly_salary: 42000, exit_date: "", exit_reason: "" },
  { employee_id: "E1006", department: "Engineering", position: "Engineer", level: "O2", join_date: "2022-11-05", employment_status: "Active", gender: "F", birth_date: "1995-01-18", location: "Bangkok", manager_id: "E0430", monthly_salary: 45000, exit_date: "", exit_reason: "" },
  { employee_id: "E1007", department: "Engineering", position: "Senior Engineer", level: "S1", join_date: "2019-02-18", employment_status: "Active", gender: "M", birth_date: "1990-05-12", location: "Bangkok", manager_id: "E0430", monthly_salary: 72000, exit_date: "", exit_reason: "" },
  { employee_id: "E1008", department: "Engineering", position: "Engineer", level: "O2", join_date: "2024-01-15", employment_status: "Active", gender: "M", birth_date: "1998-03-22", location: "Bangkok", manager_id: "E0430", monthly_salary: 42000, exit_date: "", exit_reason: "" },
  { employee_id: "E1009", department: "Engineering", position: "Engineer", level: "O2", join_date: "2023-05-01", employment_status: "Resigned", gender: "F", birth_date: "1996-12-01", location: "Bangkok", manager_id: "E0430", monthly_salary: 43000, exit_date: "2024-05-20", exit_reason: "Manager Style" },
  { employee_id: "E1010", department: "Finance", position: "Analyst", level: "O2", join_date: "2020-09-09", employment_status: "Active", gender: "F", birth_date: "1993-08-08", location: "Bangkok", manager_id: "E0440", monthly_salary: 38000, exit_date: "", exit_reason: "" },
  { employee_id: "E1011", department: "Finance", position: "Manager", level: "M2", join_date: "2016-07-01", employment_status: "Active", gender: "M", birth_date: "1983-10-10", location: "Bangkok", manager_id: "E0400", monthly_salary: 68000, exit_date: "", exit_reason: "" },
  { employee_id: "E1012", department: "Marketing", position: "Specialist", level: "O2", join_date: "2024-02-01", employment_status: "Active", gender: "F", birth_date: "1999-06-15", location: "Bangkok", manager_id: "E0450", monthly_salary: 35000, exit_date: "", exit_reason: "" },
  { employee_id: "E1013", department: "Marketing", position: "Lead", level: "S1", join_date: "2018-12-01", employment_status: "Resigned", gender: "F", birth_date: "1989-03-03", location: "Bangkok", manager_id: "E0400", monthly_salary: 58000, exit_date: "2024-07-15", exit_reason: "Compensation" },
  { employee_id: "E1013", department: "Logistics", position: "Coordinator", level: "O1", join_date: "2021-06-22", employment_status: "Active", gender: "F", birth_date: "1995-05-05", location: "Rayong", manager_id: "", monthly_salary: 30000, exit_date: "", exit_reason: "" },
  { employee_id: "E1015", department: "Logistics", position: "Manager", level: "M1", join_date: "2015-03-30", employment_status: "Active", gender: "M", birth_date: "1982-01-25", location: "Rayong", manager_id: "E0400", monthly_salary: 65000, exit_date: "", exit_reason: "" }
];

export function exitReasonBreakdown(rows: WorkforceRow[]): Array<{ label: string; count: number }> {
  const map = new Map<string, number>();
  for (const r of rows) {
    const aliases = ALIASES.exit_reason;
    let reason = "";
    for (const k of Object.keys(r)) {
      if (aliases.includes(normalize(k))) {
        reason = String(r[k] ?? "").trim();
        break;
      }
    }
    if (reason) map.set(reason, (map.get(reason) ?? 0) + 1);
  }
  return [...map.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count);
}

export function buildTemplateCsv(): string {
  const headers = EMPLOYEE_MASTER_FIELDS.map((f) => f.key).join(",");
  const example1 = EMPLOYEE_MASTER_FIELDS.map((f) => f.example).join(",");
  const example2 = EMPLOYEE_MASTER_FIELDS.map((f) =>
    f.key === "employee_id"
      ? "E1002"
      : f.key === "department"
        ? "Operations"
        : f.key === "join_date"
          ? "2019-02-18"
          : f.key === "employment_status"
            ? "Active"
            : f.key === "gender"
              ? "F"
              : f.key === "exit_date"
                ? "2024-09-01"
                : f.key === "exit_reason"
                  ? "Career Growth"
                  : f.key === "monthly_salary"
                    ? "45000"
                    : ""
  ).join(",");
  return `${headers}\n${example1}\n${example2}`;
}
