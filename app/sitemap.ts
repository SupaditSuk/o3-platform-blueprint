import type { MetadataRoute } from "next";
import { cmsPosts, cmsCourses } from "@/content/cms";
import { serviceDetails } from "@/content/services";
import { assessments } from "@/content/assessments";

const locales = ["th", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3030";
  const staticPaths = ["", "about", "blog", "services", "courses", "learn", "contact", "privacy", "terms"];
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      urls.push({
        url: `${siteUrl}/${locale}${path ? `/${path}` : ""}`,
        lastModified: new Date()
      });
    }

    for (const service of serviceDetails) {
      urls.push({
        url: `${siteUrl}/${locale}/services/${service.slug}`,
        lastModified: new Date()
      });
    }

    urls.push({
      url: `${siteUrl}/${locale}/services/intelligence-dashboard-starter/demo`,
      lastModified: new Date()
    });

    for (const assessment of assessments) {
      urls.push({
        url: `${siteUrl}/${locale}/assessment/${assessment.slug}`,
        lastModified: new Date()
      });
    }

    for (const post of cmsPosts.filter((item) => item.status === "published")) {
      urls.push({
        url: `${siteUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.updatedAt
      });
    }

    for (const course of cmsCourses.filter((item) => item.status === "published")) {
      urls.push({
        url: `${siteUrl}/${locale}/courses/${course.slug}`,
        lastModified: course.updatedAt
      });
    }
  }

  return urls;
}
