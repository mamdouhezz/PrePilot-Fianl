import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CampaignData, BrandContext, UIWarning, UserPreset } from '../types';
import {
    INDUSTRIES, GOALS, PLATFORMS, SEASONS, CAMPAIGN_DURATIONS,
    AUDIENCE_AGES, AUDIENCE_GENDERS, AUDIENCE_LOCATIONS, CAMPAIGN_PRESETS,
    AUDIENCE_INTERESTS, AUDIENCE_BEHAVIORS, FUNNEL_STAGES, CONVERSION_DEFINITIONS,
    CREATIVE_TYPES, COMPETITOR_CONTEXTS, industryPlatformCompatibility,
    industryTargetingSuggestions,
    industryAgeDefaults
} from '../constants';
import { enhanceBrandDetails, preflightValidation, generateRealtimeValidationTips, generateBrandBriefFromText, predictInitialSettings } from '../engine';
import { contextualData } from '../src/data/contextualData';

const defaultFormData: CampaignData = {
    brandContext: {
        brandName: '',
        website: '',
        usp: '',
        brandTone: '',
        extraDetails: '',
    },
    industry: '', subIndustry: '', budget: 50000, duration: 'medium',
    targetAudience: { 
        age: ['25-34'], 
        gender: 'الكل', 
        locations: ['كل المدن الرئيسية'],
        interests: [] as string[],
        behaviors: [] as string[],
    },
    competitorAnalysis: { mainCompetitors: [] as string[], estimatedSpend: '', },
    goals: [] as string[], subGoals: {}, expectedRoas: '', platforms: [] as string[], seasons: [] as string[],
    profitMargin: 30, conversionDefinition: 'purchase', funnelStage: 'conversion',
    creativeType: 'video', aov: 150, competitorContext: 'high',
};

const FORM_DATA_STORAGE_KEY = 'prepilotFormData';
const USER_PRESETS_STORAGE_KEY = 'prepilotUserPresets';

export const getSuggestedPlatforms = (industry: string, goals: string[]): string[] => {
    const suggestions = new Set<string>();
    switch (industry) {
        case 'عقارات': case 'سيارات': case 'رعاية صحية':
            suggestions.add('google_ads'); suggestions.add('meta'); suggestions.add('snapchat'); break;
        case 'تجارة إلكترونية': case 'تجزئة': case 'مطاعم وكافيهات': case 'سياحة وضيافة':
            suggestions.add('meta'); suggestions.add('tiktok'); suggestions.add('snapchat'); suggestions.add('google_ads'); break;
        case 'خدمات مالية': case 'تقنية/ساس':
            suggestions.add('linkedin'); suggestions.add('google_ads'); suggestions.add('x'); break;
        case 'تعليم':
            suggestions.add('meta'); suggestions.add('youtube'); suggestions.add('google_ads'); break;
        default:
            suggestions.add('meta'); suggestions.add('google_ads');
    }
    if (goals.includes('Leads Generation') || goals.includes('Sales / Conversions')) {
        suggestions.add('google_ads'); suggestions.add('meta');
    }
    if (goals.includes('Awareness / Brand Recognition')) {
        suggestions.add('youtube'); suggestions.add('tiktok');
    }
    if (['خدمات مالية', 'تقنية/ساس'].includes(industry)) {
        suggestions.add('linkedin');
    }
    return Array.from(suggestions).slice(0, 4);
};

const funnelGoalMapping: Record<CampaignData['funnelStage'], string[]> = {
    awareness: ['Awareness / Brand Recognition', 'Engagement', 'Traffic'],
    consideration: ['Traffic', 'Engagement', 'Leads Generation'],
    conversion: ['Sales / Conversions', 'Leads Generation'],
};

export function usePlaygroundForm(initialData: CampaignData | null, onSubmit: (form: CampaignData) => Promise<void>) {
    const [formData, setFormData] = useState<CampaignData>(() => {
        try {
            const savedData = localStorage.getItem(FORM_DATA_STORAGE_KEY);
            return savedData ? JSON.parse(savedData) : (initialData || defaultFormData);
        } catch (error) {
            console.error('Failed to parse form data from localStorage', error);
            return initialData || defaultFormData;
        }
    });

    const primaryGoal = formData.goals[0] || '';
    const secondaryGoals = formData.goals.slice(1);

    const [activeTab, setActiveTab] = useState<'manual' | 'ai'>('manual');
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const [userPresets, setUserPresets] = useState<UserPreset[]>([]);
    const [dynamicQuestions, setDynamicQuestions] = useState<{ id: string; label: string; type?: 'select' | 'text' | 'multi-select'; options: string[] }[]>([]);
    const [contextualAnswers, setContextualAnswers] = useState<Record<string, string | string[]>>({});

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [isFetchingBrief, setIsFetchingBrief] = useState(false);

    const [isBrandDetailsOpen, setIsBrandDetailsOpen] = useState(false);
    const [isPresetsOpen, setIsPresetsOpen] = useState(false);
    const [isUserPresetsOpen, setIsUserPresetsOpen] = useState(true);

    const [realtimeTips, setRealtimeTips] = useState<Record<string, string>>({});
    const [areTipsLoading, setAreTipsLoading] = useState(false);

    useEffect(() => {
        try {
            const savedUserPresets = localStorage.getItem(USER_PRESETS_STORAGE_KEY);
            if (savedUserPresets) {
                setUserPresets(JSON.parse(savedUserPresets));
            }
            const savedCtx = localStorage.getItem('prepilotContextualAnswers');
            if (savedCtx) setContextualAnswers(JSON.parse(savedCtx));
        } catch (error) {
            console.error('Failed to load user presets from localStorage', error);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(FORM_DATA_STORAGE_KEY, JSON.stringify(formData));
        localStorage.setItem('prepilotContextualAnswers', JSON.stringify(contextualAnswers));
    }, [formData, contextualAnswers]);

    const handleGenericChange = useCallback(<T extends keyof CampaignData>(field: T, value: CampaignData[T]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleAudienceChange = useCallback(<T extends keyof CampaignData['targetAudience']>(field: T, value: CampaignData['targetAudience'][T]) => {
        setFormData(prev => ({ ...prev, targetAudience: { ...prev.targetAudience, [field]: value } }));
    }, []);

    useEffect(() => {
        const industry = formData.industry;
        const subIndustry = formData.subIndustry;

        if (!industry) {
            if (JSON.stringify(formData.targetAudience.age) !== JSON.stringify(defaultFormData.targetAudience.age)) {
                handleAudienceChange('age', defaultFormData.targetAudience.age);
            }
            setDynamicQuestions([]);
            return;
        }

        const industryDefaults = industryAgeDefaults[industry as keyof typeof industryAgeDefaults] || industryAgeDefaults.default;
        
        let newDefaultAge = industryDefaults.default;
        if (subIndustry && 'subIndustries' in industryDefaults && industryDefaults.subIndustries) {
            const subIndustryDefault = (industryDefaults.subIndustries as Record<string, string[]>)[subIndustry];
            if (subIndustryDefault) {
                newDefaultAge = subIndustryDefault;
            }
        }

        if (JSON.stringify(formData.targetAudience.age) !== JSON.stringify(newDefaultAge)) {
            handleAudienceChange('age', newDefaultAge);
        }

        // Prediction engine path (authoritative)
        console.log('🧠 Prediction Engine Triggered for:', industry, subIndustry);
        const prediction = predictInitialSettings(industry, subIndustry);
        console.log('🔮 Prediction Output:', prediction);
        if (prediction?.settings) {
            setFormData(prev => ({ ...prev, ...prediction.settings }));
        }
        setDynamicQuestions(prediction?.questions || []);
    }, [formData.industry, formData.subIndustry, handleAudienceChange]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (formData.industry) {
                setAreTipsLoading(true);
                console.log('🤖 Requesting AI Co-Pilot Tips with data:', formData);
                generateRealtimeValidationTips(formData)
                    .then(tips => setRealtimeTips(tips))
                    .then(() => console.log('💡 AI Tips Received:', (window as any).lastTips || realtimeTips))
                    .catch(err => console.error('Error generating real-time tips:', err))
                    .finally(() => setAreTipsLoading(false));
            } else {
                setRealtimeTips({});
            }
        }, 750);
        return () => clearTimeout(handler);
    }, [formData.industry, formData.budget, formData.seasons, formData.platforms, formData.targetAudience.age]);

    useEffect(() => {
        if (!formData.industry) return;
        let defaults: Partial<Pick<CampaignData, 'funnelStage' | 'conversionDefinition' | 'creativeType'>> = {};
        switch (formData.industry) {
            case 'عقارات': case 'رعاية صحية': case 'خدمات مالية': case 'تقنية/ساس': case 'تعليم':
                defaults = { funnelStage: 'conversion', conversionDefinition: 'lead', creativeType: 'static' }; break;
            case 'تجارة إلكترونية': case 'تجزئة': case 'مطاعم وكافيهات':
                defaults = { funnelStage: 'conversion', conversionDefinition: 'purchase', creativeType: 'video' }; break;
            case 'سيارات': case 'سياحة وضيافة':
                defaults = { funnelStage: 'consideration', creativeType: 'video' }; break;
        }
        setFormData(prev => ({ ...prev, ...defaults }));
    }, [formData.industry]);

    useEffect(() => {
        if (!formData.industry) return;
        const suggestions = industryTargetingSuggestions[formData.industry as keyof typeof industryTargetingSuggestions] || industryTargetingSuggestions.default;
        if (suggestions) {
            setFormData(prev => ({
                ...prev,
                targetAudience: { ...prev.targetAudience, interests: [...suggestions.interests], behaviors: [...suggestions.behaviors] }
            }));
        }
    }, [formData.industry]);

    useEffect(() => {
        if (!formData.industry) {
            setFormData(prev => ({ ...prev, platforms: [] }));
            return;
        }
        const suggested = getSuggestedPlatforms(formData.industry, formData.goals);
        setFormData(prev => ({ ...prev, platforms: suggested }));
    }, [formData.industry, formData.goals]);

    useEffect(() => {
        if (formData.funnelStage !== 'conversion') {
            if (formData.aov !== 0 || formData.profitMargin !== defaultFormData.profitMargin) {
                setFormData(prev => ({ ...prev, aov: 0, profitMargin: defaultFormData.profitMargin }));
            }
        }
    }, [formData.funnelStage]);

    const availablePrimaryGoals = useMemo(() => {
        return Object.keys(GOALS).filter(goal => 
            funnelGoalMapping[formData.funnelStage].includes(goal)
        );
    }, [formData.funnelStage]);

    useEffect(() => {
        const currentPrimaryGoal = formData.goals[0] || '';
        if (currentPrimaryGoal && !availablePrimaryGoals.includes(currentPrimaryGoal)) {
            alert(`تم تغيير مرحلة الحملة. الهدف الأساسي "${currentPrimaryGoal}" لم يعد متوافقًا. الرجاء اختيار هدف جديد.`);
            const newSubGoals = { ...formData.subGoals } as Record<string, string[]>;
            delete newSubGoals[currentPrimaryGoal];
            setFormData(prev => ({
                ...prev,
                goals: [],
                subGoals: newSubGoals,
            }));
        }
    }, [formData.funnelStage, formData.goals, availablePrimaryGoals, formData.subGoals]);

    const isStepValid = useCallback((step: number): {valid: boolean; message: string} => {
        switch (step) {
            case 1:
                if (!formData.industry) return {valid: false, message: 'الرجاء اختيار مجالك الرئيسي.'};
                if (formData.targetAudience.locations.length === 0) return {valid: false, message: 'الرجاء اختيار موقع واحد على الأقل.'};
                if (formData.targetAudience.age.length === 0) return {valid: false, message: 'الرجاء اختيار فئة عمرية واحدة على الأقل.'};
                return {valid: true, message: ''};
            case 2:
                if (formData.budget < 5000) return {valid: false, message: 'الميزانية يجب أن لا تقل عن 5,000 ريال.'};
                return {valid: !!formData.duration, message: 'الرجاء إكمال جميع الحقول الاستراتيجية في هذه الخطوة.'};
            case 3:
                if (formData.platforms.length === 0) return {valid: false, message: 'الرجاء اختيار منصة واحدة على الأقل.'};
                if (formData.goals.length === 0) return {valid: false, message: 'الرجاء اختيار هدف أساسي واحد على الأقل.'};
                return {valid: true, message: ''};
            default:
                return {valid: false, message: 'خطوة غير معروفة.'};
        }
    }, [formData]);

    const prevStep = useCallback(() => setCurrentStep(prev => Math.max(prev - 1, 1)), []);

    const handleSubmitOrNext = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep < totalSteps) {
            const validation = isStepValid(currentStep);
            if (validation.valid) {
                setCurrentStep(currentStep + 1);
            } else {
                alert(validation.message);
            }
        } else {
            for (let step = 1; step <= totalSteps; step++) {
                const validation = isStepValid(step);
                if (!validation.valid) {
                    setCurrentStep(step);
                    alert(validation.message);
                    return;
                }
            }
            setIsSubmitting(true);
            try {
                const warnings: UIWarning[] = await preflightValidation(formData);
                if (warnings.length > 0) {
                    const warningMessages = 'لاحظنا بعض الملاحظات على مدخلاتك:\n\n' + warnings.map(w => `- ${w.message}`).join('\n\n');
                    if (window.confirm(`${warningMessages}\n\nهل تود المتابعة على أي حال؟`)) {
                        await onSubmit(formData);
                    } else {
                        setIsSubmitting(false);
                    }
                } else {
                    await onSubmit(formData);
                }
            } catch (error) {
                console.error('Submission or validation failed:', error);
                alert('An unexpected error occurred during validation.');
                setIsSubmitting(false);
            }
        }
    }, [currentStep, totalSteps, formData, isStepValid, onSubmit]);

    const handleStepClick = useCallback((stepNumber: number) => {
        if (stepNumber < currentStep) {
            setCurrentStep(stepNumber);
            return;
        }
        if (stepNumber > currentStep) {
            let canJump = true;
            for (let i = currentStep; i < stepNumber; i++) {
                if (!isStepValid(i).valid) {
                    alert(isStepValid(i).message);
                    canJump = false;
                    break;
                }
            }
            if (canJump) setCurrentStep(stepNumber);
        }
    }, [currentStep, isStepValid]);

    const handlePresetSelect = useCallback((presetData: Partial<CampaignData>) => {
        setFormData(prev => ({ ...defaultFormData, ...prev, ...presetData }));
        setCurrentStep(1);
    }, []);

    const handleSavePreset = useCallback(() => {
        const name = prompt('ادخل اسمًا لهذا الإعداد المسبق:');
        if (name && name.trim()) {
            const newPreset: UserPreset = { id: Date.now(), name: name.trim(), data: formData };
            const updatedPresets = [...userPresets, newPreset];
            setUserPresets(updatedPresets);
            localStorage.setItem(USER_PRESETS_STORAGE_KEY, JSON.stringify(updatedPresets));
            alert('تم حفظ الإعداد بنجاح!');
        }
    }, [formData, userPresets]);

    const handleDeletePreset = useCallback((idToDelete: number) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الإعداد؟')) {
            const updatedPresets = userPresets.filter(p => p.id !== idToDelete);
            setUserPresets(updatedPresets);
            localStorage.setItem(USER_PRESETS_STORAGE_KEY, JSON.stringify(updatedPresets));
        }
    }, [userPresets]);

    const handleLocationToggle = useCallback((location: string) => {
        const currentLocations = formData.targetAudience.locations;
        let newLocations: string[];
        if (location === 'كل المدن الرئيسية') {
            newLocations = ['كل المدن الرئيسية'];
        } else {
            let tempLocations = currentLocations.filter(l => l !== 'كل المدن الرئيسية');
            newLocations = tempLocations.includes(location)
                ? tempLocations.filter(l => l !== location)
                : [...tempLocations, location];
            if (newLocations.length === 0) newLocations = ['كل المدن الرئيسية'];
        }
        handleAudienceChange('locations', newLocations);
    }, [formData.targetAudience.locations, handleAudienceChange]);

    const handleInterestToggle = useCallback((interestId: string) => handleAudienceChange('interests', formData.targetAudience.interests.includes(interestId) ? formData.targetAudience.interests.filter(i => i !== interestId) : [...formData.targetAudience.interests, interestId]), [formData.targetAudience.interests, handleAudienceChange]);
    const handleBehaviorToggle = useCallback((behaviorId: string) => handleAudienceChange('behaviors', formData.targetAudience.behaviors.includes(behaviorId) ? formData.targetAudience.behaviors.filter(b => b !== behaviorId) : [...formData.targetAudience.behaviors, behaviorId]), [formData.targetAudience.behaviors, handleAudienceChange]);
    const handleAgeToggle = useCallback((age: string) => handleAudienceChange('age', formData.targetAudience.age.includes(age) ? formData.targetAudience.age.filter(a => a !== age) : [...formData.targetAudience.age, age]), [formData.targetAudience.age, handleAudienceChange]);
    const handleSeasonToggle = useCallback((season: string) => handleGenericChange('seasons', formData.seasons.includes(season) ? formData.seasons.filter(s => s !== season) : [...formData.seasons, season]), [formData.seasons, handleGenericChange]);
    const handlePlatformToggle = useCallback((platformId: string) => handleGenericChange('platforms', formData.platforms.includes(platformId) ? formData.platforms.filter(p => p !== platformId) : [...formData.platforms, platformId]), [formData.platforms, handleGenericChange]);

    const handlePrimaryGoalChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPrimaryGoal = e.target.value;
        const oldPrimaryGoal = primaryGoal;
        const newSecondary = secondaryGoals.filter(g => g !== newPrimaryGoal);
        const newGoals = newPrimaryGoal ? [newPrimaryGoal, ...newSecondary] : newSecondary;
        const newSubGoals = { ...formData.subGoals } as Record<string, string[]>;
        if (oldPrimaryGoal) {
            delete newSubGoals[oldPrimaryGoal];
        }
        setFormData(prev => ({
            ...prev,
            goals: newGoals,
            subGoals: newSubGoals,
        }));
    }, [primaryGoal, secondaryGoals, formData.subGoals]);

    const handleSubGoalToggle = useCallback((subGoal: string) => {
        if (!primaryGoal) return;
        const currentSubGoals = (formData.subGoals[primaryGoal] || ([] as string[]));
        const newSubGoals = currentSubGoals.includes(subGoal) ? currentSubGoals.filter(sg => sg !== subGoal) : [...currentSubGoals, subGoal];
        handleGenericChange('subGoals', { ...formData.subGoals, [primaryGoal]: newSubGoals });
    }, [primaryGoal, formData.subGoals, handleGenericChange]);

    const handleSecondaryGoalToggle = useCallback((goal: string) => {
        const newSecondary = secondaryGoals.includes(goal)
            ? secondaryGoals.filter(g => g !== goal)
            : [...secondaryGoals, goal];
        handleGenericChange('goals', primaryGoal ? [primaryGoal, ...newSecondary] : newSecondary);
    }, [secondaryGoals, primaryGoal, handleGenericChange]);

    const handleBrandContextChange = useCallback(<T extends keyof BrandContext>(field: T, value: BrandContext[T]) => setFormData(prev => ({ ...prev, brandContext: { ...prev.brandContext, [field]: value } })), []);

    const handleFetchBrandBrief = useCallback(async () => {
        const url = formData.brandContext?.website;
        if (!url || !url.startsWith('http')) {
            alert('الرجاء إدخال رابط موقع إلكتروني صحيح يبدأ بـ http أو https.');
            return;
        }
        setIsFetchingBrief(true);
        try {
            const PROXY_URL = 'https://corsproxy.io/?';
            const response = await fetch(`${PROXY_URL}${encodeURIComponent(url)}`);
            if (!response.ok) throw new Error(`فشل في جلب محتوى الموقع. الحالة: ${response.status}`);
            const htmlContent = await response.text();
            const brief = await generateBrandBriefFromText(htmlContent);
            setFormData(prev => ({ ...prev, brandContext: { ...prev.brandContext, ...brief } }));
        } catch (error) {
            console.error('Failed to fetch and generate brand brief:', error);
            alert(`حدث خطأ أثناء جلب وتحليل الموقع: ${(error as Error).message}.`);
        } finally {
            setIsFetchingBrief(false);
        }
    }, [formData.brandContext]);

    const handleEnhanceDetails = useCallback(async () => {
        setIsEnhancing(true);
        try {
            const currentDetails = formData.brandContext;
            const response = await enhanceBrandDetails({ usp: currentDetails.usp || '', brandTone: currentDetails.brandTone || '', extraDetails: currentDetails.extraDetails || '' });
            setFormData(prev => ({ ...prev, brandContext: { ...prev.brandContext, ...response } }));
        } catch (error) {
            console.error('Failed to enhance details:', error);
            alert('حدث خطأ أثناء تحسين النص. الرجاء المحاولة مرة أخرى.');
        } finally {
            setIsEnhancing(false);
        }
    }, [formData.brandContext]);

    const filteredPresets = useMemo(() => {
        const selectedIndustry = formData.industry;
        const generalPresets = CAMPAIGN_PRESETS.filter(p => !p.industries || p.industries.length === 0);
        if (!selectedIndustry) return generalPresets;
        const industrySpecificPresets = CAMPAIGN_PRESETS.filter(p => p.industries?.includes(selectedIndustry));
        return industrySpecificPresets.length > 0 ? industrySpecificPresets : generalPresets;
    }, [formData.industry]);

    const mainGoals = useMemo(() => Object.keys(GOALS) as string[], []);

    return {
        // state
        formData,
        setFormData,
        dynamicQuestions,
        contextualAnswers,
        setContextualAnswers,
        activeTab,
        setActiveTab,
        currentStep,
        setCurrentStep,
        totalSteps,
        userPresets,
        isSubmitting,
        isEnhancing,
        isFetchingBrief,
        isBrandDetailsOpen,
        setIsBrandDetailsOpen,
        isPresetsOpen,
        setIsPresetsOpen,
        isUserPresetsOpen,
        setIsUserPresetsOpen,
        realtimeTips,
        areTipsLoading,
        availablePrimaryGoals,
        primaryGoal,
        secondaryGoals,
        filteredPresets,
        mainGoals,
        // handlers
        prevStep,
        handleGenericChange,
        handleAudienceChange,
        handleSubmitOrNext,
        handleStepClick,
        handlePresetSelect,
        handleSavePreset,
        handleDeletePreset,
        handleLocationToggle,
        handleInterestToggle,
        handleBehaviorToggle,
        handleAgeToggle,
        handleSeasonToggle,
        handlePlatformToggle,
        handlePrimaryGoalChange,
        handleSubGoalToggle,
        handleSecondaryGoalToggle,
        handleBrandContextChange,
        handleFetchBrandBrief,
        handleEnhanceDetails,
        // helpers
        getSuggestedPlatforms,
        AUDIENCE_AGES,
        AUDIENCE_GENDERS,
        AUDIENCE_LOCATIONS,
        AUDIENCE_INTERESTS,
        AUDIENCE_BEHAVIORS,
        INDUSTRIES,
        PLATFORMS,
        SEASONS,
        CAMPAIGN_DURATIONS,
        FUNNEL_STAGES,
        CONVERSION_DEFINITIONS,
        CREATIVE_TYPES,
        COMPETITOR_CONTEXTS,
        industryPlatformCompatibility,
        GOALS,
    };
}


