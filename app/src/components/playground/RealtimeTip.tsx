import React from 'react';

type Props = {
    fieldName: string;
    tips: Record<string, string>;
    isLoading: boolean;
};

const RealtimeTip: React.FC<Props> = ({ fieldName, tips, isLoading }) => {
    const text = tips[fieldName];
    console.log('🧩 RealtimeTip props:', { fieldName, tips, isLoading, text });
    return (
        <div className="min-h-[24px] mt-3">
            {isLoading && <div className="flex items-center justify-center text-sm text-prepilot-purple-300 animate-pulse text-center mt-2">يفكر...</div>}
            {!isLoading && text && (
                <div className="p-3 text-sm text-red-300 bg-red-900/30 border border-red-800/60 rounded-lg animate-fade-in">
                    {text}
                </div>
            )}
        </div>
    );
};

export default RealtimeTip;


