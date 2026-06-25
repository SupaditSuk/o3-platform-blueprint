const baseUrl = (process.env.SITE_URL || "http://localhost:3030").replace(/\/$/, "");
const sitemapUrl = `${baseUrl}/sitemap.xml`;

const failures = [];

function extractUrls(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

try {
  const response = await fetch(sitemapUrl);

  if (!response.ok) {
    console.error(`Sitemap returned ${response.status}: ${sitemapUrl}`);
    process.exit(1);
  }

  const xml = await response.text();
  const urls = extractUrls(xml);

  if (urls.length === 0) {
    console.error("Sitemap check failed: no URLs found.");
    process.exit(1);
  }

  for (const url of urls) {
    try {
      const response = await fetch(url, { redirect: "manual" });

      if (response.status < 200 || response.status >= 400) {
        failures.push(`${url} returned ${response.status}`);
        continue;
      }

      console.log(`OK ${url}`);
    } catch (error) {
      failures.push(`${url} failed: ${error.message}`);
    }
  }

  if (failures.length > 0) {
    console.error("\nSitemap check failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log(`\nSitemap check passed for ${urls.length} URLs.`);
} catch (error) {
  console.error(`Sitemap check failed: ${error.message}`);
  process.exit(1);
}
