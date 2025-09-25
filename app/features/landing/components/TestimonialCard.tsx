/**
 * TestimonialCard Component
 * Interactive card for displaying testimonials in the grid
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { Testimonial } from '../data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  isActive,
  onClick,
  className = ''
}) => {
  const cardVariants = {
    inactive: {
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    active: {
      scale: 1.02,
      y: -4,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      y: -6,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="inactive"
      animate={isActive ? "active" : "inactive"}
      whileHover="hover"
      onClick={onClick}
      className={`
        relative cursor-pointer transition-all duration-300
        ${isActive 
          ? 'ring-2 ring-violet-500 ring-opacity-50 shadow-xl' 
          : 'hover:shadow-lg'
        }
        ${className}
      `}
    >
      <div className={`
        bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all duration-300
        ${isActive 
          ? 'border-violet-500 shadow-xl' 
          : 'border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600'
        }
      `}>
        {/* Persona Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className={`
            px-3 py-1 rounded-full text-xs font-semibold
            ${testimonial.persona === 'Founder' 
              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
              : testimonial.persona === 'Performance Marketer'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              : testimonial.persona === 'Marketing Manager'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
            }
          `}>
            {testimonial.persona === 'Founder' ? 'مؤسس' :
             testimonial.persona === 'Performance Marketer' ? 'خبير أداء' :
             testimonial.persona === 'Marketing Manager' ? 'مدير تسويق' : 'استراتيجي'}
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-1 space-x-reverse">
            {[...Array(testimonial.rating)].map((_, i) => (
              <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>

        {/* Highlight Quote */}
        <div className="mb-4">
          <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
            "{testimonial.highlight}"
          </p>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-3 space-x-reverse">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {testimonial.name.charAt(0)}
          </div>
          
          {/* Name and Title */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {testimonial.name}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
              {testimonial.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
              {testimonial.company}
            </p>
          </div>
        </div>

        {/* Results Badge */}
        {testimonial.results && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">
              <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
              {testimonial.results}
            </div>
          </div>
        )}

        {/* Active Indicator */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
