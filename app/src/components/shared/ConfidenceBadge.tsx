import React from 'react';

const ConfidenceBadge: React.FC<{ confidence: number }> = ({ confidence }) => {
    const percentage = Math.round(confidence * 100);
    let config: { label: string; color: string; icon: string };

    if (confidence >= 0.8) {
        config = { label: 'ثقة عالية', color: 'bg-green-500/20 text-green-300 border-green-500/30', icon: '✅' };
    } else if (confidence >= 0.6) {
        config = { label: 'ثقة متوسطة', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', icon: '🤔' };
    } else {
        config = { label: 'ثقة منخفضة', color: 'bg-red-500/20 text-red-300 border-red-500/30', icon: '⚠️' };
    }

    return (
        <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold ${config.color}`}
            title={`The AI is ${percentage}% confident that these results are realistic and achievable based on market data.`}
        >
            <span>{config.icon}</span>
            <span>{config.label}</span>
            <span className="font-mono text-xs opacity-80">({percentage}%)</span>
        </div>
    );
};

export default ConfidenceBadge;
