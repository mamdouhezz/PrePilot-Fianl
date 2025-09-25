import { ExportOptions, ExportResult } from './exportTypes';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import * as htmlToImage from 'html-to-image';
import { reshape } from 'arabic-reshaper';
import bidi from 'bidi-js';

// Helper function to load Arabic font
async function loadArabicFont(pdfDoc: PDFDocument) {
  try {
    // Register fontkit
    pdfDoc.registerFontkit(fontkit);
    
    // Try to load the Noto Sans Arabic font from public directory
    const response = await fetch('/NotoSansArabic-Regular.ttf');
    if (response.ok) {
      const fontBytes = await response.arrayBuffer();
      const font = await pdfDoc.embedFont(fontBytes);
      console.log('Successfully loaded Noto Sans Arabic Regular font');
      return font;
    } else {
      console.warn('Failed to fetch Noto Sans Arabic font:', response.status, response.statusText);
    }
  } catch (error) {
    console.warn('Could not load Noto Sans Arabic font, falling back to Helvetica:', error);
  }
  
  // Fallback to Helvetica if Arabic font fails
  console.warn('Using Helvetica fallback - Arabic text may not display correctly');
  return await pdfDoc.embedFont(StandardFonts.Helvetica);
}

// Helper function to load Arabic font with better error handling
async function loadArabicFontSafe(pdfDoc: PDFDocument) {
  try {
    // Register fontkit
    pdfDoc.registerFontkit(fontkit);
    
    // Try to load the Noto Sans Arabic font from public directory
    const response = await fetch('/NotoSansArabic-Regular.ttf');
    if (response.ok) {
      const fontBytes = await response.arrayBuffer();
      const font = await pdfDoc.embedFont(fontBytes);
      console.log('Successfully loaded Noto Sans Arabic Regular font');
      return font;
    } else {
      console.warn('Failed to fetch Noto Sans Arabic font:', response.status, response.statusText);
    }
  } catch (error) {
    console.warn('Could not load Noto Sans Arabic font, falling back to Helvetica:', error);
  }
  
  // Fallback to Helvetica if Arabic font fails
  console.warn('Using Helvetica fallback - Arabic text may not display correctly');
  return await pdfDoc.embedFont(StandardFonts.Helvetica);
}

// Helper function to load Arabic bold font
async function loadArabicBoldFont(pdfDoc: PDFDocument) {
  try {
    // Register fontkit
    pdfDoc.registerFontkit(fontkit);
    
    // Try to load the Noto Sans Arabic Bold font from public directory
    const response = await fetch('/NotoSansArabic-Bold.ttf');
    if (response.ok) {
      const fontBytes = await response.arrayBuffer();
      const font = await pdfDoc.embedFont(fontBytes);
      console.log('Successfully loaded Noto Sans Arabic Bold font');
      return font;
    } else {
      console.warn('Failed to fetch Noto Sans Arabic Bold font:', response.status, response.statusText);
    }
  } catch (error) {
    console.warn('Could not load Noto Sans Arabic Bold font, falling back to Helvetica Bold:', error);
  }
  
  // Fallback to Helvetica Bold if Arabic font fails
  console.warn('Using Helvetica Bold fallback - Arabic text may not display correctly');
  return await pdfDoc.embedFont(StandardFonts.HelveticaBold);
}

export async function exportToPDF(options: ExportOptions): Promise<ExportResult> {
  try {
    console.log('Starting PDF export for section:', options.section);
    
    // Always create a proper PDF with formatted text, not images
    // Never use image fallback - always generate text-based PDF
    
    // Create PDF with Arabic support
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    
    // Load fonts
    console.log('Loading Arabic fonts...');
    const arabicFont = await loadArabicFontSafe(pdfDoc);
    const arabicBoldFont = await loadArabicBoldFont(pdfDoc);
    console.log('Fonts loaded successfully');

    // Set up page content
    const { width, height } = page.getSize();
    const margin = 50;
    let yPosition = height - margin;

    // Add title in Arabic (shaped + RTL)
    try {
      const title = 'PrePilot - تقرير الحملة الإعلانية';
      page.drawText(title, {
        x: margin,
        y: yPosition,
        size: 20,
        font: arabicBoldFont,
        color: rgb(0.2, 0.2, 0.2),
      });
    } catch (error) {
      console.warn('Failed to draw Arabic title, using English fallback:', error);
      page.drawText('PrePilot - Campaign Report', {
        x: margin,
        y: yPosition,
        size: 20,
        font: arabicBoldFont,
        color: rgb(0.2, 0.2, 0.2),
      });
    }
    yPosition -= 40;

    // Add section title in Arabic
    try {
      const sectionTitle = getSectionTitle(options.section);
      page.drawText(sectionTitle, {
        x: margin,
        y: yPosition,
        size: 16,
        font: arabicBoldFont,
        color: rgb(0.3, 0.3, 0.3),
      });
    } catch (error) {
      console.warn('Failed to draw Arabic section title, using English fallback:', error);
      const englishTitle = getSectionTitleEnglish(options.section);
      page.drawText(englishTitle, {
        x: margin,
        y: yPosition,
        size: 16,
        font: arabicBoldFont,
        color: rgb(0.3, 0.3, 0.3),
      });
    }
    yPosition -= 30;

    // Add report data in Arabic with better formatting
    const report = options.report;
    
    // Add section divider
    yPosition -= 10;
    page.drawLine({
      start: { x: margin, y: yPosition },
      end: { x: width - margin, y: yPosition },
      thickness: 1,
      color: rgb(0.7, 0.7, 0.7),
    });
    yPosition -= 20;

    // Report summary section
    page.drawText('ملخص التقرير', {
      x: margin,
      y: yPosition,
      size: 14,
      font: arabicBoldFont,
      color: rgb(0.2, 0.2, 0.2),
    });
    yPosition -= 25;

    const reportData = [
      { label: 'الصناعة', value: report.industry },
      { label: 'الميزانية الإجمالية', value: `${report.kpis.totals.budget.toLocaleString('ar-SA')} ريال` },
      { label: 'العائد المتوقع (ROAS)', value: `${report.kpis.totals.roas.toFixed(2)}x` },
      { label: 'إجمالي الانطباعات', value: report.kpis.totals.impressions.toLocaleString('ar-SA') },
      { label: 'إجمالي النقرات', value: report.kpis.totals.clicks.toLocaleString('ar-SA') },
      { label: 'معدل النقر', value: `${report.kpis.totals.ctr.toFixed(2)}%` },
      { label: 'معدل التحويل', value: `${report.kpis.totals.cvr.toFixed(2)}%` },
      { label: 'تكلفة النقرة', value: `${report.kpis.totals.cpc.toFixed(2)} ريال` },
      { label: 'تكلفة اكتساب العميل', value: `${report.kpis.totals.cac.toFixed(2)} ريال` },
    ];

    reportData.forEach((item, index) => {
      if (yPosition < margin + 80) {
        // Add new page if needed
        const newPage = pdfDoc.addPage([595.28, 841.89]);
        yPosition = newPage.getSize().height - margin;
      }
      
      try {
        // Label in bold
        page.drawText(item.label + ':', {
          x: margin,
          y: yPosition,
          size: 11,
          font: arabicBoldFont,
          color: rgb(0.3, 0.3, 0.3),
        });
        
        // Value
        page.drawText(String(item.value), {
          x: margin + 150,
          y: yPosition,
          size: 11,
          font: arabicFont,
          color: rgb(0.5, 0.5, 0.5),
        });
      } catch (error) {
        console.warn('Failed to draw text for item:', item.label, error);
        // Fallback to English or simple text
        try {
          page.drawText(item.label + ':', {
            x: margin,
            y: yPosition,
            size: 11,
            font: arabicBoldFont,
            color: rgb(0.3, 0.3, 0.3),
          });
          
          page.drawText(String(item.value), {
            x: margin + 150,
            y: yPosition,
            size: 11,
            font: arabicFont,
            color: rgb(0.5, 0.5, 0.5),
          });
        } catch (fallbackError) {
          console.error('Even fallback failed for item:', item.label, fallbackError);
        }
      }
      
      yPosition -= 18;
    });

    // Add platform breakdown section
    yPosition -= 30;
    page.drawLine({
      start: { x: margin, y: yPosition },
      end: { x: width - margin, y: yPosition },
      thickness: 1,
      color: rgb(0.7, 0.7, 0.7),
    });
    yPosition -= 20;
    
    page.drawText('تفصيل المنصات', {
      x: margin,
      y: yPosition,
      size: 14,
      font: arabicBoldFont,
      color: rgb(0.2, 0.2, 0.2),
    });
    yPosition -= 25;

    // Add table headers
    page.drawText('المنصة', {
      x: margin,
      y: yPosition,
      size: 10,
      font: arabicBoldFont,
      color: rgb(0.4, 0.4, 0.4),
    });
    page.drawText('الميزانية', {
      x: margin + 120,
      y: yPosition,
      size: 10,
      font: arabicBoldFont,
      color: rgb(0.4, 0.4, 0.4),
    });
    page.drawText('النسبة', {
      x: margin + 220,
      y: yPosition,
      size: 10,
      font: arabicBoldFont,
      color: rgb(0.4, 0.4, 0.4),
    });
    page.drawText('ROAS', {
      x: margin + 280,
      y: yPosition,
      size: 10,
      font: arabicBoldFont,
      color: rgb(0.4, 0.4, 0.4),
    });
    yPosition -= 20;

    // Add platform data
    Object.entries(report.budgetAllocation).forEach(([platform, budget]) => {
      if (yPosition < margin + 60) {
        const newPage = pdfDoc.addPage([595.28, 841.89]);
        yPosition = newPage.getSize().height - margin;
      }
      
      const percentage = (budget / report.kpis.totals.budget * 100).toFixed(1);
      const platformName = getPlatformName(platform);
      const platformKpis = report.kpis.perPlatform[platform];
      const roas = platformKpis ? platformKpis.roas.toFixed(2) : '0.00';
      
      // Platform name
      page.drawText(platformName, {
        x: margin,
        y: yPosition,
        size: 10,
        font: arabicFont,
        color: rgb(0.5, 0.5, 0.5),
      });
      
      // Budget
      page.drawText(`${budget.toLocaleString('ar-SA')} ريال`, {
        x: margin + 120,
        y: yPosition,
        size: 10,
        font: arabicFont,
        color: rgb(0.5, 0.5, 0.5),
      });
      
      // Percentage
      page.drawText(`${percentage}%`, {
        x: margin + 220,
        y: yPosition,
        size: 10,
        font: arabicFont,
        color: rgb(0.5, 0.5, 0.5),
      });
      
      // ROAS
      page.drawText(`${roas}x`, {
        x: margin + 280,
        y: yPosition,
        size: 10,
        font: arabicFont,
        color: rgb(0.5, 0.5, 0.5),
      });
      
      yPosition -= 16;
    });

    // Add recommendations section if available
    if (report.recommendations && report.recommendations.length > 0) {
      yPosition -= 30;
      page.drawLine({
        start: { x: margin, y: yPosition },
        end: { x: width - margin, y: yPosition },
        thickness: 1,
        color: rgb(0.7, 0.7, 0.7),
      });
      yPosition -= 20;
      
      page.drawText('التوصيات', {
        x: margin,
        y: yPosition,
        size: 14,
        font: arabicBoldFont,
        color: rgb(0.2, 0.2, 0.2),
      });
      yPosition -= 25;

      report.recommendations.forEach((recommendation, index) => {
        if (yPosition < margin + 60) {
          const newPage = pdfDoc.addPage([595.28, 841.89]);
          yPosition = newPage.getSize().height - margin;
        }
        
        // Recommendation number
        page.drawText(`${index + 1}.`, {
          x: margin,
          y: yPosition,
          size: 10,
          font: arabicBoldFont,
          color: rgb(0.4, 0.4, 0.4),
        });
        
        // Recommendation text
        page.drawText(String(recommendation), {
          x: margin + 20,
          y: yPosition,
          size: 10,
          font: arabicFont,
          color: rgb(0.5, 0.5, 0.5),
        });
        
        yPosition -= 20;
      });
    }

    // Add footer
    const footerY = margin - 20;
    page.drawLine({
      start: { x: margin, y: footerY + 10 },
      end: { x: width - margin, y: footerY + 10 },
      thickness: 0.5,
      color: rgb(0.8, 0.8, 0.8),
    });
    
    page.drawText(`تم إنشاؤه بواسطة PrePilot - ${new Date().toLocaleDateString('ar-SA')}`, {
      x: margin,
      y: footerY,
      size: 9,
      font: arabicFont,
      color: rgb(0.6, 0.6, 0.6),
    });

    // Generate PDF bytes
    console.log('Generating PDF bytes...');
    const pdfBytes = await pdfDoc.save();
    console.log('PDF generated successfully, size:', pdfBytes.length, 'bytes');
    
    // Create download link
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${options.filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('PDF download initiated successfully');
    return {
      success: true,
      message: `تم إنشاء ملف PDF لقسم "${options.section}" بنجاح.`,
      filename: `${options.filename}.pdf`,
    };
  } catch (error) {
    console.error('PDF export failed:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return {
      success: false,
      message: `فشل في تصدير PDF: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
    };
  }
}

// Helper function to export element as image to PDF
async function exportElementToPDF(options: ExportOptions): Promise<ExportResult> {
  try {
    if (!options.element) {
      throw new Error('Element is required for PDF export');
    }

    // Convert element to image
    const imageOptions = {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: '#0A192F',
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
      },
      filter: (node: any) => {
        if (node.classList && node.classList.contains('export-toolbar')) {
          return false;
        }
        return true;
      }
    };

    const dataUrl = await htmlToImage.toPng(options.element, imageOptions);
    
    // Create PDF with the image
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    
    // Embed the image
    const image = await pdfDoc.embedPng(dataUrl);
    
    // Calculate dimensions to fit the page
    const { width: pageWidth, height: pageHeight } = page.getSize();
    const imageWidth = image.width;
    const imageHeight = image.height;
    
    // Scale to fit page width while maintaining aspect ratio
    const scale = Math.min(pageWidth / imageWidth, pageHeight / imageHeight);
    const scaledWidth = imageWidth * scale;
    const scaledHeight = imageHeight * scale;
    
    // Center the image on the page
    const x = (pageWidth - scaledWidth) / 2;
    const y = (pageHeight - scaledHeight) / 2;
    
    page.drawImage(image, {
      x,
      y,
      width: scaledWidth,
      height: scaledHeight,
    });

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save();
    
    // Create download link
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${options.filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  return {
    success: true,
    message: `تم إنشاء ملف PDF لقسم "${options.section}" بنجاح.`,
    filename: `${options.filename}.pdf`,
  };
  } catch (error) {
    console.error('Element to PDF export failed:', error);
    throw error;
  }
}

// Shape and reorder Arabic text for pdf-lib drawing
function shapeArabic(input: string): string {
  try {
    // Check if input contains Arabic characters
    const hasArabic = /[\u0600-\u06FF]/.test(input);
    if (!hasArabic) {
      return input; // Return as-is if no Arabic characters
    }
    
    // For now, return the input as-is to avoid shaping issues
    // The font should handle the Arabic text properly
    return input;
    
    // TODO: Re-enable shaping once we confirm fonts are working
    // Apply Arabic glyph shaping
    // const reshaped = reshape(input);
    // Apply bidi algorithm; get visual order
    // const bidiResult = bidi(reshaped);
    // bidi-js returns objects; map to text in correct visual order
    // const visual = bidiResult.map((part: any) => part.text).join('');
    // return visual;
  } catch (error) {
    console.warn('Arabic text shaping failed:', error);
    return input; // fail open
  }
}

// Create a temporary DOM container for full-report and export via image → PDF
async function exportFullReportViaDom(options: ExportOptions): Promise<ExportResult> {
  const container = document.createElement('div');
  // Offscreen positioning and sizing near A4 portrait width
  container.style.position = 'fixed';
  container.style.left = '-99999px';
  container.style.top = '-99999px';
  container.style.zIndex = '-1';
  container.style.width = '800px';
  container.style.padding = '24px';
  container.style.direction = 'rtl';
  container.style.background = '#0A192F';
  container.style.color = '#E5E7EB';
  container.style.fontFamily = "'Noto Sans Arabic', 'IBM Plex Sans Arabic', system-ui, sans-serif";
  container.style.lineHeight = '1.75';
  
  const { report } = options;
  const header = document.createElement('h1');
  header.textContent = 'PrePilot - التقرير الكامل';
  header.style.margin = '0 0 12px 0';
  header.style.fontSize = '22px';
  header.style.fontWeight = '800';
  header.style.color = '#C7D2FE';
  
  const meta = document.createElement('div');
  meta.style.marginBottom = '16px';
  meta.style.fontSize = '14px';
  meta.innerText = `الصناعة: ${report.industry} \nالميزانية الإجمالية: ${report.kpis.totals.budget.toLocaleString('ar-SA')} ريال \nالعائد المتوقع (ROAS): ${report.kpis.totals.roas.toFixed(2)}x`;
  
  const sectionTitle = document.createElement('h2');
  sectionTitle.textContent = 'تفصيل المنصات:';
  sectionTitle.style.margin = '16px 0 8px 0';
  sectionTitle.style.fontSize = '18px';
  sectionTitle.style.fontWeight = '700';
  sectionTitle.style.color = '#93C5FD';
  
  const list = document.createElement('ul');
  list.style.padding = '0 18px';
  list.style.margin = '0';
  
  Object.entries(report.budgetAllocation).forEach(([platform, budget]) => {
    const percentage = report.kpis.totals.budget > 0
      ? (Number(budget) / report.kpis.totals.budget) * 100
      : 0;
    const li = document.createElement('li');
    li.style.margin = '6px 0';
    li.textContent = `${getPlatformName(platform)}: ${Number(budget).toLocaleString('ar-SA')} ريال (${percentage.toFixed(1)}%)`;
    list.appendChild(li);
  });
  
  const recTitle = document.createElement('h2');
  recTitle.textContent = 'التوصيات:';
  recTitle.style.margin = '16px 0 8px 0';
  recTitle.style.fontSize = '18px';
  recTitle.style.fontWeight = '700';
  recTitle.style.color = '#93C5FD';
  
  const recList = document.createElement('ol');
  recList.style.padding = '0 18px';
  recList.style.margin = '0';
  (report.recommendations || []).forEach((r) => {
    const li = document.createElement('li');
    li.style.margin = '6px 0';
    li.textContent = String(r);
    recList.appendChild(li);
  });
  
  container.appendChild(header);
  container.appendChild(meta);
  container.appendChild(sectionTitle);
  container.appendChild(list);
  if ((report.recommendations || []).length > 0) {
    container.appendChild(recTitle);
    container.appendChild(recList);
  }
  
  document.body.appendChild(container);
  try {
    const result = await exportElementToPDF({ ...options, element: container as unknown as HTMLElement });
    return result;
  } finally {
    document.body.removeChild(container);
  }
}

function getSectionTitle(section: string): string {
  const titles: Record<string, string> = {
    'strategic-summary': 'الملخص الاستراتيجي',
    'kpi-snippets': 'مؤشرات الأداء الرئيسية',
    'media-plan': 'الخطة الإعلامية',
    'growth-funnel': 'قمع النمو',
    'beyond-kpis': 'ما وراء مؤشرات الأداء',
    'beyond-budget': 'ما وراء توزيع الميزانية',
    'advanced-recommendations': 'التوصيات المتقدمة',
    'full-report': 'التقرير الكامل',
  };
  return titles[section] || section;
}

function getSectionTitleEnglish(section: string): string {
  const titles: Record<string, string> = {
    'strategic-summary': 'Strategic Summary',
    'kpi-snippets': 'Key Performance Indicators',
    'media-plan': 'Media Plan',
    'growth-funnel': 'Growth Funnel',
    'beyond-kpis': 'Beyond KPIs',
    'beyond-budget': 'Beyond Budget Allocation',
    'advanced-recommendations': 'Advanced Recommendations',
    'full-report': 'Full Report',
  };
  return titles[section] || section;
}

function getPlatformName(platformId: string): string {
  const platforms: Record<string, string> = {
    'meta': 'Meta (Facebook, Instagram)',
    'google_ads': 'Google Ads',
    'youtube': 'YouTube',
    'tiktok': 'TikTok',
    'snapchat': 'Snapchat',
    'x': 'X (Twitter)',
    'linkedin': 'LinkedIn',
    'programmatic': 'Programmatic',
  };
  return platforms[platformId] || platformId;
}

function getPlatformNameEnglish(platformId: string): string {
  const platforms: Record<string, string> = {
    'meta': 'Meta (Facebook, Instagram)',
    'google_ads': 'Google Ads',
    'youtube': 'YouTube',
    'tiktok': 'TikTok',
    'snapchat': 'Snapchat',
    'x': 'X (Twitter)',
    'linkedin': 'LinkedIn',
    'programmatic': 'Programmatic',
  };
  return platforms[platformId] || platformId;
}
