/**
 * @file useFormState.ts
 * @description Custom hook for managing form state and persistence
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import { useState, useEffect, useCallback } from 'react';
import { CampaignData, UserPreset } from '../../types';

const FORM_DATA_STORAGE_KEY = 'prepilotFormData';
const USER_PRESETS_STORAGE_KEY = 'prepilotUserPresets';

const defaultFormData: CampaignData = {
    brandContext: {
        brandName: '',
        website: '',
        usp: '',
        brandTone: '',
        extraDetails: '',
    },
    industry: '', 
    subIndustry: '', 
    budget: 50000, 
    duration: 'medium',
    targetAudience: { 
        age: ['25-34'], 
        gender: 'الكل', 
        locations: ['كل المدن الرئيسية'],
        interests: [] as string[],
        behaviors: [] as string[],
    },
    competitorAnalysis: { 
        mainCompetitors: [] as string[], 
        estimatedSpend: '' 
    },
    goals: [] as string[], 
    subGoals: {}, 
    expectedRoas: '', 
    platforms: [] as string[], 
    seasons: [] as string[],
    profitMargin: 30, 
    conversionDefinition: 'purchase', 
    funnelStage: 'conversion',
    creativeType: 'video', 
    aov: 150, 
    competitorContext: 'high',
};

/**
 * @hook useFormState
 * @description Hook مخصص لإدارة حالة النموذج وحفظ البيانات محلياً
 * يوفر وظائف لحفظ واستعادة بيانات النموذج والضبطت المخصصة
 * @returns {object} - كائن يحتوي على حالات النموذج والدوال المساعدة
 */
export function useFormState(initialData: CampaignData | null) {
    const [formData, setFormData] = useState<CampaignData>(() => {
        try {
            const savedData = localStorage.getItem(FORM_DATA_STORAGE_KEY);
            return savedData ? JSON.parse(savedData) : (initialData || defaultFormData);
        } catch (error) {
            console.error('فشل في تحليل بيانات النموذج من localStorage', error);
            return initialData || defaultFormData;
        }
    });

    const [userPresets, setUserPresets] = useState<UserPreset[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [isFetchingBrief, setIsFetchingBrief] = useState(false);

    // Load user presets on mount
    useEffect(() => {
        try {
            const savedPresets = localStorage.getItem(USER_PRESETS_STORAGE_KEY);
            if (savedPresets) {
                setUserPresets(JSON.parse(savedPresets));
            }
        } catch (error) {
            console.error('فشل في تحليل الضبطت المخصصة من localStorage', error);
        }
    }, []);

    // Save form data to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(FORM_DATA_STORAGE_KEY, JSON.stringify(formData));
        } catch (error) {
            console.error('فشل في حفظ بيانات النموذج إلى localStorage', error);
        }
    }, [formData]);

    /**
     * @description تحديث بيانات النموذج
     * @param updates - التحديثات المطلوبة
     */
    const updateFormData = useCallback((updates: Partial<CampaignData>) => {
        setFormData((prev: CampaignData) => ({ ...prev, ...updates }));
    }, []);

    /**
     * @description تحديث سياق العلامة التجارية
     * @param updates - تحديثات سياق العلامة التجارية
     */
    const updateBrandContext = useCallback((updates: Partial<CampaignData['brandContext']>) => {
        setFormData((prev: CampaignData) => ({
            ...prev,
            brandContext: { ...prev.brandContext, ...updates }
        }));
    }, []);

    /**
     * @description تحديث الجمهور المستهدف
     * @param updates - تحديثات الجمهور المستهدف
     */
    const updateTargetAudience = useCallback((updates: Partial<CampaignData['targetAudience']>) => {
        setFormData((prev: CampaignData) => ({
            ...prev,
            targetAudience: { ...prev.targetAudience, ...updates }
        }));
    }, []);

    /**
     * @description إعادة تعيين النموذج إلى القيم الافتراضية
     */
    const resetForm = useCallback(() => {
        setFormData(defaultFormData);
        localStorage.removeItem(FORM_DATA_STORAGE_KEY);
    }, []);

    /**
     * @description حفظ ضبط مخصص جديد
     * @param preset - الضبط المخصص
     */
    const savePreset = useCallback((preset: UserPreset) => {
        const newPresets = [...userPresets, preset];
        setUserPresets(newPresets);
        try {
            localStorage.setItem(USER_PRESETS_STORAGE_KEY, JSON.stringify(newPresets));
        } catch (error) {
            console.error('فشل في حفظ الضبط المخصص', error);
        }
    }, [userPresets]);

    /**
     * @description حذف ضبط مخصص
     * @param presetId - معرف الضبط المخصص
     */
    const deletePreset = useCallback((presetId: number) => {
        const newPresets = userPresets.filter(p => p.id !== presetId);
        setUserPresets(newPresets);
        try {
            localStorage.setItem(USER_PRESETS_STORAGE_KEY, JSON.stringify(newPresets));
        } catch (error) {
            console.error('فشل في حذف الضبط المخصص', error);
        }
    }, [userPresets]);

    /**
     * @description تطبيق ضبط مخصص على النموذج
     * @param preset - الضبط المخصص المراد تطبيقه
     */
    const applyPreset = useCallback((preset: UserPreset) => {
        setFormData(preset.data);
    }, []);

    return {
        formData,
        setFormData,
        updateFormData,
        updateBrandContext,
        updateTargetAudience,
        resetForm,
        userPresets,
        savePreset,
        deletePreset,
        applyPreset,
        isSubmitting,
        setIsSubmitting,
        isEnhancing,
        setIsEnhancing,
        isFetchingBrief,
        setIsFetchingBrief
    };
}
