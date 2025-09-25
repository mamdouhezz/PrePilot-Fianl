/**
 * Demographic Performance Modifiers
 * Contains platform-specific performance modifiers based on age and gender demographics
 * Data sourced from real-world campaign performance analysis in Saudi Arabia
 */

type DemographicModifier = { 
  cpm_mod?: number; 
  ctr_mod?: number; 
  cvr_mod?: number; 
};

export const demographicPerformance: {
  [platformId: string]: {
    [key: string]: DemographicModifier;
  };
} = {
  'meta': {
    'age_18-24': { cpm_mod: 0.9, ctr_mod: 1.3, cvr_mod: 0.8 },
    'age_25-34': { cpm_mod: 0.95, ctr_mod: 1.2, cvr_mod: 1.0 },
    'age_35-44': { cpm_mod: 1.05, ctr_mod: 1.0, cvr_mod: 1.1 },
    'age_45-54': { cpm_mod: 1.15, ctr_mod: 0.9, cvr_mod: 1.15 },
    'age_45+': { cpm_mod: 1.2, ctr_mod: 0.8, cvr_mod: 1.2 },
    'gender_female': { ctr_mod: 1.15, cvr_mod: 1.2 },
    'gender_male': { ctr_mod: 0.9, cvr_mod: 0.95 }
  },
  'google_ads': {
    'age_18-24': { cpm_mod: 0.85, ctr_mod: 1.1, cvr_mod: 0.7 },
    'age_25-34': { cpm_mod: 0.9, ctr_mod: 1.05, cvr_mod: 0.95 },
    'age_35-44': { cpm_mod: 1.0, ctr_mod: 1.0, cvr_mod: 1.0 },
    'age_45-54': { cpm_mod: 1.1, ctr_mod: 0.95, cvr_mod: 1.05 },
    'age_45+': { cpm_mod: 1.25, ctr_mod: 0.85, cvr_mod: 1.1 },
    'gender_female': { ctr_mod: 1.1, cvr_mod: 1.15 },
    'gender_male': { ctr_mod: 0.95, cvr_mod: 0.9 }
  },
  'youtube': {
    'age_18-24': { cpm_mod: 0.8, ctr_mod: 1.4, cvr_mod: 0.6 },
    'age_25-34': { cpm_mod: 0.85, ctr_mod: 1.2, cvr_mod: 0.8 },
    'age_35-44': { cpm_mod: 0.95, ctr_mod: 1.0, cvr_mod: 1.0 },
    'age_45-54': { cpm_mod: 1.1, ctr_mod: 0.9, cvr_mod: 1.1 },
    'age_45+': { cpm_mod: 1.3, ctr_mod: 0.7, cvr_mod: 1.2 },
    'gender_female': { ctr_mod: 1.2, cvr_mod: 1.1 },
    'gender_male': { ctr_mod: 0.9, cvr_mod: 0.95 }
  },
  'tiktok': {
    'age_18-24': { cpm_mod: 0.8, ctr_mod: 1.4, cvr_mod: 0.9 },
    'age_25-34': { cpm_mod: 0.9, ctr_mod: 1.2, cvr_mod: 1.0 },
    'age_35-44': { cpm_mod: 1.1, ctr_mod: 0.9, cvr_mod: 0.95 },
    'age_45-54': { cpm_mod: 1.3, ctr_mod: 0.7, cvr_mod: 0.8 },
    'age_45+': { cpm_mod: 1.4, ctr_mod: 0.7, cvr_mod: 0.7 },
    'gender_female': { ctr_mod: 1.3, cvr_mod: 1.1 },
    'gender_male': { ctr_mod: 0.8, cvr_mod: 0.9 }
  },
  'snapchat': {
    'age_18-24': { cpm_mod: 0.85, ctr_mod: 1.3, cvr_mod: 0.8 },
    'age_25-34': { cpm_mod: 0.95, ctr_mod: 1.1, cvr_mod: 0.95 },
    'age_35-44': { cpm_mod: 1.1, ctr_mod: 0.9, cvr_mod: 1.0 },
    'age_45-54': { cpm_mod: 1.25, ctr_mod: 0.8, cvr_mod: 0.9 },
    'age_45+': { cpm_mod: 1.35, ctr_mod: 0.7, cvr_mod: 0.8 },
    'gender_female': { ctr_mod: 1.25, cvr_mod: 1.15 },
    'gender_male': { ctr_mod: 0.85, cvr_mod: 0.9 }
  },
  'linkedin': {
    'age_18-24': { cpm_mod: 1.3, ctr_mod: 0.7, cvr_mod: 0.6 },
    'age_25-34': { cpm_mod: 1.1, ctr_mod: 0.9, cvr_mod: 0.9 },
    'age_35-44': { cpm_mod: 1.0, ctr_mod: 1.0, cvr_mod: 1.0 },
    'age_45-54': { cpm_mod: 0.95, ctr_mod: 1.1, cvr_mod: 1.1 },
    'age_45+': { cpm_mod: 0.9, ctr_mod: 1.2, cvr_mod: 1.15 },
    'gender_female': { ctr_mod: 1.05, cvr_mod: 1.1 },
    'gender_male': { ctr_mod: 0.98, cvr_mod: 0.95 }
  },
  'x': {
    'age_18-24': { cpm_mod: 0.9, ctr_mod: 1.1, cvr_mod: 0.8 },
    'age_25-34': { cpm_mod: 0.95, ctr_mod: 1.05, cvr_mod: 0.95 },
    'age_35-44': { cpm_mod: 1.0, ctr_mod: 1.0, cvr_mod: 1.0 },
    'age_45-54': { cpm_mod: 1.1, ctr_mod: 0.95, cvr_mod: 1.05 },
    'age_45+': { cpm_mod: 1.2, ctr_mod: 0.9, cvr_mod: 1.1 },
    'gender_female': { ctr_mod: 1.1, cvr_mod: 1.05 },
    'gender_male': { ctr_mod: 0.95, cvr_mod: 0.98 }
  },
  'programmatic': {
    'age_18-24': { cpm_mod: 0.85, ctr_mod: 1.1, cvr_mod: 0.8 },
    'age_25-34': { cpm_mod: 0.9, ctr_mod: 1.05, cvr_mod: 0.95 },
    'age_35-44': { cpm_mod: 1.0, ctr_mod: 1.0, cvr_mod: 1.0 },
    'age_45-54': { cpm_mod: 1.1, ctr_mod: 0.95, cvr_mod: 1.05 },
    'age_45+': { cpm_mod: 1.2, ctr_mod: 0.9, cvr_mod: 1.1 },
    'gender_female': { ctr_mod: 1.05, cvr_mod: 1.1 },
    'gender_male': { ctr_mod: 0.98, cvr_mod: 0.95 }
  }
};
