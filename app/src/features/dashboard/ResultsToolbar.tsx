import React from 'react';
import { FiDownload, FiShare2, FiPlus, FiSave, FiFolder } from 'react-icons/fi';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';

interface ResultsToolbarProps {
    onNewPlan: () => void;
    onSave: () => void;
    onOpen: () => void;
    onExportCenter: () => void;
}

const ResultsToolbar: React.FC<ResultsToolbarProps> = ({ onNewPlan, onSave, onOpen, onExportCenter }) => {
    return (
        <header className="relative sticky top-0 z-20 h-16 px-6 bg-brand-navy-800/90 backdrop-blur-sm border-b border-gray-700 flex items-center justify-between">
           {/* Left Section */}
           <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">
                <span className="text-prepilot-purple-400">PrePilot</span> / Dashboard
            </h1>
          </div>

          {/* Centered Buttons Section */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
            <Button variant="ghost" size="sm" leftIcon={<Icon as={FiDownload} />} onClick={onExportCenter}>Download</Button>
            <span className="text-gray-600">|</span>
            <Button variant="ghost" size="sm" leftIcon={<Icon as={FiShare2} />} onClick={onExportCenter}>Share</Button>
            <span className="text-gray-600">|</span>
            <Button variant="ghost" size="sm" leftIcon={<Icon as={FiSave} />} onClick={onSave}>Save</Button>
            <span className="text-gray-600">|</span>
            <Button variant="ghost" size="sm" leftIcon={<Icon as={FiFolder} />} onClick={onOpen}>Open</Button>
          </div>

          {/* Right Section */}
          <div className="flex items-center">
            <Button variant="primary" size="sm" leftIcon={<Icon as={FiPlus} />} onClick={onNewPlan}>New Report</Button>
          </div>
        </header>
    );
};

export default ResultsToolbar;