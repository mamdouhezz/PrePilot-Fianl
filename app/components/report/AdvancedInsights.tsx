import React from 'react';
import { AdvancedInsightsSet } from '../../types';

interface AdvancedInsightsProps {
    insights: AdvancedInsightsSet;
    printMode?: boolean;
}

const statusClasses = {
    above: { web: 'bg-green-900/30 border-green-700/50 text-green-300', icon: '✅' },
    below: { web: 'bg-red-900/30 border-red-700/50 text-red-300', icon: '⚠️' },
    'on-par': { web: 'bg-gray-800 border-gray-700 text-gray-300', icon: '➖' },
    neutral: { web: 'bg-sky-900/30 border-sky-700/50 text-sky-300', icon: '💡' }
} as const;

const InsightCard: React.FC<{ data: AdvancedInsightsSet[keyof AdvancedInsightsSet], printMode?: boolean }> = ({ data, printMode = false }) => {
    if ('applied' in data) { // Type guard for SeasonalLift
        const hasSeasons = data.applied.length > 0 && data.applied[0] !== 'بدون موسم معين';
        const cardClasses = printMode ? 'bg-gray-100 border-gray-300' : statusClasses.neutral.web;
        return (
            <div className={`p-4 rounded-xl border ${cardClasses}`}>
                <h4 className="font-bold text-lg mb-2 flex items-center">{statusClasses.neutral.icon} التأثير الموسمي</h4>
                <p className={printMode ? 'text-gray-700' : 'text-gray-300'}>{(data as any).insight}</p>
                {hasSeasons && <p className={`text-xs mt-2 ${printMode ? 'text-gray-500' : 'text-gray-400'}`}>الموسم المطبق: {data.applied.join(', ')}</p>}
            </div>
        );
    }
    
    const typedData: any = data;
    const status = typedData.status || 'neutral';
    const webClasses = (statusClasses as any)[status] || statusClasses.neutral;
    const cardClasses = printMode ? 'bg-gray-100 border-gray-300' : webClasses.web;
    const textClasses = printMode ? (status === 'above' ? 'text-green-700' : status === 'below' ? 'text-red-700' : 'text-sky-700') : webClasses.web;

    return (
        <div className={`p-4 rounded-xl border ${cardClasses}`}>
            <h4 className="font-bold text-lg mb-2 flex items-center">{webClasses.icon} {typedData.title}</h4>
            <div className="flex items-baseline gap-2 mb-2">
                <span className={`text-3xl font-bold ${textClasses}`}>{typedData.value.toLocaleString('en-US', {maximumFractionDigits: 2})}</span>
                <span className={`text-sm ${printMode ? 'text-gray-600' : 'text-gray-400'}`}>
                    {typedData.title.includes('ROAS') ? 'x' : 'ريال'}
                </span>
                {typedData.benchmark != null && typedData.benchmark > 0 && (
                     <span className={`text-xs ${printMode ? 'text-gray-500' : 'text-gray-500'}`}>(المعيار: {typedData.benchmark.toLocaleString('en-US', {maximumFractionDigits: 2})})</span>
                )}
            </div>
            <p className={`text-sm ${printMode ? 'text-gray-700' : 'text-gray-300'}`}>{typedData.insight}</p>
        </div>
    );
};

const AdvancedInsights: React.FC<AdvancedInsightsProps> = ({ insights, printMode = false }) => {
    const isConversionFocused = insights.breakEvenRoas.benchmark != null && insights.breakEvenRoas.benchmark > 0;
    return (
        <div className="space-y-4">
           {isConversionFocused && <InsightCard data={insights.breakEvenRoas} printMode={printMode} />}
           <InsightCard data={insights.cac} printMode={printMode} />
           {isConversionFocused && <InsightCard data={insights.arpu} printMode={printMode} />}
           <InsightCard data={insights.seasonalLift} printMode={printMode} />
        </div>
    );
};

export default AdvancedInsights;
