import { toPng } from 'html-to-image';
import { ExportOptions, ExportResult } from './exportTypes';

export async function exportToPNG(options: ExportOptions): Promise<ExportResult> {
  if (!options.element) {
    return {
      success: false,
      message: 'عنصر DOM مطلوب للتصدير كصورة',
    };
  }

  try {
    const dataUrl = await toPng(options.element, { 
        quality: 0.95, 
        backgroundColor: '#0A192F' // Match body background
    });

    const link = document.createElement('a');
    link.download = `${options.filename}.png`;
    link.href = dataUrl;
    link.click();

    return {
      success: true,
      message: `تم إنشاء صورة PNG لقسم "${options.section}" بنجاح.`,
      filename: `${options.filename}.png`,
    };
  } catch (error) {
    console.error('PNG export failed:', error);
    return {
      success: false,
      message: `فشل في تصدير PNG: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
    };
  }
}