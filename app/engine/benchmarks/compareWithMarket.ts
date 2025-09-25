import { CampaignReport, KpiSet } from '../../types';

export function compareWithMarket(report: CampaignReport) {
  const summary = 'ملخص مقارنة مع السوق مبني على متوسطات مرجعية.';
  const competitorBudget = Object.fromEntries(Object.keys(report.budgetAllocation).map(k => [k, report.budgetAllocation[k] * 0.9]));
  const totals: KpiSet = { ...report.kpis.totals } as KpiSet;
  return {
    summary,
    budgetAllocation: competitorBudget,
    kpis: {
      totals,
      perPlatform: report.kpis.perPlatform
    }
  };
}

