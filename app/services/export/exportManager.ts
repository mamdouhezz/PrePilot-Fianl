import { ExportOptions, ExportResult, ExportableSection, ExportFormat, SECTION_EXPORT_FORMATS } from './exportTypes';
import { exportToCSV } from './csvExporter';
import { exportToJSON } from './jsonExporter';
import { exportToPDF } from './pdfExporter';
import { exportToPNG } from './pngExporter';
import { exportToXLS } from './xlsExporter';
import { exportToSocial } from './exportToSocial';
import { CampaignReport } from '../../types';


export async function exportSection(options: ExportOptions): Promise<ExportResult> {
  try {
    const availableFormats = SECTION_EXPORT_FORMATS[options.section];
    if (!availableFormats.includes(options.format)) {
      return {
        success: false,
        message: `تنسيق ${options.format} غير متوفر لهذا القسم`
      };
    }
    
    const filename = options.filename || generateFilename(reportTitleFromReport(options.report), options.section, options.format, options.includeTimestamp);
    const updatedOptions = { ...options, filename };

    switch (options.format) {
      case "pdf": return await exportToPDF(updatedOptions);
      case "png": return await exportToPNG(updatedOptions);
      case "xls": return await exportToXLS(updatedOptions);
      case "csv": return await exportToCSV(updatedOptions);
      case "json": return await exportToJSON(updatedOptions);
      default:
        return {
          success: false,
          message: `تنسيق ${options.format} غير مدعوم`
        };
    }
  } catch (error) {
    console.error('Export failed:', error);
    return {
      success: false,
      message: `فشل في التصدير: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`
    };
  }
}

function reportTitleFromReport(report: CampaignReport): string {
    return report.narrative.substring(0, 50)
}

function generateFilename(reportTitle: string, section: ExportableSection, format: ExportFormat, includeTimestamp: boolean = true): string {
  const timestamp = includeTimestamp ? `_${new Date().toISOString().split('T')[0]}` : '';
  const safeTitle = reportTitle.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_').substring(0, 30);
  return `PrePilot_${safeTitle}_${section}${timestamp}`;
}

export function getAvailableFormatsForSection(section: ExportableSection): ExportFormat[] {
    return SECTION_EXPORT_FORMATS[section] || [];
}