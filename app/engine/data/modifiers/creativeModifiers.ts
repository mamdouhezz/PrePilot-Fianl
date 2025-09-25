/**
 * Creative Modifiers - Single Source of Truth
 * Contains multipliers for different creative types and formats
 */

export const creativeModifiers = {
  // Content format modifiers
  video: { 
    cpm: 1.15, 
    ctr: 1.35, 
    cvr: 1.25,
    engagement: 1.40,
    completion_rate: 0.75, // 75% completion rate
    optimal_duration_seconds: 15,
    best_platforms: ['tiktok', 'youtube', 'instagram', 'snapchat'],
    notes: "أعلى معدل تفاعل لكن تكلفة إنتاج أعلى"
  },
  
  static: { 
    cpm: 1.00, 
    ctr: 1.00, 
    cvr: 1.00,
    engagement: 1.00,
    completion_rate: 1.00,
    optimal_duration_seconds: 0,
    best_platforms: ['meta', 'google_ads', 'linkedin'],
    notes: "المعيار الأساسي لجميع أنواع المحتوى"
  },
  
  carousel: { 
    cpm: 1.05, 
    ctr: 1.15, 
    cvr: 1.10,
    engagement: 1.20,
    completion_rate: 0.85,
    optimal_duration_seconds: 0,
    best_platforms: ['meta', 'instagram', 'linkedin'],
    notes: "مناسب لعرض منتجات متعددة أو قصص متتالية"
  },
  
  stories: { 
    cpm: 1.08, 
    ctr: 1.25, 
    cvr: 1.15,
    engagement: 1.30,
    completion_rate: 0.90,
    optimal_duration_seconds: 5,
    best_platforms: ['snapchat', 'instagram', 'facebook'],
    notes: "محتوى قصير ومتفاعل، مناسب للعروض السريعة"
  },
  
  // Creative quality modifiers
  high_quality: {
    cpm: 1.10,
    ctr: 1.20,
    cvr: 1.15,
    engagement: 1.25,
    notes: "إنتاج احترافي عالي الجودة"
  },
  
  medium_quality: {
    cpm: 1.00,
    ctr: 1.00,
    cvr: 1.00,
    engagement: 1.00,
    notes: "جودة متوسطة معقولة"
  },
  
  low_quality: {
    cpm: 0.90,
    ctr: 0.85,
    cvr: 0.90,
    engagement: 0.80,
    notes: "جودة منخفضة قد تؤثر على الأداء"
  },
  
  // Creative type modifiers
  ugc: { // User Generated Content
    cpm: 0.95,
    ctr: 1.30,
    cvr: 1.20,
    engagement: 1.35,
    trust_factor: 1.25,
    notes: "محتوى من المستخدمين، أعلى ثقة وتفاعل"
  },
  
  influencer_content: {
    cpm: 1.20,
    ctr: 1.40,
    cvr: 1.30,
    engagement: 1.50,
    trust_factor: 1.35,
    notes: "محتوى من المؤثرين، تكلفة أعلى لكن تأثير أقوى"
  },
  
  brand_content: {
    cpm: 1.05,
    ctr: 1.05,
    cvr: 1.10,
    engagement: 1.10,
    trust_factor: 1.15,
    notes: "محتوى العلامة التجارية الرسمي"
  },
  
  // Creative elements modifiers
  with_celebrities: {
    cpm: 1.40,
    ctr: 1.50,
    cvr: 1.35,
    engagement: 1.60,
    notes: "ظهور المشاهير يزيد التفاعل والتكلفة"
  },
  
  with_music: {
    cpm: 1.02,
    ctr: 1.15,
    cvr: 1.08,
    engagement: 1.20,
    notes: "الموسيقى تزيد التفاعل قليلاً"
  },
  
  with_text_overlay: {
    cpm: 1.00,
    ctr: 1.10,
    cvr: 1.05,
    engagement: 1.08,
    notes: "النص المكتوب يوضح الرسالة"
  },
  
  // Seasonal creative modifiers
  ramadan_themed: {
    cpm: 1.10,
    ctr: 1.20,
    cvr: 1.15,
    engagement: 1.25,
    notes: "محتوى مناسب لرمضان"
  },
  
  national_day_themed: {
    cpm: 1.08,
    ctr: 1.15,
    cvr: 1.10,
    engagement: 1.20,
    notes: "محتوى مناسب للأعياد الوطنية"
  },
  
  // Language modifiers
  arabic_content: {
    cpm: 1.00,
    ctr: 1.05,
    cvr: 1.03,
    engagement: 1.08,
    notes: "محتوى باللغة العربية"
  },
  
  english_content: {
    cpm: 1.02,
    ctr: 0.98,
    cvr: 1.00,
    engagement: 1.00,
    notes: "محتوى باللغة الإنجليزية"
  },
  
  mixed_language: {
    cpm: 1.01,
    ctr: 1.02,
    cvr: 1.01,
    engagement: 1.03,
    notes: "محتوى مختلط اللغات"
  }
} as const;

export type CreativeModifiers = typeof creativeModifiers;
