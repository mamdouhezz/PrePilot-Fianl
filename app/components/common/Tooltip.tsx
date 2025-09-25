import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text, className = '' }) => {
  return (
    <span className={`relative group inline-block ${className}`}>
      {children}
      <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 w-60 p-3 bg-gray-950 text-white text-sm rounded-lg border border-gray-700 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 text-center">
        {text}
      </span>
    </span>
  );
};

export default Tooltip;

