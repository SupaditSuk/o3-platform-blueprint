# 08 AI Strategy

## AI Role in O³

AI is not a standalone feature. AI is embedded across the platform to explain, recommend, summarize, generate, and guide action.

AI should help users answer:

- What is happening?
- Why does it matter?
- What is the risk?
- What should we do next?
- What data is missing?

## AI Gateway

All AI calls should go through an AI Gateway.

The AI Gateway should manage:

- Model selection
- Prompt templates
- Context injection
- Usage logging
- Credits
- Safety rules
- Output schema
- Error handling
- Cost control

Products should not call AI models directly.

## AI Context Layer

AI should not read raw database tables directly. It should receive structured context from a context layer.

Context may include:

- Company profile
- Industry
- Employee size
- Relevant metrics
- Data quality status
- Selected time period
- User role
- Package permission
- Relevant decision rules

## AI Must Explain

Every AI recommendation should include:

- Summary
- Evidence
- Interpretation
- Recommended action
- Confidence level
- Limitations
- Data needed for better answer

## AI Should Not Hallucinate Business Facts

If data is missing, AI must say so.

Example:

> I cannot determine whether pay is the main cause of resignation because salary competitiveness data is not available. However, exit reasons show that 38 percent of voluntary exits mention better pay.

## AI Tools Pattern

Every AI tool should follow this pattern:

1. Input
2. Validation
3. Context retrieval
4. Prompt execution
5. Structured output
6. Explanation
7. Confidence
8. Action plan
9. Export or save

## AI Advisor Pattern

AI Advisor should support natural language questions but still use structured company context.

Example question:

> Why is turnover in Sales high?

AI should retrieve:

- Department headcount
- Exit records
- Exit reasons
- Performance of leavers
- Tenure of leavers
- Survey scores
- Pay satisfaction if available

Then respond with evidence and actions.

## AI Credit System

AI usage should be tied to package and credits.

Track:

- User
- Company
- Product
- Tool
- Prompt type
- Tokens or estimated cost
- Response status
- Timestamp

## AI Guardrails

AI should avoid:

- Legal certainty in labor law matters.
- Unsupported claims.
- Sensitive personal judgments.
- Discriminatory recommendations.
- Revealing confidential employee-level data to unauthorized users.

## AI Differentiation

Generic AI can answer broadly. O³ AI should answer with:

- Company context
- Workforce data
- HR business logic
- Decision knowledge base
- Thai SME context
- Action playbooks

