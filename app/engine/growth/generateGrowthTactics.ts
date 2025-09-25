import { CampaignReport } from '../../types';
import { GrowthTactic } from '../../types/growth';
import { ai } from '../../services/aiClient';
import { Type } from '@google/genai';

const fallbackTactics: GrowthTactic[] = [
    {
        id: 'fallback-creative-hook',
        category: 'Creative',
        impact: 'High',
        difficulty: 'Medium',
        title: "Tactic: Boost CTR with Short-Form Story Hooks",
        icon: 'FiZap',
        snippet: 'استخدم "هوك" قصصي في أول ثانيتين من الفيديو لرفع نسبة المشاهدة الكاملة.',
        details: 'ابدأ الفيديو بسؤال مثير للجدل أو مشهد غير متوقع يتعلق بمنتجك. هذا الأسلوب يكسر نمط التصفح المعتاد ويجبر المشاهد على التساؤل "ماذا سيحدث بعد ذلك؟"، مما يزيد من احتمالية مشاهدة الإعلان كاملاً وبالتالي زيادة الـCTR.',
        caseStudy: 'متجر أزياء سعودي رفع نسبة مشاهدة الفيديو (VTR) بنسبة 40% باستخدام هذه التقنية.',
        relatedStage: 'Engagement',
    },
    {
        id: 'fallback-budget-pulse',
        category: 'Budget',
        impact: 'Medium',
        difficulty: 'Easy',
        title: 'Tactic: "Pulse" Bidding on Weekends',
        icon: 'FiTrendingUp',
        snippet: 'ارفع عروض الأسعار (Bids) بنسبة 20% في عطلات نهاية الأسبوع لاقتناص الجمهور الأكثر تفاعلاً.',
        details: 'تحليل بيانات الإنفاق في السعودية يظهر أن نية الشراء تزداد بشكل ملحوظ مساء الخميس والجمعة. عبر رفع عروض الأسعار بشكل استباقي خلال هذه الفترة، تضمن ظهور إعلاناتك أمام الجمهور الأكثر استعدادًا للشراء، مما يحسن العائد على الإنفاق (ROAS).',
        relatedStage: 'Conversion',
    }
];

const growthTacticSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING },
        category: { type: Type.STRING, enum: ['Creative', 'Budget', 'Targeting', 'Retention', 'Algorithm'] },
        impact: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
        difficulty: { type: Type.STRING, enum: ['Easy', 'Medium', 'Hard'] },
        title: { type: Type.STRING },
        icon: { type: Type.STRING, description: "A key from react-icons/fi, e.g., 'FiZap'" },
        snippet: { type: Type.STRING, description: "A highly actionable tip in Saudi Arabic, max 20 words" },
        details: { type: Type.STRING, description: "A detailed explanation of the logic and playbook" },
        caseStudy: { type: Type.STRING, nullable: true },
        relatedStage: { type: Type.STRING, enum: ['Awareness', 'Engagement', 'Conversion', 'Retention', 'Growth Loop'] },
    }
};


export async function generateGrowthTactics(report: CampaignReport): Promise<GrowthTactic[]> {
    const systemInstruction = "You are a world-class Growth Hacker and Media Buying consultant who has managed millions in ad spend in the Saudi market. You are sharing your most secret, non-obvious tactics.";

    const userPrompt = `Analyze the provided campaign report. Generate an array of 5-7 highly advanced, insider growth tactics. For each tactic, provide a structured JSON object with the following fields: id, category, impact, difficulty, title, icon (choose a key from react-icons/fi), snippet (a highly actionable tip in Saudi Arabic, max 20 words), details (a detailed explanation of the logic and playbook), caseStudy (an optional example), and relatedStage.

The output must be a valid JSON array matching the GrowthTactic[] schema. The tactics must be non-obvious and provide genuine 'insider' value.

Campaign Report Data:
${JSON.stringify(report, null, 2)}
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
                    items: growthTacticSchema,
                },
            },
        });
        const result = JSON.parse(response.text.trim());
        if (!Array.isArray(result) || result.length === 0) {
            return fallbackTactics;
        }
        return result;
    } catch (error) {
        console.error("Error generating growth tactics:", error);
        return fallbackTactics;
    }
}