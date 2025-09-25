import React, { useState, useEffect } from 'react';
import ResultsSidebar from './ResultsSidebar';
import ResultsToolbar from './ResultsToolbar';
import { Page } from '../../types';

interface ResultsLayoutProps {
    children: React.ReactNode;
    onNewPlan: () => void;
    onSave: () => void;
    onOpen: () => void;
    onExportCenter: () => void;
    activeSection: string;
    onItemClick: (id: string) => void;
}

const ResultsLayout: React.FC<ResultsLayoutProps> = ({ children, onNewPlan, onSave, onOpen, onExportCenter, activeSection, onItemClick }) => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = window.localStorage.getItem('sidebarCollapsed');
            return saved !== null ? JSON.parse(saved) : false;
        }
        return false;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
        }
    }, [isSidebarCollapsed]);

    return (
        <div className="min-h-screen bg-brand-navy-900 text-gray-200">
            <ResultsToolbar 
                onNewPlan={onNewPlan}
                onSave={onSave}
                onOpen={onOpen}
                onExportCenter={onExportCenter}
            />
            <div className="relative">
                <ResultsSidebar 
                    isCollapsed={isSidebarCollapsed} 
                    setIsCollapsed={setSidebarCollapsed} 
                    activeSection={activeSection}
                    onItemClick={onItemClick}
                />
                <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'ms-20' : 'ms-64'}`}>
                    <div className="p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ResultsLayout;