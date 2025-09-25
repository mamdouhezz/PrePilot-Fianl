/**
 * KPI Calculator Module
 * Contains all deterministic KPI calculation logic using centralized data layer
 */

import { CampaignData, KpiSet } from '../../types';
import { 
  platformBenchmarks, 
  industryBenchmarks, 
  seasonalBenchmarks,
  creativeModifiers,
  competitionModifiers,
  targetingModifiers,
  demographicPerformance,
  locationPerformance,
  devicePerformance,
  type PlatformKey,
  type IndustryKey,
  type SeasonKey
} from '../data';

/**
 * Combines multiple multipliers using log-sum or product method with soft/hard caps
 */
export function combineMultipliers(
  multipliers: number[],
  { softCap, hardCap, method = 'log-sum' }: { softCap: number; hardCap: number; method?: 'log-sum' | 'product' }
): number {
  const safe = multipliers.map(m => Math.max(m, 0.01));
  if (method === 'log-sum') {
    const logSum = safe.reduce((acc, m) => acc + Math.log(m), 0);
    const combined = Math.exp(logSum);
    const soft = combined > softCap ? softCap + 0.5 * (combined - softCap) : combined;
    return Math.min(soft, hardCap);
  }
  const product = safe.reduce((a, b) => a * b, 1);
  const soft = product > softCap ? softCap + 0.5 * (product - softCap) : product;
  return Math.min(soft, hardCap);
}

/**
 * Enhanced demographic modifier using platform-specific performance data
 */
export const getDemographicModifier = (
  targetAudience: CampaignData['targetAudience'],
  platform: PlatformKey
): { cpm: number; cvr: number; ctr: number } => {
  const platformData = demographicPerformance[platform];
  if (!platformData || !targetAudience) {
    return { cpm: 1.0, cvr: 1.0, ctr: 1.0 };
  }

  let cpmModifier = 1.0;
  let cvrModifier = 1.0;
  let ctrModifier = 1.0;

  // Age group modifiers - use platform-specific data
  if (targetAudience.ageGroups && targetAudience.ageGroups.length > 0) {
    targetAudience.ageGroups.forEach(ageGroup => {
      const ageKey = `age_${ageGroup}`;
      const ageModifier = platformData[ageKey];
      if (ageModifier) {
        cpmModifier *= ageModifier.cpm_mod || 1.0;
        cvrModifier *= ageModifier.cvr_mod || 1.0;
        ctrModifier *= ageModifier.ctr_mod || 1.0;
      }
    });
  }

  // Gender modifiers - use platform-specific data
  if (targetAudience.gender) {
    const genderKey = `gender_${targetAudience.gender}`;
    const genderModifier = platformData[genderKey];
    if (genderModifier) {
      cpmModifier *= genderModifier.cpm_mod || 1.0;
      cvrModifier *= genderModifier.cvr_mod || 1.0;
      ctrModifier *= genderModifier.ctr_mod || 1.0;
    }
  }

  return { cpm: cpmModifier, cvr: cvrModifier, ctr: ctrModifier };
};

/**
 * Calculates location-based modifiers for Saudi regions
 */
export const getLocationModifier = (
  locations: string[]
): { cpm: number; cvr: number } => {
  if (!locations || locations.length === 0) {
    return { cpm: 1.0, cvr: 1.0 };
  }

  let totalCpmModifier = 0;
  let totalCvrModifier = 0;
  let validLocations = 0;

  locations.forEach(location => {
    const locationModifier = locationPerformance[location];
    if (locationModifier) {
      totalCpmModifier += locationModifier.cpm_mod;
      totalCvrModifier += locationModifier.cvr_mod;
      validLocations++;
    }
  });

  if (validLocations === 0) {
    return { cpm: 1.0, cvr: 1.0 };
  }

  // Average the modifiers across selected locations
  return {
    cpm: totalCpmModifier / validLocations,
    cvr: totalCvrModifier / validLocations
  };
};

/**
 * Calculates device-based modifiers (mobile vs desktop)
 */
export const getDeviceModifier = (): { ctr: number; cvr: number } => {
  // Default to mobile as it's the dominant use case in Saudi Arabia
  const deviceModifier = devicePerformance['mobile'];
  return {
    ctr: deviceModifier?.ctr_mod || 1.0,
    cvr: deviceModifier?.cvr_mod || 1.0
  };
};

/**
 * Calculates targeting modifiers based on interests and behaviors
 */
export const getTargetingModifier = (
  interests?: string[],
  behaviors?: string[]
): { cpm: number; cvr: number; ctr: number } => {
  let cpmModifier = 1.0;
  let cvrModifier = 1.0;
  let ctrModifier = 1.0;

  // Interest modifiers
  if (interests) {
    interests.forEach(interest => {
      const interestModifier = targetingModifiers.interests[interest as keyof typeof targetingModifiers.interests];
      if (interestModifier) {
        cpmModifier *= interestModifier.cpm;
        cvrModifier *= interestModifier.cvr;
        ctrModifier *= interestModifier.ctr;
      }
    });
  }

  // Behavior modifiers
  if (behaviors) {
    behaviors.forEach(behavior => {
      const behaviorModifier = targetingModifiers.behaviors[behavior as keyof typeof targetingModifiers.behaviors];
      if (behaviorModifier) {
        cpmModifier *= behaviorModifier.cpm;
        cvrModifier *= behaviorModifier.cvr;
        ctrModifier *= behaviorModifier.ctr;
      }
    });
  }

  return { cpm: cpmModifier, cvr: cvrModifier, ctr: ctrModifier };
};

/**
 * Calculates KPIs for a specific platform with all modifiers applied
 */
export const _calculateKpis = (
  budget: number,
  platform: PlatformKey,
  industry: IndustryKey,
  activeSeasons: SeasonKey[],
  creativeType?: string,
  competitionLevel?: string,
  targetAudience?: CampaignData['targetAudience'],
  interests?: string[],
  behaviors?: string[]
): KpiSet => {
  // Get base platform data
  const base = platformBenchmarks[platform];
  if (!base) {
    throw new Error(`Platform ${platform} not found in benchmarks`);
  }

  // Get industry data
  const industryData = industryBenchmarks[industry] || industryBenchmarks['default'];

  // Apply seasonal multipliers
  const seasonalCpmMultiplier = combineMultipliers(
    activeSeasons.map(s => (seasonalBenchmarks as any)[s as any]?.CPM_multiplier ?? 1.0), 
    { softCap: 1.6, hardCap: 2.0 }
  );
  const seasonalCtrMultiplier = combineMultipliers(
    activeSeasons.map(s => (seasonalBenchmarks as any)[s as any]?.CTR_multiplier ?? 1.0), 
    { softCap: 1.5, hardCap: 1.8 }
  );
  const seasonalCvrMultiplier = combineMultipliers(
    activeSeasons.map(s => (seasonalBenchmarks as any)[s as any]?.CVR_multiplier ?? 1.0), 
    { softCap: 1.6, hardCap: 2.0 }
  );

  // Apply industry modifiers
  const industryCpmModifier = industryData.cpm_modifier;
  const industryCtrModifier = industryData.ctr_modifier;
  const industryCvrModifier = industryData.cvr_modifier;

  // Apply creative modifiers
  let creativeCpmModifier = 1.0;
  let creativeCtrModifier = 1.0;
  let creativeCvrModifier = 1.0;
  
  if (creativeType) {
    const creativeModifier = creativeModifiers[creativeType as keyof typeof creativeModifiers];
    if (creativeModifier && typeof creativeModifier === 'object' && 'cpm' in creativeModifier) {
      creativeCpmModifier = creativeModifier.cpm;
      creativeCtrModifier = creativeModifier.ctr;
      creativeCvrModifier = creativeModifier.cvr;
    }
  }

  // Apply competition modifiers
  let competitionCpmModifier = 1.0;
  let competitionCtrModifier = 1.0;
  let competitionCvrModifier = 1.0;
  
  if (competitionLevel) {
    const competitionModifier = competitionModifiers[competitionLevel as keyof typeof competitionModifiers];
    if (competitionModifier && typeof competitionModifier === 'object' && 'cpm' in competitionModifier) {
      competitionCpmModifier = competitionModifier.cpm;
      competitionCtrModifier = competitionModifier.ctr;
      competitionCvrModifier = competitionModifier.cvr;
    }
  }

  // Apply demographic modifiers (now platform-specific)
  const demographicModifiers = getDemographicModifier(targetAudience, platform);

  // Apply location modifiers
  const locationModifiers = getLocationModifier(targetAudience.locations || []);

  // Apply device modifiers
  const deviceModifiers = getDeviceModifier();

  // Apply targeting modifiers
  const targetingModifiers_result = getTargetingModifier(interests, behaviors);

  // Combine all modifiers with new advanced modifiers
  const finalCpmModifier = combineMultipliers([
    seasonalCpmMultiplier,
    industryCpmModifier,
    creativeCpmModifier,
    competitionCpmModifier,
    demographicModifiers.cpm,
    locationModifiers.cpm,
    targetingModifiers_result.cpm
  ], { softCap: 2.0, hardCap: 3.0 });

  const finalCtrModifier = combineMultipliers([
    seasonalCtrMultiplier,
    industryCtrModifier,
    creativeCtrModifier,
    competitionCtrModifier,
    demographicModifiers.ctr,
    deviceModifiers.ctr,
    targetingModifiers_result.ctr
  ], { softCap: 1.8, hardCap: 2.5 });

  const finalCvrModifier = combineMultipliers([
    seasonalCvrMultiplier,
    industryCvrModifier,
    creativeCvrModifier,
    competitionCvrModifier,
    demographicModifiers.cvr,
    locationModifiers.cvr,
    deviceModifiers.cvr,
    targetingModifiers_result.cvr
  ], { softCap: 2.0, hardCap: 3.0 });

  // Calculate final KPIs
  const adjustedCpm = base.avg_CPM_ريال.value * finalCpmModifier;
  const adjustedCtr = base.avg_CTR_percent.value * finalCtrModifier;
  const adjustedCvr = base.avg_CVR_percent.value * finalCvrModifier;

  const impressions = Math.round((budget / adjustedCpm) * 1000);
  const clicks = Math.round(impressions * (adjustedCtr / 100));
  const conversions = Math.round(clicks * (adjustedCvr / 100));
  const cpc = adjustedCpm / adjustedCtr * 100;
  
  // Calculate ROAS based on industry AOV
  const aov = industryData.avg_AOV_ريال;
  const revenue = conversions * aov;
  const roas = budget > 0 ? revenue / budget : 0;

  return {
    impressions,
    clicks,
    conversions,
    cpm: adjustedCpm,
    ctr: adjustedCtr,
    cpc: cpc,
    cvr: adjustedCvr,
    roas: roas,
    revenue: revenue,
    cac: conversions > 0 ? budget / conversions : 0
  };
};

/**
 * Calculates KPIs for budget allocation across multiple platforms
 */
export const calculateKpisForBudgetAllocation = (
  budgetAllocation: { [platform: string]: number },
  campaignData: CampaignData,
  activeSeasons: SeasonKey[]
): { [platform: string]: KpiSet } => {
  const results: { [platform: string]: KpiSet } = {};

  for (const [platform, budget] of Object.entries(budgetAllocation)) {
    if (budget > 0) {
      try {
        results[platform] = _calculateKpis(
          budget,
          platform as PlatformKey,
          campaignData.industry as IndustryKey,
          activeSeasons,
          campaignData.creativeType,
          campaignData.competitorContext,
          campaignData.targetAudience,
          campaignData.interests,
          campaignData.behaviors
        );
      } catch (error) {
        console.warn(`Failed to calculate KPIs for platform ${platform}:`, error);
        // Provide default values if calculation fails
        results[platform] = {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          cpm: 0,
          ctr: 0,
          cpc: 0,
          cvr: 0,
          roas: 0,
          revenue: 0,
          cac: 0
        };
      }
    }
  }

  return results;
};