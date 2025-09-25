import { SocialPlatform, ExportableSection } from '../types/export';
import { ai } from './aiClient'; 

interface GeneratePostOptions {
  platform: SocialPlatform;
  reportTitle: string;
  section: ExportableSection;
}

const sectionTranslations: Record<ExportableSection, string> = {
    'strategic-summary': 'الملخص الاستراتيجي',
    'kpi-snippets': 'مؤشرات الأداء الرئيسية',
    'media-plan': 'الخطة الإعلامية',
    'growth-funnel': 'قمع النمو',
    'advanced-recommendations': 'التوصيات المتقدمة',
    'full-report': 'التقرير الكامل',
    'beyond-kpis': 'ما وراء مؤشرات الأداء',
    'beyond-budget': 'ما وراء توزيع الميزانية'
};

const getPlatformSystemInstruction = (platform: SocialPlatform): string => {
    let instruction = `
    أنت خبير تسويق رقمي متخصص في السوق السعودي والخليجي. مهمتك هي كتابة منشورات جذابة ومحترفة لوسائل التواصل الاجتماعي باللغة العربية.
    يجب أن يكون الأسلوب واثقاً ومبنياً على البيانات، ويعكس شعارنا: "لا تخمن، Just ڤايب".
    `;

    switch (platform) {
        case 'linkedin':
            instruction += `
            المنصة هي LinkedIn. ركز على الأسلوب المهني، استخدم مصطلحات الأعمال، وأضف وسوم (hashtags) احترافية ذات صلة بالتسويق الرقمي والأعمال في السعودية.
            اذكر اسم شركتنا PrePilot بشكل طبيعي في المنشور.
            `;
            break;
        case 'twitter':
            instruction += `
            المنصة هي Twitter/X. يجب أن يكون المنشور قصيراً ومباشراً وجذاباً. استخدم الرموز التعبيرية (emojis) بشكل مناسب لزيادة التفاعل.
            استخدم وسوم (hashtags) رائجة ومختصرة.
            `;
            break;
        case 'facebook':
            instruction += `
            المنصة هي Facebook. اكتب منشوراً أكثر تفصيلاً قليلاً، يشجع على المشاركة والنقاش. يمكن أن يتضمن سؤالاً للمتابعين.
            اذكر اسم شركتنا PrePilot وحفز المستخدمين على معرفة المزيد.
            `;
            break;
    }
    return instruction;
};


export const generateAiSocialPost = async (options: GeneratePostOptions): Promise<string> => {
    const translatedSection = sectionTranslations[options.section] || options.section;
    const systemInstruction = getPlatformSystemInstruction(options.platform);
    
    const userPrompt = `
    اكتب منشوراً عن تقريرنا الجديد بعنوان "${options.reportTitle}".
    المنشور يجب أن يركز على الرؤى والأفكار من قسم "${translatedSection}".
    `;

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
        
        return response.text;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("فشل الذكاء الاصطناعي في إنشاء المحتوى. يرجى المحاولة مرة أخرى.");
    }
};

export const generateAiText = async (
    prompt: string,
    systemInstruction?: string,
    model: string = "gemini-2.5-flash"
): Promise<string> => {
    try {
        const baseConfig = {
            temperature: 0.6,
            topP: 0.9,
            topK: 40,
        };

        const config = systemInstruction 
            ? { ...baseConfig, systemInstruction } 
            : baseConfig;

        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config,
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("فشل الذكاء الاصطناعي في إنشاء المحتوى.");
    }
};