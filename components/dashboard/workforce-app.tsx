"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BarChart3, Download, FileSpreadsheet, Lock, LogOut, Upload } from "lucide-react";
import * as XLSX from "xlsx";
import {
  BarChart,
  Card,
  CardTitle,
  DonutChart,
  Insight,
  KpiCard,
  LineChart,
  Locked,
  Pill,
  ProgressBar,
  RadarChart,
  ScatterChart
} from "@/components/dashboard/charts";
import { AnalyticsChat } from "@/components/dashboard/analytics-chat";
import { buildTemplateCsv, exitReasonBreakdown, readiness, SAMPLE_HR, validateRows } from "@/lib/hr-templates";
import { analyzeWorkforce, type WorkforceRow } from "@/lib/workforce-analytics";
import * as D from "@/lib/workforce-demo";
import type { Locale } from "@/lib/i18n";

type Badge = "Free" | "Pro" | "Future" | "AI";
type NavItem = { id: string; label: string; badge: Badge };

const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Start",
    items: [
      { id: "overview", label: "Organization Profile", badge: "Free" },
      { id: "templates", label: "Template Center", badge: "Free" },
      { id: "readiness", label: "Data Readiness", badge: "Free" }
    ]
  },
  {
    group: "Analytics",
    items: [
      { id: "executive", label: "Executive Summary", badge: "Free" },
      { id: "productivity", label: "Workforce Productivity", badge: "Free" },
      { id: "demographic", label: "Employee Demographic", badge: "Free" },
      { id: "recruitment", label: "Recruitment Status", badge: "Free" },
      { id: "training", label: "Training Analytics", badge: "Free" },
      { id: "turnover", label: "Turnover + Exit", badge: "Free" }
    ]
  },
  {
    group: "Premium",
    items: [
      { id: "people", label: "People Analytics", badge: "Pro" },
      { id: "compensation", label: "Compensation", badge: "Pro" },
      { id: "engagement", label: "Engagement & Culture", badge: "Pro" },
      { id: "manager", label: "Manager Effectiveness", badge: "Pro" },
      { id: "benchmark", label: "Benchmark Preview", badge: "Future" },
      { id: "ai", label: "AI Analytics", badge: "AI" }
    ]
  }
];

const BADGE_CLASS: Record<Badge, string> = {
  Free: "bg-emerald-300/15 text-emerald-200",
  Pro: "bg-amber-300/15 text-amber-200",
  Future: "bg-[#5b8def]/15 text-[#9cc0ff]",
  AI: "bg-purple-400/15 text-purple-200"
};

const STATUS_PILL: Record<D.TemplateStatus, { label: string; tone: "green" | "amber" | "red" | "gray" }> = {
  uploaded: { label: "Uploaded", tone: "green" },
  completed: { label: "Completed", tone: "green" },
  partial: { label: "Partial", tone: "amber" },
  not: { label: "Not uploaded", tone: "red" }
};

const G2 = "grid gap-4 md:grid-cols-2";
const G3 = "grid gap-4 md:grid-cols-2 lg:grid-cols-3";
const G4 = "grid gap-4 sm:grid-cols-2 lg:grid-cols-4";

type Live = {
  metrics: ReturnType<typeof analyzeWorkforce>;
  issues: ReturnType<typeof validateRows>;
  ready: ReturnType<typeof readiness>;
  exits: ReturnType<typeof exitReasonBreakdown>;
};

function buildSummary(live: Live | null): string {
  if (live) {
    const m = live.metrics;
    const deptLines = m.byDepartment
      .map((d) => `${d.department}: ${d.active} active, ${d.exited} exited${d.cost ? `, payroll ${Math.round(d.cost)}` : ""}`)
      .join("; ");
    const exits = live.exits.map((e) => `${e.label}: ${e.count}`).join("; ") || "none recorded";
    const issues = live.issues.map((i) => `${i.type} (${i.count}, ${i.severity})`).join("; ") || "none";
    return [
      `Source: user-uploaded Employee Master (${m.total} rows).`,
      `Headcount active ${m.active}, exited ${m.exited}, turnover ${m.attritionRate}%.`,
      m.hasDates ? `Average tenure ${m.avgTenureYears.toFixed(1)} years.` : "Tenure: join dates missing.",
      m.hasSalary ? `Monthly payroll ${Math.round(m.totalMonthlyCost)} THB.` : "Salary: not provided.",
      `By department — ${deptLines}.`,
      `Exit reasons — ${exits}.`,
      `Data readiness ${live.ready.score}% (Required ${live.ready.required}%, Recommended ${live.ready.recommended}%, Insight ${live.ready.insight}%).`,
      `Validation issues — ${issues}.`
    ].join("\n");
  }
  return [
    `Source: DEMO dataset for ${D.DEMO_ORG.name} (${D.DEMO_ORG.industry}, size ${D.DEMO_ORG.size}, ${D.DEMO_ORG.region}).`,
    `Executive KPIs — ${D.DEMO_EXEC_KPIS.map((k) => `${k.label} ${k.value} (${k.delta})`).join("; ")}.`,
    `Turnover — ${D.DEMO_TURNOVER_KPIS.map((k) => `${k.label} ${k.value} (${k.delta})`).join("; ")}.`,
    `Function headcount — ${D.DEMO_FUNCTION_MIX.labels.map((l, i) => `${l}: ${D.DEMO_FUNCTION_MIX.data[i]}`).join("; ")}.`,
    `Exit reasons — ${D.DEMO_EXIT_REASON.labels.map((l, i) => `${l}: ${D.DEMO_EXIT_REASON.data[i]}`).join("; ")}.`,
    `Turnover by tenure (%) — ${D.DEMO_TURNOVER_BY_TENURE.labels.map((l, i) => `${l}: ${D.DEMO_TURNOVER_BY_TENURE.data[i]}`).join("; ")}.`,
    `Recruitment funnel — ${D.DEMO_FUNNEL.labels.map((l, i) => `${l}: ${D.DEMO_FUNNEL.data[i]}`).join("; ")}.`,
    `Benchmark readiness ${D.DEMO_BENCHMARK_READINESS.score}%.`,
    "Note: this is mockup demo data; premium templates (compensation, engagement, performance) are not yet uploaded."
  ].join("\n");
}

type DashAccount = { name: string; email: string; avatar: string | null };

export function WorkforceApp({ locale, account }: { locale: Locale; account: DashAccount }) {
  const isThai = locale === "th";
  const [rows, setRows] = useState<WorkforceRow[] | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState("overview");
  const [chatOpen, setChatOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const live = useMemo<Live | null>(() => {
    if (!rows) return null;
    return {
      metrics: analyzeWorkforce(rows),
      issues: validateRows(rows),
      ready: readiness(rows),
      exits: exitReasonBreakdown(rows)
    };
  }, [rows]);

  const summary = useMemo(() => buildSummary(live), [live]);

  // Scroll-spy: highlight the section crossing the upper third of the viewport.
  useEffect(() => {
    const sections = NAV.flatMap((g) => g.items).map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

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
      goTo("executive");
    } catch {
      setError(isThai ? "อ่านไฟล์ไม่สำเร็จ" : "Could not read the file.");
    }
  };

  const downloadTemplate = () => {
    const blob = new Blob([buildTemplateCsv()], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "o3-workforce-employee-master-template.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const currency = (n: number) => `฿${Math.round(n).toLocaleString()}`;
  const upgradeHref = `/${locale}/contact?interest=workforce_intelligence_pro`;
  const headcount = live ? live.metrics.active : D.DEMO_ORG.headcount;
  const sampleTag = live ? (isThai ? "ตัวอย่าง" : "Sample") : null;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 lg:grid lg:grid-cols-[264px_1fr]">
      {/* Sidebar (kept dark for brand contrast) */}
      <aside className="border-b border-slate-800 bg-neutral-950 p-4 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:overflow-auto lg:border-b-0 lg:border-r">
        <Link href={`/${locale}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/44 transition-colors hover:text-white">
          <ArrowLeft size={13} aria-hidden="true" /> {isThai ? "กลับเว็บไซต์" : "Back to site"}
        </Link>
        <div className="mt-3 text-xl font-extrabold tracking-tight">O³ Workforce</div>
        <p className="text-[11px] font-semibold text-coral">Intelligence Platform</p>

        <nav className="mt-5 space-y-4">
          {NAV.map((group) => (
            <div key={group.group}>
              <p className="px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/34">{group.group}</p>
              <div className="mt-1.5 grid gap-1">
                {group.items.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => goTo(item.id)}
                      className={`flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-[12.5px] font-semibold transition-colors ${
                        isActive ? "bg-white text-neutral-950" : "text-white/68 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase ${isActive ? "bg-neutral-900 text-white" : BADGE_CLASS[item.badge]}`}>
                        {item.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-6 border-t border-white/10 pt-4 lg:mt-auto">
          <Link
            href={`/${locale}/dashboard`}
            className="-m-1.5 flex items-center gap-2.5 rounded-xl p-1.5 transition-colors hover:bg-white/[0.06]"
            title={isThai ? "ไปบัญชีสมาชิก" : "Go to your account"}
          >
            {account.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={account.avatar} alt="" referrerPolicy="no-referrer" className="h-9 w-9 shrink-0 rounded-full object-cover" />
            ) : (
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-bold uppercase">
                {account.name.slice(0, 1)}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-white">{account.name}</p>
              <p className="truncate text-[11px] font-semibold text-white/44">{isThai ? "ดูบัญชีสมาชิก" : "View account"}</p>
            </div>
            <ArrowUpRight size={14} className="ml-auto shrink-0 text-white/40" aria-hidden="true" />
          </Link>
          <a
            href={`/auth/logout?next=/${locale}`}
            className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-white/44 transition-colors hover:text-white"
          >
            <LogOut size={12} aria-hidden="true" /> {isThai ? "ออกจากระบบ" : "Sign out"}
          </a>
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0">
        {/* Topbar */}
        <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 px-5 py-4 backdrop-blur sm:px-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-2xl">O³ Workforce Intelligence</h1>
              <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <FileSpreadsheet size={13} className="text-coral" aria-hidden="true" />
                {live ? `${fileName} · ${live.metrics.total.toLocaleString()} ${isThai ? "แถว (ข้อมูลของคุณ)" : "rows (your data)"}` : isThai ? `ข้อมูลตัวอย่าง · ${D.DEMO_ORG.name}` : `Demo data · ${D.DEMO_ORG.name}`}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={downloadTemplate} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-slate-300 px-3 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
                <Download size={13} aria-hidden="true" /> Template
              </button>
              <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-slate-300 px-3 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
                <Upload size={13} aria-hidden="true" /> {isThai ? "อัปโหลดข้อมูล" : "Upload"}
              </button>
              {!live ? (
                <button type="button" onClick={() => { setRows(SAMPLE_HR); setFileName(isThai ? "ตัวอย่าง O³" : "O³ sample"); goTo("executive"); }} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-slate-300 px-3 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
                  {isThai ? "ลองข้อมูลตัวอย่าง" : "Try sample"}
                </button>
              ) : null}
              <Link href={upgradeHref} className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-brand px-3 text-xs font-bold text-white transition-colors hover:bg-coral">
                {isThai ? "อัปเกรด Pro" : "Upgrade to Pro"}
              </Link>
            </div>
          </div>
          <input ref={inputRef} type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleFile(f); }} />
          {error ? <p className="mt-2 text-xs font-semibold text-red-500">{error}</p> : null}
        </div>

        <div className="px-5 pb-24 sm:px-7">
          {/* Filter chips */}
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { label: isThai ? "องค์กร" : "Organization", value: live ? fileName : D.DEMO_ORG.name },
              { label: isThai ? "อุตสาหกรรม" : "Industry", value: D.DEMO_ORG.industry },
              { label: isThai ? "ขนาดองค์กร" : "Employee Size", value: D.DEMO_ORG.size },
              { label: isThai ? "ช่วงเวลา" : "Period", value: D.DEMO_ORG.period },
              { label: isThai ? "ภูมิภาค" : "Region", value: D.DEMO_ORG.region },
              { label: isThai ? "สถานะข้อมูล" : "Data Status", value: live ? `Readiness ${live.ready.score}%` : D.DEMO_ORG.dataStatus }
            ].map((f) => (
              <div key={f.label} className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{f.label}</p>
                <p className="mt-0.5 truncate text-[12.5px] font-bold text-slate-800">{f.value}</p>
              </div>
            ))}
          </div>

          {/* 1. Organization Profile */}
          <Section id="overview" title="Organization Profile" sub={isThai ? "ฐานข้อมูลบริษัทเพื่อ Benchmark" : "Company base for benchmarking"}>
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-rose-950 via-neutral-900 to-neutral-950 p-5 text-white shadow-sm lg:col-span-2">
                <h3 className="mb-3 text-sm font-bold text-white">Organization Profile</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Stat label={isThai ? "ขนาดองค์กร" : "Company Size"} value={headcount.toLocaleString()} note={isThai ? "พนักงานปัจจุบัน" : "Active employees"} big />
                  <Stat label={isThai ? "ประเภทธุรกิจ" : "Business Type"} value={D.DEMO_ORG.businessType} note={D.DEMO_ORG.businessNote} />
                  <Stat label="Benchmark Segment" value={D.DEMO_ORG.benchmarkSegment} note={D.DEMO_ORG.region} />
                  <Stat label="Consent" value={D.DEMO_ORG.consent} note={D.DEMO_ORG.consentNote} />
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Observe", "Optimize", "Outcome", "Benchmark Ready"].map((t) => (
                    <span key={t} className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-bold text-white/80">{t}</span>
                  ))}
                </div>
              </div>
              <Card>
                <CardTitle>Benchmark Readiness</CardTitle>
                <p className="text-[28px] font-extrabold leading-none text-slate-900">{D.DEMO_BENCHMARK_READINESS.score}%</p>
                <p className="mt-2 text-xs font-bold text-amber-600">{D.DEMO_BENCHMARK_READINESS.delta}</p>
                <div className="mt-3"><ProgressBar pct={D.DEMO_BENCHMARK_READINESS.score} /></div>
                <p className="mt-3 text-xs font-semibold leading-6 text-slate-500">{D.DEMO_BENCHMARK_READINESS.note}</p>
              </Card>
            </div>
          </Section>

          {/* 2. Template Center */}
          <Section id="templates" title="Template Center" sub={isThai ? "Template สำเร็จรูปสำหรับ HR ไม่ต้องเป็นนัก Data" : "Guided templates for HR users, not data experts"}>
            <div className={G4}>
              {D.DEMO_TEMPLATES.map((t) => {
                const s = STATUS_PILL[t.status];
                return (
                  <Card key={t.name}>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{t.name}</h3>
                      {t.pro ? <Pill tone="purple">Pro</Pill> : null}
                    </div>
                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{t.desc}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <Pill tone={s.tone}>{s.label}</Pill>
                      {t.tags.filter((x) => x !== "Pro").map((tag) => <Pill key={tag} tone="gray">{tag}</Pill>)}
                    </div>
                  </Card>
                );
              })}
            </div>
          </Section>

          {/* 3. Data Readiness & Validation */}
          <Section id="readiness" title="Data Readiness & Validation" sub={isThai ? "ด่านคุณภาพก่อนสร้าง Dashboard และ Benchmark" : "Quality gate before dashboards and benchmarks"}>
            <div className={G2}>
              <Card>
                <CardTitle>{isThai ? "ความพร้อมของข้อมูล" : "Dashboard Readiness"}</CardTitle>
                {live ? (
                  <div className="grid gap-3">
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-extrabold tracking-[-0.04em] text-slate-900">{live.ready.score}%</span>
                      <span className="pb-1 text-sm font-bold text-coral">{live.ready.status}</span>
                    </div>
                    {[
                      { label: "Required fields", pct: live.ready.required },
                      { label: "Recommended fields", pct: live.ready.recommended },
                      { label: "Insight fields", pct: live.ready.insight }
                    ].map((r) => (
                      <div key={r.label}>
                        <div className="mb-1 flex justify-between text-xs font-semibold text-slate-600"><span>{r.label}</span><b className="text-slate-800">{r.pct}%</b></div>
                        <ProgressBar pct={r.pct} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-2.5">
                    {D.DEMO_DASHBOARD_READINESS.map((r) => (
                      <div key={r.label}>
                        <div className="mb-1 flex justify-between text-xs font-semibold text-slate-600"><span>{r.label}</span><b className="text-slate-800">{r.pct}%</b></div>
                        <ProgressBar pct={r.pct} />
                      </div>
                    ))}
                  </div>
                )}
              </Card>
              <Card>
                <CardTitle>{isThai ? "ผลการตรวจสอบข้อมูล" : "Validation Findings"}</CardTitle>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr><th className="p-2.5 font-bold">Issue</th><th className="p-2.5 font-bold">Severity</th><th className="p-2.5 text-right font-bold">Rows</th></tr>
                    </thead>
                    <tbody>
                      {(live
                        ? live.issues.map((i) => ({ issue: i.type, severity: i.severity === "critical" ? ("error" as const) : ("warning" as const), rows: i.count, action: i.action }))
                        : D.DEMO_VALIDATION
                      ).map((v) => (
                        <tr key={v.issue} className="border-t border-slate-100">
                          <td className="p-2.5 font-semibold text-slate-700">{v.issue}<span className="block text-[11px] font-medium text-slate-400">{v.action}</span></td>
                          <td className="p-2.5"><Pill tone={v.severity === "error" ? "red" : "amber"}>{v.severity === "error" ? "Error" : "Warning"}</Pill></td>
                          <td className="p-2.5 text-right font-bold tabular-nums text-slate-600">{v.rows}</td>
                        </tr>
                      ))}
                      {live && live.issues.length === 0 ? (
                        <tr><td colSpan={3} className="p-3 text-center text-sm font-semibold text-emerald-600">{isThai ? "ไม่พบปัญหา ✓" : "No issues found ✓"}</td></tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </Section>

          {/* 4. Executive Summary */}
          <Section id="executive" title="Executive Summary" sub={isThai ? "ภาพรวม HR Health · AI interpretation ใน Premium" : "HR health overview · AI interpretation in Premium"}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {live ? (
                <>
                  <KpiCard label={isThai ? "พนักงาน" : "Headcount"} value={live.metrics.active.toLocaleString()} delta={`${isThai ? "จาก" : "of"} ${live.metrics.total}`} dir="up" />
                  <KpiCard label={isThai ? "อัตราลาออก" : "Turnover Rate"} value={`${live.metrics.attritionRate}%`} delta={`${live.metrics.exited} ${isThai ? "ลาออก" : "exits"}`} dir="down" />
                  <KpiCard label={isThai ? "อายุงานเฉลี่ย" : "Avg Tenure"} value={live.metrics.hasDates ? `${live.metrics.avgTenureYears.toFixed(1)}${isThai ? " ปี" : "y"}` : "—"} dir="up" />
                  <KpiCard label={isThai ? "เงินเดือน/เดือน" : "Monthly Payroll"} value={live.metrics.hasSalary ? currency(live.metrics.totalMonthlyCost) : "—"} dir="warn" />
                  <KpiCard label="Productivity Index" value="104" delta={sampleTag ?? ""} dir="up" />
                </>
              ) : (
                D.DEMO_EXEC_KPIS.map((k) => <KpiCard key={k.label} label={k.label} value={k.value} delta={k.delta} dir={k.dir} />)
              )}
            </div>
            <div className={`${G3} mt-4`}>
              <Card>
                <CardTitle>{live ? (isThai ? "กำลังคนตามแผนก" : "Headcount by department") : "Headcount Trend"}</CardTitle>
                {live ? (
                  <BarChart labels={live.metrics.byDepartment.map((d) => d.department)} data={live.metrics.byDepartment.map((d) => d.active)} horizontal />
                ) : (
                  <LineChart labels={D.DEMO_HEADCOUNT_TREND.labels} series={[{ label: "Headcount", data: D.DEMO_HEADCOUNT_TREND.data }]} />
                )}
              </Card>
              <Card>
                <CardTitle>HR Health Radar {sampleTag ? <Pill tone="gray">{sampleTag}</Pill> : null}</CardTitle>
                <RadarChart axes={D.DEMO_HEALTH_RADAR} />
              </Card>
              <Locked>
                <Card>
                  <CardTitle>AI Executive Brief</CardTitle>
                  <div className="grid gap-2">
                    {D.DEMO_AI_EXEC_BRIEF.map((i) => <Insight key={i.text} tone={i.tone} title={i.title}>{i.text}</Insight>)}
                  </div>
                </Card>
              </Locked>
            </div>
          </Section>

          {/* 5. Workforce Productivity */}
          <Section id="productivity" title="Workforce Productivity" sub={isThai ? "เชื่อมกำลังคนกับผลลัพธ์ธุรกิจ" : "Connect workforce size with business output"} tag={sampleTag}>
            <div className={G3}>
              <Card><CardTitle>Revenue per FTE by Function</CardTitle><BarChart labels={D.DEMO_REV_FTE.labels} data={D.DEMO_REV_FTE.data} /></Card>
              <Card><CardTitle>Productivity vs Overtime</CardTitle><ScatterChart points={D.DEMO_PRODUCTIVITY_SCATTER} xLabel="OT Hours/FTE" yLabel="Productivity Index" xMax={26} yMax={120} /></Card>
              <Card><CardTitle>Productivity Signals</CardTitle><div className="grid gap-2">{D.DEMO_PRODUCTIVITY_SIGNALS.map((i) => <Insight key={i.text} tone={i.tone}>{i.text}</Insight>)}</div></Card>
            </div>
          </Section>

          {/* 6. Employee Demographic */}
          <Section id="demographic" title="Employee Demographic" sub={isThai ? "โครงสร้าง อายุงาน เจเนอเรชัน ระดับ" : "Structure, tenure, generation, level"}>
            <div className={G4}>
              {live && live.metrics.hasGender && live.metrics.genderSplit.length ? (
                <Card><CardTitle>{isThai ? "สัดส่วนเพศ" : "Gender Mix"}</CardTitle><DonutChart data={live.metrics.genderSplit.map((g) => ({ label: g.label, value: g.count }))} /></Card>
              ) : (
                <Card><CardTitle>Generation Mix {sampleTag ? <Pill tone="gray">{sampleTag}</Pill> : null}</CardTitle><DonutChart data={D.DEMO_GENERATION_MIX} /></Card>
              )}
              {live ? (
                <Card><CardTitle>{isThai ? "กำลังคนตามแผนก" : "Function Mix"}</CardTitle><BarChart labels={live.metrics.byDepartment.map((d) => d.department)} data={live.metrics.byDepartment.map((d) => d.active)} horizontal /></Card>
              ) : (
                <Card><CardTitle>Function Mix</CardTitle><BarChart labels={D.DEMO_FUNCTION_MIX.labels} data={D.DEMO_FUNCTION_MIX.data} horizontal /></Card>
              )}
              {live && live.metrics.hasDates ? (
                <Card><CardTitle>{isThai ? "การกระจายอายุงาน" : "Tenure Distribution"}</CardTitle><BarChart labels={live.metrics.tenureBuckets.map((t) => t.label)} data={live.metrics.tenureBuckets.map((t) => t.count)} color="#2f6df6" /></Card>
              ) : (
                <Card><CardTitle>Tenure Distribution</CardTitle><BarChart labels={D.DEMO_TENURE.labels} data={D.DEMO_TENURE.data} color="#2f6df6" /></Card>
              )}
              <Card><CardTitle>Job Level {sampleTag ? <Pill tone="gray">{sampleTag}</Pill> : null}</CardTitle><DonutChart data={D.DEMO_JOB_LEVEL} variant="pie" /></Card>
            </div>
          </Section>

          {/* 7. Recruitment Status */}
          <Section id="recruitment" title="Recruitment Status" sub={isThai ? "Funnel แหล่งผู้สมัคร และคอขวด" : "Funnel, source, bottleneck"} tag={sampleTag}>
            <div className={G3}>
              <Card><CardTitle>Hiring Funnel</CardTitle><BarChart labels={D.DEMO_FUNNEL.labels} data={D.DEMO_FUNNEL.data} horizontal /></Card>
              <Card><CardTitle>Source Effectiveness</CardTitle><BarChart labels={D.DEMO_SOURCE.labels} data={D.DEMO_SOURCE.data} horizontal color="#16a34a" /></Card>
              <Card>
                <CardTitle>Recruitment Bottlenecks</CardTitle>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500"><tr><th className="p-2.5 font-bold">Stage</th><th className="p-2.5 text-right font-bold">Avg Days</th><th className="p-2.5 font-bold">Issue</th></tr></thead>
                    <tbody>
                      {D.DEMO_RECRUIT_BOTTLENECKS.map((b) => (
                        <tr key={b.stage} className="border-t border-slate-100"><td className="p-2.5 font-semibold text-slate-700">{b.stage}</td><td className="p-2.5 text-right font-bold tabular-nums text-slate-600">{b.days}</td><td className="p-2.5 text-slate-500">{b.issue}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </Section>

          {/* 8. Training Analytics */}
          <Section id="training" title="Training Analytics" sub={isThai ? "ชั่วโมง ต้นทุน Completion และผลการเรียนรู้" : "Hours, cost, completion, learning outcome"} tag={sampleTag}>
            <div className={G3}>
              <Card><CardTitle>Training Hours by Function</CardTitle><BarChart labels={D.DEMO_TRAINING_HOURS.labels} data={D.DEMO_TRAINING_HOURS.data} color="#9333ea" /></Card>
              <Card><CardTitle>Completion vs Post Score</CardTitle><LineChart labels={D.DEMO_TRAINING_OUTCOME.labels} series={D.DEMO_TRAINING_OUTCOME.series} /></Card>
              <Card>
                <CardTitle>Training Readiness</CardTitle>
                <div className="grid gap-2.5">
                  {D.DEMO_TRAINING_READINESS.map((r) => (
                    <div key={r.label}><div className="mb-1 flex justify-between text-xs font-semibold text-slate-600"><span>{r.label}</span><b className="text-slate-800">{r.pct}%</b></div><ProgressBar pct={r.pct} /></div>
                  ))}
                  <Insight tone="amber">{isThai ? "เพิ่ม Post Score เพื่อให้ AI วิเคราะห์ Training ROI ได้แม่นขึ้น" : "Add post-scores so AI can analyze training ROI more precisely."}</Insight>
                </div>
              </Card>
            </div>
          </Section>

          {/* 9. Turnover + Exit */}
          <Section id="turnover" title="Turnover Analytics + Exit Insights" sub={isThai ? "ผลลัพธ์การลาออก + เหตุผล + ปัจจัยเสี่ยง" : "Turnover result + exit reason + risk drivers"}>
            <div className={G4}>
              {live ? (
                <>
                  <KpiCard label={isThai ? "อัตราลาออก" : "Turnover Rate"} value={`${live.metrics.attritionRate}%`} dir="down" />
                  <KpiCard label={isThai ? "จำนวนลาออก" : "Total Exits"} value={live.metrics.exited.toLocaleString()} dir="warn" />
                  <KpiCard label={isThai ? "เหตุผลที่บันทึก" : "Exit reasons captured"} value={`${live.exits.reduce((s, e) => s + e.count, 0)}`} dir="up" />
                  <KpiCard label={isThai ? "พนักงานปัจจุบัน" : "Active"} value={live.metrics.active.toLocaleString()} dir="up" />
                </>
              ) : (
                D.DEMO_TURNOVER_KPIS.map((k) => <KpiCard key={k.label} label={k.label} value={k.value} delta={k.delta} dir={k.dir} />)
              )}
            </div>
            <div className={`${G3} mt-4`}>
              <Card>
                <CardTitle>Exit Reason</CardTitle>
                {live && live.exits.length ? (
                  <BarChart labels={live.exits.map((e) => e.label)} data={live.exits.map((e) => e.count)} horizontal color="#e5484d" />
                ) : (
                  <BarChart labels={D.DEMO_EXIT_REASON.labels} data={D.DEMO_EXIT_REASON.data} horizontal color="#e5484d" />
                )}
              </Card>
              <Card>
                <CardTitle>{live ? (isThai ? "การลาออกตามแผนก" : "Attrition by department") : "Turnover by Tenure"}</CardTitle>
                {live ? (
                  <BarChart labels={live.metrics.byDepartment.filter((d) => d.exited > 0).map((d) => d.department)} data={live.metrics.byDepartment.filter((d) => d.exited > 0).map((d) => d.exited)} horizontal color="#f5a623" />
                ) : (
                  <BarChart labels={D.DEMO_TURNOVER_BY_TENURE.labels} data={D.DEMO_TURNOVER_BY_TENURE.data} color="#f5a623" unit="%" />
                )}
              </Card>
              <Card><CardTitle>Exit Insight Drivers</CardTitle><div className="grid gap-2">{D.DEMO_EXIT_DRIVERS.map((i) => <Insight key={i.text} tone={i.tone} title={i.title}>{i.text}</Insight>)}</div></Card>
            </div>
          </Section>

          {/* Premium upsell banner */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-300 bg-amber-50 p-5">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-bold text-amber-700"><Lock size={15} aria-hidden="true" /> {isThai ? "โมดูล Premium" : "Premium modules"}</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">{isThai ? "People Analytics, Compensation, Engagement, Manager, Benchmark และ AI — อัปเกรดเพื่อปลดล็อก" : "People Analytics, Compensation, Engagement, Manager, Benchmark, and AI — upgrade to unlock."}</p>
            </div>
            <Link href={upgradeHref} className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-brand px-5 text-sm font-bold text-white transition-colors hover:bg-coral">{isThai ? "อัปเกรด Pro" : "Upgrade to Pro"}</Link>
          </div>

          {/* 10. People Analytics (Pro) */}
          <Section id="people" title="People Analytics & Succession" sub={isThai ? "โมดูล Premium (ตัวอย่าง)" : "Premium module mockup"}>
            <div className={G3}>
              <Locked><Card><CardTitle>9-Box Talent Matrix</CardTitle><ScatterChart points={D.DEMO_NINEBOX} xLabel="Performance" yLabel="Potential" xMin={0} xMax={4} yMin={0} yMax={4} quadrant /></Card></Locked>
              <Locked>
                <Card>
                  <CardTitle>Critical Talent Risk</CardTitle>
                  <div className="overflow-hidden rounded-xl border border-slate-200"><table className="w-full text-left text-xs"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-2.5 font-bold">Group</th><th className="p-2.5 text-right font-bold">HC</th><th className="p-2.5 font-bold">Risk</th></tr></thead><tbody>{D.DEMO_CRITICAL_TALENT.map((r) => <tr key={r.group} className="border-t border-slate-100"><td className="p-2.5 font-semibold text-slate-700">{r.group}</td><td className="p-2.5 text-right tabular-nums text-slate-600">{r.hc}</td><td className="p-2.5"><Pill tone="red">{r.risk}</Pill></td></tr>)}</tbody></table></div>
                </Card>
              </Locked>
              <Locked><Card><CardTitle>Succession Coverage</CardTitle><p className="text-[28px] font-extrabold leading-none text-slate-900">{D.DEMO_SUCCESSION_COVERAGE}%</p><p className="mt-2 text-xs font-semibold text-slate-500">{isThai ? "ตำแหน่งวิกฤติที่มีผู้สืบทอด" : "Critical positions covered"}</p><div className="mt-3"><ProgressBar pct={D.DEMO_SUCCESSION_COVERAGE} /></div></Card></Locked>
            </div>
          </Section>

          {/* 11. Compensation (Pro) */}
          <Section id="compensation" title="Compensation Analytics" sub={isThai ? "Pay equity, compa ratio และต้นทุน (Premium)" : "Pay equity, compa ratio, and cost (Premium)"}>
            <div className={G3}>
              <Locked><Card><CardTitle>Salary Cost by Function</CardTitle><BarChart labels={D.DEMO_SALARY_COST.labels} data={D.DEMO_SALARY_COST.data} unit="MB" /></Card></Locked>
              <Locked><Card><CardTitle>Compa Ratio Distribution</CardTitle><BarChart labels={D.DEMO_COMPA_DIST.labels} data={D.DEMO_COMPA_DIST.data} color="#2f6df6" /></Card></Locked>
              <Locked><Card><CardTitle>Pay Risk Signals</CardTitle><div className="grid gap-2">{D.DEMO_PAY_RISK.map((i) => <Insight key={i.text} tone={i.tone}>{i.text}</Insight>)}</div></Card></Locked>
            </div>
          </Section>

          {/* 12. Engagement / Well-being / Manager (Pro) */}
          <Section id="engagement" title="Engagement, Well-being & Manager Effectiveness" sub={isThai ? "ข้อมูล Driver ที่อธิบาย 'ทำไม' (Premium)" : "Premium driver data that explains why outcomes happen"}>
            <div className={G3}>
              <Locked><Card><CardTitle>Engagement Drivers</CardTitle><BarChart labels={D.DEMO_ENGAGEMENT_DRIVERS.labels} data={D.DEMO_ENGAGEMENT_DRIVERS.data} color="#16a34a" /></Card></Locked>
              <Locked><Card><CardTitle>Absenteeism & OT</CardTitle><LineChart labels={D.DEMO_ABSENCE.labels} series={D.DEMO_ABSENCE.series} /></Card></Locked>
              <div id="manager" className="scroll-mt-20">
                <Locked>
                  <Card>
                    <CardTitle>Manager Effectiveness</CardTitle>
                    <div className="overflow-hidden rounded-xl border border-slate-200"><table className="w-full text-left text-xs"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-2.5 font-bold">Segment</th><th className="p-2.5 text-right font-bold">Turnover</th><th className="p-2.5 text-right font-bold">Engagement</th></tr></thead><tbody>{D.DEMO_MANAGER_EFFECTIVENESS.map((m) => <tr key={m.segment} className="border-t border-slate-100"><td className="p-2.5 font-semibold text-slate-700">{m.segment}</td><td className="p-2.5 text-right tabular-nums text-slate-600">{m.turnover}</td><td className="p-2.5 text-right tabular-nums text-slate-600">{m.engagement}</td></tr>)}</tbody></table></div>
                  </Card>
                </Locked>
              </div>
            </div>
          </Section>

          {/* 13. Benchmark Preview (Future) */}
          <Section id="benchmark" title="Benchmark Preview" sub={isThai ? "อนาคต: เทียบกับอุตสาหกรรมจาก Standard Data Model (ข้อมูลนิรนาม + ขอความยินยอม)" : "Future: industry comparison from the standardized data model (anonymized + consent)"}>
            <div className={G3}>
              <Locked><Card><CardTitle>Industry Benchmark</CardTitle><p className="text-[11px] font-bold uppercase text-slate-500">{isThai ? "Turnover ของคุณ" : "Your turnover"}</p><p className="text-[28px] font-extrabold leading-none text-slate-900">{D.DEMO_BENCHMARK_INDUSTRY.yours}</p><p className="mt-2 text-xs font-semibold text-slate-500">Industry median: {D.DEMO_BENCHMARK_INDUSTRY.median} · {D.DEMO_BENCHMARK_INDUSTRY.percentile}</p></Card></Locked>
              <Locked><Card><CardTitle>Function Benchmark</CardTitle><div className="overflow-hidden rounded-xl border border-slate-200"><table className="w-full text-left text-xs"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-2.5 font-bold">Function</th><th className="p-2.5 text-right font-bold">Yours</th><th className="p-2.5 text-right font-bold">Median</th></tr></thead><tbody>{D.DEMO_BENCHMARK_FUNCTION.map((f) => <tr key={f.fn} className="border-t border-slate-100"><td className="p-2.5 font-semibold text-slate-700">{f.fn}</td><td className="p-2.5 text-right tabular-nums text-slate-600">{f.yours}</td><td className="p-2.5 text-right tabular-nums text-slate-500">{f.median}</td></tr>)}</tbody></table></div></Card></Locked>
              <Card>
                <CardTitle>{isThai ? "วิธีปลดล็อก" : "How to Unlock"}</CardTitle>
                <ol className="grid gap-3">
                  {D.DEMO_BENCHMARK_UNLOCK.map((step, i) => (
                    <li key={step} className="grid grid-cols-[28px_1fr] gap-2.5">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-xs font-bold text-white">{i + 1}</span>
                      <span className="text-xs font-semibold leading-6 text-slate-600">{step}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            </div>
          </Section>

          {/* 14. AI Analytics (AI) */}
          <Section id="ai" title="AI Analytics" sub={isThai ? "AI วิเคราะห์ อธิบาย และตอบคำถามจากข้อมูลของคุณ" : "AI that analyzes, explains, and answers from your data"}>
            <div className={G2}>
              <Locked><Card><CardTitle>AI Risk Summary</CardTitle><div className="grid gap-2">{D.DEMO_AI_RISK.map((i) => <Insight key={i.text} tone={i.tone} title={i.title}>{i.text}</Insight>)}</div></Card></Locked>
              <Card>
                <CardTitle><BarChart3 size={16} className="text-coral" aria-hidden="true" /> Ask AI Analytics</CardTitle>
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center">
                  <p className="text-sm font-bold text-slate-900">{isThai ? "ถามตัวอย่าง" : "Example question"}</p>
                  <p className="mt-1 text-xs font-semibold leading-6 text-slate-500">{isThai ? "“ทำไม Turnover ฝ่ายขายสูง และควรทำอะไรใน 90 วัน?”" : "“Why is Sales turnover high, and what should we do in 90 days?”"}</p>
                  <button type="button" onClick={() => setChatOpen(true)} className="mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-full bg-brand px-4 text-xs font-bold text-white transition-colors hover:bg-coral">
                    <BarChart3 size={13} aria-hidden="true" /> {isThai ? "เปิด AI Analytics" : "Open AI Analytics"}
                  </button>
                </div>
                <p className="mt-3 text-xs font-semibold leading-6 text-slate-400">{isThai ? "AI ตอบจากข้อมูลที่โหลด/อัปโหลดเท่านั้น เพื่อสนับสนุนการตัดสินใจ ไม่ใช่คำตัดสินแทน HR" : "AI answers only from the loaded/uploaded data, as decision support — not a replacement for HR judgment."}</p>
              </Card>
            </div>
          </Section>

          <p className="mt-12 text-center text-xs font-semibold text-slate-400">
            {isThai
              ? "โหมดตัวอย่างใช้ข้อมูลสมมติ · ออกแบบเพื่อแสดง Template-First HR Analytics, AI Analytics และความพร้อมสำหรับ Benchmark Center"
              : "Demo mode uses mockup data · built to show Template-First HR Analytics, AI Analytics, and Benchmark Center readiness."}
          </p>
        </div>
      </div>

      <AnalyticsChat locale={locale} dataSummary={summary} open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}

function Section({ id, title, sub, tag, children }: { id: string; title: string; sub?: string; tag?: string | null; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 pt-9">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <h2 className="inline-flex items-center gap-2 text-lg font-semibold tracking-[-0.03em] text-slate-900 sm:text-xl">
          {title}
          {tag ? <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500">{tag}</span> : null}
        </h2>
        {sub ? <span className="text-xs font-semibold text-slate-400">{sub}</span> : null}
      </div>
      {children}
    </section>
  );
}

function Stat({ label, value, note, big }: { label: string; value: string; note?: string; big?: boolean }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-white/50">{label}</p>
      <p className={`mt-1 font-extrabold tracking-[-0.02em] text-white ${big ? "text-[28px] leading-none" : "text-lg leading-tight"}`}>{value}</p>
      {note ? <p className="mt-0.5 text-xs font-semibold text-white/55">{note}</p> : null}
    </div>
  );
}
