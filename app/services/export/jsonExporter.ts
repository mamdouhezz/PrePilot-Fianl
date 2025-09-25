import { ExportOptions, ExportResult } from './exportTypes';

export async function exportToJSON(options: ExportOptions): Promise<ExportResult> {
  try {
    const { report, section, filename } = options;
    
    // Create structured JSON data based on section
    let jsonData: any = {
      metadata: {
        section: section,
        generatedAt: new Date().toISOString(),
        reportTitle: report.narrative.substring(0, 50),
        industry: report.industry,
      }
    };

    // Add section-specific data
    switch (section) {
      case 'strategic-summary':
        jsonData.data = {
          narrative: report.narrative,
          goals: report.goals,
          confidence: report.confidence,
          recommendations: report.recommendations,
        };
        break;
      
      case 'kpi-snippets':
        jsonData.data = {
          totals: report.kpis.totals,
          perPlatform: report.kpis.perPlatform,
        };
        break;
      
      case 'media-plan':
        jsonData.data = {
          budgetAllocation: report.budgetAllocation,
          platforms: Object.keys(report.budgetAllocation),
          totalBudget: report.kpis.totals.budget,
        };
        break;
      
      case 'growth-funnel':
        jsonData.data = {
          funnelStage: report.funnelStage,
          conversionDefinition: report.conversionDefinition,
          kpis: report.kpis.totals,
        };
        break;
      
      case 'beyond-kpis':
        jsonData.data = {
          advancedInsights: report.advancedInsights,
          anomalies: report.anomalies,
          corrections: report.corrections,
        };
        break;
      
      case 'beyond-budget':
        jsonData.data = {
          budgetAllocation: report.budgetAllocation,
          budgetReasoning: report.advancedInsights.budgetReasoning || [],
        };
        break;
      
      case 'advanced-recommendations':
        jsonData.data = {
          recommendations: report.recommendations,
          explainability: report.explainability,
        };
        break;
      
      case 'full-report':
        jsonData.data = {
          industry: report.industry,
          goals: report.goals,
          funnelStage: report.funnelStage,
          narrative: report.narrative,
          recommendations: report.recommendations,
          explainability: report.explainability,
          confidence: report.confidence,
          budgetAllocation: report.budgetAllocation,
          kpis: report.kpis,
          advancedInsights: report.advancedInsights,
          anomalies: report.anomalies,
          corrections: report.corrections,
          aiChecks: report.aiChecks,
          uiWarnings: report.uiWarnings,
        };
        break;
      
      default:
        jsonData.data = report;
    }

    // Convert to JSON string with proper formatting
    const jsonString = JSON.stringify(jsonData, null, 2);
    
    // Create download link
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return {
      success: true,
      message: `تم إنشاء ملف JSON لقسم "${section}" بنجاح.`,
      filename: `${filename}.json`,
    };
  } catch (error) {
    console.error('JSON export failed:', error);
    return {
      success: false,
      message: `فشل في تصدير JSON: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
    };
  }
}
