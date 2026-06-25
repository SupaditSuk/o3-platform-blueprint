import type { Locale } from "@/lib/i18n";
import { cmsPosts } from "@/content/cms";

export type Article = {
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  tag: Record<Locale, string>;
  readTime: Record<Locale, string>;
  coverImageUrl?: string;
};

export const articles: Article[] = cmsPosts
  .filter((post) => post.status === "published")
  .map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    tag: post.category,
    readTime: post.readTime,
    coverImageUrl: post.coverImageUrl
  }));

export const copy = {
  th: {
    nav: {
      home: "หน้าหลัก",
      writing: "บทความ",
      about: "โปรไฟล์",
      courses: "บริการ",
      pricing: "ราคา",
      learn: "ทดลองเรียน",
      contact: "ติดต่อ",
      availability: "Workforce Intelligence สำหรับองค์กรไทย",
      cta: "เริ่ม Assessment",
      signIn: "เข้าสู่ระบบ",
      dashboard: "บัญชีของฉัน",
      menu: "เมนู",
      close: "ปิด"
    },
    hero: {
      eyebrow: "AI Workforce Platform",
      titleLines: ["เลิกจมกับกอง Excel", "เปลี่ยนข้อมูล HR", "เป็นกลยุทธ์ด้วย AI"],
      subtitle:
        "แพลตฟอร์มวิเคราะห์ข้อมูลบุคลากร (People Analytics) ช่วยเปลี่ยนข้อมูลดิบเป็น Dashboard สำเร็จรูป คาดการณ์ความเสี่ยงคนลาออก และวัดผล Productivity ได้ทันที โดยไม่ต้องขึ้นระบบใหม่ให้ซับซ้อน",
      primaryCta: "เริ่ม HR Health Check ฟรี",
      secondaryCta: "ดูโซลูชันทั้งหมด",
      smallNote:
        "เหมาะสำหรับองค์กรที่ยังใช้ Excel หลายไฟล์ ไม่มีระบบ Data Analytics เต็มตัว หรืออยากเริ่มใช้ AI แบบจับต้องได้จริง",
      snapshot: {
        label: "Workforce Health Snapshot",
        pill: "Demo Dashboard",
        metrics: [
          { value: "68%", label: "HR Health Score", width: 68 },
          { value: "24%", label: "Turnover Risk", width: 24 },
          { value: "4.2", label: "OT per FTE", width: 52 },
          { value: "12", label: "Priority Actions", width: 75 }
        ],
        insightTitle: "AI Insight",
        insightBody:
          "ฝ่ายขายมี Turnover สูงกว่าค่าเฉลี่ย และ OT เพิ่มต่อเนื่อง แนะนำตรวจ Exit Reason, Manager Load และ Commission Structure ภายใน 30 วัน"
      }
    },
    problems: {
      kicker: "เริ่มจากปัญหาจริงของธุรกิจ",
      title: "ตอบคำถามสำคัญขององค์กร\nที่รายงาน HR ทั่วไปให้ไม่ได้",
      sub: "คุณไม่จำเป็นต้องเข้าใจศัพท์ People Analytics ขั้นสูง แค่กำลังเผชิญกับสัญญาณเตือนเหล่านี้ในทีม",
      items: [
        {
          title: "เดาใจคนไม่ออก รู้ตัวอีกทีก็ลาออก",
          body: "เห็นสถิติคนออกตอนที่สายไปแล้ว แต่ไม่เคยรู้ Pattern ล่วงหน้าว่าเกิดจากแผนกไหน อายุงานเท่าไหร่ หรือหัวหน้างานกลุ่มใด"
        },
        {
          title: "หมดเวลาไปกับ Manual Report",
          body: "สิ้นเดือนทีไรต้องงมกับการรวมไฟล์ Excel ทำกราฟวนไป จนไม่มีเวลาวิเคราะห์เพื่อเสนอผู้บริหารว่าควรแก้ปัญหาอย่างไร"
        },
        {
          title: "มี AI แต่ใช้ไม่เกิดประโยชน์จริง",
          body: "อยากนำ AI มาช่วยงาน แต่ยังนึกภาพไม่ออกว่าจะนำมาประยุกต์กับการวิเคราะห์ข้อมูลคน โครงสร้างเงินเดือน หรือแบบสำรวจองค์กรอย่างไร"
        }
      ]
    },
    howItWorks: {
      kicker: "วิธีที่ O³ ช่วยคุณ",
      title: "จากแบบประเมินฟรี สู่ Dashboard และ AI Tools ที่พร้อมใช้งาน",
      steps: [
        { title: "Check", body: "เริ่มต้นด้วย HR Health Check หรือ Productivity Check ฟรีเพื่อหาจุดวิกฤต" },
        { title: "See", body: "ระบบสรุปคะแนน ความเสี่ยง Insight และ Priority Actions แบบเข้าใจง่ายในหน้าเดียว" },
        { title: "Act", body: "ใช้ AI Studio ช่วยสร้างแผนงาน แนะนำแนวทางแก้ไข และร่างเอกสาร HR ได้ทันที" },
        { title: "Grow", body: "ขยายผลสู่ Dashboard เต็มรูปแบบ ระบบ Survey และบริการ Consulting เมื่อองค์กรพร้อม" }
      ]
    },
    products: {
      kicker: "Product Ecosystem",
      title: "เลือกใช้ตามโจทย์ขององค์กร ไม่ต้องจ่ายเหมาทั้งระบบ",
      sub: "ปลดล็อกศักยภาพงานบริหารคนตามระดับความพร้อมและงบประมาณของคุณ",
      items: [
        {
          tag: "เริ่มฟรี",
          title: "O³ Assessment",
          body: "แบบประเมินตรวจสุขภาพองค์กร ค้นหาจุด Pain Point ที่ต้องแก้ไขเร่งด่วน พร้อมคำแนะนำจากผู้เชี่ยวชาญ",
          points: ["เหมาะสำหรับ: องค์กรที่ต้องการเข็มทิศหาจุดวิกฤต", "ผลลัพธ์ที่ได้: Score, Risk Profile, Priority Actions"],
          href: "assessment/hr-health-check",
          cta: "เริ่มประเมินฟรี"
        },
        {
          tag: "Dashboard",
          title: "Workforce Intelligence",
          body: "เปลี่ยนข้อมูล Excel กระจัดกระจาย ให้เป็น Executive Dashboard รายงานผู้บริหารได้ในคลิกเดียว ครอบคลุม Turnover, OT และ Productivity",
          points: ["เหมาะสำหรับ: HR ที่ต้องการยกระดับเป็น Strategic Partner", "ผลลัพธ์ที่ได้: Live Dashboard + Executive Insight"],
          href: "workforce",
          cta: "ลอง Dashboard ฟรี"
        },
        {
          tag: "AI Tools",
          title: "Workforce AI Studio",
          body: "ปลดล็อกงานเอกสารจำเจด้วย AI Co-pilot ที่เข้าใจบริบทงาน HR ช่วยร่าง JD, คัดกรอง CV, ออกแบบโครงสร้างประเมินผล และ Merit & Bonus",
          points: ["เหมาะสำหรับ: ทีม HR ยุคใหม่ที่ต้องการเพิ่ม Productivity", "ผลลัพธ์ที่ได้: Automated Draft, Data Analysis, AI Advice"],
          href: "services#products",
          cta: "ดูเครื่องมือ"
        },
        {
          tag: "บริการเชิงลึก",
          title: "Consulting & Academy",
          body: "Workshop, Training และ Project Consulting โดยผู้เชี่ยวชาญ เพื่อวาง Roadmap การปรับเปลี่ยนองค์กรด้วยข้อมูลและ AI",
          points: ["เหมาะสำหรับ: องค์กรที่ต้องการ Implementation Plan จริงจัง", "ผลลัพธ์ที่ได้: Data Strategy + Custom Transformation Roadmap"],
          href: "services#consulting",
          cta: "ดูบริการที่ปรึกษา"
        }
      ]
    },
    proof: {
      items: [
        { value: "80%", body: "ลดเวลาทำ Report แล้วเอาเวลาไปดูแลคนและวางกลยุทธ์เชิงรุก" },
        { value: "15 นาที", body: "ปลั๊กข้อมูลพื้นฐานปุ๊บ เห็นภาพรวม Workforce Snapshot ขององค์กรทันที" },
        { value: "0 บาท", body: "เริ่มต้นประเมินฟรี ไม่มีข้อผูกมัด เพื่อรู้จุดที่ต้องแก้ไขเร่งด่วนที่สุด" }
      ]
    },
    pricingTeaser: {
      kicker: "Pricing Plans",
      title: "เริ่มต้นจากจุดเล็ก ๆ แล้วขยายเมื่อเห็นผลลัพธ์",
      tiers: [
        {
          name: "Free",
          price: "฿0",
          body: "Assessment ตรวจสุขภาพองค์กรฟรี + รายงานการวิเคราะห์เบื้องต้นเพื่อหา Pain Point",
          cta: "เริ่มฟรีวันนี้",
          href: "workforce"
        },
        {
          name: "Starter",
          price: "฿1,990",
          period: "/เดือน",
          body: "คุ้มค่าสำหรับทีมเริ่มต้น: ได้ทั้ง Dashboard Template และ AI Co-pilot เพื่อขับเคลื่อนด้วยข้อมูล",
          cta: "เริ่มใช้งานเลย",
          href: "contact?interest=plan_starter",
          popular: true
        },
        {
          name: "Enterprise",
          price: "คุยกับทีม",
          body: "วิเคราะห์ข้อมูลเชิงลึกแบบหลายมิติ, ระบบ Voice of Employee พร้อมทีมที่ปรึกษาดูแล",
          cta: "นัดหมาย Demo",
          href: "contact?interest=plan_enterprise"
        }
      ],
      allPlansCta: "ดูแพ็กเกจทั้งหมด",
      allPlansHref: "pricing"
    },
    finalCta: {
      kicker: "Get Started",
      title: "ไม่ต้องลงทุนระบบใหญ่ราคาแพง\nเริ่มจากรู้จุดที่ต้องแก้ไขก่อนวันนี้",
      body: "ทำ HR Health Check ฟรี เพื่อรับ Snapshot รายงานสุขภาพองค์กร พร้อมคำแนะนำแนวทางที่คุ้มค่าที่สุด",
      cta: "ตรวจสุขภาพองค์กรฟรี"
    },
    footer: "O³ ZONE Intelligence: Workforce Intelligence & AI-enabled HR"
  },
  en: {
    nav: {
      home: "Home",
      writing: "Insights",
      about: "Profile",
      courses: "Services",
      pricing: "Pricing",
      contact: "Contact",
      learn: "Learning Lab",
      availability: "Workforce Intelligence for Thai organizations",
      cta: "Start Assessment",
      signIn: "Sign in",
      dashboard: "My account",
      menu: "Menu",
      close: "Close"
    },
    hero: {
      eyebrow: "AI Workforce Platform",
      titleLines: ["Stop drowning in Excel", "Turn HR data into", "strategy with AI"],
      subtitle:
        "A people analytics platform that turns raw data into ready-made dashboards, predicts turnover risk, and tracks productivity instantly — without rolling out a complex new system.",
      primaryCta: "Start the free HR Health Check",
      secondaryCta: "See all solutions",
      smallNote:
        "Built for organizations still juggling multiple Excel files, with no full data analytics system, or just starting to use AI in a practical way.",
      snapshot: {
        label: "Workforce Health Snapshot",
        pill: "Demo Dashboard",
        metrics: [
          { value: "68%", label: "HR Health Score", width: 68 },
          { value: "24%", label: "Turnover Risk", width: 24 },
          { value: "4.2", label: "OT per FTE", width: 52 },
          { value: "12", label: "Priority Actions", width: 75 }
        ],
        insightTitle: "AI Insight",
        insightBody:
          "Sales has higher turnover than average and OT keeps climbing. Review exit reasons, manager load, and commission structure within 30 days."
      }
    },
    problems: {
      kicker: "Starting from real business problems",
      title: "Answer the questions that matter\nthat a generic HR report can't",
      sub: "You don't need to understand advanced People Analytics terms — just recognize these warning signs already happening in your team.",
      items: [
        {
          title: "People quit before you see it coming",
          body: "You only see the turnover stats once it's too late — never the pattern by department, tenure, or which managers it clusters around."
        },
        {
          title: "Manual reports eat your month",
          body: "Every month-end you're stuck merging Excel files and building charts by hand, with no time left to figure out what leadership should actually do."
        },
        {
          title: "You have AI, but it's not actually helping",
          body: "You want to put AI to work, but can't quite picture how it applies to people analytics, salary structures, or employee surveys."
        }
      ]
    },
    howItWorks: {
      kicker: "How O³ helps you",
      title: "From a free assessment to a dashboard and AI tools ready to use",
      steps: [
        { title: "Check", body: "Start with a free HR Health Check or Productivity Check to find the critical issues." },
        { title: "See", body: "The system summarizes your score, risk, insights, and priority actions on a single, easy screen." },
        { title: "Act", body: "Use AI Studio to build action plans, get recommendations, and draft HR documents instantly." },
        { title: "Grow", body: "Scale up to a full dashboard, surveys, and consulting once your organization is ready." }
      ]
    },
    products: {
      kicker: "Product Ecosystem",
      title: "Pick what fits your organization — no need to buy the whole system",
      sub: "Unlock the people-management capability that fits your readiness and budget.",
      items: [
        {
          tag: "Start free",
          title: "O³ Assessment",
          body: "An organizational health check that surfaces the pain points you need to fix first, with expert recommendations.",
          points: ["Best for: organizations that need a compass to find critical issues", "Output: score, risk profile, priority actions"],
          href: "assessment/hr-health-check",
          cta: "Start the free assessment"
        },
        {
          tag: "Dashboard",
          title: "Workforce Intelligence",
          body: "Turn scattered Excel data into an executive dashboard your leadership can read in one click — covering turnover, OT, and productivity.",
          points: ["Best for: HR teams ready to become a strategic partner", "Output: live dashboard + executive insight"],
          href: "workforce",
          cta: "Try the dashboard free"
        },
        {
          tag: "AI Tools",
          title: "Workforce AI Studio",
          body: "Unblock repetitive paperwork with an AI co-pilot that understands HR context — drafting JDs, screening CVs, and shaping pay structures and merit & bonus.",
          points: ["Best for: modern HR teams looking to boost productivity", "Output: automated drafts, data analysis, AI advice"],
          href: "services#products",
          cta: "See the tools"
        },
        {
          tag: "Deeper services",
          title: "Consulting & Academy",
          body: "Workshops, training, and expert-led project consulting to plan your organization's data and AI transformation roadmap.",
          points: ["Best for: organizations that need a serious implementation plan", "Output: data strategy + custom transformation roadmap"],
          href: "services#consulting",
          cta: "See consulting"
        }
      ]
    },
    proof: {
      items: [
        { value: "80%", body: "less time on reporting, freeing you up to manage people and plan proactively." },
        { value: "15 min", body: "to plug in your basic data and see your organization's full Workforce Snapshot." },
        { value: "฿0", body: "to start a free assessment, no strings attached, and find your most urgent fix." }
      ]
    },
    pricingTeaser: {
      kicker: "Pricing Plans",
      title: "Start small, then scale once you see the results",
      tiers: [
        {
          name: "Free",
          price: "฿0",
          body: "A free organizational health check plus an initial analysis report to find your pain points.",
          cta: "Start free today",
          href: "workforce"
        },
        {
          name: "Starter",
          price: "฿1,990",
          period: "/mo",
          body: "Great value for teams getting started: dashboard templates plus an AI co-pilot to run on data.",
          cta: "Get started now",
          href: "contact?interest=plan_starter",
          popular: true
        },
        {
          name: "Enterprise",
          price: "Talk to us",
          body: "Multi-dimensional deep-dive analysis and a Voice of Employee system, backed by a dedicated consulting team.",
          cta: "Book a demo",
          href: "contact?interest=plan_enterprise"
        }
      ],
      allPlansCta: "See all plans",
      allPlansHref: "pricing"
    },
    finalCta: {
      kicker: "Get Started",
      title: "Skip the expensive big system\nstart by knowing what to fix first",
      body: "Take the free HR Health Check to get an organizational health snapshot, plus a recommendation on the most cost-effective next step.",
      cta: "Start the free assessment"
    },
    footer: "O³ ZONE Intelligence: Workforce Intelligence & AI-enabled HR"
  }
} satisfies Record<Locale, Record<string, unknown>>;
