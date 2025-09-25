/**
 * DashboardMockup Component
 * Clean, stylized representation of the PrePilot Dashboard
 */

import React from 'react';
import { motion } from 'framer-motion';

interface DashboardMockupProps {
  className?: string;
}

export const DashboardMockup: React.FC<DashboardMockupProps> = ({ className = '' }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const kpiVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className={`relative ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Dashboard Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/10 relative overflow-hidden"
      >
        {/* Browser Header */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">PrePilot Dashboard</h3>
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-yellow-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
        </motion.div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <motion.div
            variants={kpiVariants}
            className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-2xl border border-purple-200/50 dark:border-purple-700/50"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">2.4M</div>
              <div className="text-xs text-green-600 dark:text-green-400 font-semibold bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                ↗ +12.5%
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">الظهور</div>
          </motion.div>

          <motion.div
            variants={kpiVariants}
            className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-6 rounded-2xl border border-yellow-200/50 dark:border-yellow-700/50"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">4.2x</div>
              <div className="text-xs text-green-600 dark:text-green-400 font-semibold bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                ↗ +8.3%
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">ROAS</div>
          </motion.div>

          <motion.div
            variants={kpiVariants}
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-2xl border border-green-200/50 dark:border-green-700/50"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">15.3%</div>
              <div className="text-xs text-green-600 dark:text-green-400 font-semibold bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                ↗ +5.7%
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">CTR</div>
          </motion.div>

          <motion.div
            variants={kpiVariants}
            className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 p-6 rounded-2xl border border-cyan-200/50 dark:border-cyan-700/50"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">3.8%</div>
              <div className="text-xs text-red-600 dark:text-red-400 font-semibold bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                ↘ -2.1%
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">CVR</div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">تقدم الحملة</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">75%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Live Indicator */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center space-x-2 space-x-reverse"
        >
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">مباشر الآن</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">500+ مستخدم نشط</span>
        </motion.div>
      </motion.div>

      {/* Floating Success Notification */}
      <motion.div
        initial={{ opacity: 0, scale: 0, x: 20, y: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
        className="absolute -top-4 -right-4 bg-gradient-to-br from-green-400 to-emerald-500 p-4 rounded-2xl shadow-xl text-white"
      >
        <div className="flex items-center space-x-2 space-x-reverse">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold text-sm">هدف محقق!</span>
        </div>
      </motion.div>

      {/* Floating Performance Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
        className="absolute -bottom-6 -left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50"
      >
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full animate-pulse"></div>
          <div>
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">أداء ممتاز</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">+25% هذا الشهر</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
