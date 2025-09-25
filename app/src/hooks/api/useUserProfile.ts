/**
 * @file useUserProfile.ts
 * @description Custom hook for managing user profile data with TanStack Query
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types for user profile
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: 'ar' | 'en';
    notifications: boolean;
    autoSave: boolean;
  };
  subscription: {
    plan: 'free' | 'premium' | 'enterprise';
    expiresAt?: number;
  };
  createdAt: number;
  lastLoginAt: number;
}

// Mock API functions
const fetchUserProfile = async (): Promise<UserProfile> => {
  const stored = localStorage.getItem('prepilotUserProfile');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Default profile
  const defaultProfile: UserProfile = {
    id: 'user-1',
    name: 'مستخدم PrePilot',
    email: 'user@prepilot.cloud',
    preferences: {
      theme: 'dark',
      language: 'ar',
      notifications: true,
      autoSave: true,
    },
    subscription: {
      plan: 'free',
    },
    createdAt: Date.now(),
    lastLoginAt: Date.now(),
  };
  
  localStorage.setItem('prepilotUserProfile', JSON.stringify(defaultProfile));
  return defaultProfile;
};

const updateUserProfile = async (updates: Partial<UserProfile>): Promise<UserProfile> => {
  const existing = await fetchUserProfile();
  const updated = { ...existing, ...updates };
  localStorage.setItem('prepilotUserProfile', JSON.stringify(updated));
  return updated;
};

const updateUserPreferences = async (preferences: Partial<UserProfile['preferences']>): Promise<UserProfile> => {
  const existing = await fetchUserProfile();
  const updated = {
    ...existing,
    preferences: { ...existing.preferences, ...preferences },
  };
  localStorage.setItem('prepilotUserProfile', JSON.stringify(updated));
  return updated;
};

/**
 * Hook للحصول على ملف المستخدم الشخصي
 */
export function useUserProfile() {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    staleTime: 10 * 60 * 1000, // 10 دقائق - البيانات الشخصية لا تتغير كثيراً
  });
}

/**
 * Hook لتحديث ملف المستخدم الشخصي
 */
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedProfile) => {
      // تحديث البيانات المحلية مباشرة
      queryClient.setQueryData(['userProfile'], updatedProfile);
    },
    onError: (error) => {
      console.error('خطأ في تحديث ملف المستخدم:', error);
    },
  });
}

/**
 * Hook لتحديث تفضيلات المستخدم
 */
export function useUpdateUserPreferences() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateUserPreferences,
    onSuccess: (updatedProfile) => {
      // تحديث البيانات المحلية مباشرة
      queryClient.setQueryData(['userProfile'], updatedProfile);
    },
    onError: (error) => {
      console.error('خطأ في تحديث تفضيلات المستخدم:', error);
    },
  });
}

/**
 * Hook للحصول على تفضيلات المستخدم فقط
 */
export function useUserPreferences() {
  const { data: profile, ...rest } = useUserProfile();
  
  return {
    ...rest,
    data: profile?.preferences,
  };
}

/**
 * Hook للتحقق من حالة الاشتراك
 */
export function useSubscriptionStatus() {
  const { data: profile, ...rest } = useUserProfile();
  
  const isPremium = profile?.subscription.plan === 'premium' || profile?.subscription.plan === 'enterprise';
  const isExpired = profile?.subscription.expiresAt ? profile.subscription.expiresAt < Date.now() : false;
  
  return {
    ...rest,
    data: {
      plan: profile?.subscription.plan || 'free',
      isPremium,
      isExpired,
      expiresAt: profile?.subscription.expiresAt,
    },
  };
}
