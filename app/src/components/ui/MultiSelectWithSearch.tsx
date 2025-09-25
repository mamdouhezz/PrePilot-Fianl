import React, { useMemo, useState } from 'react';
import Tooltip from './Tooltip';
import InfoIcon from './InfoIcon';

interface Option { id: string; name: string; }

interface MultiSelectWithSearchProps {
  label: string;
  tooltipText: string;
  options: readonly Option[] | readonly string[];
  selected: string[];
  onToggle: (id: string) => void;
}

const MultiSelectWithSearch: React.FC<MultiSelectWithSearchProps> = ({ label, tooltipText, options, selected, onToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const formattedOptions = useMemo(() => options.map(o => (typeof o === 'string' ? { id: o, name: o } : o)), [options]);
  const selectedItems = useMemo(() => formattedOptions.filter(o => selected.includes(o.id)), [formattedOptions, selected]);
  const availableItems = useMemo(() => formattedOptions.filter(o => !selected.includes(o.id) && o.name.toLowerCase().includes(searchTerm.toLowerCase())), [formattedOptions, selected, searchTerm]);

  return (
    <div>
      <label className="flex items-center text-gray-300 mb-2">
        {label}
        <Tooltip text={tooltipText}>
          <InfoIcon className="inline-block mr-2 w-4 h-4 text-gray-400" />
        </Tooltip>
      </label>

      <div className="flex flex-wrap gap-2 p-2 bg-gray-950 border border-gray-700 rounded-lg min-h-[44px]">
        {selectedItems.length > 0 ? (
          selectedItems.map(item => (
            <span key={item.id} className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1.5">
              {item.name}
              <button type="button" onClick={() => onToggle(item.id)} className="bg-purple-800 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs hover:bg-red-500 transition-colors">
                &times;
              </button>
            </span>
          ))
        ) : (
          <span className="text-sm text-gray-500 px-1">لم يتم اختيار شيء بعد</span>
        )}
      </div>

      <div className="mt-2">
        <input
          type="text"
          placeholder="ابحث..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-1 focus:ring-purple-500 outline-none"
        />
        <div className="flex flex-wrap gap-2 mt-2 max-h-32 overflow-y-auto p-1">
          {availableItems.map(item => (
            <button key={item.id} type="button" onClick={() => onToggle(item.id)} className="px-2 py-1 bg-gray-700 text-gray-200 rounded-md text-sm hover:bg-green-600 hover:text-white transition-colors">
              + {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiSelectWithSearch;


