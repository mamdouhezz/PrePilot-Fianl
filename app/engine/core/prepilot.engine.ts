/**
 * Core PrePilot Engine
 * Clean orchestrator that coordinates all campaign processing modules
 */

import { CampaignData, CampaignReport, ValidationFlag } from '../../types';
import { allocateBudget } from '../modules/budgetAllocator';
import { calculateKpisForBudgetAllocation } from '../modules/kpiCalculator';
import { applyGuardrails } from '../validation/guardrails';
import { generateAdvancedInsights, generateAIContent } from '../ai/generators';
import { performCompetitorAnalysis } from '../modules/competitorAnalysis';
import { resolveSeasons, checkPlatformCompatibility } from '../validation/rules';
import { generatePreflightWarnings } from '../validation/preflight';

/**
 * Main campaign processing orchestrator
 * Coordinates all modules to generate a complete campaign report
 */
export const runCampaign = async (formData: CampaignData): Promise<CampaignReport | { errors: string[] }> => {
  try {
    // Step 1: Validation and Season Resolution
    const seasonResolution = resolveSeasons(formData.seasons);
    const platformCompatibility = checkPlatformCompatibility(formData.industry, formData.platforms);
    const uiWarningsRaw = generatePreflightWarnings(formData, platformCompatibility, seasonResolution);

    // Step 2: Budget Allocation
    const { budgetAllocation, reallocationDetails } = allocateBudget(formData);

    // Step 3: KPI Calculation
    const rawKpisPerPlatform = calculateKpisForBudgetAllocation(budgetAllocation, formData, seasonResolution.active as any);

    // Calculate totals
    const totalBudget = formData.budget;
    const totalRevenue = Object.values(rawKpisPerPlatform).reduce((sum, kpis) => sum + kpis.revenue, 0);
    const totalConversions = Object.values(rawKpisPerPlatform).reduce((sum, kpis) => sum + kpis.conversions, 0);
    const totalClicks = Object.values(rawKpisPerPlatform).reduce((sum, kpis) => sum + kpis.clicks, 0);
    const totalImpressions = Object.values(rawKpisPerPlatform).reduce((sum, kpis) => sum + kpis.impressions, 0);
    
    const rawKpis = {
      perPlatform: rawKpisPerPlatform,
      totals: Object.values(rawKpisPerPlatform).reduce((totals, platformKpis) => ({
        budget: totalBudget,
        impressions: totals.impressions + platformKpis.impressions,
        clicks: totals.clicks + platformKpis.clicks,
        conversions: totals.conversions + platformKpis.conversions,
        cpm: totals.cpm + platformKpis.cpm,
        ctr: totals.ctr + platformKpis.ctr,
        cpc: totals.cpc + platformKpis.cpc,
        cvr: totals.cvr + platformKpis.cvr,
        roas: totals.roas + platformKpis.roas,
        revenue: totals.revenue + platformKpis.revenue,
        cac: totals.cac + platformKpis.cac,
        arpu: totals.arpu,
        cpa: totals.cpa,
        breakEvenRoas: 0 // Will be set later
      }), {
        budget: totalBudget,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        cpm: 0,
        ctr: 0,
        cpc: 0,
        cvr: 0,
        roas: 0,
        revenue: 0,
        cac: 0,
        arpu: 0,
        cpa: 0,
        breakEvenRoas: 0
      })
    };

    // Step 4: Apply Guardrails and Reconciliation
    const { validatedKpis, anomalies, corrections } = applyGuardrails(formData, rawKpis);
    
    // Calculate final ARPU and CPA
    validatedKpis.totals.arpu = validatedKpis.totals.conversions > 0 ? validatedKpis.totals.revenue / validatedKpis.totals.conversions : 0;
    validatedKpis.totals.cpa = validatedKpis.totals.conversions > 0 ? validatedKpis.totals.budget / validatedKpis.totals.conversions : 0;
    validatedKpis.totals.breakEvenRoas = formData.profitMargin > 0 ? 1 / (formData.profitMargin / 100) : 0;

    // Step 5: Generate Advanced Insights
    const advancedInsights = generateAdvancedInsights(validatedKpis.totals, formData);

    // Step 6: Competitor Analysis (if applicable)
    const competitorMirror = await performCompetitorAnalysis(formData, seasonResolution.active as any);

    // Step 7: AI Content Generation
    const aiContent = await generateAIContent(
      formData, 
      validatedKpis, 
      anomalies, 
      corrections, 
      advancedInsights, 
      uiWarningsRaw, 
      reallocationDetails, 
      competitorMirror ? { summary: competitorMirror.summary, kpis: { totals: validatedKpis.totals } } : undefined
    );

    // Step 8: Final Assembly and UI Warning Processing
    const finalUiWarnings = uiWarningsRaw.map(w => ({
      ...w,
      message: aiContent.generatedUiWarnings?.find((gw: any) => gw.code === w.code)?.message || "رسالة تحذير عامة."
    })).filter(w => w.message);

    // Step 9: Enhance Advanced Insights with AI Content
    const finalAdvancedInsights = { ...advancedInsights };
    if (aiContent.generatedAdvancedInsights) {
      finalAdvancedInsights.arpu.insight = aiContent.generatedAdvancedInsights.arpu || "";
      finalAdvancedInsights.cac.insight = aiContent.generatedAdvancedInsights.cac || "";
      finalAdvancedInsights.breakEvenRoas.insight = aiContent.generatedAdvancedInsights.breakEvenRoas || "";
      finalAdvancedInsights.seasonalLift.insight = aiContent.generatedAdvancedInsights.seasonalLift || "";
    }

    // Step 10: Return Final Report
    return {
      industry: formData.industry,
      goals: formData.goals,
      funnelStage: formData.funnelStage,
      narrative: aiContent.narrative,
      recommendations: aiContent.recommendations,
      explainability: aiContent.explainability,
      confidence: aiContent.confidence,
      budgetAllocation,
      kpis: validatedKpis,
      advancedInsights: finalAdvancedInsights,
      anomalies: [...aiContent.generatedAnomalies, ...anomalies],
      corrections,
      aiChecks: aiContent.checks,
      uiWarnings: finalUiWarnings,
      trace: {
        seasonResolution,
        platformCompatibility,
        validationSummary: { anomaliesCount: anomalies.length, correctionsCount: corrections.length },
        timestamp: new Date().toISOString()
      },
      traceId: `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`,
      competitorMirror: competitorMirror ? {
        summary: competitorMirror.summary,
        budgetAllocation: competitorMirror.budgetAllocation,
        kpis: {
          totals: validatedKpis.totals,
          perPlatform: validatedKpis.perPlatform
        }
      } : null,
    };
  } catch (error) {
    console.error("Fatal error in runCampaign:", error);
    return { errors: [`${error}`] };
  }
};
