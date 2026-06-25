"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type UploadResult = { ok: true; url: string } | { ok: false; message: string };

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"]);

/**
 * Uploads an article image to the public `article-images` bucket and returns its
 * public URL. Runs as the signed-in user; the bucket's RLS policy restricts writes
 * to admins, so a non-admin upload is rejected by Supabase.
 */
export async function uploadArticleImage(formData: FormData): Promise<UploadResult> {
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "No image selected." };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, message: "Image must be 5MB or smaller." };
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return { ok: false, message: "Unsupported image type (use PNG, JPG, WEBP, GIF, or AVIF)." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "Supabase is not configured." };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, message: "You must be signed in as an admin." };
  }

  const ext = (file.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
  const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from("article-images").upload(path, file, {
    contentType: file.type,
    upsert: false
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  const { data } = supabase.storage.from("article-images").getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}
