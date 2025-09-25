import React, { useState } from 'react';
import { useExportStore } from '../../stores/exportStore';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { FiDownload, FiCheck, FiX, FiSettings } from 'react-icons/fi';
import { ExportableSection, TaskFormat, TaskPriority } from '../../types/export';

const BulkExportPanel: React.FC = () => {
  const { reports, addToQueue } = useExportStore();
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [selectedSections, setSelectedSections] = useState<ExportableSection[]>(['full-report']);
  const [selectedFormats, setSelectedFormats] = useState<TaskFormat[]>(['pdf']);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.Normal);
  const [isExporting, setIsExporting] = useState(false);

  const availableSections: { value: ExportableSection; label: string }[] = [
    { value: 'strategic-summary', label: 'الملخص الاستراتيجي' },
    { value: 'kpi-snippets', label: 'مؤشرات الأداء الرئيسية' },
    { value: 'media-plan', label: 'الخطة الإعلامية' },
    { value: 'growth-funnel', label: 'قمع النمو' },
    { value: 'beyond-kpis', label: 'ما وراء مؤشرات الأداء' },
    { value: 'beyond-budget', label: 'ما وراء توزيع الميزانية' },
    { value: 'advanced-recommendations', label: 'التوصيات المتقدمة' },
    { value: 'full-report', label: 'التقرير الكامل' },
  ];

  const availableFormats: { value: TaskFormat; label: string }[] = [
    { value: 'pdf', label: 'PDF' },
    { value: 'png', label: 'PNG' },
    { value: 'xls', label: 'Excel' },
    { value: 'csv', label: 'CSV' },
    { value: 'json', label: 'JSON' },
  ];

  const priorityOptions: { value: TaskPriority; label: string }[] = [
    { value: TaskPriority.Low, label: 'منخفضة' },
    { value: TaskPriority.Normal, label: 'عادية' },
    { value: TaskPriority.High, label: 'عالية' },
    { value: TaskPriority.Urgent, label: 'عاجلة' },
  ];

  const toggleReport = (reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const toggleSection = (section: ExportableSection) => {
    setSelectedSections(prev => 
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleFormat = (format: TaskFormat) => {
    setSelectedFormats(prev => 
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  const selectAllReports = () => {
    setSelectedReports(reports.filter(r => !r.isArchived).map(r => r.id));
  };

  const clearAllReports = () => {
    setSelectedReports([]);
  };

  const handleBulkExport = async () => {
    if (selectedReports.length === 0 || selectedSections.length === 0 || selectedFormats.length === 0) {
      return;
    }

    setIsExporting(true);
    
    try {
      let taskCount = 0;
      
      for (const reportId of selectedReports) {
        const report = reports.find(r => r.id === reportId);
        if (!report) continue;
        
        for (const section of selectedSections) {
          for (const format of selectedFormats) {
            addToQueue({
              reportId: report.id,
              reportTitle: report.title,
              section,
              format,
              priority,
            });
            taskCount++;
          }
        }
      }
      
      // Reset selections
      setSelectedReports([]);
      setSelectedSections(['full-report']);
      setSelectedFormats(['pdf']);
      
      alert(`تم إضافة ${taskCount} مهمة تصدير إلى قائمة الانتظار`);
    } catch (error) {
      console.error('Bulk export failed:', error);
      alert('حدث خطأ أثناء إضافة مهام التصدير');
    } finally {
      setIsExporting(false);
    }
  };

  const totalTasks = selectedReports.length * selectedSections.length * selectedFormats.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon as={FiDownload} size={20} />
          <span className="heading-responsive text-white">التصدير المجمع</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Reports Selection */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <h3 className="subheading-responsive text-white">اختر التقارير</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={selectAllReports} className="touch-target">
                <Icon as={FiCheck} size={14} className="ml-1" />
                <span className="text-xs sm:text-sm">الكل</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={clearAllReports} className="touch-target">
                <Icon as={FiX} size={14} className="ml-1" />
                <span className="text-xs sm:text-sm">إلغاء الكل</span>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {reports.filter(r => !r.isArchived).map(report => (
              <label key={report.id} className="flex items-center gap-2 p-2 bg-gray-800/50 rounded cursor-pointer hover:bg-gray-800/70">
                <input
                  type="checkbox"
                  checked={selectedReports.includes(report.id)}
                  onChange={() => toggleReport(report.id)}
                  className="rounded"
                />
                <span className="text-sm text-gray-300 truncate">{report.title}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sections Selection */}
        <div>
          <h3 className="subheading-responsive text-white mb-3">اختر الأقسام</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {availableSections.map(section => (
              <label key={section.value} className="flex items-center gap-2 p-2 bg-gray-800/50 rounded cursor-pointer hover:bg-gray-800/70 touch-target">
                <input
                  type="checkbox"
                  checked={selectedSections.includes(section.value)}
                  onChange={() => toggleSection(section.value)}
                  className="rounded"
                />
                <span className="text-xs sm:text-sm text-gray-300">{section.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Formats Selection */}
        <div>
          <h3 className="subheading-responsive text-white mb-3">اختر الصيغ</h3>
          <div className="flex flex-wrap gap-2">
            {availableFormats.map(format => (
              <label key={format.value} className="flex items-center gap-2 p-2 bg-gray-800/50 rounded cursor-pointer hover:bg-gray-800/70 touch-target">
                <input
                  type="checkbox"
                  checked={selectedFormats.includes(format.value)}
                  onChange={() => toggleFormat(format.value)}
                  className="rounded"
                />
                <span className="text-sm text-gray-300">{format.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Priority Selection */}
        <div>
          <h3 className="subheading-responsive text-white mb-3">الأولوية</h3>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-300 touch-target text-sm sm:text-base"
          >
            {priorityOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Export Button */}
        <div className="pt-4 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-400 text-center sm:text-right">
              {totalTasks > 0 ? `سيتم إنشاء ${totalTasks} مهمة تصدير` : 'اختر التقارير والأقسام والصيغ'}
            </div>
            <Button
              variant="primary"
              onClick={handleBulkExport}
              disabled={totalTasks === 0 || isExporting}
              leftIcon={<Icon as={FiDownload} size={16} />}
              className="touch-target w-full sm:w-auto"
            >
              <span className="text-sm sm:text-base">
                {isExporting ? 'جاري الإضافة...' : 'بدء التصدير المجمع'}
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkExportPanel;
