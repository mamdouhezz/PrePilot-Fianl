import { CampaignReport } from '../../types';
import { TechnicalRecommendation, RecommendationCategory } from '../../types/recommendations';
import { ai } from '../../services/aiClient';
import { Type } from '@google/genai';
import { FiVideo, FiTarget, FiDollarSign, FiZap, FiShield } from 'react-icons/fi';

const fallbackRecommendations: TechnicalRecommendation[] = [
    {
        id: 'fallback-creative',
        category: 'Creative',
        impact: 'High',
        title: 'تحسين المحتوى الإبداعي',
        icon: 'FiVideo',
        snippet: 'جرّب استخدام محتوى فيديو قصير وجذاب على منصات مثل تيك توك وميتا لزيادة التفاعل ومعدلات النقر.',
        details: 'محتوى الفيديو، خاصة القصير (Reels, Shorts)، يحقق أداءً أعلى بنسبة 30-50% في السوق السعودي. يجب التركيز على رسالة واضحة في أول 3 ثوانٍ.',
        relatedPlatforms: ['tiktok', 'meta'],
        priority: 9,
    },
    {
        id: 'fallback-budget',
        category: 'Budget',
        impact: 'Medium',
        title: 'إعادة تخصيص الميزانية',
        icon: 'FiDollarSign',
        snippet: 'ضع في اعتبارك نقل 10-15% من ميزانية المنصة الأقل أداءً إلى المنصة ذات العائد الأعلى (ROAS) لتعظيم النتائج.',
        details: 'إعادة تخصيص الميزانية بشكل دوري بناءً على بيانات الأداء الفعلية هي ممارسة أساسية في التسويق الرقمي لضمان تحقيق أقصى استفادة من الإنفاق الإعلاني.',
        relatedPlatforms: [],
        priority: 7,
    }
];

const recommendationSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING },
        category: { type: Type.STRING, enum: ['Creative', 'Targeting', 'Budget', 'Channel', 'Risk'] },
        impact: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
        title: { type: Type.STRING },
        icon: { type: Type.STRING, description: "A key from react-icons/fi, e.g., 'FiVideo'" },
        snippet: { type: Type.STRING },
        details: { type: Type.STRING },
        relatedPlatforms: { type: Type.ARRAY, items: { type: Type.STRING } },
        priority: { type: Type.NUMBER },
    }
};

export async function generateRecommendations(report: CampaignReport): Promise<TechnicalRecommendation[]> {
    const systemInstruction = "You are an expert, data-driven Media Buyer and Growth Hacker specializing in the Saudi market. Your tone is professional, insightful, and actionable.";

    const userPrompt = `Analyze the provided campaign report. Identify the top 5-7 most critical opportunities for improvement. For each opportunity, generate a structured JSON object with the following fields: id (a unique kebab-case identifier), category (one of 'Creative', 'Targeting', 'Budget', 'Channel', 'Risk'), impact (one of 'High', 'Medium', 'Low'), title (a short, descriptive title), icon (choose a relevant key from react-icons/fi like 'FiVideo' or 'FiTarget'), snippet (a brief, actionable tip in Saudi Arabic), details (a technical explanation in professional Arabic), relatedPlatforms (an array of platform IDs like 'meta' or 'google_ads'), and priority (a score from 1 to 10 for sorting, 10 being highest).

The output must be a valid JSON array of these objects.

Campaign Report Data:
${JSON.stringify({
    industry: report.industry,
    goals: report.goals,
    funnelStage: report.funnelStage,
    budget: report.kpis.totals.budget,
    kpis: report.kpis,
    budgetAllocation: report.budgetAllocation,
}, null, 2)}
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: {
                systemInstruction,
                temperature: 0.6,
                topP: 0.9,
                topK: 40,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: recommendationSchema,
                },
            },
        });
        const result = JSON.parse(response.text.trim());
        if (!Array.isArray(result) || result.length === 0) {
            return fallbackRecommendations;
        }
        return result;
    } catch (error) {
        console.error("Error generating recommendations:", error);
        return fallbackRecommendations; // Return fallback on error
    }
}