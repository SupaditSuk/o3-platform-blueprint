# 14 Decision Records

This file summarizes major architecture and product decisions already made in the O³ planning process.

## ADR-001: Use OWDS as the Workforce Data Standard

Decision:

O³ will use O³ Workforce Data Standard as the common data structure for upload, dashboard, AI, survey, and benchmark.

Reason:

Customer data will come from many formats. Without a standard, every customer becomes a custom mapping project.

Impact:

- Excel template must map to OWDS.
- Database should reflect OWDS concepts.
- API should expose OWDS-aligned resources.
- AI should consume OWDS context.

## ADR-002: API First

Decision:

All products should interact through API layers.

Reason:

Dashboard, AI, survey, academy, admin, and future integrations need consistent access control and data logic.

Impact:

- Frontend should not bypass backend rules.
- AI should not read raw database directly.
- Future HRIS integration becomes easier.

## ADR-003: Insight First

Decision:

O³ will prioritize insight and action over passive reporting.

Reason:

SME users need answers, not complex analytics tools.

Impact:

- Every dashboard widget should explain business meaning.
- AI summary should be embedded in dashboard.
- Action plan should follow major insights.

## ADR-004: Dashboard Is Not BI

Decision:

O³ Dashboard will not compete directly with Power BI or Tableau.

Reason:

BI tools are strong for reporting and visualization. O³ should focus on workforce interpretation and decision support.

Impact:

- MVP dashboard should be guided, not fully customizable.
- AI explanation is core.
- KPI library matters more than chart flexibility.

## ADR-005: Survey Studio Is Not MVP Core

Decision:

Full Survey Studio should be a later phase.

Reason:

Survey engine, distribution, response collection, analytics, correlation, and action planning form a full product by themselves.

Impact:

- MVP may include short employee survey in data template.
- Full survey product waits until Dashboard and AI MVP prove value.

## ADR-006: Benchmark Center Is Future Moat

Decision:

Benchmark Center should be future phase, not initial MVP.

Reason:

Benchmark needs enough standardized customer data.

Impact:

- Collect industry, size, province, and data structure from day one.
- Do not promise advanced benchmark too early.

## ADR-007: Use One Simple Company Data Template for MVP

Decision:

MVP should start with one simple Excel template rather than HRIS integration.

Reason:

SMEs may not have clean HRIS data. Excel is more accessible.

Impact:

- Upload and validation are core MVP features.
- Data quality dashboard is important.
- Future API integration should still map into OWDS.

## ADR-008: AI Gateway Required

Decision:

All AI calls must go through AI Gateway.

Reason:

Need control over cost, model selection, logging, prompt templates, output schema, and permissions.

Impact:

- Product modules do not call LLM directly.
- AI usage can be monetized through credits.
- Multi-model strategy becomes possible.

