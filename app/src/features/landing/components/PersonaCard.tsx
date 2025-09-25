/**
 * Persona Card Component
 * Card component for showcasing target personas
 */

import React from 'react';

export interface PersonaCardProps {
  name: string;
  role: string;
  company: string;
  avatar: string;
  testimonial: string;
  stats: {
    label: string;
    value: string;
  }[];
  className?: string;
}

export const PersonaCard: React.FC<PersonaCardProps> = ({
  name,
  role,
  company,
  avatar,
  testimonial,
  stats,
  className = ''
}) => {
  return (
    <div className={`landing-card ${className}`}>
      {/* Header */}
      <div className="flex items-center mb-6">
        <img
          src={avatar}
          alt={`${name} - ${role}`}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="landing-text-h3 mb-1">{name}</h4>
          <p className="landing-text-body text-sm">
            {role} at {company}
          </p>
        </div>
      </div>

      {/* Testimonial */}
      <blockquote className="landing-text-body-lg mb-6 italic">
        "{testimonial}"
      </blockquote>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="landing-text-h2 text-purple-600 dark:text-purple-400">
              {stat.value}
            </div>
            <div className="landing-text-body text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
