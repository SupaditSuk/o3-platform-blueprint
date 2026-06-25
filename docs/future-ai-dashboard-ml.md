# Future Product: O3 AI Dashboard & Insight Engine

## Concept

O3 AI Dashboard & Insight Engine is a future product for turning uploaded business files into a decision-ready dashboard, executive insight, and recommended action plan.

It should become an AI-powered business diagnosis platform, not a simple dashboard builder.

Core proposition:

> Upload your file. Discover insight. Build dashboard. Decide with confidence.

Thai proposition:

> โยนไฟล์ Excel/CSV แล้วได้ Dashboard พร้อม Insight และ Action Recommendation

## User Journey

1. User uploads Excel or CSV.
2. System parses the file and profiles rows, columns, sheets, data types, missing values, duplicates, outliers, and likely PII.
3. User selects an analysis goal such as HR Dashboard, Turnover, Recruitment, Training, Workforce Planning, Productivity, AI Readiness, or Custom Analysis.
4. System maps uploaded columns to standard fields.
5. Rule engine calculates KPI and validation results.
6. LLM generates a structured dashboard JSON spec.
7. Frontend renders KPI cards, charts, data quality summary, insights, and recommendations.
8. User exports PDF, HTML, or later PowerPoint.

## Recommended Architecture

Start simple:

```text
Upload File
-> File Parser and Data Profiler
-> Validation and PII Detection
-> Rule Engine
-> LLM Structured Output
-> Dashboard Spec JSON
-> Dashboard Renderer
-> Insight and Action Plan
-> Export
```

Future architecture:

```text
Rule Engine
+ ML Models
+ LLM
+ O3 Knowledge Base / RAG
+ Benchmark Database
+ Optimization Engine
```

Recommended stack:

- Frontend: Next.js on Vercel.
- Auth, database, and storage: Supabase.
- Data processing: Python with Pandas or Polars, or a Node parser for the earliest prototype.
- Charts: Recharts or ECharts.
- LLM: structured JSON output for dashboard specs and executive summaries.
- RAG later: Supabase pgvector.
- ML later: LightGBM, XGBoost, Prophet, Scikit-learn.
- Optimization later: OR-Tools.

## MVP Scope

MVP v1 should include:

- Excel/CSV upload.
- HR dashboard template.
- Data quality check.
- Auto KPI mapping.
- Basic insight generation.
- Thai executive summary.
- Recommendation draft.
- PDF or HTML export.
- Privacy notice and consent before upload.

MVP v1 should not include:

- Training a custom LLM.
- Supporting every file type.
- Predictive models for every use case.
- Real-time HRIS or ERP integration.
- Collaborative filtering.
- Complex optimization.
- Payment.
- Full SaaS tenant administration.

## First Use Case

Start with HR Dashboard from Excel because it aligns with O3 ZONE's current positioning and credibility.

Priority analysis goals:

- HR Dashboard.
- Turnover Analysis.
- Workforce Planning.
- Productivity.
- AI Readiness.

Sales dashboard and broader business dashboards can come later after the HR use case is proven.

## O3 Framework Integration

Observe:

- Data profiling.
- KPI dashboard.
- Trend analysis.
- Benchmark comparison.

Optimize:

- Root cause analysis.
- Prediction.
- Scenario planning.
- Optimization model.

Outcome:

- Business impact.
- ROI estimation.
- Action plan.
- Executive report.

## Security And Privacy

This product will touch HR and personal data, so security must be designed before implementation.

Baseline requirements:

- Consent before upload.
- PII detection for names, ID numbers, phone numbers, emails, salary, health, disciplinary, and performance data.
- Tenant or user isolation before storing customer files.
- RLS on every exposed Supabase table.
- Supabase Storage policies for uploaded files.
- Retention policy such as deleting raw uploads after 7 or 30 days.
- User-controlled file deletion.
- Avoid sending raw sensitive data to LLM unless strictly necessary.
- Prefer aggregated summaries, masked data, or sampled data for LLM calls.
- Audit log for file upload, analysis run, AI generation, export, and deletion.
- Clear notice that AI is decision support, not the final decision maker.

## Roadmap Phases

Phase 1: File-to-HR Dashboard MVP

- Upload Excel/CSV.
- Data profiling.
- Auto KPI mapping.
- HR dashboard template.
- LLM summary in Thai.
- PDF/HTML export.

Phase 2: Insight Engine

- O3 Knowledge Base / RAG.
- HR benchmark starter set.
- Root cause templates.
- Executive summary.
- Recommendation library.

Phase 3: Prediction and Forecast

- Turnover risk model.
- Workforce forecast.
- Training impact estimation.
- Scenario planning.

Phase 4: Optimization and Recommendation

- Training budget optimizer.
- Manpower allocation optimizer.
- Course recommendation.
- Benchmark database from real customers.

## Internal Status

This is internal roadmap only. Do not add public pages, upload routes, Supabase Storage, AI calls, database tables, or paid product flows until the production baseline is launched and validated.
