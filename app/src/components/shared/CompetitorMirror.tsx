import React from 'react';
import { CampaignReport } from '../../types';
import { PLATFORMS } from '../../constants';

interface CompetitorMirrorProps {
    userReport: { kpis: CampaignReport['kpis']; budgetAllocation: CampaignReport['budgetAllocation']; };
    competitorReport: NonNullable<CampaignReport['competitorMirror']>;
}

const BudgetComparisonBar: React.FC<{ platformName: string; userPercent: number; competitorPercent: number; }> = ({ platformName, userPercent, competitorPercent }) => (
    <div className="space-y-2">
        <p className="font-medium text-gray-200">{platformName}</p>
        <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-xs w-10 sm:w-12 text-prepilot-purple-400 shrink-0">خطتك</span>
            <div className="w-full bg-gray-700 rounded-full h-4">
                <div className="bg-prepilot-purple-600 h-4 rounded-full" style={{ width: `${userPercent}%` }} title={`${userPercent.toFixed(1)}%`}></div>
            </div>
            <span className="text-xs w-8 sm:w-10 text-end shrink-0">{userPercent.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-xs w-10 sm:w-12 text-sky-400 shrink-0">السوق</span>
            <div className="w-full bg-gray-700 rounded-full h-4">
                <div className="bg-sky-600 h-4 rounded-full" style={{ width: `${competitorPercent}%` }} title={`${competitorPercent.toFixed(1)}%`}></div>
            </div>
            <span className="text-xs w-8 sm:w-10 text-end shrink-0">{competitorPercent.toFixed(1)}%</span>
        </div>
    </div>
);

const CompetitorMirror: React.FC<CompetitorMirrorProps> = ({ userReport, competitorReport }) => {
    const userTotals = userReport.kpis.totals;
    const competitorTotals = competitorReport.kpis.totals;
    const allPlatforms = Array.from(new Set([...Object.keys(userReport.budgetAllocation), ...Object.keys(competitorReport.budgetAllocation)]));

    return (
        <div className="space-y-8">
            <div>
                <h4 className="text-lg font-bold text-gray-200 mb-2">تحليل المنافسين</h4>
                <p className="text-gray-300 bg-gray-800 p-4 rounded-lg border border-gray-700">{competitorReport.summary}</p>
            </div>
            <div>
                <h4 className="text-lg font-bold text-gray-200 mb-4">مقارنة النتائج الرئيسية</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 text-center">
                        <p className="text-base text-gray-400 mb-2">العائد (ROAS)</p>
                        <div className="grid grid-cols-2 gap-1 items-center">
                           <div><p className="text-xs text-prepilot-purple-400">خطتك</p><p className="text-xl font-bold text-white break-words">{userTotals.roas.toFixed(2)}x</p></div>
                           <div className="border-s border-gray-600 h-8 self-center"></div>
                           <div><p className="text-xs text-sky-400">السوق</p><p className="text-xl font-bold text-white break-words">{competitorTotals.roas.toFixed(2)}x</p></div>
                        </div>
                    </div>
                     <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 text-center">
                        <p className="text-base text-gray-400 mb-2">التحويلات</p>
                         <div className="grid grid-cols-2 gap-1 items-center">
                           <div><p className="text-xs text-prepilot-purple-400">خطتك</p><p className="text-xl font-bold text-white break-words">{userTotals.conversions.toLocaleString('en-US')}</p></div>
                           <div className="border-s border-gray-600 h-8 self-center"></div>
                           <div><p className="text-xs text-sky-400">السوق</p><p className="text-xl font-bold text-white break-words">{competitorTotals.conversions.toLocaleString('en-US')}</p></div>
                        </div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 text-center">
                        <p className="text-base text-gray-400 mb-2">تكلفة النقرة (CPC)</p>
                         <div className="grid grid-cols-2 gap-1 items-center">
                           <div><p className="text-xs text-prepilot-purple-400">خطتك</p><p className="text-xl font-bold text-white break-words">{userTotals.cpc.toFixed(2)} ر.س</p></div>
                           <div className="border-s border-gray-600 h-8 self-center"></div>
                           <div><p className="text-xs text-sky-400">السوق</p><p className="text-xl font-bold text-white break-words">{competitorTotals.cpc.toFixed(2)} ر.س</p></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h4 className="text-lg font-bold text-gray-200 mb-4">مقارنة توزيع الميزانية</h4>
                <div className="space-y-6">
                   {allPlatforms.map(platformId => {
                        const platformInfo = PLATFORMS.find(p => p.id === platformId);
                        if (!platformInfo) return null;
                        const userBudget = userReport.budgetAllocation[platformId] || 0;
                        const competitorBudget = competitorReport.budgetAllocation[platformId] || 0;
                        const userPercent = userTotals.budget > 0 ? (userBudget / userTotals.budget) * 100 : 0;
                        const competitorPercent = competitorTotals.budget > 0 ? (competitorBudget / competitorTotals.budget) * 100 : 0;
                        return <BudgetComparisonBar key={platformId} platformName={platformInfo.name} userPercent={userPercent} competitorPercent={competitorPercent} />;
                   })}
                </div>
            </div>
        </div>
    );
};

export default CompetitorMirror;