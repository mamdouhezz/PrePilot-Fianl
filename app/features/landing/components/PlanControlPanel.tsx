/**
 * Plan Control Panel Component
 * Interactive panel for displaying plan results
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FiThumbsDown, FiZap, FiTrendingUp, FiUsers, FiDollarSign } from 'react-icons/fi';
import { KpiGauge } from './KpiGauge';
import { PlanResults } from '../data/plan-lab-scenarios';

interface PlanControlPanelProps {
  title: string;
  icon: 'guesswork' | 'prepilot';
  kpiResults: PlanResults;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export const PlanControlPanel: React.FC<PlanControlPanelProps> = ({
  title,
  icon,
  kpiResults,
  isActive,
  onClick,
  className = ''
}) => {
  const iconComponent = icon === 'guesswork' ? FiThumbsDown : FiZap;
  const IconComponent = iconComponent;

  const panelVariants = {
    inactive: {
      scale: 1,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      borderColor: '#e5e7eb'
    },
    active: {
      scale: 1.02,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      borderColor: icon === 'prepilot' ? '#8b5cf6' : '#ef4444'
    }
  };

  const glowVariants = {
    inactive: {
      opacity: 0,
      scale: 1
    },
    active: {
      opacity: 0.3,
      scale: 1.05
    }
  };

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
      variants={panelVariants}
      animate={isActive ? 'active' : 'inactive'}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Background Glow Effect */}
      <motion.div
        className={`absolute inset-0 rounded-2xl ${
          icon === 'prepilot' 
            ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20' 
            : 'bg-gradient-to-br from-red-500/20 to-orange-500/20'
        }`}
        variants={glowVariants}
        animate={isActive ? 'active' : 'inactive'}
        transition={{ duration: 0.3 }}
      />

      {/* Main Panel */}
      <div className={`
        relative bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 transition-all duration-300
        ${isActive 
          ? (icon === 'prepilot' ? 'border-purple-500' : 'border-red-500')
          : 'border-gray-200 dark:border-gray-700'
        }
        hover:shadow-lg
      `}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center
              ${icon === 'prepilot' 
                ? 'bg-gradient-to-br from-purple-500 to-blue-500' 
                : 'bg-gradient-to-br from-red-500 to-orange-500'
              }
            `}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {icon === 'prepilot' ? 'ذكاء اصطناعي متقدم' : 'طريقة تقليدية'}
              </p>
            </div>
          </div>
          
          {isActive && (
            <motion.div
              className="w-3 h-3 bg-green-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>

        {/* KPI Gauge */}
        <div className="flex justify-center mb-8">
          <KpiGauge
            value={kpiResults.roas}
            maxValue={8}
            label="ROAS"
            size="lg"
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Conversions */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <FiUsers className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                التحويلات
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {kpiResults.conversions.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              عميل جديد
            </div>
          </div>

          {/* CAC */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <FiDollarSign className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                تكلفة العميل
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {kpiResults.cac.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              ريال سعودي
            </div>
          </div>
        </div>

        {/* Performance Indicator */}
        <div className="mt-6 flex items-center justify-center">
          <div className={`
            px-4 py-2 rounded-full text-sm font-semibold
            ${icon === 'prepilot' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            }
          `}>
            {icon === 'prepilot' ? 'أداء ممتاز' : 'أداء ضعيف'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
