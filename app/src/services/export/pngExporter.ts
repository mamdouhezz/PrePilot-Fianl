import { ExportOptions, ExportResult } from './exportTypes';
import * as htmlToImage from 'html-to-image';

export async function exportToPNG(options: ExportOptions): Promise<ExportResult> {
  try {
    if (!options.element) {
      return { 
        success: false, 
        message: 'Element is required for PNG export.' 
      };
    }

    // Configure html-to-image options
    const imageOptions = {
      quality: 1.0,
      pixelRatio: 2, // Higher resolution
      backgroundColor: '#0A192F', // Brand navy background
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
      },
      filter: (node: any) => {
        // Filter out elements we don't want in the image
        if (node.classList && node.classList.contains('export-toolbar')) {
          return false;
        }
        return true;
      }
    };

    // Generate the image
    const dataUrl = await htmlToImage.toPng(options.element, imageOptions);
    
    // Create download link
    const link = document.createElement('a');
    link.download = `${options.filename}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

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
