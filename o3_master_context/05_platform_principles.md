# 05 Platform Principles

## Principle 01: One Source of Truth

Each core business object should have one trusted source.

Employee master should not be duplicated across dashboard, survey, academy, and AI tools. All products should refer to a shared company and employee model.

## Principle 02: Everything Starts from OWDS

O³ Workforce Data Standard is the common language for data ingestion, dashboard, AI, benchmark, and future integrations.

## Principle 03: API First

Frontend, AI, dashboard, survey, admin, and future integrations should communicate through APIs. No product should directly bypass platform rules.

## Principle 04: Insight First, Report Second

O³ should prioritize business interpretation, risk, priority, and action. Reporting is necessary but not the core value.

## Principle 05: AI Must Explain

AI recommendations must include reason, evidence, confidence, and limitation.

Bad AI output:

> You should improve retention.

Good AI output:

> Sales has 18 percent turnover, with 40 percent of exits classified as regrettable loss. Most exits are high performers with less than two years tenure. The recommended priority is manager coaching and pay competitiveness review.

## Principle 06: Data Before AI

If data is missing, inconsistent, or low quality, AI must not pretend to know. It should say what data is missing and what can still be inferred.

## Principle 07: Configuration Over Customization

Customers should adjust packages, dashboards, AI tools, templates, and permissions through configuration where possible. Avoid custom code for each customer in early phases.

## Principle 08: Reusable Components

Dashboards, cards, AI input forms, output templates, survey question blocks, and action plan modules should be reusable across products.

## Principle 09: Every Number Has Meaning

Every KPI should include:

- Definition
- Formula
- Data source
- Interpretation
- Risk level
- Recommended action

## Principle 10: Benchmark Must Be Anonymous

Future benchmark data must protect customer identity. Data should be aggregated and anonymized before comparison.

## Principle 11: Simple First Experience

The first user experience should be simple enough for SME users:

- Answer basic company questions.
- Upload one template.
- Receive clear insights.

Do not require HRIS integration or complex setup in MVP.

## Principle 12: AI Is Everywhere, But Not Everything

All products may use AI, but AI should support decisions, not replace data architecture, product design, or human judgment.

## Principle 13: Action Plan Required

Every major insight should lead to recommended actions. O³ should not only say what happened, but what to do next.

## Principle 14: Documentation First for Platform Decisions

Architecture, data model, AI rules, API design, and major product decisions should be documented before being implemented.

## Principle 15: Build for Learning

MVP should collect usage data so the team learns:

- Which features are used.
- Where users drop off.
- Which AI tools create value.
- Which dashboards users return to.
- Which customers convert.

