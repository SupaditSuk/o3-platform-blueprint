"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function setLessonComplete(lessonId: string, done: boolean): Promise<{ ok: boolean }> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false };
  }

  if (done) {
    const { error } = await supabase
      .from("lesson_progress")
      .upsert({ user_id: user.id, lesson_id: lessonId }, { onConflict: "user_id,lesson_id" });
    return { ok: !error };
  }

  const { error } = await supabase.from("lesson_progress").delete().eq("user_id", user.id).eq("lesson_id", lessonId);
  return { ok: !error };
}
