import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { ReportList, PublishingHub, WorkflowQueuePanel } from '../../components/export';
import ExportHistory from '../../components/export/ExportHistory';
import BulkExportPanel from '../../components/export/BulkExportPanel';
import { useExportStore } from '../../stores/exportStore';
import Icon from '../../components/ui/Icon';
import { FiFileText, FiShare2, FiGitPullRequest, FiClock, FiDownload } from 'react-icons/fi';
import { Page } from '../../types';

interface ExportCenterPageProps {
    onNavigateToNewPlan: () => void;
}

const ExportCenterPage: React.FC<ExportCenterPageProps> = ({ onNavigateToNewPlan }) => {
    const queueCount = useExportStore(state => state.exportQueue.filter(t => t.status === 'pending' || t.status === 'processing').length);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="text-center sm:text-right">
                <h1 className="heading-responsive text-white mb-2 sm:mb-4">
                    مركز التصدير والنشر
                </h1>
                <p className="body-responsive text-gray-400 max-w-2xl mx-auto sm:mx-0">
                    "لا تخمن، Just ڤايب" - قم بإدارة وتصدير ومشاركة خططك الإعلانية الذكية من هنا.
                </p>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="reports" className="w-full">
                <div className="overflow-x-auto">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 p-1 bg-gray-800 rounded-lg">
                        <TabsTrigger value="reports" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                            <Icon as={FiFileText} size={16} className="sm:ml-2"/>
                            <span className="hidden sm:inline">التقارير</span>
                            <span className="sm:hidden">التقارير</span>
                        </TabsTrigger>
                        <TabsTrigger value="bulk-export" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                            <Icon as={FiDownload} size={16} className="sm:ml-2"/>
                            <span className="hidden sm:inline">التصدير المجمع</span>
                            <span className="sm:hidden">مجمع</span>
                        </TabsTrigger>
                        <TabsTrigger value="publishing" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                            <Icon as={FiShare2} size={16} className="sm:ml-2"/>
                            <span className="hidden sm:inline">محور النشر</span>
                            <span className="sm:hidden">النشر</span>
                        </TabsTrigger>
                        <TabsTrigger value="history" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                            <Icon as={FiClock} size={16} className="sm:ml-2"/>
                            <span className="hidden sm:inline">التاريخ</span>
                            <span className="sm:hidden">التاريخ</span>
                        </TabsTrigger>
                        <TabsTrigger value="workflow" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                            <Icon as={FiGitPullRequest} size={16} className="sm:ml-2"/>
                            <span className="hidden sm:inline">سير العمل</span>
                            <span className="sm:hidden">سير العمل</span>
                            {queueCount > 0 && (
                                <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 text-xs font-bold text-white rounded-full bg-prepilot-purple-600 animate-pulse">
                                    {queueCount}
                                </span>
                            )}
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="reports">
                    <ReportList onNavigateToNewPlan={onNavigateToNewPlan} />
                </TabsContent>
                <TabsContent value="bulk-export">
                    <BulkExportPanel />
                </TabsContent>
                <TabsContent value="publishing">
                    <PublishingHub />
                </TabsContent>
                <TabsContent value="history">
                    <ExportHistory />
                </TabsContent>
                <TabsContent value="workflow">
                    <WorkflowQueuePanel />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ExportCenterPage;