import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "oklch(var(--bg) / <alpha-value>)",
        ink: "oklch(var(--ink) / <alpha-value>)",
        muted: "oklch(var(--muted) / <alpha-value>)",
        surface: "oklch(var(--surface) / <alpha-value>)",
        line: "oklch(var(--line) / <alpha-value>)",
        brand: "oklch(var(--brand) / <alpha-value>)",
        coral: "oklch(var(--coral) / <alpha-value>)"
      },
      fontFamily: {
        sans: [
          "Anuphan",
          "Noto Sans Thai",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      boxShadow: {
        soft: "0 24px 80px oklch(0 0 0 / 0.18)",
        lift: "0 18px 40px oklch(0 0 0 / 0.16)"
      }
    }
  },
  plugins: [typography]
};

export default config;
