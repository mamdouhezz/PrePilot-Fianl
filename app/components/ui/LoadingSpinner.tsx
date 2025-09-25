/**
 * @file LoadingSpinner.tsx
 * @description Global loading spinner component for lazy loading fallback
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * @component LoadingSpinner
 * @description مكون spinner للتحميل مع أحجام مختلفة وتصميم متوافق مع العلامة التجارية
 * @param {LoadingSpinnerProps} props - خصائص المكون
 * @returns {JSX.Element} مكون spinner مع الرسوم المتحركة
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        {/* PrePilot Logo/Icon */}
        <div className="relative">
          <div 
            className={`${sizeClasses[size]} border-4 border-gray-200 border-t-prepilot-purple-500 rounded-full animate-spin`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-prepilot-purple-500 rounded-full opacity-75" />
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="text-center">
          <p className="text-gray-400 text-sm font-medium">جاري التحميل...</p>
          <p className="text-gray-500 text-xs mt-1">يرجى الانتظار</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
