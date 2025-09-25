import React from 'react';

const VersionHint: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full flex justify-center items-center no-print ${className}`} aria-label="معلومات إصدار التطبيق" role="status">
      <div className="px-4 py-1 bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-full">
        <p className="text-xs text-gray-400 font-mono tracking-wider">
          <span className="text-purple-400 font-bold">Beta</span> v.1.2 | تحديث ٢٠ سبتمبر ٢٠٢٥
        </p>
      </div>
    </div>
  );
};

export default VersionHint;

