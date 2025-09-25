/**
 * Competitor Analysis Module
 * Contains logic for competitor mirror analysis
 */

import { CampaignData, KpiSet } from '../../types';
import { generateCompetitorSummary } from '../ai/generators';
import { calculateKpisForBudgetAllocation } from './kpiCalculator';

// Mock data for competitor splits
const competitorSplits = [
  { industry: 'تجارة إلكترونية', competitor_split: { meta: 0.4, google_ads: 0.3, tiktok: 0.3 } }
];

/**
 * Performs competitor analysis and generates mirror insights
 */
export const performCompetitorAnalysis = async (
  formData: CampaignData,
  activeSeasons: string[]
) => {
  const competitorSplit = competitorSplits.find(s => s.industry === formData.industry);
  if (!competitorSplit) {
    return null;
  }

  const competitorBudgets: { [key: string]: number } = {};
  Object.entries(competitorSplit.competitor_split).forEach(([platform, ratio]) => {
    competitorBudgets[platform] = formData.budget * (ratio as number);
  });

  const competitorKpis = calculateKpisForBudgetAllocation(
    competitorBudgets, 
    { ...formData, platforms: Object.keys(competitorBudgets) }, 
    activeSeasons
  );

  return {
    summary: await generateCompetitorSummary(formData.industry, competitorKpis),
    budgetAllocation: competitorBudgets,
    kpis: competitorKpis,
  };
};
