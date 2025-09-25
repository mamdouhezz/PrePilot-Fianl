/**
 * @file useFormValidation.ts
 * @description Custom hook for form validation logic and real-time tips
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import { useState, useCallback } from 'react';
import { CampaignData, UIWarning } from '../../types';
import { preflightValidation, generateRealtimeValidationTips } from '../engine';

/**
 * @hook useFormValidation
 * @description Hook مخصص لإدارة منطق التحقق من النموذج وتوليد النصائح في الوقت الفعلي
 * يوفر وظائف للتحقق من صحة البيانات وإظهار التحذيرات والنصائح للمستخدم
 * @returns {object} - كائن يحتوي على حالات التحقق والدوال المساعدة
 */
export function useFormValidation() {
    const [realtimeTips, setRealtimeTips] = useState<Record<string, string>>({});
    const [areTipsLoading, setAreTipsLoading] = useState(false);
    const [validationWarnings, setValidationWarnings] = useState<UIWarning[]>([]);

    /**
     * @description التحقق من صحة النموذج وإظهار التحذيرات المناسبة
     * @param formData - بيانات النموذج المراد التحقق منها
     */
    const validateForm = useCallback(async (formData: CampaignData) => {
        try {
            setAreTipsLoading(true);
            
            // التحقق الأساسي من النموذج
            const warnings = await preflightValidation(formData);
            setValidationWarnings(warnings);
            
            // توليد نصائح في الوقت الفعلي
            const tips = await generateRealtimeValidationTips(formData);
            setRealtimeTips(tips);
            
        } catch (error) {
            console.error('خطأ في التحقق من النموذج:', error);
            setValidationWarnings([]);
            setRealtimeTips({});
        } finally {
            setAreTipsLoading(false);
        }
    }, []);

    /**
     * @description الحصول على نصيحة محددة لمجال معين
     * @param field - المجال المطلوب نصيحته
     * @returns النصيحة أو نص افتراضي
     */
    const getTipForField = useCallback((field: string): string => {
        return realtimeTips[field] || '';
    }, [realtimeTips]);

    /**
     * @description التحقق من وجود تحذيرات لمجال معين
     * @param field - المجال المطلوب فحصه
     * @returns true إذا كان هناك تحذيرات
     */
    const hasWarningsForField = useCallback((field: string): boolean => {
        return validationWarnings.some(warning => 
            warning.field === field && warning.severity === 'high'
        );
    }, [validationWarnings]);

    /**
     * @description الحصول على جميع التحذيرات لمجال معين
     * @param field - المجال المطلوب
     * @returns قائمة التحذيرات
     */
    const getWarningsForField = useCallback((field: string): UIWarning[] => {
        return validationWarnings.filter(warning => warning.field === field);
    }, [validationWarnings]);

    /**
     * @description مسح جميع التحذيرات والنصائح
     */
    const clearValidation = useCallback(() => {
        setValidationWarnings([]);
        setRealtimeTips({});
        setAreTipsLoading(false);
    }, []);

    return {
        realtimeTips,
        areTipsLoading,
        validationWarnings,
        validateForm,
        getTipForField,
        hasWarningsForField,
        getWarningsForField,
        clearValidation
    };
}
