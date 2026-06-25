"use server";

import { revalidatePath } from "next/cache";
import type { CmsCourse, CmsPost } from "@/content/cms";
import { deleteCourse, deletePost, saveCourse, savePost } from "@/lib/cms-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SaveResult<T> =
  | {
      ok: true;
      item: T;
      message: string;
    }
  | {
      ok: false;
      message: string;
    };

export async function savePostAction(post: CmsPost): Promise<SaveResult<CmsPost>> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { ok: false, message: "Supabase is not configured yet." };
  }

  try {
    const item = await savePost(supabase, post);
    revalidatePath("/admin");
    revalidatePath("/th/blog");
    revalidatePath("/en/blog");
    revalidatePath(`/th/blog/${item.slug}`);
    revalidatePath(`/en/blog/${item.slug}`);
    return { ok: true, item, message: "Article saved to Supabase." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save article."
    };
  }
}

export async function saveCourseAction(course: CmsCourse): Promise<SaveResult<CmsCourse>> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { ok: false, message: "Supabase is not configured yet." };
  }

  try {
    const item = await saveCourse(supabase, course);
    revalidatePath("/admin");
    revalidatePath("/th/courses");
    revalidatePath("/en/courses");
    return { ok: true, item, message: "Course saved to Supabase." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save course."
    };
  }
}

export async function deletePostAction(id: string): Promise<SaveResult<{ id: string }>> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { ok: false, message: "Supabase is not configured yet." };
  }

  try {
    await deletePost(supabase, id);
    revalidatePath("/admin");
    revalidatePath("/th/blog");
    revalidatePath("/en/blog");
    return { ok: true, item: { id }, message: "Article deleted." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not delete article."
    };
  }
}

export async function deleteCourseAction(id: string): Promise<SaveResult<{ id: string }>> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { ok: false, message: "Supabase is not configured yet." };
  }

  try {
    await deleteCourse(supabase, id);
    revalidatePath("/admin");
    revalidatePath("/th/courses");
    revalidatePath("/en/courses");
    return { ok: true, item: { id }, message: "Course deleted." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not delete course."
    };
  }
}
