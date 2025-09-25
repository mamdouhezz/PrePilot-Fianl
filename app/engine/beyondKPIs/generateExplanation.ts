import { generateAiText } from '../../services/geminiService';
import { CampaignReport, KpiSet } from '../../types';
import { KPIExplanation } from '../../types/beyond-kpis';

async function generateSingleKPIExplanation(
  kpiName: string,
  kpiValue: string,
  context: KPIExplanation['context']
): Promise<string> {
  const prompt = `
    اشرح باللهجة السعودية وبشكل مبسط ومقنع (جملتين إلى ثلاث) لماذا توقعنا أن تكون قيمة مؤشر الأداء "${kpiName}" هي "${kpiValue}".
    
    سياق الحملة للمعلومية:
    - المجال: ${context.industry}
    - الميزانية: ${context.budget.toLocaleString('ar-SA')} ريال
    - مرحلة الحملة: ${context.funnelStage}

    الهدف هو بناء ثقة المستخدم في الأرقام التي نعرضها. كن خبيرًا وواثقًا لكن ودودًا.
    مثال للإجابة المطلوبة: "معدل النقر ${kpiValue} يعتبر ممتاز لمجال التجارة الإلكترونية، خصوصًا وأن المحتوى فيديو، وهذا النوع عادةً يجذب تفاعل أعلى ويدفع الناس للنقر."
  `;
  const systemInstruction = "أنت خبير تسويق سعودي ودود ومحترف. مهمتك هي تفسير البيانات التسويقية المعقدة بطريقة سهلة الفهم للعملاء وأصحاب الأعمال.";
  
  return generateAiText(prompt, systemInstruction);
}


export async function generateAllKPIExplanations(report: CampaignReport): Promise<KPIExplanation[]> {
  const totals = report.kpis.totals;
  const context: KPIExplanation['context'] = {
    industry: report.industry,
    budget: totals.budget,
    funnelStage: report.funnelStage,
  };

  const kpisToExplain: { name: string; value: string; key: keyof KpiSet, formula: string }[] = [
    { name: 'العائد على الإنفاق (ROAS)', value: `${totals.roas.toFixed(2)}x`, key: 'roas', formula: '(الإيرادات / الميزانية)' },
    { name: 'تكلفة اكتساب العميل (CAC)', value: `${totals.cac.toFixed(2)} ريال`, key: 'cac', formula: '(الميزانية / عدد التحويلات)' },
    { name: 'معدل النقر (CTR)', value: `${totals.ctr.toFixed(2)}%`, key: 'ctr', formula: '(النقرات / مرات الظهور) * 100' },
    { name: 'عدد التحويلات', value: totals.conversions.toLocaleString('ar-SA'), key: 'conversions', formula: '(النقرات * معدل التحويل)' },
  ];

  const promises = kpisToExplain.map(async (kpi) => {
    try {
      const explanation = await generateSingleKPIExplanation(kpi.name, kpi.value, context);
      return {
        kpiName: kpi.name,
        kpiValue: kpi.value,
        explanation,
        formula: kpi.formula,
        context,
      };
    } catch (error) {
      console.error(`Failed to generate explanation for ${kpi.name}:`, error);
      // Return a fallback explanation on error
      return {
        kpiName: kpi.name,
        kpiValue: kpi.value,
        explanation: generateFallbackExplanation(kpi.name, kpi.value, context),
        formula: kpi.formula,
        context,
      };
    }
  });

  return Promise.all(promises);
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
  context: KPIExplanation['context']
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
