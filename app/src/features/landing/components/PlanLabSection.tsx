/**
 * Plan Lab Section Component
 * Interactive comparison between traditional and AI-powered planning
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap, FiThumbsDown, FiTarget, FiTrendingUp, FiUsers, FiDollarSign, FiBarChart } from 'react-icons/fi';
import { FaFlask } from 'react-icons/fa';
import { PlanControlPanel } from './PlanControlPanel';
import { scenarios, getScenarioById, type Scenario } from '../data/plan-lab-scenarios';

export const PlanLabSection: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<string>('ecommerce_launch');
  const [activePlan, setActivePlan] = useState<'guesswork' | 'prepilot'>('prepilot');

  const currentScenario = getScenarioById(activeScenario);
  if (!currentScenario) return null;

  // Dynamic ingredients based on active plan
  const getIngredients = (planType: 'guesswork' | 'prepilot') => {
    if (planType === 'guesswork') {
      return [
        { icon: FiThumbsDown, text: 'مشاعر داخلية', color: 'text-red-500' },
        { icon: FiUsers, text: 'آراء الأصدقاء', color: 'text-orange-500' },
        { icon: FiTarget, text: 'تخمين عشوائي', color: 'text-yellow-500' },
        { icon: FiBarChart, text: 'نسخ المنافسين', color: 'text-gray-500' }
      ];
    } else {
      return [
        { icon: FiZap, text: 'تحليل المنافسين الذكي', color: 'text-purple-500' },
        { icon: FiTrendingUp, text: 'بيانات السوق السعودي', color: 'text-blue-500' },
        { icon: FiDollarSign, text: 'تحسين الميزانية التلقائي', color: 'text-green-500' },
        { icon: FiBarChart, text: 'محاكاة +800 مليار انطباع', color: 'text-indigo-500' }
      ];
    }
  };

  const ingredients = getIngredients(activePlan);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-full mb-6">
              <FaFlask className="w-5 h-5 text-purple-600 dark:text-purple-400 ml-2" />
              <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                مختبر الخطط التفاعلي
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              ادخل مختبر الخطط
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              شاهد الفرق بين التخمين والذكاء الاصطناعي. اختر سيناريو واختبر كيف يمكن لـ PrePilot 
              تحويل استراتيجيتك التسويقية من تخمين إلى علم دقيق.
            </p>
          </motion.div>

          {/* Scenario Selector */}
          <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
              اختر سيناريو للاختبار:
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {Object.entries(scenarios).map(([key, scenario]) => (
                <button
                  key={key}
                  onClick={() => setActiveScenario(key)}
                  className={`
                    px-6 py-3 rounded-xl font-medium transition-all duration-300
                    ${activeScenario === key
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                    }
                  `}
                >
                  {scenario.title}
                </button>
              ))}
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
              {currentScenario.description}
            </p>
          </motion.div>

          {/* Plan Comparison */}
          <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Traditional Plan */}
            <PlanControlPanel
              title="الخطة التقليدية"
              icon="guesswork"
              kpiResults={currentScenario.guessworkPlan}
              isActive={activePlan === 'guesswork'}
              onClick={() => setActivePlan('guesswork')}
            />

            {/* PrePilot Plan */}
            <PlanControlPanel
              title="خطة PrePilot"
              icon="prepilot"
              kpiResults={currentScenario.prepilotPlan}
              isActive={activePlan === 'prepilot'}
              onClick={() => setActivePlan('prepilot')}
            />
          </motion.div>

          {/* Dynamic Ingredients */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              المكونات المستخدمة في هذه الخطة:
            </h3>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlan}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {ingredients.map((ingredient, index) => (
                  <motion.div
                    key={`${activePlan}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`
                      flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300
                      ${activePlan === 'prepilot'
                        ? 'border-purple-200 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-900/20'
                        : 'border-red-200 dark:border-red-700 bg-red-50/50 dark:bg-red-900/20'
                      }
                    `}
                  >
                    <ingredient.icon className={`w-8 h-8 ${ingredient.color} mb-3`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                      {ingredient.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Results Summary */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                النتيجة النهائية
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {((currentScenario.prepilotPlan.roas / currentScenario.guessworkPlan.roas - 1) * 100).toFixed(0)}%
                  </div>
                  <div className="text-purple-200">تحسن في ROAS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {((currentScenario.prepilotPlan.conversions / currentScenario.guessworkPlan.conversions - 1) * 100).toFixed(0)}%
                  </div>
                  <div className="text-purple-200">زيادة في التحويلات</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {((1 - currentScenario.prepilotPlan.cac / currentScenario.guessworkPlan.cac) * 100).toFixed(0)}%
                  </div>
                  <div className="text-purple-200">توفير في التكلفة</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
