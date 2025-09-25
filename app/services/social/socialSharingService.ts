import { CampaignReport } from '../../types';
import { generateAiText } from '../geminiService';

export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  maxLength?: number;
  supportsImages: boolean;
  supportsHashtags: boolean;
  supportsMentions: boolean;
}

export interface SocialPost {
  id: string;
  platform: string;
  content: string;
  imageUrl?: string;
  hashtags: string[];
  mentions: string[];
  createdAt: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  reportId: string;
  sectionId: string;
}

export interface SocialContent {
  text: string;
  imageUrl?: string;
  hashtags: string[];
  mentions: string[];
  platform: string;
}

// Supported social media platforms
export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '📘',
    color: '#1877F2',
    maxLength: 63206,
    supportsImages: true,
    supportsHashtags: true,
    supportsMentions: true
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    color: '#0077B5',
    maxLength: 3000,
    supportsImages: true,
    supportsHashtags: true,
    supportsMentions: true
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: '🐦',
    color: '#1DA1F2',
    maxLength: 280,
    supportsImages: true,
    supportsHashtags: true,
    supportsMentions: true
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '💬',
    color: '#25D366',
    maxLength: 4096,
    supportsImages: true,
    supportsHashtags: false,
    supportsMentions: false
  }
];

// Generate AI-powered content for different platforms
export async function generateSocialContent(
  report: CampaignReport,
  sectionId: string,
  platform: string
): Promise<SocialContent> {
  const platformInfo = SOCIAL_PLATFORMS.find(p => p.id === platform);
  if (!platformInfo) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  // Extract relevant data based on section
  const sectionData = extractSectionData(report, sectionId);
  
  // Generate platform-specific content
  const content = await generatePlatformContent(sectionData, platformInfo);
  
  return {
    text: content.text,
    imageUrl: content.imageUrl,
    hashtags: content.hashtags,
    mentions: content.mentions,
    platform: platform
  };
}

// Extract data from specific report section
function extractSectionData(report: CampaignReport, sectionId: string): any {
  switch (sectionId) {
    case 'strategic-summary':
      return {
        title: 'الملخص الاستراتيجي',
        budget: report.budgetAllocation ? Object.values(report.budgetAllocation).reduce((sum, val) => sum + val, 0) : 0,
        platforms: Object.keys(report.budgetAllocation || {}),
        insights: [
          report.advancedInsights?.arpu?.insight,
          report.advancedInsights?.cac?.insight,
          report.advancedInsights?.breakEvenRoas?.insight
        ].filter(Boolean),
        recommendations: report.recommendations || []
      };
    case 'kpi-snippets':
      return {
        title: 'مؤشرات الأداء الرئيسية',
        kpis: report.kpis?.totals ? Object.entries(report.kpis.totals).map(([key, value]) => ({ name: key, value })) : []
      };
    case 'media-plan':
      return {
        title: 'الخطة الإعلامية',
        platforms: Object.keys(report.budgetAllocation || {}),
        budget: report.budgetAllocation ? Object.values(report.budgetAllocation).reduce((sum, val) => sum + val, 0) : 0
      };
    case 'growth-funnel':
      return {
        title: 'قمع النمو',
        funnel: {
          stage: report.funnelStage,
          seasonalLift: report.advancedInsights?.seasonalLift
        }
      };
    case 'beyond-kpis':
      return {
        title: 'ما وراء مؤشرات الأداء',
        insights: [
          report.advancedInsights?.arpu,
          report.advancedInsights?.cac,
          report.advancedInsights?.breakEvenRoas
        ].filter(Boolean)
      };
    case 'beyond-budget':
      return {
        title: 'ما وراء توزيع الميزانية',
        reasoning: report.advancedInsights?.budgetReasoning || []
      };
    case 'advanced-recommendations':
      return {
        title: 'التوصيات المتقدمة',
        recommendations: report.recommendations || []
      };
    default:
      return {
        title: 'تقرير الحملة الإعلانية',
        budget: report.budgetAllocation ? Object.values(report.budgetAllocation).reduce((sum, val) => sum + val, 0) : 0,
        platforms: Object.keys(report.budgetAllocation || {})
      };
  }
}

// Generate platform-specific content
async function generatePlatformContent(data: any, platform: SocialPlatform): Promise<SocialContent> {
  const hashtags = generateHashtags(data);
  const mentions = generateMentions(platform.id);
  
  let text = '';
  let imageUrl = '';

  switch (platform.id) {
    case 'facebook':
      text = generateFacebookContent(data, hashtags);
      break;
    case 'linkedin':
      text = generateLinkedInContent(data, hashtags);
      break;
    case 'twitter':
      text = generateTwitterContent(data, hashtags);
      break;
    case 'whatsapp':
      text = generateWhatsAppContent(data);
      break;
  }

  // Ensure content fits platform limits
  if (platform.maxLength && text.length > platform.maxLength) {
    text = truncateContent(text, platform.maxLength);
  }

  return {
    text,
    imageUrl,
    hashtags,
    mentions,
    platform: platform.id
  };
}

// Generate Facebook content
function generateFacebookContent(data: any, hashtags: string[]): string {
  const hashtagText = hashtags.length > 0 ? `\n\n${hashtags.join(' ')}` : '';
  
  if (data.title === 'الملخص الاستراتيجي') {
    return `🎯 ${data.title}\n\n` +
           `💰 الميزانية: ${data.budget?.toLocaleString('ar-SA')} ريال\n` +
           `📱 المنصات: ${data.platforms?.join(', ') || 'متعددة'}\n\n` +
           `💡 الرؤى الرئيسية:\n` +
           `${data.insights?.slice(0, 3).map((insight: string) => `• ${insight}`).join('\n') || 'تحليل شامل للحملة'}\n\n` +
           `🚀 التوصيات:\n` +
           `${data.recommendations?.slice(0, 2).map((rec: string) => `• ${rec}`).join('\n') || 'استراتيجيات مدروسة'}` +
           hashtagText;
  }
  
  if (data.title === 'مؤشرات الأداء الرئيسية') {
    return `📊 ${data.title}\n\n` +
           `مؤشرات الأداء الرئيسية للحملة:\n` +
           `${data.kpis?.slice(0, 3).map((kpi: any) => `• ${kpi.name}: ${kpi.value}`).join('\n') || 'تحليل شامل للمؤشرات'}\n\n` +
           `#PrePilot #مؤشرات_الأداء #التسويق_الرقمي` +
           hashtagText;
  }
  
  return `📊 ${data.title}\n\n` +
         `تحليل شامل ومفصل للحملة الإعلانية مع رؤى استراتيجية قيمة.\n\n` +
         `#PrePilot #التسويق_الرقمي #الإعلانات` +
         hashtagText;
}

// Generate LinkedIn content
function generateLinkedInContent(data: any, hashtags: string[]): string {
  const hashtagText = hashtags.length > 0 ? `\n\n${hashtags.join(' ')}` : '';
  
  if (data.title === 'الملخص الاستراتيجي') {
    return `🎯 ${data.title}\n\n` +
           `كجزء من استراتيجيتنا التسويقية، قمنا بتطوير خطة شاملة تشمل:\n\n` +
           `💰 الميزانية: ${data.budget?.toLocaleString('ar-SA')} ريال\n` +
           `📱 المنصات المستهدفة: ${data.platforms?.join(', ') || 'متعددة'}\n\n` +
           `🔍 الرؤى الاستراتيجية:\n` +
           `${data.insights?.slice(0, 3).map((insight: string) => `• ${insight}`).join('\n') || 'تحليل عميق للسوق'}\n\n` +
           `🚀 التوصيات التنفيذية:\n` +
           `${data.recommendations?.slice(0, 2).map((rec: string) => `• ${rec}`).join('\n') || 'استراتيجيات مثبتة'}\n\n` +
           `هذا التحليل يساعد في اتخاذ قرارات مدروسة وتحسين الأداء التسويقي.` +
           hashtagText;
  }
  
  if (data.title === 'مؤشرات الأداء الرئيسية') {
    return `📊 ${data.title}\n\n` +
           `تحليل متقدم لمؤشرات الأداء الرئيسية:\n\n` +
           `${data.kpis?.slice(0, 3).map((kpi: any) => `• ${kpi.name}: ${kpi.value}`).join('\n') || 'تحليل شامل للمؤشرات'}\n\n` +
           `هذه المؤشرات تساعد في قياس فعالية الحملة واتخاذ قرارات مدروسة.\n\n` +
           `#PrePilot #مؤشرات_الأداء #الذكاء_الاصطناعي #التسويق_الرقمي` +
           hashtagText;
  }
  
  return `📊 ${data.title}\n\n` +
         `تحليل متقدم للحملة الإعلانية باستخدام أحدث أدوات الذكاء الاصطناعي.\n\n` +
         `النتائج تظهر رؤى قيمة يمكن تطبيقها لتحسين الأداء التسويقي.\n\n` +
         `#PrePilot #التسويق_الرقمي #الذكاء_الاصطناعي #الإعلانات` +
         hashtagText;
}

// Generate Twitter/X content
function generateTwitterContent(data: any, hashtags: string[]): string {
  const hashtagText = hashtags.length > 0 ? `\n\n${hashtags.join(' ')}` : '';
  
  if (data.title === 'الملخص الاستراتيجي') {
    return `🎯 ${data.title}\n\n` +
           `💰 ${data.budget?.toLocaleString('ar-SA')} ريال\n` +
           `📱 ${data.platforms?.join(', ') || 'متعددة'}\n\n` +
           `💡 ${data.insights?.[0] || 'رؤى استراتيجية قيمة'}\n\n` +
           `🚀 ${data.recommendations?.[0] || 'توصيات مدروسة'}` +
           hashtagText;
  }
  
  if (data.title === 'مؤشرات الأداء الرئيسية') {
    return `📊 ${data.title}\n\n` +
           `${data.kpis?.slice(0, 2).map((kpi: any) => `${kpi.name}: ${kpi.value}`).join(' | ') || 'تحليل شامل للمؤشرات'}\n\n` +
           `#PrePilot #مؤشرات_الأداء` +
           hashtagText;
  }
  
  return `📊 ${data.title}\n\n` +
         `تحليل ذكي للحملة الإعلانية باستخدام #PrePilot\n\n` +
         `رؤى قيمة لتحسين الأداء التسويقي` +
         hashtagText;
}

// Generate WhatsApp content
function generateWhatsAppContent(data: any): string {
  if (data.title === 'الملخص الاستراتيجي') {
    return `🎯 *${data.title}*\n\n` +
           `💰 *الميزانية:* ${data.budget?.toLocaleString('ar-SA')} ريال\n` +
           `📱 *المنصات:* ${data.platforms?.join(', ') || 'متعددة'}\n\n` +
           `💡 *الرؤى الرئيسية:*\n` +
           `${data.insights?.slice(0, 3).map((insight: string) => `• ${insight}`).join('\n') || 'تحليل شامل للحملة'}\n\n` +
           `🚀 *التوصيات:*\n` +
           `${data.recommendations?.slice(0, 2).map((rec: string) => `• ${rec}`).join('\n') || 'استراتيجيات مدروسة'}\n\n` +
           `_تم إنشاؤه باستخدام PrePilot_`;
  }
  
  if (data.title === 'مؤشرات الأداء الرئيسية') {
    return `📊 *${data.title}*\n\n` +
           `مؤشرات الأداء الرئيسية:\n` +
           `${data.kpis?.slice(0, 3).map((kpi: any) => `• ${kpi.name}: ${kpi.value}`).join('\n') || 'تحليل شامل للمؤشرات'}\n\n` +
           `_تم إنشاؤه باستخدام PrePilot_`;
  }
  
  return `📊 *${data.title}*\n\n` +
         `تحليل شامل ومفصل للحملة الإعلانية مع رؤى استراتيجية قيمة.\n\n` +
         `_تم إنشاؤه باستخدام PrePilot_`;
}

// Generate relevant hashtags
function generateHashtags(data: any): string[] {
  const baseHashtags = ['PrePilot', 'التسويق_الرقمي', 'الإعلانات'];
  const specificHashtags: string[] = [];
  
  if (data.budget) {
    specificHashtags.push('الميزانية_التسويقية');
  }
  
  if (data.platforms) {
    specificHashtags.push('التسويق_المتعدد_المنصات');
  }
  
  if (data.insights) {
    specificHashtags.push('التحليل_الاستراتيجي');
  }
  
  if (data.recommendations) {
    specificHashtags.push('التوصيات_التسويقية');
  }
  
  return [...baseHashtags, ...specificHashtags];
}

// Generate relevant mentions
function generateMentions(platform: string): string[] {
  const mentions: { [key: string]: string[] } = {
    facebook: ['@PrePilot'],
    linkedin: ['@PrePilot'],
    twitter: ['@PrePilot'],
    whatsapp: []
  };
  
  return mentions[platform] || [];
}

// Truncate content to fit platform limits
function truncateContent(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  
  // Try to truncate at sentence boundary
  const sentences = text.split(/[.!?]/);
  let result = '';
  
  for (const sentence of sentences) {
    if ((result + sentence).length > maxLength - 3) {
      break;
    }
    result += sentence + '.';
  }
  
  if (result.length === 0) {
    result = text.substring(0, maxLength - 3) + '...';
  }
  
  return result;
}

// Share to specific platform
export async function shareToPlatform(content: SocialContent, platform: string): Promise<void> {
  const platformInfo = SOCIAL_PLATFORMS.find(p => p.id === platform);
  if (!platformInfo) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  // Special handling for Facebook - use the new Facebook API
  if (platform === 'facebook') {
    await shareToFacebook(content);
    return;
  }

  const shareUrl = generateShareUrl(content, platformInfo);
  window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
}

// Share to Facebook using multiple methods
async function shareToFacebook(content: SocialContent): Promise<void> {
  // Method 1: Try Web Share API first (works on mobile and some desktop browsers)
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'تقرير PrePilot',
        text: content.text,
        url: 'https://prepilot.cloud'
      });
      return;
    } catch (error) {
      console.log('Web Share API failed, trying Facebook URL method');
    }
  }

  // Method 2: Facebook's sharing URL (most reliable)
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://prepilot.cloud')}&quote=${encodeURIComponent(content.text)}`;
  
  // Method 3: Alternative Facebook sharing URL
  const alternativeUrl = `https://www.facebook.com/dialog/share?app_id=123456789&display=popup&href=${encodeURIComponent('https://prepilot.cloud')}&quote=${encodeURIComponent(content.text)}`;
  
  try {
    // Try the main Facebook sharing URL
    const popup = window.open(facebookUrl, 'facebook-share', 'width=600,height=400,scrollbars=yes,resizable=yes,left=' + (screen.width/2 - 300) + ',top=' + (screen.height/2 - 200));
    
    // Check if popup was blocked
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      // Try alternative URL
      window.open(alternativeUrl, 'facebook-share-alt', 'width=600,height=400,scrollbars=yes,resizable=yes,left=' + (screen.width/2 - 300) + ',top=' + (screen.height/2 - 200));
    }
  } catch (error) {
    console.error('Facebook sharing failed:', error);
    // Final fallback - copy to clipboard and show instructions
    try {
      await navigator.clipboard.writeText(content.text);
      alert('تم نسخ النص إلى الحافظة. يمكنك الآن لصقه في فيسبوك يدوياً.');
    } catch (clipboardError) {
      console.error('Clipboard copy failed:', clipboardError);
      alert('فشل في فتح فيسبوك. يرجى نسخ النص التالي ولصقه في فيسبوك:\n\n' + content.text);
    }
  }
}

// Generate share URL for each platform
function generateShareUrl(content: SocialContent, platform: SocialPlatform): string {
  const encodedText = encodeURIComponent(content.text);
  const encodedImageUrl = content.imageUrl ? encodeURIComponent(content.imageUrl) : '';
  
  switch (platform.id) {
    case 'facebook':
      // Facebook requires a URL to share, so we'll use a placeholder or the image URL
      const facebookUrl = content.imageUrl || 'https://prepilot.cloud';
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(facebookUrl)}&quote=${encodedText}`;
    
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://prepilot.cloud')}&summary=${encodedText}`;
    
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodedText}`;
    
    case 'whatsapp':
      return `https://wa.me/?text=${encodedText}`;
    
    default:
      throw new Error(`Unsupported platform: ${platform.id}`);
  }
}

// Copy content to clipboard
export async function copyToClipboard(content: SocialContent): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(content.text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

// Generate AI-powered social media content
export async function generateSocialMediaContent(
  report: CampaignReport,
  sectionId: string,
  platform: string,
  tone: string = 'professional',
  length: 'short' | 'medium' | 'long' = 'medium'
): Promise<SocialContent> {
  try {
    const platformInfo = SOCIAL_PLATFORMS.find(p => p.id === platform);
    if (!platformInfo) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    const sectionData = extractSectionData(report, sectionId);
    if (!sectionData) {
      throw new Error(`Section not found: ${sectionId}`);
    }

    const systemInstruction = `أنت خبير في التسويق الرقمي والمحتوى الاجتماعي. اكتب منشوراً احترافياً باللغة العربية لـ ${platformInfo.name} بناءً على البيانات المقدمة. 
    
    المتطلبات:
    - النبرة: ${tone}
    - الطول: ${length === 'short' ? 'قصير (1-2 جملة)' : length === 'medium' ? 'متوسط (3-4 جمل)' : 'طويل (5+ جمل)'}
    - الحد الأقصى: ${platformInfo.maxLength || 'بدون حد'} حرف
    - استخدم الهاشتاغات المناسبة
    - اجعل المحتوى جذاباً ومفيداً
    - ركز على النقاط الرئيسية من البيانات`;

    const prompt = `اكتب منشوراً لـ ${platformInfo.name} بناءً على البيانات التالية:
    
    عنوان التقرير: ${sectionData.title || 'تقرير الحملة الإعلانية'}
    القسم: ${sectionId}
    البيانات: ${JSON.stringify(sectionData, null, 2)}
    
    اجعل المنشور جذاباً ومفيداً للجمهور.`;

    const aiContent = await generateAiText(prompt, systemInstruction);
    
    // Extract hashtags and mentions from AI content
    const hashtags = extractHashtagsFromText(aiContent, platform);
    const mentions = extractMentionsFromText(aiContent, platform);
    
    // Clean content from hashtags and mentions for main text
    let cleanContent = aiContent;
    hashtags.forEach(tag => {
      cleanContent = cleanContent.replace(new RegExp(`#${tag}\\b`, 'g'), '');
    });
    mentions.forEach(mention => {
      cleanContent = cleanContent.replace(new RegExp(`@${mention}\\b`, 'g'), '');
    });
    cleanContent = cleanContent.replace(/\s+/g, ' ').trim();

    // Truncate if needed
    const finalContent = platformInfo.maxLength 
      ? truncateContent(cleanContent, platformInfo.maxLength)
      : cleanContent;

    return {
      text: finalContent,
      hashtags,
      mentions,
      platform
    };
  } catch (error) {
    console.error(`Failed to generate AI content for ${platform}:`, error);
    
    // Fallback content
    const fallbackSectionData = extractSectionData(report, sectionId);
    return {
      text: `📊 تقرير جديد: ${fallbackSectionData.title || 'تقرير الحملة الإعلانية'}\n\nاكتشف الرؤى والأفكار من ${sectionId} في تقريرنا الجديد.`,
      hashtags: ['تقرير', 'تحليل', 'بيانات'],
      mentions: [],
      platform
    };
  }
}


// Generate social content for multiple platforms
export async function generateSocialContentForMultiple(
  report: CampaignReport,
  sectionId: string,
  platform: string
): Promise<SocialContent> {
  return generateSocialMediaContent(report, sectionId, platform, 'professional', 'medium');
}

// Generate shareable report link
export function generateReportShareLink(report: CampaignReport): string {
  // Create a unique report ID using traceId or generate one
  const reportId = report.traceId || `report-${Date.now()}`;
  
  // Generate a shareable link (in a real app, this would be stored in a database)
  const baseUrl = window.location.origin;
  const shareableUrl = `${baseUrl}/shared-report/${reportId}`;
  
  return shareableUrl;
}

// Generate social content for full report sharing
export async function generateFullReportShareContent(
  report: CampaignReport,
  platform: string,
  shareableUrl: string
): Promise<SocialContent> {
  try {
    const platformInfo = SOCIAL_PLATFORMS.find(p => p.id === platform);
    if (!platformInfo) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    const systemInstruction = `أنت خبير في التسويق الرقمي والمحتوى الاجتماعي. اكتب منشوراً احترافياً باللغة العربية لـ ${platformInfo.name} لمشاركة تقرير كامل. 
    
    المتطلبات:
    - النبرة: احترافية ومثيرة للاهتمام
    - الطول: متوسط (3-4 جمل)
    - الحد الأقصى: ${platformInfo.maxLength || 'بدون حد'} حرف
    - استخدم الهاشتاغات المناسبة
    - اجعل المحتوى جذاباً ومفيداً
    - ركز على النقاط الرئيسية من التقرير
    - اذكر أن التقرير متاح للقراءة عبر الرابط`;

    const prompt = `اكتب منشوراً لـ ${platformInfo.name} لمشاركة تقرير كامل:
    
    عنوان التقرير: ${report.narrative || 'تقرير الحملة التسويقية'}
    الميزانية: ${report.budgetAllocation ? Object.values(report.budgetAllocation).reduce((sum, val) => sum + val, 0).toLocaleString() : 'غير محدد'} ريال
    الصناعة: ${report.industry || 'غير محدد'}
    المنصات: ${report.budgetAllocation ? Object.keys(report.budgetAllocation).join(', ') : 'غير محدد'}
    الرابط: ${shareableUrl}
    
    اجعل المنشور جذاباً ومفيداً للجمهور مع التركيز على القيمة المضافة للتقرير.`;

    const aiContent = await generateAiText(prompt, systemInstruction);
    
    // Extract hashtags and mentions from AI content
    const hashtags = extractHashtagsFromText(aiContent, platform);
    const mentions = extractMentionsFromText(aiContent, platform);
    
    // Clean content from hashtags and mentions for main text
    let cleanContent = aiContent;
    hashtags.forEach(tag => {
      cleanContent = cleanContent.replace(new RegExp(`#${tag}\\b`, 'g'), '');
    });
    mentions.forEach(mention => {
      cleanContent = cleanContent.replace(new RegExp(`@${mention}\\b`, 'g'), '');
    });
    cleanContent = cleanContent.replace(/\s+/g, ' ').trim();

    // Add the shareable URL to the content
    const finalContent = `${cleanContent}\n\n🔗 اقرأ التقرير كاملاً: ${shareableUrl}`;

    // Truncate if needed
    const truncatedContent = platformInfo.maxLength 
      ? truncateContent(finalContent, platformInfo.maxLength)
      : finalContent;

    return {
      text: truncatedContent,
      hashtags,
      mentions,
      platform
    };
  } catch (error) {
    console.error(`Failed to generate full report share content for ${platform}:`, error);
    
    // Fallback content
    return {
      text: `📊 تقرير جديد: ${report.narrative || 'تقرير الحملة التسويقية'}\n\nاكتشف الرؤى والأفكار من تقريرنا الجديد.\n\n🔗 اقرأ التقرير كاملاً: ${shareableUrl}`,
      hashtags: ['تقرير', 'تحليل', 'بيانات', 'تسويق'],
      mentions: [],
      platform
    };
  }
}

// Share full report to platform
export async function shareFullReport(
  report: CampaignReport,
  platform: string
): Promise<void> {
  try {
    const shareableUrl = generateReportShareLink(report);
    const content = await generateFullReportShareContent(report, platform, shareableUrl);
    await shareToPlatform(content, platform);
  } catch (error) {
    console.error('Failed to share full report:', error);
    throw error;
  }
}

// Extract hashtags from text
function extractHashtagsFromText(text: string, platform: string): string[] {
  const hashtagRegex = /#(\w+)/g;
  const matches = text.match(hashtagRegex);
  const hashtags = matches ? matches.map(match => match.substring(1)) : [];
  
  // Add platform-specific hashtags if none found
  if (hashtags.length === 0) {
    return generateHashtags({ platform });
  }
  
  return hashtags;
}

// Extract mentions from text
function extractMentionsFromText(text: string, platform: string): string[] {
  const mentionRegex = /@(\w+)/g;
  const matches = text.match(mentionRegex);
  const mentions = matches ? matches.map(match => match.substring(1)) : [];
  
  // Add platform-specific mentions if none found
  if (mentions.length === 0) {
    return generateMentions(platform);
  }
  
  return mentions;
}

// Save as draft
export function saveAsDraft(content: SocialContent, reportId: string, sectionId: string): SocialPost {
  return {
    id: `draft-${Date.now()}`,
    platform: content.platform,
    content: content.text,
    imageUrl: content.imageUrl,
    hashtags: content.hashtags,
    mentions: content.mentions,
    createdAt: new Date(),
    status: 'draft',
    reportId,
    sectionId
  };
}
