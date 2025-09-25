import { IconType } from 'react-icons';

export type Page = 'home' | 'export-center' | 'playground' | 'processing' | 'results-dashboard';

export type SocialPlatformId = 'meta' | 'google_ads' | 'youtube' | 'tiktok' | 'snapchat' | 'x' | 'linkedin' | 'programmatic';


export interface KPI {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

export interface BudgetSplitItem {
  platform: SocialPlatformId;
  budget: number;
  percentage: number;
}

export interface PlatformInfo {
  name: string;
  icon: IconType;
  color: string;
}

// == New Types for Playground ==

/** Defines the structure for the brand context, which can be enhanced by AI. */
export interface BrandContext {
  brandName: string;
  website: string;
  usp: string;
  brandTone: string;
  extraDetails: string;
}

/** Defines the complete data structure for a campaign plan input. */
export interface CampaignData {
  brandContext: BrandContext;
  industry: string;
  subIndustry: string;
  budget: number;
  duration: string;
  targetAudience: {
    age: string[];
    gender: string;
    locations: string[];
    interests: string[];
    behaviors: string[];
  };
  competitorAnalysis: {
    mainCompetitors: string[];
    estimatedSpend: string;
  };
  goals: string[];
  subGoals: { [key: string]: string[] };
  expectedRoas: string;
  platforms: string[];
  seasons: string[];
  profitMargin: number;
  conversionDefinition: 'purchase' | 'lead' | 'install';
  funnelStage: 'awareness' | 'consideration' | 'conversion';
  creativeType: 'video' | 'static' | 'carousel';
  aov: number;
  competitorContext: 'high' | 'low';
  /** Answers to dynamic contextual questions keyed by question id */
  contextualAnswers?: Record<string, string | string[]>;
}

/** Defines the structure for a user-saved preset. */
export interface UserPreset {
  id: number;
  name: string;
  data: CampaignData;
}

/** Defines the structure for UI warnings shown to the user. */
export interface UIWarning {
    code: string;
    field?: keyof CampaignData | 'general';
    message?: string;
    severity: 'low' | 'medium' | 'high';
    context?: any;
}

export interface KPIExplanation {
  kpiName: string;
  explanation: string;
  kpiValue: number | string;
}

export type CampaignPreset = {
  name: string;
  icon: string;
  industries: string[];
  data: {
    budget: number;
    duration: "short" | "medium" | "long" | "always_on";
    goals: string[];
    platforms: string[];
  };
};

export interface KpiSet {
    budget: number;
    impressions: number;
    clicks: number;
    ctr: number;
    cpm: number;
    cpc: number;
    conversions: number;
    cvr: number;
    revenue: number;
    roas: number;
    arpu: number;
    cac: number;
    cpa: number;
    breakEvenRoas: number;
}

export interface ValidationFlag {
    kpi: string;
    issue: string;
    severity: 'low' | 'medium' | 'high';
    message: string;
    expected: string;
    actual: string;
}

export interface AdvancedInsight {
    title: string;
    value: number;
    status: 'neutral' | 'above' | 'below';
    insight: string;
    benchmark?: number;
}

export interface AdvancedInsightsSet {
    arpu: AdvancedInsight;
    cac: AdvancedInsight;
    breakEvenRoas: AdvancedInsight;
    seasonalLift: {
        applied: string[];
        insight: string;
    };
    budgetReasoning?: { title: string; detail: string; }[];
}

export interface Correction {
  field: string;
  from?: number;
  to: number;
  rule: string;
}

export interface CampaignReport {
    industry: string;
    goals: string[];
    funnelStage: 'awareness' | 'consideration' | 'conversion';
    narrative: string;
    recommendations: string[];
    explainability: {
        "توزيع الميزانية": string;
        "تقدير العائد (ROAS)": string;
        "تكلفة اكتساب العميل (CAC)": string;
        kpiExplanations?: KPIExplanation[];
    };
    confidence: number;
    budgetAllocation: { [platform: string]: number };
    kpis: {
        totals: KpiSet;
        perPlatform: { [platform: string]: KpiSet };
    };
    advancedInsights: AdvancedInsightsSet;
    anomalies: ValidationFlag[];
    corrections: Correction[];
    aiChecks: {
        roas_budget_identity_ok: boolean;
        arpu_revenue_identity_ok: boolean;
        awareness_finance_zero_ok: boolean;
    };
    uiWarnings: UIWarning[];
    trace: {
        seasonResolution: any;
        platformCompatibility: any;
        validationSummary: {
            anomaliesCount: number;
            correctionsCount: number;
        };
        timestamp: string;
    };
    traceId: string;
    competitorMirror?: {
        summary: string;
        budgetAllocation: { [platform: string]: number };
        kpis: {
            totals: KpiSet;
            perPlatform: { [platform: string]: KpiSet };
        };
    };
}