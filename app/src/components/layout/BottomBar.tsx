import React from 'react';
import Icon from '../ui/Icon';
import { FiHome, FiShare2, FiCpu, FiSettings, FiLifeBuoy } from 'react-icons/fi';
import { Page } from '../../types';
import { IconType } from 'react-icons';

interface BottomBarProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

const BottomBarItem: React.FC<{
  icon: IconType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 min-h-[60px] touch-target transition-all duration-200 relative ${
        isActive
          ? 'text-prepilot-purple-400'
          : 'text-gray-400 hover:text-white'
      }`}
      aria-label={label}
    >
      <div className={`p-2 rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-prepilot-purple-400/10' : ''
      }`}>
        <Icon as={icon} size={20} />
      </div>
      <span className="text-xs mt-1 font-medium">{label}</span>
      {isActive && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-prepilot-purple-400 rounded-full"></div>
      )}
    </button>
  );
};

const BottomBar: React.FC<BottomBarProps> = ({ currentPage, navigateTo }) => {
  const handleNavClick = (page: Page) => {
    navigateTo(page);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800 lg:hidden safe-area-bottom">
      <div className="flex justify-around items-center">
        <BottomBarItem
          label="الرئيسية"
          icon={FiHome}
          isActive={currentPage === 'home'}
          onClick={() => handleNavClick('home')}
        />
        <BottomBarItem
          label="التصدير"
          icon={FiShare2}
          isActive={currentPage === 'export-center'}
          onClick={() => handleNavClick('export-center')}
        />
        <BottomBarItem
          label="Playground"
          icon={FiCpu}
          isActive={currentPage === 'playground' || currentPage === 'processing' || currentPage === 'results-dashboard'}
          onClick={() => handleNavClick('playground')}
        />
        <BottomBarItem
          label="الإعدادات"
          icon={FiSettings}
          isActive={false}
          onClick={() => {}}
        />
        <BottomBarItem
          label="المساعدة"
          icon={FiLifeBuoy}
          isActive={false}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default BottomBar;
