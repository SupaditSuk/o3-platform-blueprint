import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TextRollButtonProps = {
  href: string;
  children: string;
  variant?: "brand" | "dark" | "light";
  className?: string;
};

export function TextRollButton({
  href,
  children,
  variant = "brand",
  className
}: TextRollButtonProps) {
  const styles = {
    brand: "bg-brand text-white hover:bg-coral",
    dark: "bg-neutral-950 text-white hover:bg-neutral-800",
    light: "bg-white text-neutral-950 hover:bg-neutral-100"
  };

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-12 items-center gap-3 rounded-full pl-5 pr-2 text-sm font-semibold transition-[background-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985]",
        styles[variant],
        className
      )}
    >
      <span className="h-5 shrink-0 overflow-hidden whitespace-nowrap">
        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
          <span>{children}</span>
          <span aria-hidden="true">{children}</span>
        </span>
      </span>
      <span
        className={cn(
          "grid h-8 w-8 place-items-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-45 group-hover:scale-105",
          variant === "light" ? "bg-neutral-950 text-white" : "bg-white text-brand"
        )}
        aria-hidden="true"
      >
        <ArrowRight size={16} strokeWidth={2.4} />
      </span>
    </Link>
  );
}
