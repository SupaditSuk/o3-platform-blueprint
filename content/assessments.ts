import type { Locale } from "@/lib/i18n";

export type AssessmentKey = "hr_health_check" | "workforce_productivity" | "ai_readiness_hr";

export type AssessmentQuestion = {
  id: string;
  category: string;
  text: Record<Locale, string>;
};

export type AssessmentCategory = {
  id: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
};

export type AssessmentRecommendation = {
  service: string;
  body: string;
  steps: string[];
};

export type AssessmentDefinition = {
  type: AssessmentKey;
  slug: string;
  eyebrow: Record<Locale, string>;
  title: Record<Locale, string>;
  body: Record<Locale, string>;
  introTitle: Record<Locale, string>;
  introBody: Record<Locale, string>;
  categories: AssessmentCategory[];
  questions: AssessmentQuestion[];
  recommendations: Record<string, Record<Locale, AssessmentRecommendation>>;
};

export const readinessScale = {
  th: [
    { score: 1, short: "ยังไม่มี", detail: "ยังไม่มีแนวทาง ข้อมูล หรือเจ้าของงานที่ชัดเจน" },
    { score: 2, short: "เริ่มต้น", detail: "มีบางส่วนแล้ว แต่ยังไม่สม่ำเสมอหรือยังพึ่งคนเป็นหลัก" },
    { score: 3, short: "มีพื้นฐาน", detail: "มี process หรือข้อมูลพื้นฐาน ใช้ได้บางกรณี" },
    { score: 4, short: "ใช้งานจริง", detail: "ใช้สม่ำเสมอ มีผู้รับผิดชอบ และเริ่มใช้ตัดสินใจ" },
    { score: 5, short: "เป็นระบบ", detail: "วัดผลได้ เชื่อมกับธุรกิจ และปรับปรุงต่อเนื่อง" }
  ],
  en: [
    { score: 1, short: "Not in place", detail: "No clear process, data, or owner yet." },
    { score: 2, short: "Early", detail: "Some pieces exist, but usage is inconsistent or person-dependent." },
    { score: 3, short: "Basic", detail: "Basic process or data exists and works in some cases." },
    { score: 4, short: "In use", detail: "Used consistently with ownership and decision support." },
    { score: 5, short: "Systematic", detail: "Measured, linked to business, and continuously improved." }
  ]
} satisfies Record<Locale, Array<{ score: number; short: string; detail: string }>>;

const fallbackRecommendation = {
  th: {
    service: "O³ Consulting / 90-day Roadmap",
    body: "ใช้ผลประเมินนี้เลือก 1-2 โจทย์ที่สร้าง impact ได้เร็วที่สุด แล้วออกแบบ quick win, owner, metric และ dashboard เบื้องต้น",
    steps: ["เลือก priority gaps", "กำหนด owner และ metric", "ทำแผน quick win 90 วัน"]
  },
  en: {
    service: "O³ Consulting / 90-day Roadmap",
    body: "Use this result to choose the 1-2 priorities most likely to create near-term impact, then define quick wins, owners, metrics, and a first dashboard.",
    steps: ["Select priority gaps", "Define owners and metrics", "Build a 90-day quick-win plan"]
  }
} satisfies Record<Locale, AssessmentRecommendation>;

export const assessments: AssessmentDefinition[] = [
  {
    type: "hr_health_check",
    slug: "hr-health-check",
    eyebrow: { th: "O³ Assessment", en: "O³ Assessment" },
    title: { th: "HR Health Check", en: "HR Health Check" },
    body: {
      th: "ประเมินสุขภาพระบบ HR ใน 6 มิติ เพื่อเห็นจุดแข็ง จุดเสี่ยง และทิศทาง 90 วันที่ควรเริ่มก่อน",
      en: "Assess HR system health across six dimensions to identify strengths, risks, and the right 90-day focus."
    },
    introTitle: { th: "ใช้เวลาประมาณ 6-8 นาที", en: "Takes around 6-8 minutes" },
    introBody: {
      th: "เหมาะสำหรับ SME, HR leaders และเจ้าของธุรกิจที่อยากรู้ว่า HR ตอนนี้เชื่อมกับ business impact แค่ไหน และควรต่อยอดเป็น workshop, consulting หรือ dashboard อย่างไร",
      en: "Built for SMEs, HR leaders, and business owners who want to understand how well HR connects to business impact and what should become workshop, advisory, or dashboard work next."
    },
    categories: [
      {
        id: "structure",
        title: { th: "Structure & Role Clarity", en: "Structure & Role Clarity" },
        summary: {
          th: "โครงสร้าง บทบาท และความรับผิดชอบชัดพอให้ธุรกิจโตต่อได้หรือไม่",
          en: "Whether structure, roles, and ownership are clear enough for growth."
        }
      },
      {
        id: "workforce",
        title: { th: "Workforce Planning", en: "Workforce Planning" },
        summary: {
          th: "แผนกำลังคนเชื่อมกับแผนธุรกิจ ต้นทุน และ productivity แค่ไหน",
          en: "How workforce planning connects to business goals, cost, and productivity."
        }
      },
      {
        id: "process",
        title: { th: "HR Process", en: "HR Process" },
        summary: {
          th: "กระบวนการ HR ลดงาน manual และช่วยให้ผู้จัดการทำงานง่ายขึ้นหรือไม่",
          en: "Whether HR processes reduce manual work and help managers operate better."
        }
      },
      {
        id: "data",
        title: { th: "Data & Dashboard", en: "Data & Dashboard" },
        summary: {
          th: "ข้อมูล HR พร้อมใช้สำหรับ dashboard และการตัดสินใจของผู้บริหารหรือยัง",
          en: "Whether HR data is ready for dashboards and leadership decisions."
        }
      },
      {
        id: "capability",
        title: { th: "Capability & Leadership", en: "Capability & Leadership" },
        summary: {
          th: "การพัฒนาคน ผู้จัดการ และ leadership เชื่อมกับโจทย์ธุรกิจแค่ไหน",
          en: "How people, manager, and leadership development connects to business needs."
        }
      },
      {
        id: "ai_readiness",
        title: { th: "AI Readiness", en: "AI Readiness" },
        summary: {
          th: "องค์กรมี use case, policy และทักษะเริ่มใช้ AI ในงาน HR หรือยัง",
          en: "Whether HR has use cases, policy, and skills to start using AI in practice."
        }
      }
    ],
    questions: [
      { id: "hr01", category: "structure", text: { th: "โครงสร้างองค์กรและบทบาทสำคัญชัดเจน", en: "Organization structure and key roles are clearly defined." } },
      { id: "hr02", category: "structure", text: { th: "ผู้จัดการเข้าใจบทบาท people management ของตัวเอง", en: "Managers understand their people management responsibilities." } },
      { id: "hr03", category: "structure", text: { th: "มี owner ชัดเจนสำหรับงาน HR ที่กระทบธุรกิจ", en: "Business-critical HR work has clear owners." } },
      { id: "hr04", category: "workforce", text: { th: "มีแผนกำลังคนที่เชื่อมกับแผนธุรกิจ", en: "Workforce plans are connected to business plans." } },
      { id: "hr05", category: "workforce", text: { th: "วิเคราะห์ headcount, cost, OT หรือ turnover อย่างสม่ำเสมอ", en: "Headcount, cost, overtime, or turnover are reviewed regularly." } },
      { id: "hr06", category: "workforce", text: { th: "ใช้ข้อมูล productivity ในการวางแผนคน", en: "Productivity data is used in workforce planning." } },
      { id: "hr07", category: "process", text: { th: "กระบวนการสรรหา onboarding และ performance มีมาตรฐาน", en: "Hiring, onboarding, and performance processes are standardized." } },
      { id: "hr08", category: "process", text: { th: "งาน HR ที่ทำซ้ำถูกลด manual หรือทำให้เป็นระบบ", en: "Repeated HR work is reduced, automated, or systemized." } },
      { id: "hr09", category: "process", text: { th: "HR process ช่วยให้ผู้จัดการตัดสินใจเร็วขึ้น", en: "HR processes help managers make decisions faster." } },
      { id: "hr10", category: "data", text: { th: "HR data ถูกต้อง รวมศูนย์ และหาใช้ได้ง่าย", en: "HR data is accurate, structured, and easy to access." } },
      { id: "hr11", category: "data", text: { th: "มี dashboard หรือ report ที่ผู้บริหารใช้ตัดสินใจจริง", en: "Dashboards or reports are used by leaders for decisions." } },
      { id: "hr12", category: "data", text: { th: "วัด business impact จากงาน HR ได้", en: "HR impact can be measured against business outcomes." } },
      { id: "hr13", category: "capability", text: { th: "มี skill gap analysis ที่เชื่อมกับงานจริง", en: "Skill gaps are analyzed against real work needs." } },
      { id: "hr14", category: "capability", text: { th: "พัฒนาผู้จัดการให้ใช้ข้อมูลและ feedback ได้ดีขึ้น", en: "Managers are developed to use data and feedback better." } },
      { id: "hr15", category: "capability", text: { th: "วัดผล learning หรือ leadership program ได้", en: "Learning or leadership programs have measurable outcomes." } },
      { id: "hr16", category: "ai_readiness", text: { th: "มี HR use case สำหรับทดลองใช้ AI ที่ชัดเจน", en: "HR has clear AI use cases to test." } },
      { id: "hr17", category: "ai_readiness", text: { th: "มีแนวทางการใช้ AI ที่คำนึงถึงข้อมูลและความเสี่ยง", en: "AI usage considers data, privacy, and risk." } },
      { id: "hr18", category: "ai_readiness", text: { th: "ทีม HR มีทักษะ prompt, automation หรือ AI workflow เบื้องต้น", en: "HR has basic prompt, automation, or AI workflow skills." } }
    ],
    recommendations: {
      structure: {
        th: { service: "O³ HR Operating System Lite", body: "เริ่มจาก role clarity, owner และ operating rhythm เพื่อให้ HR ไม่เป็นงานกิจกรรม แต่เป็นระบบที่ผู้จัดการใช้ได้จริง", steps: ["ทบทวนโครงสร้างและบทบาท", "กำหนด owner ของ HR process หลัก", "ออกแบบ HR operating rhythm"] },
        en: { service: "O³ HR Operating System Lite", body: "Start with role clarity, ownership, and operating rhythm so HR becomes a system managers can actually use.", steps: ["Review structure and roles", "Assign owners for core HR processes", "Design the HR operating rhythm"] }
      },
      workforce: {
        th: { service: "O³ Workforce Intelligence Sprint", body: "เชื่อมแผนกำลังคนกับต้นทุน productivity และเป้าหมายธุรกิจ เพื่อให้ผู้บริหารเห็นว่าควรเพิ่มคน ปรับคน หรือลดงานตรงไหน", steps: ["จัดข้อมูล headcount, cost, turnover", "ทำ workforce gap review", "ออกแบบ executive workforce dashboard"] },
        en: { service: "O³ Workforce Intelligence Sprint", body: "Connect workforce plans with cost, productivity, and business goals so leaders can decide where to hire, redeploy, or improve work.", steps: ["Structure headcount, cost, and turnover data", "Run a workforce gap review", "Design an executive workforce dashboard"] }
      },
      process: {
        th: { service: "O³ Consulting / HR Process Sprint", body: "เลือก process ที่กินเวลาหรือกระทบผู้จัดการมากที่สุด แล้วปรับให้วัดผลได้และลด manual work", steps: ["เลือก 1-2 process สำคัญ", "ออกแบบ workflow ใหม่", "กำหนด metric และ owner"] },
        en: { service: "O³ Consulting / HR Process Sprint", body: "Choose the processes that consume time or affect managers most, then redesign them to reduce manual work and become measurable.", steps: ["Pick 1-2 critical processes", "Redesign the workflow", "Define metrics and owners"] }
      },
      data: {
        th: { service: "O³ Intelligence Dashboard Starter", body: "เริ่มจาก data quality และ metric ที่ผู้บริหารต้องใช้จริง ก่อนต่อยอด dashboard และ insight", steps: ["ตรวจ HR data quality", "เลือก executive metrics", "ทำ dashboard starter"] },
        en: { service: "O³ Intelligence Dashboard Starter", body: "Start with data quality and leadership metrics before moving into dashboards and deeper insight.", steps: ["Audit HR data quality", "Select executive metrics", "Build a dashboard starter"] }
      },
      capability: {
        th: { service: "O³ Academy / Capability Workshop", body: "เชื่อม learning, skill gap และ leadership เข้ากับโจทย์ธุรกิจ แล้ววัดผลที่ performance หรือ productivity", steps: ["ทำ skill gap scan", "จัดลำดับ capability สำคัญ", "ออกแบบ learning impact metric"] },
        en: { service: "O³ Academy / Capability Workshop", body: "Connect learning, skill gaps, and leadership development to business needs, then measure performance or productivity impact.", steps: ["Run a skill gap scan", "Prioritize critical capabilities", "Design learning impact metrics"] }
      },
      ai_readiness: {
        th: { service: "O³ AI Readiness for HR", body: "เริ่มจาก use case ที่ลดงานซ้ำหรือสร้าง insight ได้เร็ว พร้อมวาง prompt toolkit และ governance เบื้องต้น", steps: ["เลือก HR AI use case", "ทำ prompt/workflow prototype", "กำหนด AI usage guardrails"] },
        en: { service: "O³ AI Readiness for HR", body: "Start with AI use cases that reduce repetitive work or create fast insight, supported by a prompt toolkit and basic governance.", steps: ["Choose HR AI use cases", "Prototype prompts or workflows", "Define AI usage guardrails"] }
      }
    }
  },
  {
    type: "workforce_productivity",
    slug: "workforce-productivity",
    eyebrow: { th: "O³ Productivity Check", en: "O³ Productivity Check" },
    title: { th: "Workforce Productivity Check", en: "Workforce Productivity Check" },
    body: {
      th: "ประเมินว่างาน คน ต้นทุน และ productivity เชื่อมกันแค่ไหน เพื่อหา quick win สำหรับโรงงาน logistics retail service และทีมที่มี frontline จำนวนมาก",
      en: "Assess how work, people, cost, and productivity connect, built for manufacturing, logistics, retail, service, and frontline-heavy teams."
    },
    introTitle: { th: "เหมาะกับโจทย์ OT สูง คนขาด คนเกิน หรือ productivity ไม่ชัด", en: "Built for overtime, staffing gaps, and unclear productivity signals" },
    introBody: {
      th: "ผลประเมินช่วยเห็นว่าควรเริ่มจาก manpower model, workload, scheduling, dashboard หรือ improvement rhythm ก่อน",
      en: "The result shows whether to start with manpower models, workload, scheduling, dashboards, or improvement rhythm."
    },
    categories: [
      { id: "workload", title: { th: "Workload & Demand", en: "Workload & Demand" }, summary: { th: "เข้าใจ demand และ workload จริงแค่ไหน", en: "How well demand and real workload are understood." } },
      { id: "cost", title: { th: "Cost & Overtime", en: "Cost & Overtime" }, summary: { th: "เห็นต้นทุนคน OT และ cost driver ชัดหรือไม่", en: "Whether people cost, overtime, and cost drivers are visible." } },
      { id: "productivity", title: { th: "Productivity Metrics", en: "Productivity Metrics" }, summary: { th: "มี metric ที่เชื่อมคนกับ output หรือ service level หรือยัง", en: "Whether metrics connect people with output or service levels." } },
      { id: "scheduling", title: { th: "Scheduling & Capacity", en: "Scheduling & Capacity" }, summary: { th: "จัดกำลังคนตาม demand ได้แม่นแค่ไหน", en: "How well staffing capacity matches demand." } },
      { id: "improvement", title: { th: "Improvement Rhythm", en: "Improvement Rhythm" }, summary: { th: "นำ insight ไปปรับงานและติดตามผลต่อเนื่องหรือไม่", en: "Whether insights become continuous work improvement." } }
    ],
    questions: [
      { id: "wp01", category: "workload", text: { th: "มีข้อมูล demand หรือ workload ตามช่วงเวลา", en: "Demand or workload data is available by time period." } },
      { id: "wp02", category: "workload", text: { th: "รู้ว่างานส่วนไหนใช้คนหรือเวลามากที่สุด", en: "The highest people or time consuming work is visible." } },
      { id: "wp03", category: "workload", text: { th: "มีวิธีคาดการณ์ workload ล่วงหน้า", en: "Workload can be forecasted before it happens." } },
      { id: "wp04", category: "cost", text: { th: "วิเคราะห์ workforce cost และ OT อย่างสม่ำเสมอ", en: "Workforce cost and overtime are reviewed regularly." } },
      { id: "wp05", category: "cost", text: { th: "รู้ cost driver ของแต่ละทีม/สาขา/หน่วยงาน", en: "Cost drivers are clear by team, branch, or unit." } },
      { id: "wp06", category: "cost", text: { th: "ใช้ข้อมูลต้นทุนประกอบการวางแผนกำลังคน", en: "Cost data informs workforce planning." } },
      { id: "wp07", category: "productivity", text: { th: "มี productivity metric ที่เชื่อมกับ output จริง", en: "Productivity metrics connect to real output." } },
      { id: "wp08", category: "productivity", text: { th: "เปรียบเทียบ productivity ระหว่างทีม/ช่วงเวลาได้", en: "Productivity can be compared across teams or time periods." } },
      { id: "wp09", category: "productivity", text: { th: "ผู้จัดการใช้ metric เพื่อปรับวิธีทำงาน", en: "Managers use metrics to improve work methods." } },
      { id: "wp10", category: "scheduling", text: { th: "จัด schedule ตาม demand และ capacity ได้", en: "Schedules are planned against demand and capacity." } },
      { id: "wp11", category: "scheduling", text: { th: "เห็นปัญหาคนขาด คนเกิน หรือ skill mismatch เร็ว", en: "Staffing shortages, excess, or skill mismatch are spotted early." } },
      { id: "wp12", category: "scheduling", text: { th: "มีแผนสำรองเมื่อ workload เปลี่ยนเร็ว", en: "Backup plans exist when workload changes quickly." } },
      { id: "wp13", category: "improvement", text: { th: "มี meeting rhythm เพื่อดู productivity และ action", en: "There is a meeting rhythm for productivity and actions." } },
      { id: "wp14", category: "improvement", text: { th: "quick win ถูกติดตามด้วย owner และ metric", en: "Quick wins are tracked with owners and metrics." } },
      { id: "wp15", category: "improvement", text: { th: "ผลลัพธ์ถูกสื่อสารกลับไปยังผู้บริหารและทีม", en: "Results are communicated back to leaders and teams." } }
    ],
    recommendations: {}
  },
  {
    type: "ai_readiness_hr",
    slug: "ai-readiness-hr",
    eyebrow: { th: "O³ AI Readiness", en: "O³ AI Readiness" },
    title: { th: "AI Readiness for HR", en: "AI Readiness for HR" },
    body: {
      th: "ประเมินความพร้อมของทีม HR ในการใช้ AI อย่างเป็นระบบ ตั้งแต่ use case, data, workflow, skill ไปจนถึง governance",
      en: "Assess HR readiness to use AI systematically across use cases, data, workflow, skills, and governance."
    },
    introTitle: { th: "เหมาะกับทีม HR ที่อยากเริ่มใช้ AI ให้เกิดผลจริง", en: "Built for HR teams ready to make AI practical" },
    introBody: {
      th: "ผลลัพธ์ช่วยเลือก use case แรก สร้าง prompt/workflow toolkit และวาง guardrail ก่อนทดลองใช้จริง",
      en: "The result helps choose the first use cases, build prompt or workflow toolkits, and set guardrails before piloting."
    },
    categories: [
      { id: "use_case", title: { th: "Use Case Clarity", en: "Use Case Clarity" }, summary: { th: "รู้ว่า AI ควรแก้โจทย์ HR อะไรก่อน", en: "Whether HR knows which AI use cases should come first." } },
      { id: "data", title: { th: "Data & Knowledge", en: "Data & Knowledge" }, summary: { th: "ข้อมูลและความรู้พร้อมให้ AI ใช้งานหรือยัง", en: "Whether data and knowledge are ready for AI workflows." } },
      { id: "workflow", title: { th: "Workflow Automation", en: "Workflow Automation" }, summary: { th: "เห็น workflow ที่ AI ช่วยลดงานซ้ำได้หรือไม่", en: "Whether AI can reduce repeated work in real workflows." } },
      { id: "skill", title: { th: "Prompt & AI Skill", en: "Prompt & AI Skill" }, summary: { th: "ทีมมีทักษะ prompt, review และใช้งาน AI อย่างมีคุณภาพหรือยัง", en: "Whether the team can prompt, review, and use AI well." } },
      { id: "governance", title: { th: "Governance & Adoption", en: "Governance & Adoption" }, summary: { th: "มีแนวทางความเสี่ยง privacy และ adoption หรือไม่", en: "Whether risk, privacy, and adoption guardrails are in place." } }
    ],
    questions: [
      { id: "ai01", category: "use_case", text: { th: "มี AI use case สำหรับ HR ที่นิยามชัดเจน", en: "HR AI use cases are clearly defined." } },
      { id: "ai02", category: "use_case", text: { th: "เลือก use case จาก pain point และ business impact", en: "Use cases are selected from pain points and business impact." } },
      { id: "ai03", category: "use_case", text: { th: "มีวิธีวัดผลว่า AI ช่วยลดเวลา เพิ่มคุณภาพ หรือสร้าง insight ได้", en: "AI impact can be measured by time saved, quality, or insight created." } },
      { id: "ai04", category: "data", text: { th: "HR data มีคุณภาพพอสำหรับ analysis หรือ AI workflow", en: "HR data quality is sufficient for analysis or AI workflows." } },
      { id: "ai05", category: "data", text: { th: "มีคลัง knowledge, policy หรือ SOP ที่ค้นหาและใช้ต่อได้", en: "Knowledge, policies, or SOPs are searchable and reusable." } },
      { id: "ai06", category: "data", text: { th: "รู้ว่าข้อมูลใดใช้กับ AI ได้และข้อมูลใดต้องระวัง", en: "The team knows which data can be used with AI and which requires caution." } },
      { id: "ai07", category: "workflow", text: { th: "เห็นงาน HR ที่ทำซ้ำและเหมาะกับ automation", en: "Repeated HR work suitable for automation is visible." } },
      { id: "ai08", category: "workflow", text: { th: "เคยทดลองใช้ AI กับ reporting, recruitment, L&D หรือ service work", en: "AI has been tested in reporting, recruitment, L&D, or HR service work." } },
      { id: "ai09", category: "workflow", text: { th: "มี workflow ที่ human review ก่อนนำผล AI ไปใช้", en: "AI workflows include human review before use." } },
      { id: "ai10", category: "skill", text: { th: "ทีม HR เขียน prompt และตรวจคุณภาพคำตอบได้", en: "HR can write prompts and review response quality." } },
      { id: "ai11", category: "skill", text: { th: "มีตัวอย่าง prompt หรือ template ที่ใช้ซ้ำได้", en: "Reusable prompts or templates exist." } },
      { id: "ai12", category: "skill", text: { th: "ทีมเข้าใจข้อจำกัดของ AI เช่น hallucination หรือ bias", en: "The team understands AI limitations such as hallucination or bias." } },
      { id: "ai13", category: "governance", text: { th: "มีแนวทาง privacy และข้อมูลส่วนบุคคลสำหรับ AI", en: "Privacy and personal data guidelines for AI are in place." } },
      { id: "ai14", category: "governance", text: { th: "มี owner และ policy เบื้องต้นสำหรับการใช้ AI ใน HR", en: "Owners and basic policies exist for AI use in HR." } },
      { id: "ai15", category: "governance", text: { th: "มีแผน adoption ให้ทีมใช้ AI อย่างต่อเนื่อง", en: "There is an adoption plan for continued AI use." } }
    ],
    recommendations: {}
  }
].map((assessment) => ({
  ...assessment,
  recommendations:
    Object.keys(assessment.recommendations).length > 0
      ? assessment.recommendations
      : Object.fromEntries(assessment.categories.map((category) => [category.id, fallbackRecommendation]))
})) as AssessmentDefinition[];

export function getAssessmentBySlug(slug: string) {
  return assessments.find((assessment) => assessment.slug === slug);
}

export function getAssessmentByType(type: string) {
  return assessments.find((assessment) => assessment.type === type);
}

export function getAssessmentLevel(score: number, locale: Locale) {
  if (score <= 40) {
    return {
      label: locale === "th" ? "Foundation Gap" : "Foundation Gap",
      body:
        locale === "th"
          ? "ยังมีช่องว่างพื้นฐาน ควรเริ่มจากข้อมูลหลัก กระบวนการสำคัญ และ metric ที่ผู้บริหารใช้ตัดสินใจได้"
          : "Core foundations need attention. Start with essential data, critical processes, and leadership-ready metrics."
    };
  }

  if (score <= 60) {
    return {
      label: locale === "th" ? "Developing" : "Developing",
      body:
        locale === "th"
          ? "มีพื้นฐานหลายส่วนแล้ว แต่ยังต้องเชื่อมข้อมูล process และ owner ให้ทำงานเป็นระบบมากขึ้น"
          : "Several foundations exist, but data, processes, and owners need to work together more systematically."
    };
  }

  if (score <= 80) {
    return {
      label: locale === "th" ? "Strategic" : "Strategic",
      body:
        locale === "th"
          ? "เริ่มเชื่อมกับเป้าหมายธุรกิจได้ดี ขั้นต่อไปคือยกระดับ dashboard, productivity และการวัด impact"
          : "The work connects well to business goals. The next step is stronger dashboards, productivity, and impact measurement."
    };
  }

  return {
    label: locale === "th" ? "Intelligent" : "Intelligent",
    body:
      locale === "th"
        ? "พร้อมต่อยอดสู่ People Intelligence, AI-enabled HR และ dashboard สำหรับการตัดสินใจเชิงธุรกิจ"
        : "Ready to scale toward People Intelligence, AI-enabled HR, and business-facing decision dashboards."
  };
}
