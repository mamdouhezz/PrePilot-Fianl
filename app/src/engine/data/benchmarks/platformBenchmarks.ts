/**
 * Unified Platform Benchmarks - Single Source of Truth
 * Contains authoritative performance data for all advertising platforms in Saudi Arabia
 */

export const platformBenchmarks = {
  meta: {
    avg_CPM_ريال: { value: 4.2, confidence: 'high', range: { min: 3.5, max: 5.5 } },
    avg_CPC_ريال: { value: 0.65, confidence: 'high', range: { min: 0.45, max: 0.95 } },
    avg_CTR_percent: { value: 1.4, confidence: 'high', range: { min: 1.0, max: 2.0 } },
    avg_CVR_percent: { value: 3.2, confidence: 'medium', range: { min: 2.5, max: 4.5 } },
    avg_ROAS: { value: 3.8, confidence: 'medium', range: { min: 3.0, max: 5.5 } },
    avg_CAC_ريال: { value: 20.3, confidence: 'high', range: { min: 15.0, max: 30.0 } },
    // Enhanced data points
    avg_frequency: 2.1,
    avg_reach_percent: 65,
    optimal_budget_min: 5000,
    optimal_budget_max: 100000,
    peak_hours: ['18:00', '19:00', '20:00', '21:00'],
    best_demographics: ['25-34', '35-44'],
    notes: "أقوى منصة للبيع المباشر والـ remarketing في السعودية"
  },
  
  google_ads: {
    avg_CPM_ريال: { value: 5.8, confidence: 'high', range: { min: 4.5, max: 7.5 } },
    avg_CPC_ريال: { value: 1.15, confidence: 'high', range: { min: 0.8, max: 1.8 } },
    avg_CTR_percent: { value: 2.2, confidence: 'high', range: { min: 1.8, max: 3.0 } },
    avg_CVR_percent: { value: 4.0, confidence: 'medium', range: { min: 3.0, max: 5.5 } },
    avg_ROAS: { value: 4.2, confidence: 'medium', range: { min: 3.5, max: 6.0 } },
    avg_CAC_ريال: { value: 28.7, confidence: 'high', range: { min: 20.0, max: 40.0 } },
    // Enhanced data points
    avg_frequency: 1.8,
    avg_reach_percent: 80,
    optimal_budget_min: 3000,
    optimal_budget_max: 150000,
    peak_hours: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    best_demographics: ['25-44', '45-54'],
    notes: "أفضل قناة للـ intent المباشر (عقارات، سيارات، عيادات) والوصول الواسع"
  },
  
  youtube: {
    avg_CPM_ريال: { value: 5.5, confidence: 'medium', range: { min: 4.0, max: 7.5 } },
    avg_CPC_ريال: { value: 1.1, confidence: 'medium', range: { min: 0.8, max: 1.8 } },
    avg_CTR_percent: { value: 0.9, confidence: 'high', range: { min: 0.6, max: 1.4 } },
    avg_CVR_percent: { value: 1.9, confidence: 'medium', range: { min: 1.2, max: 2.8 } },
    avg_ROAS: { value: 2.8, confidence: 'medium', range: { min: 2.0, max: 4.0 } },
    avg_CAC_ريال: { value: 57.9, confidence: 'medium', range: { min: 35.0, max: 90.0 } },
    // Enhanced data points
    avg_frequency: 1.5,
    avg_reach_percent: 70,
    optimal_budget_min: 8000,
    optimal_budget_max: 80000,
    peak_hours: ['19:00', '20:00', '21:00', '22:00'],
    best_demographics: ['18-34'],
    notes: "مناسب لحملات الوعي والفيديو الطويل"
  },
  
  tiktok: {
    avg_CPM_ريال: { value: 4.2, confidence: 'medium', range: { min: 3.0, max: 6.0 } },
    avg_CPC_ريال: { value: 0.55, confidence: 'medium', range: { min: 0.35, max: 0.85 } },
    avg_CTR_percent: { value: 1.6, confidence: 'high', range: { min: 1.2, max: 2.2 } },
    avg_CVR_percent: { value: 2.2, confidence: 'medium', range: { min: 1.5, max: 3.2 } },
    avg_ROAS: { value: 3.2, confidence: 'medium', range: { min: 2.5, max: 4.5 } },
    avg_CAC_ريال: { value: 25.0, confidence: 'medium', range: { min: 18.0, max: 35.0 } },
    // Enhanced data points
    avg_frequency: 2.3,
    avg_reach_percent: 75,
    optimal_budget_min: 3000,
    optimal_budget_max: 50000,
    peak_hours: ['18:00', '19:00', '20:00', '21:00', '22:00'],
    best_demographics: ['18-29', '30-39'],
    notes: "فعّال جدًا للمنتجات الـ lifestyle والـ e-commerce"
  },
  
  snapchat: {
    avg_CPM_ريال: { value: 3.5, confidence: 'medium', range: { min: 2.5, max: 5.0 } },
    avg_CPC_ريال: { value: 0.65, confidence: 'medium', range: { min: 0.45, max: 0.95 } },
    avg_CTR_percent: { value: 1.1, confidence: 'high', range: { min: 0.8, max: 1.5 } },
    avg_CVR_percent: { value: 1.7, confidence: 'medium', range: { min: 1.2, max: 2.5 } },
    avg_ROAS: { value: 2.9, confidence: 'medium', range: { min: 2.2, max: 4.0 } },
    avg_CAC_ريال: { value: 38.2, confidence: 'medium', range: { min: 25.0, max: 55.0 } },
    // Enhanced data points
    avg_frequency: 2.0,
    avg_reach_percent: 60,
    optimal_budget_min: 2000,
    optimal_budget_max: 40000,
    peak_hours: ['17:00', '18:00', '19:00', '20:00'],
    best_demographics: ['18-24', '25-34'],
    notes: "قوي مع الشباب في السعودية، خصوصًا للـ fast moving products"
  },
  
  linkedin: {
    avg_CPM_ريال: { value: 22.5, confidence: 'high', range: { min: 18.0, max: 30.0 } },
    avg_CPC_ريال: { value: 5.5, confidence: 'high', range: { min: 4.0, max: 8.0 } },
    avg_CTR_percent: { value: 0.6, confidence: 'high', range: { min: 0.4, max: 0.9 } },
    avg_CVR_percent: { value: 3.8, confidence: 'medium', range: { min: 2.8, max: 5.2 } },
    avg_ROAS: { value: 2.5, confidence: 'medium', range: { min: 1.8, max: 3.5 } },
    avg_CAC_ريال: { value: 144.7, confidence: 'high', range: { min: 100.0, max: 200.0 } },
    // Enhanced data points
    avg_frequency: 1.3,
    avg_reach_percent: 40,
    optimal_budget_min: 8000,
    optimal_budget_max: 120000,
    peak_hours: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'],
    best_demographics: ['25-44', '45-54'],
    notes: "أفضل قناة للـ B2B، لكن تكلفتها أعلى بكثير"
  },
  
  x: {
    avg_CPM_ريال: { value: 7.5, confidence: 'medium', range: { min: 5.0, max: 12.0 } },
    avg_CPC_ريال: { value: 1.7, confidence: 'medium', range: { min: 1.2, max: 2.5 } },
    avg_CTR_percent: { value: 0.9, confidence: 'medium', range: { min: 0.6, max: 1.3 } },
    avg_CVR_percent: { value: 1.4, confidence: 'low', range: { min: 0.8, max: 2.2 } },
    avg_ROAS: { value: 2.0, confidence: 'low', range: { min: 1.5, max: 2.8 } },
    avg_CAC_ريال: { value: 121.4, confidence: 'medium', range: { min: 80.0, max: 180.0 } },
    // Enhanced data points
    avg_frequency: 1.7,
    avg_reach_percent: 45,
    optimal_budget_min: 4000,
    optimal_budget_max: 60000,
    peak_hours: ['12:00', '13:00', '18:00', '19:00', '20:00'],
    best_demographics: ['25-44'],
    notes: "قوي للأخبار والـ trending topics، لكنه أضعف في المبيعات المباشرة"
  },
  
  programmatic: {
    avg_CPM_ريال: { value: 3.8, confidence: 'medium', range: { min: 2.5, max: 5.5 } },
    avg_CPC_ريال: { value: 0.85, confidence: 'medium', range: { min: 0.55, max: 1.3 } },
    avg_CTR_percent: { value: 0.6, confidence: 'medium', range: { min: 0.3, max: 0.9 } },
    avg_CVR_percent: { value: 1.0, confidence: 'low', range: { min: 0.6, max: 1.5 } },
    avg_ROAS: { value: 1.8, confidence: 'low', range: { min: 1.2, max: 2.5 } },
    avg_CAC_ريال: { value: 85.0, confidence: 'medium', range: { min: 60.0, max: 120.0 } },
    // Enhanced data points
    avg_frequency: 1.4,
    avg_reach_percent: 85,
    optimal_budget_min: 10000,
    optimal_budget_max: 200000,
    peak_hours: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    best_demographics: ['25-54'],
    notes: "مناسب للوصول الواسع وإعادة الاستهداف عبر شبكات متعددة"
  }
} as const;

export type PlatformBenchmarks = typeof platformBenchmarks;
export type PlatformKey = keyof PlatformBenchmarks;
