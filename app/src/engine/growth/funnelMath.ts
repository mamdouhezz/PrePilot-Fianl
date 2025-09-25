import { CampaignReport } from '../../types';
import { FunnelStage, FunnelStageName } from '../../types/growth';

// These are simplified benchmarks for demonstration. A real app would have more complex logic.
const BENCHMARKS: Record<FunnelStageName, { kpi: string, benchmark: number, color: FunnelStage['color'] }> = {
    'Awareness': { kpi: 'Impressions', benchmark: 1000000, color: 'indigo' },
    'Engagement': { kpi: 'Clicks', benchmark: 20000, color: 'blue' },
    'Conversion': { kpi: 'Conversions', benchmark: 400, color: 'green' },
    'Retention': { kpi: 'Repeat Customers (Est.)', benchmark: 80, color: 'teal' }, // Mocked
    'Growth Loop': { kpi: 'Referrals (Est.)', benchmark: 16, color: 'purple' }, // Mocked
};

const getPerformance = (value: number, benchmark: number): { performance: 'above' | 'at' | 'below', delta: number } => {
    const delta = ((value - benchmark) / benchmark) * 100;
    if (delta > 5) return { performance: 'above', delta };
    if (delta < -5) return { performance: 'below', delta };
    return { performance: 'at', delta };
};

/**
 * A deterministic function that calculates the data for the visual funnel diagram.
 * It uses the report's KPIs and some estimations for later funnel stages.
 * @param report The campaign report.
 * @returns An array of FunnelStage objects.
 */
export function generateFunnelStages(report: CampaignReport): FunnelStage[] {
    const totals = report.kpis.totals;

    const stages: FunnelStage[] = [
        {
            name: 'Awareness',
            value: totals.impressions,
            ...BENCHMARKS['Awareness'],
            ...getPerformance(totals.impressions, BENCHMARKS['Awareness'].benchmark),
            tactic: "زيادة الوصول للمحتوى الفيروسي."
        },
        {
            name: 'Engagement',
            value: totals.clicks,
            ...BENCHMARKS['Engagement'],
            ...getPerformance(totals.clicks, BENCHMARKS['Engagement'].benchmark),
            tactic: "تحسين جودة الإعلانات لرفع CTR."
        },
        {
            name: 'Conversion',
            value: totals.conversions,
            ...BENCHMARKS['Conversion'],
            ...getPerformance(totals.conversions, BENCHMARKS['Conversion'].benchmark),
            tactic: "تحسين صفحة الهبوط لزيادة CVR."
        },
        // Mocked stages for demonstration
        {
            name: 'Retention',
            value: Math.round(totals.conversions * 0.2), // Assume 20% retention rate
            ...BENCHMARKS['Retention'],
            ...getPerformance(Math.round(totals.conversions * 0.2), BENCHMARKS['Retention'].benchmark),
            tactic: "بناء علاقة مع العملاء عبر البريد."
        },
        {
            name: 'Growth Loop',
            value: Math.round(totals.conversions * 0.05), // Assume 5% referral rate
            ...BENCHMARKS['Growth Loop'],
            ...getPerformance(Math.round(totals.conversions * 0.05), BENCHMARKS['Growth Loop'].benchmark),
            tactic: "تحفيز العملاء على مشاركة تجاربهم."
        }
    ];

    return stages;
}
