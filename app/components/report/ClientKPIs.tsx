import React from 'react';
import { CampaignReport } from '../../types';

interface ClientKPIsProps { kpis: CampaignReport['kpis']; printMode?: boolean; }

const BigNumberCard = ({ title, value, icon, printMode = false }: { title: string, value: string, icon: string, printMode?: boolean }) => (
    <div className={printMode ? 'bg-gray-100 p-6 rounded-2xl border border-gray-300 text-center' : 'bg-gray-800 p-6 rounded-2xl border border-gray-700 text-center'}>
        <div className="text-4xl mb-3">{icon}</div>
        <h4 className={`text-lg font-medium ${printMode ? 'text-gray-600' : 'text-gray-400'}`}>{title}</h4>
        {printMode ? (
            <p className="text-4xl font-extrabold text-purple-700 mt-1">{value}</p>
        ) : (
            <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mt-1">{value}</p>
        )}
    </div>
);

const ClientKPIs: React.FC<ClientKPIsProps> = ({ kpis, printMode = false }) => {
    const totals = kpis.totals;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <BigNumberCard title="العائد المتوقع" value={totals.roas > 0 ? `${totals.roas.toFixed(2)}x` : 'N/A'} icon="💰" printMode={printMode} />
            <BigNumberCard title="التحويلات" value={totals.conversions.toLocaleString('en-US')} icon="🤝" printMode={printMode} />
            <BigNumberCard title="النقرات" value={totals.clicks.toLocaleString('en-US')} icon="🖱️" printMode={printMode} />
            <BigNumberCard title="الظهور" value={totals.impressions.toLocaleString('en-US')} icon="👀" printMode={printMode} />
        </div>
    );
};

export default ClientKPIs;

