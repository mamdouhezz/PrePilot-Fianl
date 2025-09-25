# PrePilot Engine Documentation (v1.0)

This document provides a technical overview of the PrePilot engine, its validation layers, and data processing flow.

## 1. Flow Overview

The engine processes campaign data through a sequential pipeline to ensure accuracy, realism, and strategic alignment.

```
[CampaignData Input]
        |
        v
[1. Input Validation]
   - Min Budget (Global & Industry-specific)
   - Platform Compatibility
   - Season Conflicts & Count (resolveSeasons)
        |
        v
[2. Budget Allocation]
   - Industry-based split
   - Tactical reallocation for high competition
        |
        v
[3. Core KPI Engine (_calculateKpis)]
   - Load benchmarks (Platform, Industry)
   - Apply multipliers (Season, Creative, Competition, Audience) with caps
   - Calculate raw KPIs per platform
        |
        v
[4. Guardrails & Clamping (validateAndClampKpis)]
   - Clamp KPI ranges (CTR, CVR)
   - Apply dynamic bounds (CPC, CPM)
   - Adjust conversions based on industry CAC
        |
        v
[5. Financial Reconciliation (reconcileFinancials)]
   - Funnel Gating (Zero-out financials for non-conversion goals)
   - Clamp ARPU & ROAS to industry max
   - Enforce Golden Identity: ROAS ≈ AOV / CAC (±20%)
        |
        v
[6. AI Post-Checks & Reporting]
   - Send final validated KPIs to Gemini AI
   - AI performs logical checks (e.g., roas_budget_identity_ok)
   - AI generates narrative, recommendations, and rewrites insights
        |
        v
[Final CampaignReport Output]
```

## 2. Guardrails & Clamping Table

The engine applies several layers of checks to prevent unrealistic KPI generation.

| KPI               | Min Value                                   | Max Value                                   | Source File                 |
| ----------------- | ------------------------------------------- | ------------------------------------------- | --------------------------- |
| **ROAS**          | `validationBenchmarks[industry].ROAS.min`   | `validationBenchmarks[industry].ROAS.max`   | `reconcile.ts`              |
| **ARPU**          | `validationBenchmarks[industry].ARPU.min`   | `validationBenchmarks[industry].ARPU.max`   | `reconcile.ts`              |
| **CTR (Total)**   | `validationBenchmarks[industry].CTR.min`    | `validationBenchmarks[industry].CTR.max`    | `benchmarkChecks.ts`        |
| **CVR (Total)**   | `validationBenchmarks[industry].CVR.min`    | `validationBenchmarks[industry].CVR.max`    | `benchmarkChecks.ts`        |
| **CPC (Platform)**| `0.5 * platform.avg_CPC`                    | `3.0 * platform.avg_CPC`                    | `benchmarkChecks.ts`        |
| **CPM (Platform)**| `0.5 * platform.avg_CPM`                    | `3.0 * platform.avg_CPM`                    | `benchmarkChecks.ts`        |
| **Conversions**   | `0.25 * (budget / industry.avg_CAC)`        | `4.0 * (budget / industry.avg_CAC)`         | `benchmarkChecks.ts`        |

## 3. Validation Rules

These rules are checked before any calculations begin. Failure results in an error returned to the user.

- **Global Minimum Budget**: Must be ≥ 5,000 SAR.
- **Industry Minimum Budget**: Must be ≥ `industryMinBudgetSAR[industry]` (e.g., 50,000 SAR for Real Estate).
- **Profit Margin**: Must be > 0 for `breakEvenRoas` calculation.
- **Average Order Value (AOV)**: Must be ≥ 1 if provided.
- **Selected Seasons**: Maximum of 2 active seasons after resolving conflicts.
- **Platform Compatibility**:
  - **Incompatible**: A warning (`medium` severity) is generated if a selected platform is not in the `allow` list for the industry.
  - **Discouraged**: A warning (`low` severity) is generated if a platform is in the `discourage` list.

## 4. Reconciliation Layer Explained

The `reconcileFinancials` function is the final authority on all financial KPIs. It runs *after* behavioral KPIs (CTR, CVR, etc.) are clamped.

1.  **Funnel Gating**: If the `funnelStage` is not `conversion`, all financial metrics (`revenue`, `roas`, `arpu`) are immediately set to 0.
2.  **AOV Determination**: The function determines the final AOV to be used, prioritizing user input over industry averages for `purchase` conversions.
3.  **ARPU & ROAS Clamping**: It first clamps `ARPU` to the industry maximum, recalculating revenue. Then, it clamps `ROAS` to its industry maximum, again recalculating revenue. The *lower* of the two resulting revenues is used to ensure both caps are respected.
4.  **Golden Identity (ROAS ≈ AOV / CAC)**: The function calculates the "expected" ROAS from the AOV and CAC. If the actual ROAS deviates by more than 20%, it is adjusted to match the expected value (while still respecting min/max caps). Revenue and ARPU are then recalculated from this final, consistent ROAS.

## 5. AI Post-Checks

After all engine calculations are complete, the final, validated KPIs are sent to the Gemini AI with instructions to perform three logical checks. An `ai_postcheck_failed` anomaly is added if any of these return `false`.

```json
{
  "checks": {
    "roas_budget_identity_ok": true,
    "arpu_revenue_identity_ok": true,
    "awareness_finance_zero_ok": true
  }
}
```

- `roas_budget_identity_ok`: Confirms `ROAS ≈ Revenue / Budget`.
- `arpu_revenue_identity_ok`: Confirms `ARPU ≈ Revenue / Conversions`.
- `awareness_finance_zero_ok`: Confirms financials are zero for awareness campaigns.

## 6. Default Dashboard Layout

This section documents the modern dashboard layout for the results page, which is now the default and only view.

### Architecture

- **`DashboardLayout.tsx`**: A root component that establishes a two-column layout with a collapsible, stateful sidebar and a scrollable `<main>` for content. It is fully RTL-aware.
- **`SidebarNav.tsx`**: Renders the navigation links within the sidebar, supporting both expanded and collapsed states.
- **`SectionAnchor.tsx`**: Wraps each logical block of the report in a `<section>` with a stable `id`, enabling anchor-based navigation.
- **`StickyHeader.tsx`**: A header component that remains fixed at the top of the main content area, providing persistent access to primary actions like saving, exporting, and view toggling.

### Feature Summary
- **Modular Grid**: The main content area uses a responsive CSS Grid to organize report cards into thematic clusters.
- **Collapsible Sidebar**: The sidebar can be collapsed to an icon-only view to maximize content space, with its state persisted in `localStorage`.
- **Scroll-Spy Navigation**: The sidebar automatically highlights the section currently in the user's viewport.

#### Section ID Mapping
| ID                  | Title                      |
| ------------------- | -------------------------- |
| `summary`           | الملخص                     |
| `performance`       | الأداء والتوزيع            |
| `advanced-insights` | رؤى متقدمة                 |
| `diagnostics`       | التشخيص                    |
| `recommendations`   | التوصيات                   |
| `what-if`           | مختبر السيناريوهات         |
| `competitors`       | المنافسون                  |

## 7. Example Trace (TC15 - RealEstate Huge AOV Stress)

```json
{
  "input": {
    "industry": "عقارات",
    "budget": 100000,
    "aov": 500000,
    "funnelStage": "conversion"
  },
  "trace": {
    "validationSummary": {
      "anomaliesCount": 2,
      "correctionsCount": 2
    }
  },
  "anomalies": [
    {
      "kpi": "ARPU",
      "issue": "unrealistic",
      "severity": "high",
      "message": "ARPU adjusted to industry cap."
    },
    {
      "kpi": "ROAS",
      "issue": "unrealistic",
      "severity": "high",
      "message": "ROAS adjusted to industry cap."
    }
  ],
  "corrections": [
    {
      "field": "ARPU",
      "from": 500000,
      "to": 25000,
      "rule": "Clamp to industry ARPU.max"
    },
    {
      "field": "ROAS",
      "from": 85.5,
      "to": 15.0,
      "rule": "Clamp to industry ROAS.max"
    }
  ],
  "kpis": {
    "totals": {
      "roas": 15,
      "arpu": 12500.75
    }
  }
}
```