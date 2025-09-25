/**
 * AI Generators Module
 * Contains all functions that directly call AI APIs
 */

import { Type } from "@google/genai";
import { ai } from '../../services/aiClient';
import { CampaignData, KpiSet, ValidationFlag, AdvancedInsightsSet, BrandContext, UIWarning } from '../../types';
import { INDUSTRIES, GOALS, PLATFORMS, SEASONS, AUDIENCE_AGES, AUDIENCE_GENDERS, AUDIENCE_LOCATIONS, CAMPAIGN_DURATIONS, FUNNEL_STAGES, CONVERSION_DEFINITIONS, CREATIVE_TYPES, COMPETITOR_CONTEXTS } from '../../constants';
import { buildOrchestratorPrompt, buildUIWarningPrompt } from './prompts';
import { buildRealtimeTipsPrompt } from './prompts/realtimeTips.prompt';
import { industryMinBudgetريال } from '../validation/rules';
import { resolveSeasons, checkPlatformCompatibility } from '../validation/rules';

// Mock data for competitor analysis
const competitorSplits = [
  { industry: 'تجارة إلكترونية', competitor_split: { meta: 0.4, google_ads: 0.3, tiktok: 0.3 } }
];

const seasonalInsights = {
  ramadan: "During Ramadan, expect higher engagement but also increased competition. Focus on content that resonates with the spirit of the month.",
  white_friday: "White Friday is a high-stakes period. Budgets should be increased to capture massive user intent, but CAC will also rise.",
  default: "No specific seasonal lift applied. Focus on evergreen content and consistent performance."
};

/**
 * Generates advanced insights for the campaign
 */
export const generateAdvancedInsights = (totals: KpiSet, data: CampaignData): AdvancedInsightsSet => {
  const industryData = {
    'تجارة إلكترونية': { avg_CAC_ريال: 50 },
    'عقارات': { avg_CAC_ريال: 500 },
    'default': { avg_CAC_ريال: 75 },
  };
  
  const industryAvgCac = (industryData as any)[data.industry as any]?.avg_CAC_ريال || industryData.default.avg_CAC_ريال;
  const breakEvenRoas = data.profitMargin > 0 ? 1 / (data.profitMargin / 100) : Infinity;
  const activeSeason = data.seasons.find(s => seasonalInsights[s as keyof typeof seasonalInsights]) || 'default';
  
  return {
    arpu: {
      title: "متوسط العائد لكل تحويل (ARPU)",
      value: totals.arpu,
      status: 'neutral',
      insight: `متوقع أن يكون متوسط العائد لكل تحويل حوالي ${totals.arpu.toFixed(2)} ريال.`
    },
    cac: {
      title: "تكلفة اكتساب العميل (CAC)",
      value: totals.cac,
      benchmark: industryAvgCac,
      status: totals.cac < industryAvgCac ? 'above' : 'below',
      insight: totals.cac < industryAvgCac
        ? `تكلفة اكتساب العميل المتوقعة (${totals.cac.toFixed(2)} ريال) أقل من معيار الصناعة (${industryAvgCac} ريال).`
        : `تكلفة اكتساب العميل المتوقعة (${totals.cac.toFixed(2)} ريال) أعلى من معيار الصناعة (${industryAvgCac} ريال).`
    },
    breakEvenRoas: {
      title: "نقطة التعادل للعائد (Break-Even ROAS)",
      value: breakEvenRoas,
      benchmark: totals.roas,
      status: totals.roas > breakEvenRoas ? 'above' : 'below',
      insight: totals.roas > breakEvenRoas
        ? `الحملة متوقعة أن تكون مربحة. العائد المتوقع (${totals.roas.toFixed(2)}x) يتجاوز نقطة التعادل (${breakEvenRoas.toFixed(2)}x).`
        : `الحملة قد لا تكون مربحة. العائد المتوقع (${totals.roas.toFixed(2)}x) أقل من نقطة التعادل المطلوبة (${breakEvenRoas.toFixed(2)}x).`
    },
    seasonalLift: {
      applied: data.seasons,
      insight: seasonalInsights[activeSeason as keyof typeof seasonalInsights]
    }
  };
};

/**
 * Generates competitor summary using AI
 */
export const generateCompetitorSummary = async (industry: string, kpis: { totals: KpiSet }): Promise<string> => {
  const prompt = `أنت محلل تسويقي. بناءً على مؤشرات الأداء التالية لمنافس نموذجي في مجال "${industry}"، اكتب ملخصًا من جملة إلى جملتين عن استراتيجيته المحتملة. كن مباشرًا ومختصرًا.
  
  النتائج:
  - العائد (ROAS): ${kpis.totals.roas.toFixed(2)}x
  - تكلفة النقرة (CPC): ${kpis.totals.cpc.toFixed(2)} ريال
  - تكلفة اكتساب العميل (CAC): ${kpis.totals.cac.toFixed(2)} ريال
  
  مثال للإجابة: "يركز المنافسون في هذا المجال على Google Ads لجذب العملاء ذوي النية الشرائية العالية، مع استخدام Meta لزيادة الوعي وإعادة الاستهداف."`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
        topP: 0.9,
        topK: 40,
      }
    });
    return response.text;
  } catch (error) {
    console.error("فشل في توليد ملخص المنافسين:", error);
    return "يقوم المنافسون عادةً بتوزيع ميزانيتهم عبر المنصات ذات الأداء الأعلى في هذا المجال لتحقيق أفضل عائد ممكن.";
  }
};

/**
 * Generates AI content for the campaign report
 */
export const generateAIContent = async (
  formData: CampaignData,
  kpis: { totals: KpiSet; perPlatform: { [platform: string]: KpiSet } },
  anomalies: ValidationFlag[],
  corrections: any[],
  advancedInsights: AdvancedInsightsSet,
  uiWarnings: any[],
  reallocationDetails: any,
  competitorMirror?: { summary: string, kpis: { totals: KpiSet } },
  audiencePersonaSummary?: string
): Promise<any> => {
  const payload = {
    inputs: formData,
    results: { totals: kpis.totals, perPlatform: kpis.perPlatform },
    advancedInsights: {
      arpu: { value: advancedInsights.arpu.value },
      cac: { value: advancedInsights.cac.value, benchmark: advancedInsights.cac.benchmark },
      breakEvenRoas: { value: advancedInsights.breakEvenRoas.value, benchmark: advancedInsights.breakEvenRoas.benchmark },
      seasonalLift: { applied: advancedInsights.seasonalLift.applied, insight: advancedInsights.seasonalLift.insight }
    },
    anomalies,
    corrections,
    reallocationDetails,
    competitorMirror: competitorMirror ? { summary: competitorMirror.summary, kpis: competitorMirror.kpis.totals } : undefined,
    uiWarnings,
    audiencePersonaSummary: audiencePersonaSummary || "جمهور عام بدون تخصيص ديموغرافي محدد."
  };
  
  const prompt = buildOrchestratorPrompt(payload);
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
        topP: 0.9,
        topK: 40,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            confidence: { type: Type.NUMBER },
            narrative: { type: Type.STRING },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            explainability: {
              type: Type.OBJECT,
              properties: {
                "توزيع الميزانية": { type: Type.STRING },
                "تقدير العائد (ROAS)": { type: Type.STRING },
                "تكلفة اكتساب العميل (CAC)": { type: Type.STRING },
              }
            },
            generatedAdvancedInsights: {
              type: Type.OBJECT,
              properties: {
                arpu: { type: Type.STRING },
                cac: { type: Type.STRING },
                breakEvenRoas: { type: Type.STRING },
                seasonalLift: { type: Type.STRING }
              }
            },
            generatedAnomalies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  kpi: { type: Type.STRING },
                  issue: { type: Type.STRING },
                  severity: { type: Type.STRING },
                  message: { type: Type.STRING },
                  expected: { type: Type.STRING },
                  actual: { type: Type.STRING }
                }
              }
            },
            generatedUiWarnings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  code: { type: Type.STRING },
                  message: { type: Type.STRING }
                }
              }
            },
            checks: {
              type: Type.OBJECT,
              properties: {
                roas_budget_identity_ok: { type: Type.BOOLEAN },
                arpu_revenue_identity_ok: { type: Type.BOOLEAN },
                awareness_finance_zero_ok: { type: Type.BOOLEAN }
              }
            }
          }
        }
      }
    });
    
    const result = JSON.parse(response.text.trim());
    result.generatedAnomalies = Array.isArray(result.generatedAnomalies) ? result.generatedAnomalies : [];
    result.generatedUiWarnings = Array.isArray(result.generatedUiWarnings) ? result.generatedUiWarnings : [];
    result.confidence = Math.max(0, Math.min(1, result.confidence || 0));
    return result;
  } catch (error) {
    console.error("AI content generation failed:", error);
    return {
      confidence: 0.50,
      narrative: `خطة إعلانية مقترحة لميزانية ${formData.budget.toLocaleString()} ريال في مجال ${formData.industry}. من المتوقع تحقيق عائد على الإنفاق (ROAS) يقارب ${kpis.totals.roas.toFixed(2)}x. تم إنشاء هذا الملخص الثابت بسبب خطأ في الاتصال بالذكاء الاصطناعي.`,
      recommendations: [
        "ركز على المنصات ذات الأداء الأعلى في مجالك.",
        "تأكد من أن المحتوى الإعلاني يتوافق مع توقعات جمهورك في الموسم المحدد."
      ],
      explainability: {
        "توزيع الميزانية": "تم التوزيع بناءً على بيانات الأداء المعتادة للمنصات في مجالك.",
        "تقدير العائد (ROAS)": "تم الحساب بناءً على متوسطات الأداء في السوق السعودي.",
        "تكلفة اكتساب العميل (CAC)": "تم التقدير بناءً على متوسط تكلفة التحويل في مجالك."
      },
      generatedAdvancedInsights: {
        arpu: advancedInsights.arpu.insight,
        cac: advancedInsights.cac.insight,
        breakEvenRoas: advancedInsights.breakEvenRoas.insight,
        seasonalLift: advancedInsights.seasonalLift.insight,
      },
      generatedAnomalies: anomalies,
      generatedUiWarnings: uiWarnings.map(w => ({ code: w.code, message: "حدث خطأ أثناء إنشاء رسالة التحذير، يرجى مراجعة السياق." })),
      checks: {
        roas_budget_identity_ok: true,
        arpu_revenue_identity_ok: true,
        awareness_finance_zero_ok: formData.funnelStage !== 'conversion',
      }
    };
  }
};

/**
 * Enhances brand details using AI
 */
export const enhanceBrandDetails = async (details: { usp: string; brandTone: string; extraDetails: string; }): Promise<BrandContext> => {
  const brandDetailsSchema = {
    type: Type.OBJECT,
    properties: {
      usp: { type: Type.STRING },
      brandTone: { type: Type.STRING },
      extraDetails: { type: Type.STRING },
    },
    required: ["usp", "brandTone", "extraDetails"],
  };

  const prompt = `Refine and structure this information into a professional format. User input: USP: "${details.usp || "N/A"}", Tone: "${details.brandTone || "N/A"}", Details: "${details.extraDetails || "N/A"}". Return a JSON object.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
        topP: 0.9,
        topK: 40,
        responseMimeType: "application/json",
        responseSchema: brandDetailsSchema,
      },
    });
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("AI brand details enhancement failed:", error);
    throw new Error("Failed to enhance brand details with AI.");
  }
};

/**
 * Generates brand brief from website text using AI
 */
export const generateBrandBriefFromText = async (text: string): Promise<BrandContext> => {
  const brandBriefSchema = {
    type: Type.OBJECT,
    properties: {
      brandName: { type: Type.STRING },
      usp: { type: Type.STRING },
      brandTone: { type: Type.STRING },
      extraDetails: { type: Type.STRING },
    },
    required: ["brandName", "usp", "brandTone", "extraDetails"],
  };

  const prompt = `Analyze the following website text and extract brand information in Arabic. Text: """${text.substring(0, 15000)}""" Return a JSON object matching the schema.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
        topP: 0.9,
        topK: 40,
        responseMimeType: "application/json",
        responseSchema: brandBriefSchema,
      },
    });
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("AI brand brief generation failed:", error);
    throw new Error("فشل الذكاء الاصطناعي في تحليل محتوى الموقع.");
  }
};

/**
 * Generates realtime validation tips using AI
 */
export const generateRealtimeValidationTips = async (data: Partial<CampaignData>): Promise<Record<string, string>> => {
  if (!data.industry) return {};
  const issues: any[] = [];
  
  const minBudget = industryMinBudgetريال[data.industry as keyof typeof industryMinBudgetريال] || industryMinBudgetريال.default;
  if (data.budget! < minBudget) {
    issues.push({ field: 'budget', context: { industry: data.industry, userBudget: data.budget, minBudget } });
  }

  const seasonResolution = resolveSeasons(data.seasons || []);
  if (seasonResolution.conflicts.length > 0 || seasonResolution.dropped.length > 0) {
    issues.push({ field: 'seasons', context: { ...seasonResolution } });
  }

  const platformCompatibility = checkPlatformCompatibility(data.industry, data.platforms || []);
  if (platformCompatibility.incompatibilities.length > 0) {
    issues.push({ field: 'platforms', context: { ...platformCompatibility } });
  }

  if(data.targetAudience?.age && data.targetAudience.age.length > 1) {
    issues.push({ field: 'age_targeting', context: { count: data.targetAudience.age.length }})
  }
  
  if (issues.length === 0) return {};
  
  const prompt = buildRealtimeTipsPrompt(issues as any);
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
        topP: 0.9,
        topK: 40,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            budget: { type: Type.STRING, nullable: true },
            seasons: { type: Type.STRING, nullable: true },
            platforms: { type: Type.STRING, nullable: true },
            age_targeting: { type: Type.STRING, nullable: true },
          },
        },
      },
    });
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("AI validation tip generation failed:", error);
    return {};
  }
};

/**
 * Generates greeting message using AI
 */
export const generateGreeting = async () => {
  const prompt = "Generate a short, friendly greeting in Saudi Arabic for a marketing campaign planning tool. The user is about to describe their campaign in a colloquial way. The greeting should be encouraging and welcoming.";
  return ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      temperature: 0.6,
      topP: 0.9,
      topK: 40,
    },
  });
};

/**
 * Parses user prompt with AI to extract campaign data
 */
export const parsePromptWithAI = async (prompt: string): Promise<Partial<CampaignData>> => {
  const campaignDataSchema = {
    type: Type.OBJECT,
    properties: {
      industry: { type: Type.STRING, description: `The industry of the business. Choose from: ${Object.keys(INDUSTRIES).join(', ')}` },
      subIndustry: { type: Type.STRING, description: 'The sub-industry if applicable.' },
      budget: { type: Type.NUMBER, description: 'The total campaign budget in Saudi Riyal (ريال).' },
      duration: { type: Type.STRING, description: `Campaign duration. Choose from: ${CAMPAIGN_DURATIONS.map(d=>d.id).join(', ')}` },
      targetAudience: {
        type: Type.OBJECT,
        properties: {
          age: { type: Type.ARRAY, items: { type: Type.STRING }, description: `Target age groups. Choose from: ${AUDIENCE_AGES.join(', ')}` },
          gender: { type: Type.STRING, description: `Target gender. Choose from: ${AUDIENCE_GENDERS.join(', ')}` },
          locations: { type: Type.ARRAY, items: { type: Type.STRING }, description: `Target locations. Choose from: ${AUDIENCE_LOCATIONS.join(', ')}` },
        },
      },
      goals: { type: Type.ARRAY, items: { type: Type.STRING }, description: `Campaign goals. Choose from: ${Object.keys(GOALS).join(', ')}` },
      platforms: { type: Type.ARRAY, items: { type: Type.STRING }, description: `Advertising platforms. Choose from: ${PLATFORMS.map(p => p.id).join(', ')}` },
      seasons: { type: Type.ARRAY, items: { type: Type.STRING }, description: `Seasonal events. Choose from: ${SEASONS.map(s => s.id).join(', ')}` },
    },
  };

  const systemInstruction = `You are an expert marketing campaign planner in Saudi Arabia. Your task is to parse a user's colloquial Arabic prompt describing a marketing campaign and extract structured data from it. Fill in as much information as you can based on the prompt. If a value is not mentioned, leave it out of the JSON. Make intelligent defaults where appropriate (e.g., if user says 'Riyadh and Jeddah', locations should be ['الرياض', 'جدة']). The currency is always Saudi Riyal (ريال).`;
  const fullPrompt = `Parse the following user prompt and extract campaign data into a JSON object:\n\n"${prompt}"`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.6,
        topP: 0.9,
        topK: 40,
        responseMimeType: "application/json",
        responseSchema: campaignDataSchema,
      },
    });
    
    const parsedJson = JSON.parse(response.text);
    // Clean up the data, map to correct IDs etc.
    if (parsedJson.platforms) {
      parsedJson.platforms = parsedJson.platforms.map((p: string) => {
        const found = PLATFORMS.find(pf => pf.name.toLowerCase().includes(p.toLowerCase()) || pf.id.toLowerCase().includes(p.toLowerCase()));
        return found ? found.id : p;
      });
    }
    return parsedJson;
  } catch (error) {
    console.error("Gemini prompt parsing failed:", error);
    throw new Error("لم أتمكن من فهم طلبك. هل يمكنك إعادة صياغته؟");
  }
};
