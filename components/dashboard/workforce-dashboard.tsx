"use client";

import { useMemo, useRef, useState } from "react";
import { Download, FileSpreadsheet, RotateCcw as RotateCcwIcon, Sparkles, Upload, Users } from "lucide-react";
import * as XLSX from "xlsx";
import { analyzeWorkforce, SAMPLE_WORKFORCE, type WorkforceRow } from "@/lib/workforce-analytics";
import type { Locale } from "@/lib/i18n";

const BAR_COLORS = ["#ef4444", "#f59e0b", "#3b82f6", "#10b981", "#a855f7", "#ec4899"];

const INSIGHT_TEXT: Record<string, (p: Record<string, string | number>, isThai: boolean) => string> = {
  topAttritionDept: (p, th) =>
    th ? `แผนกที่ลาออกสูงสุดคือ ${p.dept} (${p.rate}%)` : `Highest attrition: ${p.dept} (${p.rate}%)`,
  newcomerShare: (p, th) =>
    th ? `${p.pct}% ของพนักงานปัจจุบันอายุงานน้อยกว่า 1 ปี` : `${p.pct}% of active staff have under 1 year of tenure`,
  largestDept: (p, th) => (th ? `แผนกใหญ่สุดคือ ${p.dept} (${p.count} คน)` : `Largest team: ${p.dept} (${p.count} people)`),
  costConcentration: (p, th) =>
    th ? `${p.dept} คิดเป็น ${p.pct}% ของต้นทุนเงินเดือน` : `${p.dept} accounts for ${p.pct}% of payroll cost`
};

function Kpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/46">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-white">{value}</p>
      {hint ? <p className="mt-1 text-xs font-semibold text-white/40">{hint}</p> : null}
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
  const total = items.reduce((sum, i) => sum + i.count, 0) || 1;
  const r = 42;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 100 100" className="h-32 w-32 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
        {items.map((item, idx) => {
          const dash = (item.count / total) * circ;
          const seg = (
            <circle
              key={item.label}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={BAR_COLORS[idx % BAR_COLORS.length]}
              strokeWidth="12"
              strokeDasharray={`${dash} ${circ - dash}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return seg;
        })}
      </svg>
      <div className="grid gap-1.5">
        {items.map((item, idx) => (
          <div key={item.label} className="flex items-center gap-2 text-xs font-semibold text-white/70">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: BAR_COLORS[idx % BAR_COLORS.length] }} />
            {item.label} · {item.count} ({Math.round((item.count / total) * 100)}%)
          </div>
        ))}
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-coral">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

const TEMPLATE_CSV = `name,department,role,hire_date,exit_date,status,gender,salary
Somchai,Sales,Executive,2021-05-01,,active,M,32000
Ploy,HR,Manager,2018-02-15,,active,F,58000
Anan,Engineering,Engineer,2023-09-01,2024-08-01,left,M,45000`;

export function WorkforceDashboard({ locale }: { locale: Locale }) {
  const isThai = locale === "th";
  const [rows, setRows] = useState<WorkforceRow[] | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const metrics = useMemo(() => (rows ? analyzeWorkforce(rows) : null), [rows]);

  const handleFile = async (file: File) => {
    setError(null);
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { cellDates: true });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { defval: "" }) as WorkforceRow[];
      if (!json.length) {
        setError(isThai ? "ไม่พบข้อมูลในไฟล์" : "No rows found in the file.");
        return;
      }
      setRows(json);
      setFileName(file.name);
    } catch {
      setError(isThai ? "อ่านไฟล์ไม่สำเร็จ ลองไฟล์ .csv หรือ .xlsx" : "Could not read the file. Try a .csv or .xlsx.");
    }
  };

  const downloadTemplate = () => {
    const blob = new Blob([TEMPLATE_CSV], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "o3-workforce-template.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setRows(null);
    setFileName("");
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  if (!metrics) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
          }}
          className="grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-white/15 px-6 py-12 text-center transition-colors hover:border-red-400/40 hover:bg-white/[0.03]"
        >
          <Upload size={28} className="text-white/50" aria-hidden="true" />
          <p className="mt-4 text-lg font-bold text-white">
            {isThai ? "ลากไฟล์มาวาง หรือคลิกเพื่ออัปโหลด" : "Drop a file or click to upload"}
          </p>
          <p className="mt-2 text-sm font-semibold text-white/50">
            {isThai ? "รองรับ Excel (.xlsx) และ CSV — ข้อมูลถูกประมวลผลในเครื่องคุณ ไม่ถูกส่งขึ้น server" : "Excel (.xlsx) and CSV — processed in your browser, never uploaded."}
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void handleFile(file);
          }}
        />

        {error ? <p className="mt-4 text-sm font-semibold text-red-300">{error}</p> : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={downloadTemplate}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-bold text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <Download size={16} aria-hidden="true" />
            {isThai ? "ดาวน์โหลด template" : "Download template"}
          </button>
          <button
            type="button"
            onClick={() => {
              setRows(SAMPLE_WORKFORCE);
              setFileName(isThai ? "ข้อมูลตัวอย่าง" : "Sample data");
            }}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-neutral-950 transition-colors hover:bg-red-50"
          >
            <FileSpreadsheet size={16} aria-hidden="true" />
            {isThai ? "ลองด้วยข้อมูลตัวอย่าง" : "Try sample data"}
          </button>
        </div>
      </div>
    );
  }

  const currency = (n: number) => `฿${Math.round(n).toLocaleString()}`;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-white/64">
          <FileSpreadsheet size={16} className="text-coral" aria-hidden="true" />
          {fileName} · {metrics.total.toLocaleString()} {isThai ? "แถว" : "rows"}
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-white/72 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <RotateCcwIcon size={15} aria-hidden="true" />
          {isThai ? "อัปโหลดไฟล์ใหม่" : "Upload another file"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi
          label={isThai ? "พนักงานปัจจุบัน" : "Active headcount"}
          value={metrics.active.toLocaleString()}
          hint={isThai ? `จากทั้งหมด ${metrics.total}` : `of ${metrics.total} total`}
        />
        <Kpi
          label={isThai ? "อัตราการลาออก" : "Attrition rate"}
          value={`${metrics.attritionRate}%`}
          hint={isThai ? `ลาออก ${metrics.exited} คน` : `${metrics.exited} left`}
        />
        <Kpi
          label={isThai ? "อายุงานเฉลี่ย" : "Avg tenure"}
          value={metrics.hasDates ? `${metrics.avgTenureYears.toFixed(1)} ${isThai ? "ปี" : "yr"}` : "—"}
        />
        <Kpi
          label={isThai ? "ต้นทุนเงินเดือน/เดือน" : "Monthly payroll"}
          value={metrics.hasSalary ? currency(metrics.totalMonthlyCost) : "—"}
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel title={isThai ? "พนักงานตามแผนก" : "Headcount by department"}>
          <BarList
            items={metrics.byDepartment.map((d) => ({ label: d.department, value: d.active }))}
            colorClass="bg-red-500"
          />
        </Panel>

        {metrics.byDepartment.some((d) => d.exited > 0) ? (
          <Panel title={isThai ? "การลาออกตามแผนก" : "Attrition by department"}>
            <BarList
              items={metrics.byDepartment.filter((d) => d.exited > 0).map((d) => ({ label: d.department, value: d.exited }))}
              colorClass="bg-amber-500"
            />
          </Panel>
        ) : null}

        {metrics.hasDates ? (
          <Panel title={isThai ? "การกระจายอายุงาน" : "Tenure distribution"}>
            <BarList items={metrics.tenureBuckets.map((t) => ({ label: t.label, value: t.count }))} colorClass="bg-blue-500" />
          </Panel>
        ) : null}

        {metrics.hasGender && metrics.genderSplit.length ? (
          <Panel title={isThai ? "สัดส่วนเพศ" : "Gender split"}>
            <Donut items={metrics.genderSplit} />
          </Panel>
        ) : null}

        {metrics.hasSalary ? (
          <Panel title={isThai ? "ต้นทุนตามแผนก" : "Payroll by department"}>
            <BarList
              items={metrics.byDepartment.filter((d) => d.cost > 0).map((d) => ({ label: d.department, value: Math.round(d.cost) }))}
              colorClass="bg-emerald-500"
            />
          </Panel>
        ) : null}
      </div>

      {metrics.insights.length ? (
        <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/[0.07] p-5">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-coral">
            <Sparkles size={16} aria-hidden="true" />
            {isThai ? "อินไซต์เบื้องต้น" : "Quick insights"}
          </h3>
          <ul className="mt-4 grid gap-2.5">
            {metrics.insights.map((insight) => (
              <li key={insight.id} className="flex items-start gap-2 text-sm font-semibold leading-6 text-white/78">
                <Users size={15} className="mt-0.5 shrink-0 text-red-400" aria-hidden="true" />
                {INSIGHT_TEXT[insight.id]?.(insight.params, isThai) ?? insight.id}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs font-semibold leading-6 text-white/40">
            {isThai
              ? "นี่คือเวอร์ชันฟรี — เวอร์ชันเต็มมีมิติที่ลึกกว่าและ AI ช่วยวิเคราะห์เชิงลึกให้"
              : "This is the free version — the full plan adds deeper dimensions and AI-powered analysis."}
          </p>
        </div>
      ) : null}
    </div>
  );
}
