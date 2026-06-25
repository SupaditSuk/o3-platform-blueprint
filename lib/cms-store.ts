import type { SupabaseClient } from "@supabase/supabase-js";
import type { CmsCourse, CmsPost, PublishStatus } from "@/content/cms";
import { cmsCourses, cmsPosts } from "@/content/cms";

type PostRow = {
  id: string;
  slug: string;
  status: PublishStatus;
  title_th: string;
  title_en: string;
  excerpt_th: string;
  excerpt_en: string;
  body_th: string;
  body_en: string;
  category_th: string;
  category_en: string;
  read_time_th: string;
  read_time_en: string;
  cover_image_url: string | null;
  updated_at: string;
};

type CourseRow = {
  id: string;
  slug: string;
  status: PublishStatus;
  title_th: string;
  title_en: string;
  description_th: string;
  description_en: string;
  level_th: string;
  level_en: string;
  price_thb: number;
  updated_at: string;
  lessons?: LessonRow[];
};

type LessonRow = {
  title_th: string;
  title_en: string;
  sort_order: number;
};

type AssessmentRow = {
  id: string;
  assessment_type: string;
  locale: "th" | "en";
  email: string;
  full_name: string | null;
  company_name: string;
  role: string;
  company_size: string;
  industry: string | null;
  main_challenge: string | null;
  overall_score: number;
  maturity_level: string;
  category_scores: unknown;
  answers: unknown;
  source: string;
  created_at: string;
};

export type AssessmentSubmission = {
  id: string;
  assessmentType: string;
  locale: "th" | "en";
  email: string;
  fullName?: string;
  companyName: string;
  role: string;
  companySize: string;
  industry?: string;
  mainChallenge?: string;
  overallScore: number;
  maturityLevel: string;
  categoryScores: Record<string, number>;
  answers: Record<string, number>;
  source: string;
  createdAt: string;
};

function numberRecord(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, typeof item === "number" ? item : Number(item) || 0])
  );
}

export function postFromRow(row: PostRow): CmsPost {
  return {
    id: row.id,
    slug: row.slug,
    status: row.status,
    category: { th: row.category_th, en: row.category_en },
    title: { th: row.title_th, en: row.title_en },
    excerpt: { th: row.excerpt_th, en: row.excerpt_en },
    body: { th: row.body_th, en: row.body_en },
    readTime: { th: row.read_time_th, en: row.read_time_en },
    coverImageUrl: row.cover_image_url ?? undefined,
    updatedAt: row.updated_at.slice(0, 10)
  };
}

export function courseFromRow(row: CourseRow): CmsCourse {
  const sortedLessons = [...(row.lessons ?? [])].sort((a, b) => a.sort_order - b.sort_order);

  return {
    id: row.id,
    slug: row.slug,
    status: row.status,
    title: { th: row.title_th, en: row.title_en },
    description: { th: row.description_th, en: row.description_en },
    level: { th: row.level_th, en: row.level_en },
    priceThb: row.price_thb,
    lessons: {
      th: sortedLessons.map((lesson) => lesson.title_th),
      en: sortedLessons.map((lesson) => lesson.title_en)
    },
    updatedAt: row.updated_at.slice(0, 10)
  };
}

export function assessmentFromRow(row: AssessmentRow): AssessmentSubmission {
  return {
    id: row.id,
    assessmentType: row.assessment_type,
    locale: row.locale,
    email: row.email,
    fullName: row.full_name ?? undefined,
    companyName: row.company_name,
    role: row.role,
    companySize: row.company_size,
    industry: row.industry ?? undefined,
    mainChallenge: row.main_challenge ?? undefined,
    overallScore: row.overall_score,
    maturityLevel: row.maturity_level,
    categoryScores: numberRecord(row.category_scores),
    answers: numberRecord(row.answers),
    source: row.source,
    createdAt: row.created_at
  };
}

export function postToRow(post: CmsPost) {
  return {
    slug: post.slug,
    status: post.status,
    title_th: post.title.th,
    title_en: post.title.en,
    excerpt_th: post.excerpt.th,
    excerpt_en: post.excerpt.en,
    body_th: post.body.th,
    body_en: post.body.en,
    category_th: post.category.th,
    category_en: post.category.en,
    read_time_th: post.readTime.th,
    read_time_en: post.readTime.en,
    cover_image_url: post.coverImageUrl || null,
    published_at: post.status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString()
  };
}

export function courseToRow(course: CmsCourse) {
  return {
    slug: course.slug,
    status: course.status,
    title_th: course.title.th,
    title_en: course.title.en,
    description_th: course.description.th,
    description_en: course.description.en,
    level_th: course.level.th,
    level_en: course.level.en,
    price_thb: course.priceThb,
    updated_at: new Date().toISOString()
  };
}

export async function loadCmsContent(supabase: SupabaseClient | null) {
  // Admin reads the real database only. Empty database means empty admin,
  // never the static seed, so the studio always reflects what is persisted.
  if (!supabase) {
    return {
      posts: [] as CmsPost[],
      courses: [] as CmsCourse[],
      source: "empty" as const
    };
  }

  const [postsResult, coursesResult] = await Promise.all([
    supabase.from("posts").select("*").order("updated_at", { ascending: false }),
    supabase
      .from("courses")
      .select("*, lessons(title_th,title_en,sort_order)")
      .order("updated_at", { ascending: false })
  ]);

  return {
    posts: ((postsResult.data as PostRow[] | null) ?? []).map(postFromRow),
    courses: ((coursesResult.data as CourseRow[] | null) ?? []).map(courseFromRow),
    source: "database" as const
  };
}

export async function loadAssessmentSubmissions(supabase: SupabaseClient | null) {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("assessment_submissions")
    .select(
      "id,assessment_type,locale,email,full_name,company_name,role,company_size,industry,main_challenge,overall_score,maturity_level,category_scores,answers,source,created_at"
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (error || !data?.length) {
    return [];
  }

  return (data as AssessmentRow[]).map(assessmentFromRow);
}

export async function loadMyAssessmentSubmissions(supabase: SupabaseClient | null, userId: string) {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("assessment_submissions")
    .select(
      "id,assessment_type,locale,email,full_name,company_name,role,company_size,industry,main_challenge,overall_score,maturity_level,category_scores,answers,source,created_at"
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error || !data?.length) {
    return [];
  }

  return (data as AssessmentRow[]).map(assessmentFromRow);
}

export async function loadMyInterestSignups(supabase: SupabaseClient | null, userId: string) {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("interest_signups")
    .select("id,interest,company_name,source,created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error || !data) {
    return [];
  }

  return data as Array<{
    id: string;
    interest: string;
    company_name: string | null;
    source: string;
    created_at: string;
  }>;
}

export async function loadPublishedPosts(supabase: SupabaseClient | null) {
  if (!supabase) {
    return cmsPosts.filter((post) => post.status === "published");
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error || !data?.length) {
    return cmsPosts.filter((post) => post.status === "published");
  }

  return (data as PostRow[]).map(postFromRow);
}

export async function loadPublishedPost(supabase: SupabaseClient | null, slug: string) {
  if (!supabase) {
    return cmsPosts.find((post) => post.slug === slug && post.status === "published") ?? null;
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) {
    return cmsPosts.find((post) => post.slug === slug && post.status === "published") ?? null;
  }

  return postFromRow(data as PostRow);
}

export async function loadPublishedCourses(supabase: SupabaseClient | null) {
  if (!supabase) {
    return cmsCourses;
  }

  const { data, error } = await supabase
    .from("courses")
    .select("*, lessons(title_th,title_en,sort_order)")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    return cmsCourses;
  }

  return (data as CourseRow[]).map(courseFromRow);
}

export async function loadPublishedCourse(supabase: SupabaseClient | null, slug: string) {
  if (!supabase) {
    return cmsCourses.find((course) => course.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("courses")
    .select("*, lessons(title_th,title_en,sort_order)")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) {
    return cmsCourses.find((course) => course.slug === slug) ?? null;
  }

  return courseFromRow(data as CourseRow);
}

export type LearningLesson = {
  id: string;
  title: { th: string; en: string };
  body: { th: string; en: string };
  videoUrl?: string;
};

export type LearningCourse = {
  id: string;
  slug: string;
  title: { th: string; en: string };
  description: { th: string; en: string };
  level: { th: string; en: string };
  lessons: LearningLesson[];
};

type LearningLessonRow = {
  id: string;
  title_th: string;
  title_en: string;
  body_th: string;
  body_en: string;
  video_url: string | null;
  sort_order: number;
};

export async function loadCourseForLearning(supabase: SupabaseClient | null, slug: string): Promise<LearningCourse | null> {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("courses")
    .select(
      "id,slug,title_th,title_en,description_th,description_en,level_th,level_en,lessons(id,title_th,title_en,body_th,body_en,video_url,sort_order)"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const row = data as {
    id: string;
    slug: string;
    title_th: string;
    title_en: string;
    description_th: string;
    description_en: string;
    level_th: string;
    level_en: string;
    lessons?: LearningLessonRow[];
  };

  const lessons = [...(row.lessons ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((lesson) => ({
      id: lesson.id,
      title: { th: lesson.title_th, en: lesson.title_en },
      body: { th: lesson.body_th, en: lesson.body_en },
      videoUrl: lesson.video_url ?? undefined
    }));

  return {
    id: row.id,
    slug: row.slug,
    title: { th: row.title_th, en: row.title_en },
    description: { th: row.description_th, en: row.description_en },
    level: { th: row.level_th, en: row.level_en },
    lessons
  };
}

export async function loadCompletedLessonIds(supabase: SupabaseClient | null, userId: string): Promise<string[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("lesson_progress").select("lesson_id").eq("user_id", userId);

  if (error || !data) {
    return [];
  }

  return data.map((row) => (row as { lesson_id: string }).lesson_id);
}

export type CourseProgressRow = {
  id: string;
  slug: string;
  title: { th: string; en: string };
  level: { th: string; en: string };
  priceThb: number;
  lessonIds: string[];
};

export async function loadCoursesWithLessonIds(supabase: SupabaseClient | null): Promise<CourseProgressRow[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("courses")
    .select("id,slug,title_th,title_en,level_th,level_en,price_thb,lessons(id)")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return (data as Array<{
    id: string;
    slug: string;
    title_th: string;
    title_en: string;
    level_th: string;
    level_en: string;
    price_thb: number;
    lessons?: Array<{ id: string }>;
  }>).map((course) => ({
    id: course.id,
    slug: course.slug,
    title: { th: course.title_th, en: course.title_en },
    level: { th: course.level_th, en: course.level_en },
    priceThb: course.price_thb,
    lessonIds: (course.lessons ?? []).map((lesson) => lesson.id)
  }));
}

export async function savePost(supabase: SupabaseClient, post: CmsPost) {
  const { data, error } = await supabase
    .from("posts")
    .upsert(postToRow(post), { onConflict: "slug" })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return postFromRow(data as PostRow);
}

export async function saveCourse(supabase: SupabaseClient, course: CmsCourse) {
  const { data, error } = await supabase
    .from("courses")
    .upsert(courseToRow(course), { onConflict: "slug" })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const courseId = (data as CourseRow).id;
  const lessonRows = course.lessons.th.map((titleTh, index) => ({
    course_id: courseId,
    sort_order: index,
    title_th: titleTh,
    title_en: course.lessons.en[index] ?? titleTh,
    status: course.status
  }));

  const deleteResult = await supabase.from("lessons").delete().eq("course_id", courseId);

  if (deleteResult.error) {
    throw new Error(deleteResult.error.message);
  }

  if (lessonRows.length > 0) {
    const insertResult = await supabase.from("lessons").insert(lessonRows);

    if (insertResult.error) {
      throw new Error(insertResult.error.message);
    }
  }

  return {
    ...courseFromRow(data as CourseRow),
    lessons: course.lessons
  };
}

export async function deletePost(supabase: SupabaseClient, id: string) {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteCourse(supabase: SupabaseClient, id: string) {
  // Lessons are removed automatically through the course_id cascade.
  const { error } = await supabase.from("courses").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
