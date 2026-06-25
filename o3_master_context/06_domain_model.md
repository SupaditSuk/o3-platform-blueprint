# 06 Domain Model

## Why Domain Model Comes Before Database

Before designing SQL tables or APIs, O³ must define the business objects that make up the platform. This is the domain model.

A domain model describes the world of O³ in business language. It is not yet a database schema.

## Core Domains

### Company

Represents the customer organization using O³.

Company connects to:

- Users
- Subscription
- Employee data
- Dashboard
- AI usage
- Survey data
- Academy usage
- Benchmark segment

### User

A person who uses O³.

User types:

- Founder / SME Owner
- Executive
- HR Admin
- HR User
- Manager
- Employee respondent
- O³ Admin

### Organization

The internal structure of the company.

Includes:

- Department
- Function
- Business unit
- Location
- Job level
- Position
- Reporting line

### Employee

A person employed by the company.

Employee connects to:

- Department
- Position
- Manager
- Salary
- Performance
- Training
- Survey
- Exit
- Career
- Talent status

### Performance

Represents performance records and talent indicators.

Includes:

- Performance rating
- Potential
- Key talent
- Successor readiness
- Calibration result

### Compensation

Represents pay and reward information.

Includes:

- Base salary
- Salary range
- Pay grade
- Bonus
- Merit
- Allowance
- Pay satisfaction

### Training

Represents employee learning and development data.

Includes:

- Training hours
- Training category
- Training cost
- Completion
- Skill area

### Exit

Represents employee exit records.

Includes:

- Exit date
- Exit reason
- Voluntary or involuntary
- Replacement needed
- Regrettable loss
- Cost of attrition

### Survey

Represents employee survey programs and responses.

Includes:

- Survey type
- Question
- Response
- Score
- Dimension
- Driver
- Comment

### Assessment

Represents structured organizational assessments.

Examples:

- AI Readiness
- Workforce Readiness
- Organization Readiness
- 7S Assessment

### Dashboard

Represents insight views and widgets.

Dashboard connects to:

- KPI
- Filter
- Chart
- AI explanation
- Action plan

### Insight

Represents interpreted meaning from data.

Examples:

- Turnover risk
- Regrettable loss issue
- Low productivity
- Top-heavy structure
- Pay dissatisfaction risk

### AI Advisor

Represents AI-assisted interpretation and recommendation.

AI Advisor uses:

- Company context
- OWDS data
- Semantic layer
- Decision knowledge base
- User question

### Academy

Represents learning content and course progress.

Includes:

- Course
- Module
- Lesson
- Workshop
- Prompt library
- Certificate

### Subscription

Represents package, usage rights, AI credits, and billing status.

Includes:

- Package
- Feature entitlement
- Credit balance
- Renewal
- Expiry

### Benchmark

Represents anonymized comparison data in future phase.

Benchmark uses:

- Industry
- Employee size
- Province
- Company type
- Aggregated KPI

## Domain Relationship Summary

Company is the root domain. It owns data, users, subscription, product usage, and insight history.

Employee is the core workforce object. Most workforce insights connect through employee data.

Insight is the interpreted layer above raw data.

AI Advisor is not a data owner. It reads context and produces recommendations.

Benchmark is not built from individual identifiable records. It must use anonymized aggregated data.

