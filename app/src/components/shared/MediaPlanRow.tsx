import React from 'react';
import { PlatformKPIs, ColumnConfig } from '../../types/media-plan';
import { formatKPIValue } from '../../engine/mediaPlan/mediaPlanLogic';
import Icon from '../ui/Icon';
import { KpiSet } from '../../types';

interface MediaPlanRowProps {
  platformData: PlatformKPIs;
  columns: ColumnConfig[];
  isEven: boolean;
}

const MediaPlanRow: React.FC<MediaPlanRowProps> = ({ platformData, columns, isEven }) => {
  return (
    <tr className={isEven ? 'bg-gray-800/30' : 'bg-transparent'}>
      {columns.map((col) => {
        let value;
        if (col.key === 'platform') {
          value = (
            <div className="flex items-center gap-3 font-bold text-white">
              <Icon as={platformData.icon} size={24} style={{ color: platformData.color }} />
              <span>{platformData.name}</span>
            </div>
          );
        } else if (col.key === 'budget') {
          value = formatKPIValue(platformData.budget, col.type);
        } else if (col.key === 'percentage') {
          value = formatKPIValue(platformData.percentage, col.type);
        } else {
          value = formatKPIValue(platformData.kpis[col.key as keyof KpiSet], col.type);
        }

        return (
          <td
            key={`${platformData.platform}-${col.key}`}
            className={`px-4 py-3 text-sm text-gray-300
              ${col.type === 'currency' || col.type === 'number' || col.type === 'roas' || col.type === 'percentage' ? 'font-mono' : ''}
              ${col.key === 'platform' ? 'sticky left-0 z-0' : ''}
              ${isEven ? 'bg-gray-800/30' : 'bg-brand-navy-950'}
            `}
          >
            {value}
          </td>
        );
      })}
    </tr>
  );
};

export default MediaPlanRow;
