"use client";

import { useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Download,
  FileSpreadsheet,
  LayoutDashboard,
  Lock,
  Sparkles,
  Upload,
  Users
} from "lucide-react";
import * as XLSX from "xlsx";
import {
  buildTemplateCsv,
  DASHBOARD_MODULES,
  exitReasonBreakdown,
  readiness,
  SAMPLE_HR,
  validateRows
} from "@/lib/hr-templates";
import { analyzeWorkforce, type WorkforceRow } from "@/lib/workforce-analytics";
import type { Locale } from "@/lib/i18n";

const DONUT_COLORS = ["#dc2626", "#f59e0b", "#3b82f6", "#10b981", "#a855f7", "#ec4899"];

function Kpi({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/46">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">{value}</p>
      {delta ? <p className="mt-1 text-xs font-bold text-white/40">{delta}</p> : null}
    </div>
  );
}

function BarList({ items, colorClass = "bg-red-500" }: { items: Array<{ label: string; value: number }>; colorClass?: string }) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <div className="grid gap-2.5">
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex items-center justify-between text-xs font-semibold text-white/70">
            <span className="truncate pr-3">{item.label}</span>
            <span className="shrink-0">{item.value.toLocaleString()}</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
            <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${(item.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Donut({ items }: { items: Array<{ label: string; count: number }> }) {
  const total = items.reduce((s, i) => s + i.count, 0) || 1;
  const r = 42;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
        {items.map((item, idx) => {
          const dash = (item.count / total) * circ;
          const seg = (
            <circle key={item.label} cx="50" cy="50" r={r} fill="none" stroke={DONUT_COLORS[idx % DONUT_COLORS.length]} strokeWidth="12" strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-offset} />
          );
          offset += dash;
          return seg;
        })}
      </svg>
      <div className="grid gap-1.5">
        {items.map((item, idx) => (
          <div key={item.label} className="flex items-center gap-2 text-xs font-semibold text-white/70">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: DONUT_COLORS[idx % DONUT_COLORS.length] }} />
            {item.label} · {item.count} ({Math.round((item.count / total) * 100)}%)
          </div>
        ))}
      </div>
    </div>
  );
}

function Panel({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-white/10 bg-white/[0.04] p-5 ${className ?? ""}`}>
      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-coral">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function LockedTeaser({ title, note }: { title: string; note: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-red-500/[0.08] to-transparent p-6">
      <p className="inline-flex items-center gap-2 text-sm font-bold text-white">
        <Lock size={15} className="text-coral" aria-hidden="true" />
        {title}
      </p>
      <p className="mt-2 max-w-xl text-sm font-semibold leading-7 text-white/56">{note}</p>
      <span className="mt-4 inline-flex rounded-full bg-brand px-4 py-2 text-xs font-bold text-white">Upgrade to Pro</span>
    </div>
  );
}

export function HrDashboard({ locale }: { locale: Locale }) {
  const isThai = locale === "th";
  const [rows, setRows] = useState<WorkforceRow[] | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"templates" | "dashboard">("dashboard");
  const [active, setActive] = useState("executive");
  const inputRef = useRef<HTMLInputElement>(null);

  const metrics = useMemo(() => (rows ? analyzeWorkforce(rows) : null), [rows]);
  const issues = useMemo(() => (rows ? validateRows(rows) : []), [rows]);
  const ready = useMemo(() => (rows ? readiness(rows) : null), [rows]);
  const exitReasons = useMemo(() => (rows ? exitReasonBreakdown(rows) : []), [rows]);
  const criticalIssues = issues.filter((i) => i.severity === "critical").reduce((s, i) => s + i.count, 0);

  const handleFile = async (file: File) => {
    setError(null);
    try {
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { cellDates: true });
      const json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: "" }) as WorkforceRow[];
      if (!json.length) {
        setError(isThai ? "ไม่พบข้อมูลในไฟล์" : "No rows found.");
        return;
      }
      setRows(json);
      setFileName(file.name);
      setView("dashboard");
      setActive("executive");
    } catch {
      setError(isThai ? "อ่านไฟล์ไม่สำเร็จ" : "Could not read the file.");
    }
  };

  const downloadTemplate = () => {
    const blob = new Blob([buildTemplateCsv()], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "o3-hr-employee-master-template.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    setRows(SAMPLE_HR);
    setFileName(isThai ? "ข้อมูลตัวอย่าง O³ Demo" : "O³ Demo sample");
    setView("dashboard");
    setActive("executive");
  };

  // ---- Empty state ----
  if (!metrics || !ready) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
          className="grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-white/15 px-6 py-12 text-center transition-colors hover:border-red-400/40 hover:bg-white/[0.03]"
        >
          <Upload size={28} className="text-white/50" aria-hidden="true" />
          <p className="mt-4 text-lg font-bold text-white">
            {isThai ? "ดาวน์โหลด Template → กรอกข้อมูล → อัปโหลดกลับ" : "Download the template → fill it → upload"}
          </p>
          <p className="mt-2 text-sm font-semibold text-white/50">
            {isThai ? "Template-First — ไม่ต้องโยนไฟล์อิสระ ประมวลผลในเครื่องคุณ ไม่ขึ้น server" : "Template-first — processed in your browser, never uploaded."}
          </p>
        </div>
        <input ref={inputRef} type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleFile(f); }} />
        {error ? <p className="mt-4 text-sm font-semibold text-red-300">{error}</p> : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={downloadTemplate} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-bold text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white">
            <Download size={16} aria-hidden="true" />
            {isThai ? "ดาวน์โหลด Template (Employee Master)" : "Download template (Employee Master)"}
          </button>
          <button type="button" onClick={loadSample} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-neutral-950 transition-colors hover:bg-red-50">
            <FileSpreadsheet size={16} aria-hidden="true" />
            {isThai ? "ลองด้วยข้อมูลตัวอย่าง" : "Try sample data"}
          </button>
        </div>
      </div>
    );
  }

  const groups = [...new Set(DASHBOARD_MODULES.map((m) => m.group))];
  const currency = (n: number) => `฿${Math.round(n).toLocaleString()}`;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-neutral-950">
      <div className="grid lg:grid-cols-[250px_1fr]">
        {/* Sidebar */}
        <aside className="border-b border-white/10 bg-black/40 p-4 lg:border-b-0 lg:border-r">
          <button
            type="button"
            onClick={() => setView("templates")}
            className={`w-full rounded-xl border p-3 text-left transition-colors ${view === "templates" ? "border-coral/40 bg-white/[0.06]" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"}`}
          >
            <p className="text-sm font-bold text-white">Template & Readiness</p>
            <div className="mt-2 flex items-center justify-between text-xs font-bold">
              <span className="text-coral">{ready.score}%</span>
              <span className={criticalIssues ? "text-red-300" : "text-white/40"}>
                {issues.reduce((s, i) => s + i.count, 0)} issues
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-coral" style={{ width: `${ready.score}%` }} />
            </div>
          </button>

          <div className="mt-4 space-y-3">
            {groups.map((group) => (
              <div key={group}>
                <p className="px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/34">{group}</p>
                <div className="mt-1.5 grid gap-1">
                  {DASHBOARD_MODULES.filter((m) => m.group === group).map((m) => {
                    const isActive = view === "dashboard" && active === m.id;
                    const badge = m.tier === "pro" ? "Pro" : m.ready ? "Ready" : "Soon";
                    return (
                      <button
                        key={m.id}
                        type="button"
                        disabled={!m.ready}
                        onClick={() => { setActive(m.id); setView("dashboard"); }}
                        className={`flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-semibold transition-colors ${
                          isActive ? "bg-white text-neutral-950" : m.ready ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-white/34"
                        }`}
                      >
                        <span className="truncate">{m.name}</span>
                        <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                          isActive ? "bg-neutral-900 text-white" : m.tier === "pro" ? "bg-amber-300/15 text-amber-200" : m.ready ? "bg-emerald-300/15 text-emerald-200" : "bg-white/8 text-white/40"
                        }`}>{badge}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div>
              <p className="px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/34">AI Layer</p>
              <div className="mt-1.5 grid gap-1">
                {["AI Workforce Intelligence", "AI Executive Report"].map((n) => (
                  <div key={n} className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-white/34">
                    <span className="truncate">{n}</span>
                    <Lock size={12} aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-white/64">
              <FileSpreadsheet size={16} className="text-coral" aria-hidden="true" />
              {fileName} · {metrics.total.toLocaleString()} {isThai ? "แถว" : "rows"}
            </p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={downloadTemplate} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/15 px-3 text-xs font-bold text-white/72 transition-colors hover:bg-white/[0.06] hover:text-white">
                <Download size={13} aria-hidden="true" /> Template
              </button>
              <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/15 px-3 text-xs font-bold text-white/72 transition-colors hover:bg-white/[0.06] hover:text-white">
                <Upload size={13} aria-hidden="true" /> {isThai ? "อัปโหลดใหม่" : "Upload"}
              </button>
              <span className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-brand px-3 text-xs font-bold text-white">{isThai ? "อัปเกรด Pro" : "Upgrade to Pro"}</span>
            </div>
            <input ref={inputRef} type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleFile(f); }} />
          </div>

          {view === "templates" ? (
            <TemplateCenter isThai={isThai} ready={ready} issues={issues} total={metrics.total} />
          ) : active === "executive" ? (
            <div className="mt-5 grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi label={isThai ? "พนักงานปัจจุบัน" : "Headcount"} value={metrics.active.toLocaleString()} delta={`${isThai ? "ทั้งหมด" : "of"} ${metrics.total}`} />
                <Kpi label={isThai ? "อัตราลาออก" : "Turnover Rate"} value={`${metrics.attritionRate}%`} delta={`${metrics.exited} ${isThai ? "ลาออก" : "exits"}`} />
                <Kpi label={isThai ? "อายุงานเฉลี่ย" : "Avg Tenure"} value={metrics.hasDates ? `${metrics.avgTenureYears.toFixed(1)} ${isThai ? "ปี" : "yr"}` : "—"} />
                <Kpi label={isThai ? "ต้นทุนเงินเดือน/เดือน" : "Monthly Payroll"} value={metrics.hasSalary ? currency(metrics.totalMonthlyCost) : "—"} />
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <Panel title={isThai ? "สัดส่วนกำลังคนตามแผนก" : "Workforce mix by department"}>
                  <BarList items={metrics.byDepartment.map((d) => ({ label: d.department, value: d.active }))} colorClass="bg-red-500" />
                </Panel>
                <LockedTeaser
                  title={isThai ? "Premium AI Executive Alert" : "Premium AI Executive Alert"}
                  note={isThai ? "AI สรุปความเสี่ยงและโอกาสข้ามทุก dashboard (เช่น Turnover + OT + Engagement) พร้อม recommendation — ปลดล็อกใน Pro" : "AI cross-dashboard risk & opportunity alerts with recommendations — unlock in Pro."}
                />
              </div>
            </div>
          ) : active === "demographic" ? (
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {metrics.hasGender && metrics.genderSplit.length ? (
                <Panel title={isThai ? "สัดส่วนเพศ" : "Gender split"}><Donut items={metrics.genderSplit} /></Panel>
              ) : null}
              {metrics.hasDates ? (
                <Panel title={isThai ? "การกระจายอายุงาน" : "Tenure distribution"}>
                  <BarList items={metrics.tenureBuckets.map((t) => ({ label: t.label, value: t.count }))} colorClass="bg-blue-500" />
                </Panel>
              ) : null}
              <Panel title={isThai ? "พนักงานตามแผนก" : "Headcount by department"} className="lg:col-span-2">
                <BarList items={metrics.byDepartment.map((d) => ({ label: d.department, value: d.active }))} colorClass="bg-red-500" />
              </Panel>
            </div>
          ) : active === "turnover" ? (
            <div className="mt-5 grid gap-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <Kpi label={isThai ? "อัตราลาออก" : "Turnover Rate"} value={`${metrics.attritionRate}%`} />
                <Kpi label={isThai ? "จำนวนลาออก" : "Total Exits"} value={metrics.exited.toLocaleString()} />
                <Kpi label={isThai ? "เหตุผลลาออก (มี)" : "Exit reasons captured"} value={`${exitReasons.reduce((s, e) => s + e.count, 0)}`} />
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <Panel title={isThai ? "การลาออกตามแผนก" : "Attrition by department"}>
                  <BarList items={metrics.byDepartment.filter((d) => d.exited > 0).map((d) => ({ label: d.department, value: d.exited }))} colorClass="bg-amber-500" />
                </Panel>
                {exitReasons.length ? (
                  <Panel title={isThai ? "เหตุผลการลาออก" : "Exit reasons"}>
                    <BarList items={exitReasons.map((e) => ({ label: e.label, value: e.count }))} colorClass="bg-coral" />
                  </Panel>
                ) : null}
              </div>
              <LockedTeaser
                title={isThai ? "AI Turnover Root Cause" : "AI Turnover Root Cause"}
                note={isThai ? "วิเคราะห์ root cause เชื่อม exit reason กับ tenure, manager, pay และ engagement + แนะนำ action 30/60/90 วัน — ปลดล็อกใน Pro" : "Root-cause analysis linking exit reasons to tenure, manager, pay, and engagement + 30/60/90-day actions — unlock in Pro."}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function TemplateCenter({
  isThai,
  ready,
  issues,
  total
}: {
  isThai: boolean;
  ready: ReturnType<typeof readiness>;
  issues: ReturnType<typeof validateRows>;
  total: number;
}) {
  return (
    <div className="mt-5 grid gap-4">
      <Panel title={isThai ? "Data Readiness" : "Data Readiness"}>
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <p className="text-4xl font-semibold tracking-[-0.04em] text-white">{ready.score}%</p>
            <p className="mt-1 text-sm font-bold text-coral">{ready.status}</p>
          </div>
          <div className="grid flex-1 gap-2 text-xs font-semibold text-white/64 sm:grid-cols-3">
            <span>Required: {ready.required}%</span>
            <span>Recommended: {ready.recommended}%</span>
            <span>Insight: {ready.insight}%</span>
          </div>
        </div>
        <p className="mt-4 text-xs font-semibold leading-6 text-white/40">
          {isThai
            ? `Employee Master • ${total} แถว — readiness คำนวณจาก Required×50% + Recommended×25% + Insight×25%`
            : `Employee Master • ${total} rows — readiness = Required×50% + Recommended×25% + Insight×25%`}
        </p>
      </Panel>

      <Panel title={isThai ? "สรุปการตรวจข้อมูล (Validation)" : "Data Validation Summary"}>
        {issues.length === 0 ? (
          <p className="text-sm font-semibold text-emerald-300">{isThai ? "ไม่พบปัญหา ✓" : "No issues found ✓"}</p>
        ) : (
          <ul className="grid gap-2">
            {issues.map((issue) => (
              <li key={issue.type} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/24 p-3">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                  <AlertTriangle size={15} className={issue.severity === "critical" ? "text-red-400" : "text-amber-300"} aria-hidden="true" />
                  {issue.type}
                </span>
                <span className="flex items-center gap-3 text-xs font-bold">
                  <span className="text-white/56">{issue.count}</span>
                  <span className={`rounded-full px-2 py-0.5 ${issue.severity === "critical" ? "bg-red-500/15 text-red-200" : "bg-amber-300/15 text-amber-200"}`}>{issue.severity}</span>
                  <span className="hidden text-white/40 sm:inline">{issue.action}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <div className="rounded-2xl border border-red-400/20 bg-red-500/[0.07] p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-coral">
          <Sparkles size={16} aria-hidden="true" /> AI Data Quality Coach
        </h3>
        <ul className="mt-4 grid gap-2.5 text-sm font-semibold leading-6 text-white/78">
          <li className="flex items-start gap-2"><Users size={15} className="mt-0.5 shrink-0 text-red-400" aria-hidden="true" />{isThai ? "เพิ่ม Exit Reason & Manager ID ให้ครบเพื่อปลดล็อก Turnover Root Cause" : "Complete Exit Reason & Manager ID to unlock Turnover Root Cause"}</li>
          <li className="flex items-start gap-2"><Users size={15} className="mt-0.5 shrink-0 text-red-400" aria-hidden="true" />{isThai ? "อัปโหลด Template: Performance & Talent เพื่อเปิด People Analytics / Succession" : "Add the Performance & Talent template to open People Analytics / Succession"}</li>
          <li className="flex items-start gap-2"><Users size={15} className="mt-0.5 shrink-0 text-red-400" aria-hidden="true" />{isThai ? "อัปโหลด Engagement Survey เพื่อเชื่อม Turnover กับ Manager Effectiveness" : "Add an Engagement Survey to link Turnover with Manager Effectiveness"}</li>
        </ul>
        <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white/40"><LayoutDashboard size={13} aria-hidden="true" />{isThai ? "AI Coach เต็มรูปแบบ — ปลดล็อกใน Pro" : "Full AI Coach — unlock in Pro"}</p>
      </div>
    </div>
  );
}
