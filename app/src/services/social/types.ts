/**
 * @file types.ts
 * @description Type definitions for social media sharing functionality
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  maxLength?: number;
  supportsImages: boolean;
  supportsHashtags: boolean;
  supportsMentions: boolean;
}

export interface SocialPost {
  id: string;
  platform: string;
  content: string;
  imageUrl?: string;
  hashtags: string[];
  mentions: string[];
  createdAt: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  reportId: string;
  sectionId: string;
}

export interface SocialContent {
  text: string;
  imageUrl?: string;
  hashtags: string[];
  mentions: string[];
  platform: string;
}

export interface SocialAnalytics {
  platform: string;
  impressions: number;
  clicks: number;
  engagement: number;
  shares: number;
  timestamp: Date;
}

export interface SharingOptions {
  includeImages: boolean;
  includeHashtags: boolean;
  includeMentions: boolean;
  autoSchedule: boolean;
  scheduleTime?: Date;
}
