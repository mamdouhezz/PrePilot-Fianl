import React from 'react';
import { KpiSet } from '../../types';

interface KPIHighlightsProps {
  kpis?: KpiSet;
  printMode?: boolean;
}

interface KpiCardProps {
  title: string;
  value: string;
  unit: string;
  colorClass?: string;
  printColorClass?: string;
  printMode?: boolean;
}

const KpiCard: React.FC<KpiCardProps> = ({ 
  title, value, unit, colorClass = 'text-green-400', printColorClass = 'text-green-700', printMode = false 
}) => (
  <div className={`p-4 rounded-xl text-center ${printMode ? 'bg-gray-100 border border-gray-300' : 'bg-gray-800 border border-gray-700'}`}>
    <p className={`text-sm sm:text-base mb-1 ${printMode ? 'text-gray-600' : 'text-gray-400'}`}>{title}</p>
    <p className={`text-2xl sm:text-3xl font-bold ${printMode ? printColorClass : colorClass}`}>
      {value} <span className="text-lg">{unit}</span>
    </p>
  </div>
);

const KPIHighlights: React.FC<KPIHighlightsProps> = ({ kpis, printMode = false }) => {
  const safe: KpiSet = kpis ?? {
    budget: 0, impressions: 0, clicks: 0, conversions: 0, ctr: 0, cpm: 0, cpc: 0, cvr: 0, roas: 0, arpu: 0, revenue: 0, cac: 0, cpa: 0, breakEvenRoas: 0
  };
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard title="العائد المتوقع (ROAS)" value={safe.roas > 0 ? safe.roas.toFixed(2) : 'N/A'} unit={safe.roas > 0 ? 'x' : ''} colorClass="text-green-400" printColorClass="text-green-700" printMode={printMode} />
      <KpiCard title="التحويلات المتوقعة" value={(safe.conversions || 0).toLocaleString('en-US')} unit="" colorClass="text-prepilot-purple-400" printColorClass="text-prepilot-purple-700" printMode={printMode} />
      <KpiCard title="تكلفة النقرة (CPC)" value={(safe.cpc || 0).toFixed(2)} unit="ريال" colorClass="text-sky-400" printColorClass="text-sky-700" printMode={printMode} />
      <KpiCard title="إجمالي النقرات" value={(safe.clicks || 0).toLocaleString('en-US')} unit="" colorClass="text-pink-400" printColorClass="text-pink-700" printMode={printMode} />
    </div>
  );
};

export default KPIHighlights;