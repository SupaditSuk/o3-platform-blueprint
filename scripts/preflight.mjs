import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();

const failures = [];
const warnings = [];

const requiredFiles = [
  ".env.example",
  ".gitignore",
  ".nvmrc",
  "package-lock.json",
  "supabase/README.md",
  "supabase/schema.sql",
  "supabase/verify.sql",
  "supabase/create-admin-profile.sql",
  "docs/launch-checklist.md",
  "docs/deployment-runbook.md",
  "docs/supabase-production-setup.md",
  "docs/vercel-production-setup.md",
  "docs/production-readiness-status.md",
];

const requiredEnvKeys = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "ADMIN_EMAILS",
  "NEXT_PUBLIC_CONTACT_EMAIL",
  "NEXT_PUBLIC_LINKEDIN_URL",
];

const ignoredDirs = new Set([
  ".git",
  ".next",
  ".vercel",
  "node_modules",
  "out",
  "dist",
]);

const textExtensions = new Set([
  ".env",
  ".example",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".sql",
  ".ts",
  ".tsx",
  ".txt",
  ".yml",
  ".yaml",
]);

const forbiddenSecretPatterns = [
  /SERVICE_ROLE/i,
  /service[_-]?role/i,
  /SUPABASE_SERVICE/i,
];

function pass(message) {
  console.log(`OK ${message}`);
}

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function extensionOf(path) {
  const match = path.match(/(\.[^.]+)$/);
  return match?.[1] || "";
}

function walk(directory, files = []) {
  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    const relativePath = relative(root, fullPath);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      if (!ignoredDirs.has(entry)) {
        walk(fullPath, files);
      }
      continue;
    }

    const extension = extensionOf(entry);
    if (
      textExtensions.has(extension) ||
      entry.startsWith(".env") ||
      entry === ".gitignore" ||
      entry === ".nvmrc"
    ) {
      files.push(relativePath);
    }
  }

  return files;
}

const nodeMajor = Number.parseInt(process.versions.node.split(".")[0] || "0", 10);
if (nodeMajor >= 22) {
  pass(`Node.js ${process.versions.node}`);
} else {
  fail(`Node.js 22 or newer is required. Current version is ${process.versions.node}.`);
}

for (const file of requiredFiles) {
  if (existsSync(join(root, file))) {
    pass(`${file} exists`);
  } else {
    fail(`${file} is missing`);
  }
}

const envExample = existsSync(join(root, ".env.example"))
  ? readFileSync(join(root, ".env.example"), "utf8")
  : "";

for (const key of requiredEnvKeys) {
  if (new RegExp(`^${key}=`, "m").test(envExample)) {
    pass(`${key} is documented`);
  } else {
    fail(`${key} is missing from .env.example`);
  }
}

const gitignore = existsSync(join(root, ".gitignore"))
  ? readFileSync(join(root, ".gitignore"), "utf8")
  : "";

for (const ignored of [".env", ".env.local", ".env.*.local", ".vercel/", "node_modules/", ".next/"]) {
  if (gitignore.includes(ignored)) {
    pass(`${ignored} is ignored`);
  } else {
    fail(`${ignored} is not listed in .gitignore`);
  }
}

for (const file of walk(root)) {
  const text = readFileSync(join(root, file), "utf8");
  for (const pattern of forbiddenSecretPatterns) {
    if (pattern.test(text)) {
      const allowedDocumentation =
        file.endsWith(".md") ||
        file === ".env.example" ||
        file === "scripts/preflight.mjs" ||
        file === "scripts/env-check.mjs";

      if (!allowedDocumentation) {
        fail(`Forbidden service-role wording found in ${file}`);
      }
    }
  }
}

for (const localEnvFile of [".env", ".env.local"]) {
  const path = join(root, localEnvFile);
  if (!existsSync(path)) {
    continue;
  }

  const text = readFileSync(path, "utf8");
  if (/SERVICE_ROLE|service[_-]?role|SUPABASE_SERVICE/i.test(text)) {
    fail(`${localEnvFile} appears to contain a service role value. Remove it before launch.`);
  } else {
    pass(`${localEnvFile} has no service role marker`);
  }
}

if (!existsSync(join(root, ".env.local"))) {
  warn(".env.local is not present. That is okay for docs/build, but local Supabase flows need it.");
}

if (warnings.length > 0) {
  console.log("\nWarnings:");
  for (const message of warnings) {
    console.log(`- ${message}`);
  }
}

if (failures.length > 0) {
  console.error("\nPreflight failed:");
  for (const message of failures) {
    console.error(`- ${message}`);
  }
  process.exit(1);
}

console.log("\nPreflight passed.");
