/**
 * Unified Validation Benchmarks - Single Source of Truth
 * Contains authoritative validation ranges and guardrails for campaign results
 */

export const validationBenchmarks = {
  // Industry-specific validation ranges
  industries: {
    'default': {
      ROAS: { min: 1.5, max: 8.0, optimal: 3.5 },
      ARPU: { min: 50, max: 1000, optimal: 200 },
      CTR: { min: 0.5, max: 5.0, optimal: 1.5 },
      CVR: { min: 0.5, max: 10.0, optimal: 2.5 },
      CPM: { min: 2.0, max: 15.0, optimal: 6.0 },
      CPC: { min: 0.3, max: 3.0, optimal: 1.0 }
    },
    
    'تجارة إلكترونية': {
      ROAS: { min: 2.8, max: 7.5, optimal: 4.2 },
      ARPU: { min: 200, max: 800, optimal: 380 },
      CTR: { min: 1.0, max: 3.5, optimal: 1.8 },
      CVR: { min: 1.2, max: 4.5, optimal: 2.8 },
      CPM: { min: 3.0, max: 8.0, optimal: 5.0 },
      CPC: { min: 0.4, max: 1.5, optimal: 0.8 }
    },
    
    'عقارات': {
      ROAS: { min: 2.2, max: 18.0, optimal: 8.5 },
      ARPU: { min: 8000, max: 35000, optimal: 15000 },
      CTR: { min: 1.2, max: 4.5, optimal: 2.2 },
      CVR: { min: 0.6, max: 6.0, optimal: 2.5 },
      CPM: { min: 5.0, max: 20.0, optimal: 10.0 },
      CPC: { min: 1.0, max: 8.0, optimal: 3.0 }
    },
    
    'خدمات مالية': {
      ROAS: { min: 2.2, max: 12.0, optimal: 5.5 },
      ARPU: { min: 1500, max: 15000, optimal: 5000 },
      CTR: { min: 0.8, max: 4.0, optimal: 1.8 },
      CVR: { min: 1.8, max: 7.5, optimal: 3.5 },
      CPM: { min: 8.0, max: 25.0, optimal: 15.0 },
      CPC: { min: 2.0, max: 10.0, optimal: 5.0 }
    },
    
    'تقنية/ساس': {
      ROAS: { min: 2.0, max: 8.5, optimal: 4.0 },
      ARPU: { min: 1500, max: 18000, optimal: 6000 },
      CTR: { min: 0.7, max: 3.2, optimal: 1.5 },
      CVR: { min: 1.5, max: 6.0, optimal: 3.0 },
      CPM: { min: 6.0, max: 18.0, optimal: 12.0 },
      CPC: { min: 1.5, max: 6.0, optimal: 3.5 }
    },
    
    'تعليم': {
      ROAS: { min: 2.8, max: 10.0, optimal: 5.5 },
      ARPU: { min: 2000, max: 12000, optimal: 5000 },
      CTR: { min: 1.0, max: 3.8, optimal: 2.0 },
      CVR: { min: 2.2, max: 9.5, optimal: 4.5 },
      CPM: { min: 4.0, max: 12.0, optimal: 7.5 },
      CPC: { min: 1.0, max: 4.0, optimal: 2.0 }
    },
    
    'سياحة وضيافة': {
      ROAS: { min: 3.2, max: 10.5, optimal: 6.0 },
      ARPU: { min: 600, max: 3500, optimal: 1200 },
      CTR: { min: 1.2, max: 4.0, optimal: 2.2 },
      CVR: { min: 2.0, max: 6.5, optimal: 3.8 },
      CPM: { min: 3.5, max: 10.0, optimal: 6.5 },
      CPC: { min: 0.8, max: 2.5, optimal: 1.5 }
    },
    
    'سيارات': {
      ROAS: { min: 2.5, max: 12.0, optimal: 6.0 },
      ARPU: { min: 3000, max: 25000, optimal: 8000 },
      CTR: { min: 1.0, max: 4.0, optimal: 2.0 },
      CVR: { min: 1.0, max: 5.5, optimal: 2.8 },
      CPM: { min: 6.0, max: 18.0, optimal: 12.0 },
      CPC: { min: 1.5, max: 6.0, optimal: 3.5 }
    },
    
    'مطاعم وكافيهات': {
      ROAS: { min: 3.5, max: 9.5, optimal: 6.0 },
      ARPU: { min: 100, max: 350, optimal: 180 },
      CTR: { min: 1.5, max: 5.0, optimal: 2.8 },
      CVR: { min: 2.5, max: 8.5, optimal: 4.5 },
      CPM: { min: 2.5, max: 8.0, optimal: 4.5 },
      CPC: { min: 0.4, max: 1.8, optimal: 0.9 }
    },
    
    'رعاية صحية': {
      ROAS: { min: 2.2, max: 8.5, optimal: 4.5 },
      ARPU: { min: 400, max: 1800, optimal: 800 },
      CTR: { min: 1.2, max: 4.2, optimal: 2.0 },
      CVR: { min: 1.8, max: 7.0, optimal: 3.5 },
      CPM: { min: 5.0, max: 15.0, optimal: 9.0 },
      CPC: { min: 1.2, max: 5.0, optimal: 2.5 }
    },
    
    'تجزئة': {
      ROAS: { min: 3.2, max: 8.5, optimal: 5.5 },
      ARPU: { min: 220, max: 900, optimal: 400 },
      CTR: { min: 1.2, max: 3.8, optimal: 2.0 },
      CVR: { min: 1.8, max: 5.5, optimal: 3.2 },
      CPM: { min: 3.0, max: 8.5, optimal: 5.5 },
      CPC: { min: 0.5, max: 2.0, optimal: 1.0 }
    },
    
    'فعاليات ومؤتمرات ومعارض': {
      ROAS: { min: 2.0, max: 7.5, optimal: 4.0 },
      ARPU: { min: 400, max: 3000, optimal: 1200 },
      CTR: { min: 0.8, max: 3.5, optimal: 1.8 },
      CVR: { min: 1.2, max: 6.5, optimal: 3.0 },
      CPM: { min: 6.0, max: 20.0, optimal: 12.0 },
      CPC: { min: 1.5, max: 8.0, optimal: 4.0 }
    }
  },
  
  // Platform-specific validation ranges
  platforms: {
    meta: {
      CPM: { min: 2.5, max: 8.0, optimal: 4.5 },
      CTR: { min: 0.8, max: 2.5, optimal: 1.6 },
      CVR: { min: 2.0, max: 5.0, optimal: 3.5 },
      ROAS: { min: 2.5, max: 6.5, optimal: 4.2 }
    },
    google_ads: {
      CPM: { min: 3.0, max: 10.0, optimal: 6.0 },
      CTR: { min: 1.5, max: 3.5, optimal: 2.5 },
      CVR: { min: 2.5, max: 6.0, optimal: 4.2 },
      ROAS: { min: 3.0, max: 7.0, optimal: 4.8 }
    },
    tiktok: {
      CPM: { min: 2.0, max: 7.0, optimal: 4.0 },
      CTR: { min: 1.0, max: 2.8, optimal: 1.8 },
      CVR: { min: 1.2, max: 3.5, optimal: 2.5 },
      ROAS: { min: 2.5, max: 5.5, optimal: 3.8 }
    },
    linkedin: {
      CPM: { min: 15.0, max: 35.0, optimal: 25.0 },
      CTR: { min: 0.3, max: 1.2, optimal: 0.7 },
      CVR: { min: 2.5, max: 6.0, optimal: 4.2 },
      ROAS: { min: 1.8, max: 4.0, optimal: 2.8 }
    }
  },
  
  // Budget validation ranges
  budget: {
    min_per_platform: {
      meta: 2000,
      google_ads: 3000,
      tiktok: 1500,
      snapchat: 1500,
      linkedin: 8000,
      youtube: 5000,
      x: 3000,
      programmatic: 5000
    },
    max_recommended: {
      meta: 80000,
      google_ads: 150000,
      tiktok: 60000,
      snapchat: 50000,
      linkedin: 120000,
      youtube: 100000,
      x: 80000,
      programmatic: 200000
    }
  },
  
  // General validation rules
  rules: {
    min_total_budget: 5000,
    max_total_budget: 500000,
    min_platforms_count: 1,
    max_platforms_count: 8,
    min_campaign_duration_days: 7,
    max_campaign_duration_days: 365,
    max_roas_threshold: 15.0, // Flag if ROAS > 15 as potentially unrealistic
    min_roas_threshold: 1.0   // Flag if ROAS < 1.0 as unprofitable
  }
} as const;

export type ValidationBenchmarks = typeof validationBenchmarks;
