/**
 * @file platforms.ts
 * @description Social media platform configurations and metadata
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import { SocialPlatform } from './types';

/**
 * @description قائمة بمنصات التواصل الاجتماعي المدعومة مع إعداداتها الخاصة
 * تحتوي على معلومات مفصلة عن كل منصة مثل الحد الأقصى لطول النص
 * والوظائف المدعومة مثل الصور والهاشتاغات
 */
export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '📘',
    color: '#1877F2',
    maxLength: 63206,
    supportsImages: true,
    supportsHashtags: true,
    supportsMentions: true
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    color: '#0077B5',
    maxLength: 3000,
    supportsImages: true,
    supportsHashtags: true,
    supportsMentions: true
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: '🐦',
    color: '#1DA1F2',
    maxLength: 280,
    supportsImages: true,
    supportsHashtags: true,
    supportsMentions: true
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '💬',
    color: '#25D366',
    maxLength: 4096,
    supportsImages: true,
    supportsHashtags: false,
    supportsMentions: false
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '📷',
    color: '#E4405F',
    maxLength: 2200,
    supportsImages: true,
    supportsHashtags: true,
    supportsMentions: true
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: '🎵',
    color: '#000000',
    maxLength: 2200,
    supportsImages: true,
    supportsHashtags: true,
    supportsMentions: true
  }
];

/**
 * @description الحصول على معلومات منصة محددة بناءً على معرفها
 * @param platformId - معرف المنصة المطلوبة
 * @returns معلومات المنصة أو undefined إذا لم توجد
 */
export function getPlatformById(platformId: string): SocialPlatform | undefined {
  return SOCIAL_PLATFORMS.find(platform => platform.id === platformId);
}

/**
 * @description الحصول على جميع المنصات التي تدعم ميزة معينة
 * @param feature - الميزة المطلوبة ('images', 'hashtags', 'mentions')
 * @returns قائمة بالمنصات التي تدعم هذه الميزة
 */
export function getPlatformsByFeature(feature: 'images' | 'hashtags' | 'mentions'): SocialPlatform[] {
  const featureMap = {
    images: 'supportsImages',
    hashtags: 'supportsHashtags',
    mentions: 'supportsMentions'
  } as const;

  return SOCIAL_PLATFORMS.filter(platform => 
    platform[featureMap[feature]] === true
  );
}
