import React from 'react';
import Icon from '../ui/Icon';
import { FiHome, FiShare2, FiCpu, FiSettings, FiLifeBuoy } from 'react-icons/fi';
import { Page } from '../../types';
import { IconType } from 'react-icons';

interface SidebarProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

const NavItem: React.FC<{
  icon: IconType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-3 sm:px-4 py-3 text-base sm:text-lg font-bold rounded-lg transition-colors duration-200 touch-target ${
        isActive
          ? 'bg-prepilot-purple-600 text-white'
          : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
      }`}
    >
      <Icon as={icon} className="ms-3 sm:ms-4" size={20} />
      <span className="text-sm sm:text-base">{label}</span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentPage, navigateTo }) => {
  const handleNavClick = (page: Page) => {
    navigateTo(page);
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-gray-900 border-l border-gray-800 p-4">
      {/* Desktop Spacer */}
      <div className="mb-10 h-16">
        {/* The header has the title, this space is to align with content */}
      </div>

      <nav className="flex flex-col gap-2 sm:gap-3 flex-grow">
        <NavItem
          label="الرئيسية"
          icon={FiHome}
          isActive={currentPage === 'home'}
          onClick={() => handleNavClick('home')}
        />
        <NavItem
          label="مركز التصدير"
          icon={FiShare2}
          isActive={currentPage === 'export-center'}
          onClick={() => handleNavClick('export-center')}
        />
        <NavItem
          label="Playground"
          icon={FiCpu}
          isActive={currentPage === 'playground' || currentPage === 'processing' || currentPage === 'results-dashboard'}
          onClick={() => handleNavClick('playground')}
        />
      </nav>

      <div className="flex flex-col gap-2 sm:gap-3">
        <NavItem
            label="الإعدادات"
            icon={FiSettings}
            isActive={false}
            onClick={() => {}}
        />
        <NavItem
            label="المساعدة والدعم"
            icon={FiLifeBuoy}
            isActive={false}
            onClick={() => {}}
        />
      </div>
    </aside>
  );
};

export default Sidebar;