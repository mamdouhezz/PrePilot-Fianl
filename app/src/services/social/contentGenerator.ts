/**
 * @file contentGenerator.ts
 * @description AI-powered content generation for social media platforms
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import { CampaignReport } from '../../types';
import { SocialContent, SocialPlatform } from './types';
import { generateAiText } from '../geminiService';

/**
 * @description استخراج البيانات ذات الصلة من تقرير الحملة بناءً على القسم المحدد
 * @param report - تقرير الحملة الكامل
 * @param sectionId - معرف القسم المطلوب
 * @returns البيانات المستخرجة من القسم المحدد
 */
function extractSectionData(report: CampaignReport, sectionId: string): any {
  // Implementation for extracting relevant data based on section
  switch (sectionId) {
    case 'strategic-summary':
      return {
        title: report.sections?.strategicSummary?.title || 'الملخص الاستراتيجي',
        budget: report.budget,
        recommendations: report.sections?.strategicSummary?.recommendations || []
      };
    case 'kpis':
      return {
        title: report.sections?.kpis?.title || 'مؤشرات الأداء الرئيسية',
        metrics: report.sections?.kpis?.metrics || []
      };
    default:
      return {
        title: report.sections?.[sectionId as keyof typeof report.sections]?.title || 'تقرير الحملة',
        content: report.sections?.[sectionId as keyof typeof report.sections] || {}
      };
  }
}

/**
 * @description توليد محتوى مخصص لمنصة محددة باستخدام الذكاء الاصطناعي
 * @param sectionData - بيانات القسم المستخرجة من التقرير
 * @param platform - معلومات المنصة المستهدفة
 * @returns المحتوى المُولد مخصصاً للمنصة
 */
async function generatePlatformContent(sectionData: any, platform: SocialPlatform): Promise<SocialContent> {
  const prompt = buildPlatformPrompt(sectionData, platform);
  
  try {
    const aiResponse = await generateAiText(prompt);
    return parseAIResponse(aiResponse, platform);
  } catch (error) {
    console.error('خطأ في توليد المحتوى:', error);
    return generateFallbackContent(sectionData, platform);
  }
}

/**
 * @description بناء النص الموجه للذكاء الاصطناعي بناءً على البيانات والمنصة
 * @param sectionData - بيانات القسم
 * @param platform - معلومات المنصة
 * @returns النص الموجه للذكاء الاصطناعي
 */
function buildPlatformPrompt(sectionData: any, platform: SocialPlatform): string {
  const platformGuidelines = getPlatformGuidelines(platform.id);
  
  return `
أنت خبير في إنشاء محتوى تسويقي لمنصة ${platform.name}.
البيانات المتاحة:
- العنوان: ${sectionData.title}
- الميزانية: ${sectionData.budget ? `${sectionData.budget.toLocaleString()} ريال` : 'غير محدد'}
- التوصيات: ${sectionData.recommendations ? sectionData.recommendations.join(', ') : 'غير متوفرة'}

إرشادات المنصة:
- الحد الأقصى للنص: ${platform.maxLength} حرف
- يدعم الصور: ${platform.supportsImages ? 'نعم' : 'لا'}
- يدعم الهاشتاغات: ${platform.supportsHashtags ? 'نعم' : 'لا'}
- يدعم المذكرات: ${platform.supportsMentions ? 'نعم' : 'لا'}

${platformGuidelines}

يرجى إنشاء منشور جذاب ومحفز للتفاعل يتناسب مع طبيعة المنصة.
`;
}

/**
 * @description الحصول على إرشادات خاصة بكل منصة
 * @param platformId - معرف المنصة
 * @returns الإرشادات الخاصة بالمنصة
 */
function getPlatformGuidelines(platformId: string): string {
  const guidelines = {
    facebook: 'استخدم لغة ودودة ومشاركة، ركز على القصص والتجارب الشخصية',
    linkedin: 'استخدم لغة مهنية، ركز على النتائج والإحصائيات والتطوير المهني',
    twitter: 'استخدم لغة مختصرة ومباشرة، استخدم الهاشتاغات الشائعة',
    whatsapp: 'استخدم لغة شخصية وودودة، تجنب الهاشتاغات',
    instagram: 'استخدم لغة إبداعية وجذابة بصرياً، ركز على الجمال والإلهام',
    tiktok: 'استخدم لغة شبابية ومتجددة، ركز على الترفيه والإبداع'
  };

  return guidelines[platformId as keyof typeof guidelines] || 'استخدم لغة واضحة ومحفزة للتفاعل';
}

/**
 * @description تحليل استجابة الذكاء الاصطناعي وتحويلها إلى محتوى منظم
 * @param aiResponse - استجابة الذكاء الاصطناعي
 * @param platform - معلومات المنصة
 * @returns المحتوى المنظم
 */
function parseAIResponse(aiResponse: string, platform: SocialPlatform): SocialContent {
  // Extract hashtags
  const hashtags = aiResponse.match(/#[\w\u0600-\u06FF]+/g) || [];
  
  // Extract mentions
  const mentions = aiResponse.match(/@[\w\u0600-\u06FF]+/g) || [];
  
  // Clean text from hashtags and mentions for main content
  let cleanText = aiResponse
    .replace(/#[\w\u0600-\u06FF]+/g, '')
    .replace(/@[\w\u0600-\u06FF]+/g, '')
    .trim();

  // Ensure text doesn't exceed platform limit
  if (platform.maxLength && cleanText.length > platform.maxLength) {
    cleanText = cleanText.substring(0, platform.maxLength - 3) + '...';
  }

  return {
    text: cleanText,
    hashtags: hashtags.slice(0, 5), // Limit to 5 hashtags
    mentions: mentions.slice(0, 3), // Limit to 3 mentions
    platform: platform.id
  };
}

/**
 * @description توليد محتوى احتياطي في حالة فشل الذكاء الاصطناعي
 * @param sectionData - بيانات القسم
 * @param platform - معلومات المنصة
 * @returns المحتوى الاحتياطي
 */
function generateFallbackContent(sectionData: any, platform: SocialPlatform): SocialContent {
  const baseText = `تحقق من ${sectionData.title} الجديد من PrePilot! 🚀`;
  const hashtags = ['#PrePilot', '#التسويق_الرقمي', '#الذكاء_الاصطناعي'];
  
  let text = baseText;
  if (sectionData.budget) {
    text += `\nالميزانية: ${sectionData.budget.toLocaleString()} ريال`;
  }

  return {
    text: text.substring(0, platform.maxLength || 280),
    hashtags,
    mentions: [],
    platform: platform.id
  };
}

/**
 * @description توليد محتوى ذكي للمنصات الاجتماعية
 * @param report - تقرير الحملة
 * @param sectionId - معرف القسم
 * @param platform - معرف المنصة
 * @returns المحتوى المُولد
 */
export async function generateSocialContent(
  report: CampaignReport,
  sectionId: string,
  platform: string
): Promise<SocialContent> {
  const platformInfo = SOCIAL_PLATFORMS.find(p => p.id === platform);
  if (!platformInfo) {
    throw new Error(`منصة غير مدعومة: ${platform}`);
  }

  const sectionData = extractSectionData(report, sectionId);
  return await generatePlatformContent(sectionData, platformInfo);
}
