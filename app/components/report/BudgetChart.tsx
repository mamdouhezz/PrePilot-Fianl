import React, { useState, useEffect } from 'react';
import { PLATFORMS } from '../../constants';
// FIX: Corrected import path for PlatformIcon.
import PlatformIcon from '../ui/PlatformIcon';

interface BudgetChartProps {
  allocation: { [platform: string]: number };
  totalBudget: number;
  comparisonAllocation?: { [platform: string]: number } | null;
  comparisonTotalBudget?: number | null;
}

const platformColors: { [key: string]: string } = {
  meta: 'from-blue-500 to-sky-500',
  tiktok: 'from-pink-500 to-rose-500',
  snapchat: 'from-yellow-400 to-amber-400',
  x: 'from-gray-400 to-gray-500',
  youtube: 'from-red-600 to-red-700',
  google_ads: 'from-green-500 to-emerald-500',
  linkedin: 'from-sky-600 to-cyan-600',
  programmatic: 'from-indigo-500 to-violet-500',
  default: 'from-prepilot-purple-500 to-fuchsia-500',
};

const getPlatformColor = (id: string): string => platformColors[id] || platformColors.default;

const BudgetItem: React.FC<{ platformId: string; budget: number; percentage: number; comparisonBudget?: number; comparisonPercentage?: number; delay: number; isComparison: boolean; }> = ({ platformId, budget, percentage, comparisonBudget, comparisonPercentage, delay, isComparison }) => {
  const [width, setWidth] = useState(0);
  const [comparisonWidth, setComparisonWidth] = useState(0);
  const platformInfo = PLATFORMS.find(p => p.id === platformId);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
      if (isComparison && comparisonPercentage) setComparisonWidth(comparisonPercentage);
    }, delay);
    return () => clearTimeout(timer);
  }, [percentage, comparisonPercentage, delay, isComparison]);

  return (
    <div className="opacity-0 animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2 text-base font-medium text-gray-200 print:text-black">
          <PlatformIcon id={platformId} className="w-5 h-5" />
          <span>{platformInfo?.name || platformId}</span>
        </div>
        <div className="text-sm font-semibold">
          <span className="text-white print:text-black">{budget.toLocaleString()}</span>
          <span className="text-gray-400 print:text-gray-600"> ريال ({percentage.toFixed(1)}%)</span>
        </div>
      </div>
      
      {isComparison ? (
         <div className="space-y-1.5">
            <div className="w-full bg-gray-700 rounded-full h-2.5">
               <div className="bg-gray-500 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${comparisonWidth}%` }} title={`الأصلي: ${comparisonPercentage?.toFixed(1)}%`} />
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
               <div className={`bg-gradient-to-r ${getPlatformColor(platformId)} h-2.5 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${width}%` }} title={`الجديد: ${percentage.toFixed(1)}%`} />
            </div>
         </div>
      ) : (
        <div className="w-full bg-gray-700 rounded-full h-3 print:bg-gray-200">
          <div className={`bg-gradient-to-r ${getPlatformColor(platformId)} h-3 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${width}%` }} />
        </div>
      )}
    </div>
  );
};

const BudgetChart: React.FC<BudgetChartProps> = ({ allocation, totalBudget, comparisonAllocation, comparisonTotalBudget }) => {
  const isComparison = !!comparisonAllocation && !!comparisonTotalBudget;
  const allPlatforms = Array.from(new Set([...Object.keys(allocation), ...(isComparison ? Object.keys(comparisonAllocation!) : [])]));

  const sortedAllocation = allPlatforms
    .map(platformId => ({ id: platformId, budget: allocation[platformId] || 0, comparisonBudget: comparisonAllocation?.[platformId] || 0 }))
    .sort((a, b) => b.budget - a.budget);

  return (
    <div className="space-y-5">
      {isComparison && (
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-gray-500" />
            <span>الخطة الأصلية</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-prepilot-purple-500" />
            <span>الخطة الجديدة</span></div>
        </div>
      )}
      {sortedAllocation.map(({ id, budget, comparisonBudget }, index) => {
        const percentage = totalBudget > 0 ? (budget / totalBudget) * 100 : 0;
        const comparisonPercentage = (isComparison && comparisonTotalBudget! > 0) ? (comparisonBudget / comparisonTotalBudget!) * 100 : 0;
        return (
          <BudgetItem 
            key={id}
            platformId={id}
            budget={budget}
            percentage={percentage}
            comparisonBudget={comparisonBudget}
            comparisonPercentage={comparisonPercentage}
            delay={index * 150}
            isComparison={isComparison}
          />
        );
      })}
    </div>
  );
};

export default BudgetChart;
