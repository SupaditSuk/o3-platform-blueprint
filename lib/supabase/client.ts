import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/config";

/**
 * Browser-side Supabase client. Returns null when Supabase env is not configured
 * so the header can degrade gracefully (no account widget) instead of throwing.
 */
export function createSupabaseBrowserClient() {
  const { url, anonKey, isConfigured } = getSupabaseConfig();

  if (!isConfigured || !url || !anonKey) {
    return null;
  }

  return createBrowserClient(url, anonKey);
}
