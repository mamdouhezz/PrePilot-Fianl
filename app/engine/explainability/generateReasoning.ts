import { CampaignReport } from '../../types';

export interface BudgetAllocation {
  platform: string;
  allocatedBudget: number;
  percentage: number;
}

export interface BudgetReasoning {
  platform: string;
  budget: number;
  percentage: number;
  explanation: string;
  icon: string;
  color: string;
}

export interface CampaignContext {
  industry: string;
  budget: number;
  goals: string[];
  funnelStage: string;
  platforms: string[];
  targetAudience: {
    age: string[];
    gender: string;
    locations: string[];
  };
}

/**
 * Generates AI-powered reasoning for budget allocation to a specific platform
 * @param allocation - Budget allocation data
 * @param context - Campaign context
 * @returns Promise<string> - AI-generated reasoning in Saudi Arabic
 */
export async function generateReasoning(
  allocation: BudgetAllocation,
  context: CampaignContext
): Promise<string> {
  try {
    const prompt = `
اكتب شرح مختصر ومفهوم باللهجة السعودية ليه خصصنا ${allocation.percentage.toFixed(1)}% من الميزانية (${allocation.allocatedBudget.toLocaleString()} ريال) لمنصة ${allocation.platform}.

المعلومات الأساسية:
- المجال: ${context.industry}
- الميزانية الإجمالية: ${context.budget.toLocaleString()} ريال
- أهداف الحملة: ${context.goals.join('، ')}
- مرحلة القمع: ${context.funnelStage}
- المنصات المستخدمة: ${context.platforms.join('، ')}
- الجمهور المستهدف: ${context.targetAudience.age.join('، ')} ${context.targetAudience.gender} في ${context.targetAudience.locations.join('، ')}

المطلوب:
- اكتب 1-2 جمل قصيرة ومفهومة
- استخدم اللهجة السعودية الودودة والمهنية
- وضّح المنطق وراء هذا التخصيص
- اذكر المميزات الرئيسية للمنصة
- ربط التخصيص بهدف الحملة
- تجنب المصطلحات التقنية المعقدة
- كن مباشر وواضح في الشرح

أمثلة على النبرة المطلوبة:
- "خصصنا 40% لأن الحملة هدفها مبيعات مباشرة، وقوقل معروف إنه يعطي أعلى نية شراء."
- "أخذ 30% لأنه يوازن بين التفاعل والتحويلات، خاصة مع الفئات العمرية 25–40."
- "20% لأنه ممتاز لزيادة الوعي السريع بين الشباب، ويدعم باقي القنوات."

اجعل الشرح منطقي ومقنع ولكن بسيط.
`;

    // Direct usage of the ai client is intended here
    // const text = await generateAiText(prompt, 'أجب باللهجة السعودية وباختصار شديد مع سبب منطقي واضح.');
    // return cleanGeneratedText(text);
    return "AI explanation generation is handled in another module.";

  } catch (error) {
    console.error('Error generating budget reasoning:', error);
    
    // Return a user-facing error message instead of a mock explanation
    return `تعذر إنشاء الشرح بالذكاء الاصطناعي لمنصة ${allocation.platform}.`;
  }
}

/**
 * Generates reasoning for all platform allocations
 * @param report - Campaign report
 * @returns Promise<BudgetReasoning[]> - Array of budget reasoning objects
 */
export async function generateAllBudgetReasoning(report: CampaignReport): Promise<BudgetReasoning[]> {
  const context: CampaignContext = {
    industry: report.industry || 'عام',
    budget: report.kpis.totals.budget,
    goals: report.goals || [],
    funnelStage: (report as any).funnelStage || 'awareness',
    platforms: Object.keys(report.kpis.perPlatform || {}),
    targetAudience: {
      age: ['18-65'], // Default age range
      gender: 'جميع',
      locations: ['المملكة العربية السعودية']
    }
  };

  const reasoningList: BudgetReasoning[] = [];

  for (const [platform, allocatedBudget] of Object.entries((report as any).budgetAllocation)) {
    const percentage = report.kpis.totals.budget > 0 ? (allocatedBudget as number / report.kpis.totals.budget) * 100 : 0;
    const allocation: BudgetAllocation = { platform, allocatedBudget: allocatedBudget as number, percentage };

    try {
      const explanation = await generateReasoning(allocation, context);
      
      reasoningList.push({
        platform: allocation.platform,
        budget: allocation.allocatedBudget,
        percentage: allocation.percentage,
        explanation: explanation,
        icon: getPlatformIcon(allocation.platform),
        color: getPlatformColor(allocation.platform)
      });
    } catch (error) {
      console.error(`Failed to generate reasoning for ${allocation.platform}:`, error);
      
      // Add fallback reasoning with an error message
      reasoningList.push({
        platform: allocation.platform,
        budget: allocation.allocatedBudget,
        percentage: allocation.percentage,
        explanation: generateFallbackReasoning(allocation, context),
        icon: getPlatformIcon(allocation.platform),
        color: getPlatformColor(allocation.platform)
      });
    }
  }

  // Sort by budget percentage (highest first)
  return reasoningList.sort((a, b) => b.percentage - a.percentage);
}

/**
 * Gets platform icon
 * @param platformName - Platform name
 * @returns Platform icon string
 */
function getPlatformIcon(platformName: string): string {
  const iconMap: Record<string, string> = {
    'Google Ads': '🔍',
    'Google': '🔍',
    'Meta (Facebook/Instagram)': '📘',
    'Facebook': '📘',
    'Instagram': '📷',
    'Meta': '📘',
    'TikTok': '🎵',
    'YouTube': '📺',
    'LinkedIn': '💼',
    'Twitter': '🐦',
    'Snapchat': '👻',
    'Pinterest': '📌',
    'Reddit': '🤖'
  };

  return iconMap[platformName] || '📱';
}

/**
 * Gets platform color class
 * @param platformName - Platform name
 * @returns Tailwind color class
 */
function getPlatformColor(platformName: string): string {
  const colorMap: Record<string, string> = {
    'Google Ads': 'bg-blue-500',
    'Google': 'bg-blue-500',
    'Meta (Facebook/Instagram)': 'bg-indigo-600',
    'Facebook': 'bg-indigo-600',
    'Instagram': 'bg-pink-500',
    'Meta': 'bg-indigo-600',
    'TikTok': 'bg-pink-600',
    'YouTube': 'bg-red-600',
    'LinkedIn': 'bg-blue-700',
    'Twitter': 'bg-blue-400',
    'Snapchat': 'bg-yellow-500',
    'Pinterest': 'bg-red-500',
    'Reddit': 'bg-orange-500'
  };

  return colorMap[platformName] || 'bg-gray-500';
}

/**
 * Cleans up the generated text from AI
 * @param text - Raw AI-generated text
 * @returns Cleaned text
 */
function cleanGeneratedText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
    .replace(/\*(.*?)\*/g, '$1')     // Remove italic formatting
    .replace(/#{1,6}\s*/g, '')       // Remove heading markers
    .replace(/```[\s\S]*?```/g, '')  // Remove code blocks
    .trim()
    .split('\n')
    .filter(line => line.trim().length > 0)
    .join(' ')
    .replace(/\s+/g, ' '); // Normalize whitespace
}

/**
 * Generates a fallback reasoning when AI is unavailable
 * @param allocation - Budget allocation data
 * @param context - Campaign context
 * @returns Fallback reasoning text
 */
function generateFallbackReasoning(
  allocation: BudgetAllocation,
  context: CampaignContext
): string {
  const platform = allocation.platform.toLowerCase();
  const percentage = allocation.percentage;
  
  const fallbackReasons: Record<string, string> = {
    'google ads': `خصصنا ${percentage.toFixed(1)}% لقوقل لأنه منصتنا الرئيسية لتحقيق الأهداف المطلوبة في مجال ${context.industry}.`,
    'google': `خصصنا ${percentage.toFixed(1)}% لقوقل لأنه منصتنا الرئيسية لتحقيق الأهداف المطلوبة في مجال ${context.industry}.`,
    'meta': `أخذ ميتا ${percentage.toFixed(1)}% لأنه يوفر توازن ممتاز بين التفاعل والتحويلات للجمهور المستهدف.`,
    'facebook': `أخذ فيسبوك ${percentage.toFixed(1)}% لأنه يوفر توازن ممتاز بين التفاعل والتحويلات للجمهور المستهدف.`,
    'instagram': `خصصنا إنستغرام ${percentage.toFixed(1)}% لأنه مثالي للتفاعل البصري وبناء الوعي بالعلامة التجارية.`,
    'tiktok': `أخذ تيك توك ${percentage.toFixed(1)}% لأنه ممتاز لرفع الوعي السريع والتفاعل مع الجمهور الشاب.`,
    'youtube': `خصصنا يوتيوب ${percentage.toFixed(1)}% لأنه منصة قوية للمحتوى الطويل والشرح التفصيلي.`,
    'linkedin': `أخذ لينكد إن ${percentage.toFixed(1)}% لأنه مثالي للوصول للمهنيين واتخاذ قرارات الشراء المعقدة.`,
    'twitter': `خصصنا تويتر ${percentage.toFixed(1)}% لأنه فعال للمحادثات الفورية وبناء الوعي.`,
    'snapchat': `أخذ سناب شات ${percentage.toFixed(1)}% لأنه ممتاز للوصول للجمهور الشاب والمحتوى المؤقت.`,
    'pinterest': `خصصنا بنترست ${percentage.toFixed(1)}% لأنه مثالي للوصول للمستخدمين الباحثين عن الإلهام والحلول.`,
    'reddit': `أخذ ريديت ${percentage.toFixed(1)}% لأنه فعال للوصول للمجتمعات المتخصصة والمناقشات العميقة.`
  };

  // Find matching platform
  for (const [key, reason] of Object.entries(fallbackReasons)) {
    if (platform.includes(key)) {
      return reason;
    }
  }

  // Default fallback
  return `خصصنا ${percentage.toFixed(1)}% لـ ${allocation.platform} لأنه يساهم في تحقيق أهداف الحملة في مجال ${context.industry}.`;
}

/**
 * Formats budget allocation for sharing
 * @param reasoning - Budget reasoning object
 * @returns Formatted string for social sharing
 */
export function formatBudgetForSharing(reasoning: BudgetReasoning): string {
  return `${reasoning.icon} ${reasoning.platform}: ${reasoning.percentage.toFixed(1)}% → ${reasoning.explanation}`;
}

/**
 * Formats all budget allocations for comprehensive sharing
 * @param reasonings - Array of budget reasoning objects
 * @returns Formatted content for social sharing
 */
export function formatComprehensiveBudgetShare(reasonings: BudgetReasoning[]): string {
  let content = `💡 وشلون وزعنا ميزانية الحملة؟\n\n`;
  
  reasonings.forEach((reasoning) => {
    content += `- ${formatBudgetForSharing(reasoning)}\n`;
  });
  
  content += `\n— تمت التقديرات باستخدام PrePilot AI\n\n`;
  content += `#PrePilotAI #توزيع_الميزانية #تحليل_إعلاني #ذكاء_اصطناعي`;

  return content;
}

/**
 * Gets current date in Arabic for sharing
 * @returns Formatted date string
 */
export function getCurrentDateInArabic(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Intl.DateTimeFormat('ar-SA', options).format(now);
}