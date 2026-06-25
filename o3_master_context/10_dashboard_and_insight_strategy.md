# 10 Dashboard and Insight Strategy

## Dashboard Philosophy

O³ Dashboard is not a BI replacement. It is an insight and decision dashboard.

BI asks:

- What is the number?

O³ asks:

- What does the number mean?
- Is it good or bad?
- Why is it happening?
- What should we do next?

## MVP Dashboard Pages

### Executive Home

Shows:

- Workforce health score
- Headcount
- Turnover
- Regrettable loss
- Productivity
- Key risks
- AI summary
- Top priorities

### Workforce Snapshot

Shows:

- Total employees
- Department mix
- Job level mix
- Age profile
- Tenure profile
- Employment type
- Location

### Turnover and Retention

Shows:

- Total exits
- Turnover rate
- Voluntary exits
- Regrettable loss
- Cost of attrition
- Exit reason
- Exit by department
- Exit by tenure

### Productivity

Shows:

- Revenue per head
- Output per head
- Headcount vs output trend
- Department productivity

### Talent and Performance

Shows:

- Performance distribution
- Key talent count
- High performer exit
- Talent concentration

### Learning and Development

Shows:

- Training hours
- Training cost
- Training by department
- Learning gap

### Employee Sentiment

Shows:

- Engagement
- Workload
- Manager support
- Career growth
- Pay satisfaction

## Dashboard Widget Pattern

Each widget should include:

- KPI name
- Value
- Trend
- Risk level
- Business meaning
- AI explain button
- Suggested action
- Data source

## Insight Library

Each insight should have:

- Definition
- Formula
- Required data
- Interpretation
- Threshold
- Related indicators
- Recommended action
- AI prompt template

## Example: Regrettable Loss Insight

Definition:

> Loss of employees that the company would prefer to retain because they are high performers, high potential, key talent, or in critical positions.

Required data:

- Exit_Record
- Performance
- Critical_Position or job criticality
- Employee_Master

Business meaning:

> Total turnover may look normal, but regrettable loss shows whether the company is losing people who matter most.

Recommended actions:

- Review manager relationship.
- Check pay competitiveness.
- Conduct stay interviews.
- Review career path.
- Build succession pipeline.

## Dashboard MVP Rule

Do not build a fully customizable BI dashboard in MVP. Build guided dashboards with limited but high-value indicators.

