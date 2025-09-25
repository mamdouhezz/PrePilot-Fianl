import { ExportOptions, ExportResult } from './exportTypes';
import { CampaignReport } from '../../types';
import { PLATFORM_INFO } from '../../constants';
import { DisplayKpi } from '../../engine/kpi/kpiCalculator';

const sanitizeForCsv = (value: any): string => {
    const str = String(value ?? '');
    // If the string contains a comma, double quote, or newline, wrap it in double quotes.
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        // Within a quoted field, any double quote must be escaped by another double quote.
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
};

export async function exportToCSV(options: ExportOptions): Promise<ExportResult> {
  try {
    const { report, filename } = options;
    const csvRows: string[][] = [];

    // Header section
    csvRows.push(['Report Title', report.narrative.substring(0, 50)]);
    csvRows.push(['Industry', report.industry]);
    csvRows.push(['Total Budget (ريال)', String(report.kpis.totals.budget)]);
    csvRows.push([]); // Blank line

    // KPI Headers
    const headers = [
        'Platform', 'Budget (ريال)', 'Percentage (%)', 'Impressions', 'Clicks', 'CTR (%)', 'CPC (ريال)',
        'Conversions', 'CVR (%)', 'CAC (ريال)', 'ROAS (x)'
    ];
    csvRows.push(headers);

    // Platform Rows
    for (const [platformId, kpis] of Object.entries(report.kpis.perPlatform)) {
        const platformInfo = PLATFORM_INFO[platformId as keyof typeof PLATFORM_INFO];
        const budget = report.budgetAllocation[platformId] || 0;
        const percentage = report.kpis.totals.budget > 0 ? (budget / report.kpis.totals.budget * 100) : 0;

        csvRows.push([
            platformInfo?.name || platformId,
            String(budget),
            percentage.toFixed(2),
            String(kpis.impressions),
            String(kpis.clicks),
            kpis.ctr.toFixed(2),
            kpis.cpc.toFixed(2),
            String(kpis.conversions),
            kpis.cvr.toFixed(2),
            kpis.cac.toFixed(2),
            kpis.roas.toFixed(2),
        ]);
    }
    
    // Totals Row
    const totals = report.kpis.totals;
    csvRows.push([]); // Blank line
    csvRows.push([
        'Total',
        String(totals.budget),
        '100.00',
        String(totals.impressions),
        String(totals.clicks),
        totals.ctr.toFixed(2),
        totals.cpc.toFixed(2),
        String(totals.conversions),
        totals.cvr.toFixed(2),
        totals.cac.toFixed(2),
        totals.roas.toFixed(2),
    ]);

    const csvContent = csvRows.map(row => row.map(sanitizeForCsv).join(',')).join('\n');
    
    // Add BOM for Excel to properly handle UTF-8 characters
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return {
      success: true,
      message: `تم إنشاء ملف CSV لقسم "${options.section}" بنجاح.`,
      filename: `${filename}.csv`,
    };

  } catch (error) {
    console.error('CSV export failed:', error);
    return {
      success: false,
      message: `فشل في تصدير CSV: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
    };
  }
}

export const exportKpisToCsv = (kpis: DisplayKpi[], filename: string): void => {
    const headers = ['KPI', 'Value', 'Tooltip'];
    const rows = kpis.map(kpi => [kpi.label, kpi.value, kpi.tooltip]);
    
    const csvContent = [headers, ...rows].map(row => row.map(sanitizeForCsv).join(',')).join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
