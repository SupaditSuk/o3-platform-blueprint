const baseUrl = (process.env.SITE_URL || "http://localhost:3030").replace(/\/$/, "");

const checks = [
  { path: "/api/health", expectJsonOk: true },
  { path: "/th" },
  { path: "/en" },
  { path: "/th/services" },
  { path: "/th/services/intelligence-dashboard-starter/demo" },
  { path: "/th/assessment/hr-health-check" },
  { path: "/th/contact?interest=intelligence_dashboard_starter" },
  { path: "/auth/login" },
  { path: "/th/blog/not-a-real-article", expectStatus: 404 },
  {
    path: "/admin",
    expectRedirectIncludes: ["/auth/login", "next=/admin"],
  },
  {
    path: "/unknown-locale",
    expectRedirectIncludes: ["/th"],
  },
  { path: "/favicon.ico" },
  { path: "/manifest.webmanifest" },
  { path: "/robots.txt" },
  { path: "/sitemap.xml" },
];

const failures = [];

for (const check of checks) {
  const url = `${baseUrl}${check.path}`;

  try {
    const response = await fetch(url, { redirect: "manual" });
    const validStatus = check.expectStatus
      ? response.status === check.expectStatus
      : response.status >= 200 &&
        response.status < 400;

    if (!validStatus) {
      failures.push(`${check.path} returned ${response.status}${check.expectStatus ? `, expected ${check.expectStatus}` : ""}`);
      continue;
    }

    if (check.expectRedirectIncludes) {
      const location = response.headers.get("location") || "";

      if (response.status < 300 || response.status >= 400) {
        failures.push(`${check.path} should redirect but returned ${response.status}`);
        continue;
      }

      const missing = check.expectRedirectIncludes.filter((fragment) => !location.includes(fragment));
      if (missing.length > 0) {
        failures.push(`${check.path} redirected to ${location || "(empty location)"}, missing ${missing.join(", ")}`);
        continue;
      }
    }

    if (check.expectJsonOk) {
      const body = await response.json();

      if (body?.ok !== true) {
        failures.push(`${check.path} did not return ok: true`);
        continue;
      }
    }

    console.log(`OK ${check.path}`);
  } catch (error) {
    failures.push(`${check.path} failed: ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error("\nSmoke check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`\nSmoke check passed for ${baseUrl}`);
