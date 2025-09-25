import React from 'react';
import Icon from '../ui/Icon';
import { FiDownload, FiPrinter, FiFileText, FiFile, FiImage, FiShare2, FiMoreVertical } from 'react-icons/fi';
import { Button } from '../ui/Button';

interface ReportToolbarProps {
  onExport?: (format: string) => void;
  onPrint?: () => void;
  onShare?: () => void;
  className?: string;
}

const ReportToolbar: React.FC<ReportToolbarProps> = ({ 
  onExport, 
  onPrint, 
  onShare,
  className = '' 
}) => {
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

  const handleShare = () => {
    if (onShare) {
      onShare();
    }
  };

  return (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4 ${className}`}>
      {/* Desktop Toolbar */}
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-300">أدوات التقرير</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleExport('pdf')}
            leftIcon={<Icon as={FiFileText} size={16} />}
          >
            <span className="text-sm">PDF</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleExport('xls')}
            leftIcon={<Icon as={FiFile} size={16} />}
          >
            <span className="text-sm">Excel</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleExport('png')}
            leftIcon={<Icon as={FiImage} size={16} />}
          >
            <span className="text-sm">صورة</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Icon as={FiPrinter} size={16} />}
          >
            <span className="text-sm">طباعة</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            leftIcon={<Icon as={FiShare2} size={16} />}
          >
            <span className="text-sm">مشاركة</span>
          </Button>
        </div>
      </div>

      {/* Mobile Toolbar */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-300">أدوات التقرير</h3>
          <button className="p-1 text-gray-400 hover:text-white">
            <Icon as={FiMoreVertical} size={16} />
          </button>
        </div>
        
        {/* Primary Actions Row */}
        <div className="flex gap-2 mb-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleExport('pdf')}
            leftIcon={<Icon as={FiFileText} size={14} />}
            className="flex-1 touch-target"
          >
            <span className="text-xs">PDF</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Icon as={FiPrinter} size={14} />}
            className="flex-1 touch-target"
          >
            <span className="text-xs">طباعة</span>
          </Button>
        </div>
        
        {/* Secondary Actions Row */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleExport('xls')}
            leftIcon={<Icon as={FiFile} size={14} />}
            className="flex-1 touch-target"
          >
            <span className="text-xs">Excel</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleExport('png')}
            leftIcon={<Icon as={FiImage} size={14} />}
            className="flex-1 touch-target"
          >
            <span className="text-xs">صورة</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            leftIcon={<Icon as={FiShare2} size={14} />}
            className="flex-1 touch-target"
          >
            <span className="text-xs">مشاركة</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportToolbar;
