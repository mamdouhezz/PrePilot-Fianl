import React from 'react';
import { CampaignReport, KpiSet } from '../../types';
import { PLATFORMS } from '../../constants';
import PlatformIcon from '../ui/PlatformIcon';
import { ArrowUpIcon, ArrowDownIcon } from '../ui/Icons';

interface MediaPlanTableProps {
    report: CampaignReport;
    comparisonReport?: CampaignReport | null;
    printMode?: boolean;
}

const ComparisonCell = ({ newValue, originalValue, format, isPositiveGood = true }: { newValue: number, originalValue: number, format: 'number' | 'currency' | 'roas', isPositiveGood?: boolean }) => {
    const delta = newValue - originalValue;
    if (Math.abs(delta) < 0.01) return <>{formatValue(newValue, format)}</>;

    const isPositive = delta > 0;
    let changeColor = 'text-gray-500';
    if ((isPositive && isPositiveGood) || (!isPositive && !isPositiveGood)) {
        changeColor = 'text-green-400';
    } else {
        changeColor = 'text-red-400';
    }

    return (
        <div className="flex flex-col items-center">
            <span>{formatValue(newValue, format)}</span>
            <span className={`text-xs font-mono flex items-center gap-1 ${changeColor}`}>
                {isPositive ? <ArrowUpIcon className="w-3 h-3"/> : <ArrowDownIcon className="w-3 h-3"/>}
                {formatValue(delta, format, true)}
            </span>
        </div>
    );
};

const formatValue = (value: number, format: 'number' | 'currency' | 'roas', showSign = false) => {
    const sign = value > 0 && showSign ? '+' : '';
    switch(format) {
        case 'currency': return `${sign}${value.toFixed(2)}`;
        case 'roas': return `${sign}${value.toFixed(2)}x`;
        case 'number':
        default: return `${sign}${value.toLocaleString('en-US')}`;
    }
};

const MediaPlanTable: React.FC<MediaPlanTableProps> = ({ report, comparisonReport = null, printMode = false }) => {
    const { kpis } = report;
    const totalBudget = kpis.totals.budget;
    const isComparison = !!comparisonReport;

    const baseText = printMode ? 'text-gray-700' : 'text-gray-300';
    const headerText = printMode ? 'text-gray-600' : 'text-gray-400';
    const primaryText = printMode ? 'text-black' : 'text-white';
    const highlightText1 = printMode ? 'text-sky-700' : 'text-sky-300';
    const highlightText2 = printMode ? 'text-green-700' : 'text-green-400';
    
    return (
        <div className="overflow-x-auto">
            <table className={`w-full text-sm text-start ${baseText}`}>
                <thead className={`${printMode ? 'bg-gray-100' : 'bg-gray-950'}`}>
                    <tr>
                        <th className={`px-2 sm:px-4 py-3 ${headerText}`}>المنصة</th>
                        <th className={`px-2 sm:px-4 py-3 text-center ${headerText}`}>الميزانية (ريال)</th>
                        <th className={`px-2 sm:px-4 py-3 text-center ${headerText}`}>التحويلات</th>
                        <th className={`px-2 sm:px-4 py-3 text-center ${headerText}`}>تكلفة العميل (CAC)</th>
                        <th className={`px-2 sm:px-4 py-3 text-center ${headerText}`}>النقرات</th>
                        <th className={`px-2 sm:px-4 py-3 text-center ${headerText}`}>CPC</th>
                        <th className={`px-2 sm:px-4 py-3 text-center ${headerText}`}>الظهور</th>
                        <th className={`px-2 sm:px-4 py-3 text-center ${headerText}`}>ROAS</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(kpis.perPlatform).map(([platformId, data]: [string, KpiSet]) => {
                        const platformInfo = PLATFORMS.find(p => p.id === platformId);
                        const budgetPercentage = totalBudget > 0 ? (data.budget / totalBudget * 100).toFixed(1) : '0';
                        const originalData = comparisonReport?.kpis.perPlatform[platformId];
                        
                        return (
                            <tr key={platformId} className={`border-b ${printMode ? 'border-gray-300' : 'border-gray-800 hover:bg-gray-800/50'}`}>
                                <td className={`px-2 sm:px-4 py-4 font-medium whitespace-nowrap ${primaryText}`}>
                                    <div className="flex items-center gap-2">
                                        <PlatformIcon id={platformId} className="w-5 h-5" />
                                        {platformInfo?.name || platformId}
                                    </div>
                                </td>
                                <td className="px-2 sm:px-4 py-4 text-center">
                                    {data.budget.toLocaleString('en-US')}
                                    <span className={`text-xs block ${printMode ? 'text-gray-500' : 'text-gray-500'}`}>({budgetPercentage}%)</span>
                                </td>
                                <td className="px-2 sm:px-4 py-4 text-center font-semibold">
                                    {isComparison && originalData ? <ComparisonCell newValue={data.conversions} originalValue={originalData.conversions} format="number" /> : data.conversions.toLocaleString('en-US')}
                                </td>
                                <td className={`px-2 sm:px-4 py-4 text-center ${highlightText1}`}>
                                    {isComparison && originalData ? <ComparisonCell newValue={data.cac} originalValue={originalData.cac} format="currency" isPositiveGood={false} /> : data.cac.toFixed(2)}
                                </td>
                                <td className="px-2 sm:px-4 py-4 text-center">
                                    {isComparison && originalData ? <ComparisonCell newValue={data.clicks} originalValue={originalData.clicks} format="number" /> : data.clicks.toLocaleString('en-US')}
                                </td>
                                <td className="px-2 sm:px-4 py-4 text-center">
                                    {isComparison && originalData ? <ComparisonCell newValue={data.cpc} originalValue={originalData.cpc} format="currency" isPositiveGood={false} /> : data.cpc.toFixed(2)}
                                </td>
                                <td className="px-2 sm:px-4 py-4 text-center">
                                    {isComparison && originalData ? <ComparisonCell newValue={data.impressions} originalValue={originalData.impressions} format="number" /> : data.impressions.toLocaleString('en-US')}
                                </td>
                                <td className={`px-2 sm:px-4 py-4 text-center font-bold ${highlightText2}`}>
                                     {isComparison && originalData ? <ComparisonCell newValue={data.roas} originalValue={originalData.roas} format="roas" /> : (data.roas > 0 ? `${data.roas.toFixed(2)}x` : 'N/A')}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot className={`${printMode ? 'bg-gray-200' : 'bg-gray-800'} text-sm font-bold`}>
                    <tr>
                        <td className="px-2 sm:px-4 py-3">الإجمالي</td>
                        <td className="px-2 sm:px-4 py-3 text-center">{kpis.totals.budget.toLocaleString('en-US')}</td>
                        <td className="px-2 sm:px-4 py-3 text-center">{kpis.totals.conversions.toLocaleString('en-US')}</td>
                        <td className={`px-2 sm:px-4 py-3 text-center ${highlightText1}`}>{kpis.totals.cac.toFixed(2)}</td>
                        <td className="px-2 sm:px-4 py-3 text-center">{kpis.totals.clicks.toLocaleString('en-US')}</td>
                        <td className="px-2 sm:px-4 py-3 text-center">{kpis.totals.cpc.toFixed(2)}</td>
                        <td className="px-2 sm:px-4 py-3 text-center">{kpis.totals.impressions.toLocaleString('en-US')}</td>
                        <td className={`px-2 sm:px-4 py-3 text-center ${highlightText2}`}>{kpis.totals.roas > 0 ? `${kpis.totals.roas.toFixed(2)}x` : 'N/A'}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default MediaPlanTable;