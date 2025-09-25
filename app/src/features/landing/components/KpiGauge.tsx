/**
 * KPI Gauge Component
 * Animated semi-circular gauge for displaying key metrics
 */

import React from 'react';
import { motion } from 'framer-motion';

interface KpiGaugeProps {
  value: number;
  maxValue: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const KpiGauge: React.FC<KpiGaugeProps> = ({ 
  value, 
  maxValue, 
  label, 
  size = 'md',
  className = '' 
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const angle = (percentage / 100) * 180; // Semi-circle is 180 degrees
  
  // Color based on performance
  const getGaugeColor = (percentage: number) => {
    if (percentage < 30) return '#ef4444'; // red
    if (percentage < 60) return '#f59e0b'; // yellow
    if (percentage < 80) return '#3b82f6'; // blue
    return '#10b981'; // green
  };

  const gaugeColor = getGaugeColor(percentage);
  
  // Size configurations
  const sizeConfig = {
    sm: { radius: 60, strokeWidth: 8, fontSize: 'text-sm' },
    md: { radius: 80, strokeWidth: 10, fontSize: 'text-lg' },
    lg: { radius: 100, strokeWidth: 12, fontSize: 'text-xl' }
  };

  const config = sizeConfig[size];
  const centerX = config.radius + 20;
  const centerY = config.radius + 20;
  const radius = config.radius;

  // Create the arc path
  const createArcPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const backgroundPath = createArcPath(0, 180);
  const progressPath = createArcPath(0, angle);

  return (
    <div className={`relative ${className}`}>
      <svg 
        width={config.radius * 2 + 40} 
        height={config.radius + 40}
        className="overflow-visible"
      >
        {/* Background arc */}
        <path
          d={backgroundPath}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Progress arc */}
        <motion.path
          d={progressPath}
          fill="none"
          stroke={gaugeColor}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Needle */}
        <motion.line
          x1={centerX}
          y1={centerY}
          x2={polarToCartesian(centerX, centerY, radius - 10, angle).x}
          y2={polarToCartesian(centerX, centerY, radius - 10, angle).y}
          stroke={gaugeColor}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
        
        {/* Center dot */}
        <circle
          cx={centerX}
          cy={centerY}
          r="4"
          fill={gaugeColor}
        />
      </svg>
      
      {/* Value and label */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
        <motion.div
          className={`font-bold ${config.fontSize} text-gray-900 dark:text-white`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {value.toFixed(1)}x
        </motion.div>
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          {label}
        </div>
      </div>
    </div>
  );
};
