import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TechnicalRecommendation } from '../../types/recommendations';
import Icon from '../ui/Icon';
import { Button } from '../ui/Button';
import { FiCopy, FiShare2, FiZap, FiTarget, FiDollarSign, FiShield, FiTrendingUp, FiVideo } from 'react-icons/fi';
import { IconType } from 'react-icons';

interface RecommendationCardProps {
  recommendation: TechnicalRecommendation;
  viewMode: 'Basic' | 'Advanced';
  onShare: (content: string) => void;
  onCopy: (content: string) => void;
}

const categoryStyles: Record<TechnicalRecommendation['category'], { accent: string; icon: IconType }> = {
  Creative: { accent: 'border-pink-500/50', icon: FiVideo },
  Targeting: { accent: 'border-sky-500/50', icon: FiTarget },
  Budget: { accent: 'border-green-500/50', icon: FiDollarSign },
  Channel: { accent: 'border-yellow-500/50', icon: FiZap },
  Risk: { accent: 'border-red-500/50', icon: FiShield },
};

const impactStyles: Record<TechnicalRecommendation['impact'], string> = {
  High: 'bg-red-500/80 text-white',
  Medium: 'bg-yellow-500/80 text-black',
  Low: 'bg-green-500/80 text-white',
};

// A map to dynamically render icons from string keys
const iconMap: { [key: string]: IconType } = {
    FiVideo, FiTarget, FiDollarSign, FiZap, FiShield, FiTrendingUp
};


const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, viewMode, onShare, onCopy }) => {
  const { category, impact, title, icon, snippet, details } = recommendation;
  const styles = categoryStyles[category] || categoryStyles.Budget;
  const impactStyle = impactStyles[impact];
  const CardIcon = iconMap[icon] || FiZap;
  const shareContent = `${title}: ${snippet}`;

  return (
    <div className={`bg-gray-800/50 border rounded-xl overflow-hidden transition-all duration-300 ${styles.accent}`}>
      <div className="p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-3">
            <Icon as={CardIcon} size={20} className="text-prepilot-purple-300" />
            <h4 className="font-bold text-white">{title}</h4>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className={`px-2 py-0.5 rounded-full ${impactStyle}`}>{impact} Impact</span>
            <span className="px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">{category}</span>
          </div>
        </div>
        <p className="text-gray-300 mt-3">{snippet}</p>
      </div>

      <AnimatePresence>
        {viewMode === 'Advanced' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: '1rem', paddingTop: '1rem' }}
            exit={{ height: 0, opacity: 0, marginTop: 0, paddingTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-gray-700 overflow-hidden"
          >
            <div className="p-4">
                <p className="text-sm text-gray-400 whitespace-pre-wrap">{details}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-2 bg-gray-900/30 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => onCopy(shareContent)} leftIcon={<Icon as={FiCopy} />}>Copy</Button>
        <Button variant="ghost" size="sm" onClick={() => onShare(shareContent)} leftIcon={<Icon as={FiShare2} />}>Share</Button>
      </div>
    </div>
  );
};

export default RecommendationCard;
