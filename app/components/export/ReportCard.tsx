import React from 'react';
import { useExportStore } from '../../stores/exportStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { FiArchive, FiDownload, FiEdit, FiBookmark } from 'react-icons/fi';
import { ExportFormat, Report, SocialPlatform, TaskPriority } from '../../types/export';
import { SocialPlatformId } from '../../types';
import { PLATFORM_INFO } from '../../constants.ts';
import Tooltip from '../ui/Tooltip';

const ReportCard: React.FC<{ report: Report }> = ({ report }) => {
    const { addToQueue, togglePinReport, archiveReport } = useExportStore();
    
    const handleExport = async (format: ExportFormat) => {
        try {
            // First add to queue for UI feedback
            addToQueue({
                reportId: report.id,
                reportTitle: report.title,
                section: 'full-report',
                format,
                priority: TaskPriority.Normal,
            });

            // Import and use the actual export function
            const { exportSection } = await import('../../services/export/exportManager');
            
            // Create a mock report object for export
            const mockReport = {
                industry: 'تجارة إلكترونية', // Default industry
                narrative: report.title,
                kpis: {
                    totals: {
                        budget: report.budget || 0,
                        impressions: 0,
                        clicks: 0,
                        ctr: 0,
                        cpc: 0,
                        conversions: 0,
                        cvr: 0,
                        revenue: 0,
                        roas: 0,
                        arpu: 0,
                        cac: 0,
                        cpa: 0,
                        breakEvenRoas: 0,
                    },
                    perPlatform: {}
                },
                budgetAllocation: {},
                recommendations: [report.description || 'تقرير مخصص من PrePilot']
            };

            const result = await exportSection({
                section: 'full-report',
                format: format,
                report: mockReport as any,
                includeTimestamp: true,
            });

            if (result.success) {
                alert(result.message);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Export failed:', error);
            alert('حدث خطأ أثناء التصدير. يرجى المحاولة مرة أخرى.');
        }
    };

    return (
        <Card className={`flex flex-col border-2 ${report.isPinned ? 'border-prepilot-purple-500/50' : 'border-gray-700'} h-full`}>
            <CardHeader className="p-4 sm:p-6">
                <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-sm sm:text-base lg:text-lg font-bold text-white line-clamp-2 flex-1">
                        {report.title}
                    </CardTitle>
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <Tooltip text="تعديل">
                            <Button variant="ghost" size="sm" className="!p-2 h-auto touch-target">
                                <Icon as={FiEdit} size={14} className="sm:w-4 sm:h-4"/>
                            </Button>
                        </Tooltip>
                        <Tooltip text={report.isPinned ? 'إلغاء التثبيت' : 'تثبيت'}>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => togglePinReport(report.id)} 
                                className="!p-2 h-auto touch-target"
                            >
                                <Icon as={FiBookmark} size={14} className={`sm:w-4 sm:h-4 ${report.isPinned ? 'text-yellow-400 fill-current' : ''}`}/>
                            </Button>
                        </Tooltip>
                    </div>
                </div>
                <CardDescription className="text-xs sm:text-sm text-gray-400 mt-2 line-clamp-2">
                    {report.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-4 sm:p-6">
                 <div className="text-xs sm:text-sm text-gray-400 space-y-2 sm:space-y-3">
                    <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <strong className="text-gray-300">الميزانية:</strong> 
                        <span className="font-mono text-white text-sm sm:text-base">
                            {report.budget?.toLocaleString('ar-SA')} ريال
                        </span>
                    </p>
                     <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <strong className="text-gray-300">المنصات:</strong>
                        <div className="flex items-center gap-2 flex-wrap">
                            {report.platforms?.map(p => {
                                const platformInfo = PLATFORM_INFO[p as SocialPlatformId];
                                if (!platformInfo) return null;
                                return (
                                    <Tooltip text={platformInfo.name} key={p}>
                                        <Icon as={platformInfo.icon} size={16} style={{color: platformInfo.color}} />
                                    </Tooltip>
                                )
                            })}
                        </div>
                    </div>
                    {report.tags && report.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 sm:gap-2 pt-2">
                            {report.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 text-xs rounded-full bg-prepilot-purple-950 text-prepilot-purple-300 border border-prepilot-purple-800">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
            <div className="p-4 sm:p-6 border-t border-gray-700 mt-auto">
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                    <div className="flex items-center gap-2 flex-1 sm:flex-none">
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={() => handleExport('xls')} 
                            leftIcon={<Icon as={FiDownload} size={14}/>}
                            className="flex-1 sm:flex-none touch-target"
                        >
                            <span className="text-xs sm:text-sm">XLS</span>
                        </Button>
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={() => handleExport('pdf')} 
                            leftIcon={<Icon as={FiDownload} size={14}/>}
                            className="flex-1 sm:flex-none touch-target"
                        >
                            <span className="text-xs sm:text-sm">PDF</span>
                        </Button>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-400 hover:text-white touch-target flex-1 sm:flex-none" 
                        onClick={() => archiveReport(report.id)} 
                        leftIcon={<Icon as={FiArchive} size={14}/>}
                    >
                        <span className="text-xs sm:text-sm">أرشفة</span>
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export default ReportCard;