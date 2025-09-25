import React from 'react';
import { ValidationFlag } from '../../types';

const StatusIcon = ({ severity }: { severity: ValidationFlag['severity'] }) => {
    switch (severity) {
        case 'high': return <span className="text-2xl ml-3">🔴</span>;
        case 'medium': return <span className="text-2xl ml-3">🟠</span>;
        case 'low': return <span className="text-2xl ml-3">🟡</span>;
        default: return null;
    }
};

const getStatusColor = (severity: ValidationFlag['severity']): string => {
    switch (severity) {
        case 'high': return 'border-red-700/50 bg-red-900/20';
        case 'medium': return 'border-yellow-700/50 bg-yellow-900/20';
        case 'low': return 'border-yellow-800/40 bg-yellow-900/10';
        default: return 'border-gray-700 bg-gray-900';
    }
}

const ValidationIndicators: React.FC<{ anomalies: ValidationFlag[] }> = ({ anomalies }) => {
    if (!anomalies || anomalies.length === 0) return <p className="text-gray-400 text-center">✅ كل المؤشرات تقع ضمن النطاق المتوقع للسوق.</p>;
    return (
        <div className="space-y-4">
            {anomalies.map((anomaly, index) => (
                <div key={index} className={`p-4 rounded-xl border flex items-start ${getStatusColor(anomaly.severity)}`}>
                    <StatusIcon severity={anomaly.severity} />
                    <div>
                        <p className="text-gray-200 font-semibold">{anomaly.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                           <span className="font-bold">{anomaly.kpi}:</span> متوقع <span className="font-mono">{anomaly.expected}</span> | الفعلي <span className="font-mono">{anomaly.actual}</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ValidationIndicators;

