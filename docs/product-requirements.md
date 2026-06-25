# O3 ZONE Product Requirements

## Positioning

O3 ZONE is a founder-led People Intelligence and HR Transformation platform for Thai organizations that want to turn people data into measurable business outcomes.

Primary audiences:

- SME owners and CEOs who need clearer workforce decisions.
- HR leaders who want practical People Analytics, Workforce Productivity, and AI for HR.
- Teams that still rely on Excel, manual reports, or disconnected HR data.

## Current MVP

- Public bilingual website in Thai and English.
- Service portfolio for readiness checks, HR Health Check, Workforce Intelligence Sprint, Dashboard Starter, and AI advisory.
- Assessment funnel with HR Health Check, Workforce Productivity Check, and AI Readiness for HR.
- Lead capture through contact and assessment forms.
- Dashboard demo for People Intelligence exploration.
- Admin console for posts, courses, and assessment review.

## Funnel

1. Public positioning explains the problem and the O3 Framework.
2. Visitors choose a service or assessment.
3. Assessments return a practical summary and recommended next step.
4. Leads are stored in Supabase for admin review.
5. Admin follows up with the right service path.

## Future Product Roadmap: AI Dashboard & ML

Working label: `O3 AI Dashboard & Insight Engine`.

This is a future product after the production baseline is stable. It should be positioned as an AI-powered business diagnosis platform, not as a normal dashboard tool.

Core workflow:

1. Upload Excel or CSV.
2. Profile and validate the data.
3. Select the analysis goal.
4. Generate a dashboard from structured KPI and chart specs.
5. Produce executive insight and recommended action plan.

Core proposition:

> Upload file -> Dashboard -> Insight -> Action Plan

Thai proposition:

> โยนไฟล์ Excel/CSV แล้วได้ Dashboard พร้อม Insight และ Action Recommendation

The first use case should be HR Dashboard + Insight from Excel/CSV because it fits O3 ZONE's credibility, current service direction, and shortest path to real customer value.

This should not be framed as:

- Power BI or Tableau replacement.
- Generic data visualization platform.
- ChatGPT wrapper that only reads files and summarizes.
- Heavy ML platform from day one.

Recommended sequencing:

1. Rule Engine + LLM + structured dashboard JSON.
2. O3 Knowledge Base / RAG.
3. HR benchmark database.
4. Turnover prediction with LightGBM/XGBoost.
5. Workforce forecasting.
6. Optimization with OR-Tools.
7. Recommendation engine / collaborative filtering.

## Not In This Baseline

- Payments.
- Member-only e-learning.
- Full course progress tracking.
- PDF report export.
- Production monitoring implementation.
- AI Dashboard & ML product implementation.
