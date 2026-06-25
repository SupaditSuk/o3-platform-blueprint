import { SimplePage } from "@/components/simple-page";
import type { Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <SimplePage
      locale={locale}
      eyebrow={locale === "th" ? "PDPA" : "Privacy"}
      title={locale === "th" ? "นโยบายความเป็นส่วนตัว" : "Privacy policy"}
      body={
        locale === "th"
          ? "O³ ZONE เก็บและใช้ข้อมูลเท่าที่จำเป็นเพื่อสรุปผล assessment ติดต่อกลับ และพัฒนาบริการ People Intelligence โดยเคารพสิทธิ์ความเป็นส่วนตัวตามหลัก PDPA"
          : "O³ ZONE collects and uses only the information needed to summarize assessments, follow up, and improve People Intelligence services while respecting privacy rights."
      }
    >
      <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-sm font-medium leading-7 text-white/68">
        {(locale === "th"
          ? [
              "ข้อมูลที่อาจเก็บ: ชื่อ อีเมล บริษัท บทบาท ขนาดองค์กร อุตสาหกรรม โจทย์ที่สนใจ คำตอบ assessment คะแนนสรุป และข้อมูลที่คุณส่งผ่านฟอร์มติดต่อ",
              "วัตถุประสงค์: สรุปผล assessment ติดต่อกลับ นัดคุยบริการที่เกี่ยวข้อง ปรับปรุงเนื้อหา วิเคราะห์ภาพรวมแบบไม่ระบุตัวตน และดูแลความปลอดภัยของระบบ",
              "ข้อมูล assessment และ lead อาจถูกใช้ในรูปแบบ aggregated หรือ anonymized เพื่อดู pattern ของตลาดและพัฒนาบริการ โดยไม่เปิดเผยข้อมูลส่วนบุคคลหรือข้อมูลบริษัทต่อสาธารณะ",
              "O³ ZONE ไม่ขายข้อมูลส่วนบุคคลให้บุคคลที่สาม และไม่ใช้ service role key ในเว็บไซต์ public",
              "คุณสามารถติดต่อเพื่อขอเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลได้ผ่านอีเมลที่ระบุบนเว็บไซต์"
            ]
          : [
              "Data we may collect: name, email, company, role, company size, industry, stated business challenges, assessment answers, summary scores, and information submitted through contact forms.",
              "Purpose: summarize assessments, follow up, discuss relevant services, improve content, analyze anonymized aggregate patterns, and maintain platform security.",
              "Assessment and lead data may be used in aggregated or anonymized form to understand market patterns and improve services, without publicly disclosing personal or company-identifiable information.",
              "O³ ZONE does not sell personal data to third parties and does not use a service role key in the public website.",
              "You can contact us to request access, correction, or deletion of personal data through the website email channel."
            ]
        ).map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </SimplePage>
  );
}
