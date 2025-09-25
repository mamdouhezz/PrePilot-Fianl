/**
 * @file SkeletonLoader.tsx
 * @description Advanced skeleton loading component for comprehensive loading states
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import React from 'react';

interface SkeletonLoaderProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'table' | 'chart';
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
}

/**
 * @component SkeletonLoader
 * @description مكون skeleton متقدم لمحاكاة المحتوى أثناء التحميل مع رسوم متحركة احترافية
 * @param {SkeletonLoaderProps} props - خصائص المكون
 * @returns {JSX.Element} مكون skeleton مع الرسوم المتحركة
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  width,
  height,
  lines = 3,
  className = ''
}) => {
  const baseClasses = 'bg-gray-700 animate-pulse rounded';
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 w-full';
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return 'w-full';
      case 'card':
        return 'h-48 w-full';
      case 'table':
        return 'h-12 w-full';
      case 'chart':
        return 'h-64 w-full';
      default:
        return 'h-4 w-full';
    }
  };

  const getSkeletonContent = () => {
    switch (variant) {
      case 'text':
        return Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${getVariantClasses()} ${
              index === lines - 1 ? 'w-3/4' : 'w-full'
            } ${index > 0 ? 'mt-2' : ''}`}
            style={{ width, height }}
          />
        ));
      
      case 'circular':
        return (
          <div
            className={`${baseClasses} ${getVariantClasses()}`}
            style={{ width: width || height || '40px', height: height || width || '40px' }}
          />
        );
      
      case 'rectangular':
        return (
          <div
            className={`${baseClasses} ${getVariantClasses()}`}
            style={{ width: width || '100%', height: height || '200px' }}
          />
        );
      
      case 'card':
        return (
          <div className="border border-gray-700 rounded-lg p-4">
            <div className={`${baseClasses} h-6 w-3/4 mb-4`} />
            <div className={`${baseClasses} h-4 w-full mb-2`} />
            <div className={`${baseClasses} h-4 w-5/6 mb-2`} />
            <div className={`${baseClasses} h-4 w-4/6`} />
          </div>
        );
      
      case 'table':
        return (
          <div className="space-y-3">
            {Array.from({ length: 5 }, (_, rowIndex) => (
              <div key={rowIndex} className="flex space-x-4">
                {Array.from({ length: 4 }, (_, colIndex) => (
                  <div
                    key={colIndex}
                    className={`${baseClasses} h-4 flex-1`}
                  />
                ))}
              </div>
            ))}
          </div>
        );
      
      case 'chart':
        return (
          <div className="space-y-4">
            <div className={`${baseClasses} h-6 w-1/3`} />
            <div className="flex items-end space-x-2 h-48">
              {Array.from({ length: 8 }, (_, index) => (
                <div
                  key={index}
                  className={`${baseClasses} flex-1`}
                  style={{ height: `${Math.random() * 80 + 20}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className={`${baseClasses} h-3 w-16`}
                />
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div
            className={`${baseClasses} ${getVariantClasses()}`}
            style={{ width, height }}
          />
        );
    }
  };

  return (
    <div className={`skeleton-loader ${className}`}>
      {getSkeletonContent()}
    </div>
  );
};

/**
 * @component SkeletonCard
 * @description مكون skeleton مخصص للبطاقات
 */
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-gray-800 border border-gray-700 rounded-lg p-6 ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <div className="bg-gray-700 animate-pulse rounded-full w-12 h-12" />
      <div className="flex-1">
        <div className="bg-gray-700 animate-pulse rounded h-4 w-3/4 mb-2" />
        <div className="bg-gray-700 animate-pulse rounded h-3 w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="bg-gray-700 animate-pulse rounded h-4 w-full" />
      <div className="bg-gray-700 animate-pulse rounded h-4 w-5/6" />
      <div className="bg-gray-700 animate-pulse rounded h-4 w-4/6" />
    </div>
  </div>
);

/**
 * @component SkeletonTable
 * @description مكون skeleton مخصص للجداول
 */
export const SkeletonTable: React.FC<{ rows?: number; columns?: number; className?: string }> = ({
  rows = 5,
  columns = 4,
  className = ''
}) => (
  <div className={`space-y-3 ${className}`}>
    {/* Header */}
    <div className="flex space-x-4 pb-2 border-b border-gray-700">
      {Array.from({ length: columns }, (_, index) => (
        <div
          key={index}
          className="bg-gray-700 animate-pulse rounded h-4 flex-1"
        />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }, (_, rowIndex) => (
      <div key={rowIndex} className="flex space-x-4">
        {Array.from({ length: columns }, (_, colIndex) => (
          <div
            key={colIndex}
            className="bg-gray-700 animate-pulse rounded h-4 flex-1"
          />
        ))}
      </div>
    ))}
  </div>
);

/**
 * @component SkeletonChart
 * @description مكون skeleton مخصص للرسوم البيانية
 */
export const SkeletonChart: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    <div className="bg-gray-700 animate-pulse rounded h-6 w-1/3" />
    <div className="flex items-end space-x-2 h-48">
      {Array.from({ length: 8 }, (_, index) => (
        <div
          key={index}
          className="bg-gray-700 animate-pulse rounded flex-1"
          style={{ height: `${Math.random() * 80 + 20}%` }}
        />
      ))}
    </div>
    <div className="flex justify-between">
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className="bg-gray-700 animate-pulse rounded h-3 w-16"
        />
      ))}
    </div>
  </div>
);

export default SkeletonLoader;
