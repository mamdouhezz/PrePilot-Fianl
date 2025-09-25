import React, { useState, useEffect } from 'react';
import Icon from '../ui/Icon';
import { 
  FiHome, 
  FiShare2, 
  FiCpu, 
  FiSettings, 
  FiLifeBuoy, 
  FiDownload, 
  FiPrinter, 
  FiFileText, 
  FiFile, 
  FiImage,
  FiTarget, 
  FiTrendingUp, 
  FiBarChart, 
  FiDollarSign, 
  FiUsers, 
  FiZap,
  FiChevronDown,
  FiChevronUp,
  FiBookmark,
  FiStar,
  FiClock,
  FiEye,
  FiEdit3,
  FiMoreVertical
} from 'react-icons/fi';
import { Page } from '../../types';
import { IconType } from 'react-icons';
import { Button } from '../ui/Button';

interface ReportSidebarProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  onExport?: (format: string) => void;
  onPrint?: () => void;
  activeSection?: string;
  onSectionClick?: (sectionId: string) => void;
}

// Report sections configuration with enhanced metadata
const reportSections = [
  { 
    id: 'strategic-summary', 
    label: 'الملخص الاستراتيجي', 
    icon: FiTarget,
    description: 'نظرة عامة وتوصيات رئيسية',
    estimatedTime: '2 دقائق',
    priority: 'high'
  },
  { 
    id: 'kpi-snippets', 
    label: 'المؤشرات الرئيسية', 
    icon: FiTrendingUp,
    description: 'مؤشرات الأداء الرئيسية',
    estimatedTime: '3 دقائق',
    priority: 'high'
  },
  { 
    id: 'media-plan', 
    label: 'الخطة الإعلامية', 
    icon: FiBarChart,
    description: 'توزيع الميزانية والمنصات',
    estimatedTime: '4 دقائق',
    priority: 'medium'
  },
  { 
    id: 'growth-funnel', 
    label: 'قمع النمو', 
    icon: FiUsers,
    description: 'مراحل تحويل العملاء',
    estimatedTime: '3 دقائق',
    priority: 'medium'
  },
  { 
    id: 'beyond-kpis', 
    label: 'ما وراء المؤشرات', 
    icon: FiZap,
    description: 'تحليل متقدم للمؤشرات',
    estimatedTime: '5 دقائق',
    priority: 'low'
  },
  { 
    id: 'beyond-budget', 
    label: 'ما وراء الميزانية', 
    icon: FiDollarSign,
    description: 'تحليل توزيع الميزانية',
    estimatedTime: '4 دقائق',
    priority: 'low'
  },
  { 
    id: 'advanced-recommendations', 
    label: 'التوصيات المتقدمة', 
    icon: FiSettings,
    description: 'توصيات ذكية للتحسين',
    estimatedTime: '6 دقائق',
    priority: 'medium'
  },
];

// Export formats configuration
const exportFormats = [
  { id: 'pdf', label: 'PDF', icon: FiFileText, description: 'تقرير كامل بصيغة PDF' },
  { id: 'xls', label: 'Excel', icon: FiFile, description: 'بيانات قابلة للتعديل' },
  { id: 'png', label: 'صورة', icon: FiImage, description: 'صورة عالية الجودة' },
];

// Navigation items
const navigationItems = [
  { id: 'home', label: 'الرئيسية', icon: FiHome, description: 'الصفحة الرئيسية' },
  { id: 'export-center', label: 'مركز التصدير', icon: FiShare2, description: 'إدارة التصدير' },
  { id: 'playground', label: 'Playground', icon: FiCpu, description: 'إنشاء حملات جديدة' },
];

// Section item component with enhanced design
const ReportSectionItem: React.FC<{
  section: typeof reportSections[0];
  isActive: boolean;
  onClick: () => void;
  isCollapsed?: boolean;
}> = ({ section, isActive, onClick, isCollapsed = false }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`group w-full flex items-center p-3 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
        isActive
          ? 'bg-gradient-to-r from-prepilot-purple-600/20 to-prepilot-purple-500/10 text-prepilot-purple-300 border border-prepilot-purple-500/30 shadow-lg shadow-prepilot-purple-500/10'
          : 'text-gray-400 hover:bg-gray-700/50 hover:text-white hover:shadow-md'
      }`}
    >
      <div className={`p-2 rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-prepilot-purple-500/20' : 'group-hover:bg-gray-600/30'
      }`}>
        <Icon as={section.icon} size={18} />
      </div>
      
      <div className="flex-1 text-right mr-3">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${getPriorityColor(section.priority)}`}>
            {section.priority === 'high' ? 'عالي' : section.priority === 'medium' ? 'متوسط' : 'منخفض'}
          </span>
          <span className="text-xs text-gray-500 flex items-center">
            <Icon as={FiClock} size={12} className="ml-1" />
            {section.estimatedTime}
          </span>
        </div>
        <h4 className="text-sm font-semibold mt-1">{section.label}</h4>
        {!isCollapsed && (
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{section.description}</p>
        )}
      </div>
      
      {isActive && (
        <div className="w-1 h-8 bg-gradient-to-b from-prepilot-purple-400 to-prepilot-purple-600 rounded-full"></div>
      )}
    </button>
  );
};

// Navigation item component
const NavigationItem: React.FC<{
  item: typeof navigationItems[0];
  isActive: boolean;
  onClick: () => void;
}> = ({ item, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 ${
        isActive
          ? 'bg-prepilot-purple-600 text-white shadow-lg'
          : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
      }`}
    >
      <div className={`p-2 rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-white/10' : ''
      }`}>
        <Icon as={item.icon} size={20} />
      </div>
      <div className="flex-1 text-right mr-3">
        <h4 className="text-sm font-semibold">{item.label}</h4>
        <p className="text-xs text-gray-500">{item.description}</p>
      </div>
    </button>
  );
};

// Export format item component
const ExportFormatItem: React.FC<{
  format: typeof exportFormats[0];
  onClick: () => void;
}> = ({ format, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center p-3 rounded-xl text-gray-400 hover:bg-gray-700/50 hover:text-white transition-all duration-200 group"
    >
      <div className="p-2 rounded-lg group-hover:bg-gray-600/30 transition-colors duration-200">
        <Icon as={format.icon} size={16} />
      </div>
      <div className="flex-1 text-right mr-3">
        <h4 className="text-sm font-semibold">{format.label}</h4>
        <p className="text-xs text-gray-500">{format.description}</p>
      </div>
    </button>
  );
};

// Main ReportSidebar component
const ReportSidebar: React.FC<ReportSidebarProps> = ({ 
  currentPage, 
  navigateTo, 
  onExport,
  onPrint,
  activeSection = 'strategic-summary',
  onSectionClick
}) => {
  const [isSectionsCollapsed, setIsSectionsCollapsed] = useState(false);
  const [isExportCollapsed, setIsExportCollapsed] = useState(false);
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false);

  const handleNavClick = (page: Page) => {
    navigateTo(page);
  };

  const handleExport = (format: string) => {
    if (onExport) {
      onExport(format);
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    }
  };

  const handleSectionClick = (sectionId: string) => {
    if (onSectionClick) {
      onSectionClick(sectionId);
    }
  };

  return (
    <aside className="hidden lg:flex flex-col w-80 bg-gradient-to-b from-gray-900 to-gray-800 border-l border-gray-700/50 shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">تقرير الحملة</h2>
            <p className="text-sm text-gray-400">تحليل شامل للأداء</p>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors">
              <Icon as={FiBookmark} size={16} />
            </button>
            <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors">
              <Icon as={FiStar} size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <div className="p-4 space-y-6">
          
          {/* Navigation Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">التنقل</h3>
              <button
                onClick={() => setIsNavigationCollapsed(!isNavigationCollapsed)}
                className="p-1 rounded text-gray-400 hover:text-white transition-colors"
              >
                <Icon as={isNavigationCollapsed ? FiChevronDown : FiChevronUp} size={16} />
              </button>
            </div>
            {!isNavigationCollapsed && (
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <NavigationItem
                    key={item.id}
                    item={item}
                    isActive={currentPage === item.id || (item.id === 'playground' && (currentPage === 'processing' || currentPage === 'results-dashboard'))}
                    onClick={() => handleNavClick(item.id as Page)}
                  />
                ))}
              </nav>
            )}
          </div>

          {/* Report Sections */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">أقسام التقرير</h3>
              <button
                onClick={() => setIsSectionsCollapsed(!isSectionsCollapsed)}
                className="p-1 rounded text-gray-400 hover:text-white transition-colors"
              >
                <Icon as={isSectionsCollapsed ? FiChevronDown : FiChevronUp} size={16} />
              </button>
            </div>
            {!isSectionsCollapsed && (
              <div className="space-y-2">
                {reportSections.map((section) => (
                  <ReportSectionItem
                    key={section.id}
                    section={section}
                    isActive={activeSection === section.id}
                    onClick={() => handleSectionClick(section.id)}
                    isCollapsed={isSectionsCollapsed}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Export Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">التصدير</h3>
              <button
                onClick={() => setIsExportCollapsed(!isExportCollapsed)}
                className="p-1 rounded text-gray-400 hover:text-white transition-colors"
              >
                <Icon as={isExportCollapsed ? FiChevronDown : FiChevronUp} size={16} />
              </button>
            </div>
            {!isExportCollapsed && (
              <div className="space-y-2">
                {exportFormats.map((format) => (
                  <ExportFormatItem
                    key={format.id}
                    format={format}
                    onClick={() => handleExport(format.id)}
                  />
                ))}
                <button
                  onClick={handlePrint}
                  className="w-full flex items-center p-3 rounded-xl text-gray-400 hover:bg-gray-700/50 hover:text-white transition-all duration-200 group"
                >
                  <div className="p-2 rounded-lg group-hover:bg-gray-600/30 transition-colors duration-200">
                    <Icon as={FiPrinter} size={16} />
                  </div>
                  <div className="flex-1 text-right mr-3">
                    <h4 className="text-sm font-semibold">طباعة</h4>
                    <p className="text-xs text-gray-500">طباعة التقرير مباشرة</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">إجراءات سريعة</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="text-xs py-2"
                leftIcon={<Icon as={FiEye} size={14} />}
              >
                معاينة
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="text-xs py-2"
                leftIcon={<Icon as={FiEdit3} size={14} />}
              >
                تعديل
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>آخر تحديث: الآن</span>
          <div className="flex items-center space-x-1 space-x-reverse">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>متصل</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ReportSidebar;