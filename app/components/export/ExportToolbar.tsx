import React from 'react';
import { CampaignReport } from '../../types';
import { ExportableSection, ExportFormat, TaskPriority } from '../../types/export';
import { useExportStore } from '../../stores/exportStore';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { FiDownload } from 'react-icons/fi';
import { getAvailableFormatsForSection } from '../../services/export/exportManager';
import { exportSection } from '../../services/export/exportManager';
import { QuickShareButton } from '../social';

interface ExportToolbarProps {
  sectionId: ExportableSection;
  report: CampaignReport;
  elementRef?: React.RefObject<HTMLElement>;
}

const ExportToolbar: React.FC<ExportToolbarProps> = ({ sectionId, report, elementRef }) => {
    const { addToQueue } = useExportStore();
    const availableFormats = getAvailableFormatsForSection(sectionId);

    const handleExport = async (format: ExportFormat) => {
        try {
            // First add to queue for UI feedback
            const taskId = addToQueue({
                reportId: report.traceId,
                reportTitle: report.narrative.substring(0, 50),
                section: sectionId,
                format: format,
                priority: TaskPriority.Normal,
            });

            // Then perform actual export
            const result = await exportSection({
                section: sectionId,
                format: format,
                report: report,
                element: elementRef?.current || undefined,
                includeTimestamp: true,
            });

            if (result.success) {
                // Show success message
                alert(result.message);
            } else {
                // Show error message
                alert(result.message);
            }
        } catch (error) {
            console.error('Export failed:', error);
            alert('حدث خطأ أثناء التصدير. يرجى المحاولة مرة أخرى.');
        }
    };

    return (
        <div className="flex items-center gap-2 export-toolbar">
            <span className="text-sm font-medium text-gray-400">تصدير:</span>
            {availableFormats.map((format) => (
                 <Button 
                    key={format}
                    variant="secondary" 
                    size="sm" 
                    onClick={() => handleExport(format)}
                    leftIcon={<Icon as={FiDownload} size={14} />}
                 >
                    {format.toUpperCase()}
                 </Button>
            ))}
            <div className="border-l border-gray-600 h-6 mx-2"></div>
            <QuickShareButton
                report={report}
                sectionId={sectionId}
                variant="ghost"
                size="sm"
            />
        </div>
    );
};

export default ExportToolbar;