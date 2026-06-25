import { SimplePage } from "@/components/simple-page";
import type { Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <SimplePage
      locale={locale}
      eyebrow={locale === "th" ? "เงื่อนไข" : "Terms"}
      title={locale === "th" ? "เงื่อนไขการใช้งาน" : "Terms of use"}
      body={
        locale === "th"
          ? "การใช้งานเว็บไซต์ บทความ แบบประเมิน dashboard demo และบริการของ O³ ZONE อยู่ภายใต้เงื่อนไขการใช้ข้อมูลอย่างเหมาะสม เคารพลิขสิทธิ์ และใช้ผลลัพธ์เป็นเครื่องมือช่วยตัดสินใจ"
          : "Use of the O³ ZONE website, articles, assessments, dashboard demo, and services is subject to responsible use, respect for intellectual property, and decision-support limitations."
      }
    >
      <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-sm font-medium leading-7 text-white/68">
        {(locale === "th"
          ? [
              "เนื้อหา แบบประเมิน dashboard demo และรายงานสรุปบนเว็บไซต์มีไว้เพื่อการเรียนรู้และการตัดสินใจเชิงวิชาชีพ ไม่ใช่คำปรึกษาทางกฎหมาย การเงิน การแพทย์ หรือคำตัดสินแทนผู้บริหาร",
              "ผล assessment เป็นการประเมินเบื้องต้นจากข้อมูลที่ผู้ใช้กรอก ควรใช้ร่วมกับข้อมูลจริงขององค์กรและการพิจารณาของผู้เกี่ยวข้องก่อนตัดสินใจทำโครงการ",
              "ห้ามคัดลอก แจกจ่าย ดัดแปลง หรือขายต่อบทความ คอร์ส playbook dashboard หรือเอกสารของ O³ ZONE โดยไม่ได้รับอนุญาต",
              "ผู้ใช้ต้องไม่ส่งข้อมูลที่ละเมิดสิทธิ์ผู้อื่น ข้อมูลที่ผิดกฎหมาย หรือข้อมูลลับขององค์กรโดยไม่มีสิทธิ์",
              "รายละเอียดการชำระเงิน การคืนเงิน สิทธิ์เข้าเรียน หรือขอบเขตงานที่ปรึกษาจะระบุเพิ่มเติมในหน้าบริการ ข้อเสนอ หรืออีเมลยืนยันของแต่ละรายการ"
            ]
          : [
              "Site content, assessments, dashboard demos, and summary reports are for learning and professional decision support, not legal, financial, medical, or final management advice.",
              "Assessment results are initial estimates based on user-submitted information and should be combined with real organization data and stakeholder judgment before project decisions.",
              "Articles, courses, playbooks, dashboards, and O³ ZONE materials may not be copied, redistributed, modified, or resold without permission.",
              "Users must not submit unlawful data, data that violates third-party rights, or confidential organization data they are not authorized to share.",
              "Payment, refund, learning access, and consulting scope details will be stated on each service page, proposal, or confirmation email."
            ]
        ).map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </SimplePage>
  );
}
