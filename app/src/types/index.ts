/**
 * @file src/types/index.ts
 * @description Central types barrel. Exposes shared TypeScript types and adds prediction-related contracts.
 * @author Crafted By Jedar-Agency.com Tech Team
 */

// Re-export existing type modules for compatibility with `import ... from '../types'`
// Use selective, type-only re-exports to avoid name collisions (e.g., ToastNotification)
export type { KPIExplanation } from './beyond-kpis';
export type { CampaignContext, BudgetReasoning } from './beyond-budget';
export type {
  Report,
  WorkflowTask,
  TaskStatus,
  TaskPriority,
  ExportableSection,
  SocialPlatform,
  ReportExport
} from './export';
export type {
  TacticCategory,
  TacticImpact,
  TacticDifficulty,
  FunnelStageName,
  FunnelStage,
  GrowthTactic
} from './growth';
export type {
  RecommendationCategory,
  RecommendationImpact,
  TechnicalRecommendation
} from './recommendations';
export type {} from './media-plan';

// Re-export app-level types so consumers can uniformly import from 'src/types'
export type {
  CampaignData,
  BrandContext,
  UIWarning,
  UserPreset,
  KpiSet,
  AdvancedInsightsSet
} from '../../types';

/** يمثل سؤالاً ديناميكياً يُعرض في الواجهة حسب سياق الصناعة. */
export interface ContextualQuestion {
    id: string;
    label: string;
    /** نوع الحقل: select | text | multi-select. الافتراضي select */
    type?: 'select' | 'text' | 'multi-select';
    /** قائمة الخيارات إن وجدت. إذا لم توجد سيكون الحقل نصياً اختيارياً */
    options: string[];
}

/**
 * يمثل حزمة الإعدادات المتوقعة من محرك التنبؤ.
 * هو جزء من CampaignData ويركز فقط على الحقول القابلة للتنبؤ.
 */
export interface PredictedSettings {
    platforms?: string[];
    funnelStage?: 'awareness' | 'consideration' | 'conversion';
    // يمكن إضافة حقول قابلة للتنبؤ لاحقاً
}

/** يمثل الخرج الكامل لخوارزمية التنبؤ، بما في ذلك الأسئلة الديناميكية. */
export interface PredictionOutput {
    settings: PredictedSettings;
    questions: ContextualQuestion[];
}

// ===== PERSONA DATA TYPES =====
// Types for the new Audience Intelligence Engine

/** يحدد الملف الشخصي الرقمي والسلوك للشريحة الديموغرافية المحددة. */
export interface DemographicPersona {
  /** المنصات التي تكون فيها هذه الشريحة أكثر نشاطاً واستجابة للإعلانات. */
  dominantPlatforms: string[];
  
  /** نوع المحتوى الإعلاني الذي يحقق أفضل أداء مع هذه الشريحة. */
  contentPreference: 'short_video' | 'detailed_content' | 'visual_story' | 'text_heavy';
  
  /** مقياس نوعي لقوة الإنفاق لهذه الشريحة. */
  spendingPower: 'low' | 'medium' | 'high' | 'very_high';
  
  /** الدوافع النفسية الأساسية التي تؤثر على قراراتهم الشرائية. */
  decisionDrivers: ('trends' | 'social_proof' | 'quality' | 'trust' | 'reviews' | 'price' | 'brand_name')[];
  
  /** الطريقة النموذجية التي تتبعها هذه الشريحة لإتمام عملية شراء عبر الإنترنت. */
  conversionBehavior: 'impulse_buy' | 'researched_purchase' | 'comparison_shopping';
}

/** يحدد الميول الخاصة التي تنطبق بناءً على الجنس. */
export interface GenderAffinity {
  /** معدلات تفضيل المنصات (مثال: 1.2 يعني زيادة 20% في الميول). */
  platformAffinity?: { [platformId: string]: number };

  /** فئات الأعمال التي يُظهر هذا الجنس اهتماماً أكبر بها. */
  categoryAffinity?: string[];
  
  /** مدى حساسية هذه الشريحة لجودة وإبداع الإعلان. */
  adSensitivity?: 'low' | 'medium' | 'high';
}

/** يمثل مجموعة معدلات الأداء المحسوبة بواسطة محرك الميول. */
export interface AffinityModifiers {
  cpm_mod: number;
  ctr_mod: number;
  cvr_mod: number;
}


