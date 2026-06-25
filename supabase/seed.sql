-- Seed data for O3 ZONE. Mirrors content/cms.ts so the admin and public site
-- start from the same baseline. Idempotent: safe to re-run (upsert by slug).

insert into public.posts (
  slug, status, title_th, title_en, excerpt_th, excerpt_en,
  body_th, body_en, category_th, category_en, read_time_th, read_time_en, published_at
) values
(
  $slug$ai-evolution-in-hr$slug$,
  $status$published$status$,
  $tth$5 ระดับของการใช้ AI ในงาน HR$tth$,
  $ten$The 5 Levels of AI Evolution in HR$ten$,
  $eth$จากผู้ช่วยเขียนงาน ไปสู่เพื่อนร่วมทีมดิจิทัลที่ช่วยให้ HR ทำงานเร็วขึ้น ฉลาดขึ้น และสร้างผลลัพธ์ได้มากขึ้น$eth$,
  $een$From writing assistant to digital teammate: how AI can help HR teams work faster, smarter, and at greater scale.$een$,
  $bth$ตลอดปีที่ผ่านมา ผมได้ทดลองใช้ AI กับงาน HR Analytics, Workforce Planning, HR Reporting และ HR Transformation หลายรูปแบบ สิ่งหนึ่งที่ชัดขึ้นเรื่อย ๆ คือ AI ไม่ได้เป็นเพียงเครื่องมือเพิ่ม productivity อีกต่อไป แต่กำลังกลายเป็นเพื่อนร่วมทีมดิจิทัลที่ช่วยให้ทีม HR ทำงานเร็วขึ้น ฉลาดขึ้น และขยายผลได้มากขึ้น

ระดับที่ 1 คือ Generative Task Execution: ใช้ AI เป็นผู้ช่วยส่วนตัว เช่น ร่างประกาศ สรุปประชุม ทำ presentation แปลภาษา หรือช่วยปรับข้อความทางธุรกิจให้คมขึ้น เครื่องมือกลุ่มนี้ เช่น ChatGPT, Claude, Gemini และ Copilot เหมาะกับงานที่ต้องการความเร็วและคุณภาพของ communication

ระดับที่ 2 คือ Domain-Specific AI: ใช้ AI กับความรู้เฉพาะด้าน HR เช่น วิเคราะห์ employee survey, อ่าน exit interview, สร้างคลังความรู้ HR ที่ค้นหาได้ หรือทำ research และ benchmarking เครื่องมืออย่าง NotebookLM, Perplexity และ Vertex AI ช่วยให้ HR ใช้ข้อมูลและความรู้ได้เป็นระบบมากขึ้น

ระดับที่ 3 คือ Agentic Workflow Automation: จุดนี้ AI เริ่มขยับจากการช่วยเราทำงาน ไปสู่การทำงานร่วมกับเรา เช่น workflow คัดกรองผู้สมัคร, automated HR reporting, pipeline จาก HRIS ไป dashboard, notification และ approval อัตโนมัติ เครื่องมืออย่าง n8n, Make, Zapier, Manus และ Hermes ทำให้ process ที่เคยทำด้วยมือเริ่มกลายเป็นระบบอัตโนมัติ

ระดับที่ 4 คือ Natural Language App Generation: ใช้ AI สร้าง HR application จากภาษาธรรมชาติ โดยไม่ต้องรอรอบ development แบบเดิม ตัวอย่างเช่น Workforce Planning App, HR Analytics Dashboard, Career Path Simulator หรือ Internal HR Service Portal เครื่องมืออย่าง Google AI Studio, Lovable, v0 และ Bolt ทำให้ไอเดียที่เคยใช้เวลาหลายสัปดาห์ กลายเป็น prototype ที่ลองใช้ได้ในไม่กี่ชั่วโมง

ระดับที่ 5 คือ Autonomous Software Engineering: ใช้ AI เป็น development partner เช่น เขียนและ review code, debug application, สร้าง data solution หรือเร่งการทำ prototype เครื่องมืออย่าง Claude Code, Codex, Cursor และ Devin ทำให้คนทำงาน HR ที่เข้าใจโจทย์ธุรกิจสามารถทดลองสร้าง solution ได้เร็วขึ้น

สำหรับคนทำงาน HR อนาคตไม่ได้หมายความว่าทุกคนต้องกลายเป็น programmer แต่หมายความว่าเราต้องเข้าใจว่าโจทย์ไหน AI แก้ได้, workflow ใดควรถูกออกแบบใหม่รอบ AI และจะเชื่อม Business, Data และ AI ให้เกิดผลลัพธ์ที่วัดได้อย่างไร

HR ที่มีคุณค่ามากในอีก 3-5 ปีข้างหน้า อาจไม่ใช่คนที่รู้ HR practice มากที่สุดเพียงอย่างเดียว แต่อาจเป็นคนที่ orchestrate คน ข้อมูล และ AI เข้าด้วยกันได้อย่างมีประสิทธิภาพ$bth$,
  $ben$Over the past year, I have been actively experimenting with AI across HR Analytics, Workforce Planning, HR Reporting, and HR Transformation. One thing has become increasingly clear: AI is no longer just a productivity tool. It is becoming a digital teammate that can help HR teams operate faster, smarter, and at greater scale.

Level 1 is Generative Task Execution: using AI as a personal assistant. This includes drafting announcements, summarizing meetings, creating presentations, translating content, and refining business communication. Tools such as ChatGPT, Claude, Gemini, and Copilot are useful when HR needs speed and quality in everyday communication work.

Level 2 is Domain-Specific AI: using AI with specialized HR knowledge. This includes analyzing employee survey results, reviewing exit interview feedback, building searchable HR knowledge repositories, and conducting research or benchmarking. Tools such as NotebookLM, Perplexity, and Vertex AI help HR teams work with knowledge in a more structured way.

Level 3 is Agentic Workflow Automation: using AI to automate HR processes. Candidate screening workflows, automated HR reporting, HRIS-to-dashboard data pipelines, and automated notifications or approvals all belong here. Tools such as n8n, Make, Zapier, Manus, and Hermes mark the shift from AI helping me work to AI working alongside me.

Level 4 is Natural Language App Generation: using AI to build HR applications without traditional development cycles. Workforce planning apps, HR analytics dashboards, career path simulators, and internal HR service portals can now move from idea to prototype within hours. Tools such as Google AI Studio, Lovable, v0, and Bolt make experimentation much faster.

Level 5 is Autonomous Software Engineering: using AI as a development partner. This includes writing and reviewing code, debugging applications, building data solutions, and accelerating prototype development. Tools such as Claude Code, Codex, Cursor, and Devin can help HR professionals who understand the business problem test solutions much faster.

For HR professionals, the future is not about everyone becoming a programmer. It is about understanding which problems AI can solve, how to redesign workflows around AI, and how to combine Business, Data, and AI to create measurable impact.

The most valuable HR professionals in the next 3-5 years may not be those who know the most HR practices alone. They may be those who can effectively orchestrate people, data, and AI together.$ben$,
  $cth$AI for HR$cth$, $cen$AI for HR$cen$,
  $rth$อ่าน 7 นาที$rth$, $ren$7 min read$ren$,
  now()
),
(
  $slug$building-a-learning-engine$slug$,
  $status$published$status$,
  $tth$สร้างเครื่องจักรการเรียนรู้ของตัวเอง$tth$,
  $ten$Building a Personal Learning Engine$ten$,
  $eth$วิธีเปลี่ยนการอ่าน การทดลอง และการสรุปบทเรียนให้กลายเป็นระบบที่ใช้ซ้ำและต่อยอดได้$eth$,
  $een$A practical way to turn reading, experiments, and notes into a system that compounds.$een$,
  $bth$บทความนี้เริ่มจากคำถามที่ชัด เก็บหลักฐานจากงานที่ทำ แล้วสรุปเป็นบทเรียนที่นำกลับมาใช้ซ้ำได้

สำหรับ O³ ZONE งานเขียนคือพื้นที่จัดระเบียบความคิดด้าน People Analytics ก่อนเปลี่ยนเป็นบทเรียนและเครื่องมือสำหรับการทำงานจริง$bth$,
  $ben$This article is a working content example: start with a sharper question, capture evidence from real work, and turn it into reusable lessons.

For this site, writing becomes the testing ground before ideas become structured courses.$ben$,
  $cth$Learning$cth$, $cen$Learning$cen$,
  $rth$อ่าน 6 นาที$rth$, $ren$6 min read$ren$,
  now()
),
(
  $slug$launch-small-teach-well$slug$,
  $status$published$status$,
  $tth$เริ่มเล็ก แต่สอนให้ชัด$tth$,
  $ten$Launch Small, Teach Clearly$ten$,
  $eth$เหตุผลที่คอร์สแรกไม่จำเป็นต้องใหญ่ แต่ต้องมีโจทย์ ผู้เรียน และผลลัพธ์ที่คม$eth$,
  $een$Why the first course does not need to be big, but does need a sharp promise and a real learner.$een$,
  $bth$คอร์สแรกไม่ควรเริ่มจากการอัดทุกอย่างที่รู้ลงไป แต่ควรเริ่มจากปัญหาหนึ่งข้อที่คนเรียนอยากแก้จริง

เมื่อโจทย์คม การออกแบบบทเรียน ราคา และข้อความขายจะง่ายขึ้นมาก$bth$,
  $ben$A first course should not begin by packing in everything you know. It should begin with one real problem a learner wants solved.

When the promise is sharp, the lessons, price, and sales message become much easier to design.$ben$,
  $cth$Courses$cth$, $cen$Courses$cen$,
  $rth$อ่าน 5 นาที$rth$, $ren$5 min read$ren$,
  now()
),
(
  $slug$notes-before-consulting$slug$,
  $status$draft$status$,
  $tth$ก่อนเปิดรับที่ปรึกษา ควรเขียนอะไรไว้บ้าง$tth$,
  $ten$What to Write Before Offering Consulting$ten$,
  $eth$ใช้บทความเป็นหลักฐานความคิด ทำให้คนเข้าใจวิธีทำงานก่อนจองคุย$eth$,
  $een$Use writing as proof of thinking so people understand how you work before they book a call.$een$,
  $bth$ก่อนขายงานที่ปรึกษา บทความควรช่วยตอบ 3 เรื่อง: คุณมองปัญหาอย่างไร คุณจัดลำดับความสำคัญแบบไหน และลูกค้าจะได้ผลลัพธ์อะไรจากการคุยกับคุณ$bth$,
  $ben$Before selling consulting, writing should answer three things: how you see the problem, how you prioritize, and what a client can expect after a conversation with you.$ben$,
  $cth$Consulting$cth$, $cen$Consulting$cen$,
  $rth$อ่าน 4 นาที$rth$, $ren$4 min read$ren$,
  null
)
on conflict (slug) do update set
  status = excluded.status,
  title_th = excluded.title_th, title_en = excluded.title_en,
  excerpt_th = excluded.excerpt_th, excerpt_en = excluded.excerpt_en,
  body_th = excluded.body_th, body_en = excluded.body_en,
  category_th = excluded.category_th, category_en = excluded.category_en,
  read_time_th = excluded.read_time_th, read_time_en = excluded.read_time_en,
  published_at = excluded.published_at,
  updated_at = now();

insert into public.courses (
  slug, status, title_th, title_en, description_th, description_en, level_th, level_en, price_thb
) values
(
  $slug$people-analytics-foundation$slug$,
  $status$draft$status$,
  $tth$People Analytics Foundation$tth$, $ten$People Analytics Foundation$ten$,
  $dth$ปูพื้นฐานการตั้งคำถาม วิเคราะห์ข้อมูลคน และสื่อสารอินไซต์ให้ธุรกิจนำไปตัดสินใจได้$dth$,
  $den$Build the foundation for asking better workforce questions, analyzing people data, and communicating insight for business decisions.$den$,
  $lth$เริ่มต้นถึงกลาง$lth$, $len$Beginner to intermediate$len$,
  2900
),
(
  $slug$ai-driven-hr-transformation$slug$,
  $status$draft$status$,
  $tth$AI-driven HR Transformation$tth$, $ten$AI-driven HR Transformation$ten$,
  $dth$ออกแบบโจทย์ใช้งาน ขั้นตอนทำงาน และการวัดผล AI ในงาน HR อย่างเป็นระบบ$dth$,
  $den$Design HR AI use cases, workflows, and measurement systems with practical structure.$den$,
  $lth$กลาง$lth$, $len$Intermediate$len$,
  4900
)
on conflict (slug) do update set
  status = excluded.status,
  title_th = excluded.title_th, title_en = excluded.title_en,
  description_th = excluded.description_th, description_en = excluded.description_en,
  level_th = excluded.level_th, level_en = excluded.level_en,
  price_thb = excluded.price_thb,
  updated_at = now();

insert into public.lessons (course_id, sort_order, title_th, title_en, status)
select courses.id, lesson.sort_order, lesson.title_th, lesson.title_en, $st$published$st$
from public.courses
cross join (
  values
    ($cs$people-analytics-foundation$cs$, 0, $a$ตั้งโจทย์ HR ให้เป็นโจทย์ธุรกิจ$a$, $b$Turn HR questions into business questions$b$),
    ($cs$people-analytics-foundation$cs$, 1, $a$ออกแบบตัวชี้วัดที่ใช้ตัดสินใจได้$a$, $b$Design decision-ready metrics$b$),
    ($cs$people-analytics-foundation$cs$, 2, $a$เล่าอินไซต์จากแดชบอร์ดให้คนเข้าใจ$a$, $b$Communicate dashboard insights clearly$b$),
    ($cs$ai-driven-hr-transformation$cs$, 0, $a$เลือกโจทย์ใช้ AI ที่คุ้มค่า$a$, $b$Choose valuable use cases$b$),
    ($cs$ai-driven-hr-transformation$cs$, 1, $a$ออกแบบขั้นตอนทำงานระหว่างคนกับ AI$a$, $b$Design human plus AI workflows$b$),
    ($cs$ai-driven-hr-transformation$cs$, 2, $a$วัดผลิตภาพและการนำไปใช้จริง$a$, $b$Measure productivity and adoption$b$)
) as lesson(course_slug, sort_order, title_th, title_en)
where courses.slug = lesson.course_slug
and not exists (
  select 1 from public.lessons existing
  where existing.course_id = courses.id
  and existing.sort_order = lesson.sort_order
);
