/**
 * Preflight Validation Module
 * Contains pre-submission validation logic
 */

import { CampaignData, UIWarning } from '../../types';
import { PLATFORMS } from '../../constants';
import { resolveSeasons, checkPlatformCompatibility, industryMinBudgetريال } from './rules';
import { buildUIWarningPrompt } from '../ai/prompts';
import { ai } from '../../services/aiClient';

/**
 * Generates preflight warnings for campaign data
 */
export const generatePreflightWarnings = (formData: CampaignData, platformCompatibility: any, seasonResolution: any): UIWarning[] => {
  const warnings: any[] = [];
  const minBudget = industryMinBudgetريال[formData.industry as keyof typeof industryMinBudgetريال] || industryMinBudgetريال.default;

  if (formData.budget < minBudget) {
    warnings.push({
      code: 'BUDGET_TOO_LOW',
      severity: 'high',
      context: { industry: formData.industry, minBudget, userBudget: formData.budget }
    });
  }

  if (formData.industry && formData.platforms.length > 0) {
    platformCompatibility.incompatibilities.forEach((incomp: any) => {
      const platformName = PLATFORMS.find(p => p.id === incomp.platform)?.name || incomp.platform;
      warnings.push({
        code: incomp.issue === 'incompatible' ? 'PLATFORM_INCOMPATIBLE' : 'PLATFORM_DISCOURAGED',
        severity: incomp.issue === 'incompatible' ? 'medium' : 'low',
        context: { platform: platformName, industry: formData.industry, suggestions: platformCompatibility.suggestions }
      });
    });
  }

  if (seasonResolution.dropped.length > 0 && seasonResolution.active.length < formData.seasons.filter(s => s !== 'بدون موسم معين').length) {
    warnings.push({
      code: 'SEASON_COUNT_EXCEEDED',
      severity: 'low',
      context: { dropped: seasonResolution.dropped, active: seasonResolution.active, max: 2 }
    });
  }

  seasonResolution.conflicts.forEach((conflict: any) => {
    warnings.push({ code: 'SEASON_CONFLICT', severity: 'medium', context: { pair: conflict.pair } });
  });

  return warnings;
};

/**
 * Performs preflight validation on campaign data
 */
export const preflightValidation = async (data: CampaignData): Promise<UIWarning[]> => {
  const platformCompatibility = checkPlatformCompatibility(data.industry, data.platforms);
  const seasonResolution = resolveSeasons(data.seasons);
  const rawWarnings = generatePreflightWarnings(data, platformCompatibility, seasonResolution);
  
  if (rawWarnings.length === 0) return [];
  
  try {
    const prompt = buildUIWarningPrompt(rawWarnings);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
        topP: 0.9,
        topK: 40,
        responseMimeType: "application/json",
      },
    });
    const generatedMessages = JSON.parse(response.text.trim());
    return rawWarnings.map(w => ({
      ...w,
      message: generatedMessages.find((gm: any) => gm.code === w.code)?.message || "يوجد ملاحظة على هذا المدخل.",
    }));
  } catch (error) {
    console.error("AI preflight warning generation failed:", error);
    return rawWarnings.map(w => ({
      ...w,
      message: `يوجد ملاحظة بخصوص المدخلات (الكود: ${w.code})`,
    }));
  }
};
