import React from 'react';
import { useExportStore } from '../../stores/exportStore';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Icon from '../ui/Icon';
import { FiDownload, FiFile, FiCalendar, FiTrash2 } from 'react-icons/fi';
import { Button } from '../ui/Button';

const ExportHistoryItem: React.FC<{ 
  item: {
    id: string;
    reportId: string;
    reportTitle: string;
    section: string;
    format: string;
    filename: string;
    downloadedAt: string;
    fileSize?: number;
  }
}> = ({ item }) => {
  const formatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf': return FiFile;
      case 'png': return FiFile;
      case 'xls': return FiFile;
      case 'csv': return FiFile;
      case 'json': return FiFile;
      default: return FiFile;
    }
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return 'غير محدد';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-800/70 transition-colors">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-prepilot-purple-600/20 rounded-lg">
          <Icon as={formatIcon(item.format)} size={20} className="text-prepilot-purple-400" />
        </div>
        
        <div className="flex-grow">
          <h4 className="font-semibold text-white text-sm">{item.reportTitle}</h4>
          <p className="text-xs text-gray-400">
            {getSectionName(item.section)} • {item.format.toUpperCase()}
          </p>
          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Icon as={FiCalendar} size={12} />
              {formatDate(item.downloadedAt)}
            </span>
            <span>{formatSize(item.fileSize)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Icon as={FiDownload} size={14} />}
          onClick={() => {
            // In a real app, this would re-download the file
            console.log('Re-downloading:', item.filename);
          }}
        >
          إعادة تحميل
        </Button>
      </div>
    </div>
  );
};

const ExportHistory: React.FC = () => {
  const exportHistory = useExportStore(state => state.exportHistory);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon as={FiFile} size={20} />
          تاريخ التصدير
        </CardTitle>
      </CardHeader>
      <CardContent>
        {exportHistory.length > 0 ? (
          <div className="space-y-3">
            {exportHistory.map(item => (
              <ExportHistoryItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <Icon as={FiFile} size={48} className="mx-auto mb-4 opacity-50" />
            <p>لا يوجد ملفات مصدرة بعد</p>
            <p className="text-sm mt-1">ستظهر ملفاتك المصدرة هنا</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExportHistory;