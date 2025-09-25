import React, { useState } from 'react';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { FiShare2, FiCopy, FiDownload } from 'react-icons/fi';
import { SOCIAL_PLATFORMS, generateSocialContent, shareToPlatform, copyToClipboard } from '../../services/social/socialSharingService';
import { CampaignReport } from '../../types';

interface QuickShareButtonProps {
  report: CampaignReport;
  sectionId: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const QuickShareButton: React.FC<QuickShareButtonProps> = ({ 
  report, 
  sectionId, 
  className = '',
  variant = 'secondary',
  size = 'sm'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' }>>([]);

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleQuickShare = async (platformId: string) => {
    setIsGenerating(true);
    try {
      const content = await generateSocialContent(report, sectionId, platformId);
      await shareToPlatform(content, platformId);
      showToast(`تم فتح نافذة المشاركة على ${SOCIAL_PLATFORMS.find(p => p.id === platformId)?.name}`, 'success');
    } catch (error) {
      console.error('Failed to share:', error);
      showToast('فشل في المشاركة', 'error');
    } finally {
      setIsGenerating(false);
      setIsOpen(false);
    }
  };

  const handleCopyAll = async () => {
    setIsGenerating(true);
    try {
      // Generate content for LinkedIn (usually the most comprehensive)
      const content = await generateSocialContent(report, sectionId, 'linkedin');
      const success = await copyToClipboard(content);
      showToast(success ? 'تم نسخ المحتوى بنجاح!' : 'فشل في النسخ', success ? 'success' : 'error');
    } catch (error) {
      console.error('Failed to copy:', error);
      showToast('فشل في النسخ', 'error');
    } finally {
      setIsGenerating(false);
      setIsOpen(false);
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      // Generate content for LinkedIn
      const content = await generateSocialContent(report, sectionId, 'linkedin');
      
      // Create a text file with the content
      const blob = new Blob([content.text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `PrePilot_${sectionId}_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast('تم تحميل الملف بنجاح!', 'success');
    } catch (error) {
      console.error('Failed to download:', error);
      showToast('فشل في التحميل', 'error');
    } finally {
      setIsGenerating(false);
      setIsOpen(false);
    }
  };

  if (isOpen) {
    return (
      <div className="relative">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
        
        {/* Dropdown */}
        <div className="absolute bottom-full left-0 mb-2 z-50 bg-gray-800 border border-gray-700 rounded-lg shadow-xl min-w-64">
          <div className="p-4">
            <div className="text-white font-medium mb-3">مشاركة سريعة</div>
            
            {/* Platform Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {SOCIAL_PLATFORMS.map(platform => (
                <button
                  key={platform.id}
                  onClick={() => handleQuickShare(platform.id)}
                  disabled={isGenerating}
                  className="flex items-center gap-2 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm transition-colors disabled:opacity-50"
                >
                  <span className="text-lg">{platform.icon}</span>
                  <span>{platform.name}</span>
                </button>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyAll}
                disabled={isGenerating}
                leftIcon={<Icon as={FiCopy} size={14} />}
                className="flex-1"
              >
                نسخ
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                disabled={isGenerating}
                leftIcon={<Icon as={FiDownload} size={14} />}
                className="flex-1"
              >
                تحميل
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(true)}
        disabled={isGenerating}
        leftIcon={<Icon as={FiShare2} size={16} />}
        className={className}
      >
        {isGenerating ? 'جاري التحميل...' : 'مشاركة سريعة'}
      </Button>
      
      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`p-3 rounded-lg shadow-lg ${
              toast.type === 'success' 
                ? 'bg-green-600 text-white' 
                : 'bg-red-600 text-white'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </>
  );
};

export default QuickShareButton;
