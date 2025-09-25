import { ai } from '../../services/aiClient';
import { CampaignReport } from '../../types';

/**
 * Generates an AI-powered strategic summary for a given campaign report.
 *
 * @param report The campaign report data.
 * @returns A promise that resolves to the AI-generated summary string.
 */
export async function generateStrategicSummary(report: CampaignReport): Promise<string> {
    const systemInstruction = "اكتب ملخص استراتيجي مختصر ومفهوم باللهجة السعودية يشرح منطق الخطة الإعلانية هذه. وضّح ليه التوزيع منطقي، وش تتوقع النتائج الرئيسية، وكيف الخطة هذه تساعد تحقق الهدف. أبقِ الملخص في حدود 3-4 فقرات.";

    // We provide the core data to the AI as context for the summary.
    const reportDataForPrompt = {
        industry: report.industry,
        totalBudget: report.kpis.totals.budget,
        goals: report.goals,
        funnelStage: report.funnelStage,
        platforms: Object.keys(report.budgetAllocation),
        expectedROAS: report.kpis.totals.roas.toFixed(2) + 'x',
        expectedConversions: report.kpis.totals.conversions.toLocaleString(),
        expectedCAC: report.kpis.totals.cac.toFixed(2) + ' ريال',
        baseNarrative: report.narrative, // Give the AI the original narrative as a starting point.
    };

    const userPrompt = `بيانات الحملة:\n${JSON.stringify(reportDataForPrompt, null, 2)}`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.6,
                topP: 0.9,
                topK: 40,
            },
        });
        // Trim any extra whitespace from the AI response.
        return response.text.trim();
    } catch (error) {
        console.error("Error generating strategic summary:", error);
        // Fallback to the existing deterministic narrative if AI generation fails.
        return report.narrative || "تعذر إنشاء الملخص الاستراتيجي. يرجى المحاولة مرة أخرى.";
    }
}