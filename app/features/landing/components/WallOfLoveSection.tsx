/**
 * WallOfLoveSection Component
 * Interactive testimonials section with featured testimonial and grid
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { TestimonialCard } from './TestimonialCard';
import { testimonials, getTestimonialById, type Testimonial } from '../data/testimonials';

export const WallOfLoveSection: React.FC = () => {
  const [activeTestimonialId, setActiveTestimonialId] = useState(1);

  const activeTestimonial = getTestimonialById(activeTestimonialId) || testimonials[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const featuredVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      x: 30,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="landing-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-violet-100 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-700/50 rounded-full mb-6"
          >
            <FiCheckCircle className="w-4 h-4 text-violet-600 dark:text-violet-400 ml-2" />
            <span className="text-sm font-semibold text-violet-700 dark:text-violet-400">
              موثوق من خبراء التسويق
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            يثق بنا المسوقون والمؤسسون
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            اكتشف كيف يساعد PrePilot المسوقين الرقميين والمؤسسين على اتخاذ قرارات مدروسة وتحقيق نتائج استثنائية
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left Column - Featured Testimonial */}
          <motion.div
            variants={featuredVariants}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                variants={featuredVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 rounded-full -translate-y-16 translate-x-16"></div>
                
                {/* Quote Icon */}
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <FaQuoteLeft className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Full Quote */}
                <blockquote className="relative z-10 text-xl lg:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed mb-8 font-medium">
                  "{activeTestimonial.quote}"
                </blockquote>

                {/* User Info */}
                <div className="relative z-10 flex items-center space-x-4 space-x-reverse">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {activeTestimonial.name.charAt(0)}
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {activeTestimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {activeTestimonial.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {activeTestimonial.company}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Results */}
                {activeTestimonial.results && (
                  <div className="relative z-10 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                      <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                      النتيجة: {activeTestimonial.results}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Column - Testimonials Grid */}
          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    isActive={testimonial.id === activeTestimonialId}
                    onClick={() => setActiveTestimonialId(testimonial.id)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-8 p-6 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl text-white"
            >
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-sm opacity-90">مسوق رقمي</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">4.9/5</div>
                  <div className="text-sm opacity-90">تقييم المستخدمين</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
