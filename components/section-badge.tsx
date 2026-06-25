type SectionBadgeProps = {
  number: string;
  label: string;
  light?: boolean;
};

export function SectionBadge({ number, label, light = false }: SectionBadgeProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold ${
          light ? "bg-white text-neutral-950" : "bg-neutral-950 text-white"
        }`}
      >
        {number}
      </span>
      <span
        className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${
          light ? "border-white/20 text-white" : "border-neutral-200 text-neutral-950"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
