import { Lock } from "lucide-react";
import type { Tone } from "@/lib/workforce-demo";

// Categorical palette anchored on the O³ brand (coral → red) then supporting hues.
export const SERIES = ["#e5484d", "#ff7a45", "#f5a623", "#2f6df6", "#16a34a", "#9333ea", "#db2777", "#0d9488"];

// Round computed SVG coordinates to a fixed precision so server- and client-rendered
// path/point strings match exactly (avoids React hydration mismatches from float drift).
const rnd = (n: number) => Math.round(n * 1000) / 1000;

// Light-theme chart ink.
const AXIS = "rgba(15,23,42,0.16)";
const GRID = "rgba(15,23,42,0.07)";
const LABEL = "#64748b";
const VALUE = "#334155";

const TONE_BORDER: Record<Tone, string> = {
  info: "border-l-[#2f6df6] bg-[#2f6df6]/[0.06]",
  amber: "border-l-amber-500 bg-amber-500/[0.07]",
  red: "border-l-red-500 bg-red-500/[0.06]",
  green: "border-l-emerald-500 bg-emerald-500/[0.07]"
};

const TONE_PILL: Record<string, string> = {
  info: "bg-blue-100 text-blue-700",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-red-100 text-red-700",
  green: "bg-emerald-100 text-emerald-700",
  purple: "bg-purple-100 text-purple-700",
  gray: "bg-slate-100 text-slate-600"
};

// ---------- atoms ----------

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className ?? ""}`}>{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">{children}</h3>;
}

export function Pill({ children, tone = "info" }: { children: React.ReactNode; tone?: keyof typeof TONE_PILL }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${TONE_PILL[tone]}`}>{children}</span>;
}

export function ProgressBar({ pct }: { pct: number }) {
  const color = pct >= 70 ? "bg-emerald-500" : pct >= 45 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} />
    </div>
  );
}

export function KpiCard({ label, value, delta, dir }: { label: string; value: string; delta?: string; dir?: "up" | "down" | "warn" }) {
  const deltaColor = dir === "up" ? "text-emerald-600" : dir === "down" ? "text-red-600" : "text-amber-600";
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">{label}</p>
      <p className="mt-2 text-[28px] font-extrabold leading-none tracking-[-0.03em] text-slate-900">{value}</p>
      {delta ? <p className={`mt-2 text-xs font-bold ${deltaColor}`}>{delta}</p> : null}
    </div>
  );
}

export function Insight({ tone = "info", title, children }: { tone?: Tone; title?: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-xl border-l-4 ${TONE_BORDER[tone]} px-3.5 py-2.5`}>
      <p className="text-[13px] font-semibold leading-6 text-slate-700">
        {title ? <b className="text-slate-900">{title}: </b> : null}
        {children}
      </p>
    </div>
  );
}

export function Locked({ children, badge = "Premium Locked" }: { children: React.ReactNode; badge?: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="pointer-events-none select-none opacity-60 blur-[3px]" aria-hidden="true">
        {children}
      </div>
      <div className="absolute inset-0 bg-white/30" aria-hidden="true" />
      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-bold text-white">
        <Lock size={11} aria-hidden="true" /> {badge}
      </span>
    </div>
  );
}

// ---------- charts ----------

const VB = { w: 320, h: 180 };

export function BarChart({
  labels,
  data,
  color = SERIES[0],
  horizontal = false,
  unit = ""
}: {
  labels: string[];
  data: number[];
  color?: string;
  horizontal?: boolean;
  unit?: string;
}) {
  const max = Math.max(1, ...data);

  if (horizontal) {
    return (
      <div className="grid gap-2.5">
        {labels.map((label, i) => (
          <div key={label}>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span className="truncate pr-3">{label}</span>
              <span className="shrink-0 tabular-nums text-slate-800">{data[i].toLocaleString()}{unit}</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full" style={{ width: `${(data[i] / max) * 100}%`, background: color }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const padL = 6;
  const padB = 24;
  const padT = 16;
  const plotH = VB.h - padB - padT;
  const slot = (VB.w - padL * 2) / labels.length;
  const bw = rnd(Math.min(38, slot * 0.62));
  return (
    <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full" style={{ maxHeight: 200 }}>
      <line x1={padL} y1={VB.h - padB} x2={VB.w - padL} y2={VB.h - padB} stroke={AXIS} />
      {labels.map((label, i) => {
        const h = rnd((data[i] / max) * plotH);
        const x = rnd(padL + slot * i + (slot - bw) / 2);
        const y = rnd(VB.h - padB - h);
        return (
          <g key={label}>
            <rect x={x} y={y} width={bw} height={h} rx={4} fill={color} />
            <text x={x + bw / 2} y={y - 4} textAnchor="middle" fontSize="9" fontWeight="700" fill={VALUE}>
              {data[i].toLocaleString()}
            </text>
            <text x={x + bw / 2} y={VB.h - padB + 13} textAnchor="middle" fontSize="8.5" fill={LABEL}>
              {label.length > 9 ? `${label.slice(0, 8)}…` : label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function LineChart({ labels, series, unit = "" }: { labels: string[]; series: { label: string; data: number[]; color?: string }[]; unit?: string }) {
  const all = series.flatMap((s) => s.data);
  const max = Math.max(1, ...all) * 1.12;
  const padL = 10;
  const padR = 10;
  const padT = 12;
  const padB = 22;
  const plotW = VB.w - padL - padR;
  const plotH = VB.h - padT - padB;
  const xAt = (i: number) => rnd(padL + (labels.length === 1 ? plotW / 2 : (plotW / (labels.length - 1)) * i));
  const yAt = (v: number) => rnd(padT + plotH - (v / max) * plotH);
  return (
    <div>
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full" style={{ maxHeight: 210 }}>
        {[0.25, 0.5, 0.75, 1].map((g) => (
          <line key={g} x1={padL} y1={rnd(padT + plotH * (1 - g))} x2={VB.w - padR} y2={rnd(padT + plotH * (1 - g))} stroke={GRID} />
        ))}
        {series.map((s, si) => {
          const color = s.color ?? SERIES[si % SERIES.length];
          const pts = s.data.map((v, i) => `${xAt(i)},${yAt(v)}`).join(" ");
          return (
            <g key={s.label}>
              <polyline points={pts} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              {s.data.map((v, i) => (
                <circle key={i} cx={xAt(i)} cy={yAt(v)} r="2.8" fill={color} />
              ))}
            </g>
          );
        })}
        {labels.map((label, i) => (
          <text key={label} x={xAt(i)} y={VB.h - 6} textAnchor="middle" fontSize="8.5" fill={LABEL}>
            {label}
          </text>
        ))}
      </svg>
      {series.length > 1 ? <Legend items={series.map((s, i) => ({ label: `${s.label}${unit}`, color: s.color ?? SERIES[i % SERIES.length] }))} /> : null}
    </div>
  );
}

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [rnd(cx + r * Math.cos(a)), rnd(cy + r * Math.sin(a))];
}

export function DonutChart({ data, variant = "doughnut" }: { data: { label: string; value: number }[]; variant?: "doughnut" | "pie" }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const cx = 60;
  const cy = 60;
  const rO = 52;
  const rI = variant === "pie" ? 0 : 31;
  let cursor = 0;
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 120 120" className="h-32 w-32 shrink-0">
        {data.map((d, i) => {
          const start = (cursor / total) * 360;
          cursor += d.value;
          const end = (cursor / total) * 360;
          const large = end - start > 180 ? 1 : 0;
          const [ox1, oy1] = polar(cx, cy, rO, start);
          const [ox2, oy2] = polar(cx, cy, rO, end);
          const color = SERIES[i % SERIES.length];
          if (rI === 0) {
            return <path key={d.label} d={`M ${cx} ${cy} L ${ox1} ${oy1} A ${rO} ${rO} 0 ${large} 1 ${ox2} ${oy2} Z`} fill={color} />;
          }
          const [ix1, iy1] = polar(cx, cy, rI, end);
          const [ix2, iy2] = polar(cx, cy, rI, start);
          return (
            <path
              key={d.label}
              d={`M ${ox1} ${oy1} A ${rO} ${rO} 0 ${large} 1 ${ox2} ${oy2} L ${ix1} ${iy1} A ${rI} ${rI} 0 ${large} 0 ${ix2} ${iy2} Z`}
              fill={color}
            />
          );
        })}
      </svg>
      <div className="grid gap-1.5">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: SERIES[i % SERIES.length] }} />
            {d.label} · {d.value.toLocaleString()} ({Math.round((d.value / total) * 100)}%)
          </div>
        ))}
      </div>
    </div>
  );
}

export function RadarChart({ axes, max = 100 }: { axes: { label: string; value: number }[]; max?: number }) {
  const cx = 90;
  const cy = 90;
  const R = 62;
  const n = axes.length;
  const pt = (i: number, frac: number) => polar(cx, cy, R * frac, (360 / n) * i);
  const valuePoly = axes.map((a, i) => pt(i, Math.min(1, a.value / max)).join(",")).join(" ");
  return (
    <svg viewBox="0 0 180 180" className="mx-auto w-full" style={{ maxHeight: 210 }}>
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <polygon key={g} points={axes.map((_, i) => pt(i, g).join(",")).join(" ")} fill="none" stroke={GRID} />
      ))}
      {axes.map((a, i) => {
        const [x, y] = pt(i, 1);
        return <line key={a.label} x1={cx} y1={cy} x2={x} y2={y} stroke={GRID} />;
      })}
      <polygon points={valuePoly} fill={`${SERIES[0]}33`} stroke={SERIES[0]} strokeWidth="2" />
      {axes.map((a, i) => {
        const [x, y] = pt(i, 1.16);
        return (
          <text key={a.label} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="8.5" fontWeight="600" fill={LABEL}>
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}

export function ScatterChart({
  points,
  xLabel,
  yLabel,
  xMax,
  yMax,
  xMin = 0,
  yMin = 0,
  quadrant = false
}: {
  points: { x: number; y: number; label?: string }[];
  xLabel: string;
  yLabel: string;
  xMax?: number;
  yMax?: number;
  xMin?: number;
  yMin?: number;
  quadrant?: boolean;
}) {
  const mx = xMax ?? Math.max(...points.map((p) => p.x)) * 1.15;
  const my = yMax ?? Math.max(...points.map((p) => p.y)) * 1.15;
  const padL = 18;
  const padR = 12;
  const padT = 10;
  const padB = 22;
  const plotW = VB.w - padL - padR;
  const plotH = VB.h - padT - padB;
  const xAt = (v: number) => rnd(padL + ((v - xMin) / (mx - xMin)) * plotW);
  const yAt = (v: number) => rnd(padT + plotH - ((v - yMin) / (my - yMin)) * plotH);
  return (
    <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full" style={{ maxHeight: 200 }}>
      <line x1={padL} y1={padT + plotH} x2={VB.w - padR} y2={padT + plotH} stroke={AXIS} />
      <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke={AXIS} />
      {quadrant ? (
        <>
          <line x1={xAt((mx + xMin) / 2)} y1={padT} x2={xAt((mx + xMin) / 2)} y2={padT + plotH} stroke={GRID} strokeDasharray="3 3" />
          <line x1={padL} y1={yAt((my + yMin) / 2)} x2={VB.w - padR} y2={yAt((my + yMin) / 2)} stroke={GRID} strokeDasharray="3 3" />
        </>
      ) : null}
      {points.map((p, i) => (
        <circle key={i} cx={xAt(p.x)} cy={yAt(p.y)} r="4.5" fill={SERIES[i % SERIES.length]} fillOpacity="0.85" />
      ))}
      <text x={padL + plotW / 2} y={VB.h - 4} textAnchor="middle" fontSize="8.5" fill={LABEL}>{xLabel}</text>
      <text x={6} y={padT + plotH / 2} textAnchor="middle" fontSize="8.5" fill={LABEL} transform={`rotate(-90 6 ${padT + plotH / 2})`}>{yLabel}</text>
    </svg>
  );
}

function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
      {items.map((it) => (
        <span key={it.label} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
          <span className="h-2 w-2 rounded-full" style={{ background: it.color }} />
          {it.label}
        </span>
      ))}
    </div>
  );
}
