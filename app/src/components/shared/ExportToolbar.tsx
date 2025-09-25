import React from 'react';
import { CampaignReport } from '../../types';
import { ExportFormat } from '../../services/export/exportTypes';
import { exportToCSV } from '../../services/export/csvExporter';
import { exportToXLS } from '../../services/export/exportToXLS';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { FiDownload } from 'react-icons/fi';

interface ExportToolbarProps {
  section: string;
  report: CampaignReport;
  elementRef?: React.RefObject<HTMLElement>;
}

const ExportToolbar: React.FC<ExportToolbarProps> = ({ section, report, elementRef }) => {

  const handleExport = (format: 'XLS' | 'CSV') => {
    console.log(`Exporting ${section} as ${format}`, report);
    const options = {
        section: "media-plan",
        report,
        filename: `${report.industry}-media-plan`
    }
    if (format === 'XLS') {
      exportToXLS(options as any).catch(console.error);
    } else {
      exportToCSV(options as any).catch(console.error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" size="sm" onClick={() => handleExport('XLS')} leftIcon={<Icon as={FiDownload} />}>XLS</Button>
      <Button variant="secondary" size="sm" onClick={() => handleExport('CSV')} leftIcon={<Icon as={FiDownload} />}>CSV</Button>
    </div>
  );
};

export default ExportToolbar;