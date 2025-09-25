/**
 * @file src/data/personas/personaData.ts
 * @description Contains the structured data for demographic personas in the Saudi market.
 * This is the knowledge base for the Audience Intelligence Engine.
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import { DemographicPersona, GenderAffinity } from '../../types';

/**
 * البيانات الديموغرافية للشريحة العمرية في السوق السعودي
 * بناءً على أبحاث السوق المتعمقة وسلوك المستهلكين الرقميين
 */
export const agePersonas: { [ageRange: string]: DemographicPersona } = {
  '18-24': {
    dominantPlatforms: ['tiktok', 'snapchat', 'youtube', 'meta'],
    contentPreference: 'short_video',
    spendingPower: 'low',
    decisionDrivers: ['trends', 'social_proof', 'price'],
    conversionBehavior: 'impulse_buy'
  },
  '25-34': {
    dominantPlatforms: ['meta', 'google_ads', 'snapchat', 'tiktok', 'x'],
    contentPreference: 'visual_story',
    spendingPower: 'medium',
    decisionDrivers: ['reviews', 'quality', 'brand_name'],
    conversionBehavior: 'comparison_shopping'
  },
  '35-44': {
    dominantPlatforms: ['meta', 'google_ads', 'linkedin', 'x'],
    contentPreference: 'detailed_content',
    spendingPower: 'high',
    decisionDrivers: ['quality', 'trust', 'brand_name'],
    conversionBehavior: 'researched_purchase'
  },
  '45+': {
    dominantPlatforms: ['google_ads', 'meta', 'x'],
    contentPreference: 'text_heavy',
    spendingPower: 'very_high',
    decisionDrivers: ['trust', 'quality', 'brand_name'],
    conversionBehavior: 'researched_purchase'
  }
};

/**
 * الميول الخاصة بالجنس في السوق السعودي
 * تعكس الفروقات في سلوك الاستهلاك والتفضيلات الرقمية
 */
export const genderPersonas: { [gender: string]: GenderAffinity } = {
  'نساء': {
    platformAffinity: { 
      'snapchat': 1.2, 
      'tiktok': 1.15, 
      'meta': 1.1,
      'pinterest': 1.3,
      'instagram': 1.25
    },
    categoryAffinity: [
      'تجارة إلكترونية', 
      'رعاية صحية', 
      'تعليم',
      'أزياء وموضة',
      'مطاعم وكافيهات',
      'مجوهرات وساعات'
    ],
    adSensitivity: 'high'
  },
  'رجال': {
    platformAffinity: { 
      'x': 1.2, 
      'linkedin': 1.15, 
      'google_ads': 1.1,
      'youtube': 1.05,
      'twitch': 1.4
    },
    categoryAffinity: [
      'سيارات', 
      'خدمات مالية', 
      'تقنية/ساس',
      'سياحة وضيافة',
      'وكالات إبداعية وتسويق'
    ],
    adSensitivity: 'medium'
  }
};

/**
 * بيانات إضافية للسياق السعودي
 * تعكس الخصائص الثقافية والاجتماعية المحلية
 */
export const saudiMarketContext = {
  // المنصات الأكثر شعبية في السعودية
  topPlatforms: [
    'meta', 'google_ads', 'snapchat', 'tiktok', 'youtube', 'x'
  ],
  
  // فترات الذروة للنشاط الرقمي
  peakActivityHours: {
    weekdays: ['19:00', '20:00', '21:00'],
    weekends: ['14:00', '15:00', '16:00', '19:00', '20:00', '21:00']
  },
  
  // العطل الرسمية التي تؤثر على السلوك الرقمي
  highEngagementPeriods: [
    'رمضان', 'عيد الفطر', 'عيد الأضحى', 'اليوم الوطني السعودي'
  ],
  
  // اتجاهات المحتوى السائدة
  trendingContentTypes: [
    'short_video', 'visual_story', 'user_generated_content'
  ]
};

/**
 * دوال مساعدة للحصول على البيانات
 */
export const personaHelpers = {
  /**
   * يحصل على بيانات الشريحة العمرية
   */
  getAgePersona: (age: number): DemographicPersona | null => {
    if (age >= 18 && age <= 24) return agePersonas['18-24'];
    if (age >= 25 && age <= 34) return agePersonas['25-34'];
    if (age >= 35 && age <= 44) return agePersonas['35-44'];
    if (age >= 45) return agePersonas['45+'];
    return null;
  },

  /**
   * يحصل على بيانات الميول الخاصة بالجنس
   */
  getGenderAffinity: (gender: string): GenderAffinity | null => {
    return genderPersonas[gender] || null;
  },

  /**
   * يحسب معدل تفضيل المنصة بناءً على العمر والجنس
   */
  getPlatformAffinityMultiplier: (
    platform: string, 
    age: number, 
    gender: string
  ): number => {
    const agePersona = personaHelpers.getAgePersona(age);
    const genderAffinity = personaHelpers.getGenderAffinity(gender);
    
    if (!agePersona || !genderAffinity) return 1.0;
    
    // تحقق من وجود المنصة في المنصات المهيمنة للعمر
    const ageMultiplier = agePersona.dominantPlatforms.includes(platform) ? 1.2 : 1.0;
    
    // تحقق من وجود المنصة في ميول الجنس
    const genderMultiplier = genderAffinity.platformAffinity?.[platform] || 1.0;
    
    return ageMultiplier * genderMultiplier;
  }
};
