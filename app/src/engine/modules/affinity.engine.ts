/**
 * @file src/engine/modules/affinity.engine.ts
 * @description This engine module calculates performance modifiers based on the affinity
 * between the selected audience and the campaign's context.
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import { agePersonas, genderPersonas } from '../../data/personas/personaData';
import { AffinityModifiers, CampaignData } from '../../types';

/**
 * دالة مساعدة لتحويل البيانات النوعية إلى أرقام
 * تحويل قوة الإنفاق إلى معدل تأثير رقمي
 */
const mapSpendingPowerToModifier = (power: 'low' | 'medium' | 'high' | 'very_high'): number => {
  switch (power) {
    case 'low': return 0.85;
    case 'medium': return 1.0;
    case 'high': return 1.15;
    case 'very_high': return 1.25;
    default: return 1.0;
  }
};

/**
 * دالة مساعدة لتحويل سلوك التحويل إلى معدل تأثير
 * تحويل نوعية سلوك الشراء إلى معدل تأثير رقمي
 */
const mapConversionBehaviorToModifier = (behavior: 'impulse_buy' | 'researched_purchase' | 'comparison_shopping'): number => {
  switch (behavior) {
    case 'impulse_buy': return 1.2; // زيادة 20% في CVR للشراء الاندفاعي
    case 'comparison_shopping': return 0.9; // انخفاض 10% في CVR للشراء المقارن
    case 'researched_purchase': return 1.0; // معدل عادي للشراء المدروس
    default: return 1.0;
  }
};

/**
 * دالة مساعدة لتحويل حساسية الإعلان إلى معدل تأثير
 * تحويل حساسية الجمهور للإعلان إلى معدل تأثير رقمي
 */
const mapAdSensitivityToModifier = (sensitivity: 'low' | 'medium' | 'high'): number => {
  switch (sensitivity) {
    case 'low': return 1.1; // زيادة 10% في CTR للحساسية المنخفضة
    case 'medium': return 1.0; // معدل عادي
    case 'high': return 0.9; // انخفاض 10% في CTR للحساسية العالية
    default: return 1.0;
  }
};

/**
 * يحسب معدلات الأداء النهائية بناءً على اختيار الجمهور المستهدف
 * @param audience الجمهور المستهدف المحدد من قبل المستخدم
 * @param platformId منصة الإعلان المحددة التي يتم حسابها لها
 * @param industry صناعة الحملة الإعلانية
 * @returns كائن يحتوي على معدلات CPM و CTR و CVR المحسوبة
 */
export function calculateAffinityModifiers(
  audience: CampaignData['targetAudience'],
  platformId: string,
  industry: string
): AffinityModifiers {
  
  let combinedCpmMod = 1.0;
  let combinedCtrMod = 1.0;
  let combinedCvrMod = 1.0;

  // 1. معدلات الأداء بناءً على العمر
  if (audience.age.length > 0) {
    // حساب المتوسط للمعدلات إذا تم اختيار عدة فئات عمرية
    const ageMods = audience.age.map(ageRange => agePersonas[ageRange] || agePersonas['25-34']).filter(p => p !== undefined);
    const avgSpendingPower = ageMods.length > 0 ? ageMods.reduce((sum, p) => sum + mapSpendingPowerToModifier(p.spendingPower), 0) / ageMods.length : 1.0;
    
    // قوة الإنفاق الأعلى تعني CVR أعلى ولكن أيضاً CPM أعلى
    combinedCvrMod *= avgSpendingPower;
    combinedCpmMod *= (1 + (avgSpendingPower - 1) * 0.5); // تأثير أقل عدوانية على CPM

    // التحقق من كون المنصة مهيمنة لهذه الفئة العمرية
    const isDominant = ageMods.some(p => p && p.dominantPlatforms.includes(platformId));
    if (isDominant) {
      combinedCtrMod *= 1.1; // زيادة 10% في CTR على المنصة المهيمنة
    } else {
      combinedCpmMod *= 1.1; // عقوبة 10% في CPM على المنصة غير المهيمنة
    }

    // تطبيق تأثير سلوك التحويل
    const avgConversionBehavior = ageMods.length > 0 ? ageMods.reduce((sum, p) => sum + mapConversionBehaviorToModifier(p.conversionBehavior), 0) / ageMods.length : 1.0;
    combinedCvrMod *= avgConversionBehavior;

    // تطبيق تأثير تفضيل المحتوى على CTR
    const hasShortVideoPreference = ageMods.some(p => p && p.contentPreference === 'short_video');
    if (hasShortVideoPreference && ['tiktok', 'snapchat', 'instagram'].includes(platformId)) {
      combinedCtrMod *= 1.15; // زيادة 15% في CTR للمحتوى القصير على المنصات المناسبة
    }
  }

  // 2. معدلات الأداء بناءً على الجنس
  const genderData = genderPersonas[audience.gender];
  if (genderData) {
    // تطبيق معدل ميول المنصة
    const platformAffinity = genderData.platformAffinity?.[platformId] || 1.0;
    combinedCpmMod *= platformAffinity;

    // تطبيق معدل ميول الصناعة
    if (genderData.categoryAffinity?.includes(industry)) {
      combinedCvrMod *= 1.1; // زيادة 10% في CVR إذا كان الجنس لديه ميول للصناعة
    }

    // تطبيق تأثير حساسية الإعلان على CTR
    if (genderData.adSensitivity) {
      const sensitivityModifier = mapAdSensitivityToModifier(genderData.adSensitivity);
      combinedCtrMod *= sensitivityModifier;
    }
  }

  // 3. تطبيق تأثير الدوافع النفسية على CVR
  if (audience.age.length > 0) {
    const ageMods = audience.age.map(ageRange => agePersonas[ageRange] || agePersonas['25-34']).filter(p => p !== undefined);
    
    // تحليل الدوافع النفسية المشتركة
    const allDecisionDrivers = ageMods.flatMap(p => p ? p.decisionDrivers : []);
    const uniqueDrivers = [...new Set(allDecisionDrivers)];
    
    // تأثير الدوافع على CVR
    if (uniqueDrivers.includes('trust') && uniqueDrivers.includes('quality')) {
      combinedCvrMod *= 1.1; // زيادة 10% للجمهور الذي يهتم بالثقة والجودة
    }
    
    if (uniqueDrivers.includes('price') && uniqueDrivers.includes('trends')) {
      combinedCpmMod *= 0.9; // انخفاض 10% في CPM للجمهور الحساس للسعر والاتجاهات
    }
  }
  
  // إرجاع النتيجة المحدودة لمنع القيم المتطرفة
  return {
    cpm_mod: Math.max(0.7, Math.min(1.5, combinedCpmMod)),
    ctr_mod: Math.max(0.8, Math.min(1.4, combinedCtrMod)),
    cvr_mod: Math.max(0.7, Math.min(1.5, combinedCvrMod)),
  };
}

/**
 * دوال مساعدة لتحويل البيانات إلى نص عربي
 */

// تحويل الفئة العمرية إلى نص عربي
const getAgeText = (ageRange: string): string => {
  const ageMap: { [key: string]: string } = {
    '18-24': 'الشباب (18-24 سنة)',
    '25-34': 'الشباب البالغين (25-34 سنة)',
    '35-44': 'البالغين المتوسطين (35-44 سنة)',
    '45+': 'البالغين الناضجين (45+ سنة)'
  };
  return ageMap[ageRange] || ageRange;
};

// تحويل أسماء المنصات إلى عربي
const getPlatformNames = (platforms: string[]): string[] => {
  const platformMap: { [key: string]: string } = {
    'meta': 'ميتا (فيسبوك/إنستغرام)',
    'google_ads': 'جوجل',
    'tiktok': 'تيك توك',
    'snapchat': 'سناب شات',
    'youtube': 'يوتيوب',
    'x': 'إكس (تويتر)',
    'linkedin': 'لينكد إن'
  };
  return platforms.map(p => platformMap[p] || p);
};

// تحويل تفضيل المحتوى إلى نص عربي
const getContentPreferenceText = (preference: string): string => {
  const contentMap: { [key: string]: string } = {
    'short_video': 'المحتوى القصير والفيديوهات',
    'detailed_content': 'المحتوى المفصل والتفصيلي',
    'visual_story': 'القصص البصرية والمرئيات'
  };
  return contentMap[preference] || 'المحتوى النصي والمقالات';
};

// تحويل الدوافع النفسية إلى نص عربي
const getDecisionDriversText = (drivers: string[]): string => {
  const driverMap: { [key: string]: string } = {
    'trends': 'الاتجاهات الحديثة',
    'social_proof': 'الإثبات الاجتماعي',
    'quality': 'الجودة',
    'trust': 'الثقة',
    'reviews': 'التقييمات',
    'price': 'السعر',
    'brand_name': 'اسم الماركة'
  };
  return drivers.map(driver => driverMap[driver] || driver).join(' و');
};

// تحويل قوة الإنفاق إلى نص عربي
const getSpendingPowerText = (power: string): string => {
  const powerMap: { [key: string]: string } = {
    'low': 'قوة إنفاق منخفضة',
    'medium': 'قوة إنفاق متوسطة',
    'high': 'قوة إنفاق عالية',
    'very_high': 'قوة إنفاق عالية جداً'
  };
  return powerMap[power] || 'قوة إنفاق متوسطة';
};

// تحويل سلوك التحويل إلى نص عربي
const getConversionBehaviorText = (behavior: string): string => {
  const behaviorMap: { [key: string]: string } = {
    'impulse_buy': 'الشراء الاندفاعي والسريع',
    'comparison_shopping': 'مقارنة الأسعار والبحث الدقيق',
    'researched_purchase': 'الشراء المدروس والمخطط له'
  };
  return behaviorMap[behavior] || 'الشراء المدروس والمخطط له';
};

// بناء الجمل الأساسية للملخص
const buildCoreSummaryParts = (
  gender: string,
  ageText: string,
  platformNames: string[],
  contentPreferenceText: string,
  decisionDriversText: string,
  spendingPowerText: string,
  conversionBehaviorText: string
): string[] => {
  const genderText = gender === 'نساء' ? 'النساء' : 'الرجال';
  
  return [
    `الجمهور المستهدف هم ${genderText} في فئة ${ageText}.`,
    `المنصات المفضلة لديهم هي: ${platformNames.join('، ')}.`,
    `يستجيبون بشكل أفضل للمحتوى من نوع ${contentPreferenceText}.`,
    `قراراتهم الشرائية تتأثر بـ ${decisionDriversText}.`,
    `لديهم ${spendingPowerText} ويميلون إلى ${conversionBehaviorText}.`
  ];
};

// إضافة المعلومات الإضافية عن الجنس
const addGenderSpecificInfo = (summaryParts: string[], genderData: any): string[] => {
  const additionalParts = [...summaryParts];

  if (genderData.categoryAffinity && genderData.categoryAffinity.length > 0) {
    additionalParts.push(`يُظهرون اهتماماً خاصاً بفئات: ${genderData.categoryAffinity.slice(0, 3).join('، ')}.`);
  }

  if (genderData.adSensitivity) {
    const sensitivityText = genderData.adSensitivity === 'high' ? 'عالية' :
                           genderData.adSensitivity === 'medium' ? 'متوسطة' : 'منخفضة';
    additionalParts.push(`حساسيتهم للإعلانات ${sensitivityText}.`);
  }

  return additionalParts;
};

// التحقق من صحة بيانات الجمهور
const validateAudienceData = (audience: CampaignData['targetAudience']): { isValid: boolean; errorMessage?: string; persona?: any; genderData?: any; ageRange?: string } => {
  if (!audience || !audience.age || audience.age.length === 0 || !audience.gender) {
    return { isValid: false, errorMessage: "جمهور عام بدون تخصيص ديموغرافي محدد." };
  }

  const primaryAgeRange = audience.age[0];
  const persona = primaryAgeRange ? agePersonas[primaryAgeRange] : undefined;
  const genderData = audience.gender ? genderPersonas[audience.gender] : undefined;

  if (!persona || !genderData) {
    return { isValid: false, errorMessage: "جمهور عام بدون بيانات شخصية متاحة." };
  }

  return { isValid: true, persona, genderData, ageRange: primaryAgeRange };
};

// بناء ملخص الشخصية من البيانات المدققة
const buildPersonaSummary = (
  audience: CampaignData['targetAudience'],
  persona: any,
  genderData: any,
  ageRange: string
): string => {
  // تحويل البيانات إلى نص عربي باستخدام الدوال المساعدة
  const ageText = getAgeText(ageRange);
  const platformNames = getPlatformNames(persona.dominantPlatforms);
  const contentPreferenceText = getContentPreferenceText(persona.contentPreference);
  const decisionDriversText = getDecisionDriversText(persona.decisionDrivers);
  const spendingPowerText = getSpendingPowerText(persona.spendingPower);
  const conversionBehaviorText = getConversionBehaviorText(persona.conversionBehavior);

  // بناء الملخص الأساسي
  const coreSummaryParts = buildCoreSummaryParts(
    audience.gender,
    ageText,
    platformNames,
    contentPreferenceText,
    decisionDriversText,
    spendingPowerText,
    conversionBehaviorText
  );

  // إضافة المعلومات الإضافية
  const finalSummaryParts = addGenderSpecificInfo(coreSummaryParts, genderData);

  return finalSummaryParts.join(' ');
};

/**
 * يولد ملخصاً مختصراً وطبيعياً لشخصية الجمهور المختار
 * هذا الملخص سيتم حقنه في سؤال الذكاء الاصطناعي
 * @param audience الجمهور المستهدف المحدد من قبل المستخدم
 * @returns نص الملخص
 */
export function getAudiencePersonaSummary(audience: CampaignData['targetAudience']): string {
  const validation = validateAudienceData(audience);
  
  if (!validation.isValid) {
    return validation.errorMessage!;
  }

  return buildPersonaSummary(audience, validation.persona!, validation.genderData!, validation.ageRange!);
}
