import React, { useRef, useState, useEffect } from 'react';
import { useReportStore } from '../stores/reportStore';
import { Page } from '../types';
import Button from '../../components/ui/Button';
import { StrategicSummary, KPISnippets, MediaPlan, BeyondKPIs, BeyondBudgetAllocation, UIWarningsDisplay, AdvancedRecommendations, GrowthFunnel } from '../../components/report';
import { ReportDashboardLayout } from '../../components/layout';
import { ExportToolbar } from '../../components/export';

const SectionAnchor: React.FC<{ id: string, children: React.ReactNode }> = ({ id, children }) => (
    <section id={id} className="scroll-mt-24 space-y-6">
        {children}
    </section>
);

interface ResultsDashboardPageProps {
  reportId: string | null;
  navigateTo: (page: Page) => void;
  onNewPlan: () => void;
  onNavigateToExportCenter: () => void;
}

const ResultsDashboardPage: React.FC<ResultsDashboardPageProps> = ({ reportId, navigateTo, onNewPlan, onNavigateToExportCenter }) => {
  const report = useReportStore(state => reportId ? state.getReportById(reportId) : null);
  const [activeSection, setActiveSection] = useState('strategic-summary');
  
  const strategicSummaryRef = useRef<HTMLDivElement>(null);
  const kpiSnippetsRef = useRef<HTMLDivElement>(null);
  const mediaPlanRef = useRef<HTMLDivElement>(null);
  const growthFunnelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!report) return;
    const sectionElements = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px', threshold: 0 }
    );
  
    sectionElements.forEach((el) => observer.observe(el));
    
    return () => sectionElements.forEach((el) => observer.unobserve(el));
  }, [report]);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of sticky toolbar + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };
  
  const handleSavePlan = () => {
    alert('Plan saved!'); // Placeholder for save functionality
  };

  const handleExport = (format: string) => {
    console.log(`Exporting report as ${format}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    console.log('Sharing report');
  };

  if (!report) {
    return (
      <ReportDashboardLayout
        currentPage="results-dashboard"
        navigateTo={navigateTo}
        onExport={handleExport}
        onPrint={handlePrint}
        onShare={handleShare}
        showToolbar={false}
        activeSection={activeSection}
        onSectionClick={handleNavClick}
      >
        <div className="flex flex-col items-center justify-center h-screen bg-brand-navy-900 text-white">
          <h2 className="text-2xl font-bold">لم يتم العثور على التقرير</h2>
          <p className="text-gray-400 mt-2">قد يكون قد تم حذفه أو أن الرابط غير صحيح.</p>
          <Button onClick={() => navigateTo('home')} className="mt-4">العودة للرئيسية</Button>
        </div>
      </ReportDashboardLayout>
    );
  }

  return (
    <ReportDashboardLayout
      currentPage="results-dashboard"
      navigateTo={navigateTo}
      onExport={handleExport}
      onPrint={handlePrint}
      onShare={handleShare}
      showToolbar={true}
      activeSection={activeSection}
      onSectionClick={handleNavClick}
    >
      <div className="space-y-12">
        {report.uiWarnings && report.uiWarnings.length > 0 && <UIWarningsDisplay warnings={report.uiWarnings} />}
        
        <SectionAnchor id="strategic-summary">
          <div ref={strategicSummaryRef}><StrategicSummary report={report} /></div>
          <ExportToolbar sectionId="strategic-summary" report={report} elementRef={strategicSummaryRef} />
        </SectionAnchor>

        <SectionAnchor id="kpi-snippets">
          <div ref={kpiSnippetsRef}><KPISnippets report={report} /></div>
          <ExportToolbar sectionId="kpi-snippets" report={report} elementRef={kpiSnippetsRef} />
        </SectionAnchor>

        <SectionAnchor id="media-plan">
          <div ref={mediaPlanRef}><MediaPlan report={report} /></div>
          <ExportToolbar sectionId="media-plan" report={report} elementRef={mediaPlanRef} />
        </SectionAnchor>
        
        <SectionAnchor id="growth-funnel">
          <div ref={growthFunnelRef}><GrowthFunnel report={report} /></div>
          <ExportToolbar sectionId="growth-funnel" report={report} elementRef={growthFunnelRef} />
        </SectionAnchor>

        <SectionAnchor id="beyond-kpis">
          <BeyondKPIs report={report} />
        </SectionAnchor>

        <SectionAnchor id="beyond-budget">
          <BeyondBudgetAllocation report={report} />
        </SectionAnchor>

        <SectionAnchor id="advanced-recommendations">
          <AdvancedRecommendations report={report} />
        </SectionAnchor>
      </div>
    </ReportDashboardLayout>
  );
};

export default ResultsDashboardPage;
