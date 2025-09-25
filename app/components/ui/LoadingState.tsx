/**
 * @file LoadingState.tsx
 * @description Comprehensive loading state component for async operations
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import React from 'react';
import { FiLoader, FiZap, FiBarChart, FiFileText } from 'react-icons/fi';
import { SkeletonLoader } from './SkeletonLoader';

interface LoadingStateProps {
  type?: 'ai-generation' | 'form-submission' | 'export' | 'general';
  message?: string;
  showSkeleton?: boolean;
  skeletonVariant?: 'text' | 'card' | 'table' | 'chart';
  className?: string;
}

/**
 * @component LoadingState
 * @description مكون حالة التحميل الشاملة للعمليات غير المتزامنة
 * @param {LoadingStateProps} props - خصائص المكون
 * @returns {JSX.Element} مكون حالة التحميل مع الرسوم المتحركة
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  type = 'general',
  message,
  showSkeleton = false,
  skeletonVariant = 'text',
  className = ''
}) => {
  const getLoadingConfig = () => {
    switch (type) {
      case 'ai-generation':
        return {
          icon: <FiZap className="w-8 h-8 text-prepilot-purple-400" />,
          message: message || 'جاري تحليل البيانات وإنشاء التوصيات...',
          description: 'يستخدم الذكاء الاصطناعي أحدث التقنيات لتحليل حملتك'
        };
      case 'form-submission':
        return {
          icon: <FiBarChart className="w-8 h-8 text-prepilot-purple-400" />,
          message: message || 'جاري معالجة البيانات وإنشاء الخطة...',
          description: 'نحسب أفضل استراتيجية لحملتك الإعلانية'
        };
      case 'export':
        return {
          icon: <FiFileText className="w-8 h-8 text-prepilot-purple-400" />,
          message: message || 'جاري إنشاء الملف...',
          description: 'نحضر تقريرك للتحميل'
        };
      default:
        return {
          icon: <FiLoader className="w-8 h-8 text-prepilot-purple-400 animate-spin" />,
          message: message || 'جاري التحميل...',
          description: 'يرجى الانتظار'
        };
    }
  };

  const { icon, message: configMessage, description } = getLoadingConfig();

  if (showSkeleton) {
    return (
      <div className={`space-y-4 ${className}`}>
        <SkeletonLoader variant={skeletonVariant} />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-prepilot-purple-600/20 animate-ping"></div>
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 border border-gray-700">
          {icon}
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">
          {configMessage}
        </h3>
        <p className="text-sm text-gray-400 max-w-md">
          {description}
        </p>
      </div>
      
      <div className="mt-6 flex space-x-1">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="w-2 h-2 bg-prepilot-purple-400 rounded-full animate-pulse"
            style={{ animationDelay: `${index * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * @component AILoadingState
 * @description مكون حالة التحميل المخصص للذكاء الاصطناعي
 */
export const AILoadingState: React.FC<{ message?: string; className?: string }> = ({
  message,
  className = ''
}) => (
  <LoadingState
    type="ai-generation"
    message={message}
    className={className}
  />
);

/**
 * @component FormLoadingState
 * @description مكون حالة التحميل المخصص للنماذج
 */
export const FormLoadingState: React.FC<{ message?: string; className?: string }> = ({
  message,
  className = ''
}) => (
  <LoadingState
    type="form-submission"
    message={message}
    className={className}
  />
);

/**
 * @component ExportLoadingState
 * @description مكون حالة التحميل المخصص للتصدير
 */
export const ExportLoadingState: React.FC<{ message?: string; className?: string }> = ({
  message,
  className = ''
}) => (
  <LoadingState
    type="export"
    message={message}
    className={className}
  />
);

export default LoadingState;
