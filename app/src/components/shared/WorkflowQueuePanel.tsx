import React from 'react';
import { useExportStore } from '../../stores/exportStore';
import { WorkflowTask, TaskStatus, TaskPriority } from '../../types/export';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { STATUS_STYLES, PRIORITY_STYLES } from '../../constants';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { FiRefreshCw, FiXCircle, FiDownload } from 'react-icons/fi';

const TaskCard: React.FC<{ task: WorkflowTask }> = ({ task }) => {
    const { retryTask, cancelTask } = useExportStore();
    const statusStyle = STATUS_STYLES[task.status as keyof typeof STATUS_STYLES];
    const priorityStyle = PRIORITY_STYLES[task.priority as keyof typeof PRIORITY_STYLES];

    const getSectionName = (section: string) => {
        const sections: Record<string, string> = {
            'strategic-summary': 'الملخص الاستراتيجي',
            'kpi-snippets': 'مؤشرات الأداء الرئيسية',
            'media-plan': 'الخطة الإعلامية',
            'growth-funnel': 'قمع النمو',
            'beyond-kpis': 'ما وراء مؤشرات الأداء',
            'beyond-budget': 'ما وراء توزيع الميزانية',
            'advanced-recommendations': 'التوصيات المتقدمة',
            'full-report': 'التقرير الكامل',
        };
        return sections[section] || section;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ar-SA', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleDownload = () => {
        if (task.resultUrl) {
            // In a real app, this would trigger the actual download
            console.log('Downloading:', task.resultUrl);
            // For now, we'll show an alert
            alert(`تحميل الملف: ${task.resultUrl}`);
        }
    };

    return (
        <div className="p-3 sm:p-4 bg-gray-800 rounded-lg hover:bg-gray-800/70 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-grow min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <p className="font-bold text-white text-sm truncate">{task.reportTitle}</p>
                        <span className="text-xs text-gray-500">{formatDate(task.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                        {getSectionName(task.section)} • <span className="font-semibold uppercase text-prepilot-purple-400">{task.format}</span>
                    </p>
                    
                    {task.resultMessage && (
                        <p className="text-xs text-green-400 mb-2 break-words">{task.resultMessage}</p>
                    )}
                    
                    {task.error && (
                        <p className="text-xs text-red-400 mb-2 break-words">{task.error}</p>
                    )}
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs">
                         <span className={`px-2 py-1 rounded-md ${statusStyle.bgColor} ${statusStyle.color}`}>
                             {statusStyle.text}
                         </span>
                         <span className={priorityStyle.color}>الأولوية: {priorityStyle.text}</span>
                         {task.attempts > 0 && (
                             <span className="text-gray-500">المحاولة: {task.attempts}</span>
                         )}
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-col items-stretch sm:items-end gap-2">
                     {task.status === 'processing' && (
                         <div className="w-full sm:w-32 bg-gray-700 rounded-full h-2">
                            <div className="bg-prepilot-purple-600 h-2 rounded-full transition-all duration-300" 
                                 style={{ width: `${task.progress}%` }}></div>
                        </div>
                     )}
                     
                     {task.status === 'completed' && task.resultUrl && (
                         <Button 
                             size="sm" 
                             variant="primary" 
                             onClick={handleDownload}
                             leftIcon={<Icon as={FiDownload} size={14}/>}
                             className="touch-target w-full sm:w-auto"
                         >
                             <span className="text-xs">تحميل</span>
                         </Button>
                     )}
                 
                 {task.status === 'failed' && (
                     <Button 
                         size="sm" 
                         variant="secondary" 
                         onClick={() => retryTask(task.id)} 
                         leftIcon={<Icon as={FiRefreshCw} size={14}/>}
                         className="touch-target w-full sm:w-auto"
                     >
                         <span className="text-xs">إعادة المحاولة</span>
                     </Button>
                 )}
                  
                 {(task.status === 'pending' || task.status === 'processing') && (
                     <Button 
                         size="sm" 
                         variant="ghost" 
                         className="text-red-400 hover:bg-red-900/50 hover:text-red-300 touch-target w-full sm:w-auto" 
                         onClick={() => cancelTask(task.id)} 
                         leftIcon={<Icon as={FiXCircle} size={14}/>}
                     >
                         <span className="text-xs">إلغاء</span>
                     </Button>
                 )}
                </div>
            </div>
        </div>
    );
};

const WorkflowQueuePanel: React.FC = () => {
    const exportQueue = useExportStore(state => state.exportQueue);
    const clearOldTasks = useExportStore(state => state.clearOldTasks);
    
    const activeTasks = exportQueue.filter(t => t.status === 'pending' || t.status === 'processing');
    const completedTasks = exportQueue.filter(t => t.status === 'completed').slice(0, 10); // Show only last 10 completed
    const failedTasks = exportQueue.filter(t => t.status === 'failed').slice(0, 5); // Show only last 5 failed
    const cancelledTasks = exportQueue.filter(t => t.status === 'cancelled').slice(0, 5); // Show only last 5 cancelled

    return (
        <div className="space-y-6">
            {/* Active Tasks */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>المهام النشطة</span>
                        {activeTasks.length > 0 && (
                            <span className="text-sm font-normal text-prepilot-purple-400">
                                {activeTasks.length} مهمة نشطة
                            </span>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {activeTasks.length > 0 ? (
                        <div className="space-y-3">
                            {activeTasks.map(task => <TaskCard key={task.id} task={task} />)}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <p>لا توجد مهام نشطة حالياً</p>
                            <p className="text-sm mt-1">ستظهر المهام الجديدة هنا عند بدء التصدير</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>المهام المكتملة</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-normal text-green-400">
                                    {completedTasks.length} مكتملة
                                </span>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={clearOldTasks}
                                    className="text-xs"
                                >
                                    مسح القديمة
                                </Button>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {completedTasks.map(task => <TaskCard key={task.id} task={task} />)}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Failed Tasks */}
            {failedTasks.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>المهام الفاشلة</span>
                            <span className="text-sm font-normal text-red-400">
                                {failedTasks.length} فاشلة
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {failedTasks.map(task => <TaskCard key={task.id} task={task} />)}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Cancelled Tasks */}
            {cancelledTasks.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>المهام الملغاة</span>
                            <span className="text-sm font-normal text-gray-400">
                                {cancelledTasks.length} ملغاة
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {cancelledTasks.map(task => <TaskCard key={task.id} task={task} />)}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Empty State */}
            {exportQueue.length === 0 && (
                <Card>
                    <CardContent className="text-center py-12">
                        <div className="text-gray-400">
                            <p className="text-lg mb-2">لا توجد مهام بعد</p>
                            <p className="text-sm">ابدأ بإنشاء تقرير جديد أو استخدم التصدير المجمع</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default WorkflowQueuePanel;
