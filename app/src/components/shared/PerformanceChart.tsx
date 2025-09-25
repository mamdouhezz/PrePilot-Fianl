import React, { useState, useEffect } from 'react';
import { CampaignReport } from '../../types';
import { PLATFORMS } from '../../constants';

interface PerformanceChartProps {
    kpis: CampaignReport['kpis']['perPlatform'];
    metric: 'roas' | 'conversions' | 'clicks' | 'cac';
    title: string;
}

const ChartBar = ({ item, maxValue, metric, delay }: { item: any, maxValue: number, metric: string, delay: number }) => {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const target = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
        const timer = setTimeout(() => setWidth(target), delay);
        return () => clearTimeout(timer);
    }, [item.value, maxValue, delay]);
    return (
        <div className="grid grid-cols-4 items-center gap-2 text-sm opacity-0 animate-fade-in" style={{ animationDelay: `${delay}ms`}}>
            <span className="col-span-1 text-gray-300 truncate print:text-gray-700">{item.name}</span>
            <div className="col-span-3 bg-gray-800 rounded-full h-6 print:bg-gray-200">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-6 rounded-full flex items-center justify-end px-2 transition-all duration-1000 ease-out" style={{ width: `${width}%` }}>
                    <span className="font-bold text-white text-xs print:text-black">
                        {metric === 'roas' ? `${item.value.toFixed(2)}x` : item.value.toLocaleString('en-US')}
                    </span>
                </div>
            </div>
        </div>
    );
};

const PerformanceChart: React.FC<PerformanceChartProps> = ({ kpis, metric, title }) => {
    const chartData = Object.entries(kpis).map(([platformId, data]) => ({
        id: platformId,
        name: PLATFORMS.find(p => p.id === platformId)?.name || platformId,
        value: (data as any)[metric],
    })).sort((a, b) => b.value - a.value);
    const maxValue = Math.max(...chartData.map(d => d.value), 0);
    return (
        <div>
            <h4 className="text-lg font-bold text-gray-200 mb-4 print:text-black">{title}</h4>
            <div className="space-y-4">
                {chartData.map((item, index) => (
                    <div key={item.id}>
                        <ChartBar item={item} maxValue={maxValue} metric={metric} delay={index * 100} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PerformanceChart;

