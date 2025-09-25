/**
 * Trust Badge Component
 * Component for displaying trust signals and social proof
 */

import React from 'react';

export interface TrustBadgeProps {
  logo: string;
  company: string;
  description?: string;
  className?: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  logo,
  company,
  description,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 ${className}`}>
      <img
        src={logo}
        alt={`${company} logo`}
        className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
      />
      {description && (
        <span className="ml-3 landing-text-body text-sm text-gray-600 dark:text-gray-400">
          {description}
        </span>
      )}
    </div>
  );
};
