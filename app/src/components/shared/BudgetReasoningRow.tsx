import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BudgetReasoning } from '../../types/beyond-budget';
import Icon from '../ui/Icon';
import { Button } from '../ui/Button';
import { FiCopy, FiShare2 } from 'react-icons/fi';

interface BudgetReasoningRowProps {
  reasoning: BudgetReasoning;
  onShare: (content: string) => void;
  onCopy: (content: string) => void;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const BudgetReasoningRow: React.FC<BudgetReasoningRowProps> = ({ reasoning, onShare, onCopy }) => {
  const shareContent = `${reasoning.platform} (${reasoning.percentage.toFixed(1)}%): ${reasoning.explanation}`;
  
  return (
    <motion.div variants={itemVariants} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor: reasoning.color}}>
          <Icon as={reasoning.icon} size={32} className="text-white" />
        </div>
      </div>
      <div className="flex-1 text-center">
        <p className="text-3xl font-bold text-white font-mono">{reasoning.percentage.toFixed(1)}%</p>
        <p className="text-sm text-gray-400">{reasoning.budget.toLocaleString('ar-SA')} ريال</p>
      </div>
      <div className="flex-1 relative">
        <div className="bg-brand-navy-950 p-3 rounded-lg border border-gray-600">
          <p className="text-sm text-gray-300 leading-relaxed">{reasoning.explanation}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="ghost" size="sm" onClick={() => onCopy(shareContent)} leftIcon={<Icon as={FiCopy} />} className="!p-2 h-auto" title="نسخ" />
        <Button variant="ghost" size="sm" onClick={() => onShare(shareContent)} leftIcon={<Icon as={FiShare2} />} className="!p-2 h-auto" title="مشاركة" />
      </div>
    </motion.div>
  );
};

export default BudgetReasoningRow;
