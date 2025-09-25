import React from 'react';
import { ColumnConfig } from '../../types/media-plan';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Icon from '../ui/Icon';

interface MediaPlanHeaderProps {
  columns: ColumnConfig[];
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (columnKey: string) => void;
}

const MediaPlanHeader: React.FC<MediaPlanHeaderProps> = ({ columns, sortColumn, sortDirection, onSort }) => {
  return (
    <thead className="bg-gray-800/50">
      <tr>
        {columns.map((col) => (
          <th
            key={col.key}
            scope="col"
            className={`px-4 py-3 text-sm font-bold text-gray-400 uppercase tracking-wider
              ${col.key === 'platform' ? 'sticky left-0 bg-gray-800/80 backdrop-blur-sm z-10' : ''}
              ${col.sortable ? 'cursor-pointer hover:bg-gray-700/50' : ''}`
            }
            onClick={() => col.sortable && onSort(col.key)}
            aria-sort={sortColumn === col.key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
          >
            <div className="flex items-center gap-2">
              <span>{col.label}</span>
              {col.sortable && sortColumn === col.key && (
                <Icon as={sortDirection === 'asc' ? FiChevronUp : FiChevronDown} size={16} />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default MediaPlanHeader;
