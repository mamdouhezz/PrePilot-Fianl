import React from 'react';
import { motion } from 'framer-motion';
import { FunnelStage, FunnelStageName } from '../../types/growth';
import Icon from '../ui/Icon';
import { FiTrendingUp, FiUsers, FiTarget, FiRepeat, FiZap } from 'react-icons/fi';
// FIX: Import IconType to correctly type the stageIcons map.
import { IconType } from 'react-icons';

const stageIcons: Record<FunnelStageName, IconType> = {
  'Awareness': FiZap,
  'Engagement': FiUsers,
  'Conversion': FiTarget,
  'Retention': FiRepeat,
  'Growth Loop': FiTrendingUp,
};

const stageColors: Record<FunnelStage['color'], { gradient: string; text: string }> = {
    indigo: { gradient: 'from-indigo-500 to-indigo-600', text: 'text-indigo-200' },
    blue: { gradient: 'from-blue-500 to-blue-600', text: 'text-blue-200' },
    green: { gradient: 'from-green-500 to-green-600', text: 'text-green-200' },
    teal: { gradient: 'from-teal-500 to-teal-600', text: 'text-teal-200' },
    purple: { gradient: 'from-purple-500 to-purple-600', text: 'text-purple-200' },
};

const FunnelStageItem: React.FC<{ stage: FunnelStage; onClick: () => void }> = ({ stage, onClick }) => {
  const colors = stageColors[stage.color];
  const performanceColor = stage.performance === 'above' ? 'text-green-400' : stage.performance === 'below' ? 'text-red-400' : 'text-yellow-400';
  const performanceIcon = stage.performance === 'above' ? '▲' : stage.performance === 'below' ? '▼' : '●';

  return (
    <motion.div
      onClick={onClick}
      className={`relative p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl bg-gray-800/50 border border-gray-700/50`}
      whileHover={{ y: -5 }}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient}`}></div>
      <div className="flex items-center gap-3">
        <Icon as={stageIcons[stage.name]} size={20} className={colors.text} />
        <h4 className="font-bold text-white text-sm">{stage.name}</h4>
      </div>
      <div className="mt-3 text-center">
        <p className="text-2xl font-black text-white">{stage.value.toLocaleString()}</p>
        <p className="text-xs text-gray-400">{stage.kpi}</p>
      </div>
      <div className={`mt-2 text-xs font-bold text-center flex items-center justify-center gap-1 ${performanceColor}`}>
        <span>{performanceIcon}</span>
        <span>{stage.delta.toFixed(1)}% vs. Benchmark</span>
      </div>
    </motion.div>
  );
};

const FunnelDiagram: React.FC<{ stages: FunnelStage[]; onStageClick: (stageName: FunnelStageName | null) => void; selectedStage: FunnelStageName | null }> = ({ stages, onStageClick, selectedStage }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <motion.button
            onClick={() => onStageClick(null)}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 text-center flex flex-col items-center justify-center
                ${selectedStage === null ? 'bg-prepilot-purple-600 text-white' : 'bg-gray-800/50 border border-gray-700/50 text-gray-300'}`}
        >
            <span className="text-lg font-bold">عرض الكل</span>
        </motion.button>
        {stages.map((stage) => (
          <FunnelStageItem key={stage.name} stage={stage} onClick={() => onStageClick(stage.name)} />
        ))}
      </div>
    </div>
  );
};

export default FunnelDiagram;
