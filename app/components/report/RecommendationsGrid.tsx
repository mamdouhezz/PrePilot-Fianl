import React from 'react';

interface RecommendationsGridProps { recommendations: string[]; }

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 flex-shrink-0 ms-3 print:text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const RecommendationsGrid: React.FC<RecommendationsGridProps> = ({ recommendations }) => {
    return (
        <div className="space-y-4">
            {recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-900 p-4 rounded-xl border border-gray-700 flex items-start print:bg-gray-50 print:border-gray-200">
                    <CheckIcon />
                    <p className="text-gray-300 print:text-gray-800">{rec}</p>
                </div>
            ))}
        </div>
    );
};

export default RecommendationsGrid;