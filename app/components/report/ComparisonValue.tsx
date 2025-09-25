import React from 'react';

interface ComparisonValueProps {
  newValue: number;
  originalValue: number;
  format: 'number' | 'currency' | 'roas';
  className?: string;
  isPositiveGood?: boolean;
}

const ComparisonValue: React.FC<ComparisonValueProps> = ({ 
  newValue, originalValue, format, className = '', isPositiveGood = true 
}) => {
  const delta = newValue - originalValue;
  const percentageChange = originalValue !== 0 ? (delta / Math.abs(originalValue)) * 100 : (newValue > 0 ? 100 : 0);
  const isPositive = delta >= 0;
  
  let changeColor = 'text-gray-400';
  if (Math.abs(delta) > 0.001) {
      if ((isPositive && isPositiveGood) || (!isPositive && !isPositiveGood)) {
        changeColor = 'text-green-400';
      } else {
        changeColor = 'text-red-400';
      }
  }

  const formatValue = (value: number, includeSign = false) => {
    const sign = value > 0 && includeSign ? '+' : '';
    switch (format) {
      case 'currency': return `${sign}${value.toLocaleString('en-US', { maximumFractionDigits: 0 })} ريال`;
      case 'roas': return `${sign}${value.toFixed(2)}x`;
      default: return `${sign}${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
  };

  return (
    <div className={`text-center ${className}`}>
      <p className="text-2xl font-bold">{formatValue(newValue)}</p>
      {Math.abs(delta) > 0.001 && (
        <div className={`flex items-center justify-center gap-1 text-sm font-semibold font-mono ${changeColor}`}>
          <span>{isPositive ? '▲' : '▼'}</span>
          <span>{formatValue(delta, true)}</span>
          <span className="text-xs">({percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(0)}%)</span>
        </div>
      )}
    </div>
  );
};

export default ComparisonValue;
