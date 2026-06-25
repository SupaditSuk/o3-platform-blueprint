# 07 Data Strategy and OWDS

## What OWDS Means

OWDS means **O³ Workforce Data Standard**.

It is the common data standard that allows O³ to read company data from Excel, CSV, API, HRIS, or manual input and transform it into a consistent structure for dashboard, AI, survey, and benchmark.

## Why OWDS Matters

Without OWDS, every customer file will be different:

- `Name`, `Employee Name`, `Staff Name`
- `Dept`, `Department`, `Function`
- `Salary`, `Base Pay`, `Monthly Pay`

This creates mapping problems and inconsistent analysis.

OWDS solves this by defining standard fields:

- Employee_ID
- Department
- Position
- Job_Level
- Salary
- Start_Date
- Exit_Date
- Performance_Rating
- Potential

## One Simple Company Data Template

MVP should use one Excel template with these sheets:

1. Company_Profile
2. Employee_Master
3. Exit_Record
4. Performance
5. Training
6. Business_Output
7. Short_Employee_Survey

This template should be simple enough for SME users but structured enough to create insights.

## Insights Supported by One Template

The template should support:

- Workforce Snapshot
- Turnover Insight
- Regrettable Loss
- Cost of Attrition
- Workforce Planning
- Pay and Reward Insight
- Performance and Talent
- Learning and Development
- Organization Health
- Employee Sentiment

## Regrettable Loss Logic

Regrettable loss should be detected through a combination of data points:

An exit may be classified as regrettable if one or more of these are true:

- Performance rating is high.
- Potential is high.
- Key talent is yes.
- Critical position is yes.
- Replacement difficulty is high.
- The employee is in a strategic role.

Regrettable loss should be shown separately from total turnover.

## Cost of Attrition

Cost of attrition can estimate business loss from exits.

Suggested components:

- Recruitment cost
- Training cost
- Productivity loss
- Knowledge loss
- Vacancy cost
- Manager time cost

MVP can use a simple formula with configurable assumptions.

## Data Quality Rules

Data validation should check:

- Required fields missing.
- Duplicate Employee_ID.
- Invalid date format.
- Exit date before start date.
- Salary less than or equal to zero.
- Department names inconsistent.
- Employee in Exit_Record not found in Employee_Master.
- Performance record without employee.

## Metadata Standard

Every field should eventually have metadata:

- Field name
- Business name
- Definition
- Data type
- Required or optional
- Sensitive or not
- Owner
- Quality rule
- Dashboard usage
- AI usage
- Benchmark usage

## Semantic Layer

OWDS stores data fields. Semantic Layer defines business meaning.

Example:

Turnover Rate is not a raw field. It is a KPI defined by:

- Number of exits
- Average headcount
- Time period
- Formula
- Business interpretation
- Threshold

## Event Model

O³ should eventually track events:

- Employee hired
- Employee transferred
- Employee promoted
- Salary changed
- Performance submitted
- Training completed
- Survey completed
- Employee exited

This allows timeline analysis and better AI recommendations.

