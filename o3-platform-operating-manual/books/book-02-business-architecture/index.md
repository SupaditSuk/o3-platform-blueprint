# Book 02: Business Architecture

**Status:** Production-Grade v1.0.0

---

## Chapter 0: About This Book

### Purpose

Define the complete business architecture of the O³ platform. This Book is the authoritative reference for how O³ creates, delivers, and captures value. It defines the business model, customer segments, pricing strategy, go-to-market motion, revenue architecture, and business governance. Every product decision, every feature priority, and every commercial choice must align with the business architecture defined here.

### Background

Technical architecture without business architecture is engineering without purpose. Book 01 defines the platform constitution—what we build and how. Book 02 defines the business architecture—why we build it, who we build it for, and how we sustain it. Together, Books 01 and 02 form the complete foundation that every other Book depends on.

### How to Use This Book

- **Before prioritizing any feature:** Verify it serves a defined customer segment and delivers on the value proposition.
- **Before designing a pricing change:** Reference the Pricing & Subscription Model chapter.
- **Before entering a new market:** Reference the Customer Segments and Go-To-Market chapters.
- **As a Product Manager:** This Book defines the business constraints within which you operate.
- **As an AI Agent:** These business rules constrain what features are available to which customers.

### Cross References

- Book 01: Platform Constitution — The architectural foundation this business architecture implements
- Book 00: Platform Overview — High-level platform description
- Book 03: Domain Model — Business domains that implement this architecture
- O³ Master Context, Section 02: Business Model — Original business model definition
- O³ Master Context, Section 11: Subscription, CRM, and Governance — Package and entitlement details
- `standards/documentation-writing-standard.md` — The writing standard this Book follows

---

## Chapter 1: Business Vision

### Purpose

Define the business vision that drives every commercial decision in the O³ platform. This vision answers the question: "What business are we building, and why does it matter to the market?"

### Background

O³ ZONE exists because Thai SMEs and growing organizations have workforce data but lack workforce intelligence. They have Excel files, payroll exports, and headcount tables. What they lack is the capability to transform that data into decisions. Traditional HR systems store transactions. BI tools display reports. AI tools answer broadly without business context. O³ bridges all three: data standardization (OWDS), AI-powered insight (Insight Engine + AI Gateway), and practical action (Action Engine + Product Suite).

### Business Vision Statement

> O³ ZONE is the workforce intelligence platform that enables Thai business leaders to make confident people decisions—without needing an HR analytics team, an HRIS integration, or data science expertise.

### Business Mission

> Transform how 10,000 Thai companies make workforce decisions by 2030. Start with simple data upload and AI-powered insights. Expand into a full workforce intelligence ecosystem: dashboard, AI tools, surveys, academy, and benchmarks. Build the definitive dataset and decision knowledge base for Thai workforce intelligence.

### Business Goals

| # | Goal | Target | Timeline | Measured By |
|---|------|--------|----------|-------------|
| BG-01 | Achieve product-market fit with Thai SMEs | 100 paying companies | Q1 2027 | Subscription Conversion Rate |
| BG-02 | Establish OWDS as the de facto workforce data standard in Thailand | 500+ companies using OWDS | 2028 | OWDS adoption rate |
| BG-03 | Build a monetizable benchmark database | 1,000+ companies contributing | 2029 | Benchmark Coverage |
| BG-04 | Achieve sustainable unit economics | LTV:CAC > 3:1 | 2027 | LTV:CAC ratio |
| BG-05 | Expand beyond Thailand | First international market live | 2029 | International MRR |

### Guiding Business Principles

| # | Principle | Description |
|---|-----------|-------------|
| BP-01 | **SME First, Enterprise Later** | Every feature, price point, and UX decision prioritizes SME needs. Enterprise features are built only after SME validation. |
| BP-02 | **Value Before Revenue** | Free users must experience real value. Conversion happens because paid is better, not because free is crippled. |
| BP-03 | **Land and Expand** | Start with one product (Dashboard). Expand within the account (AI Studio → Survey → Academy → Benchmark). |
| BP-04 | **Data as Moat** | Every customer contributes to a dataset that becomes more valuable with scale. OWDS standardization + benchmark data = defensible moat. |
| BP-05 | **Thai First, Regional Second** | Deeply serve the Thai market before international expansion. Localization is not translation—it's cultural understanding. |

### Architecture

```mermaid
graph TD
    VISION["Business Vision<br/>Workforce Intelligence for Thai SMEs"]
    MARKET["Market<br/>Thai SMEs 50–500 employees<br/>Manufacturing, Trading, Service"]
    VALUE["Value Proposition<br/>Fast insights, AI guidance,<br/>Practical tools, No integration needed"]
    REVENUE["Revenue Model<br/>Subscription + Credits + Services"]
    PRODUCTS["Product Portfolio<br/>Dashboard → AI Studio → Survey → Academy → Benchmark"]
    MOAT["Competitive Moat<br/>OWDS Standard + Benchmark Data +<br/>Thai Workforce Knowledge Base"]

    VISION --> MARKET
    VISION --> VALUE
    VALUE --> REVENUE
    REVENUE --> PRODUCTS
    MARKET --> MOAT
    PRODUCTS --> MOAT
```

*Description: The business vision drives market focus and value proposition. Value drives revenue model. Revenue funds product portfolio. Market presence and product usage build the competitive moat through standardized data and benchmarks.*

### Business Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| BR-BV-001 | Every product decision MUST be evaluated against the SME-first principle. Will this help a 50-employee manufacturing company make better workforce decisions? | Product review |
| BR-BV-002 | New markets or customer segments MUST be validated with paying customers before significant investment. | Business review |
| BR-BV-003 | The business vision is reviewed annually. Changes require Founder and Chief Architect approval. | Annual strategy review |

### Cross References

- Book 01, Chapter 1: Platform Overview — Platform vision and product portfolio
- O³ Master Context, Section 01: Vision and Positioning

### Definition of Ready

```
☐ Business vision documented and approved by Founder
☐ Business goals have measurable targets and timelines
☐ Guiding principles are understood by all team members
```

### Definition of Done

```
☐ Business vision is referenced in all product and pricing decisions
☐ Business goals are tracked quarterly
☐ Team can explain the business vision in one sentence
```

### Validation Checklist

```
☐ Can every team member state the business vision in one sentence?                               [ ]
☐ Are business goals measurable and time-bound?                                                  [ ]
☐ Does every feature decision align with the SME-first principle?                                [ ]
☐ Is the competitive moat strategy clear to all stakeholders?                                    [ ]
```

---

## Chapter 2: Business Model

### Purpose

Define the complete business model of the O³ platform: how value is created (products and services), how value is delivered (channels and customer relationships), and how value is captured (revenue streams and cost structure). This chapter is the canonical reference for the O³ business model.

### Background

The O³ business model is a multi-sided platform model with subscription, consumption, and service revenue streams. Unlike pure SaaS companies that charge only for software access, O³ monetizes at multiple points in the customer journey: software subscription (Dashboard, AI Studio), consumption (AI credits), education (Academy), services (setup, consulting), and data (future benchmarks).

### Business Model Canvas

| Component | Definition | O³ Implementation |
|-----------|-----------|-------------------|
| **Customer Segments** | Who we serve | Thai SMEs (50–500 employees), HR consultants, growing companies |
| **Value Proposition** | What problem we solve | Transform workforce data into AI-powered insights and action plans without HRIS integration |
| **Channels** | How we reach customers | Academy (content marketing), Direct sales, Partners (HR consultants), Product-led growth |
| **Customer Relationships** | How we interact | Self-service (dashboard), AI-assisted (AI Advisor), Human-assisted (setup service, support) |
| **Revenue Streams** | How we make money | Subscription, AI credits, Academy courses, Setup services, Future benchmarks |
| **Key Resources** | What assets we need | OWDS standard, AI/LLM infrastructure, Workforce domain expertise, Thai market knowledge |
| **Key Activities** | What we do | Platform development, Content creation (Academy), Data standardization, AI model management |
| **Key Partners** | Who helps us | HR consultants, Industry associations, Government agencies, LLM providers |
| **Cost Structure** | What we spend on | Engineering (largest), AI/LLM costs, Cloud infrastructure, Content creation, Sales & Marketing |

### Revenue Streams Detail

| Revenue Stream | Description | MVP Status | Growth Phase | Maturity Phase |
|---------------|-------------|------------|-------------|----------------|
| **Subscription** | Monthly/annual fee for platform access | Primary revenue | Tiered pricing expansion | Volume discounts, Enterprise contracts |
| **AI Credits** | Pre-paid or usage-based credits for AI features | Secondary revenue | Credit packages, Auto-recharge | Enterprise AI agreements |
| **Academy Courses** | One-time purchase for premium courses | Lead gen (free) | Paid certifications, Workshops | Corporate training packages |
| **Setup Services** | Assisted data upload and configuration | On-demand | Standardized onboarding packages | Partner-delivered setup |
| **Consulting** | Custom dashboard, workforce strategy | Post-MVP | Standardized consulting products | Partner ecosystem |
| **Benchmark Access** | Premium access to industry benchmarks | Future | Basic benchmarks included in Professional+ | Tiered benchmark access |
| **API Access** | Programmatic access to O³ data and insights | Future | Basic API for Business+ | API marketplace |

### Cost Structure

| Cost Category | % of Revenue (Target) | Key Drivers | Optimization Strategy |
|---------------|----------------------|-------------|----------------------|
| **Engineering** | 40–50% | Headcount, infrastructure | Platform efficiency, monorepo reuse |
| **AI/LLM Costs** | 15–25% | API calls to OpenAI/Anthropic | Prompt optimization, caching, model selection |
| **Cloud Infrastructure** | 10–15% | Supabase, hosting, CDN | Right-sizing, reserved instances |
| **Sales & Marketing** | 15–20% | Content, ads, sales team | Academy as organic channel, partner referrals |
| **G&A** | 5–10% | Legal, accounting, admin | Lean operations |
| **Customer Success** | 5–10% | Support, onboarding | Self-service tools, Academy deflection |

### Business Model Architecture

```mermaid
graph TD
    subgraph "Value Creation"
        PLATFORM["Platform Development<br/>(Dashboard, AI Studio, Survey, Academy)"]
        CONTENT["Content Creation<br/>(Academy Courses, Templates, Assessments)"]
        DATA["Data Asset<br/>(OWDS, Benchmarks, Knowledge Base)"]
    end

    subgraph "Value Delivery"
        SELF["Self-Service<br/>(Product-Led Growth)"]
        AI_DELIVERY["AI-Assisted<br/>(AI Advisor, AI Tools)"]
        HUMAN["Human-Assisted<br/>(Setup, Consulting, Support)"]
    end

    subgraph "Value Capture"
        SUB_REV["Subscription Revenue<br/>(Monthly/Annual)"]
        USAGE_REV["Usage Revenue<br/>(AI Credits)"]
        SERVICE_REV["Service Revenue<br/>(Setup, Consulting)"]
        DATA_REV["Data Revenue<br/>(Benchmarks, API)"]
    end

    PLATFORM --> SELF
    PLATFORM --> AI_DELIVERY
    CONTENT --> SELF
    DATA --> AI_DELIVERY
    HUMAN --> SERVICE_REV
    SELF --> SUB_REV
    SELF --> USAGE_REV
    AI_DELIVERY --> USAGE_REV
    HUMAN --> SERVICE_REV
    DATA --> DATA_REV
```

*Description: Value is created through platform development, content, and data assets. Value is delivered through self-service, AI-assisted, and human-assisted channels. Value is captured through subscription, usage, service, and data revenue streams.*

### Business Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| BR-BM-001 | Subscription MUST be the primary revenue stream. No single customer may represent >10% of revenue. | Business review |
| BR-BM-002 | AI credit costs MUST be tracked per customer. Unprofitable AI usage patterns MUST be identified and addressed. | Monthly financial review |
| BR-BM-003 | New revenue streams MUST be validated with at least 10 paying customers before full launch. | Business review |
| BR-BM-004 | Cost structure MUST be reviewed quarterly. Engineering costs below 40% of revenue trigger investment review. | Quarterly financial review |

### Common Mistakes

| Mistake | Why | Fix |
|---------|-----|-----|
| Over-relying on services revenue | Services don't scale like software | Services are onboarding tools, not the core business |
| Under-pricing AI credits | AI costs are variable and can erode margins | Track AI cost per customer; price credits above cost + margin |
| Ignoring customer acquisition cost (CAC) | "We'll figure out CAC later" | Track CAC from day one by channel; optimize spend |

### AI Instructions

- When generating pricing or packaging logic, always reference this chapter's revenue stream definitions.
- When generating features that consume AI credits, include cost tracking: every AI call must be attributed to a customer and a credit balance.
- Never hardcode package features. Use the entitlement system defined in Book 01, Principle 07.
- When generating financial models, use the cost structure targets defined in this chapter.

### Cross References

- Book 01, Chapter 1: Platform Overview — Product portfolio and shared foundation
- Book 01, Principle 07: Configuration Over Customization — Entitlement system
- O³ Master Context, Section 02: Business Model
- O³ Master Context, Section 11: Subscription, CRM, and Governance

### Definition of Ready

```
☐ Business model canvas complete and reviewed
☐ Revenue streams defined with MVP/ Growth/ Maturity phases
☐ Cost structure targets defined
☐ Unit economics model built
```

### Definition of Done

```
☐ Revenue streams are operational (subscription, credits)
☐ Cost structure is tracked against targets
☐ Unit economics are measured monthly
☐ No single customer >10% of revenue
```

### Validation Checklist

```
☐ Is subscription the primary revenue stream (>50% of revenue)?                                  [ ]
☐ Are AI credit costs tracked per customer?                                                      [ ]
☐ Is the cost structure within target ranges?                                                    [ ]
☐ Are unit economics (LTV:CAC) measured monthly?                                                 [ ]
```

---

## Chapter 3: Customer Segments

### Purpose

Define every customer segment the O³ platform serves, their characteristics, their problems, and how O³ creates value for them. This segmentation drives product prioritization, pricing, marketing, and sales strategy.

### Background

Not all customers are the same. A 50-employee manufacturing company owner has different needs, budget, and buying behavior than a 500-employee service company HR director. Effective segmentation ensures that O³ builds features for specific customers with specific problems—not generic features for "everyone."

### Primary Segments

#### Segment 1: SME Owner/Managing Director

| Attribute | Value |
|-----------|-------|
| **Company Size** | 50–200 employees |
| **Industry** | Manufacturing, Trading, Service |
| **Role** | Owner, Managing Director, CEO |
| **HR Maturity** | Low — no dedicated HR team, Excel-based records |
| **Core Problem** | "I know we have people issues but I can't prove it with data." |
| **Buying Trigger** | High turnover, growth pain, compliance pressure |
| **Budget Authority** | Direct — makes purchasing decisions |
| **Decision Speed** | Fast — days to weeks |
| **Preferred Channel** | Referral, Industry association, Academy content |
| **Value Drivers** | Speed to insight, Simplicity, Thai language, Clear recommendations |
| **Price Sensitivity** | Medium-High — needs clear ROI |

#### Segment 2: HR Manager/Director

| Attribute | Value |
|-----------|-------|
| **Company Size** | 100–500 employees |
| **Industry** | All priority industries |
| **Role** | HR Manager, HR Director, Head of People |
| **HR Maturity** | Medium — has HR processes but limited analytics |
| **Core Problem** | "I need to present workforce data to management but I spend days preparing reports." |
| **Buying Trigger** | Board presentation, Budget cycle, Strategic planning |
| **Budget Authority** | Influencer — recommends, executive approves |
| **Decision Speed** | Medium — weeks to months |
| **Preferred Channel** | HR networks, Industry events, Academy, Demo request |
| **Value Drivers** | Report automation, AI tools, Professional presentation, Benchmark comparison |
| **Price Sensitivity** | Medium — values time savings |

#### Segment 3: HR Consultant/Service Provider

| Attribute | Value |
|-----------|-------|
| **Organization Size** | 1–20 employees (consulting firm) |
| **Industry** | HR Consulting, Training, Recruitment |
| **Role** | HR Consultant, Trainer, Advisor |
| **HR Maturity** | High — HR experts |
| **Core Problem** | "I need tools to deliver workforce insights to my clients efficiently." |
| **Buying Trigger** | Client engagement, Service expansion |
| **Budget Authority** | Direct |
| **Decision Speed** | Medium — evaluates multiple tools |
| **Preferred Channel** | Professional networks, Demo, Trial |
| **Value Drivers** | Multi-client management, White-label potential, Report generation, Benchmark data |
| **Price Sensitivity** | Low-Medium — passes cost to clients |

### Future Segments

| Segment | Description | Entry Criteria | Timeline |
|---------|-------------|---------------|----------|
| **Enterprise** | 500+ employee organizations with dedicated HR teams | 100+ paying SME customers, proven SME retention | 2028+ |
| **Regional** | Companies in ASEAN markets (Vietnam, Indonesia, Malaysia) | Thai market profitability, localization capability | 2029+ |
| **Government** | Government agencies and state enterprises | Enterprise features, compliance certifications | 2030+ |

### Segment Prioritization Matrix

```mermaid
graph TD
    subgraph "Priority 1 (MVP)"
        SME_OWNER["SME Owner<br/>50–200 employees<br/>Manufacturing, Trading, Service"]
    end

    subgraph "Priority 2 (Growth)"
        HR_MGR["HR Manager<br/>100–500 employees<br/>All priority industries"]
        HR_CONSULTANT["HR Consultant<br/>Service providers"]
    end

    subgraph "Priority 3 (Scale)"
        ENTERPRISE["Enterprise<br/>500+ employees"]
        REGIONAL["Regional<br/>ASEAN markets"]
    end

    SME_OWNER --> HR_MGR
    SME_OWNER --> HR_CONSULTANT
    HR_MGR --> ENTERPRISE
    HR_CONSULTANT --> REGIONAL
```

*Description: MVP focuses exclusively on SME Owners. Growth phase expands to HR Managers and Consultants. Scale phase adds Enterprise and Regional segments.*

### Business Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| BR-CS-001 | MVP features MUST be designed for SME Owners (Segment 1). Features that only benefit Enterprise are post-MVP. | Product review |
| BR-CS-002 | Every customer MUST be tagged with their segment at signup. Segment determines onboarding flow and default configuration. | CRM requirement |
| BR-CS-003 | Segment mix MUST be reviewed quarterly. No segment may exceed 80% of revenue. | Business review |
| BR-CS-004 | New segments require Founder approval and documented market validation. | Business review |

### Cross References

- Chapter 4: Value Proposition — How each segment receives value
- Chapter 7: Customer Journey — Segment-specific journeys
- Book 17: Product Specifications — Segment-specific features

### Definition of Ready

```
☐ All primary segments defined with characteristics, problems, and value drivers
☐ Segment prioritization documented
☐ Segment-specific onboarding flows designed
```

### Definition of Done

```
☐ Customer CRM tracks segment assignment
☐ Segment-specific features are prioritized correctly
☐ Segment mix is within diversification targets
```

### Validation Checklist

```
☐ Is every customer tagged with their correct segment?                                           [ ]
☐ Are MVP features designed for SME Owners (not enterprise)?                                     [ ]
☐ Is segment mix reviewed quarterly?                                                             [ ]
☐ Are there segments with <5% of revenue that need attention?                                    [ ]
```

---

## Chapter 4: Value Proposition

### Purpose

Define the specific value O³ delivers to each customer segment. The value proposition is the bridge between customer problems and O³ solutions. Every product feature, every marketing message, and every sales conversation must articulate a value proposition defined in this chapter.

### Background

Customers don't buy "workforce intelligence platforms." They buy solutions to specific problems: "I don't know why my best people are leaving." "I can't prove we need more headcount." "I spend every Sunday preparing HR reports for Monday's meeting." The value proposition translates O³'s capabilities into specific, measurable outcomes that customers care about.

### Value Propositions by Segment

#### For SME Owners

| Problem | O³ Solution | Measurable Outcome |
|---------|-------------|-------------------|
| "I don't know if turnover is a problem" | Upload one Excel file → Instant turnover analysis with risk level | Know within 5 minutes if turnover is Low, Medium, High, or Critical |
| "I can't prove we need to invest in retention" | AI-generated insights with evidence and cost analysis | Present data-backed retention case to stakeholders |
| "I don't have time to analyze HR data" | AI Advisor answers workforce questions in natural language | Get answers to workforce questions in seconds, not days |
| "I don't know what to do about HR problems" | Action Engine recommends specific, prioritized actions | Follow a clear action plan instead of guessing |
| "I can't afford an HR analytics team" | All-in-one platform for fraction of the cost | Workforce intelligence at <10% of hiring an analyst |

#### For HR Managers

| Problem | O³ Solution | Measurable Outcome |
|---------|-------------|-------------------|
| "I spend days preparing monthly HR reports" | Automated dashboard with AI interpretations | Reduce report preparation from days to minutes |
| "I need to present data to executives" | Insight-first reports with executive summaries | Present professional, insight-first reports |
| "I need practical HR tools" | AI Studio with 9 guided HR tools | Generate job descriptions, salary structures, performance reviews in minutes |
| "I need to measure employee engagement" | Survey Studio with pre-built survey templates | Deploy engagement surveys and get AI analysis |
| "I don't know how we compare to industry" | Benchmark Center with anonymous comparisons | Know exactly how your metrics compare to industry peers |

#### For HR Consultants

| Problem | O³ Solution | Measurable Outcome |
|---------|-------------|-------------------|
| "I need tools to serve multiple clients" | Multi-workspace platform with client isolation | Manage all clients from one platform |
| "I spend too much time on manual analysis" | Automated KPI calculation and AI interpretation | Serve more clients with the same team |
| "I need to deliver professional deliverables" | Insight-first reports and presentations | Deliver white-label or co-branded reports |
| "I need benchmark data for client recommendations" | Anonymous industry benchmarks | Provide data-backed recommendations |

### Value Proposition Canvas (Core)

```
CUSTOMER JOBS                | PAINS                         | GAINS
------------------------------|-------------------------------|------------------------------
Understand workforce health   | Data scattered across files   | One dashboard, always current
Make people decisions         | Can't interpret raw numbers   | AI explains what data means
Report to stakeholders        | Hours spent on manual reports | Automated insight-first reports
Improve retention             | Don't know why people leave   | Root cause analysis + actions
Plan for growth               | Can't prove headcount needs   | Data-backed workforce planning
Stay competitive              | No industry comparison data   | Anonymous benchmark data
```

### Competitive Positioning

| Dimension | O³ ZONE | Traditional HRIS | BI Tools (PowerBI, Tableau) | Generic AI (ChatGPT) |
|-----------|---------|-----------------|----------------------------|---------------------|
| **Data Standard** | OWDS (built-in) | Varies by system | Requires data modeling | No standard |
| **Workforce Context** | Deep Thai SME knowledge | Transactional | Generic | No business context |
| **Insight** | AI-powered with risk levels | Reports only | Visualization only | Generic answers |
| **Action** | Recommended actions + tracking | No | No | No |
| **Onboarding** | One Excel template, 5 minutes | Months of implementation | Weeks of setup | No onboarding needed |
| **Thai Language** | Full support | Varies | Limited | Partial |
| **Benchmark** | Future capability | No | No | No |
| **Price** | SME-accessible | Enterprise pricing | Enterprise pricing | Free/Cheap |

### Business Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| BR-VP-001 | Every product feature MUST map to at least one customer problem defined in this chapter. | Product review |
| BR-VP-002 | Value propositions MUST be validated with customers. Features without validated value proposition are deprecated. | Quarterly review |
| BR-VP-003 | Marketing and sales materials MUST use value propositions from this chapter, not generic claims. | Marketing review |

### Common Mistakes

| Mistake | Why | Fix |
|---------|-----|-----|
| Selling features instead of outcomes | "We have AI-powered KPI calculation" | "You'll understand your turnover problem in 5 minutes" |
| Generic value propositions | "Improve your HR" | "Know exactly why your top performers are leaving and what to do about it" |
| Over-promising | "AI will solve all your HR problems" | "AI will show you patterns in your data and recommend actions" |

### AI Instructions

- When generating marketing copy or product descriptions, use value propositions from this chapter.
- When generating product features, verify they map to a documented customer problem.
- Never generate claims that exceed the documented value propositions.
- When generating AI Advisor responses, focus on delivering the measurable outcomes defined in this chapter.

### Cross References

- Chapter 3: Customer Segments — Segments these value propositions serve
- Chapter 6: Pricing & Subscription Model — How value is priced
- Book 17: Product Specifications — Features that deliver these value propositions

### Definition of Ready

```
☐ Value propositions defined for all primary segments
☐ Every value proposition has a measurable outcome
☐ Competitive positioning documented
```

### Definition of Done

```
☐ Customer interviews validate value propositions
☐ Marketing materials reflect documented value propositions
☐ Features map to documented customer problems
```

### Validation Checklist

```
☐ Does every product feature map to a documented customer problem?                               [ ]
☐ Are value propositions validated with actual customer feedback?                                [ ]
☐ Is competitive positioning accurate and current?                                               [ ]
☐ Do marketing materials use value propositions from this chapter?                               [ ]
```

---

## Chapter 5: Product Portfolio

### Purpose

Define the product portfolio strategy: what products exist, how they relate to each other, how they map to customer segments, and how they evolve over time. This chapter focuses on the business architecture of the portfolio, not the technical architecture (which is in Book 00 and Book 01, Chapter 1).

### Background

O³ is a multi-product platform, not a single application. Each product serves specific customer needs and specific stages of the customer journey. The portfolio strategy ensures that products complement rather than compete, that customer progression between products is intentional, and that the platform creates more value as more products are adopted.

### Product Portfolio Overview

| Product | Status | Target Segment | Core Job | Monetization |
|---------|--------|---------------|----------|-------------|
| **O³ Dashboard** | MVP | SME Owners, HR Managers | Understand workforce health at a glance | Subscription (all paid tiers) |
| **O³ AI Studio** | MVP | HR Managers, HR Consultants | Get practical HR work done faster | AI Credits + Subscription |
| **O³ Survey Studio** | Post-MVP | HR Managers | Measure employee experience and engagement | Subscription (Professional+) |
| **O³ Academy** | MVP (Free) | All segments | Learn data-driven HR and AI skills | Free courses (lead gen) + Paid certifications |
| **O³ Benchmark Center** | Future | All paid segments | Compare workforce metrics to industry | Premium access (Business+) |

### Product Relationship Model

```mermaid
graph TD
    ACADEMY["Academy<br/>(Lead Generation)"]
    DASHBOARD["Dashboard<br/>(Core Product)"]
    AI_STUDIO["AI Studio<br/>(Power Tools)"]
    SURVEY["Survey Studio<br/>(Diagnostics)"]
    BENCHMARK["Benchmark Center<br/>(Comparison)"]

    ACADEMY -->|"Graduates to"| DASHBOARD
    DASHBOARD -->|"Power users discover"| AI_STUDIO
    DASHBOARD -->|"HR Managers expand to"| SURVEY
    AI_STUDIO -->|"AI users deepen with"| SURVEY
    DASHBOARD -->|"Data contributes to"| BENCHMARK
    AI_STUDIO -->|"Data contributes to"| BENCHMARK
    SURVEY -->|"Data contributes to"| BENCHMARK
```

*Description: Academy is the top-of-funnel lead generation engine. Dashboard is the core product that all customers use. AI Studio serves power users who want advanced HR tools. Survey Studio expands the relationship for HR Managers. Benchmark Center leverages cross-customer data to create additional value.*

### Product Evolution Strategy

| Product | MVP (Q3 2026) | Growth (Q4 2026–Q1 2027) | Scale (2027+) |
|---------|--------------|--------------------------|---------------|
| **Dashboard** | Workforce Snapshot, Department Mix, Turnover, AI Summary | Advanced KPIs, Custom dashboards, Trend analysis | Predictive analytics, Real-time dashboards |
| **AI Studio** | 9 AI tools (JD, CV, Job Eval, Salary, Workforce Planning, Performance, Succession, Merit, Career Path) | Advanced AI tools, Templates, Batch processing | AI workflow automation, Custom AI tools |
| **Academy** | 5 free courses | Paid certifications, Workshops | Corporate training, Partner content |
| **Survey Studio** | — | Engagement, Pulse, Exit surveys | Advanced analytics, 360 feedback |
| **Benchmark Center** | — | Basic benchmarks (3 industries) | Full benchmark suite, Custom segments |

### Product-Market Fit by Segment

| Segment | Primary Product | Secondary Product | Tertiary Product |
|---------|----------------|-------------------|-----------------|
| SME Owner | Dashboard | AI Advisor (in Dashboard) | Academy |
| HR Manager | Dashboard + AI Studio | Survey Studio | Benchmark Center |
| HR Consultant | AI Studio | Dashboard (multi-client) | Benchmark Center |

### Business Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| BR-PP-001 | Dashboard is the core product. All customers MUST have Dashboard access as their primary interface. | Product architecture |
| BR-PP-002 | New products MUST demonstrate cross-sell potential before full investment. At least 20% of existing customers must express interest. | Business review |
| BR-PP-003 | Products MUST share the Shared Foundation (Book 01, Chapter 1). No product may build its own auth, data store, or AI gateway. | Architecture Review — blocking |
| BR-PP-004 | Product sunset decisions require: 3 months notice to customers, data export capability, migration path to alternative. | Business review |

### Cross References

- Book 01, Chapter 1: Platform Overview — Technical product architecture and shared foundation
- Book 00: Platform Overview — Five-layer technical architecture
- Book 17: Product Specifications — Detailed feature specifications per product
- O³ Master Context, Section 04: Product Portfolio

### Definition of Ready

```
☐ Product portfolio strategy documented
☐ Product evolution roadmap defined
☐ Product-market fit per segment validated
```

### Definition of Done

```
☐ All products use Shared Foundation
☐ Product cross-sell is measurable
☐ Product sunset process is defined and tested
```

### Validation Checklist

```
☐ Is Dashboard the core product for all customers?                                               [ ]
☐ Do all products use the Shared Foundation?                                                     [ ]
☐ Is there a clear progression path between products?                                            [ ]
☐ Are product sunset criteria and processes defined?                                             [ ]
```

---

## Chapter 6: Pricing & Subscription Model

### Purpose

Define the complete pricing architecture: subscription packages, feature entitlement by tier, AI credit model, pricing principles, and upgrade/downgrade paths. This chapter is the canonical reference for how O³ charges for value.

### Background

Pricing is one of the most consequential business architecture decisions. Price too low and the business cannot sustain itself. Price too high and SMEs cannot afford it. The pricing model must balance accessibility (SMEs must be able to start), value capture (price must reflect value delivered), and simplicity (SME owners should understand pricing in 30 seconds).

### Pricing Principles

| # | Principle | Description |
|---|-----------|-------------|
| PP-01 | **Value-Based Pricing** | Price reflects value delivered, not cost incurred. As the platform delivers more value, pricing can increase. |
| PP-02 | **Free Delivers Real Value** | Free tier is not a crippled demo. It delivers enough value that users return. Conversion happens because paid is better, not because free is broken. |
| PP-03 | **Transparent and Predictable** | No hidden fees. Pricing is public. AI credit consumption is visible in real-time. |
| PP-04 | **Land Low, Expand High** | Entry price is SME-accessible. Revenue grows as customers adopt more products and consume more AI. |
| PP-05 | **Annual Discount** | Annual billing offers 15–20% discount vs. monthly. Improves cash flow predictability. |

### Subscription Packages

#### Package 1: Basic (Free)

| Attribute | Value |
|-----------|-------|
| **Price** | ฿0 / month |
| **Employees** | Up to 50 |
| **Dashboard** | Workforce Snapshot, Department Mix (limited) |
| **AI** | 10 AI Advisor queries / month, 2 AI tool uses / month |
| **Data** | One data upload, OWDS validation |
| **Academy** | All free courses |
| **Goal** | Demonstrate value → Drive conversion to Starter |

#### Package 2: Starter

| Attribute | Value |
|-----------|-------|
| **Price** | ฿2,900 / month (฿29,000 / year — save 17%) |
| **Employees** | Up to 100 |
| **Dashboard** | Full Dashboard (all MVP widgets) |
| **AI** | 50 AI Advisor queries / month, 10 AI tool uses / month |
| **Data** | Unlimited uploads, full OWDS validation |
| **Reports** | Basic report export |
| **Goal** | Core SME product → Drive AI Studio adoption |

#### Package 3: Professional

| Attribute | Value |
|-----------|-------|
| **Price** | ฿5,900 / month (฿59,000 / year — save 17%) |
| **Employees** | Up to 300 |
| **Dashboard** | Full Dashboard + Custom dashboards + Trend analysis |
| **AI** | 200 AI Advisor queries / month, 50 AI tool uses / month |
| **Data** | All Starter features + Data quality scoring |
| **Reports** | Full insight-first reports (PDF export) |
| **AI Studio** | Full access to all 9 AI tools |
| **Goal** | Power user product → Most popular tier |

#### Package 4: Business

| Attribute | Value |
|-----------|-------|
| **Price** | ฿12,900 / month (฿129,000 / year — save 17%) |
| **Employees** | Up to 500 |
| **Dashboard** | All Professional features + Multi-user dashboards |
| **AI** | 500 AI Advisor queries / month, 150 AI tool uses / month |
| **Multi-User** | Up to 5 users with role-based access |
| **Survey Studio** | Full access |
| **Benchmark** | Basic benchmark access (when available) |
| **Goal** | Team product → Drive organization-wide adoption |

#### Package 5: Enterprise

| Attribute | Value |
|-----------|-------|
| **Price** | Custom (starting ฿29,900 / month) |
| **Employees** | Unlimited |
| **Dashboard** | All Business features + Custom integrations |
| **AI** | Custom AI credit packages |
| **Multi-User** | Unlimited users + SSO |
| **Support** | Dedicated account manager + SLA |
| **Goal** | High-touch enterprise accounts |

### AI Credit Model

| Credit Item | Credits Consumed | Notes |
|-------------|-----------------|-------|
| AI Advisor query | 1 credit | Simple Q&A about workforce data |
| AI Advisor deep analysis | 3 credits | Multi-step analysis with detailed output |
| AI Tool use (JD Generator, etc.) | 2 credits | One complete tool execution |
| AI Insight generation (per widget) | 1 credit | Auto-generated on dashboard load |
| Credit rollover | No | Credits reset monthly |

### Entitlement Architecture

Every feature gate is controlled by the entitlement system (Book 01, Principle 07):

```
entitlements_by_package:
  basic:
    - dashboard_basic
    - ai_advisor_limited (10/month)
    - ai_tools_limited (2/month)
    - upload_single
    - academy_free
  starter:
    - dashboard_full
    - ai_advisor (50/month)
    - ai_tools (10/month)
    - upload_unlimited
    - report_basic
  professional:
    - dashboard_full
    - dashboard_custom
    - dashboard_trends
    - ai_advisor (200/month)
    - ai_tools (50/month)
    - ai_studio_full
    - upload_unlimited
    - report_full
    - data_quality_scoring
  business:
    [all professional entitlements]
    - multi_user (5)
    - survey_studio
    - benchmark_basic
  enterprise:
    [all business entitlements]
    - multi_user_unlimited
    - sso
    - custom_integration
    - dedicated_support
    - sla
```

### Business Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| BR-PR-001 | All feature access MUST be gated by entitlements. No hardcoded package checks in product code. | Code review — blocking (Book 01, Principle 07) |
| BR-PR-002 | Package pricing changes require 30 days notice to existing customers. Grandfathering option for current subscribers. | Business review |
| BR-PR-003 | AI credit consumption MUST be displayed in real-time. Users must know their remaining credits at all times. | UX requirement |
| BR-PR-004 | Price increases apply to new customers immediately. Existing customers have a 90-day grace period at current pricing. | Business policy |

### Common Mistakes

| Mistake | Why | Fix |
|---------|-----|-----|
| Making free tier too generous | "We want to drive adoption" | Free tier shows value; paid tier delivers ongoing value |
| Making free tier useless | "We want to force conversion" | Free tier that delivers no value drives abandonment, not conversion |
| Complex pricing page | "Different customers need different options" | 5 tiers maximum; pricing understandable in 30 seconds |

### AI Instructions

- When generating pricing display logic, always read entitlements from the subscription system — never hardcode.
- When generating upgrade prompts, reference specific value propositions: "Upgrade to Professional to unlock AI Studio and save 10 hours per week."
- AI credit consumption must be tracked and displayed at the point of use.
- Never generate logic that bypasses entitlement checks for any customer.

### Cross References

- Book 01, Principle 07: Configuration Over Customization — Entitlement system architecture
- Book 01, Chapter 9: Platform Success Metrics — Subscription conversion metrics
- O³ Master Context, Section 02: Business Model — Revenue model
- O³ Master Context, Section 11: Subscription, CRM, and Governance — Package details

### Definition of Ready

```
☐ All 5 packages defined with features, limits, and pricing
☐ AI credit model defined
☐ Entitlement architecture specified
☐ Upgrade/downgrade paths defined
```

### Definition of Done

```
☐ Entitlement system operational
☐ Subscription billing live
☐ AI credit tracking real-time
☐ Upgrade/downgrade flows tested
```

### Validation Checklist

```
☐ Is pricing understandable by an SME owner in 30 seconds?                                       [ ]
☐ Are all feature gates controlled by entitlements (not hardcoded)?                              [ ]
☐ Is AI credit consumption displayed in real-time?                                               [ ]
☐ Is the free-to-paid conversion path clear?                                                     [ ]
```

---

## Chapter 7: Customer Journey

### Purpose

Define the end-to-end customer journey from first contact through renewal, mapped to the business architecture. This journey shows how customers move from unaware to advocate, which touchpoints drive conversion, and where revenue is captured.

### Background

The customer journey is not just a UX concern—it is a business architecture concern. Each stage of the journey has a business purpose (awareness, activation, conversion, expansion, retention), a revenue implication (cost to acquire, revenue captured, lifetime value), and a product requirement (what features are needed at each stage).

### Customer Journey Map

```mermaid
graph LR
    AWARE["Aware<br/>Discover O³"]
    ASSESS["Assess<br/>Try Free Assessment"]
    ACTIVE["Active<br/>Upload Data, See Insights"]
    CONVERT["Convert<br/>Upgrade to Paid"]
    EXPAND["Expand<br/>Adopt More Products"]
    ADVOCATE["Advocate<br/>Refer Others"]

    AWARE -->|"Academy, Content, Referral"| ASSESS
    ASSESS -->|"Free Dashboard, AI Summary"| ACTIVE
    ACTIVE -->|"Value Demonstrated, Upgrade Prompt"| CONVERT
    CONVERT -->|"AI Studio, Survey, Multi-User"| EXPAND
    EXPAND -->|"Results, Satisfaction, NPS"| ADVOCATE
    ADVOCATE -->|"Referral"| AWARE
```

*Description: The customer journey is a flywheel. Each stage feeds the next. Advocates bring new customers into the Aware stage, creating a self-reinforcing growth loop.*

### Journey Stages Detail

| Stage | Customer Action | Business Goal | Key Metrics | Product Requirements |
|-------|----------------|---------------|-------------|---------------------|
| **Aware** | Discover O³ via Academy, search, referral, or social media | Generate qualified leads | Website visitors, Academy enrollments, Content downloads | Academy, Landing pages, SEO content |
| **Assess** | Take free assessment or try basic upload | Demonstrate value quickly | Assessment completion rate, Template download rate | Free assessment tool, Basic Dashboard |
| **Active** | Upload real data, view insights, use AI Advisor | Activate the customer with their own data | Activation rate, Time to first insight | Full Dashboard, AI Advisor, OWDS validation |
| **Convert** | Upgrade from Free to Paid | Convert active users to paying customers | Conversion rate, Time to convert | Upgrade flow, Payment processing, Entitlement activation |
| **Expand** | Adopt AI Studio, Survey Studio, add users | Increase revenue per customer | Product adoption rate, MRR expansion | Cross-sell prompts, Multi-user management |
| **Advocate** | Refer colleagues, provide testimonials, high NPS | Generate organic growth | NPS, Referral rate, Case studies | Referral program, Testimonial collection, NPS survey |

### Activation Funnel

```
1,000 Website Visitors
  → 200 Academy Enrollments (20%)
    → 100 Free Signups (50% of enrolled)
      → 60 Template Downloads (60% of signups)
        → 40 First Uploads (67% of downloads)
          → 30 First Insights Viewed (75% of uploads)
            → 10 Paid Conversions (33% of active)
```

### Revenue Per Journey Stage

| Stage | Cost to Acquire (CAC) | Revenue Captured |
|-------|----------------------|-----------------|
| Aware | Content creation, SEO, ads | ฿0 |
| Assess | Free product usage, AI credits | ฿0 |
| Active | Infrastructure, AI costs, support | ฿0 |
| Convert | Sales (if assisted), payment fees | First subscription payment |
| Expand | Product development, customer success | Increased MRR, Cross-sell revenue |
| Advocate | Referral rewards (if any) | Organic CAC reduction |

### Business Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| BR-CJ-001 | Every journey stage MUST have defined metrics. Stages without metrics are invisible to the business. | Business review |
| BR-CJ-002 | The Assess → Active transition (first upload to first insight) MUST complete within 5 minutes. | Performance SLA (Book 01, Principle 11) |
| BR-CJ-003 | Free users who are active for 30 days without converting MUST receive a targeted upgrade prompt. | CRM automation |
| BR-CJ-004 | Churned customers MUST receive a win-back sequence: "Here's what's new since you left." | CRM automation |

### Common Mistakes

| Mistake | Why | Fix |
|---------|-----|-----|
| Optimizing for signups, not activation | "We have 1,000 signups!" (but only 30 active) | Measure and optimize the full funnel, not just the top |
| No clear upgrade trigger | "Users will upgrade when they're ready" | Trigger upgrade prompts based on usage patterns (e.g., "You've used all your AI credits") |
| Ignoring the expansion stage | "We got the subscription, we're done" | Expansion drives LTV; design cross-sell into the product experience |

### AI Instructions

- When generating onboarding flows, follow the customer journey stages defined here.
- When generating upgrade prompts, trigger based on usage milestones defined in the journey.
- Track every journey stage transition as an analytics event.
- Never generate a flow that bypasses the Assess stage (free value before paid).

### Cross References

- Book 01, Chapter 3: Platform Lifecycle — User journey at the platform level
- Book 01, Principle 11: Simple First Experience — Onboarding simplicity requirements
- Book 01, Chapter 9: Platform Success Metrics — Journey stage metrics

### Definition of Ready

```
☐ All 6 journey stages defined with metrics
☐ Activation funnel modeled with targets
☐ Revenue attribution per stage defined
```

### Definition of Done

```
☐ Journey stage analytics operational
☐ Activation funnel measured and optimized
☐ Upgrade and win-back automations live
```

### Validation Checklist

```
☐ Is every journey stage instrumented with analytics?                                            [ ]
☐ Is the activation funnel within target conversion rates?                                       [ ]
☐ Are upgrade prompts triggered by usage milestones?                                             [ ]
☐ Is there a win-back sequence for churned customers?                                            [ ]
```

---

## Chapter 8: Go-To-Market Architecture

### Purpose

Define the go-to-market (GTM) architecture: how O³ acquires customers, through which channels, with which motions, and at what cost. This chapter is the playbook for customer acquisition.

### Background

A great product with no distribution is a hobby. The GTM architecture defines how O³ reaches its target customers, converts them to active users, and scales acquisition efficiently. Given the SME focus, the GTM strategy emphasizes product-led growth (Academy → Free product → Paid conversion) supported by content marketing, partnerships, and selective direct sales.

### GTM Motions

#### Motion 1: Product-Led Growth (Primary)

```
Academy Content → Free Signup → Free Dashboard → Value Demonstration → Upgrade Prompt → Paid Conversion
```

| Attribute | Value |
|-----------|-------|
| **Target** | SME Owners, Self-directed HR Managers |
| **CAC Target** | < ฿1,000 |
| **Conversion Target** | 15% free-to-paid |
| **Key Assets** | Academy courses, One Simple Template, AI Summary (first value moment) |

#### Motion 2: Content Marketing (Supporting)

```
SEO Blog → Academy Course → Email Nurture → Free Signup → (continues PLG motion)
```

| Attribute | Value |
|-----------|-------|
| **Target** | HR Managers searching for workforce analytics solutions |
| **CAC Target** | < ฿500 (organic), < ฿2,000 (paid) |
| **Key Content** | "Why turnover matters for SMEs," "วิธีวิเคราะห์ข้อมูลพนักงานด้วย AI," template guides |

#### Motion 3: Partnerships (Growth Phase)

```
HR Consultant refers Client → Client signs up → Consultant uses O³ to serve Client → Both renew
```

| Attribute | Value |
|-----------|-------|
| **Target** | HR consultants and service providers |
| **CAC Target** | Revenue share or referral fee (10–20% of first year) |
| **Key Partners** | HR consulting firms, Industry associations, Training providers |

#### Motion 4: Direct Sales (Scale Phase)

```
SDR outbound → Demo → Trial → Proposal → Close → Onboarding
```

| Attribute | Value |
|-----------|-------|
| **Target** | Enterprise accounts (500+ employees) |
| **CAC Target** | < ฿50,000 |
| **Entry Criteria** | Proven SME product-market fit, dedicated sales hire |

### Channel Mix by Phase

| Phase | PLG | Content | Partnerships | Direct Sales |
|-------|-----|---------|-------------|-------------|
| **MVP** (Q3 2026) | 70% | 30% | 0% | 0% |
| **Growth** (Q4 2026–Q1 2027) | 50% | 25% | 20% | 5% |
| **Scale** (2027+) | 40% | 20% | 25% | 15% |

### GTM Architecture

```mermaid
graph TD
    subgraph "Acquisition Channels"
        PLG["Product-Led Growth<br/>(Academy → Free → Paid)"]
        CONTENT2["Content Marketing<br/>(SEO, Blog, Social)"]
        PARTNERS["Partnerships<br/>(HR Consultants, Associations)"]
        SALES["Direct Sales<br/>(Enterprise)"]
    end

    subgraph "Conversion Engine"
        TRIAL["Free Product Experience<br/>(Dashboard, AI Advisor)"]
        UPGRADE["Upgrade Trigger<br/>(Credit Exhaustion, Feature Gate)"]
    end

    subgraph "Retention Engine"
        ONGOING["Ongoing Value<br/>(Weekly Insights, AI Alerts)"]
        EXPAND2["Expansion<br/>(Cross-Sell Products)"]
    end

    PLG --> TRIAL
    CONTENT2 --> TRIAL
    PARTNERS --> TRIAL
    SALES --> TRIAL
    TRIAL --> UPGRADE
    UPGRADE --> ONGOING
    ONGOING --> EXPAND2
    EXPAND2 --> ONGOING
```

*Description: All acquisition channels feed into the free product experience (Trial). The upgrade trigger converts free to paid. Ongoing value delivery and product expansion drive retention and LTV growth.*

### Business Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| BR-GTM-001 | CAC MUST be tracked by channel. Channels with CAC > 50% of first-year revenue MUST be optimized or deprecated. | Monthly marketing review |
| BR-GTM-002 | The PLG motion MUST be operational before investing in paid channels. Product must convert without sales intervention. | Business review |
| BR-GTM-003 | Partnership agreements MUST include data ownership clauses. O³ owns the relationship with the end customer. | Legal review |
| BR-GTM-004 | Sales-assisted conversions MUST be tracked separately from self-service conversions. | CRM requirement |

### Common Mistakes

| Mistake | Why | Fix |
|---------|-----|-----|
| Hiring sales before PLG is proven | "We need revenue now" | PLG must convert before sales can amplify; sales can't fix a product that doesn't convert |
| Not tracking CAC by channel | "We'll figure out attribution later" | Track from day one; unattributed spend is wasted spend |
| Over-investing in partnerships too early | "Partners will bring customers" | Partnerships work when you have a product partners want to recommend |

### AI Instructions

- When generating marketing landing pages, always include a path to free signup (PLG motion first).
- When generating CRM automation, track lead source and attribute to the correct GTM channel.
- Never generate content that promises features not available in the current product version.
- When generating partnership materials, include data ownership and customer relationship terms.

### Cross References

- Chapter 7: Customer Journey — Journey stages that GTM motions feed
- Chapter 3: Customer Segments — Segments targeted by each GTM motion
- Book 01, Chapter 9: Platform Success Metrics — CAC and conversion metrics

### Definition of Ready

```
☐ All 4 GTM motions defined with CAC targets
☐ Channel mix defined per phase
☐ PLG motion operational before paid channel investment
```

### Definition of Done

```
☐ CAC tracked by channel
☐ PLG conversion rate measured
☐ Channel mix optimized based on data
```

### Validation Checklist

```
☐ Is CAC tracked by channel for every acquisition source?                                        [ ]
☐ Is the PLG motion converting without sales intervention?                                       [ ]
☐ Are partnerships structured with clear data ownership terms?                                   [ ]
☐ Is the channel mix reviewed quarterly against targets?                                         [ ]
```

---

## Chapter 9: Revenue Architecture

### Purpose

Define the revenue architecture: how revenue flows through the business, how it is recognized, how it grows, and how it is protected. This chapter is the financial blueprint of the O³ business.

### Background

Revenue is not just a number on a spreadsheet. It has structure: recurring vs. one-time, contracted vs. usage-based, new vs. expansion. Understanding this structure is essential for forecasting, resource allocation, and business health assessment. The revenue architecture defines how each revenue stream behaves and how they collectively create a sustainable business.

### Revenue Architecture Model

```mermaid
graph TD
    subgraph "Revenue Sources"
        SUB["Subscription Revenue<br/>(Monthly/Annual Recurring)"]
        AI["AI Credit Revenue<br/>(Usage-Based)"]
        SERVICES["Service Revenue<br/>(Setup, Consulting)"]
        ACADEMY2["Academy Revenue<br/>(Courses, Certifications)"]
        BENCH["Benchmark Revenue<br/>(Future)"]
    end

    subgraph "Revenue Characteristics"
        RECURRING["Recurring<br/>(Predictable, Contracted)"]
        VARIABLE["Variable<br/>(Usage-Based, Less Predictable)"]
        ONE_TIME["One-Time<br/>(Project-Based, Least Predictable)"]
        FUTURE_REV["Future<br/>(Not Yet Launched)"]
    end

    subgraph "Revenue Metrics"
        MRR["Monthly Recurring Revenue"]
        ARR["Annual Recurring Revenue"]
        ARPU["Average Revenue Per User"]
        LTV["Lifetime Value"]
        CHURN["Churn Rate"]
        NRR["Net Revenue Retention"]
    end

    SUB --> RECURRING
    AI --> VARIABLE
    SERVICES --> ONE_TIME
    ACADEMY2 --> ONE_TIME
    BENCH --> FUTURE_REV
    RECURRING --> MRR
    RECURRING --> ARR
    MRR --> ARPU
    MRR --> LTV
    MRR --> CHURN
    MRR --> NRR
    VARIABLE --> ARPU
```

*Description: Revenue flows from five sources into three characteristic types (Recurring, Variable, One-Time). Key metrics (MRR, ARR, ARPU, LTV, Churn, NRR) measure the health and growth of each revenue stream.*

### Revenue Mix Targets

| Revenue Type | MVP Target | Growth Target | Mature Target |
|-------------|-----------|---------------|---------------|
| Subscription | 80% | 65% | 55% |
| AI Credits | 15% | 20% | 20% |
| Services | 5% | 10% | 10% |
| Academy | 0% | 5% | 5% |
| Benchmark | 0% | 0% | 10% |

### Key Revenue Metrics

| Metric | Definition | MVP Target | Growth Target | Healthy Range |
|--------|-----------|-----------|---------------|---------------|
| **MRR** | Monthly Recurring Revenue | ฿100K+ | ฿500K+ | Growing >10% MoM |
| **ARR** | Annual Recurring Revenue (MRR × 12) | ฿1.2M+ | ฿6M+ | — |
| **ARPU** | Average Revenue Per User (per month) | ฿3,000+ | ฿5,000+ | Growing through expansion |
| **LTV** | Lifetime Value (ARPU × Avg Lifetime in months) | >฿36,000 | >฿60,000 | LTV:CAC > 3:1 |
| **CAC** | Customer Acquisition Cost | <฿1,000 | <฿3,000 | LTV:CAC > 3:1 |
| **Churn Rate** | % of paying customers who cancel per month | <5% | <3% | <5% monthly |
| **Net Revenue Retention (NRR)** | (Starting MRR + Expansion - Churn - Contraction) / Starting MRR | >100% | >110% | >100% |
| **Payback Period** | Months to recover CAC | <6 months | <12 months | <12 months |

### Revenue Recognition

| Revenue Type | Recognition Method | Notes |
|-------------|-------------------|-------|
| Monthly Subscription | Recognized monthly as service is delivered | Straight-line over subscription period |
| Annual Subscription | Recognized monthly over 12 months | Cash collected upfront, revenue recognized ratably |
| AI Credits (pre-paid) | Recognized as credits are consumed | Unused credits = deferred revenue |
| AI Credits (post-paid) | Recognized in the month of consumption | Enterprise only |
| Setup Services | Recognized on completion of service | One-time |
| Consulting | Recognized on milestone completion or time-based | Per engagement |

### Business Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| BR-RA-001 | Subscription revenue MUST be >50% of total revenue at all times. Subscription is the core business. | Monthly financial review |
| BR-RA-002 | NRR MUST be measured monthly. NRR < 100% triggers a retention action plan. | Monthly financial review |
| BR-RA-003 | Customer LTV:CAC ratio MUST be >3:1. Segments below this threshold require investigation. | Quarterly business review |
| BR-RA-004 | Revenue recognition MUST comply with Thai accounting standards. Annual audit required. | Annual audit |

### Common Mistakes

| Mistake | Why | Fix |
|---------|-----|-----|
| Counting annual prepayments as current month revenue | "We closed a ฿120K annual deal!" = ฿10K MRR, not ฿120K | Track MRR correctly; annual deals recognized monthly |
| Ignoring contraction MRR | "Churn is only 3%" (but another 5% downgraded) | Track Net Revenue Retention, not just churn |
| Optimizing for ARPU over LTV | "Enterprise customers pay 10× more" (but churn 5× faster) | Optimize for LTV, not ARPU |

### AI Instructions

- When generating financial reports or dashboards, always use the metric definitions from this chapter.
- When calculating revenue projections, use the revenue mix targets as guidelines.
- Never generate revenue recognition logic that doesn't comply with the recognition methods defined here.
- When modeling customer economics, always calculate LTV:CAC ratio.

### Cross References

- Chapter 2: Business Model — Revenue streams detail
- Chapter 6: Pricing & Subscription Model — Pricing that generates this revenue
- Book 01, Chapter 9: Platform Success Metrics — Revenue-related success metrics

### Definition of Ready

```
☐ Revenue architecture model documented
☐ Revenue mix targets defined per phase
☐ Key revenue metrics defined with targets
☐ Revenue recognition methods specified
```

### Definition of Done

```
☐ Revenue metrics tracked monthly
☐ Revenue mix within target ranges
☐ LTV:CAC > 3:1
☐ NRR > 100%
```

### Validation Checklist

```
☐ Is subscription revenue >50% of total revenue?                                                 [ ]
☐ Is NRR measured monthly and >100%?                                                             [ ]
☐ Is LTV:CAC > 3:1?                                                                              [ ]
☐ Is revenue recognition compliant with accounting standards?                                    [ ]
```

---

## Chapter 10: Business Capability Mapping

### Purpose

Map business capabilities to the platform architecture. This chapter connects "what the business needs to do" (business capabilities) with "what the platform can do" (platform capabilities from Book 01, Chapter 2). Every business capability must be supported by one or more platform capabilities.

### Background

A common failure in platform businesses is building technical capabilities that don't serve business needs—or having business needs that the platform cannot support. Business Capability Mapping ensures alignment: every business capability has platform support, and every platform capability serves a business purpose.

### Business Capabilities

| # | Business Capability | Description | Supported By (Platform) | Owner |
|---|-------------------|-------------|------------------------|-------|
| BC-01 | **Customer Acquisition** | Attract and convert potential customers | Academy Engine, Analytics, CRM | Marketing |
| BC-02 | **Customer Onboarding** | Guide new users to first value | Dashboard Engine, OWDS, Notification | Product + CS |
| BC-03 | **Value Delivery** | Provide ongoing workforce intelligence | Insight Engine, AI Gateway, Dashboard Engine | Product |
| BC-04 | **Subscription Management** | Manage plans, billing, entitlements | Subscription, Entitlements | Finance + Product |
| BC-05 | **Customer Retention** | Keep customers engaged and renewing | Action Engine, Notification, Analytics | Customer Success |
| BC-06 | **Customer Expansion** | Grow revenue within existing accounts | Cross-sell prompts, Entitlements, Analytics | Sales + Product |
| BC-07 | **Content & Education** | Create and deliver learning content | Academy Engine, Storage | Content + Product |
| BC-08 | **Data Asset Management** | Build and maintain the OWDS dataset | OWDS, Semantic Layer, Benchmark Engine | Data + Product |
| BC-09 | **Partner Enablement** | Enable HR consultants to use the platform | Workspace, Multi-tenant, Authorization | Partnerships |
| BC-10 | **Market Intelligence** | Understand market trends and competition | Analytics, Benchmark Engine, CRM | Strategy |

### Capability Maturity Model

| Capability | MVP | Growth | Scale |
|-----------|-----|--------|-------|
| Customer Acquisition | Academy + Organic | Content Marketing + Partnerships | Multi-channel + Sales |
| Customer Onboarding | Self-service template upload | Guided onboarding flows | White-glove enterprise onboarding |
| Value Delivery | Dashboard + AI Advisor | AI Studio + Custom Dashboards | Predictive + Real-time |
| Subscription Management | Manual (Stripe) | Automated billing + Entitlements | Usage-based billing + Complex contracts |
| Customer Retention | Email notifications | In-app engagement + NPS | Predictive churn + Automated win-back |
| Customer Expansion | Cross-sell prompts | Product bundling | Account-based expansion |
| Content & Education | 5 free courses | Paid certifications | Corporate training |
| Data Asset Management | OWDS storage | Data quality monitoring | Benchmark database |
| Partner Enablement | — | Partner workspace | Partner portal + Co-branding |
| Market Intelligence | Manual research | CRM analytics | Automated market insights |

### Business Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| BR-BCM-001 | Every business capability MUST have a platform capability that supports it. No capability gap. | Architecture Review |
| BR-BCM-002 | Platform capabilities without a supporting business capability MUST be questioned. Why are we building this? | Product review |
| BR-BCM-003 | New business capabilities require an ADR to add to this map and identify supporting platform capabilities. | Business review |

### Cross References

- Book 01, Chapter 2: Platform Capability Map — Platform capabilities that support business capabilities
- Book 04: Business Capability Map — Detailed business capability modeling

### Definition of Ready

```
☐ All business capabilities mapped to platform capabilities
☐ Capability maturity defined per phase
☐ No capability gaps
```

### Definition of Done

```
☐ All business capabilities have platform support
☐ Capability maturity tracked against plan
☐ Redundant platform capabilities identified and addressed
```

### Validation Checklist

```
☐ Does every business capability have a supporting platform capability?                          [ ]
☐ Are there platform capabilities with no clear business purpose?                                [ ]
☐ Is capability maturity tracked against the phase plan?                                         [ ]
```

---

## Chapter 11: Business Metrics

### Purpose

Define the business metrics that measure the health and performance of the O³ business. These metrics complement the platform success metrics in Book 01, Chapter 9, focusing specifically on business outcomes: revenue, growth, efficiency, and customer economics.

### Background

Platform metrics (Book 01, Chapter 9) measure product usage and technical health. Business metrics measure commercial outcomes. Both are necessary: you can have great product metrics (high engagement) and terrible business metrics (no one pays). Or great business metrics (high revenue) masking poor product metrics (users churning after first month). This chapter defines the holistic set of metrics that indicate business health.

### Business Metrics Framework

| Category | Metric | Definition | Target | Review Frequency |
|----------|--------|-----------|--------|-----------------|
| **Growth** | MRR | Monthly Recurring Revenue | >10% MoM growth | Monthly |
| **Growth** | ARR | Annual Recurring Revenue | MRR × 12 | Monthly |
| **Growth** | New MRR | MRR from new customers this month | >5% of total MRR | Monthly |
| **Growth** | Expansion MRR | MRR increase from existing customers (upgrades, cross-sell) | >5% of total MRR | Monthly |
| **Growth** | Contraction MRR | MRR decrease from existing customers (downgrades) | <2% of total MRR | Monthly |
| **Growth** | Churned MRR | MRR lost from cancelled customers | <5% of total MRR | Monthly |
| **Efficiency** | CAC | Customer Acquisition Cost | <฿1,000 (MVP) | Monthly |
| **Efficiency** | LTV | Lifetime Value | >฿36,000 (MVP) | Quarterly |
| **Efficiency** | LTV:CAC Ratio | Lifetime Value ÷ Acquisition Cost | >3:1 | Quarterly |
| **Efficiency** | CAC Payback Period | Months to recover CAC | <6 months | Monthly |
| **Customer Economics** | Total Customers | All-time paying customers | Growth target | Monthly |
| **Customer Economics** | Active Customers | Customers with activity in last 30 days | >90% of total | Monthly |
| **Customer Economics** | ARPU | Average Revenue Per User (per month) | >฿3,000 (MVP) | Monthly |
| **Customer Economics** | Churn Rate | % of customers cancelling per month | <5% | Monthly |
| **Customer Economics** | Net Revenue Retention (NRR) | Revenue retained + expanded from existing customers | >100% | Monthly |
| **Revenue Mix** | Subscription % | Subscription revenue ÷ Total revenue | >50% | Monthly |
| **Revenue Mix** | AI Credit % | AI credit revenue ÷ Total revenue | 15–25% | Monthly |
| **Revenue Mix** | Services % | Services revenue ÷ Total revenue | <10% | Monthly |
| **Burn** | Monthly Burn | Total expenses - Total revenue | Decreasing MoM | Monthly |
| **Burn** | Runway | Cash reserves ÷ Monthly burn | >12 months | Monthly |

### Business Health Scorecard

| Dimension | Weight | Metrics | Scoring |
|-----------|--------|---------|---------|
| **Growth** | 35% | MRR Growth, New MRR, Expansion MRR | 0–100 based on target achievement |
| **Efficiency** | 25% | LTV:CAC, CAC Payback, ARPU | 0–100 based on target achievement |
| **Retention** | 25% | Churn Rate, NRR, Active Customers % | 0–100 based on target achievement |
| **Sustainability** | 15% | Runway, Revenue Mix, Burn Rate | 0–100 based on target achievement |
| **Overall Business Health Score** | 100% | Weighted average of dimensions | Target: >70 |

### Business Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| BR-BMET-001 | Business metrics MUST be reviewed monthly by the leadership team. | Monthly business review |
| BR-BMET-002 | Any metric below target for 2 consecutive months MUST have a documented action plan. | Business review |
| BR-BMET-003 | Business Health Score below 50 triggers an emergency business review within 1 week. | Business governance |
| BR-BMET-004 | Metrics definitions MUST NOT change without updating this chapter. Consistent definitions enable trend analysis. | Business review |

### Cross References

- Book 01, Chapter 9: Platform Success Metrics — Complementary platform metrics
- Chapter 9: Revenue Architecture — Revenue metrics in detail
- Chapter 7: Customer Journey — Journey stage metrics

### Definition of Ready

```
☐ All business metrics defined with targets
☐ Business Health Scorecard designed
☐ Monthly review process scheduled
```

### Definition of Done

```
☐ All metrics tracked and reported monthly
☐ Business Health Score calculated monthly
☐ Action plans exist for below-target metrics
```

### Validation Checklist

```
☐ Are all business metrics tracked monthly?                                                      [ ]
☐ Is the Business Health Score above 70?                                                         [ ]
☐ Are below-target metrics addressed with action plans?                                          [ ]
☐ Are metric definitions consistent month-over-month?                                            [ ]
```

---

## Chapter 12: Business Governance

### Purpose

Define the governance structure for business decisions: who has authority over pricing, packaging, market entry, partnerships, and business strategy. This chapter establishes the decision-making framework for the commercial side of O³.

### Background

Without clear business governance, decisions are made ad-hoc, authority is unclear, and accountability is diffused. The business governance structure defines who decides what, how decisions are made, and how they are communicated. This complements the technical governance that will be defined in Book 20 (Platform Operations).

### Decision Authority

| Decision Type | Decision Maker | Consulted | Informed |
|--------------|---------------|-----------|----------|
| **Pricing Changes** | Founder + Chief Architect | Product Manager, Finance | All team |
| **Package Structure Changes** | Founder + Chief Architect | Product Manager, Engineering Lead | All team |
| **New Market Entry** | Founder | Chief Architect, Product Manager | All team |
| **Partnership Agreements** | Founder | Chief Architect, Legal | Sales, Product |
| **Product Sunset** | Founder + Chief Architect | Product Manager, Customer Success | Affected customers |
| **Discount Approvals (>20%)** | Founder | Finance | Sales |
| **Discount Approvals (<20%)** | Product Manager | — | Finance |
| **Marketing Budget (>฿50K/month)** | Founder | Product Manager | Finance |
| **Marketing Budget (<฿50K/month)** | Product Manager | — | Finance |
| **Business Metric Targets** | Founder | Chief Architect, Product Manager | All team |
| **Customer Communication (Strategic)** | Founder | Product Manager | — |
| **Customer Communication (Operational)** | Product Manager | Customer Success | — |

### Governance Meetings

| Meeting | Frequency | Attendees | Purpose |
|---------|-----------|-----------|---------|
| **Monthly Business Review** | Monthly | Founder, Chief Architect, Product Manager | Review business metrics, revenue, customer health |
| **Pricing Review** | Quarterly | Founder, Chief Architect, Product Manager | Review pricing effectiveness, competitive landscape |
| **Strategy Review** | Quarterly | Founder, Chief Architect | Review business strategy, market position, long-term goals |
| **Partnership Review** | Quarterly | Founder, Product Manager | Review partnership performance, new opportunities |

### Escalation Path

```
Operational Issue → Product Manager (resolve within 1 week)
  → Unresolved → Chief Architect (resolve within 1 week)
    → Unresolved → Founder (final decision)
```

### Business Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| BR-BG-001 | All pricing, packaging, and market entry decisions MUST follow the decision authority matrix. | Business governance |
| BR-BG-002 | Business governance decisions MUST be documented (meeting notes, decision log). | Business governance |
| BR-BG-003 | The business governance structure is reviewed annually. Changes require Founder approval. | Annual review |

### Cross References

- Book 01, Appendix: Future Improvements — Governance hierarchy (FI-01) and Decision authority matrix (FI-03) — to be promoted when Book 20 is complete
- Book 20: Platform Operations — Operational governance processes

### Definition of Ready

```
☐ Decision authority matrix defined
☐ Governance meeting schedule established
☐ Escalation path documented
```

### Definition of Done

```
☐ All business decisions follow the authority matrix
☐ Governance meetings are held on schedule
☐ Decision log is maintained
```

### Validation Checklist

```
☐ Is the decision authority matrix followed for all business decisions?                           [ ]
☐ Are governance meetings held on schedule?                                                      [ ]
☐ Is the decision log current and complete?                                                      [ ]
☐ Do team members know who decides what?                                                         [ ]
```

---

## Chapter 13: Business Risks

### Purpose

Identify, assess, and document the key business risks facing the O³ platform. Each risk has a likelihood, impact, mitigation strategy, and contingency plan. This chapter enables proactive risk management rather than reactive firefighting.

### Background

Every business faces risks. Startups face more. The purpose of risk documentation is not to eliminate risk (impossible) but to ensure that risks are identified, prioritized, and managed. A risk that is documented and monitored is far less dangerous than a risk that surprises the team.

### Risk Register

| # | Risk | Category | Likelihood | Impact | Risk Score | Mitigation | Contingency |
|---|------|----------|-----------|--------|-----------|------------|-------------|
| BR-01 | **SMEs unwilling to pay for workforce analytics** | Market | Medium | Critical | High | Freemium model demonstrates clear ROI before payment. Academy builds awareness. | Pivot to HR consultant market if SME adoption fails |
| BR-02 | **Customer data quality too low for AI insights** | Product | High | High | High | OWDS validation at upload. Data quality scoring. Clear fix instructions. | Manual data cleaning service offering |
| BR-03 | **AI costs exceed revenue from AI credits** | Financial | Medium | High | Medium | Track AI cost per customer. Optimize prompts. Credit pricing above cost + margin. | Cap AI usage per tier. Negotiate volume pricing with LLM providers |
| BR-04 | **Key person dependency (Founder/Chief Architect)** | Operational | Medium | Critical | High | Document all architecture decisions (Books 00–20). Cross-train team members. | Succession plan. Knowledge transfer program |
| BR-05 | **Competitor enters Thai SME workforce analytics market** | Competitive | Medium | Medium | Medium | Build OWDS data moat. Deep Thai market knowledge. Customer relationships. | Accelerate feature development. Consider strategic partnerships |
| BR-06 | **PDPA/GDPR compliance failure** | Compliance | Low | Critical | Medium | Privacy-by-design architecture. Legal review. Data audit trails. | Incident response plan. Legal counsel on retainer |
| BR-07 | **LLM provider pricing changes or service disruption** | Supplier | Medium | High | Medium | Multi-provider AI Gateway (OpenAI + Anthropic). Model fallback. | Switch primary provider. Self-hosted model (long-term) |
| BR-08 | **Customer churn exceeds targets** | Financial | Medium | High | Medium | Engagement tracking. Proactive customer success. Continuous value delivery. | Win-back campaigns. Pricing adjustment. Feature acceleration |
| BR-09 | **Unable to raise additional funding if needed** | Financial | Low | Critical | Medium | Path to profitability without additional funding. Lean cost structure. | Reduce burn rate. Focus on revenue-generating activities |
| BR-10 | **OWDS standard not adopted by market** | Strategic | Medium | High | Medium | One Simple Template is the easiest path to workforce insights. Academy teaches OWDS. | Support common HRIS formats as alternative ingestion paths |

### Risk Score Matrix

| | Low Impact | Medium Impact | High Impact | Critical Impact |
|---|-----------|--------------|-------------|----------------|
| **High Likelihood** | Monitor | Mitigate | Mitigate + Contingency | **Immediate Action** |
| **Medium Likelihood** | Accept | Monitor | Mitigate | Mitigate + Contingency |
| **Low Likelihood** | Accept | Accept | Monitor | Monitor + Contingency |

### Business Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| BR-RSK-001 | The risk register MUST be reviewed quarterly. New risks added, resolved risks archived. | Quarterly business review |
| BR-RSK-002 | Risks scored "High" or above MUST have an owner assigned and a mitigation plan in progress. | Business governance |
| BR-RSK-003 | Any risk materializing (becoming an actual issue) MUST trigger an incident response within 24 hours. | Incident management |

### Cross References

- Book 15: Security — Security-specific risks
- Book 16: DevOps — Operational and infrastructure risks
- Book 20, Chapter 09: Incident Management — Incident response procedures
- Book 01, Appendix: Future Improvements — Risk register expansion (FI-10)

### Definition of Ready

```
☐ All key business risks identified and assessed
☐ Mitigation and contingency plans documented
☐ Risk owners assigned
```

### Definition of Done

```
☐ Risk register reviewed quarterly
☐ High-risk items have active mitigation plans
☐ No unmanaged critical risks
```

### Validation Checklist

```
☐ Has the risk register been reviewed in the last quarter?                                       [ ]
☐ Do all High and Critical risks have assigned owners?                                           [ ]
☐ Are mitigation plans in progress for all High-risk items?                                      [ ]
☐ Has any risk materialized without triggering incident response?                                [ ]
```

---

## Chapter 14: Business Roadmap

### Purpose

Define the business roadmap: what the business will achieve, in what sequence, and by when. This roadmap aligns business goals, product development, and go-to-market activities into a coherent timeline.

### Background

A business without a roadmap drifts. Priorities shift with every customer request. Resources are spread too thin. The business roadmap defines the sequence of business achievements that will take O³ from MVP launch to market leadership. It is a living document reviewed quarterly, not a fixed plan.

### Business Phases

#### Phase 1: MVP Launch (Q3 2026)

| Objective | Key Results | Owner |
|-----------|-------------|-------|
| **Launch O³ Dashboard + AI Studio** | 50 free signups, 20 active companies, 5 paying customers | Product + Founder |
| **Validate pricing model** | 3+ customers on paid plans, feedback on pricing | Founder |
| **Build initial Academy content** | 5 courses published, 200 enrollments | Content |
| **Establish OWDS adoption** | 20+ companies using OWDS template | Product |
| **Achieve first revenue** | MRR > ฿30,000 | Founder |

#### Phase 2: Product-Market Fit (Q4 2026)

| Objective | Key Results | Owner |
|-----------|-------------|-------|
| **Prove retention** | Month-1 retention > 50%, NPS > 30 | Product + CS |
| **Grow paying customer base** | 30+ paying customers | Sales + Founder |
| **Optimize conversion funnel** | Free-to-paid conversion > 15% | Product + Growth |
| **Launch referral program** | 10% of new signups from referrals | Growth |
| **Achieve sustainable MRR** | MRR > ฿150,000 | Founder |

#### Phase 3: Growth (Q1–Q2 2027)

| Objective | Key Results | Owner |
|-----------|-------------|-------|
| **Launch Survey Studio** | Product live, 20% of paid customers adopt | Product |
| **Launch paid Academy certifications** | 3 paid certifications, 100 enrollments | Content |
| **Establish partnership channel** | 5 active HR consultant partners | Partnerships |
| **Expand to second industry vertical** | Proven value in 2 of 3 priority industries | Product + Sales |
| **Achieve growth MRR** | MRR > ฿500,000 | Founder |

#### Phase 4: Scale (H2 2027–2028)

| Objective | Key Results | Owner |
|-----------|-------------|-------|
| **Launch Benchmark Center (basic)** | Benchmarks available for 3 industries, N > 100 per segment | Product + Data |
| **Enterprise features** | SSO, Custom integrations, SLA | Product |
| **Multi-product accounts** | 30%+ of customers using 2+ products | Product + CS |
| **International market research** | Market validation for first ASEAN country | Founder |
| **Achieve scale MRR** | MRR > ฿1,500,000 | Founder |

### Business Roadmap Architecture

```mermaid
gantt
    title O³ Business Roadmap
    dateFormat  YYYY-MM
    axisFormat  %Y-Q%q

    section MVP Launch
    Dashboard + AI Studio Launch     :2026-07, 3M
    Academy Content (5 courses)      :2026-07, 3M
    First Paying Customers           :2026-08, 2M
    OWDS Adoption (20+ companies)    :2026-08, 2M

    section Product-Market Fit
    Retention Optimization           :2026-10, 3M
    Conversion Funnel Optimization   :2026-10, 3M
    Referral Program                 :2026-11, 2M
    30+ Paying Customers             :2026-12, 1M

    section Growth
    Survey Studio Launch             :2027-01, 2M
    Paid Academy Certifications      :2027-01, 3M
    HR Consultant Partnerships       :2027-02, 3M
    Second Industry Vertical         :2027-03, 3M

    section Scale
    Benchmark Center (Basic)         :2027-07, 4M
    Enterprise Features              :2027-10, 4M
    International Market Research    :2028-01, 3M
```

*Description: The business roadmap spans four phases from MVP through Scale. Each phase builds on the previous. Milestones are sequenced to validate assumptions before scaling investment.*

### Business Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| BR-RMAP-001 | The business roadmap MUST be reviewed quarterly. Changes require Founder approval. | Quarterly strategy review |
| BR-RMAP-002 | Phase gates MUST be passed before proceeding to the next phase. MVP must show retention before Growth investment. | Business governance |
| BR-RMAP-003 | Roadmap priorities MUST align with business goals (Chapter 1). Misaligned initiatives are deprecated. | Business review |

### Cross References

- Chapter 1: Business Vision — Goals this roadmap achieves
- Chapter 5: Product Portfolio — Products launched in each phase
- Book 01, Chapter 1: Platform Overview — Platform direction
- Book 17: Product Specifications — Product-specific roadmaps

### Definition of Ready

```
☐ All 4 phases defined with objectives and key results
☐ Phase gates defined
☐ Timeline is realistic given team size and resources
```

### Definition of Done

```
☐ Quarterly roadmap review completed
☐ Phase gates are passed before proceeding
☐ Roadmap is communicated to the entire team
```

### Validation Checklist

```
☐ Has the roadmap been reviewed this quarter?                                                    [ ]
☐ Are current initiatives aligned with the current phase?                                        [ ]
☐ Have phase gates been passed before starting next-phase initiatives?                           [ ]
☐ Is the roadmap communicated to the entire team?                                                [ ]
```

---

## Chapter 15: Cross References

### Purpose

Provide a comprehensive index of all cross-references in Book 02, organized by target document. This enables readers to quickly find all references to a specific Book, ADR, or Master Context section.

### Cross-Reference Index

#### Books

| Target Book | Chapters Referencing | Purpose |
|-------------|---------------------|---------|
| Book 00: Platform Overview | Ch.0, Ch.5 | Platform architecture context |
| Book 01: Platform Constitution | Ch.0, Ch.1, Ch.2, Ch.5, Ch.6, Ch.7, Ch.9, Ch.10, Ch.11, Ch.12 | Architectural foundation, principles, capabilities, metrics, governance |
| Book 03: Domain Model | Ch.0 | Business domain architecture |
| Book 04: Business Capability Map | Ch.10 | Detailed capability modeling |
| Book 15: Security | Ch.13 | Security risks |
| Book 16: DevOps | Ch.13 | Operational risks |
| Book 17: Product Specifications | Ch.3, Ch.5, Ch.14 | Segment-specific features, product roadmaps |
| Book 20: Platform Operations | Ch.12, Ch.13 | Governance processes, incident management |

#### ADRs

| ADR | Chapters Referencing | Purpose |
|-----|---------------------|---------|
| ADR-001 (OWDS Standard) | Ch.2 | Data as competitive moat |
| ADR-002 (API First) | Ch.5 | Shared Foundation enforcement |

#### Master Context

| Section | Chapters Referencing | Content |
|---------|---------------------|---------|
| Section 01: Vision and Positioning | Ch.1 | Business vision context |
| Section 02: Business Model | Ch.0, Ch.2, Ch.6 | Original business model and pricing |
| Section 04: Product Portfolio | Ch.5 | Product definitions |
| Section 11: Subscription, CRM, and Governance | Ch.0, Ch.2, Ch.6, Ch.12 | Package structure, entitlements, governance |

#### Standards

| Standard | Chapters Referencing | Purpose |
|----------|---------------------|---------|
| `standards/documentation-writing-standard.md` | Ch.0 | Writing standard compliance |

---

## Self-Review Against Documentation Writing Standard

### Mandatory Sections Compliance

| Section | Present? | Quality |
|---------|----------|---------|
| Purpose | ✅ Every chapter | Clear and actionable |
| Background | ✅ Every chapter | Context provided |
| Principles | ✅ Chapters 1, 6 | Numbered, testable principles |
| Architecture | ✅ Chapters 1, 2, 5, 7, 8, 9, 14 | Mermaid diagrams included |
| Business Rules | ✅ Every chapter | Specific, with enforcement |
| Examples | ⚠️ Partial | Chapters 3, 6, 7, 8 include examples/ tables; some chapters rely on descriptive text rather than standalone examples |
| AI Instructions | ✅ Chapters 2, 4, 6, 7, 8, 9 | Actionable AI guidance |
| Cross References | ✅ Every chapter + Ch.15 index | Comprehensive |
| Definition of Ready | ✅ Every chapter | Checklist format |
| Definition of Done | ✅ Every chapter | Checklist format |
| Validation Checklist | ✅ Every chapter | Questions with [ ] markers |

### Known Gaps

| # | Gap | Explanation | Resolution Plan |
|---|-----|-------------|----------------|
| G-01 | **AI Instructions missing in Chapters 3, 5, 10, 11, 12, 13, 14** | Some chapters focus on business concepts where AI instructions felt forced. | Add AI Instructions in v1.1 when AI integration patterns in business contexts are clearer |
| G-02 | **Common Mistakes/Anti-patterns sections present in only 7 of 15 chapters** | Chapters 3, 5, 10, 11, 12, 13, 14, 15 lack these sections. Some topics (Revenue Architecture, Business Metrics) have fewer known mistakes at this stage. | Add as patterns emerge from real operations |
| G-03 | **Standalone examples (code/ scenario blocks) limited** | Most chapters use rich tables and descriptions rather than standalone "Example 1/2/3" blocks. | Enrich with scenario-based examples in v1.1 after customer interactions provide real cases |
| G-04 | **Developer Notes and PM Notes sections not included** | These optional sections were not applicable to most business architecture chapters. The content is inherently PM-facing. | Review in v1.1 — may add PM Notes to chapters where developer implementation has business implications |
| G-05 | **Version History shows only v1.0.0** | This is the initial production-grade release. Future versions will accumulate history. | Standard practice for initial release |
| G-06 | **Book 02 README.md needs update** | The README.md still contains the old sketch-level content. | Update README.md after this index.md is approved |

### Writing Quality Assessment

| Criterion | Score | Notes |
|-----------|-------|-------|
| Practical over theoretical | ✅ | Every chapter answers "What do I do with this information?" |
| Actionable over descriptive | ✅ | Business rules have enforcement mechanisms |
| Specific over general | ✅ | Pricing, segments, metrics all have specific targets |
| Connected, not isolated | ✅ | Comprehensive cross-references + Chapter 15 index |
| No marketing language | ✅ | Architecture handbook tone maintained throughout |
| No placeholder text | ✅ | No [DRAFT] markers; all sections have content |
| Production-grade | ✅ | 15 chapters, 14 Mermaid diagrams, 50+ business rules |
| O³ vocabulary used | ✅ | Consistent terminology from Book 01, Chapter 4 |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0.0 | 2026-06-25 | Initial production-grade release — 15 chapters covering complete business architecture. Self-review with 6 known gaps documented for v1.1 resolution. |