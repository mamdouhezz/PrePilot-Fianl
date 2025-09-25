import React, { useMemo } from 'react';
import { CampaignReport } from '../../types';
import { selectKpisForDisplay } from '../../engine/kpi/kpiCalculator';
import KpiCard from './KpiCard';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { FiDownload } from 'react-icons/fi';
import { exportKpisToCsv } from '../../services/export/csvExporter';

interface KPISnippetsProps {
  report: CampaignReport;
}

const KPISnippets: React.FC<KPISnippetsProps> = ({ report }) => {
  const kpisToDisplay = useMemo(() => selectKpisForDisplay(report), [report]);

  const handleExport = () => {
    exportKpisToCsv(kpisToDisplay, `kpi-summary-${report.traceId}`);
  };

  return (
    <section aria-labelledby="kpi-snippets-title">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 id="kpi-snippets-title" className="heading-responsive text-white">
          المؤشرات الرئيسية المتوقعة
        </h2>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={handleExport} 
          leftIcon={<Icon as={FiDownload} size={16} />}
          className="touch-target w-full sm:w-auto"
        >
          <span className="text-xs sm:text-sm">تصدير (CSV)</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {kpisToDisplay.map((kpi) => (
          <KpiCard
            key={kpi.id}
            icon={kpi.icon}
            label={kpi.label}
            value={kpi.value}
            tooltip={kpi.tooltip}
          />
        ))}
      </div>
    </section>
  );
};

export default KPISnippets;