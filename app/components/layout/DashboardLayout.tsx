import React, { useState } from 'react';
import Sidebar from './Sidebar';
import BottomBar from './BottomBar';
import Header from './Header';
import { Page } from '../../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, currentPage, navigateTo }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-row-reverse">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="container-responsive">
              {children}
            </div>
          </main>
        </div>
        
        {/* Desktop Sidebar */}
        <Sidebar 
          currentPage={currentPage} 
          navigateTo={navigateTo} 
        />
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 pb-20">
          <div className="container-responsive">
            {children}
          </div>
        </main>
        
        {/* Mobile Bottom Bar */}
        <BottomBar 
          currentPage={currentPage} 
          navigateTo={navigateTo} 
        />
      </div>
    </div>
  );
};

export default DashboardLayout;