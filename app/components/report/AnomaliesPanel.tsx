import React from 'react';
import { ValidationFlag } from '../../types';

const iconMap: { [key in ValidationFlag['severity']]: string } = {
    high: '🔴', medium: '🟠', low: '🟡'
};

const colorMap: { [key in ValidationFlag['severity']]: string } = {
    high: 'border-red-700/50 bg-red-900/20',
    medium: 'border-yellow-700/50 bg-yellow-900/20',
    low: 'border-yellow-800/40 bg-yellow-900/10'
};

const AnomalyItem = ({ anomaly }: { anomaly: ValidationFlag }) => (
    <div className={`p-4 rounded-xl border flex items-start ${colorMap[anomaly.severity]}`}>
        <span className="text-2xl ms-3">{iconMap[anomaly.severity]}</span>
        <div>
            <p className="text-gray-200 font-semibold">{anomaly.message}</p>
            {anomaly.expected != null && anomaly.actual != null && (
                <p className="text-xs text-gray-400 mt-1">
                    <span className="font-bold">{anomaly.kpi}:</span> متوقع <span className="font-mono">{anomaly.expected}</span> | الفعلي <span className="font-mono">{anomaly.actual}</span>
                </p>
            )}
        </div>
    </div>
);

const AnomaliesPanel: React.FC<{ anomalies: ValidationFlag[] }> = ({ anomalies }) => {
    if (!anomalies || anomalies.length === 0) {
        return <p className="text-gray-400 text-center">✅ كل المؤشرات تقع ضمن النطاق المتوقع للسوق.</p>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h4 className="text-lg font-bold text-red-400 mb-3">التنبيهات</h4>
                <div className="space-y-3">
                    {anomalies.map((anomaly, index) => (
                        <div key={`anomaly-${index}`}>
                            <AnomalyItem anomaly={anomaly} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnomaliesPanel;