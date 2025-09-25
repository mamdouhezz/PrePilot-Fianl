import React from 'react';
import { IconType } from 'react-icons';
import Icon from '../ui/Icon';

interface KpiCardProps {
  icon: IconType;
  label: string;
  value: string | number;
  delta?: number;
  tooltip: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({ icon, label, value, delta, tooltip }) => {
  const deltaColor = delta && delta > 0 ? 'text-green-400' : 'text-red-400';
  const tooltipId = `tooltip-for-${label.replace(/\s/g, '-')}`;

  return (
    <article 
      className="relative group bg-gray-800/50 border border-gray-700 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-xl p-3 sm:p-4 lg:p-5 h-full"
      role="group"
      aria-label={`مؤشر أداء: ${label}`}
      aria-describedby={tooltipId}
    >
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="space-y-1 flex-1 min-w-0">
          <p className="text-gray-400 text-xs sm:text-sm font-medium line-clamp-2">{label}</p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-100 break-words">{value}</p>
        </div>
        <div className="text-2xl sm:text-3xl text-blue-500 bg-blue-900/50 p-2 sm:p-3 rounded-lg flex-shrink-0">
          <Icon as={icon} size={20} className="sm:w-6 sm:h-6" />
        </div>
      </div>
      {delta !== undefined && (
        <p className={`text-xs sm:text-sm font-semibold mt-2 flex items-center ${deltaColor}`}>
          {delta > 0 ? '▲' : '▼'} {Math.abs(delta)}% vs baseline
        </p>
      )}
      <div 
        id={tooltipId}
        role="tooltip" 
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-1.5 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 hidden sm:block"
      >
        {tooltip}
      </div>
    </article>
  );
};

export default KpiCard;