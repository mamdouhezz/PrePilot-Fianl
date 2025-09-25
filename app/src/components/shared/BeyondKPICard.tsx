import React, { useState } from 'react';
import { KPIExplanation } from '../../types/beyond-kpis';
import { FiTrendingUp, FiTarget, FiMousePointer, FiCheckCircle, FiCopy, FiShare2, FiChevronDown, FiCheck } from 'react-icons/fi';
import Icon from '../ui/Icon';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { IconType } from 'react-icons';

interface BeyondKPICardProps {
  explanation: KPIExplanation;
  onShare: (content: string) => void;
  onCopy: (content: string) => void;
}

const kpiIconMap: { [key: string]: IconType } = {
  roas: FiTrendingUp,
  cac: FiTarget,
  ctr: FiMousePointer,
  conversions: FiCheckCircle,
};

const BeyondKPICard: React.FC<BeyondKPICardProps> = ({ explanation, onShare, onCopy }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    onCopy(`${explanation.kpiName} (${explanation.kpiValue}): ${explanation.explanation}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const handleShare = () => {
    onShare(`${explanation.kpiName} (${explanation.kpiValue}): ${explanation.explanation}`);
  }

  const kpiKey = Object.keys(kpiIconMap).find(key => explanation.kpiName.toLowerCase().includes(key)) || 'roas';
  const KpiIcon = kpiIconMap[kpiKey];

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-800/70 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-prepilot-purple-900/50 rounded-lg">
            <Icon as={KpiIcon} size={24} className="text-prepilot-purple-300" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">{explanation.kpiName}</p>
            <p className="text-white font-bold text-xl">{explanation.kpiValue}</p>
          </div>
        </div>
        <Icon as={FiChevronDown} className={`transform transition-transform text-gray-400 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-gray-700 space-y-4">
              <p className="text-gray-300 leading-relaxed">{explanation.explanation}</p>
              {explanation.formula && (
                <code className="block p-2 bg-brand-navy-950 border border-gray-600 rounded-md text-sm text-prepilot-purple-300 text-left" dir="ltr">
                  {explanation.formula}
                </code>
              )}
              <div className="flex justify-end items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleCopy} leftIcon={<Icon as={isCopied ? FiCheck : FiCopy} />}>
                  {isCopied ? 'تم النسخ!' : 'نسخ'}
                </Button>
                <Button variant="secondary" size="sm" onClick={handleShare} leftIcon={<Icon as={FiShare2} />}>
                  مشاركة
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BeyondKPICard;