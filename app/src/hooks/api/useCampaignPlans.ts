/**
 * @file useCampaignPlans.ts
 * @description Custom hook for managing campaign plans with TanStack Query
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CampaignData } from '../../../types';

// Mock API functions - سيتم استبدالها بـ API حقيقي
const fetchCampaignPlans = async (): Promise<CampaignData[]> => {
  // محاكاة استدعاء API
  const stored = localStorage.getItem('prepilotCampaignPlans');
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
};

const createCampaignPlan = async (plan: CampaignData): Promise<CampaignData> => {
  // محاكاة إنشاء خطة جديدة
  const existing = await fetchCampaignPlans();
  const newPlan = { ...plan, id: Date.now().toString() };
  const updated = [...existing, newPlan];
  localStorage.setItem('prepilotCampaignPlans', JSON.stringify(updated));
  return newPlan;
};

const updateCampaignPlan = async ({ id, ...plan }: CampaignData & { id: string }): Promise<CampaignData> => {
  // محاكاة تحديث خطة موجودة
  const existing = await fetchCampaignPlans();
  const updated = existing.map(p => p.id === id ? { ...plan, id } : p);
  localStorage.setItem('prepilotCampaignPlans', JSON.stringify(updated));
  return { ...plan, id };
};

const deleteCampaignPlan = async (id: string): Promise<void> => {
  // محاكاة حذف خطة
  const existing = await fetchCampaignPlans();
  const updated = existing.filter(p => p.id !== id);
  localStorage.setItem('prepilotCampaignPlans', JSON.stringify(updated));
};

/**
 * Hook للحصول على جميع خطط الحملات
 */
export function useCampaignPlans() {
  return useQuery({
    queryKey: ['campaignPlans'],
    queryFn: fetchCampaignPlans,
    staleTime: 2 * 60 * 1000, // 2 دقيقة للخطط المحفوظة محلياً
  });
}

/**
 * Hook لإنشاء خطة حملة جديدة
 */
export function useCreateCampaignPlan() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createCampaignPlan,
    onSuccess: () => {
      // إعادة تحميل قائمة الخطط بعد إنشاء جديدة
      queryClient.invalidateQueries({ queryKey: ['campaignPlans'] });
    },
    onError: (error) => {
      console.error('خطأ في إنشاء خطة الحملة:', error);
    },
  });
}

/**
 * Hook لتحديث خطة حملة موجودة
 */
export function useUpdateCampaignPlan() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateCampaignPlan,
    onSuccess: () => {
      // إعادة تحميل قائمة الخطط بعد التحديث
      queryClient.invalidateQueries({ queryKey: ['campaignPlans'] });
    },
    onError: (error) => {
      console.error('خطأ في تحديث خطة الحملة:', error);
    },
  });
}

/**
 * Hook لحذف خطة حملة
 */
export function useDeleteCampaignPlan() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteCampaignPlan,
    onSuccess: () => {
      // إعادة تحميل قائمة الخطط بعد الحذف
      queryClient.invalidateQueries({ queryKey: ['campaignPlans'] });
    },
    onError: (error) => {
      console.error('خطأ في حذف خطة الحملة:', error);
    },
  });
}

/**
 * Hook للحصول على خطة حملة محددة
 */
export function useCampaignPlan(id: string) {
  return useQuery({
    queryKey: ['campaignPlan', id],
    queryFn: async () => {
      const plans = await fetchCampaignPlans();
      return plans.find(plan => plan.id === id);
    },
    enabled: !!id,
  });
}
