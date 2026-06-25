import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { loadAllAiRoles } from "@/lib/ai-role";
import { AdminChat } from "@/components/admin/admin-chat";
import { AdminConsole } from "@/components/admin/admin-console";
import { loadAssessmentSubmissions, loadCmsContent } from "@/lib/cms-store";
import { getAdminEmails, getSupabaseConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "O3 ZONE Admin | Content Studio",
  description: "Back office for articles, online courses, and O3 Zone learning content."
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const config = getSupabaseConfig();

  if (!config.isConfigured) {
    redirect("/auth/login?setup=supabase&next=/admin");
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/auth/login?setup=supabase&next=/admin");
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/admin");
  }

  const adminEmails = getAdminEmails();
  const userEmail = user.email?.toLowerCase();

  if (adminEmails.length === 0) {
    redirect("/auth/login?error=admin-config&next=/admin");
  }

  if (!userEmail || !adminEmails.includes(userEmail)) {
    redirect("/auth/login?error=unauthorized");
  }

  const { data: adminProfile } = await supabase
    .from("admin_profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (!adminProfile || !["admin", "super_admin"].includes(adminProfile.role)) {
    redirect("/auth/login?error=admin-profile&next=/admin");
  }

  const content = await loadCmsContent(supabase);
  const assessments = await loadAssessmentSubmissions(supabase);
  const aiRoles = await loadAllAiRoles(supabase);

  return (
    <>
      <AdminConsole
        initialPosts={content.posts}
        initialCourses={content.courses}
        initialAssessments={assessments}
        storageMode="database"
        initialAiRoles={aiRoles}
      />
      <AdminChat />
    </>
  );
}
