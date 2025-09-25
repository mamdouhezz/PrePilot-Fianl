import React, { useState, useEffect, useMemo } from 'react';
import { CampaignReport } from '../../types';
// FIX: Correct the import path for beyond-kpis types.
import { KPIExplanation, ToastNotification } from '../../types/beyond-kpis';
import { generateAllKPIExplanations } from '../../engine/beyondKPIs/generateExplanation';
import BeyondKPICard from './BeyondKPICard';
import { copyToClipboard, formatComprehensiveShareContent, shareToLinkedIn, shareToTwitter } from '../../engine/beyondKPIs/shareUtils';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { FiLinkedin, FiTwitter, FiDownload } from 'react-icons/fi';

const LoadingSkeleton: React.FC = () => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 animate-pulse">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                <div className="h-6 bg-gray-700 rounded w-1/2"></div>
            </div>
        </div>
    </div>
);

const Toast: React.FC<ToastNotification> = ({ message, type }) => (
    <div className={`px-4 py-2 rounded-md shadow-lg text-sm font-medium animate-fade-in-out
        ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
    >
        {message}
    </div>
);

const BeyondKPIs: React.FC<{ report: CampaignReport, className?: string }> = ({ report, className = '' }) => {
  const [explanations, setExplanations] = useState<KPIExplanation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  useEffect(() => {
    setIsLoading(true);
    generateAllKPIExplanations(report)
      .then(setExplanations)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [report]);

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleShare = (content: string) => {
    shareToLinkedIn(content);
    showToast('تم فتح نافذة المشاركة على LinkedIn', 'success');
  };

  const handleCopy = async (content: string) => {
    const success = await copyToClipboard(content);
    showToast(success ? 'تم نسخ النص بنجاح!' : 'فشل النسخ', success ? 'success' : 'error');
  };

  const fullShareContent = useMemo(() => formatComprehensiveShareContent(explanations), [explanations]);

  return (
    <div className={className}>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <LoadingSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {explanations.map((exp) => (
            <BeyondKPICard
              key={exp.kpiName}
              explanation={exp}
              onShare={handleShare}
              onCopy={handleCopy}
            />
          ))}
        </div>
      )}
      
      {!isLoading && explanations.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-700/50 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-gray-400 font-medium">مشاركة جميع الرؤى:</p>
            <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => shareToLinkedIn(fullShareContent)} leftIcon={<Icon as={FiLinkedin} />}>LinkedIn</Button>
                <Button variant="secondary" size="sm" onClick={() => shareToTwitter(fullShareContent)} leftIcon={<Icon as={FiTwitter} />}>Twitter/X</Button>
                <Button variant="secondary" size="sm" onClick={() => handleCopy(fullShareContent)} leftIcon={<Icon as={FiDownload} />}>تحميل كنص</Button>
            </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map(toast => <Toast key={toast.id} {...toast} />)}
      </div>
    </div>
  );
};

export default BeyondKPIs;
