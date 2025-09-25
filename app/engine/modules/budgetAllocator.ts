/**
 * Budget Allocator Module
 * Contains budget allocation logic and tactical reallocation using centralized data layer
 */

import { CampaignData } from '../../types';
import { PLATFORMS } from '../../constants';
import { 
  industrySplits, 
  goalWeights,
  platformBenchmarks,
  type IndustryKey 
} from '../data';

/**
 * Allocates budget across platforms based on industry splits and goal weights
 */
export const allocateBudget = (data: CampaignData) => {
  // Get industry-specific splits
  const industryData = industrySplits.industries[data.industry as IndustryKey] || industrySplits.industries['default'];
  const defaultSplit = industryData.defaultPlatformSplit;
  
  // Apply goal weights if goals are specified
  let weightedSplit = { ...defaultSplit };
  if (data.goals && data.goals.length > 0) {
    const primaryGoal = data.goals[0]; // Use first goal as primary
    const goalData = goalWeights.goals[primaryGoal as keyof typeof goalWeights.goals];
    
    if (goalData) {
      // Apply goal weights to the split
      Object.keys(weightedSplit).forEach(platform => {
        const goalWeight = goalData.weights[platform as keyof typeof goalData.weights] || 1.0;
        weightedSplit[platform as keyof typeof weightedSplit] = 
          (weightedSplit[platform as keyof typeof weightedSplit] || 0) * goalWeight;
      });
    }
  }

  // Filter to only selected platforms and normalize
  const selectedPlatforms = data.platforms || [];
  const filteredSplit: { [key: string]: number } = {};
  let totalWeight = 0;

  selectedPlatforms.forEach(platform => {
    const weight = weightedSplit[platform as keyof typeof weightedSplit] || 1;
    filteredSplit[platform] = weight;
    totalWeight += weight;
  });

  // If no platforms selected, use default platforms from industry
  if (selectedPlatforms.length === 0) {
    const recommendedPlatforms = industryData.recommendedPlatforms || ['meta', 'google_ads'];
    recommendedPlatforms.forEach(platform => {
      const weight = weightedSplit[platform as keyof typeof weightedSplit] || 1;
      filteredSplit[platform] = weight;
      totalWeight += weight;
    });
  }

  // Normalize weights and allocate budget
  const budgetAllocation: { [key: string]: number } = {};
  let allocatedBudget = 0;
  const platformEntries = Object.entries(filteredSplit);
  
  platformEntries.forEach(([platform, weight], index) => {
    if (index === platformEntries.length - 1) {
      // Last platform gets remaining budget to avoid rounding errors
      budgetAllocation[platform] = data.budget - allocatedBudget;
    } else {
      const allocation = Math.round((weight / totalWeight) * data.budget);
      budgetAllocation[platform] = allocation;
      allocatedBudget += allocation;
    }
  });

  // Apply tactical reallocation based on platform efficiency
  const reallocationDetails = applyTacticalReallocation(budgetAllocation, data);

  return {
    budgetAllocation: reallocationDetails.finalAllocation,
    reallocationDetails: reallocationDetails.details,
    originalAllocation: budgetAllocation,
    industrySplit: defaultSplit,
    goalWeights: data.goals?.[0] || 'default'
  };
};

/**
 * Applies tactical reallocation based on platform efficiency and minimum budget requirements
 */
const applyTacticalReallocation = (
  initialAllocation: { [key: string]: number },
  campaignData: CampaignData
) => {
  const reallocationDetails: string[] = [];
  const finalAllocation = { ...initialAllocation };

  // Get minimum budget requirements
  const minBudgets = {
    meta: 2000,
    google_ads: 3000,
    tiktok: 1500,
    snapchat: 1500,
    linkedin: 8000,
    youtube: 5000,
    x: 3000,
    programmatic: 5000
  };

  // Check for under-funded platforms
  const underFundedPlatforms: string[] = [];
  const overFundedPlatforms: { platform: string; excess: number }[] = [];

  Object.entries(finalAllocation).forEach(([platform, budget]) => {
    const minBudget = minBudgets[platform as keyof typeof minBudgets] || 1000;
    
    if (budget > 0 && budget < minBudget) {
      underFundedPlatforms.push(platform);
    } else if (budget > minBudget * 2) {
      overFundedPlatforms.push({ platform, excess: budget - minBudget * 2 });
    }
  });

  // Reallocate from over-funded to under-funded platforms
  if (underFundedPlatforms.length > 0 && overFundedPlatforms.length > 0) {
    overFundedPlatforms.sort((a, b) => b.excess - a.excess);
    
    underFundedPlatforms.forEach(underFunded => {
      const minBudget = minBudgets[underFunded as keyof typeof minBudgets] || 1000;
      const needed = minBudget - finalAllocation[underFunded];
      
      let reallocated = 0;
      for (const overFunded of overFundedPlatforms) {
        if (reallocated >= needed) break;
        
        const available = Math.min(overFunded.excess, needed - reallocated);
        if (available > 0) {
          finalAllocation[overFunded.platform] -= available;
          finalAllocation[underFunded] += available;
          reallocated += available;
          overFunded.excess -= available;
          
          reallocationDetails.push(
            `تم نقل ${available.toLocaleString()} ريال من ${overFunded.platform} إلى ${underFunded} لتلبية الحد الأدنى`
          );
        }
      }
    });
  }

  // Check for platforms with very low allocation (less than 5% of total budget)
  const totalBudget = campaignData.budget;
  const lowAllocationThreshold = totalBudget * 0.05;

  Object.entries(finalAllocation).forEach(([platform, budget]) => {
    if (budget > 0 && budget < lowAllocationThreshold) {
      reallocationDetails.push(
        `تحذير: ${platform} يحصل على ميزانية منخفضة (${budget.toLocaleString()} ريال) - قد يكون غير فعال`
      );
    }
  });

  // Industry-specific optimizations
  const industryOptimizations = getIndustryOptimizations(campaignData.industry as IndustryKey, finalAllocation);
  reallocationDetails.push(...industryOptimizations);

  return {
    finalAllocation,
    details: reallocationDetails
  };
};

/**
 * Gets industry-specific optimization recommendations
 */
const getIndustryOptimizations = (
  industry: IndustryKey,
  allocation: { [key: string]: number }
): string[] => {
  const optimizations: string[] = [];
  const industryData = industrySplits.industries[industry] || industrySplits.industries['default'];

  // Check if allocation matches industry recommendations
  const recommendedPlatforms = industryData.recommendedPlatforms || [];
  const allocatedPlatforms = Object.keys(allocation).filter(p => allocation[p] > 0);
  
  const missingRecommended = recommendedPlatforms.filter(p => !allocatedPlatforms.includes(p));
  if (missingRecommended.length > 0) {
    optimizations.push(
      `توصية: إضافة ${missingRecommended.join(', ')} للحصول على أفضل النتائج في صناعة ${industry}`
    );
  }

  // Industry-specific checks
  switch (industry) {
    case 'تجارة إلكترونية':
      if (allocation.meta && allocation.meta < 5000) {
        optimizations.push('توصية: زيادة ميزانية Meta إلى 5000 ريال على الأقل للـ e-commerce');
      }
      break;
      
    case 'عقارات':
      if (allocation.google_ads && allocation.google_ads < 8000) {
        optimizations.push('توصية: زيادة ميزانية Google Ads إلى 8000 ريال على الأقل للعقارات');
      }
      break;
      
    case 'خدمات مالية':
      if (!allocation.linkedin || allocation.linkedin < 10000) {
        optimizations.push('توصية: إضافة LinkedIn بميزانية 10000 ريال على الأقل للخدمات المالية');
      }
      break;
  }

  return optimizations;
};

/**
 * Validates budget allocation against industry best practices
 */
export const validateBudgetAllocation = (
  allocation: { [key: string]: number },
  campaignData: CampaignData
): { isValid: boolean; warnings: string[]; recommendations: string[] } => {
  const warnings: string[] = [];
  const recommendations: string[] = [];
  
  const totalBudget = campaignData.budget;
  const industryData = industrySplits.industries[campaignData.industry as IndustryKey] || industrySplits.industries['default'];

  // Check minimum budget requirements
  Object.entries(allocation).forEach(([platform, budget]) => {
    if (budget > 0) {
      const minBudget = validationBenchmarks.budget.min_per_platform[platform as keyof typeof validationBenchmarks.budget.min_per_platform] || 1000;
      
      if (budget < minBudget) {
        warnings.push(`${platform}: ميزانية أقل من الحد الأدنى الموصى به (${minBudget.toLocaleString()} ريال)`);
      }
    }
  });

  // Check if too many platforms are selected
  const activePlatforms = Object.values(allocation).filter(b => b > 0).length;
  const maxPlatforms = industryData.maxPlatforms || 5;
  
  if (activePlatforms > maxPlatforms) {
    warnings.push(`عدد المنصات (${activePlatforms}) أكثر من الموصى به (${maxPlatforms})`);
  }

  // Check budget distribution
  Object.entries(allocation).forEach(([platform, budget]) => {
    if (budget > 0) {
      const percentage = (budget / totalBudget) * 100;
      
      if (percentage < 5) {
        warnings.push(`${platform}: حصة ميزانية منخفضة جداً (${percentage.toFixed(1)}%)`);
      } else if (percentage > 70) {
        warnings.push(`${platform}: تركيز مفرط على منصة واحدة (${percentage.toFixed(1)}%)`);
      }
    }
  });

  const isValid = warnings.length === 0;

  return { isValid, warnings, recommendations };
};