/**
 * @file App.tsx
 * @description Main application component with lazy loading implementation for optimal performance
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import ErrorBoundary from './components/common/ErrorBoundary';
import { GenericErrorBoundary, PageErrorBoundary } from './components/layout/GenericErrorBoundary';
import LoadingSpinner from './components/ui/LoadingSpinner';
// PWA install/update prompts
import { PWAInstallPrompt } from './src/components/ui/PWAUpdatePrompt';
// import { PerformanceMonitor, OfflineIndicator } from './src/components/ui/PerformanceMonitor';
// import { useExportStore } from './stores/exportStore';
import { useReportStore } from './src/stores/reportStore';
import { Page, CampaignData, CampaignReport } from './types';
import { runCampaign } from './src/engine';

// Lazy load page components for optimal performance
const HomePage = React.lazy(() => import('./src/pages/HomePage'));
const ExportCenterPage = React.lazy(() => import('./src/pages/ExportCenterPage'));
const PlaygroundPage = React.lazy(() => import('./src/pages/PlaygroundPage'));
const ProcessingPage = React.lazy(() => import('./src/pages/ProcessingPage'));
const ResultsDashboardPage = React.lazy(() => import('./src/pages/ResultsDashboardPage'));

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [latestReportId, setLatestReportId] = useState<string | null>(null);
  
  // Initialize mock report for testing
  const initializeMockReport = useReportStore(state => state.initializeMockReport);
  
  // Temporarily disabled Zustand stores
  // const initializeMockReports = useExportStore(state => state.initializeMockReports);
  // const processQueue = useExportStore(state => state.processQueue);

  useEffect(() => {
    initializeMockReport();
  }, [initializeMockReport]);

  // useEffect(() => {
  //   initializeMockReports();
  // }, [initializeMockReports]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     processQueue();
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, [processQueue]);

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);
  
  const handleGeneratePlan = async (formData: CampaignData) => {
    navigateTo('processing');
    try {
      const report = await runCampaign(formData);
      if ('errors' in report) {
        alert(`Failed to generate report: ${report.errors.join(', ')}`);
        navigateTo('playground');
        return;
      }
      const id = `report-${Date.now()}`;
      // Save report to store
      useReportStore.getState().setReport(id, report as CampaignReport);
      setLatestReportId(id);
      navigateTo('results-dashboard');
    } catch (error) {
      console.error("Failed to generate report", error);
      alert("An unexpected error occurred while generating the report. Please try again.");
      navigateTo('playground');
    }
  };

  const handleCreateNewPlan = () => navigateTo('playground');
  const handleNavigateToExportCenter = () => navigateTo('export-center');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <PageErrorBoundary pageName="الرئيسية">
            <HomePage navigateTo={navigateTo} />
          </PageErrorBoundary>
        );
      case 'export-center':
        return (
          <PageErrorBoundary pageName="مركز التصدير">
            <ExportCenterPage onNavigateToNewPlan={handleCreateNewPlan} />
          </PageErrorBoundary>
        );
      case 'playground':
        return (
          <PageErrorBoundary pageName="منصة الإبداع">
            <PlaygroundPage onGeneratePlan={handleGeneratePlan} navigateTo={navigateTo} />
          </PageErrorBoundary>
        );
      case 'processing':
        return (
          <PageErrorBoundary pageName="المعالجة">
            <ProcessingPage />
          </PageErrorBoundary>
        );
      case 'results-dashboard':
        return (
          <PageErrorBoundary pageName="لوحة النتائج">
            <ResultsDashboardPage 
              reportId={latestReportId} 
              navigateTo={navigateTo}
              onNewPlan={handleCreateNewPlan}
              onNavigateToExportCenter={handleNavigateToExportCenter}
            />
          </PageErrorBoundary>
        );
      default:
        return (
          <PageErrorBoundary pageName="الرئيسية">
            <HomePage navigateTo={navigateTo} />
          </PageErrorBoundary>
        );
    }
  };

  // Pages without sidebar
  if (currentPage === 'results-dashboard' || currentPage === 'playground' || currentPage === 'home') {
    return (
      <GenericErrorBoundary context="التطبيق الرئيسي">
        <Suspense fallback={<LoadingSpinner />}>
          {renderPage()}
        </Suspense>
      </GenericErrorBoundary>
    );
  }

  return (
    <GenericErrorBoundary context="التطبيق الرئيسي">
      <DashboardLayout currentPage={currentPage} navigateTo={navigateTo}>
        <Suspense fallback={<LoadingSpinner size="sm" className="min-h-[400px]" />}>
          {renderPage()}
        </Suspense>
      </DashboardLayout>
      
      {/* PWA Install prompt */}
      <PWAInstallPrompt />
      
      {/* Performance Monitoring temporarily disabled */}
      {/* <PerformanceMonitor /> */}
      {/* <OfflineIndicator /> */}
    </GenericErrorBoundary>
  );
};

export default App;