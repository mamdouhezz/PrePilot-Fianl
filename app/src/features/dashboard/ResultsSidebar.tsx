import React, { useState, useEffect, useRef } from 'react';
import {
  FiHome, FiBarChart2, FiGrid, FiSearch, FiPieChart, FiCpu,
  FiTrendingUp, FiSettings, FiChevronLeft, FiChevronRight, FiAward
} from 'react-icons/fi';
import Icon from '../ui/Icon';
import { IconType } from 'react-icons';

// Sub-component for navigation items
interface SidebarItemProps {
  icon: IconType;
  label: string;
  href: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href, isActive, isCollapsed, onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`flex items-center p-3 rounded-lg transition-colors group relative
        ${isActive
          ? 'bg-prepilot-purple-900 text-prepilot-purple-300 font-semibold'
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        }
        ${isCollapsed ? 'justify-center' : ''}`
      }
    >
      <Icon as={icon} size={20} />
      <span className={`ms-4 whitespace-nowrap transition-all duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
        {label}
      </span>
      {isCollapsed && (
        <span className="absolute start-full ms-4 w-auto p-2 min-w-max rounded-md shadow-md text-white bg-gray-800 border border-gray-700 text-xs font-bold transition-all duration-100 scale-0 group-hover:scale-100 origin-start z-20">
          {label}
        </span>
      )}
    </a>
  );
};

// Main Sidebar Component
interface ResultsSidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
    activeSection: string;
    onItemClick: (id: string) => void;
}

const navItems = [
    { id: 'strategic-summary', label: 'الملخص الاستراتيجي', icon: FiHome },
    { id: 'kpi-snippets', label: 'المؤشرات الرئيسية', icon: FiGrid },
    { id: 'media-plan', label: 'الخطة الإعلامية', icon: FiBarChart2 },
    { id: 'growth-funnel', label: 'قمع النمو', icon: FiTrendingUp },
    { id: 'beyond-kpis', label: 'ما وراء المؤشرات', icon: FiSearch },
    { id: 'beyond-budget', label: 'ما وراء الميزانية', icon: FiPieChart },
    { id: 'advanced-recommendations', label: 'التوصيات المتقدمة', icon: FiAward },
];


const ResultsSidebar: React.FC<ResultsSidebarProps> = ({ isCollapsed, setIsCollapsed, activeSection, onItemClick }) => {
  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onItemClick(sectionId);
  };

  return (
    <aside aria-label="Sidebar Navigation" className={`fixed top-16 start-0 h-[calc(100vh-4rem)] bg-brand-navy-900 border-e border-gray-800 flex flex-col transition-all duration-300 z-30 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        {navItems.map(item => (
          <SidebarItem
            key={item.id}
            href={`#${item.id}`}
            label={item.label}
            icon={item.icon}
            isActive={activeSection === item.id}
            isCollapsed={isCollapsed}
            onClick={(e) => handleItemClick(e, item.id)}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800 space-y-2">
        <SidebarItem
            href="#"
            label="Settings"
            icon={FiSettings}
            isActive={false}
            isCollapsed={isCollapsed}
            onClick={(e) => e.preventDefault()}
        />
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`w-full flex items-center p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors ${isCollapsed ? 'justify-center' : ''}`}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon as={isCollapsed ? FiChevronRight : FiChevronLeft} size={20} />
           <span className={`ms-4 whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            Collapse
           </span>
        </button>
      </div>
    </aside>
  );
};

export default ResultsSidebar;