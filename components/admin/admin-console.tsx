"use client";

import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Download,
  Eye,
  FileText,
  GraduationCap,
  Layers3,
  LockKeyhole,
  LogOut,
  Mail,
  Plus,
  Save,
  Settings2,
  Sparkles,
  Target,
  Trash2,
  UsersRound
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { deleteCourseAction, deletePostAction, saveCourseAction, savePostAction } from "@/app/admin/actions";
import { saveAiRoleAction } from "@/app/admin/ai-actions";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import type { CmsCourse, CmsPost, PublishStatus } from "@/content/cms";
import { AI_ROLE_CONTEXTS, type AiRoleContext } from "@/lib/ai-role";
import type { AssessmentSubmission } from "@/lib/cms-store";

type AdminConsoleProps = {
  initialPosts: CmsPost[];
  initialCourses: CmsCourse[];
  initialAssessments: AssessmentSubmission[];
  storageMode: "local" | "database";
  initialAiRoles: Record<string, string>;
};

type Tab = "overview" | "assessments" | "posts" | "courses" | "setup" | "ai";

const storageKeys = {
  posts: "o3-admin-posts",
  courses: "o3-admin-courses"
};

const tabs: Array<{ id: Tab; label: string; icon: typeof BarChart3 }> = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "assessments", label: "Assessments", icon: ClipboardCheck },
  { id: "posts", label: "Articles", icon: FileText },
  { id: "courses", label: "Courses", icon: GraduationCap },
  { id: "setup", label: "Setup", icon: Settings2 },
  { id: "ai", label: "AI", icon: Sparkles }
];

const categoryLabels: Record<string, string> = {
  structure: "Structure & Role Clarity",
  workforce: "Workforce Planning",
  process: "HR Process",
  data: "Data & Dashboard",
  capability: "Capability & Leadership",
  ai_readiness: "AI Readiness",
  workload: "Workload & Demand",
  cost: "Cost & Overtime",
  productivity: "Productivity Metrics",
  scheduling: "Scheduling & Capacity",
  improvement: "Improvement Rhythm",
  use_case: "Use Case Clarity",
  workflow: "Workflow Automation",
  skill: "Prompt & AI Skill",
  governance: "Governance & Adoption",
  workforce_planning: "Workforce Planning",
  recruitment_onboarding: "Recruitment & Onboarding",
  performance_productivity: "Performance & Productivity",
  learning_talent: "Learning & Talent",
  data_analytics_ai: "Data, Analytics & AI"
};

const assessmentTypeLabels: Record<string, string> = {
  hr_health_check: "HR Health Check",
  workforce_productivity: "Workforce Productivity Check",
  ai_readiness_hr: "AI Readiness for HR"
};

const assessmentTypeOptions = [
  { value: "all", label: "All assessments" },
  { value: "hr_health_check", label: "HR Health Check" },
  { value: "workforce_productivity", label: "Workforce Productivity" },
  { value: "ai_readiness_hr", label: "AI Readiness" }
] as const;

type AssessmentTypeFilter = (typeof assessmentTypeOptions)[number]["value"];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function statusTone(status: PublishStatus) {
  return status === "published"
    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
    : "border-amber-300/20 bg-amber-300/10 text-amber-100";
}

function readStored<T>(key: string, fallback: T) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AdminConsole({ initialPosts, initialCourses, initialAssessments, storageMode, initialAiRoles }: AdminConsoleProps) {
  const [tab, setTab] = useState<Tab>("overview");
  const [posts, setPosts] = useState(initialPosts);
  const [courses, setCourses] = useState(initialCourses);
  const [activePostId, setActivePostId] = useState(initialPosts[0]?.id ?? "");
  const [activeCourseId, setActiveCourseId] = useState(initialCourses[0]?.id ?? "");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (storageMode === "database") {
      setPosts(initialPosts);
      setCourses(initialCourses);
      setActivePostId(initialPosts[0]?.id ?? "");
      setActiveCourseId(initialCourses[0]?.id ?? "");
      setHydrated(true);
      return;
    }

    const storedPosts = readStored(storageKeys.posts, initialPosts);
    const storedCourses = readStored(storageKeys.courses, initialCourses);
    setPosts(storedPosts);
    setCourses(storedCourses);
    setActivePostId(storedPosts[0]?.id ?? "");
    setActiveCourseId(storedCourses[0]?.id ?? "");
    setHydrated(true);
  }, [initialCourses, initialPosts, storageMode]);

  useEffect(() => {
    if (!hydrated || storageMode === "database") return;
    window.localStorage.setItem(storageKeys.posts, JSON.stringify(posts));
  }, [hydrated, posts, storageMode]);

  useEffect(() => {
    if (!hydrated || storageMode === "database") return;
    window.localStorage.setItem(storageKeys.courses, JSON.stringify(courses));
  }, [hydrated, courses, storageMode]);

  const activePost = posts.find((post) => post.id === activePostId) ?? posts[0];
  const activeCourse = courses.find((course) => course.id === activeCourseId) ?? courses[0];

  const stats = useMemo(
    () => [
      {
        label: "Assessment leads",
        value: initialAssessments.length,
        note: "website assessment submissions",
        icon: ClipboardCheck
      },
      {
        label: "Published articles",
        value: posts.filter((post) => post.status === "published").length,
        note: "visible on blog",
        icon: Eye
      },
      {
        label: "Draft articles",
        value: posts.filter((post) => post.status === "draft").length,
        note: "waiting to polish",
        icon: FileText
      },
      {
        label: "Course drafts",
        value: courses.length,
        note: "ready for e-learning",
        icon: BookOpen
      }
    ],
    [courses.length, initialAssessments.length, posts]
  );

  const updatePost = (nextPost: CmsPost) => {
    setPosts((items) => items.map((item) => (item.id === nextPost.id ? nextPost : item)));
  };

  const updateCourse = (nextCourse: CmsCourse) => {
    setCourses((items) => items.map((item) => (item.id === nextCourse.id ? nextCourse : item)));
  };

  const addPost = () => {
    const nextPost: CmsPost = {
      id: `post-${Date.now()}`,
      slug: "new-article",
      status: "draft",
      category: { th: "People Analytics", en: "People Analytics" },
      title: { th: "บทความใหม่", en: "New Article" },
      excerpt: { th: "สรุปประเด็นของบทความนี้", en: "Summarize the promise of this article." },
      body: { th: "เริ่มเขียนเนื้อหาภาษาไทยที่นี่", en: "Start the English body here." },
      readTime: { th: "อ่าน 4 นาที", en: "4 min read" },
      coverImageUrl: "",
      updatedAt: today()
    };
    setPosts((items) => [nextPost, ...items]);
    setActivePostId(nextPost.id);
    setTab("posts");
  };

  const addCourse = () => {
    const nextCourse: CmsCourse = {
      id: `course-${Date.now()}`,
      slug: "new-course",
      status: "draft",
      title: { th: "คอร์สใหม่", en: "New Course" },
      description: { th: "อธิบายผลลัพธ์ที่ผู้เรียนจะได้", en: "Describe the learner outcome." },
      priceThb: 2900,
      level: { th: "เริ่มต้น", en: "Beginner" },
      lessons: { th: ["บทเรียนที่ 1"], en: ["Lesson 1"] },
      updatedAt: today()
    };
    setCourses((items) => [nextCourse, ...items]);
    setActiveCourseId(nextCourse.id);
    setTab("courses");
  };

  const removePost = (id: string) => {
    const remaining = posts.filter((item) => item.id !== id);
    setPosts(remaining);
    setActivePostId((current) => (current === id ? remaining[0]?.id ?? "" : current));
  };

  const removeCourse = (id: string) => {
    const remaining = courses.filter((item) => item.id !== id);
    setCourses(remaining);
    setActiveCourseId((current) => (current === id ? remaining[0]?.id ?? "" : current));
  };

  return (
    <main className="min-h-dvh bg-[#090909] text-white">
      <div className="grain pointer-events-none fixed inset-0 opacity-20" />
      <div className="relative mx-auto grid min-h-dvh max-w-[1500px] lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-white/10 bg-black/70 p-5 backdrop-blur lg:min-h-dvh lg:border-b-0 lg:border-r lg:p-6">
          <Link href="/th" className="inline-flex items-center gap-3 text-xl font-bold tracking-[-0.04em]">
            <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-white/10 bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/o3-zone-logo.jpg" alt="O³ ZONE" className="h-full w-full object-cover" />
            </span>
            O³ ZONE
          </Link>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Content Studio
            </p>
            <p className="mt-3 text-sm font-semibold leading-6 text-white/72">
              {storageMode === "database"
                ? "Connected to Supabase. Save changes to publish from the database."
                : "Manage articles and course drafts before Supabase goes live."}
            </p>
          </div>

          <nav className="mt-6 grid gap-2">
            {tabs.map((item) => {
              const Icon = item.icon;
              const selected = tab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`flex min-h-12 items-center gap-3 rounded-xl px-4 text-left text-sm font-bold transition-colors ${
                    selected ? "bg-white text-neutral-950" : "text-white/62 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <Icon size={18} aria-hidden="true" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={addPost}
              className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-3 text-xs font-bold text-white"
            >
              <Plus size={15} aria-hidden="true" />
              Article
            </button>
            <button
              type="button"
              onClick={addCourse}
              className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-3 text-xs font-bold text-neutral-950"
            >
              <Plus size={15} aria-hidden="true" />
              Course
            </button>
          </div>

          <Link
            href="/auth/logout"
            className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 text-xs font-bold text-white/62 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <LogOut size={15} aria-hidden="true" />
            Sign out
          </Link>
        </aside>

        <section className="p-5 sm:p-7 lg:p-10">
          <div className="flex flex-col gap-5 border-b border-white/10 pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/42">Back office phase 1</p>
              <h1 className="mt-3 text-balance text-[clamp(2.4rem,6vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
                Content command center
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/th/blog"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm font-bold text-white/76 hover:bg-white/[0.06]"
              >
                Preview blog
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 text-sm font-bold text-white/76">
                <Save size={16} aria-hidden="true" />
                {storageMode === "database" ? "Database mode" : "Auto-saved locally"}
              </span>
            </div>
          </div>

          {tab === "overview" && (
            <div className="py-8">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <Icon className="text-red-400" size={22} aria-hidden="true" />
                      <p className="mt-8 text-5xl font-semibold tracking-[-0.06em]">{stat.value}</p>
                      <p className="mt-2 text-sm font-bold text-white">{stat.label}</p>
                      <p className="mt-1 text-xs font-semibold text-white/42">{stat.note}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.72fr]">
                <AssessmentSnapshot assessments={initialAssessments} onOpen={() => setTab("assessments")} />

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center gap-3">
                    <Layers3 className="text-red-400" size={22} aria-hidden="true" />
                    <h2 className="text-xl font-bold tracking-[-0.03em]">Publishing pipeline</h2>
                  </div>
                  <div className="mt-6 grid gap-3">
                    {posts.map((post) => (
                      <button
                        key={post.id}
                        type="button"
                        onClick={() => {
                          setActivePostId(post.id);
                          setTab("posts");
                        }}
                        className="grid gap-3 rounded-xl border border-white/10 bg-black/24 p-4 text-left transition-colors hover:bg-white/[0.06] md:grid-cols-[1fr_auto]"
                      >
                        <span>
                          <span className="text-sm font-bold text-white">{post.title.th}</span>
                          <span className="mt-1 block text-xs font-semibold text-white/42">/{post.slug}</span>
                        </span>
                        <span className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${statusTone(post.status)}`}>
                          {post.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-red-400/20 bg-red-500/[0.08] p-5">
                  <Sparkles className="text-red-300" size={24} aria-hidden="true" />
                  <h2 className="mt-6 text-2xl font-bold tracking-[-0.04em]">Next best move</h2>
                  <p className="mt-3 text-sm font-semibold leading-7 text-white/70">
                    Supabase and Google sign-in are live. Draft an article or course, set it to published, and save to the database — it goes straight to the public blog and course pages.
                  </p>
                  <button
                    type="button"
                    onClick={() => setTab("setup")}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-neutral-950"
                  >
                    View setup checklist
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === "assessments" && <AssessmentDashboard assessments={initialAssessments} storageMode={storageMode} />}

          {tab === "posts" &&
            (activePost ? (
              <PostEditor
                posts={posts}
                activePost={activePost}
                onSelect={setActivePostId}
                onUpdate={updatePost}
                onRemove={removePost}
                storageMode={storageMode}
              />
            ) : (
              <EmptyState
                title="No articles yet"
                description="Create your first article and save it to the database to publish it on the blog."
                actionLabel="New article"
                onAction={addPost}
              />
            ))}

          {tab === "courses" &&
            (activeCourse ? (
              <CourseEditor
                courses={courses}
                activeCourse={activeCourse}
                onSelect={setActiveCourseId}
                onUpdate={updateCourse}
                onRemove={removeCourse}
                storageMode={storageMode}
              />
            ) : (
              <EmptyState
                title="No courses yet"
                description="Create your first course draft and save it to the database when it is ready for e-learning."
                actionLabel="New course"
                onAction={addCourse}
              />
            ))}

          {tab === "setup" && <SetupPanel />}
          {tab === "ai" && <AiRolesPanel roles={initialAiRoles} />}
        </section>
      </div>
    </main>
  );
}

function average(values: number[]) {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function getLowestCategory(assessments: AssessmentSubmission[]) {
  const totals = new Map<string, number[]>();

  assessments.forEach((assessment) => {
    Object.entries(assessment.categoryScores).forEach(([key, value]) => {
      totals.set(key, [...(totals.get(key) ?? []), value]);
    });
  });

  return [...totals.entries()]
    .map(([key, values]) => ({ key, score: average(values) }))
    .sort((a, b) => a.score - b.score)[0];
}

function scoreTone(score: number) {
  if (score >= 81) return "border-emerald-400/20 bg-emerald-400/10 text-emerald-100";
  if (score >= 61) return "border-sky-300/20 bg-sky-300/10 text-sky-100";
  if (score >= 41) return "border-amber-300/20 bg-amber-300/10 text-amber-100";
  return "border-red-400/20 bg-red-500/10 text-red-100";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function csvCell(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function downloadAssessmentCsv(assessments: AssessmentSubmission[]) {
  const headers = [
    "created_at",
    "assessment_type",
    "company_name",
    "contact_name",
    "email",
    "role",
    "company_size",
    "industry",
    "overall_score",
    "maturity_level",
    "main_challenge",
    "category_scores"
  ];
  const rows = assessments.map((assessment) => [
    assessment.createdAt,
    assessmentTypeLabels[assessment.assessmentType] ?? assessment.assessmentType,
    assessment.companyName,
    assessment.fullName ?? "",
    assessment.email,
    assessment.role,
    assessment.companySize,
    assessment.industry ?? "",
    assessment.overallScore,
    assessment.maturityLevel,
    assessment.mainChallenge ?? "",
    Object.entries(assessment.categoryScores)
      .map(([key, value]) => `${categoryLabels[key] ?? key}: ${value}`)
      .join(" | ")
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `o3-assessment-leads-${today()}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function getWeakestCategory(assessment: AssessmentSubmission) {
  return Object.entries(assessment.categoryScores).sort((a, b) => a[1] - b[1])[0];
}

function getFollowUpPlan(assessment: AssessmentSubmission) {
  const weakest = getWeakestCategory(assessment);
  const weakestLabel = weakest ? categoryLabels[weakest[0]] ?? weakest[0] : "the lowest-scoring area";

  if (assessment.assessmentType === "workforce_productivity") {
    return {
      title: "Recommend Workforce Intelligence Sprint",
      body: `Open with ${weakestLabel}. Ask for current workforce cost, OT, demand, and productivity signals, then propose a focused sprint to find quick wins and executive metrics.`,
      steps: ["Confirm the main productivity pain", "Request available cost, OT, workload, and schedule data", "Offer a 90-day Workforce Intelligence Sprint"]
    };
  }

  if (assessment.assessmentType === "ai_readiness_hr") {
    return {
      title: "Recommend AI Readiness Workshop",
      body: `Open with ${weakestLabel}. Align on 1-2 practical HR AI use cases, then offer a workshop to design prompts, workflow prototypes, and basic governance.`,
      steps: ["Pick one real HR workflow", "Map risk, data, and adoption gaps", "Offer an AI Readiness for HR workshop"]
    };
  }

  return {
    title: "Recommend HR Health Check debrief",
    body: `Open with ${weakestLabel}. Translate the result into a 90-day HR roadmap, then suggest the right path: HR OS Lite, dashboard starter, advisory, or workshop.`,
    steps: ["Validate the lowest-scoring dimension", "Connect the gap to business impact", "Offer a 60-minute HR Health Check debrief"]
  };
}

function AssessmentSnapshot({
  assessments,
  onOpen
}: {
  assessments: AssessmentSubmission[];
  onOpen: () => void;
}) {
  const averageScore = average(assessments.map((assessment) => assessment.overallScore));
  const lowest = getLowestCategory(assessments);

  return (
    <div className="rounded-2xl border border-red-400/20 bg-red-500/[0.08] p-5">
      <div className="flex items-center gap-3">
        <ClipboardCheck className="text-red-300" size={24} aria-hidden="true" />
        <h2 className="text-xl font-bold tracking-[-0.03em]">Assessment leads</h2>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
        <div className="rounded-xl bg-black/24 p-4">
          <p className="text-xs font-bold text-white/42">Submissions</p>
          <p className="mt-2 text-4xl font-semibold tracking-[-0.06em]">{assessments.length}</p>
        </div>
        <div className="rounded-xl bg-black/24 p-4">
          <p className="text-xs font-bold text-white/42">Average score</p>
          <p className="mt-2 text-4xl font-semibold tracking-[-0.06em]">{averageScore || "-"}</p>
        </div>
        <div className="rounded-xl bg-black/24 p-4">
          <p className="text-xs font-bold text-white/42">Common gap</p>
          <p className="mt-2 text-sm font-bold leading-6">{lowest ? categoryLabels[lowest.key] ?? lowest.key : "No data yet"}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-neutral-950"
      >
        Open assessment dashboard
        <ArrowUpRight size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

function AssessmentDashboard({
  assessments,
  storageMode
}: {
  assessments: AssessmentSubmission[];
  storageMode: "local" | "database";
}) {
  const [typeFilter, setTypeFilter] = useState<AssessmentTypeFilter>("all");
  const filteredAssessments = useMemo(
    () => assessments.filter((assessment) => typeFilter === "all" || assessment.assessmentType === typeFilter),
    [assessments, typeFilter]
  );
  const averageScore = average(filteredAssessments.map((assessment) => assessment.overallScore));
  const lowest = getLowestCategory(filteredAssessments);
  const latest = filteredAssessments[0];
  const urgentLeads = filteredAssessments.filter((assessment) => assessment.overallScore < 61).length;
  const [selectedId, setSelectedId] = useState(assessments[0]?.id ?? "");
  const selected = filteredAssessments.find((assessment) => assessment.id === selectedId) ?? filteredAssessments[0];

  useEffect(() => {
    setSelectedId(filteredAssessments[0]?.id ?? "");
  }, [filteredAssessments]);

  if (storageMode !== "database") {
    return (
      <div className="py-8">
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-6">
          <Database className="text-amber-100" size={24} aria-hidden="true" />
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">Connect Supabase to see assessment results</h2>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-amber-50/72">
            This dashboard reads from the `assessment_submissions` table. Once the Supabase schema and environment variables are active, every website assessment submission will appear here.
          </p>
        </div>
      </div>
    );
  }

  if (assessments.length === 0) {
    return (
      <div className="py-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <ClipboardCheck className="text-red-300" size={24} aria-hidden="true" />
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">No assessment submissions yet</h2>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-white/62">
            When someone completes the assessment, their company profile, score, maturity level, category gaps, and challenge note will show up here.
          </p>
          <Link
            href="/th/assessment/hr-health-check"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-neutral-950"
          >
            Open assessment page
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {assessmentTypeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setTypeFilter(option.value)}
              className={`min-h-10 rounded-full border px-4 text-xs font-bold transition-colors ${
                typeFilter === option.value
                  ? "border-white bg-white text-neutral-950"
                  : "border-white/10 bg-black/24 text-white/62 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => downloadAssessmentCsv(filteredAssessments)}
          disabled={filteredAssessments.length === 0}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-white px-4 text-xs font-bold text-neutral-950 transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Download size={15} aria-hidden="true" />
          Export CSV
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Submissions", value: filteredAssessments.length, note: "selected assessment records", icon: UsersRound },
          { label: "Average score", value: averageScore || "-", note: "selected lead average", icon: BarChart3 },
          {
            label: "Common gap",
            value: lowest ? lowest.score : "-",
            note: lowest ? categoryLabels[lowest.key] ?? lowest.key : "no gap yet",
            icon: Target
          },
          {
            label: "Priority leads",
            value: urgentLeads,
            note: latest ? `Latest: ${latest.companyName}` : "waiting for first result",
            icon: ClipboardCheck
          }
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <Icon className="text-red-400" size={22} aria-hidden="true" />
              <p className="mt-8 text-5xl font-semibold tracking-[-0.06em]">{item.value}</p>
              <p className="mt-2 text-sm font-bold text-white">{item.label}</p>
              <p className="mt-1 text-xs font-semibold text-white/42">{item.note}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[420px_1fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-white/62">Assessment leads</p>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-white/42">
              {filteredAssessments.length} records
            </span>
          </div>
          <div className="grid max-h-[720px] gap-2 overflow-auto pr-1">
            {filteredAssessments.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-black/22 p-4">
                <p className="text-sm font-bold text-white">No records in this filter</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-white/46">
                  Switch to all assessments or wait for new submissions.
                </p>
              </div>
            ) : null}
            {filteredAssessments.map((assessment) => (
              <button
                key={assessment.id}
                type="button"
                onClick={() => setSelectedId(assessment.id)}
                className={`rounded-xl p-4 text-left transition-colors ${
                  selected?.id === assessment.id ? "bg-white text-neutral-950" : "bg-black/22 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span>
                    <span className="block text-sm font-bold">{assessment.companyName}</span>
                    <span className="mt-1 block text-xs font-semibold opacity-60">
                      {(assessmentTypeLabels[assessment.assessmentType] ?? assessment.assessmentType)} · {assessment.companySize}
                    </span>
                  </span>
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold ${scoreTone(assessment.overallScore)}`}>
                    {assessment.overallScore}
                  </span>
                </div>
                <p className="mt-3 text-xs font-semibold opacity-50">{formatDate(assessment.createdAt)}</p>
              </button>
            ))}
          </div>
        </div>

        {selected ? <AssessmentDetail assessment={selected} /> : null}
      </div>
    </div>
  );
}

function AssessmentDetail({ assessment }: { assessment: AssessmentSubmission }) {
  const sortedCategories = Object.entries(assessment.categoryScores).sort((a, b) => a[1] - b[1]);
  const weakest = sortedCategories[0];
  const followUp = getFollowUpPlan(assessment);
  const emailSubject = encodeURIComponent(`O³ ZONE assessment result for ${assessment.companyName}`);
  const emailBody = encodeURIComponent(
    `Hi ${assessment.fullName || assessment.companyName},\n\nThank you for completing the ${assessmentTypeLabels[assessment.assessmentType] ?? "O³ assessment"}.\n\nYour initial score is ${assessment.overallScore}/100. A useful starting point is ${weakest ? categoryLabels[weakest[0]] ?? weakest[0] : "the lowest-scoring area"}.\n\nI would be happy to walk through the result and suggest a practical 90-day next step.\n\nBest,\nO³ ZONE`
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-bold text-red-300">
            {assessmentTypeLabels[assessment.assessmentType] ?? assessment.assessmentType}
          </p>
          <h2 className="mt-2 text-balance text-4xl font-semibold leading-tight tracking-[-0.05em]">
            {assessment.companyName}
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-white/58">
            {assessment.fullName || "Unnamed contact"} · {assessment.email}
          </p>
        </div>
        <div className={`w-fit rounded-2xl border px-5 py-4 ${scoreTone(assessment.overallScore)}`}>
          <p className="text-xs font-bold opacity-70">Overall score</p>
          <p className="mt-1 text-5xl font-semibold tracking-[-0.08em]">{assessment.overallScore}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <InfoTile label="Maturity" value={assessment.maturityLevel} />
        <InfoTile label="Company size" value={assessment.companySize} />
        <InfoTile label="Industry" value={assessment.industry || "Not specified"} />
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/24 p-5">
        <p className="text-sm font-bold text-white/58">Current people challenge</p>
        <p className="mt-3 text-base font-semibold leading-7 text-white/82">
          {assessment.mainChallenge || "No challenge note provided."}
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/[0.08] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold text-red-100">Recommended follow-up</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{followUp.title}</h3>
          </div>
          <a
            href={`mailto:${assessment.email}?subject=${emailSubject}&body=${emailBody}`}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-white px-4 text-xs font-bold text-neutral-950"
          >
            <Mail size={15} aria-hidden="true" />
            Draft email
          </a>
        </div>
        <p className="mt-3 text-sm font-semibold leading-7 text-white/76">{followUp.body}</p>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          {followUp.steps.map((step, index) => (
            <div key={step} className="rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="text-xs font-bold text-red-200">0{index + 1}</p>
              <p className="mt-2 text-xs font-bold leading-5 text-white/72">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        <p className="text-sm font-bold text-white/62">Category scores</p>
        {Object.entries(assessment.categoryScores).map(([key, value]) => (
          <div key={key}>
            <div className="flex items-center justify-between gap-4 text-xs font-bold text-white/52">
              <span>{categoryLabels[key] ?? key}</span>
              <span>{value}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-brand" style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/24 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/34">{label}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-white">{value}</p>
    </div>
  );
}

function EmptyState({
  title,
  description,
  actionLabel,
  onAction
}: {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="py-8">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
        <FileText className="mx-auto text-red-300" size={26} aria-hidden="true" />
        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{title}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-7 text-white/62">{description}</p>
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-neutral-950"
        >
          <Plus size={16} aria-hidden="true" />
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const className =
    "assessment-field mt-2 w-full rounded-xl border border-white/10 bg-black/28 px-4 py-3 text-sm font-semibold leading-6 text-white outline-none transition-colors placeholder:text-white/24 focus:border-red-400/70";

  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/42">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} className={`${className} min-h-32 resize-y`} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} className={className} />
      )}
    </label>
  );
}

function PostEditor({
  posts,
  activePost,
  onSelect,
  onUpdate,
  onRemove,
  storageMode
}: {
  posts: CmsPost[];
  activePost: CmsPost;
  onSelect: (id: string) => void;
  onUpdate: (post: CmsPost) => void;
  onRemove: (id: string) => void;
  storageMode: "local" | "database";
}) {
  const setPost = (patch: Partial<CmsPost>) => onUpdate({ ...activePost, ...patch, updatedAt: today() });
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();
  const [message, setMessage] = useState("");

  const saveToDatabase = () => {
    setMessage("");
    startTransition(async () => {
      const result = await savePostAction(activePost);
      setMessage(result.message);

      if (result.ok) {
        onUpdate(result.item);
      }
    });
  };

  const deletePost = () => {
    if (!window.confirm(`ลบบทความ "${activePost.title.th || activePost.title.en}"? การลบนี้ย้อนกลับไม่ได้`)) {
      return;
    }

    setMessage("");
    startDeleteTransition(async () => {
      // New, unsaved drafts only exist in memory, so just drop them locally.
      if (activePost.id.startsWith("post-")) {
        onRemove(activePost.id);
        return;
      }

      const result = await deletePostAction(activePost.id);
      setMessage(result.message);

      if (result.ok) {
        onRemove(activePost.id);
      }
    });
  };

  return (
    <div className="grid gap-5 py-8 xl:grid-cols-[340px_1fr]">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <p className="mb-4 text-sm font-bold text-white/62">Article library</p>
        <div className="grid gap-2">
          {posts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => onSelect(post.id)}
              className={`rounded-xl p-4 text-left transition-colors ${
                post.id === activePost.id ? "bg-white text-neutral-950" : "bg-black/22 hover:bg-white/[0.06]"
              }`}
            >
              <span className="block text-sm font-bold">{post.title.th}</span>
              <span className="mt-1 block text-xs font-semibold opacity-60">{post.category.en}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-red-300">Article editor</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-[-0.04em]">{activePost.title.en}</h2>
          </div>
          <select
            value={activePost.status}
            onChange={(event) => setPost({ status: event.target.value as PublishStatus })}
            className="rounded-full border border-white/10 bg-black px-4 py-3 text-sm font-bold text-white"
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={saveToDatabase}
            disabled={isPending || isDeleting || storageMode !== "database"}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-4 text-sm font-bold text-white transition-colors hover:bg-coral disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Save size={16} aria-hidden="true" />
            {isPending ? "Saving..." : "Save to database"}
          </button>
          <button
            type="button"
            onClick={deletePost}
            disabled={isPending || isDeleting}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 text-sm font-bold text-red-100 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Trash2 size={16} aria-hidden="true" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <p className="text-sm font-semibold text-white/46">
            {message || (storageMode === "database" ? "Changes are staged until you save." : "Connect Supabase to enable database saving.")}
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Field
            label="Title TH"
            value={activePost.title.th}
            onChange={(value) => setPost({ title: { ...activePost.title, th: value } })}
          />
          <Field
            label="Title EN"
            value={activePost.title.en}
            onChange={(value) =>
              setPost({
                title: { ...activePost.title, en: value },
                slug: activePost.slug === "new-article" ? makeSlug(value) : activePost.slug
              })
            }
          />
          <Field label="Slug" value={activePost.slug} onChange={(value) => setPost({ slug: makeSlug(value) })} />
          <Field
            label="Category"
            value={activePost.category.en}
            onChange={(value) => setPost({ category: { th: value, en: value } })}
          />
          <div className="lg:col-span-2">
            <Field
              label="Cover image URL"
              value={activePost.coverImageUrl ?? ""}
              onChange={(value) => setPost({ coverImageUrl: value })}
            />
            <p className="mt-2 text-xs font-semibold leading-5 text-white/40">
              Paste an image URL here. It will appear on the latest article card and can be used as the article cover.
            </p>
            {activePost.coverImageUrl ? (
              <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activePost.coverImageUrl} alt="" className="h-full w-full object-cover" />
              </div>
            ) : null}
          </div>
          <Field
            label="Excerpt TH"
            value={activePost.excerpt.th}
            onChange={(value) => setPost({ excerpt: { ...activePost.excerpt, th: value } })}
            multiline
          />
          <Field
            label="Excerpt EN"
            value={activePost.excerpt.en}
            onChange={(value) => setPost({ excerpt: { ...activePost.excerpt, en: value } })}
            multiline
          />
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <MarkdownEditor
            label="Body TH"
            lang="th"
            value={activePost.body.th}
            onChange={(value) => setPost({ body: { ...activePost.body, th: value } })}
          />
          <MarkdownEditor
            label="Body EN"
            lang="en"
            value={activePost.body.en}
            onChange={(value) => setPost({ body: { ...activePost.body, en: value } })}
          />
        </div>
      </div>
    </div>
  );
}

function CourseEditor({
  courses,
  activeCourse,
  onSelect,
  onUpdate,
  onRemove,
  storageMode
}: {
  courses: CmsCourse[];
  activeCourse: CmsCourse;
  onSelect: (id: string) => void;
  onUpdate: (course: CmsCourse) => void;
  onRemove: (id: string) => void;
  storageMode: "local" | "database";
}) {
  const setCourse = (patch: Partial<CmsCourse>) => onUpdate({ ...activeCourse, ...patch, updatedAt: today() });
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();
  const [message, setMessage] = useState("");

  const saveToDatabase = () => {
    setMessage("");
    startTransition(async () => {
      const result = await saveCourseAction(activeCourse);
      setMessage(result.message);

      if (result.ok) {
        onUpdate(result.item);
      }
    });
  };

  const deleteCourse = () => {
    if (!window.confirm(`ลบคอร์ส "${activeCourse.title.th || activeCourse.title.en}"? การลบนี้ย้อนกลับไม่ได้`)) {
      return;
    }

    setMessage("");
    startDeleteTransition(async () => {
      // New, unsaved drafts only exist in memory, so just drop them locally.
      if (activeCourse.id.startsWith("course-")) {
        onRemove(activeCourse.id);
        return;
      }

      const result = await deleteCourseAction(activeCourse.id);
      setMessage(result.message);

      if (result.ok) {
        onRemove(activeCourse.id);
      }
    });
  };

  return (
    <div className="grid gap-5 py-8 xl:grid-cols-[340px_1fr]">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <p className="mb-4 text-sm font-bold text-white/62">Course shelf</p>
        <div className="grid gap-2">
          {courses.map((course) => (
            <button
              key={course.id}
              type="button"
              onClick={() => onSelect(course.id)}
              className={`rounded-xl p-4 text-left transition-colors ${
                course.id === activeCourse.id ? "bg-white text-neutral-950" : "bg-black/22 hover:bg-white/[0.06]"
              }`}
            >
              <span className="block text-sm font-bold">{course.title.en}</span>
              <span className="mt-1 block text-xs font-semibold opacity-60">THB {course.priceThb.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-red-300">Course builder</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-[-0.04em]">{activeCourse.title.en}</h2>
          </div>
          <select
            value={activeCourse.status}
            onChange={(event) => setCourse({ status: event.target.value as PublishStatus })}
            className="rounded-full border border-white/10 bg-black px-4 py-3 text-sm font-bold text-white"
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={saveToDatabase}
            disabled={isPending || isDeleting || storageMode !== "database"}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-4 text-sm font-bold text-white transition-colors hover:bg-coral disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Save size={16} aria-hidden="true" />
            {isPending ? "Saving..." : "Save to database"}
          </button>
          <button
            type="button"
            onClick={deleteCourse}
            disabled={isPending || isDeleting}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 text-sm font-bold text-red-100 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Trash2 size={16} aria-hidden="true" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <p className="text-sm font-semibold text-white/46">
            {message || (storageMode === "database" ? "Changes are staged until you save." : "Connect Supabase to enable database saving.")}
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Field
            label="Course title TH"
            value={activeCourse.title.th}
            onChange={(value) => setCourse({ title: { ...activeCourse.title, th: value } })}
          />
          <Field
            label="Course title EN"
            value={activeCourse.title.en}
            onChange={(value) =>
              setCourse({
                title: { ...activeCourse.title, en: value },
                slug: activeCourse.slug === "new-course" ? makeSlug(value) : activeCourse.slug
              })
            }
          />
          <Field label="Slug" value={activeCourse.slug} onChange={(value) => setCourse({ slug: makeSlug(value) })} />
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/42">Price THB</span>
            <input
              type="number"
              value={activeCourse.priceThb}
              onChange={(event) => setCourse({ priceThb: Number(event.target.value) })}
              className="assessment-field mt-2 w-full rounded-xl border border-white/10 bg-black/28 px-4 py-3 text-sm font-semibold leading-6 text-white outline-none focus:border-red-400/70"
            />
          </label>
          <Field
            label="Description TH"
            value={activeCourse.description.th}
            onChange={(value) => setCourse({ description: { ...activeCourse.description, th: value } })}
            multiline
          />
          <Field
            label="Description EN"
            value={activeCourse.description.en}
            onChange={(value) => setCourse({ description: { ...activeCourse.description, en: value } })}
            multiline
          />
          <Field
            label="Lessons TH"
            value={activeCourse.lessons.th.join("\n")}
            onChange={(value) => setCourse({ lessons: { ...activeCourse.lessons, th: value.split("\n").filter(Boolean) } })}
            multiline
          />
          <Field
            label="Lessons EN"
            value={activeCourse.lessons.en.join("\n")}
            onChange={(value) => setCourse({ lessons: { ...activeCourse.lessons, en: value.split("\n").filter(Boolean) } })}
            multiline
          />
        </div>
      </div>
    </div>
  );
}

function SetupPanel() {
  const doneItems = [
    "Supabase project connected with its URL and publishable key.",
    "Database schema applied (posts, courses, lessons, assessments) with row-level security.",
    "Google sign-in is live and limited to the ADMIN_EMAILS allow-list.",
    "Articles and courses save, publish, and delete directly in Supabase.",
    "Starter content is seeded in the database and fully editable here."
  ];

  const pendingItems = [
    "Set the same environment variables on Vercel and add the production /auth/callback URL.",
    "Create the admin_profiles row for the account you log in with on production.",
    "Add Bunny Stream video ids to lessons when course videos are ready."
  ];

  return (
    <div className="grid gap-5 py-8 xl:grid-cols-[1fr_0.8fr]">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <Database className="text-red-300" size={24} aria-hidden="true" />
        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">Back office status</h2>
        <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-white/62">
          This admin is live on Supabase. Everything you edit here is stored in the database and shared across devices.
        </p>
        <div className="mt-6 grid gap-3">
          {doneItems.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl bg-black/24 p-4">
              <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={18} aria-hidden="true" />
              <p className="text-sm font-semibold leading-6 text-white/76">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/36 p-5">
        <LockKeyhole className="text-white/70" size={24} aria-hidden="true" />
        <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">Access &amp; what is left</h3>
        <p className="mt-3 text-sm font-semibold leading-7 text-white/62">
          /admin is protected by Google sign-in plus an allow-list: only an email in ADMIN_EMAILS with a matching admin_profiles row can open it. These steps remain before the production launch:
        </p>
        <div className="mt-5 grid gap-3">
          {pendingItems.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl bg-black/24 p-4">
              <Target className="mt-0.5 shrink-0 text-red-300" size={18} aria-hidden="true" />
              <p className="text-sm font-semibold leading-6 text-white/76">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AiRolesPanel({ roles }: { roles: Record<string, string> }) {
  return (
    <div className="py-8">
      <div className="flex items-center gap-2">
        <Sparkles className="text-coral" size={24} aria-hidden="true" />
        <h2 className="text-3xl font-semibold tracking-[-0.04em]">บทบาท / น้ำเสียง AI</h2>
      </div>
      <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-white/62">
        กำหนดบุคลิกและน้ำเสียงของ AI แยกตามงาน — แต่ละตัวมี standard ให้แล้ว ปรับเฉพาะที่อยากเปลี่ยน เปลี่ยนได้ทันที ไม่ต้อง deploy
      </p>
      <div className="mt-6 grid gap-4">
        {AI_ROLE_CONTEXTS.map((context) => (
          <AiRoleEditor key={context.key} context={context} value={roles[context.key] ?? context.default} />
        ))}
      </div>
    </div>
  );
}

function AiRoleEditor({ context, value }: { context: AiRoleContext; value: string }) {
  const [role, setRole] = useState(value);
  const [saving, startSave] = useTransition();
  const [status, setStatus] = useState<string | null>(null);

  const save = () => {
    setStatus(null);
    startSave(async () => {
      const result = await saveAiRoleAction(context.key, role);
      setStatus(result.ok ? "บันทึกแล้ว ✓" : result.message ?? "บันทึกไม่สำเร็จ");
    });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center gap-2">
        <Settings2 className="text-coral" size={18} aria-hidden="true" />
        <h3 className="text-lg font-bold tracking-[-0.02em]">{context.label}</h3>
      </div>
      <p className="mt-1 text-xs font-semibold leading-6 text-white/50">{context.description}</p>
      <textarea
        value={role}
        onChange={(event) => setRole(event.target.value)}
        rows={4}
        className="assessment-field mt-3 w-full resize-y rounded-xl border border-white/10 bg-black/28 p-4 text-sm leading-7 text-white outline-none"
      />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-brand px-4 text-sm font-bold text-white transition-colors hover:bg-coral disabled:opacity-50"
        >
          {saving ? "กำลังบันทึก..." : "บันทึก"}
        </button>
        <button
          type="button"
          onClick={() => setRole(context.default)}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          ใช้ค่า standard
        </button>
        {status ? <span className="text-sm font-semibold text-white/72">{status}</span> : null}
      </div>
    </div>
  );
}
