import type { Metadata } from "next";
import { MotionReveal } from "@/components/motion-reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3030"),
  title: {
    default: "O3 ZONE Intelligence | People Intelligence & HR Transformation",
    template: "%s | O3 ZONE"
  },
  applicationName: "O3 ZONE Intelligence",
  description:
    "O3 ZONE helps HR leaders and business owners turn people data into workforce insight, productivity decisions, and measurable business outcomes.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/o3-zone-logo.jpg"
  },
  appleWebApp: {
    capable: true,
    title: "O3 ZONE",
    statusBarStyle: "black-translucent"
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    title: "O3 ZONE Intelligence",
    description:
      "People Intelligence, HR Transformation, assessments, and dashboard starter services for organizations that want sharper workforce decisions.",
    siteName: "O3 ZONE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "O3 ZONE Intelligence",
    description:
      "People Intelligence, HR Transformation, assessments, and dashboard starter services for sharper workforce decisions."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        <MotionReveal />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
