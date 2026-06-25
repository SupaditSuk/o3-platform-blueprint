"use client";

import { useEffect, useState } from "react";

/**
 * Fixed vertical navigation dots for the homepage "presentation deck" (>=1280px).
 * Derives one dot per `main > section`, tracks the active section with an
 * IntersectionObserver, and jumps on click. Hidden below xl (where the deck is off).
 */
export function SectionDots({ labels }: { labels: string[] }) {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    setCount(sections.length);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = sections.indexOf(visible[0].target as HTMLElement);
          if (idx >= 0) setActive(idx);
        }
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (i: number) => {
    const target = document.querySelectorAll<HTMLElement>("main > section")[i];
    if (!target) return;
    // An instant jump can skip the IntersectionObserver-driven reveal, so reveal the
    // target's content explicitly and mark it active before scrolling.
    target.querySelectorAll<HTMLElement>(".motion-reveal").forEach((el) => el.classList.add("is-visible"));
    setActive(i);
    // Force instant: a global `scroll-behavior: smooth` makes the default jump slow/janky
    // across full-screen mandatory-snap sections.
    target.scrollIntoView({ behavior: "instant", block: "start" });
  };

  if (count === 0) return null;

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = active === i;
        return (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            className="group flex items-center gap-2"
            aria-label={labels[i] ?? `Section ${i + 1}`}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`whitespace-nowrap rounded-full bg-neutral-900/85 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm backdrop-blur transition-opacity duration-200 ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {labels[i] ?? `0${i + 1}`}
            </span>
            <span
              className={`block rounded-full ring-1 transition-all duration-300 ${
                isActive
                  ? "h-3 w-3 bg-coral ring-coral/40"
                  : "h-2.5 w-2.5 bg-neutral-400/70 ring-white/40 group-hover:bg-coral/70"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
