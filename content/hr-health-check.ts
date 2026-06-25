import type { Locale } from "@/lib/i18n";

export type HealthCheckQuestion = {
  id: string;
  category: string;
  text: Record<Locale, string>;
};

export type HealthCheckCategory = {
  id: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
};

export const healthCheckCategories: HealthCheckCategory[] = [
  {
    id: "workforce_planning",
    title: { th: "Workforce Planning", en: "Workforce Planning" },
    summary: {
      th: "แผนกำลังคนเชื่อมกับแผนธุรกิจ ต้นทุน และ productivity แค่ไหน",
      en: "How well workforce planning connects to business goals, cost, and productivity."
    }
  },
  {
    id: "recruitment_onboarding",
    title: { th: "Recruitment & Onboarding", en: "Recruitment & Onboarding" },
    summary: {
      th: "การสรรหาและ onboarding วัดผลคุณภาพคนใหม่ได้หรือยัง",
      en: "Whether hiring and onboarding are measured beyond activity volume."
    }
  },
  {
    id: "performance_productivity",
    title: { th: "Performance & Productivity", en: "Performance & Productivity" },
    summary: {
      th: "ระบบ performance ช่วยยกระดับผลลัพธ์และ productivity จริงหรือไม่",
      en: "Whether performance systems improve team output and productivity."
    }
  },
  {
    id: "learning_talent",
    title: { th: "Learning & Talent Development", en: "Learning & Talent Development" },
    summary: {
      th: "การพัฒนาคนเชื่อมกับ skill gap, leadership และเป้าหมายธุรกิจ",
      en: "How learning connects to skill gaps, leadership, and business needs."
    }
  },
  {
    id: "data_analytics_ai",
    title: { th: "Data, Analytics & AI", en: "Data, Analytics & AI" },
    summary: {
      th: "HR ใช้ข้อมูล dashboard และ AI เพื่อสร้าง insight ให้ผู้บริหารได้แค่ไหน",
      en: "How HR uses data, dashboards, and AI to produce decision insight."
    }
  }
];

export const healthCheckQuestions: HealthCheckQuestion[] = [
  {
    id: "q01",
    category: "workforce_planning",
    text: {
      th: "มีแผนกำลังคนที่เชื่อมกับแผนธุรกิจ",
      en: "Workforce plans are clearly connected to business plans."
    }
  },
  {
    id: "q02",
    category: "workforce_planning",
    text: { th: "วิเคราะห์ Headcount Gap", en: "Headcount gaps are analyzed regularly." }
  },
  {
    id: "q03",
    category: "workforce_planning",
    text: { th: "วิเคราะห์ Workforce Cost", en: "Workforce cost is analyzed and reviewed." }
  },
  {
    id: "q04",
    category: "workforce_planning",
    text: { th: "มีข้อมูล Turnover Forecast", en: "Turnover forecasts are available." }
  },
  {
    id: "q05",
    category: "workforce_planning",
    text: {
      th: "ใช้ข้อมูล Productivity ในการวางแผนคน",
      en: "Productivity data is used in workforce planning."
    }
  },
  {
    id: "q06",
    category: "recruitment_onboarding",
    text: { th: "มีมาตรฐานการสรรหาที่ชัดเจน", en: "Recruitment standards are clearly defined." }
  },
  {
    id: "q07",
    category: "recruitment_onboarding",
    text: { th: "วัด Time to Fill", en: "Time to fill is measured." }
  },
  {
    id: "q08",
    category: "recruitment_onboarding",
    text: { th: "วัด Quality of Hire", en: "Quality of hire is measured." }
  },
  {
    id: "q09",
    category: "recruitment_onboarding",
    text: { th: "มี Onboarding Journey", en: "There is a structured onboarding journey." }
  },
  {
    id: "q10",
    category: "recruitment_onboarding",
    text: { th: "วัดผล New Hire Success", en: "New hire success is measured." }
  },
  {
    id: "q11",
    category: "performance_productivity",
    text: { th: "KPI เชื่อมกับเป้าหมายธุรกิจ", en: "KPIs are linked to business goals." }
  },
  {
    id: "q12",
    category: "performance_productivity",
    text: { th: "มี Performance Review ที่ใช้จริง", en: "Performance reviews are used in practice." }
  },
  {
    id: "q13",
    category: "performance_productivity",
    text: { th: "ผู้จัดการให้ Feedback สม่ำเสมอ", en: "Managers give feedback consistently." }
  },
  {
    id: "q14",
    category: "performance_productivity",
    text: { th: "มีข้อมูล Productivity ระดับทีม", en: "Team-level productivity data is available." }
  },
  {
    id: "q15",
    category: "performance_productivity",
    text: {
      th: "นำข้อมูล Performance ไปปรับปรุงงาน",
      en: "Performance data is used to improve work."
    }
  },
  {
    id: "q16",
    category: "learning_talent",
    text: { th: "มี Skill Gap Analysis", en: "Skill gap analysis is in place." }
  },
  {
    id: "q17",
    category: "learning_talent",
    text: { th: "Training เชื่อมกับ Business Need", en: "Training is linked to business needs." }
  },
  {
    id: "q18",
    category: "learning_talent",
    text: { th: "วัดผลการเรียนรู้", en: "Learning outcomes are measured." }
  },
  {
    id: "q19",
    category: "learning_talent",
    text: { th: "มี Talent/Succession Plan", en: "Talent and succession plans exist." }
  },
  {
    id: "q20",
    category: "learning_talent",
    text: { th: "พัฒนาผู้นำอย่างเป็นระบบ", en: "Leadership is developed systematically." }
  },
  {
    id: "q21",
    category: "data_analytics_ai",
    text: { th: "HR Data ถูกต้องและเป็นระบบ", en: "HR data is accurate and structured." }
  },
  {
    id: "q22",
    category: "data_analytics_ai",
    text: { th: "มี HR Dashboard", en: "HR dashboards are available." }
  },
  {
    id: "q23",
    category: "data_analytics_ai",
    text: { th: "HR ใช้ข้อมูลในการตัดสินใจ", en: "HR uses data in decision making." }
  },
  {
    id: "q24",
    category: "data_analytics_ai",
    text: { th: "มีการทดลองใช้ AI ในงาน HR", en: "AI has been tested in HR work." }
  },
  {
    id: "q25",
    category: "data_analytics_ai",
    text: {
      th: "HR วิเคราะห์ Insight ให้ผู้บริหารได้",
      en: "HR can provide insights for executives."
    }
  }
];

export function getHealthLevel(score: number, locale: Locale) {
  if (score <= 40) {
    return {
      label: locale === "th" ? "Foundation Gap" : "Foundation Gap",
      body:
        locale === "th"
          ? "ระบบ HR ยังมีช่องว่างพื้นฐาน ควรเริ่มจากข้อมูลหลัก กระบวนการสำคัญ และการวัดผลที่ผู้บริหารใช้ได้"
          : "Core HR foundations need attention. Start with essential data, critical processes, and leadership-ready metrics."
    };
  }

  if (score <= 60) {
    return {
      label: locale === "th" ? "Developing HR" : "Developing HR",
      body:
        locale === "th"
          ? "มีพื้นฐานหลายส่วนแล้ว แต่ยังต้องเชื่อมข้อมูล กระบวนการ และบทบาท HR ให้ทำงานเป็นระบบมากขึ้น"
          : "Several foundations exist, but data, processes, and HR roles need to work together more systematically."
    };
  }

  if (score <= 80) {
    return {
      label: locale === "th" ? "Strategic HR" : "Strategic HR",
      body:
        locale === "th"
          ? "HR เริ่มเชื่อมกับเป้าหมายธุรกิจได้ดี ขั้นต่อไปคือยกระดับ analytics, productivity และการวัด impact"
          : "HR is connecting well to business goals. The next step is stronger analytics, productivity, and impact measurement."
    };
  }

  return {
    label: locale === "th" ? "Intelligent HR" : "Intelligent HR",
    body:
      locale === "th"
        ? "องค์กรมีระบบ HR ที่พร้อมต่อยอดสู่ People Intelligence, AI insight และ dashboard สำหรับการตัดสินใจเชิงธุรกิจ"
        : "The organization is ready to scale toward People Intelligence, AI insight, and business-facing dashboards."
  };
}
