import React from 'react';
import { UIWarning } from '../../types';

const severityConfig = {
    high: { icon: '🔴', classes: 'bg-red-900/40 border-red-700/60 text-red-200' },
    medium: { icon: '🟠', classes: 'bg-yellow-900/40 border-yellow-700/60 text-yellow-200' },
    low: { icon: '🟡', classes: 'bg-sky-900/40 border-sky-700/60 text-sky-200' },
};

interface UIWarningsDisplayProps { warnings: UIWarning[]; }

const UIWarningsDisplay: React.FC<UIWarningsDisplayProps> = ({ warnings }) => {
    if (!warnings || warnings.length === 0) return null;

    const sortedWarnings = [...warnings].sort((a, b) => {
        const order = { high: 0, medium: 1, low: 2 } as const;
        return order[a.severity] - order[b.severity];
    });

    return (
        <div className="max-w-7xl mx-auto space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-center text-yellow-300">ملاحظات هامة على الخطة</h2>
            {sortedWarnings.map((warning, index) => {
                const config = severityConfig[warning.severity];
                return (
                    <div key={index} className={`p-4 rounded-xl border flex items-start gap-4 ${config.classes}`}>
                        <span className="text-2xl mt-0.5">{config.icon}</span>
                        <p className="text-base">{warning.message}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default UIWarningsDisplay;
