import React, { useState, useEffect, useMemo } from 'react';
import { CampaignReport } from '../../types';
import { GrowthTactic, FunnelStage, FunnelStageName, ToastNotification } from '../../types/growth';
import { generateFunnelStages } from '../../engine/growth/funnelMath';
import { generateGrowthTactics } from '../../engine/growth/generateGrowthTactics';
import { copyGrowthTacticToClipboard, shareGrowthTacticToLinkedIn, formatComprehensiveGrowthShare } from '../../engine/growth/shareGrowth';
import FunnelDiagram from './FunnelDiagram';
import InsiderTacticCard from './InsiderTacticCard';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { FiRefreshCw } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingSkeleton: React.FC = () => (
  <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 animate-pulse space-y-3">
    <div className="h-5 bg-gray-700 rounded w-1/3"></div>
    <div className="h-8 bg-yellow-400/10 rounded w-full"></div>
    <div className="h-4 bg-gray-700 rounded w-full"></div>
    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
  </div>
);

const Toast: React.FC<ToastNotification> = ({ message, type }) => (
    <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg text-sm font-medium z-50
        ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
    >
        {message}
    </div>
);

const GrowthFunnel: React.FC<{ report: CampaignReport, className?: string }> = ({ report, className = '' }) => {
  const [tactics, setTactics] = useState<GrowthTactic[]>([]);
  const [stages, setStages] = useState<FunnelStage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStage, setSelectedStage] = useState<FunnelStageName | null>(null);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [regenerationKey, setRegenerationKey] = useState(0);

  useEffect(() => {
    const fetchGrowthData = async () => {
      setIsLoading(true);
      try {
        const [generatedStages, generatedTactics] = await Promise.all([
          generateFunnelStages(report),
          generateGrowthTactics(report)
        ]);
        setStages(generatedStages);
        setTactics(generatedTactics);
      } catch (error) {
        console.error("Failed to fetch growth data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGrowthData();
  }, [report, regenerationKey]);

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };
  
  const handleShare = (content: string) => {
    shareGrowthTacticToLinkedIn(content);
    showToast('تم فتح نافذة المشاركة على LinkedIn', 'success');
  };

  const handleCopy = async (content: string) => {
    const success = await copyGrowthTacticToClipboard(content);
    showToast(success ? 'تم نسخ النص بنجاح!' : 'فشل النسخ', success ? 'success' : 'error');
  };

  const filteredTactics = useMemo(() => {
    if (!selectedStage) return tactics;
    return tactics.filter(tactic => tactic.relatedStage === selectedStage);
  }, [tactics, selectedStage]);

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
            <h3 className="text-2xl font-bold text-white">قمع النمو وتكتيكات الخبراء</h3>
            <p className="text-gray-400">تحليلات مرئية وتكتيكات غير معلنة لنمو استثنائي.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setRegenerationKey(k => k + 1)} disabled={isLoading} className="!p-2 h-auto" title="إعادة إنشاء التكتيكات">
            <Icon as={FiRefreshCw} className={isLoading ? 'animate-spin' : ''} />
        </Button>
      </div>

      <div className="mb-8">
        <FunnelDiagram stages={stages} onStageClick={setSelectedStage} selectedStage={selectedStage} />
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <LoadingSkeleton key={i} />)}
        </div>
      ) : (
        <AnimatePresence>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTactics.length > 0 ? filteredTactics.map((tactic) => (
              <motion.div layout="position" key={tactic.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                <InsiderTacticCard
                  tactic={tactic}
                  onShare={handleShare}
                  onCopy={handleCopy}
                />
              </motion.div>
            )) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400">لا توجد تكتيكات لهذه المرحلة.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {!isLoading && tactics.length > 0 && (
          <div className="mt-12 text-center">
              <Button variant="secondary" onClick={() => handleShare(formatComprehensiveGrowthShare(tactics))}>مشاركة أفضل التكتيكات</Button>
          </div>
      )}

      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div key={toast.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <Toast {...toast} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GrowthFunnel;
