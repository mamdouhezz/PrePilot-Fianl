import React, { useState } from 'react';
import Icon from '../ui/Icon';
import { 
  FiHome, 
  FiShare2, 
  FiCpu, 
  FiDownload, 
  FiPrinter, 
  FiFileText, 
  FiFile, 
  FiImage,
  FiTarget,
  FiTrendingUp,
  FiBarChart,
  FiUsers,
  FiMoreVertical,
  FiChevronUp,
  FiMenu
} from 'react-icons/fi';
import { Page } from '../../types';
import { IconType } from 'react-icons';

interface ReportBottomBarProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  onExport?: (format: string) => void;
  onPrint?: () => void;
  activeSection?: string;
  onSectionClick?: (sectionId: string) => void;
}

// Report sections for mobile (simplified)
const reportSections = [
  { id: 'strategic-summary', icon: FiTarget, label: 'الملخص' },
  { id: 'kpi-snippets', icon: FiTrendingUp, label: 'المؤشرات' },
  { id: 'media-plan', icon: FiBarChart, label: 'الخطة' },
  { id: 'growth-funnel', icon: FiUsers, label: 'النمو' },
];

// Export formats for mobile
const exportFormats = [
  { id: 'pdf', icon: FiFileText, label: 'PDF' },
  { id: 'xls', icon: FiFile, label: 'Excel' },
  { id: 'png', icon: FiImage, label: 'صورة' },
];

// Bottom bar item component
const BottomBarItem: React.FC<{
  icon: IconType;
  label: string;
  isActive: boolean;
  onClick: () => void;
  variant?: 'nav' | 'section' | 'export';
  size?: 'sm' | 'md';
}> = ({ icon, label, isActive, onClick, variant = 'nav', size = 'md' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'section':
        return isActive 
          ? 'text-prepilot-purple-400 bg-prepilot-purple-400/10' 
          : 'text-gray-400 hover:text-prepilot-purple-300';
      case 'export':
        return 'text-gray-400 hover:text-green-400';
      default:
        return isActive 
          ? 'text-prepilot-purple-400' 
          : 'text-gray-400 hover:text-white';
    }
  };

  const getSizeStyles = () => {
    return size === 'sm' 
      ? 'p-1 min-h-[50px]' 
      : 'p-2 min-h-[60px]';
  };

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center ${getSizeStyles()} touch-target transition-all duration-200 relative group ${getVariantStyles()}`}
      aria-label={label}
    >
      <div className={`${size === 'sm' ? 'p-1.5' : 'p-2'} rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-prepilot-purple-400/20 scale-110' 
          : 'group-hover:bg-gray-600/30 group-hover:scale-105'
      }`}>
        <Icon as={icon} size={size === 'sm' ? 16 : 20} />
      </div>
      <span className={`${size === 'sm' ? 'text-xs' : 'text-xs'} mt-1 font-medium leading-tight text-center`}>
        {label}
      </span>
      {isActive && variant === 'nav' && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-prepilot-purple-400 rounded-full"></div>
      )}
      {isActive && variant === 'section' && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-prepilot-purple-400 rounded-full"></div>
      )}
    </button>
  );
};

// Expandable sections component
const ExpandableSections: React.FC<{
  activeSection?: string;
  onSectionClick?: (sectionId: string) => void;
}> = ({ activeSection, onSectionClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSectionClick = (sectionId: string) => {
    if (onSectionClick) {
      onSectionClick(sectionId);
    }
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="flex flex-col items-center justify-center p-2 min-h-[60px] touch-target transition-all duration-200 text-gray-400 hover:text-white"
        aria-label="أقسام التقرير"
      >
        <div className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-600/30">
          <Icon as={FiMenu} size={20} />
        </div>
        <span className="text-xs mt-1 font-medium">أقسام</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 left-0 right-0 bg-gray-900 border-t border-gray-700 shadow-2xl z-40">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">أقسام التقرير</h3>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 rounded text-gray-400 hover:text-white"
          >
            <Icon as={FiChevronUp} size={16} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {reportSections.map((section) => (
            <BottomBarItem
              key={section.id}
              icon={section.icon}
              label={section.label}
              isActive={activeSection === section.id}
              onClick={() => handleSectionClick(section.id)}
              variant="section"
              size="sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Expandable export component
const ExpandableExport: React.FC<{
  onExport?: (format: string) => void;
  onPrint?: () => void;
}> = ({ onExport, onPrint }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExport = (format: string) => {
    if (onExport) {
      onExport(format);
    }
    setIsExpanded(false);
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    }
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="flex flex-col items-center justify-center p-2 min-h-[60px] touch-target transition-all duration-200 text-gray-400 hover:text-green-400"
        aria-label="التصدير"
      >
        <div className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-600/30">
          <Icon as={FiDownload} size={20} />
        </div>
        <span className="text-xs mt-1 font-medium">تصدير</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 left-0 right-0 bg-gray-900 border-t border-gray-700 shadow-2xl z-40">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">خيارات التصدير</h3>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 rounded text-gray-400 hover:text-white"
          >
            <Icon as={FiChevronUp} size={16} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {exportFormats.map((format) => (
            <BottomBarItem
              key={format.id}
              icon={format.icon}
              label={format.label}
              isActive={false}
              onClick={() => handleExport(format.id)}
              variant="export"
              size="sm"
            />
          ))}
          <BottomBarItem
            icon={FiPrinter}
            label="طباعة"
            isActive={false}
            onClick={handlePrint}
            variant="export"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

// Main ReportBottomBar component
const ReportBottomBar: React.FC<ReportBottomBarProps> = ({ 
  currentPage, 
  navigateTo, 
  onExport,
  onPrint,
  activeSection,
  onSectionClick
}) => {
  const handleNavClick = (page: Page) => {
    navigateTo(page);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-gray-900 to-gray-800 border-t border-gray-700/50 lg:hidden safe-area-bottom shadow-2xl">
        <div className="flex justify-between items-center px-1">
          {/* Navigation Items - 3 main items */}
          <div className="flex-1 flex justify-around">
            <BottomBarItem
              label="الرئيسية"
              icon={FiHome}
              isActive={currentPage === 'home'}
              onClick={() => handleNavClick('home')}
            />
            
            <BottomBarItem
              label="التصدير"
              icon={FiShare2}
              isActive={currentPage === 'export-center'}
              onClick={() => handleNavClick('export-center')}
            />
            
            <BottomBarItem
              label="Playground"
              icon={FiCpu}
              isActive={currentPage === 'playground' || currentPage === 'processing' || currentPage === 'results-dashboard'}
              onClick={() => handleNavClick('playground')}
            />
          </div>
          
          {/* Divider */}
          <div className="w-px h-12 bg-gray-600 mx-1"></div>
          
          {/* Action Items - 2 items */}
          <div className="flex-1 flex justify-around">
            {/* Expandable Sections */}
            <ExpandableSections
              activeSection={activeSection}
              onSectionClick={onSectionClick}
            />
            
            {/* Expandable Export */}
            <ExpandableExport
              onExport={onExport}
              onPrint={onPrint}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportBottomBar;