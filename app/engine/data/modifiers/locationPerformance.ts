/**
 * Location Performance Modifiers
 * Contains performance modifiers based on Saudi Arabian regions and cities
 * Data sourced from regional campaign performance analysis
 */

type LocationModifier = { 
  cpm_mod: number; 
  cvr_mod: number; 
};

export const locationPerformance: { [location: string]: LocationModifier } = {
  'الرياض': { cpm_mod: 1.25, cvr_mod: 1.2 },
  'جدة': { cpm_mod: 1.1, cvr_mod: 1.1 },
  'الدمام/الخبر': { cpm_mod: 1.1, cvr_mod: 1.05 },
  'الدمام': { cpm_mod: 1.1, cvr_mod: 1.05 },
  'الخبر': { cpm_mod: 1.1, cvr_mod: 1.05 },
  'مكة': { cpm_mod: 1.0, cvr_mod: 1.0 },
  'المدينة': { cpm_mod: 0.95, cvr_mod: 0.98 },
  'الطائف': { cpm_mod: 0.9, cvr_mod: 0.95 },
  'بريدة': { cpm_mod: 0.85, cvr_mod: 0.9 },
  'تبوك': { cpm_mod: 0.85, cvr_mod: 0.9 },
  'خميس مشيط': { cpm_mod: 0.8, cvr_mod: 0.85 },
  'الهفوف': { cpm_mod: 0.8, cvr_mod: 0.85 },
  'حائل': { cpm_mod: 0.8, cvr_mod: 0.85 },
  'نجران': { cpm_mod: 0.75, cvr_mod: 0.8 },
  'الجبيل': { cpm_mod: 0.9, cvr_mod: 0.95 },
  'ينبع': { cpm_mod: 0.85, cvr_mod: 0.9 },
  'أبها': { cpm_mod: 0.8, cvr_mod: 0.85 },
  'القطيف': { cpm_mod: 0.85, cvr_mod: 0.9 },
  'الأحساء': { cpm_mod: 0.85, cvr_mod: 0.9 },
  'باقي المدن': { cpm_mod: 0.85, cvr_mod: 0.9 },
  'كل المدن الرئيسية': { cpm_mod: 1.05, cvr_mod: 1.02 }
};
