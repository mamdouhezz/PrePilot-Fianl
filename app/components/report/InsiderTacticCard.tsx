import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GrowthTactic } from '../../types/growth';
import Icon from '../ui/Icon';
import { Button } from '../ui/Button';
import { FiCopy, FiShare2, FiZap, FiChevronDown, FiCheck, FiAward, FiBarChart2, FiCrosshair, FiRepeat, FiTrendingUp } from 'react-icons/fi';
import { IconType } from 'react-icons';

const categoryStyles: Record<GrowthTactic['category'], { accent: string; icon: IconType }> = {
  Creative: { accent: 'border-pink-500/50', icon: FiZap },
  Budget: { accent: 'border-green-500/50', icon: FiAward },
  Targeting: { accent: 'border-sky-500/50', icon: FiCrosshair },
  Retention: { accent: 'border-teal-500/50', icon: FiRepeat },
  Algorithm: { accent: 'border-purple-500/50', icon: FiTrendingUp },
};

const impactStyles: Record<GrowthTactic['impact'], string> = {
  High: 'bg-red-500/80 text-white',
  Medium: 'bg-yellow-500/80 text-black',
  Low: 'bg-green-500/80 text-white',
};

const difficultyStyles: Record<GrowthTactic['difficulty'], string> = {
  Easy: 'bg-green-700 text-green-200',
  Medium: 'bg-yellow-700 text-yellow-200',
  Hard: 'bg-red-700 text-red-200',
};

// A map to dynamically render icons from string keys
const iconMap: { [key: string]: IconType } = {
    FiZap, FiAward, FiBarChart2, FiCrosshair, FiRepeat, FiTrendingUp
};

const InsiderTacticCard: React.FC<{ tactic: GrowthTactic; onShare: (content: string) => void; onCopy: (content: string) => void; }> = ({ tactic, onShare, onCopy }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const styles = categoryStyles[tactic.category] || { accent: 'border-gray-500/50', icon: FiZap };
  const CardIcon = iconMap[tactic.icon] || FiZap;
  const shareContent = `${tactic.title}: ${tactic.snippet}`;
  
  const handleCopy = () => {
    onCopy(shareContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={`bg-gray-800/50 border rounded-xl overflow-hidden shadow-lg ${styles.accent}`}>
      <div className="p-4">
        <div className="flex justify-between items-start gap-2">
            <div className="flex items-center gap-3">
                <Icon as={CardIcon} size={20} className="text-prepilot-purple-300" />
                <h4 className="font-bold text-white text-base">{tactic.title}</h4>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold shrink-0">
                <span className={`px-2 py-0.5 rounded-full ${impactStyles[tactic.impact]}`}>{tactic.impact}</span>
                <span className={`px-2 py-0.5 rounded-full ${difficultyStyles[tactic.difficulty]}`}>{tactic.difficulty}</span>
            </div>
        </div>

        <div className="my-4 p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-lg relative">
            <div className="absolute -top-3 -start-3 bg-yellow-400 text-black rounded-full p-1.5 shadow-md">
                <Icon as={FiZap} size={14} />
            </div>
            <p className="text-yellow-200 text-center font-semibold">"{tactic.snippet}"</p>
        </div>
      </div>
      
      <div className="px-4 pb-2">
        <Button variant="ghost" size="sm" className="w-full" onClick={() => setIsExpanded(!isExpanded)} rightIcon={<Icon as={FiChevronDown} className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />}>
            {isExpanded ? 'إخفاء التفاصيل' : 'عرض التفاصيل والتكتيك'}
        </Button>
      </div>

      <AnimatePresence>
        {isExpanded && (
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
            >
                <div className="border-t border-gray-700/50 p-4 space-y-4">
                    <p className="text-sm text-gray-300 whitespace-pre-wrap">{tactic.details}</p>
                    {tactic.caseStudy && (
                        <div className="p-3 bg-teal-900/40 border border-teal-700/50 rounded-lg">
                            <p className="text-xs font-bold text-teal-300 uppercase mb-1">Case Study</p>
                            <p className="text-sm text-teal-200">{tactic.caseStudy}</p>
                        </div>
                    )}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="secondary" size="sm" onClick={handleCopy} leftIcon={<Icon as={isCopied ? FiCheck : FiCopy} />}>
                            {isCopied ? 'تم!' : 'نسخ'}
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => onShare(shareContent)} leftIcon={<Icon as={FiShare2} />}>
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

export default InsiderTacticCard;