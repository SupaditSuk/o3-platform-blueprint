import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "o3-zone-website",
    timestamp: new Date().toISOString(),
  });
}
