import { ExportOptions, ExportResult } from './exportTypes';

/**
 * Exports section content to JSON format
 * @param options - Export options
 * @returns Promise<ExportResult> - Export result
 */
export async function exportToJSON(options: ExportOptions): Promise<ExportResult> {
  try {
    // Generate JSON data based on section
    const jsonData = options.report;
    
    // Create JSON string with formatting
    const jsonString = JSON.stringify(jsonData, null, 2);
    
    // If running in browser, trigger download; in tests/node, just return data
    const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
    if (isBrowser && typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${options.filename || 'prepilot-export'}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    return {
      success: true,
      message: 'تم تحميل ملف JSON بنجاح',
      filename: `${options.filename || 'prepilot-export'}.json`,
      data: jsonData
    };

  } catch (error) {
    console.error('JSON export failed:', error);
    return {
      success: false,
      message: `فشل في تصدير JSON: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`
    };
  }
}