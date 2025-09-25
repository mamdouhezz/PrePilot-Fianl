import React, { useState } from 'react';
import { CampaignReport } from '../../types';

interface AccordionItemProps {
    title: string;
    content: string;
    defaultOpen?: boolean;
}

// FIX: Changed to a React.FC with an interface to solve the 'key' prop error.
const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-700 last:border-b-0">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-right p-4 focus:outline-none hover:bg-gray-800/50">
                <span className="text-lg font-medium">{title}</span>
                <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && (
                <div className="p-4 bg-gray-800/50">
                    <p className="text-gray-300 whitespace-pre-line">{content}</p>
                </div>
            )}
        </div>
    );
};


interface ExplainabilityAccordionProps {
    explanations: { [metric: string]: string };
    corrections: CampaignReport['corrections'];
}


const ExplainabilityAccordion: React.FC<ExplainabilityAccordionProps> = ({ explanations, corrections }) => {
    return (
        <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
            {corrections && corrections.length > 0 && (
                <div className="p-4 bg-yellow-900/20 border-b border-yellow-700/50">
                   <h4 className="font-bold text-yellow-300 text-lg">⚠️ تعديلات تلقائية للواقعية</h4>
                   <p className="text-sm text-yellow-200/80 mt-1 mb-3">لاحظنا أن بعض الأرقام الأولية كانت خارج النطاق المنطقي للسوق، فقمنا بتعديلها:</p>
                   <ul className="space-y-2 text-sm">
                        {corrections.map((corr, i) => (
                            <li key={i} className="bg-black/20 p-2 rounded-md">
                                <span className="font-bold text-gray-200">{corr.field}:</span>
                                <span className="text-gray-300 block">
                                    تعدل من <span className="font-mono text-red-400 line-through">{typeof corr.from === 'number' ? corr.from.toFixed(2) : 'N/A'}</span> إلى <span className="font-mono text-green-400">{typeof corr.to === 'number' ? corr.to.toFixed(2) : String(corr.to)}</span>
                                </span>
                                <span className="text-xs text-gray-400 block">السبب: {corr.rule}</span>
                            </li>
                        ))}
                   </ul>
                </div>
            )}
            {Object.entries(explanations).map(([metric, explanation], index) => (
                // FIX: Removed unnecessary `as string` cast.
                <AccordionItem key={metric} title={`لماذا تم تقدير ${metric} بهذا الشكل؟`} content={explanation} defaultOpen={index === 0 && (!corrections || corrections.length === 0)} />
            ))}
        </div>
    );
};

export default ExplainabilityAccordion;
