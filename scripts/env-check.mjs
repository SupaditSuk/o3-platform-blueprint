const required = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "ADMIN_EMAILS",
  "NEXT_PUBLIC_CONTACT_EMAIL",
  "NEXT_PUBLIC_LINKEDIN_URL",
];

const placeholders = [
  "your-domain.com",
  "your-project-ref",
  "your-supabase",
  "your.email",
  "example.com",
];

const failures = [];
const warnings = [];

function hasPlaceholder(value) {
  return placeholders.some((placeholder) =>
    value.toLowerCase().includes(placeholder.toLowerCase()),
  );
}

for (const key of required) {
  const value = process.env[key]?.trim();

  if (!value) {
    failures.push(`${key} is missing`);
    continue;
  }

  if (hasPlaceholder(value)) {
    failures.push(`${key} still contains a placeholder value`);
  }
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (siteUrl) {
  try {
    const parsed = new URL(siteUrl);
    if (parsed.protocol !== "https:" && !parsed.hostname.includes("localhost")) {
      failures.push("NEXT_PUBLIC_SITE_URL should use HTTPS in production");
    }
  } catch {
    failures.push("NEXT_PUBLIC_SITE_URL is not a valid URL");
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
if (supabaseUrl) {
  try {
    const parsed = new URL(supabaseUrl);
    if (!parsed.hostname.endsWith(".supabase.co")) {
      warnings.push("NEXT_PUBLIC_SUPABASE_URL does not look like a standard Supabase project URL");
    }
  } catch {
    failures.push("NEXT_PUBLIC_SUPABASE_URL is not a valid URL");
  }
}

const adminEmails = process.env.ADMIN_EMAILS?.split(",").map((email) => email.trim()).filter(Boolean) || [];
if (adminEmails.length > 0) {
  for (const email of adminEmails) {
    if (!email.includes("@")) {
      failures.push(`ADMIN_EMAILS contains an invalid email: ${email}`);
    }
  }
}

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
if (contactEmail && !contactEmail.includes("@")) {
  failures.push("NEXT_PUBLIC_CONTACT_EMAIL is not a valid email");
}

const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim();
if (linkedInUrl) {
  try {
    const parsed = new URL(linkedInUrl);
    if (!parsed.hostname.includes("linkedin.com")) {
      warnings.push("NEXT_PUBLIC_LINKEDIN_URL is not a LinkedIn URL");
    }
  } catch {
    failures.push("NEXT_PUBLIC_LINKEDIN_URL is not a valid URL");
  }
}

for (const [key, value] of Object.entries(process.env)) {
  if (/SERVICE_ROLE|SUPABASE_SERVICE/i.test(key) || /service[_-]?role/i.test(value || "")) {
    failures.push(`${key} appears to expose a Supabase service role value`);
  }
}

if (warnings.length > 0) {
  console.log("Warnings:");
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

if (failures.length > 0) {
  console.error("Environment check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Environment check passed.");
