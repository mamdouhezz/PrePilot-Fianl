
import React from 'react';
import Icon from '../ui/Icon';
import { FiBell, FiMenu } from 'react-icons/fi';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 safe-area-top">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile menu button - only show on desktop */}
        <button 
          onClick={toggleSidebar}
          className="hidden lg:block p-2 text-gray-400 rounded-lg hover:text-white hover:bg-gray-700 touch-target"
          aria-label="فتح القائمة"
        >
          <Icon as={FiMenu} size={20} />
        </button>
        
        {/* Logo */}
        <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-white">
            <span className="text-prepilot-purple-400">PrePilot</span> v3
        </h1>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications - hide on mobile to save space */}
        <button className="hidden sm:block p-2 text-gray-400 rounded-lg hover:text-white hover:bg-gray-700 touch-target" aria-label="الإشعارات">
          <Icon as={FiBell} size={18} />
        </button>
        
        {/* User Avatar */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full overflow-hidden">
            <img 
              src="https://picsum.photos/40/40" 
              alt="صورة المستخدم" 
              className="w-full h-full object-cover"
            />
        </div>
      </div>
    </header>
  );
};

export default Header;
