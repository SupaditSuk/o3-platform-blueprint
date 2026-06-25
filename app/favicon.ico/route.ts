const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#050505"/>
  <circle cx="32" cy="32" r="18" fill="none" stroke="#e11d48" stroke-width="8"/>
  <text x="41" y="24" fill="#ffffff" font-family="Arial, sans-serif" font-size="18" font-weight="700">3</text>
</svg>`;

export function GET() {
  return new Response(icon, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
