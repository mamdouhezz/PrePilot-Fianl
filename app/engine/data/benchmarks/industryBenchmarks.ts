/**
 * Unified Industry Benchmarks - Single Source of Truth
 * Contains authoritative performance data and modifiers for all industries in Saudi Arabia
 */

export const industryBenchmarks = {
  'default': {
    cpm_modifier: 1.0,
    ctr_modifier: 1.0,
    cvr_modifier: 1.0,
    avg_AOV_ريال: 200,
    avg_CAC_ريال: 80,
    // Enhanced data points
    avg_customer_lifetime_months: 12,
    avg_repeat_purchase_rate: 0.25,
    seasonal_impact: 'medium',
    competition_level: 'medium',
    best_platforms: ['meta', 'google_ads'],
    min_recommended_budget: 5000
  },
  
  'تجارة إلكترونية': {
    cpm_modifier: 1.05,
    ctr_modifier: 1.15,
    cvr_modifier: 1.25,
    avg_AOV_ريال: 380,
    avg_CAC_ريال: 65,
    // Enhanced data points
    avg_customer_lifetime_months: 18,
    avg_repeat_purchase_rate: 0.45,
    seasonal_impact: 'high',
    competition_level: 'high',
    best_platforms: ['meta', 'tiktok', 'google_ads'],
    min_recommended_budget: 8000,
    peak_seasons: ['الجمعة البيضاء', 'رمضان', 'العودة للمدارس']
  },
  
  'عقارات': {
    cpm_modifier: 1.35,
    ctr_modifier: 0.95,
    cvr_modifier: 0.85,
    avg_AOV_ريال: 12000,
    avg_CAC_ريال: 450,
    // Enhanced data points
    avg_customer_lifetime_months: 36,
    avg_repeat_purchase_rate: 0.15,
    seasonal_impact: 'low',
    competition_level: 'medium',
    best_platforms: ['google_ads', 'meta', 'linkedin'],
    min_recommended_budget: 15000,
    peak_seasons: ['بدون موسم معين']
  },
  
  'خدمات مالية': {
    cpm_modifier: 1.45,
    ctr_modifier: 0.85,
    cvr_modifier: 0.9,
    avg_AOV_ريال: 1800,
    avg_CAC_ريال: 350,
    // Enhanced data points
    avg_customer_lifetime_months: 24,
    avg_repeat_purchase_rate: 0.35,
    seasonal_impact: 'medium',
    competition_level: 'high',
    best_platforms: ['linkedin', 'google_ads', 'meta'],
    min_recommended_budget: 20000,
    peak_seasons: ['بدون موسم معين']
  },
  
  'تقنية/ساس': {
    cpm_modifier: 1.25,
    ctr_modifier: 0.95,
    cvr_modifier: 1.15,
    avg_AOV_ريال: 2200,
    avg_CAC_ريال: 280,
    // Enhanced data points
    avg_customer_lifetime_months: 30,
    avg_repeat_purchase_rate: 0.55,
    seasonal_impact: 'low',
    competition_level: 'medium',
    best_platforms: ['linkedin', 'google_ads', 'meta'],
    min_recommended_budget: 12000,
    peak_seasons: ['العودة للمدارس']
  },
  
  'تعليم': {
    cpm_modifier: 1.15,
    ctr_modifier: 1.05,
    cvr_modifier: 1.25,
    avg_AOV_ريال: 3500,
    avg_CAC_ريال: 180,
    // Enhanced data points
    avg_customer_lifetime_months: 12,
    avg_repeat_purchase_rate: 0.25,
    seasonal_impact: 'high',
    competition_level: 'medium',
    best_platforms: ['google_ads', 'meta', 'linkedin'],
    min_recommended_budget: 10000,
    peak_seasons: ['العودة للمدارس', 'رمضان']
  },
  
  'سياحة وضيافة': {
    cpm_modifier: 1.05,
    ctr_modifier: 1.2,
    cvr_modifier: 1.15,
    avg_AOV_ريال: 950,
    avg_CAC_ريال: 140,
    // Enhanced data points
    avg_customer_lifetime_months: 6,
    avg_repeat_purchase_rate: 0.3,
    seasonal_impact: 'high',
    competition_level: 'medium',
    best_platforms: ['meta', 'google_ads', 'youtube', 'tiktok'],
    min_recommended_budget: 8000,
    peak_seasons: ['موسم الحج', 'موسم العمرة', 'الصيف']
  },
  
  'سيارات': {
    cpm_modifier: 1.25,
    ctr_modifier: 1.0,
    cvr_modifier: 0.95,
    avg_AOV_ريال: 5500,
    avg_CAC_ريال: 380,
    // Enhanced data points
    avg_customer_lifetime_months: 48,
    avg_repeat_purchase_rate: 0.2,
    seasonal_impact: 'medium',
    competition_level: 'high',
    best_platforms: ['google_ads', 'youtube', 'meta'],
    min_recommended_budget: 20000,
    peak_seasons: ['اليوم الوطني', 'بدون موسم معين']
  },
  
  'مطاعم وكافيهات': {
    cpm_modifier: 0.95,
    ctr_modifier: 1.35,
    cvr_modifier: 1.35,
    avg_AOV_ريال: 140,
    avg_CAC_ريال: 35,
    // Enhanced data points
    avg_customer_lifetime_months: 6,
    avg_repeat_purchase_rate: 0.6,
    seasonal_impact: 'medium',
    competition_level: 'high',
    best_platforms: ['tiktok', 'snapchat', 'meta'],
    min_recommended_budget: 4000,
    peak_seasons: ['رمضان', 'بدون موسم معين']
  },
  
  'رعاية صحية': {
    cpm_modifier: 1.35,
    ctr_modifier: 1.0,
    cvr_modifier: 1.05,
    avg_AOV_ريال: 520,
    avg_CAC_ريال: 200,
    // Enhanced data points
    avg_customer_lifetime_months: 18,
    avg_repeat_purchase_rate: 0.4,
    seasonal_impact: 'low',
    competition_level: 'medium',
    best_platforms: ['google_ads', 'meta', 'linkedin'],
    min_recommended_budget: 12000,
    peak_seasons: ['بدون موسم معين']
  },
  
  'تجزئة': {
    cpm_modifier: 1.05,
    ctr_modifier: 1.2,
    cvr_modifier: 1.3,
    avg_AOV_ريال: 320,
    avg_CAC_ريال: 55,
    // Enhanced data points
    avg_customer_lifetime_months: 15,
    avg_repeat_purchase_rate: 0.5,
    seasonal_impact: 'high',
    competition_level: 'high',
    best_platforms: ['meta', 'tiktok', 'snapchat'],
    min_recommended_budget: 6000,
    peak_seasons: ['الجمعة البيضاء', 'رمضان', 'العودة للمدارس']
  },
  
  'فعاليات ومؤتمرات ومعارض': {
    cpm_modifier: 1.4,
    ctr_modifier: 0.9,
    cvr_modifier: 1.15,
    avg_AOV_ريال: 650,
    avg_CAC_ريال: 250,
    // Enhanced data points
    avg_customer_lifetime_months: 3,
    avg_repeat_purchase_rate: 0.1,
    seasonal_impact: 'high',
    competition_level: 'medium',
    best_platforms: ['linkedin', 'meta', 'google_ads'],
    min_recommended_budget: 15000,
    peak_seasons: ['بدون موسم معين']
  },
  
  // New industries
  'تطبيقات وتقنية': {
    cpm_modifier: 1.3,
    ctr_modifier: 1.1,
    cvr_modifier: 1.4,
    avg_AOV_ريال: 450,
    avg_CAC_ريال: 120,
    // Enhanced data points
    avg_customer_lifetime_months: 18,
    avg_repeat_purchase_rate: 0.35,
    seasonal_impact: 'high',
    competition_level: 'high',
    best_platforms: ['meta', 'google_ads', 'tiktok'],
    min_recommended_budget: 8000,
    peak_seasons: ['العودة للمدارس', 'رمضان']
  },
  
  'أزياء وموضة': {
    cpm_modifier: 1.1,
    ctr_modifier: 1.25,
    cvr_modifier: 1.2,
    avg_AOV_ريال: 280,
    avg_CAC_ريال: 70,
    // Enhanced data points
    avg_customer_lifetime_months: 12,
    avg_repeat_purchase_rate: 0.55,
    seasonal_impact: 'high',
    competition_level: 'high',
    best_platforms: ['tiktok', 'instagram', 'meta'],
    min_recommended_budget: 6000,
    peak_seasons: ['الجمعة البيضاء', 'رمضان']
  },
  
  'رياضة ولياقة': {
    cpm_modifier: 1.05,
    ctr_modifier: 1.15,
    cvr_modifier: 1.1,
    avg_AOV_ريال: 180,
    avg_CAC_ريال: 45,
    // Enhanced data points
    avg_customer_lifetime_months: 8,
    avg_repeat_purchase_rate: 0.4,
    seasonal_impact: 'medium',
    competition_level: 'medium',
    best_platforms: ['tiktok', 'meta', 'google_ads'],
    min_recommended_budget: 5000,
    peak_seasons: ['رمضان', 'بدون موسم معين']
  }
} as const;

export type IndustryBenchmarks = typeof industryBenchmarks;
export type IndustryKey = keyof IndustryBenchmarks;
