/**
 * Goal Weights - Single Source of Truth
 * Contains weights for adjusting budget allocation based on campaign goals
 */

export const goalWeights = {
  // Campaign goal weights for platform allocation
  goals: {
    'Awareness': {
      weights: { 
        meta: 1.15, 
        tiktok: 1.25, 
        youtube: 1.20, 
        snapchat: 1.10, 
        google_ads: 0.85, 
        linkedin: 0.70, 
        x: 0.80, 
        programmatic: 0.90 
      },
      focus: 'reach_and_impressions',
      bestPlatforms: ['tiktok', 'youtube', 'meta'],
      notes: 'التركيز على الوصول والمشاهدات'
    },
    
    'Traffic': {
      weights: { 
        google_ads: 1.25, 
        meta: 1.10, 
        linkedin: 1.05, 
        tiktok: 0.95, 
        youtube: 0.90, 
        snapchat: 0.85, 
        x: 0.80, 
        programmatic: 1.00 
      },
      focus: 'clicks_and_website_visits',
      bestPlatforms: ['google_ads', 'meta'],
      notes: 'التركيز على النقرات وزيارات الموقع'
    },
    
    'Leads': {
      weights: { 
        google_ads: 1.30, 
        linkedin: 1.25, 
        meta: 1.15, 
        x: 1.05, 
        youtube: 0.95, 
        tiktok: 0.85, 
        snapchat: 0.80, 
        programmatic: 0.90 
      },
      focus: 'lead_generation_and_forms',
      bestPlatforms: ['google_ads', 'linkedin', 'meta'],
      notes: 'التركيز على توليد العملاء المحتملين'
    },
    
    'Sales': {
      weights: { 
        meta: 1.20, 
        google_ads: 1.15, 
        tiktok: 1.05, 
        snapchat: 1.00, 
        youtube: 0.95, 
        linkedin: 0.90, 
        x: 0.85, 
        programmatic: 1.10 
      },
      focus: 'conversions_and_revenue',
      bestPlatforms: ['meta', 'google_ads'],
      notes: 'التركيز على المبيعات والإيرادات'
    },
    
    'Engagement': {
      weights: { 
        tiktok: 1.30, 
        snapchat: 1.20, 
        meta: 1.15, 
        youtube: 1.10, 
        x: 1.05, 
        google_ads: 0.80, 
        linkedin: 0.85, 
        programmatic: 0.90 
      },
      focus: 'interactions_and_social_engagement',
      bestPlatforms: ['tiktok', 'snapchat', 'meta'],
      notes: 'التركيز على التفاعل والمشاركة الاجتماعية'
    },
    
    'Brand_Recognition': {
      weights: { 
        youtube: 1.25, 
        meta: 1.15, 
        tiktok: 1.20, 
        google_ads: 0.90, 
        linkedin: 1.00, 
        snapchat: 1.05, 
        x: 0.95, 
        programmatic: 0.85 
      },
      focus: 'brand_awareness_and_recognition',
      bestPlatforms: ['youtube', 'tiktok', 'meta'],
      notes: 'التركيز على الوعي بالعلامة التجارية'
    },
    
    'Retargeting': {
      weights: { 
        meta: 1.35, 
        google_ads: 1.25, 
        programmatic: 1.20, 
        linkedin: 1.10, 
        tiktok: 0.90, 
        snapchat: 0.85, 
        youtube: 0.95, 
        x: 0.80 
      },
      focus: 're_engagement_and_conversion',
      bestPlatforms: ['meta', 'google_ads', 'programmatic'],
      notes: 'التركيز على إعادة الاستهداف والتحويل'
    }
  },
  
  // Funnel stage weights
  funnelStages: {
    'Top_of_Funnel': {
      weights: { 
        tiktok: 1.30, 
        youtube: 1.25, 
        meta: 1.15, 
        snapchat: 1.10, 
        google_ads: 0.85, 
        linkedin: 0.70, 
        x: 0.80, 
        programmatic: 0.90 
      },
      focus: 'awareness_and_discovery',
      notes: 'مرحلة الاكتشاف والوعي'
    },
    
    'Middle_of_Funnel': {
      weights: { 
        meta: 1.20, 
        google_ads: 1.15, 
        linkedin: 1.10, 
        youtube: 1.05, 
        tiktok: 1.00, 
        snapchat: 0.95, 
        x: 0.90, 
        programmatic: 1.00 
      },
      focus: 'consideration_and_evaluation',
      notes: 'مرحلة التفكير والتقييم'
    },
    
    'Bottom_of_Funnel': {
      weights: { 
        meta: 1.25, 
        google_ads: 1.30, 
        programmatic: 1.15, 
        linkedin: 1.05, 
        tiktok: 0.85, 
        snapchat: 0.80, 
        youtube: 0.90, 
        x: 0.85 
      },
      focus: 'conversion_and_purchase',
      notes: 'مرحلة التحويل والشراء'
    }
  },
  
  // Industry-specific goal adjustments
  industryGoalAdjustments: {
    'تجارة إلكترونية': {
      'Sales': { multiplier: 1.15 },
      'Leads': { multiplier: 0.90 },
      'Awareness': { multiplier: 1.05 }
    },
    'عقارات': {
      'Leads': { multiplier: 1.25 },
      'Awareness': { multiplier: 0.85 },
      'Sales': { multiplier: 0.95 }
    },
    'خدمات مالية': {
      'Leads': { multiplier: 1.20 },
      'Brand_Recognition': { multiplier: 1.10 },
      'Sales': { multiplier: 0.90 }
    },
    'تعليم': {
      'Leads': { multiplier: 1.30 },
      'Traffic': { multiplier: 1.10 },
      'Sales': { multiplier: 0.85 }
    },
    'مطاعم وكافيهات': {
      'Engagement': { multiplier: 1.20 },
      'Awareness': { multiplier: 1.15 },
      'Sales': { multiplier: 1.05 }
    }
  },
  
  // Budget-based goal adjustments
  budgetGoalAdjustments: {
    low: { // < 15K
      'Awareness': { multiplier: 0.90 },
      'Sales': { multiplier: 1.10 },
      'Leads': { multiplier: 1.15 }
    },
    medium: { // 15K - 50K
      'Awareness': { multiplier: 1.00 },
      'Sales': { multiplier: 1.05 },
      'Leads': { multiplier: 1.00 }
    },
    high: { // 50K - 150K
      'Awareness': { multiplier: 1.10 },
      'Sales': { multiplier: 1.00 },
      'Leads': { multiplier: 0.95 }
    },
    enterprise: { // 150K+
      'Awareness': { multiplier: 1.20 },
      'Sales': { multiplier: 0.95 },
      'Leads': { multiplier: 0.90 }
    }
  },
  
  // Seasonal goal adjustments
  seasonalGoalAdjustments: {
    'رمضان': {
      'Sales': { multiplier: 1.20 },
      'Engagement': { multiplier: 1.15 },
      'Awareness': { multiplier: 1.10 }
    },
    'الجمعة البيضاء': {
      'Sales': { multiplier: 1.40 },
      'Traffic': { multiplier: 1.25 },
      'Awareness': { multiplier: 1.15 }
    },
    'العودة للمدارس': {
      'Leads': { multiplier: 1.25 },
      'Traffic': { multiplier: 1.15 },
      'Sales': { multiplier: 1.10 }
    },
    'بدون موسم معين': {
      'Sales': { multiplier: 1.00 },
      'Leads': { multiplier: 1.00 },
      'Awareness': { multiplier: 1.00 }
    }
  }
} as const;

export type GoalWeights = typeof goalWeights;
