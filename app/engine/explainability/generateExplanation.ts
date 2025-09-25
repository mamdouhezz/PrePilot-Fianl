import { generateAiText } from '../../services/geminiService';
import { CampaignReport } from '../../types';

export interface KPIExplanation {
  kpiName: string;
  explanation: string;
  kpiValue: number | string;
}

export interface CampaignContext {
  industry: string;
  budget: number;
  platforms: string[];
  goals: string[];
  funnelStage: string;
}

/**
 * Generates AI-powered explanation for a specific KPI
 * @param kpiName - Name of the KPI
 * @param kpiValue - Value of the KPI
 * @param context - Campaign context
 * @returns Promise<string> - AI-generated explanation in Saudi Arabic
 */
export async function generateExplanation(
  kpiName: string, 
  kpiValue: number | string, 
  context: CampaignContext
): Promise<string> {
  try {
    const prompt = `
اكتب شرح مختصر ومفهوم باللهجة السعودية ليه توقعنا ${kpiName} يكون ${kpiValue}.

المعلومات الأساسية:
- المجال: ${context.industry}
- الميزانية: ${context.budget.toLocaleString()} ريال
- المنصات: ${context.platforms.join('، ')}
- الأهداف: ${context.goals.join('، ')}
- مرحلة القمع: ${context.funnelStage}

المطلوب:
- اكتب 2-3 جمل قصيرة ومفهومة
- استخدم اللهجة السعودية الودودة والمهنية
- وضّح المنطق وراء هذا التوقع
- اذكر العوامل التي أثرت على الرقم
- تجنب المصطلحات التقنية المعقدة
- كن مباشر وواضح في الشرح

أمثلة على النبرة المطلوبة:
- "توقعنا معدل النقر 2.3% بناءً على تجارب سابقة مع جمهور مشابه"
- "تكلفة الاكتساب مقدرة حسب متوسط السوق في هالمجال"
- "العائد على الإنفاق محسوب من متوسط قيمة الطلب المتوقع"

اجعل الشرح منطقي ومقنع ولكن بسيط.
`;

    const text = await generateAiText(prompt, 'أجب باللهجة السعودية بوضوح وباختصار.');
    return cleanGeneratedText(text);
  } catch (error) {
    console.error('Error generating KPI explanation:', error);
    // Return a user-facing error message instead of a mock explanation
    return `تعذر إنشاء الشرح بالذكاء الاصطناعي لـ ${kpiName}.`;
  }
}

/**
 * Generates explanations for multiple KPIs
 * @param report - Campaign report
 * @returns Promise<KPIExplanation[]> - Array of KPI explanations
 */
export async function generateAllKPIExplanations(report: CampaignReport): Promise<KPIExplanation[]> {
  const context: CampaignContext = {
    industry: report.industry || 'عام',
    budget: report.kpis.totals.budget,
    platforms: Object.keys(report.kpis.perPlatform || {}),
    goals: (report as any).goals || [],
    funnelStage: (report as any).funnelStage || 'awareness'
  };

  const kpis = [
    {
      name: 'معدل النقر (CTR)',
      value: `${report.kpis.totals.ctr.toFixed(2)}%`,
      key: 'ctr'
    },
    {
      name: 'تكلفة الاكتساب (CPA)',
      value: `${report.kpis.totals.cpa.toLocaleString('ar-SA')} ريال`,
      key: 'cpa'
    },
    {
      name: 'العائد على الإنفاق (ROAS)',
      value: `${report.kpis.totals.roas.toFixed(1)}x`,
      key: 'roas'
    },
    {
      name: 'متوسط العائد لكل مستخدم (ARPU)',
      value: `${report.kpis.totals.arpu.toLocaleString('ar-SA')} ريال`,
      key: 'arpu'
    }
  ];

  // Add dynamic KPIs if available
  if (report.kpis.totals.impressions > 0) {
    kpis.push({
      name: 'عدد مرات الظهور',
      value: report.kpis.totals.impressions.toLocaleString('ar-SA'),
      key: 'impressions'
    });
  }

  if (report.kpis.totals.conversions > 0) {
    kpis.push({
      name: 'عدد التحويلات',
      value: report.kpis.totals.conversions.toLocaleString('ar-SA'),
      key: 'conversions'
    });
  }

  if (report.kpis.totals.cac > 0) {
    kpis.push({
      name: 'تكلفة العميل (CAC)',
      value: `${report.kpis.totals.cac.toLocaleString('ar-SA')} ريال`,
      key: 'cac'
    });
  }

  // Generate explanations for all KPIs
  const explanations: KPIExplanation[] = [];
  
  for (const kpi of kpis) {
    try {
      const explanation = await generateExplanation(kpi.name, kpi.value, context);
      explanations.push({
        kpiName: kpi.name,
        kpiValue: kpi.value,
        explanation: explanation
      });
    } catch (error) {
      console.error(`Failed to generate explanation for ${kpi.name}:`, error);
      // Add fallback explanation
      explanations.push({
        kpiName: kpi.name,
        kpiValue: kpi.value,
        explanation: generateFallbackExplanation(kpi.name, kpi.value, context)
      });
    }
  }

  return explanations;
}

/**
 * Gets formula for a specific KPI
 * @param kpiKey - KPI key
 * @returns Formula string or undefined
 */
function getKPITFormula(kpiKey: string): string | undefined {
  const formulas: Record<string, string> = {
    ctr: 'CTR = (النقرات ÷ مرات الظهور) × 100',
    cpa: 'CPA = إجمالي التكلفة ÷ عدد العملاء المكتسبين',
    roas: 'ROAS = إجمالي الإيرادات ÷ إجمالي التكلفة',
    arpu: 'ARPU = إجمالي الإيرادات ÷ عدد المستخدمين',
    cac: 'CAC = إجمالي التكلفة ÷ عدد العملاء الجدد',
    impressions: 'مرات الظهور = عدد مرات عرض الإعلان',
    conversions: 'التحويلات = عدد العمليات المكتملة'
  };

  return formulas[kpiKey];
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
    .join(' ');
}

/**
 * Generates a fallback explanation when AI is unavailable
 * @param kpiName - Name of the KPI
 * @param kpiValue - Value of the KPI
 * @param context - Campaign context
 * @returns Fallback explanation text
 */
function generateFallbackExplanation(
  kpiName: string, 
  kpiValue: number | string, 
  context: CampaignContext
): string {
  const explanations: Record<string, string> = {
    'معدل النقر (CTR)': `معدل النقر ${kpiValue} مبني على تجارب سابقة في مجال ${context.industry} مع جمهور مشابه، مع اعتبار نوع المحتوى والمنصات المستخدمة.`,
    'تكلفة الاكتساب (CPA)': `تكلفة الاكتساب ${kpiValue} مقدرة حسب متوسط السوق في مجال ${context.industry}، مع مراعاة مستوى المنافسة وحجم الميزانية المتاحة.`,
    'العائد على الإنفاق (ROAS)': `العائد على الإنفاق ${kpiValue} محسوب بناءً على متوسط قيمة الطلب المتوقع ومعدل التحويل في مجال ${context.industry}.`,
    'متوسط العائد لكل مستخدم (ARPU)': `متوسط العائد لكل مستخدم ${kpiValue} مبني على تحليل سلوك العملاء في مجال ${context.industry} ومعدلات الشراء المتوقعة.`,
    'عدد مرات الظهور': `عدد مرات الظهور ${kpiValue} مقدر بناءً على حجم الميزانية المخصصة وتكلفة الظهور المتوقعة في المنصات المختارة.`,
    'عدد التحويلات': `عدد التحويلات ${kpiValue} متوقع بناءً على معدل التحويل في مجال ${context.industry} وحجم الجمهور المستهدف.`,
    'تكلفة العميل (CAC)': `تكلفة العميل ${kpiValue} محسوبة بناءً على تكلفة الاكتساب المتوقعة ومعدل الاحتفاظ بالعملاء في مجال ${context.industry}.`
  };

  return explanations[kpiName] || `القيمة ${kpiValue} مقدرة بناءً على تحليل السوق والتجارب السابقة في مجال ${context.industry}.`;
}

/**
 * Formats the current date in Arabic for sharing
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