/**
 * Feature Card Component
 * Reusable card component for showcasing features
 */

import React from 'react';

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  highlight = false,
  className = ''
}) => {
  return (
    <div className={`landing-card-feature ${highlight ? 'ring-2 ring-purple-500/20' : ''} ${className}`}>
      <div className="flex justify-center mb-6">
        <div className={`p-4 rounded-2xl ${highlight ? 'bg-gradient-to-br from-purple-500 to-yellow-500' : 'bg-gray-100 dark:bg-gray-800'}`}>
          {icon}
        </div>
      </div>
      
      <h3 className="landing-text-h3 mb-4">
        {title}
      </h3>
      
      <p className="landing-text-body">
        {description}
      </p>
    </div>
  );
};
