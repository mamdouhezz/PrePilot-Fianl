/**
 * Hero Section Component
 * Professional, visually compelling hero section with modern design
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiPlay } from 'react-icons/fi';
import { FaRocket } from 'react-icons/fa';
import { useLandingAnalytics } from '../hooks/useLandingAnalytics';
import { DashboardMockup } from '../components/DashboardMockup';
import Button from '../../../components/ui/Button';
import { Page } from '../../../../types';

interface HeroSectionProps {
  isMobile?: boolean;
  navigateTo: (page: Page) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isMobile = false, navigateTo }) => {
  const { trackCtaClick } = useLandingAnalytics();

  const handleCtaClick = (location: string) => {
    trackCtaClick('primary', location);
  };

  const handlePlaygroundClick = () => {
    trackCtaClick('playground', 'hero');
    navigateTo('playground');
  };

  const handleDemoClick = () => {
    trackCtaClick('demo', 'hero');
    // Demo functionality can be added here
  };

  const handleViewResultsClick = () => {
    trackCtaClick('results', 'hero');
    navigateTo('results-dashboard');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gray-900 overflow-hidden">
      {/* Aurora Background Glow Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(139, 92, 246, 0.1) 30%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
        <div 
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
      </div>

      <div className="landing-container relative z-10">
                <motion.div
                  className={`grid ${isMobile ? 'grid-cols-1 gap-16' : 'grid-cols-1 lg:grid-cols-2 gap-20'} items-center`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
          {/* Left Column - Content */}
                  <motion.div
                    variants={textVariants}
                    className={`${isMobile ? 'text-center' : 'text-right'} flex flex-col space-y-8`}
                  >
            {/* Badge */}
            <motion.div
              variants={textVariants}
              className="inline-flex items-center px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full w-fit mx-auto lg:mx-0"
            >
              <FaRocket className="w-4 h-4 text-cyan-400 ml-2" />
              <span className="text-xs font-semibold text-cyan-400">
                منصة التسويق الذكي الأولى في السعودية
                </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={textVariants}
              className="text-5xl lg:text-7xl font-extrabold leading-tight"
            >
              <span className="block text-gray-100">خطط إعلانية</span>
              <span className="block text-gray-100 mt-2">ذكية في دقائق</span>
              <span className="block text-gray-300 text-3xl lg:text-5xl font-normal mt-4">
                مع الذكاء الاصطناعي
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={textVariants}
              className="text-lg font-light text-gray-400 max-w-2xl leading-relaxed"
            >
              أنشئ خطط تسويقية احترافية باستخدام الذكاء الاصطناعي المتقدم. 
              <span className="font-semibold text-violet-400"> تحليل المنافسين، تخصيص الميزانيات، وتقارير تفصيلية</span> - كل شيء في مكان واحد مع ضمان نتائج مضمونة.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={buttonVariants}
              className={`flex ${isMobile ? 'flex-col gap-4' : 'flex-row gap-6'} items-center`}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={handlePlaygroundClick}
                className="bg-violet-500 hover:bg-violet-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <span>ابدأ مجاناً الآن</span>
                <FiArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={handleDemoClick}
                className="bg-transparent border-2 border-white/20 hover:border-white/40 text-white hover:bg-white/5 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 group"
              >
                <FiPlay className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                <span>شاهد العرض التوضيحي</span>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={handleViewResultsClick}
                className="bg-prepilot-purple-600/20 backdrop-blur-sm border-2 border-prepilot-purple-400/30 hover:border-prepilot-purple-400/50 text-prepilot-purple-100 hover:bg-prepilot-purple-600/30 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 group"
              >
                <FaRocket className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                <span>عرض النتائج التجريبية</span>
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={textVariants}
              className="flex flex-col space-y-4"
            >
              <p className="text-sm text-gray-400">
                يثق بنا أكثر من <span className="font-semibold text-violet-400">500+ مسوق رقمي</span> في السعودية
              </p>
              
              <div className="flex items-center justify-center lg:justify-start space-x-6 space-x-reverse">
                {/* User Avatars */}
                <div className="flex -space-x-2">
                  {[
                    { bg: 'from-purple-400 to-purple-600', initial: 'أ' },
                    { bg: 'from-cyan-400 to-cyan-600', initial: 'م' },
                    { bg: 'from-yellow-400 to-yellow-600', initial: 'س' },
                    { bg: 'from-green-400 to-green-600', initial: 'ن' },
                    { bg: 'from-pink-400 to-pink-600', initial: 'ه' }
                  ].map((user, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.bg} border-2 border-gray-900 flex items-center justify-center text-white font-semibold text-sm shadow-lg`}
                    >
                      {user.initial}
                    </div>
                  ))}
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-100">4.9/5</div>
                    <div className="text-xs text-gray-400">تقييم المستخدمين</div>
                  </div>
                </div>
              </div>
                    </motion.div>
                  </motion.div>

                  {/* Right Column - Dashboard Mockup */}
                  <motion.div
                    variants={textVariants}
                    className={`${isMobile ? 'order-first' : ''} relative`}
                  >
                    <DashboardMockup />
                  </motion.div>
                </motion.div>
      </div>
    </section>
  );
};
