import React from 'react';

const TrustSignals: React.FC = () => {
    const signals = [
        { icon: '🏆', text: `+5 سنوات خبرة في السوق السعودي` },
        { icon: '💰', text: `+10 مليون ريال إنفاق مُدار` },
        { icon: '👁️', text: `+2 مليار انطباع محلل` },
        { icon: '📊', text: 'بيانات مبنية على تقارير واقعية ومحدثة' },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {signals.map((signal, index) => (
                 <div key={index} className="bg-gray-900 p-4 rounded-xl border border-gray-700 flex items-center print:bg-gray-50 print:border-gray-200">
                    <span className="text-2xl ml-3">{signal.icon}</span>
                    <p className="text-gray-300 print:text-gray-800">{signal.text}</p>
                </div>
            ))}
        </div>
    );
};

export default TrustSignals;
