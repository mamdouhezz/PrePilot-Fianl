export interface SocialAnalytics {
  id: string;
  platform: string;
  postId: string;
  reportId: string;
  sectionId: string;
  content: string;
  publishedAt: Date;
  metrics: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
    engagement: number;
  };
  demographics: {
    ageGroups: { [key: string]: number };
    genders: { [key: string]: number };
    locations: { [key: string]: number };
  };
  performance: {
    reach: number;
    impressions: number;
    engagementRate: number;
    clickThroughRate: number;
    conversionRate: number;
  };
  trends: {
    hourly: { [key: string]: number };
    daily: { [key: string]: number };
    weekly: { [key: string]: number };
  };
}

export interface SocialCampaign {
  id: string;
  name: string;
  reportId: string;
  platforms: string[];
  startDate: Date;
  endDate: Date;
  status: 'active' | 'paused' | 'completed' | 'draft';
  totalPosts: number;
  totalReach: number;
  totalEngagement: number;
  averageEngagementRate: number;
  bestPerformingPost: string | null;
  worstPerformingPost: string | null;
}

export interface SocialInsights {
  topPlatforms: Array<{
    platform: string;
    posts: number;
    engagement: number;
    engagementRate: number;
  }>;
  bestContentTypes: Array<{
    type: string;
    posts: number;
    averageEngagement: number;
  }>;
  optimalPostingTimes: Array<{
    platform: string;
    hour: number;
    engagement: number;
  }>;
  audienceInsights: {
    mostEngagedAgeGroup: string;
    mostEngagedGender: string;
    topLocations: Array<{
      location: string;
      percentage: number;
    }>;
  };
  contentPerformance: Array<{
    content: string;
    platform: string;
    engagement: number;
    reach: number;
    engagementRate: number;
  }>;
}

// Mock data for demonstration
export const mockSocialAnalytics: SocialAnalytics[] = [
  {
    id: 'analytics-1',
    platform: 'linkedin',
    postId: 'post-1',
    reportId: 'report-1',
    sectionId: 'strategic-summary',
    content: '🎯 الملخص الاستراتيجي - تحليل شامل للحملة الإعلانية...',
    publishedAt: new Date('2024-01-15T10:00:00Z'),
    metrics: {
      views: 1250,
      likes: 45,
      shares: 12,
      comments: 8,
      clicks: 23,
      engagement: 65
    },
    demographics: {
      ageGroups: { '25-34': 40, '35-44': 35, '45-54': 25 },
      genders: { 'male': 60, 'female': 40 },
      locations: { 'السعودية': 70, 'الإمارات': 20, 'مصر': 10 }
    },
    performance: {
      reach: 1250,
      impressions: 2100,
      engagementRate: 5.2,
      clickThroughRate: 1.8,
      conversionRate: 0.6
    },
    trends: {
      hourly: { '10': 15, '11': 25, '12': 30, '13': 20, '14': 10 },
      daily: { '2024-01-15': 100, '2024-01-16': 80, '2024-01-17': 60 },
      weekly: { 'week-1': 240, 'week-2': 180, 'week-3': 160 }
    }
  },
  {
    id: 'analytics-2',
    platform: 'facebook',
    postId: 'post-2',
    reportId: 'report-1',
    sectionId: 'strategic-summary',
    content: '🎯 الملخص الاستراتيجي - تحليل شامل للحملة الإعلانية...',
    publishedAt: new Date('2024-01-15T14:00:00Z'),
    metrics: {
      views: 2100,
      likes: 120,
      shares: 45,
      comments: 25,
      clicks: 67,
      engagement: 190
    },
    demographics: {
      ageGroups: { '25-34': 45, '35-44': 30, '45-54': 25 },
      genders: { 'male': 55, 'female': 45 },
      locations: { 'السعودية': 65, 'الإمارات': 25, 'مصر': 10 }
    },
    performance: {
      reach: 2100,
      impressions: 3500,
      engagementRate: 9.0,
      clickThroughRate: 3.2,
      conversionRate: 1.2
    },
    trends: {
      hourly: { '14': 20, '15': 35, '16': 40, '17': 25, '18': 15 },
      daily: { '2024-01-15': 135, '2024-01-16': 110, '2024-01-17': 85 },
      weekly: { 'week-1': 330, 'week-2': 280, 'week-3': 250 }
    }
  },
  {
    id: 'analytics-3',
    platform: 'twitter',
    postId: 'post-3',
    reportId: 'report-1',
    sectionId: 'strategic-summary',
    content: '🎯 الملخص الاستراتيجي - تحليل شامل للحملة الإعلانية...',
    publishedAt: new Date('2024-01-15T16:00:00Z'),
    metrics: {
      views: 850,
      likes: 35,
      shares: 15,
      comments: 12,
      clicks: 18,
      engagement: 62
    },
    demographics: {
      ageGroups: { '25-34': 50, '35-44': 30, '45-54': 20 },
      genders: { 'male': 65, 'female': 35 },
      locations: { 'السعودية': 75, 'الإمارات': 15, 'مصر': 10 }
    },
    performance: {
      reach: 850,
      impressions: 1200,
      engagementRate: 7.3,
      clickThroughRate: 2.1,
      conversionRate: 0.8
    },
    trends: {
      hourly: { '16': 25, '17': 30, '18': 20, '19': 15, '20': 10 },
      daily: { '2024-01-15': 100, '2024-01-16': 75, '2024-01-17': 55 },
      weekly: { 'week-1': 230, 'week-2': 180, 'week-3': 150 }
    }
  }
];

export const mockSocialCampaigns: SocialCampaign[] = [
  {
    id: 'campaign-1',
    name: 'حملة الملخص الاستراتيجي',
    reportId: 'report-1',
    platforms: ['linkedin', 'facebook', 'twitter'],
    startDate: new Date('2024-01-15T00:00:00Z'),
    endDate: new Date('2024-01-22T23:59:59Z'),
    status: 'active',
    totalPosts: 3,
    totalReach: 4200,
    totalEngagement: 317,
    averageEngagementRate: 7.5,
    bestPerformingPost: 'post-2',
    worstPerformingPost: 'post-3'
  }
];

// Calculate engagement rate
export function calculateEngagementRate(metrics: SocialAnalytics['metrics']): number {
  const totalEngagement = metrics.likes + metrics.shares + metrics.comments + metrics.clicks;
  return metrics.views > 0 ? (totalEngagement / metrics.views) * 100 : 0;
}

// Calculate click-through rate
export function calculateClickThroughRate(metrics: SocialAnalytics['metrics']): number {
  return metrics.views > 0 ? (metrics.clicks / metrics.views) * 100 : 0;
}

// Calculate conversion rate
export function calculateConversionRate(metrics: SocialAnalytics['metrics']): number {
  return metrics.clicks > 0 ? (metrics.engagement / metrics.clicks) * 100 : 0;
}

// Get platform performance comparison
export function getPlatformPerformance(analytics: SocialAnalytics[]): Array<{
  platform: string;
  posts: number;
  engagement: number;
  engagementRate: number;
}> {
  const platformData: { [key: string]: any } = {};
  
  analytics.forEach(analytic => {
    if (!platformData[analytic.platform]) {
      platformData[analytic.platform] = {
        platform: analytic.platform,
        posts: 0,
        totalEngagement: 0,
        totalViews: 0
      };
    }
    
    platformData[analytic.platform].posts++;
    platformData[analytic.platform].totalEngagement += analytic.metrics.engagement;
    platformData[analytic.platform].totalViews += analytic.metrics.views;
  });
  
  return Object.values(platformData).map(data => ({
    platform: data.platform,
    posts: data.posts,
    engagement: data.totalEngagement,
    engagementRate: data.totalViews > 0 ? (data.totalEngagement / data.totalViews) * 100 : 0
  }));
}

// Get content performance insights
export function getContentInsights(analytics: SocialAnalytics[]): SocialInsights {
  const platformPerformance = getPlatformPerformance(analytics);
  
  // Top platforms by engagement
  const topPlatforms = platformPerformance
    .sort((a, b) => b.engagementRate - a.engagementRate)
    .slice(0, 3);
  
  // Best content types (simplified)
  const contentTypes = analytics.reduce((acc, analytic) => {
    const type = analytic.sectionId;
    if (!acc[type]) {
      acc[type] = { posts: 0, totalEngagement: 0 };
    }
    acc[type].posts++;
    acc[type].totalEngagement += analytic.metrics.engagement;
    return acc;
  }, {} as { [key: string]: { posts: number; totalEngagement: number } });
  
  const bestContentTypes = Object.entries(contentTypes)
    .map(([type, data]) => ({
      type,
      posts: data.posts,
      averageEngagement: data.totalEngagement / data.posts
    }))
    .sort((a, b) => b.averageEngagement - a.averageEngagement)
    .slice(0, 3);
  
  // Optimal posting times (simplified)
  const optimalPostingTimes = analytics
    .map(analytic => ({
      platform: analytic.platform,
      hour: analytic.publishedAt.getHours(),
      engagement: analytic.metrics.engagement
    }))
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, 5);
  
  // Audience insights
  const allDemographics = analytics.reduce((acc, analytic) => {
    acc.ageGroups = { ...acc.ageGroups, ...analytic.demographics.ageGroups };
    acc.genders = { ...acc.genders, ...analytic.demographics.genders };
    acc.locations = { ...acc.locations, ...analytic.demographics.locations };
    return acc;
  }, { ageGroups: {}, genders: {}, locations: {} } as any);
  
  const mostEngagedAgeGroup = Object.entries(allDemographics.ageGroups)
    .sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || '25-34';
  
  const mostEngagedGender = Object.entries(allDemographics.genders)
    .sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || 'male';
  
  const topLocations = Object.entries(allDemographics.locations)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 3)
    .map(([location, count]) => ({
      location,
      percentage: count as number
    }));
  
  // Content performance
  const contentPerformance = analytics
    .map(analytic => ({
      content: analytic.content.substring(0, 50) + '...',
      platform: analytic.platform,
      engagement: analytic.metrics.engagement,
      reach: analytic.metrics.views,
      engagementRate: calculateEngagementRate(analytic.metrics)
    }))
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, 10);
  
  return {
    topPlatforms,
    bestContentTypes,
    optimalPostingTimes,
    audienceInsights: {
      mostEngagedAgeGroup,
      mostEngagedGender,
      topLocations
    },
    contentPerformance
  };
}

// Get campaign performance
export function getCampaignPerformance(campaignId: string, analytics: SocialAnalytics[]): {
  campaign: SocialCampaign | null;
  analytics: SocialAnalytics[];
  insights: SocialInsights;
} {
  const campaign = mockSocialCampaigns.find(c => c.id === campaignId);
  const campaignAnalytics = analytics.filter(a => a.reportId === campaign?.reportId);
  const insights = getContentInsights(campaignAnalytics);
  
  return {
    campaign,
    analytics: campaignAnalytics,
    insights
  };
}

// Generate performance report
export function generatePerformanceReport(analytics: SocialAnalytics[]): {
  summary: {
    totalPosts: number;
    totalReach: number;
    totalEngagement: number;
    averageEngagementRate: number;
    bestPerformingPost: SocialAnalytics | null;
    worstPerformingPost: SocialAnalytics | null;
  };
  insights: SocialInsights;
  recommendations: string[];
} {
  const totalPosts = analytics.length;
  const totalReach = analytics.reduce((sum, a) => sum + a.metrics.views, 0);
  const totalEngagement = analytics.reduce((sum, a) => sum + a.metrics.engagement, 0);
  const averageEngagementRate = totalReach > 0 ? (totalEngagement / totalReach) * 100 : 0;
  
  const bestPerformingPost = analytics.reduce((best, current) => 
    current.metrics.engagement > best.metrics.engagement ? current : best
  );
  
  const worstPerformingPost = analytics.reduce((worst, current) => 
    current.metrics.engagement < worst.metrics.engagement ? current : worst
  );
  
  const insights = getContentInsights(analytics);
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (insights.topPlatforms.length > 0) {
    const bestPlatform = insights.topPlatforms[0];
    recommendations.push(`ركز على ${bestPlatform.platform} للحصول على أعلى معدل تفاعل (${bestPlatform.engagementRate.toFixed(1)}%)`);
  }
  
  if (insights.optimalPostingTimes.length > 0) {
    const bestTime = insights.optimalPostingTimes[0];
    recommendations.push(`أنشر في الساعة ${bestTime.hour}:00 على ${bestTime.platform} للحصول على أفضل تفاعل`);
  }
  
  if (insights.audienceInsights.mostEngagedAgeGroup) {
    recommendations.push(`استهدف الفئة العمرية ${insights.audienceInsights.mostEngagedAgeGroup} للحصول على أفضل تفاعل`);
  }
  
  if (averageEngagementRate < 5) {
    recommendations.push('حسّن محتوى المشاركات لزيادة معدل التفاعل');
  }
  
  if (insights.contentPerformance.length > 0) {
    const bestContent = insights.contentPerformance[0];
    recommendations.push(`استخدم محتوى مشابه لـ "${bestContent.content}" للحصول على أفضل أداء`);
  }
  
  return {
    summary: {
      totalPosts,
      totalReach,
      totalEngagement,
      averageEngagementRate,
      bestPerformingPost,
      worstPerformingPost
    },
    insights,
    recommendations
  };
}
