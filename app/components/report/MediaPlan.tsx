import React, { useState, useMemo } from 'react';
import { CampaignReport, KpiSet } from '../../types';
import { ColumnConfig, PlatformKPIs } from '../../types/media-plan';
import {
  selectColumns,
  calculatePlatformData,
  getVisibleColumns,
  sortData,
  formatKPIValue,
} from '../../engine/mediaPlan/mediaPlanLogic';
import MediaPlanHeader from './MediaPlanHeader';
import MediaPlanRow from './MediaPlanRow';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { FiSearch, FiEye, FiEyeOff, FiChevronDown } from 'react-icons/fi';
import ExportToolbar from './ExportToolbar';

// Mobile-specific accordion row
const MobileAccordionRow: React.FC<{ platformData: PlatformKPIs, columns: ColumnConfig[] }> = ({ platformData, columns }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 last:border-b-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between p-3 sm:p-4 text-start touch-target hover:bg-gray-800/30 transition-colors"
        aria-expanded={isOpen}
        aria-controls={`mobile-accordion-${platformData.platform}`}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <Icon as={platformData.icon} size={20} className="sm:w-6 sm:h-6 flex-shrink-0" style={{ color: platformData.color }} />
          <span className="font-bold text-base sm:text-lg text-white truncate">{platformData.name}</span>
        </div>
        <Icon 
          as={FiChevronDown} 
          className={`transform transition-transform text-gray-400 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
          size={20}
        />
      </button>
      {isOpen && (
        <div 
          id={`mobile-accordion-${platformData.platform}`}
          className="p-3 sm:p-4 bg-gray-800/50"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-6 text-sm">
            {columns.filter(c => c.key !== 'platform').map(col => (
              <div key={col.key} className="space-y-1">
                <p className="text-gray-400 text-xs sm:text-sm">{col.label}</p>
                <p className="font-bold text-white font-mono text-sm sm:text-base break-words">
                  {col.key === 'budget' ? formatKPIValue(platformData.budget, col.type) :
                   col.key === 'percentage' ? formatKPIValue(platformData.percentage, col.type) :
                   formatKPIValue(platformData.kpis[col.key as keyof KpiSet], col.type)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


const MediaPlan: React.FC<{ report: CampaignReport }> = ({ report }) => {
  const [sortColumn, setSortColumn] = useState<string | null>('budget');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const tableRef = React.useRef<HTMLDivElement>(null);

  const allColumns = useMemo(() => selectColumns(report), [report]);
  const platformData = useMemo(() => calculatePlatformData(report), [report]);
  const visibleColumns = useMemo(() => getVisibleColumns(allColumns, showAdvanced), [allColumns, showAdvanced]);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedData = useMemo(() => {
    const filtered = platformData.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return sortData(filtered, sortColumn as any, sortDirection);
  }, [platformData, searchTerm, sortColumn, sortDirection]);

  return (
    <Card>
      <CardHeader>
        <div className="space-y-4">
            <div>
                <CardTitle className="heading-responsive text-white">الخطة الإعلامية التفصيلية</CardTitle>
                <CardDescription className="body-responsive text-gray-400 mt-2">
                    تحليل الأداء المتوقع لكل منصة بناءً على الميزانية المخصصة.
                </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1 sm:flex-none">
                    <Icon as={FiSearch} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="ابحث عن منصة..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-lg ps-10 pe-3 py-2 text-sm w-full sm:w-48 touch-target"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => setShowAdvanced(!showAdvanced)} 
                        leftIcon={<Icon as={showAdvanced ? FiEyeOff : FiEye} size={16} />}
                        className="touch-target flex-1 sm:flex-none"
                    >
                        <span className="text-xs sm:text-sm">{showAdvanced ? 'إخفاء' : 'إظهار'} الكل</span>
                    </Button>
                    <ExportToolbar section="media-plan" report={report} elementRef={tableRef} />
                </div>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto" ref={tableRef}>
          <table className="min-w-full divide-y divide-gray-700">
            <MediaPlanHeader
              columns={visibleColumns}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
            <tbody className="divide-y divide-gray-800">
              {filteredAndSortedData.map((pData, index) => (
                <MediaPlanRow
                  key={pData.platform}
                  platformData={pData}
                  columns={visibleColumns}
                  isEven={index % 2 === 0}
                />
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Accordion View */}
        <div className="block lg:hidden">
            <div className="border border-gray-700 rounded-lg overflow-hidden">
                {filteredAndSortedData.map(pData => (
                    <MobileAccordionRow key={pData.platform} platformData={pData} columns={visibleColumns} />
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaPlan;