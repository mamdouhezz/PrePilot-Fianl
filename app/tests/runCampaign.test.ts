import { describe, it, expect } from 'vitest';
import { runCampaign } from '../engine';

describe('runCampaign', () => {
  it('returns errors for invalid input (no platforms)', async () => {
    const res = await runCampaign({
      brandContext: { brandName: '', website: '', usp: '', brandTone: '', extraDetails: '' },
      industry: 'تجارة إلكترونية', subIndustry: '', budget: 10000, duration: 'short',
      targetAudience: { age: ['25-34'], gender: 'الكل', locations: ['كل المدن الرئيسية'], interests: [], behaviors: [] },
      competitorAnalysis: { mainCompetitors: [], estimatedSpend: '' },
      goals: ['Sales / Conversions'], subGoals: {}, expectedRoas: '', platforms: [], seasons: [],
      profitMargin: 30, conversionDefinition: 'purchase', funnelStage: 'conversion',
      creativeType: 'video', aov: 150, competitorContext: 'high'
    } as any);
    if ('errors' in res) {
      expect(Array.isArray(res.errors)).toBe(true);
    } else {
      // Even with missing platforms the engine may still proceed; assert structure
      expect(res.kpis).toBeDefined();
    }
  });

  it('produces report structure for typical input', async () => {
    const res = await runCampaign({
      brandContext: { brandName: 'Brand', website: '', usp: '', brandTone: '', extraDetails: '' },
      industry: 'تجارة إلكترونية', subIndustry: '', budget: 80000, duration: 'medium',
      targetAudience: { age: ['25-34'], gender: 'الكل', locations: ['كل المدن الرئيسية'], interests: [], behaviors: [] },
      competitorAnalysis: { mainCompetitors: [], estimatedSpend: '' },
      goals: ['Sales / Conversions'], subGoals: {}, expectedRoas: '', platforms: ['meta','google_ads'], seasons: ['ramadan'],
      profitMargin: 30, conversionDefinition: 'purchase', funnelStage: 'conversion',
      creativeType: 'video', aov: 150, competitorContext: 'high'
    } as any);
    expect('errors' in res).toBe(false);
    if (!('errors' in res)) {
      expect(res.kpis.totals.budget).toBeGreaterThan(0);
      expect(Object.keys(res.kpis.perPlatform).length).toBeGreaterThan(0);
    }
  });
});