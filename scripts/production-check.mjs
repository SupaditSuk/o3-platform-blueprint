import { spawn } from "node:child_process";

const port = process.env.PORT || "3032";
const siteUrl = `http://localhost:${port}`;
const readyUrl = `${siteUrl}/api/health`;

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: false,
      ...options,
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
      }
    });
  });
}

async function waitForReady() {
  const timeoutMs = 30_000;
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(readyUrl);
      if (response.ok) {
        const body = await response.json();
        if (body?.ok === true) {
          return;
        }
      }
    } catch {
      // Keep waiting until Next.js is ready.
    }

    await new Promise((resolve) => setTimeout(resolve, 750));
  }

  throw new Error(`Production server did not become ready at ${readyUrl}`);
}

let exitCode = 0;
let server;

try {
  await run("npm", ["run", "build"], {
    env: {
      ...process.env,
      NEXT_PUBLIC_SITE_URL: siteUrl,
    },
  });

  server = spawn("npm", ["run", "start", "--", "-p", port], {
    stdio: "inherit",
    shell: false,
    env: {
      ...process.env,
      NEXT_PUBLIC_SITE_URL: siteUrl,
      PORT: port,
    },
  });

  await waitForReady();
  await run("node", ["scripts/smoke-check.mjs"], {
    env: {
      ...process.env,
      SITE_URL: siteUrl,
    },
  });
  await run("node", ["scripts/sitemap-check.mjs"], {
    env: {
      ...process.env,
      SITE_URL: siteUrl,
    },
  });
  console.log(`\nProduction check passed for ${siteUrl}`);
} catch (error) {
  exitCode = 1;
  console.error(`\nProduction check failed: ${error.message}`);
} finally {
  if (server && !server.killed) {
    server.kill("SIGTERM");

    await new Promise((resolve) => {
      const timeout = setTimeout(() => {
        if (!server.killed) {
          server.kill("SIGKILL");
        }
        resolve();
      }, 2_000);

      server.once("exit", () => {
        clearTimeout(timeout);
        resolve();
      });
    });
  }
}

process.exit(exitCode);
