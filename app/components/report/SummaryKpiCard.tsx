import React from 'react';
import { CampaignReport, KpiSet, ValidationFlag } from '../../types';
import { PLATFORMS } from '../../constants';
import { MoneyIcon, UsersIcon, TrophyIcon, AlertIcon, CheckCircleIcon } from '../ui/Icons';
import PlatformIcon from '../ui/PlatformIcon';
import ComparisonValue from './ComparisonValue';

const getBestPlatform = (perPlatform: { [platform: string]: KpiSet }): { id: string, name: string } | null => {
    if (!perPlatform || Object.keys(perPlatform).length === 0) return null;

    const best = Object.entries(perPlatform).reduce((bestPlatform, currentPlatform) => {
        return currentPlatform[1].roas > bestPlatform[1].roas ? currentPlatform : bestPlatform;
    });
    
    const platformInfo = PLATFORMS.find(p => p.id === best[0]);
    return { id: best[0], name: platformInfo?.name || best[0] };
};

const getTopAnomaly = (anomalies: ValidationFlag[]): ValidationFlag | null => {
    if (!anomalies || anomalies.length === 0) return null;
    const sorted = [...anomalies].sort((a, b) => {
        const order: Record<string, number> = { high: 0, medium: 1, low: 2 };
        return (order as any)[a.severity] - (order as any)[b.severity];
    });
    return sorted[0];
};

const SummaryItem = ({ icon, title, value, subValue, valueColor, iconBgColor }: { 
    icon: React.ReactNode, 
    title: string, 
    value: React.ReactNode, 
    subValue?: string, 
    valueColor?: string,
    iconBgColor?: string
}) => (
    <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-2xl h-full">
        <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${iconBgColor || 'bg-gray-700'} ${valueColor || 'text-white'}`}>
            {icon}
        </div>
        <div className="flex flex-col">
            <p className="text-sm text-gray-400">{title}</p>
            <div className="text-2xl font-bold">{value}</div>
            {subValue && <p className="text-xs text-gray-500 mt-1">{subValue}</p>}
        </div>
    </div>
);

interface SummaryKpiCardProps {
    report: CampaignReport;
    comparisonReport?: CampaignReport | null;
}

const SummaryKpiCard: React.FC<SummaryKpiCardProps> = ({ report, comparisonReport = null }) => {
    const isComparison = !!comparisonReport;
    const bestPlatform = getBestPlatform(report.kpis.perPlatform);
    const topAnomaly = getTopAnomaly(report.anomalies);
    const totals = report.kpis.totals;
    const comparisonTotals = comparisonReport?.kpis.totals;

    const getAnomalyIcon = () => {
        if (!topAnomaly) return <CheckCircleIcon />;
        switch (topAnomaly.severity) {
            case 'high':
            case 'medium':
                return <AlertIcon />;
            case 'low':
            default:
                return <CheckCircleIcon />;
        }
    };

    const getAnomalyColors = () => {
        if (!topAnomaly) return { valueColor: 'text-green-400', iconBgColor: 'bg-green-500/20' };
        switch (topAnomaly.severity) {
            case 'high':
                return { valueColor: 'text-red-400', iconBgColor: 'bg-red-500/20' };
            case 'medium':
                return { valueColor: 'text-yellow-400', iconBgColor: 'bg-yellow-500/20' };
            case 'low':
            default:
                return { valueColor: 'text-green-400', iconBgColor: 'bg-green-500/20' };
        }
    };
    
    const anomalyColors = getAnomalyColors();

    return (
        <div className="bg-gray-800 border border-prepilot-purple-800/50 rounded-2xl p-6 shadow-2xl shadow-prepilot-purple-900/20">
            <h3 className="text-xl font-bold text-gray-200 mb-6 text-center">الخلاصة التنفيذية (At a Glance)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <SummaryItem 
                    icon={<MoneyIcon />}
                    title="العائد المتوقع (ROAS)"
                    value={
                        isComparison && comparisonTotals ? (
                            <ComparisonValue newValue={totals.roas} originalValue={comparisonTotals.roas} format="roas" />
                        ) : (
                            <span className="text-2xl font-bold">{totals.roas > 0 ? `${totals.roas.toFixed(2)}x` : 'N/A'}</span>
                        )
                    }
                    subValue={`من ميزانية ${totals.budget.toLocaleString()} ريال`}
                    valueColor="text-green-400"
                    iconBgColor="bg-green-500/20"
                />
                <SummaryItem 
                    icon={<UsersIcon />}
                    title="إجمالي التحويلات"
                    value={
                        isComparison && comparisonTotals ? (
                            <ComparisonValue newValue={totals.conversions} originalValue={comparisonTotals.conversions} format="number" />
                        ) : (
                            <span className="text-2xl font-bold">{totals.conversions.toLocaleString()}</span>
                        )
                    }
                    subValue={`بتكلفة ${totals.cac.toFixed(2)} ريال للتحويلة`}
                    valueColor="text-prepilot-purple-400"
                    iconBgColor="bg-prepilot-purple-500/20"
                />
                <SummaryItem 
                    icon={<TrophyIcon />}
                    title="أفضل منصة أداءً"
                    value={bestPlatform ? <div className="flex items-center gap-2 text-2xl font-bold"><PlatformIcon id={bestPlatform.id} className="w-6 h-6" /> {bestPlatform.name}</div> : 'N/A'}
                    subValue="بناءً على أعلى عائد متوقع"
                    valueColor="text-sky-400"
                    iconBgColor="bg-sky-500/20"
                />
                <SummaryItem 
                    icon={getAnomalyIcon()}
                    title="أهم ملاحظة"
                    value={<span className="text-xl font-bold">{topAnomaly ? topAnomaly.message.split('.')[0] : 'الأداء ضمن النطاق'}</span>}
                    subValue={topAnomaly ? `الخطورة: ${topAnomaly.severity}` : 'كل شيء يبدو جيدًا'}
                    valueColor={anomalyColors.valueColor}
                    iconBgColor={anomalyColors.iconBgColor}
                />
            </div>
        </div>
    );
};

export default SummaryKpiCard;
