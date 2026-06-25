export type WorkforceRow = Record<string, unknown>;

export type DeptStat = { department: string; active: number; exited: number; cost: number };
export type Insight = { id: string; params: Record<string, string | number> };

export type WorkforceMetrics = {
  total: number;
  active: number;
  exited: number;
  attritionRate: number; // percent, 0-100
  avgTenureYears: number;
  totalMonthlyCost: number;
  hasSalary: boolean;
  hasGender: boolean;
  hasDates: boolean;
  byDepartment: DeptStat[];
  genderSplit: Array<{ label: string; count: number }>;
  tenureBuckets: Array<{ label: string; count: number }>;
  insights: Insight[];
};

const FIELD_ALIASES: Record<string, string[]> = {
  department: ["department", "dept", "แผนก", "ฝ่าย"],
  hireDate: ["hire_date", "join_date", "start_date", "hiredate", "joindate", "startdate", "วันเริ่มงาน", "วันที่เริ่มงาน"],
  exitDate: ["exit_date", "resign_date", "end_date", "exitdate", "วันลาออก", "วันที่ลาออก"],
  status: ["status", "สถานะ"],
  gender: ["gender", "sex", "เพศ"],
  salary: ["salary", "monthly_salary", "เงินเดือน", "wage"]
};

const LEFT_STATUS = new Set(["left", "resigned", "terminated", "inactive", "exited", "ลาออก", "พ้นสภาพ", "ออก"]);

function normalizeKey(key: string): string {
  return key.trim().toLowerCase().replace(/\s+/g, "_");
}

function pick(row: WorkforceRow, field: keyof typeof FIELD_ALIASES): unknown {
  const aliases = FIELD_ALIASES[field];
  for (const key of Object.keys(row)) {
    if (aliases.includes(normalizeKey(key))) {
      return row[key];
    }
  }
  return undefined;
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const cleaned = value.replace(/[, ]/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function toDate(value: unknown): Date | null {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === "number" && value > 0) {
    // Excel serial date
    const d = new Date(Date.UTC(1899, 11, 30) + value * 86400000);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (typeof value === "string" && value.trim()) {
    const d = new Date(value.trim());
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function yearsBetween(from: Date, to: Date): number {
  return (to.getTime() - from.getTime()) / (365.25 * 86400000);
}

export function analyzeWorkforce(rows: WorkforceRow[]): WorkforceMetrics {
  const now = new Date();
  const byDeptMap = new Map<string, DeptStat>();
  const genderMap = new Map<string, number>();
  const tenure = { lt1: 0, y1to3: 0, y3to5: 0, gt5: 0 };

  let active = 0;
  let exited = 0;
  let totalMonthlyCost = 0;
  let tenureSum = 0;
  let tenureCount = 0;
  let hasSalary = false;
  let hasGender = false;
  let hasDates = false;

  for (const row of rows) {
    const exitDate = toDate(pick(row, "exitDate"));
    const statusRaw = pick(row, "status");
    const status = typeof statusRaw === "string" ? statusRaw.trim().toLowerCase() : "";
    const isExited = Boolean(exitDate) || LEFT_STATUS.has(status);
    if (isExited) exited += 1;
    else active += 1;

    const deptRaw = pick(row, "department");
    const department = typeof deptRaw === "string" && deptRaw.trim() ? deptRaw.trim() : "Unspecified";
    const dept = byDeptMap.get(department) ?? { department, active: 0, exited: 0, cost: 0 };
    if (isExited) dept.exited += 1;
    else dept.active += 1;

    const salary = toNumber(pick(row, "salary"));
    if (salary !== null) {
      hasSalary = true;
      if (!isExited) {
        totalMonthlyCost += salary;
        dept.cost += salary;
      }
    }
    byDeptMap.set(department, dept);

    if (!isExited) {
      const genderRaw = pick(row, "gender");
      if (typeof genderRaw === "string" && genderRaw.trim()) {
        hasGender = true;
        const g = genderRaw.trim();
        genderMap.set(g, (genderMap.get(g) ?? 0) + 1);
      }

      const hireDate = toDate(pick(row, "hireDate"));
      if (hireDate) {
        hasDates = true;
        const years = yearsBetween(hireDate, exitDate && isExited ? exitDate : now);
        tenureSum += years;
        tenureCount += 1;
        if (years < 1) tenure.lt1 += 1;
        else if (years < 3) tenure.y1to3 += 1;
        else if (years < 5) tenure.y3to5 += 1;
        else tenure.gt5 += 1;
      }
    }
  }

  const total = rows.length;
  const byDepartment = [...byDeptMap.values()].sort((a, b) => b.active + b.exited - (a.active + a.exited));
  const attritionRate = total > 0 ? Math.round((exited / total) * 100) : 0;
  const avgTenureYears = tenureCount > 0 ? tenureSum / tenureCount : 0;

  const insights: Insight[] = [];

  const deptByAttrition = [...byDeptMap.values()]
    .filter((d) => d.active + d.exited >= 2)
    .map((d) => ({ dept: d.department, rate: Math.round((d.exited / (d.active + d.exited)) * 100) }))
    .sort((a, b) => b.rate - a.rate);
  if (deptByAttrition.length && deptByAttrition[0].rate > 0) {
    insights.push({ id: "topAttritionDept", params: { dept: deptByAttrition[0].dept, rate: deptByAttrition[0].rate } });
  }

  if (hasDates && active > 0) {
    const newcomerPct = Math.round((tenure.lt1 / active) * 100);
    if (newcomerPct > 0) insights.push({ id: "newcomerShare", params: { pct: newcomerPct } });
  }

  if (byDepartment.length) {
    const largest = [...byDepartment].sort((a, b) => b.active - a.active)[0];
    insights.push({ id: "largestDept", params: { dept: largest.department, count: largest.active } });
  }

  if (hasSalary && totalMonthlyCost > 0) {
    const topCost = [...byDeptMap.values()].sort((a, b) => b.cost - a.cost)[0];
    if (topCost && topCost.cost > 0) {
      insights.push({
        id: "costConcentration",
        params: { dept: topCost.department, pct: Math.round((topCost.cost / totalMonthlyCost) * 100) }
      });
    }
  }

  return {
    total,
    active,
    exited,
    attritionRate,
    avgTenureYears,
    totalMonthlyCost,
    hasSalary,
    hasGender,
    hasDates,
    byDepartment,
    genderSplit: [...genderMap.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count),
    tenureBuckets: [
      { label: "<1y", count: tenure.lt1 },
      { label: "1-3y", count: tenure.y1to3 },
      { label: "3-5y", count: tenure.y3to5 },
      { label: "5y+", count: tenure.gt5 }
    ],
    insights
  };
}

export const SAMPLE_WORKFORCE: WorkforceRow[] = [
  { name: "Anan", department: "Sales", role: "Executive", hire_date: "2020-03-01", gender: "M", salary: 32000 },
  { name: "Bee", department: "Sales", role: "Manager", hire_date: "2018-06-15", gender: "F", salary: 55000 },
  { name: "Chai", department: "Sales", role: "Executive", hire_date: "2023-08-01", exit_date: "2024-09-01", gender: "M", salary: 30000 },
  { name: "Dao", department: "HR", role: "Officer", hire_date: "2021-01-10", gender: "F", salary: 28000 },
  { name: "Ek", department: "HR", role: "Manager", hire_date: "2017-04-20", gender: "M", salary: 60000 },
  { name: "Fah", department: "Engineering", role: "Engineer", hire_date: "2022-11-05", gender: "F", salary: 45000 },
  { name: "Gan", department: "Engineering", role: "Senior Engineer", hire_date: "2019-02-18", gender: "M", salary: 72000 },
  { name: "Ham", department: "Engineering", role: "Engineer", hire_date: "2024-01-15", gender: "M", salary: 42000 },
  { name: "Ing", department: "Engineering", role: "Engineer", hire_date: "2023-05-01", exit_date: "2024-05-20", gender: "F", salary: 43000 },
  { name: "Jane", department: "Finance", role: "Analyst", hire_date: "2020-09-09", gender: "F", salary: 38000 },
  { name: "Kit", department: "Finance", role: "Manager", hire_date: "2016-07-01", gender: "M", salary: 68000 },
  { name: "Lek", department: "Marketing", role: "Specialist", hire_date: "2024-02-01", gender: "F", salary: 35000 },
  { name: "Mon", department: "Marketing", role: "Specialist", hire_date: "2023-10-10", gender: "F", salary: 34000 },
  { name: "Nok", department: "Marketing", role: "Lead", hire_date: "2018-12-01", exit_date: "2024-07-15", gender: "F", salary: 58000 },
  { name: "Opal", department: "Operations", role: "Coordinator", hire_date: "2021-06-22", gender: "F", salary: 30000 },
  { name: "Pat", department: "Operations", role: "Manager", hire_date: "2015-03-30", gender: "M", salary: 65000 }
];
