import React from 'react';
import { INDUSTRIES } from '../../../constants';
import { AnimatePresence, motion } from 'framer-motion';

interface IndustrySelectorProps {
    selectedIndustry: string;
    selectedSubIndustry: string;
    onSelect: (industry: string, subIndustry: string) => void;
}

const IndustrySelector: React.FC<IndustrySelectorProps> = ({ selectedIndustry, selectedSubIndustry, onSelect }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [hoveredIndustry, setHoveredIndustry] = React.useState<string | null>(null);
    const [searchTerm, setSearchTerm] = React.useState('');

    const displayValue = selectedIndustry && selectedSubIndustry
        ? `${selectedIndustry} / ${selectedSubIndustry}`
        : 'اختر المجال الرئيسي والفرعي';

    const mainIndustries = React.useMemo(() => Object.keys(INDUSTRIES), []);

    const filteredIndustries = React.useMemo(() => {
        if (!searchTerm.trim()) return mainIndustries;
        const term = searchTerm.trim().toLowerCase();
        return mainIndustries.filter(ind =>
            ind.toLowerCase().includes(term) ||
            (INDUSTRIES[ind as keyof typeof INDUSTRIES] as readonly string[]).some(sub => sub.toLowerCase().includes(term))
        );
    }, [mainIndustries, searchTerm]);

    const subIndustriesForHovered = React.useMemo(() => {
        if (!hoveredIndustry) return [] as string[];
        const subs = INDUSTRIES[hoveredIndustry as keyof typeof INDUSTRIES] as readonly string[];
        if (!searchTerm.trim()) return subs as string[];
        const term = searchTerm.trim().toLowerCase();
        return subs.filter(s => s.toLowerCase().includes(term)) as string[];
    }, [hoveredIndustry, searchTerm]);

    React.useEffect(() => {
        if (!isOpen) setSearchTerm('');
    }, [isOpen]);

    React.useEffect(() => {
        if (isOpen && !hoveredIndustry && filteredIndustries.length > 0) {
            setHoveredIndustry(filteredIndustries[0] ?? null);
        }
    }, [isOpen, hoveredIndustry, filteredIndustries]);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(o => !o)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-right focus:ring-2 focus:ring-prepilot-purple-500 focus:border-prepilot-purple-500"
            >
                <span className={selectedIndustry ? 'text-white' : 'text-gray-400'}>{displayValue}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 mt-2 w-full bg-brand-navy-950 border border-gray-700 rounded-xl shadow-xl overflow-hidden"
                    >
                        <div className="p-3 border-b border-gray-800">
                            <input
                                type="text"
                                placeholder="ابحث عن المجال أو المجال الفرعي..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-prepilot-purple-500 outline-none"
                            />
                        </div>
                        <div className="flex max-h-80">
                            <div className="w-1/2 border-l border-gray-800 overflow-y-auto">
                                {filteredIndustries.map(ind => (
                                    <button
                                        key={ind}
                                        type="button"
                                        onMouseEnter={() => setHoveredIndustry(ind)}
                                        className={`w-full text-right px-4 py-2 transition-colors ${hoveredIndustry === ind ? 'bg-prepilot-purple-900/30 text-prepilot-purple-200' : 'hover:bg-gray-800'}`}
                                    >
                                        {ind}
                                    </button>
                                ))}
                            </div>
                            <div className="w-1/2 overflow-y-auto">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={hoveredIndustry || 'empty'}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ duration: 0.15 }}
                                        className="p-2"
                                    >
                                        {hoveredIndustry ? (
                                            (subIndustriesForHovered.length > 0 ? subIndustriesForHovered : (INDUSTRIES[hoveredIndustry as keyof typeof INDUSTRIES] as readonly string[])).map(sub => (
                                                <button
                                                    key={sub}
                                                    type="button"
                                                    onClick={() => { onSelect(hoveredIndustry, sub); setIsOpen(false); }}
                                                    className="w-full text-right px-4 py-2 rounded-md hover:bg-gray-800"
                                                >
                                                    {sub}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="text-gray-500 text-sm px-4 py-2">اختر مجالاً رئيسيًا لعرض المجالات الفرعية</div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default IndustrySelector;


