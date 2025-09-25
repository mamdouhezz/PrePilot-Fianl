import React, { useState } from 'react';
import ReportSidebar from './ReportSidebar';
import ReportBottomBar from './ReportBottomBar';
import ReportToolbar from './ReportToolbar';
import Header from './Header';
import { Page } from '../../types';

interface ReportDashboardLayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  navigateTo: (page: Page) => void;
  onExport?: (format: string) => void;
  onPrint?: () => void;
  onShare?: () => void;
  showToolbar?: boolean;
  activeSection?: string;
  onSectionClick?: (sectionId: string) => void;
}

const ReportDashboardLayout: React.FC<ReportDashboardLayoutProps> = ({ 
  children, 
  currentPage, 
  navigateTo,
  onExport,
  onPrint,
  onShare,
  showToolbar = true,
  activeSection,
  onSectionClick
}) => {
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
              {/* Toolbar */}
              {showToolbar && (
                <div className="mb-6">
                  <ReportToolbar 
                    onExport={onExport}
                    onPrint={onPrint}
                    onShare={onShare}
                  />
                </div>
              )}
              
              {/* Main Content */}
              {children}
            </div>
          </main>
        </div>
        
        {/* Desktop Sidebar */}
        <ReportSidebar 
          currentPage={currentPage} 
          navigateTo={navigateTo}
          onExport={onExport}
          onPrint={onPrint}
          activeSection={activeSection}
          onSectionClick={onSectionClick}
        />
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 pb-20">
          <div className="container-responsive">
            {/* Toolbar */}
            {showToolbar && (
              <div className="mb-4">
                <ReportToolbar 
                  onExport={onExport}
                  onPrint={onPrint}
                  onShare={onShare}
                />
              </div>
            )}
            
            {/* Main Content */}
            {children}
          </div>
        </main>
        
        {/* Mobile Bottom Bar */}
        <ReportBottomBar 
          currentPage={currentPage} 
          navigateTo={navigateTo}
          onExport={onExport}
          onPrint={onPrint}
          activeSection={activeSection}
          onSectionClick={onSectionClick}
        />
      </div>
    </div>
  );
};

export default ReportDashboardLayout;
