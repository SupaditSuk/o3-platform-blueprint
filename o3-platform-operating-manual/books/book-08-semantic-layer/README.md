# Book 08: Semantic Layer Architecture

## Purpose

This book defines the Semantic Layer—the business meaning layer that transforms standardized workforce data (OWDS) into trusted metrics, KPIs, dimensions, measures, business terms, and analytical models. The Semantic Layer is the single source of truth for all business calculations used by Dashboard, Insight Engine, AI Studio, Benchmark Center, APIs, and all future products.

## Chapters

1. About This Book
2. Semantic Layer Principles
3. Business Vocabulary
4. Business Glossary
5. Dimensions
6. Measures
7. Metrics
8. KPI Catalog
9. KPI Hierarchy
10. KPI Formula Definitions (Business-Level)
11. Benchmark Definitions
12. Business Calendar
13. Analytical Models
14. Semantic Relationships
15. Metric Governance
16. Versioning Strategy
17. Cross References
18. Self Review

## Key Takeaways

- The Semantic Layer is the single source of truth for all business calculations—no product may calculate KPIs independently
- Every KPI has exactly one definition, one formula, one truth
- All KPI formulas use business language only—no SQL, no code
- 25 KPIs with full business definitions: Retention, Workforce, Compensation, Organization, Talent, Development, Productivity, Engagement, Diversity, Composite
- 20 base measures derived from OWDS, 17 calculated metrics, 17 dimensions
- KPI hierarchy ensures correct calculation flow: OWDS → Measures → Metrics → KPIs → Composite KPIs
- Every KPI includes: Business Definition, Purpose, Question, Formula, Numerator, Denominator, Thresholds, Dimensions, Consumers, Related Insight, Related OWDS
- KPI definitions follow semantic versioning (MAJOR.MINOR.PATCH) for auditability and reproducibility
- Benchmark definitions enable industry comparison (available in Growth phase)
- 8 analytical models combine multiple KPIs for complex business questions
- 8 semantic relationships define how KPIs correlate and influence each other