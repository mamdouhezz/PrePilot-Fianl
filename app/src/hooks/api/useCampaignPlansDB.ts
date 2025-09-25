/**
 * @file useCampaignPlansDB.ts
 * @description Enhanced campaign plans hook using IndexedDB with Dexie.js
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type CampaignPlan } from '../../services/db';
import { CampaignData } from '../../../types';

/**
 * Hook للحصول على جميع خطط الحملات
 */
export function useCampaignPlansDB() {
  const plans = useLiveQuery(
    () => db.campaignPlans.orderBy('updatedAt').reverse().toArray(),
    []
  );

  return {
    data: plans || [],
    isLoading: plans === undefined,
    error: null,
  };
}

/**
 * Hook للحصول على خطط الحملات القوالب فقط
 */
export function useCampaignTemplatesDB() {
  const templates = useLiveQuery(
    () => db.campaignPlans
      .where('isTemplate')
      .equals(true)
      .orderBy('updatedAt')
      .reverse()
      .toArray(),
    []
  );

  return {
    data: templates || [],
    isLoading: templates === undefined,
    error: null,
  };
}

/**
 * Hook للحصول على خطط الحملات الشخصية فقط
 */
export function usePersonalCampaignPlansDB() {
  const plans = useLiveQuery(
    () => db.campaignPlans
      .where('isTemplate')
      .equals(false)
      .orderBy('updatedAt')
      .reverse()
      .toArray(),
    []
  );

  return {
    data: plans || [],
    isLoading: plans === undefined,
    error: null,
  };
}

/**
 * Hook للحصول على خطة حملة محددة
 */
export function useCampaignPlanDB(id: number) {
  const plan = useLiveQuery(
    () => id ? db.campaignPlans.get(id) : null,
    [id]
  );

  return {
    data: plan,
    isLoading: plan === undefined,
    error: null,
  };
}

/**
 * Hook لإنشاء خطة حملة جديدة
 */
export function useCreateCampaignPlanDB() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (planData: {
      name: string;
      data: CampaignData;
      isTemplate?: boolean;
      tags?: string[];
    }) => {
      const id = await db.campaignPlans.add({
        ...planData,
        isTemplate: planData.isTemplate || false,
        tags: planData.tags || [],
      });
      return { id, ...planData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaignPlansDB'] });
    },
    onError: (error) => {
      console.error('خطأ في إنشاء خطة الحملة:', error);
    },
  });
}

/**
 * Hook لتحديث خطة حملة موجودة
 */
export function useUpdateCampaignPlanDB() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      id, 
      updates 
    }: { 
      id: number; 
      updates: Partial<CampaignPlan> 
    }) => {
      await db.campaignPlans.update(id, updates);
      return { id, ...updates };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaignPlansDB'] });
    },
    onError: (error) => {
      console.error('خطأ في تحديث خطة الحملة:', error);
    },
  });
}

/**
 * Hook لحذف خطة حملة
 */
export function useDeleteCampaignPlanDB() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await db.campaignPlans.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaignPlansDB'] });
    },
    onError: (error) => {
      console.error('خطأ في حذف خطة الحملة:', error);
    },
  });
}

/**
 * Hook لتحديث وقت آخر استخدام لخطة حملة
 */
export function useUpdateLastUsedDB() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await db.campaignPlans.update(id, { lastUsed: Date.now() });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaignPlansDB'] });
    },
    onError: (error) => {
      console.error('خطأ في تحديث وقت الاستخدام:', error);
    },
  });
}

/**
 * Hook للبحث في خطط الحملات
 */
export function useSearchCampaignPlansDB(searchTerm: string) {
  const results = useLiveQuery(async () => {
    if (!searchTerm) return [];

    return await db.campaignPlans
      .where('name')
      .startsWithIgnoreCase(searchTerm)
      .or('tags')
      .anyOf(searchTerm.toLowerCase())
      .toArray();
  }, [searchTerm]);

  return {
    data: results || [],
    isLoading: results === undefined,
    error: null,
  };
}

/**
 * Hook للحصول على الخطط الأكثر استخداماً
 */
export function useMostUsedCampaignPlansDB(limit: number = 5) {
  const plans = useLiveQuery(
    () => db.campaignPlans
      .orderBy('lastUsed')
      .reverse()
      .filter(plan => plan.lastUsed)
      .limit(limit)
      .toArray(),
    [limit]
  );

  return {
    data: plans || [],
    isLoading: plans === undefined,
    error: null,
  };
}

/**
 * Hook للحصول على الخطط الأحدث
 */
export function useRecentCampaignPlansDB(limit: number = 5) {
  const plans = useLiveQuery(
    () => db.campaignPlans
      .orderBy('createdAt')
      .reverse()
      .limit(limit)
      .toArray(),
    [limit]
  );

  return {
    data: plans || [],
    isLoading: plans === undefined,
    error: null,
  };
}

/**
 * Hook للحصول على إحصائيات خطط الحملات
 */
export function useCampaignPlansStatsDB() {
  const stats = useLiveQuery(async () => {
    const allPlans = await db.campaignPlans.toArray();
    
    const total = allPlans.length;
    const templates = allPlans.filter(plan => plan.isTemplate).length;
    const personal = allPlans.filter(plan => !plan.isTemplate).length;
    
    // حساب عدد الخطط المستخدمة في آخر 30 يوم
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const recentlyUsed = allPlans.filter(plan => 
      plan.lastUsed && plan.lastUsed > thirtyDaysAgo
    ).length;

    return {
      total,
      templates,
      personal,
      recentlyUsed,
      unused: total - recentlyUsed,
    };
  }, []);

  return {
    data: stats,
    isLoading: stats === undefined,
    error: null,
  };
}
