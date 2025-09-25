import React, { useState, useEffect, useMemo } from 'react';
import { CampaignReport } from '../../types';
import { BudgetReasoning, ToastNotification } from '../../types/beyond-budget';
import { generateAllBudgetReasoning } from '../../engine/beyondBudget/generateReasoning';
import { formatComprehensiveBudgetShare, copyBudgetToClipboard, shareBudgetToLinkedIn, shareBudgetToTwitter } from '../../engine/beyondBudget/shareUtils';
import BudgetReasoningRow from './BudgetReasoningRow';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { FiLinkedin, FiTwitter, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';

const LoadingSkeleton: React.FC = () => (
    <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 animate-pulse">
        <div className="w-16 h-16 rounded-full bg-gray-700"></div>
        <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-700 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
        </div>
        <div className="flex-1 h-16 bg-gray-700 rounded-lg"></div>
    </div>
);

const Toast: React.FC<ToastNotification> = ({ message, type }) => (
    <div className={`px-4 py-2 rounded-md shadow-lg text-sm font-medium animate-fade-in-out
        ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
    >
        {message}
    </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const BeyondBudgetAllocation: React.FC<{ report: CampaignReport, className?: string }> = ({ report, className = '' }) => {
  const [reasonings, setReasonings] = useState<BudgetReasoning[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  useEffect(() => {
    setIsLoading(true);
    generateAllBudgetReasoning(report)
      .then(setReasonings)
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

  const comprehensiveShareContent = useMemo(() => formatComprehensiveBudgetShare(reasonings), [reasonings]);

  const handleShare = (content: string) => {
    shareBudgetToLinkedIn(content);
    showToast('تم فتح نافذة المشاركة على LinkedIn', 'success');
  };

  const handleCopy = async (content: string) => {
    const success = await copyBudgetToClipboard(content);
    showToast(success ? 'تم نسخ النص بنجاح!' : 'فشل النسخ', success ? 'success' : 'error');
  };
  
  return (
    <div className={className}>
      <h3 className="text-2xl font-bold text-white mb-2">ما وراء توزيع الميزانية</h3>
      <p className="text-gray-400 mb-6">هنا نشرح لك المنطق الاستراتيجي خلف تخصيص كل ريال في خطتك.</p>
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <LoadingSkeleton key={i} />)}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {reasonings.map((reasoning) => (
            <BudgetReasoningRow
              key={reasoning.platform}
              reasoning={reasoning}
              onShare={handleShare}
              onCopy={handleCopy}
            />
          ))}
        </motion.div>
      )}

      {!isLoading && reasonings.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-700/50 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-gray-400 font-medium">مشاركة تحليل الميزانية:</p>
            <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => shareBudgetToLinkedIn(comprehensiveShareContent)} leftIcon={<Icon as={FiLinkedin} />}>LinkedIn</Button>
                <Button variant="secondary" size="sm" onClick={() => shareBudgetToTwitter(comprehensiveShareContent)} leftIcon={<Icon as={FiTwitter} />}>Twitter/X</Button>
                <Button variant="secondary" size="sm" onClick={() => handleCopy(comprehensiveShareContent)} leftIcon={<Icon as={FiDownload} />}>تحميل كنص</Button>
            </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map(toast => <Toast key={toast.id} {...toast} />)}
      </div>
    </div>
  );
};

export default BeyondBudgetAllocation;
