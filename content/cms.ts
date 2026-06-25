import type { Locale } from "@/lib/i18n";

export type PublishStatus = "draft" | "published";

export type CmsPost = {
  id: string;
  slug: string;
  status: PublishStatus;
  category: Record<Locale, string>;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string>;
  readTime: Record<Locale, string>;
  coverImageUrl?: string;
  updatedAt: string;
};

export type CmsCourse = {
  id: string;
  slug: string;
  status: PublishStatus;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  priceThb: number;
  level: Record<Locale, string>;
  lessons: Record<Locale, string[]>;
  updatedAt: string;
};

export const cmsPosts: CmsPost[] = [
  {
    id: "post-ai-hr-evolution-levels",
    slug: "ai-evolution-in-hr",
    status: "published",
    category: { th: "AI for HR", en: "AI for HR" },
    title: {
      th: "5 ระดับของการใช้ AI ในงาน HR",
      en: "The 5 Levels of AI Evolution in HR"
    },
    excerpt: {
      th: "จากผู้ช่วยเขียนงาน ไปสู่เพื่อนร่วมทีมดิจิทัลที่ช่วยให้ HR ทำงานเร็วขึ้น ฉลาดขึ้น และสร้างผลลัพธ์ได้มากขึ้น",
      en: "From writing assistant to digital teammate: how AI can help HR teams work faster, smarter, and at greater scale."
    },
    body: {
      th:
        "ตลอดปีที่ผ่านมา ผมได้ทดลองใช้ AI กับงาน HR Analytics, Workforce Planning, HR Reporting และ HR Transformation หลายรูปแบบ สิ่งหนึ่งที่ชัดขึ้นเรื่อย ๆ คือ AI ไม่ได้เป็นเพียงเครื่องมือเพิ่ม productivity อีกต่อไป แต่กำลังกลายเป็นเพื่อนร่วมทีมดิจิทัลที่ช่วยให้ทีม HR ทำงานเร็วขึ้น ฉลาดขึ้น และขยายผลได้มากขึ้น\n\nระดับที่ 1 คือ Generative Task Execution: ใช้ AI เป็นผู้ช่วยส่วนตัว เช่น ร่างประกาศ สรุปประชุม ทำ presentation แปลภาษา หรือช่วยปรับข้อความทางธุรกิจให้คมขึ้น เครื่องมือกลุ่มนี้ เช่น ChatGPT, Claude, Gemini และ Copilot เหมาะกับงานที่ต้องการความเร็วและคุณภาพของ communication\n\nระดับที่ 2 คือ Domain-Specific AI: ใช้ AI กับความรู้เฉพาะด้าน HR เช่น วิเคราะห์ employee survey, อ่าน exit interview, สร้างคลังความรู้ HR ที่ค้นหาได้ หรือทำ research และ benchmarking เครื่องมืออย่าง NotebookLM, Perplexity และ Vertex AI ช่วยให้ HR ใช้ข้อมูลและความรู้ได้เป็นระบบมากขึ้น\n\nระดับที่ 3 คือ Agentic Workflow Automation: จุดนี้ AI เริ่มขยับจากการช่วยเราทำงาน ไปสู่การทำงานร่วมกับเรา เช่น workflow คัดกรองผู้สมัคร, automated HR reporting, pipeline จาก HRIS ไป dashboard, notification และ approval อัตโนมัติ เครื่องมืออย่าง n8n, Make, Zapier, Manus และ Hermes ทำให้ process ที่เคยทำด้วยมือเริ่มกลายเป็นระบบอัตโนมัติ\n\nระดับที่ 4 คือ Natural Language App Generation: ใช้ AI สร้าง HR application จากภาษาธรรมชาติ โดยไม่ต้องรอรอบ development แบบเดิม ตัวอย่างเช่น Workforce Planning App, HR Analytics Dashboard, Career Path Simulator หรือ Internal HR Service Portal เครื่องมืออย่าง Google AI Studio, Lovable, v0 และ Bolt ทำให้ไอเดียที่เคยใช้เวลาหลายสัปดาห์ กลายเป็น prototype ที่ลองใช้ได้ในไม่กี่ชั่วโมง\n\nระดับที่ 5 คือ Autonomous Software Engineering: ใช้ AI เป็น development partner เช่น เขียนและ review code, debug application, สร้าง data solution หรือเร่งการทำ prototype เครื่องมืออย่าง Claude Code, Codex, Cursor และ Devin ทำให้คนทำงาน HR ที่เข้าใจโจทย์ธุรกิจสามารถทดลองสร้าง solution ได้เร็วขึ้น\n\nสำหรับคนทำงาน HR อนาคตไม่ได้หมายความว่าทุกคนต้องกลายเป็น programmer แต่หมายความว่าเราต้องเข้าใจว่าโจทย์ไหน AI แก้ได้, workflow ใดควรถูกออกแบบใหม่รอบ AI และจะเชื่อม Business, Data และ AI ให้เกิดผลลัพธ์ที่วัดได้อย่างไร\n\nHR ที่มีคุณค่ามากในอีก 3-5 ปีข้างหน้า อาจไม่ใช่คนที่รู้ HR practice มากที่สุดเพียงอย่างเดียว แต่อาจเป็นคนที่ orchestrate คน ข้อมูล และ AI เข้าด้วยกันได้อย่างมีประสิทธิภาพ",
      en:
        "Over the past year, I have been actively experimenting with AI across HR Analytics, Workforce Planning, HR Reporting, and HR Transformation. One thing has become increasingly clear: AI is no longer just a productivity tool. It is becoming a digital teammate that can help HR teams operate faster, smarter, and at greater scale.\n\nLevel 1 is Generative Task Execution: using AI as a personal assistant. This includes drafting announcements, summarizing meetings, creating presentations, translating content, and refining business communication. Tools such as ChatGPT, Claude, Gemini, and Copilot are useful when HR needs speed and quality in everyday communication work.\n\nLevel 2 is Domain-Specific AI: using AI with specialized HR knowledge. This includes analyzing employee survey results, reviewing exit interview feedback, building searchable HR knowledge repositories, and conducting research or benchmarking. Tools such as NotebookLM, Perplexity, and Vertex AI help HR teams work with knowledge in a more structured way.\n\nLevel 3 is Agentic Workflow Automation: using AI to automate HR processes. Candidate screening workflows, automated HR reporting, HRIS-to-dashboard data pipelines, and automated notifications or approvals all belong here. Tools such as n8n, Make, Zapier, Manus, and Hermes mark the shift from AI helping me work to AI working alongside me.\n\nLevel 4 is Natural Language App Generation: using AI to build HR applications without traditional development cycles. Workforce planning apps, HR analytics dashboards, career path simulators, and internal HR service portals can now move from idea to prototype within hours. Tools such as Google AI Studio, Lovable, v0, and Bolt make experimentation much faster.\n\nLevel 5 is Autonomous Software Engineering: using AI as a development partner. This includes writing and reviewing code, debugging applications, building data solutions, and accelerating prototype development. Tools such as Claude Code, Codex, Cursor, and Devin can help HR professionals who understand the business problem test solutions much faster.\n\nFor HR professionals, the future is not about everyone becoming a programmer. It is about understanding which problems AI can solve, how to redesign workflows around AI, and how to combine Business, Data, and AI to create measurable impact.\n\nThe most valuable HR professionals in the next 3-5 years may not be those who know the most HR practices alone. They may be those who can effectively orchestrate people, data, and AI together."
    },
    readTime: { th: "อ่าน 7 นาที", en: "7 min read" },
    updatedAt: "2026-06-18"
  },
  {
    id: "post-learning-engine",
    slug: "building-a-learning-engine",
    status: "published",
    category: { th: "Learning", en: "Learning" },
    title: {
      th: "สร้างเครื่องจักรการเรียนรู้ของตัวเอง",
      en: "Building a Personal Learning Engine"
    },
    excerpt: {
      th: "วิธีเปลี่ยนการอ่าน การทดลอง และการสรุปบทเรียนให้กลายเป็นระบบที่ใช้ซ้ำและต่อยอดได้",
      en: "A practical way to turn reading, experiments, and notes into a system that compounds."
    },
    body: {
      th:
        "บทความนี้เริ่มจากคำถามที่ชัด เก็บหลักฐานจากงานที่ทำ แล้วสรุปเป็นบทเรียนที่นำกลับมาใช้ซ้ำได้\n\nสำหรับ O³ ZONE งานเขียนคือพื้นที่จัดระเบียบความคิดด้าน People Analytics ก่อนเปลี่ยนเป็นบทเรียนและเครื่องมือสำหรับการทำงานจริง",
      en:
        "This article is a working content example: start with a sharper question, capture evidence from real work, and turn it into reusable lessons.\n\nFor this site, writing becomes the testing ground before ideas become structured courses."
    },
    readTime: { th: "อ่าน 6 นาที", en: "6 min read" },
    updatedAt: "2026-06-17"
  },
  {
    id: "post-launch-small",
    slug: "launch-small-teach-well",
    status: "published",
    category: { th: "Courses", en: "Courses" },
    title: {
      th: "เริ่มเล็ก แต่สอนให้ชัด",
      en: "Launch Small, Teach Clearly"
    },
    excerpt: {
      th: "เหตุผลที่คอร์สแรกไม่จำเป็นต้องใหญ่ แต่ต้องมีโจทย์ ผู้เรียน และผลลัพธ์ที่คม",
      en: "Why the first course does not need to be big, but does need a sharp promise and a real learner."
    },
    body: {
      th:
        "คอร์สแรกไม่ควรเริ่มจากการอัดทุกอย่างที่รู้ลงไป แต่ควรเริ่มจากปัญหาหนึ่งข้อที่คนเรียนอยากแก้จริง\n\nเมื่อโจทย์คม การออกแบบบทเรียน ราคา และข้อความขายจะง่ายขึ้นมาก",
      en:
        "A first course should not begin by packing in everything you know. It should begin with one real problem a learner wants solved.\n\nWhen the promise is sharp, the lessons, price, and sales message become much easier to design."
    },
    readTime: { th: "อ่าน 5 นาที", en: "5 min read" },
    updatedAt: "2026-06-17"
  },
  {
    id: "post-consulting-notes",
    slug: "notes-before-consulting",
    status: "draft",
    category: { th: "Consulting", en: "Consulting" },
    title: {
      th: "ก่อนเปิดรับที่ปรึกษา ควรเขียนอะไรไว้บ้าง",
      en: "What to Write Before Offering Consulting"
    },
    excerpt: {
      th: "ใช้บทความเป็นหลักฐานความคิด ทำให้คนเข้าใจวิธีทำงานก่อนจองคุย",
      en: "Use writing as proof of thinking so people understand how you work before they book a call."
    },
    body: {
      th:
        "ก่อนขายงานที่ปรึกษา บทความควรช่วยตอบ 3 เรื่อง: คุณมองปัญหาอย่างไร คุณจัดลำดับความสำคัญแบบไหน และลูกค้าจะได้ผลลัพธ์อะไรจากการคุยกับคุณ",
      en:
        "Before selling consulting, writing should answer three things: how you see the problem, how you prioritize, and what a client can expect after a conversation with you."
    },
    readTime: { th: "อ่าน 4 นาที", en: "4 min read" },
    updatedAt: "2026-06-17"
  }
];

export const cmsCourses: CmsCourse[] = [
  {
    id: "course-people-analytics-foundation",
    slug: "people-analytics-foundation",
    status: "draft",
    title: {
      th: "People Analytics Foundation",
      en: "People Analytics Foundation"
    },
    description: {
      th: "ปูพื้นฐานการตั้งคำถาม วิเคราะห์ข้อมูลคน และสื่อสารอินไซต์ให้ธุรกิจนำไปตัดสินใจได้",
      en: "Build the foundation for asking better workforce questions, analyzing people data, and communicating insight for business decisions."
    },
    priceThb: 2900,
    level: { th: "เริ่มต้นถึงกลาง", en: "Beginner to intermediate" },
    lessons: {
      th: ["ตั้งโจทย์ HR ให้เป็นโจทย์ธุรกิจ", "ออกแบบตัวชี้วัดที่ใช้ตัดสินใจได้", "เล่าอินไซต์จากแดชบอร์ดให้คนเข้าใจ"],
      en: ["Turn HR questions into business questions", "Design decision-ready metrics", "Communicate dashboard insights clearly"]
    },
    updatedAt: "2026-06-17"
  },
  {
    id: "course-ai-hr-transformation",
    slug: "ai-driven-hr-transformation",
    status: "draft",
    title: {
      th: "AI-driven HR Transformation",
      en: "AI-driven HR Transformation"
    },
    description: {
      th: "ออกแบบโจทย์ใช้งาน ขั้นตอนทำงาน และการวัดผล AI ในงาน HR อย่างเป็นระบบ",
      en: "Design HR AI use cases, workflows, and measurement systems with practical structure."
    },
    priceThb: 4900,
    level: { th: "กลาง", en: "Intermediate" },
    lessons: {
      th: ["เลือกโจทย์ใช้ AI ที่คุ้มค่า", "ออกแบบขั้นตอนทำงานระหว่างคนกับ AI", "วัดผลิตภาพและการนำไปใช้จริง"],
      en: ["Choose valuable use cases", "Design human plus AI workflows", "Measure productivity and adoption"]
    },
    updatedAt: "2026-06-17"
  }
];
