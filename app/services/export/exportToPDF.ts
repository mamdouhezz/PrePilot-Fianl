import { PDFDocument, rgb, PDFFont, PageSizes } from 'pdf-lib';
import { ExportOptions, ExportResult } from './exportTypes';
import { CampaignReport } from '../../types';
import { PLATFORM_INFO } from '../../constants';

// --- Helper Functions for PDF Generation ---

const COLORS = {
  PRIMARY: rgb(124, 58, 237), // prepilot-purple-600
  TEXT_DARK: rgb(0.1, 0.1, 0.1),
  TEXT_LIGHT: rgb(0.9, 0.9, 0.9),
  HEADER_BG: rgb(0.94, 0.94, 0.94),
  BORDER: rgb(0.8, 0.8, 0.8),
};

const MARGINS = { top: 60, bottom: 60, left: 50, right: 50 };

let y: number;
let currentPage: any; // PDFPage type from pdf-lib
let fonts: { regular: PDFFont; bold: PDFFont };

async function loadFonts(pdfDoc: PDFDocument) {
  // Fetch font files from the public directory
  const regularFontBytes = await fetch('/IBM_Plex_Sans_Arabic/IBMPlexSansArabic-Regular.ttf').then(res => res.arrayBuffer());
  const boldFontBytes = await fetch('/IBM_Plex_Sans_Arabic/IBMPlexSansArabic-Bold.ttf').then(res => res.arrayBuffer());
  
  const regular = await pdfDoc.embedFont(regularFontBytes, { subset: true });
  const bold = await pdfDoc.embedFont(boldFontBytes, { subset: true });

  return { regular, bold };
}

function addNewPage(pdfDoc: PDFDocument) {
  currentPage = pdfDoc.addPage(PageSizes.A4);
  y = currentPage.getHeight() - MARGINS.top;
  return currentPage;
}

async function checkY(height: number, pdfDoc: PDFDocument) {
  if (y - height < MARGINS.bottom) {
    await addFooter(currentPage);
    addNewPage(pdfDoc);
  }
}

// pdf-lib does not have native bidi support. For full support, a text shaping library would be needed.
// For now, we will render the text as is and rely on the font rendering.
function processRtlText(text: string): string {
    return text;
}

async function drawText(text: string, pdfDoc: PDFDocument, options: { x?: number, size: number, bold?: boolean, align?: 'left' | 'center' | 'right', color?: any }) {
    const { size, color = COLORS.TEXT_DARK, bold = false, align = 'right' } = options;
    const effectiveFont = bold ? fonts.bold : fonts.regular;
    const textWidth = effectiveFont.widthOfTextAtSize(text, size);
    
    let x = options.x || MARGINS.left;
    const pageWidth = currentPage.getWidth();

    if (align === 'right') {
        x = pageWidth - MARGINS.right - textWidth;
    } else if (align === 'center') {
        x = (pageWidth - textWidth) / 2;
    }
    
    await checkY(size * 1.5, pdfDoc);
    currentPage.drawText(processRtlText(text), { x, y, font: effectiveFont, size, color });
    y -= size * 1.5;
}

async function drawTitle(text: string, pdfDoc: PDFDocument) {
    await checkY(40, pdfDoc);
    await drawText(text, pdfDoc, { size: 24, bold: true, color: COLORS.PRIMARY, align: 'center' });
    y -= 10;
}

async function drawSubTitle(text: string, pdfDoc: PDFDocument) {
    await checkY(30, pdfDoc);
    await drawText(text, pdfDoc, { size: 16, bold: true, color: COLORS.TEXT_DARK, align: 'right' });
    y -= 5;
}

async function drawParagraph(text: string, pdfDoc: PDFDocument, { size = 10, align = 'right' }: {size?: number, align?: 'left' | 'center' | 'right'} = {}) {
    const lines: string[] = [];
    const words = text.split(' ');
    let currentLine = '';
    const maxWidth = currentPage.getWidth() - MARGINS.left - MARGINS.right;

    for (const word of words) {
        const testLine = currentLine.length > 0 ? `${currentLine} ${word}` : word;
        const width = fonts.regular.widthOfTextAtSize(testLine, size);
        if (width < maxWidth) {
            currentLine = testLine;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    
    for (const line of lines) {
        await drawText(line, pdfDoc, { size, align });
    }
}

async function drawTable(headers: string[], data: (string | number)[][], pdfDoc: PDFDocument) {
    const numColumns = headers.length;
    const tableWidth = currentPage.getWidth() - MARGINS.left - MARGINS.right;
    const colWidth = tableWidth / numColumns;
    const rowHeight = 25;
    const headerFontSize = 10;
    const rowFontSize = 9;

    await checkY(rowHeight * (data.length + 1), pdfDoc);

    // Draw header
    currentPage.drawRectangle({
        x: MARGINS.left,
        y: y - rowHeight,
        width: tableWidth,
        height: rowHeight,
        color: COLORS.HEADER_BG,
    });

    headers.forEach((header, i) => {
        const textWidth = fonts.bold.widthOfTextAtSize(header, headerFontSize);
        const textX = MARGINS.left + (i * colWidth) + (colWidth - textWidth) / 2;
        currentPage.drawText(processRtlText(header), {
            x: textX,
            y: y - (rowHeight / 2) - (headerFontSize / 2) + 2,
            font: fonts.bold,
            size: headerFontSize,
            color: COLORS.TEXT_DARK,
        });
    });
    y -= rowHeight;

    // Draw rows
    data.forEach((row, rowIndex) => {
        checkY(rowHeight, pdfDoc);
         currentPage.drawRectangle({
            x: MARGINS.left,
            y: y - rowHeight,
            width: tableWidth,
            height: rowHeight,
            borderColor: COLORS.BORDER,
            borderWidth: 0.5,
            color: rowIndex % 2 === 0 ? rgb(1, 1, 1) : COLORS.HEADER_BG,
        });

        row.forEach((cell, i) => {
            const cellText = String(cell);
            const textWidth = fonts.regular.widthOfTextAtSize(cellText, rowFontSize);
            const textX = MARGINS.left + (i * colWidth) + (colWidth - textWidth) / 2;
            currentPage.drawText(processRtlText(cellText), {
                x: textX,
                y: y - (rowHeight / 2) - (rowFontSize / 2) + 2,
                font: fonts.regular,
                size: rowFontSize,
                color: COLORS.TEXT_DARK,
            });
        });
        y -= rowHeight;
    });
    y -= 20;
}

async function addFooter(page: any) {
    const { width } = page.getSize();
    const text = 'تم إنشاؤه بواسطة PrePilot AI';
    const date = new Date().toLocaleDateString('ar-SA');
    const fullText = `${text} | ${date}`;
    const textWidth = fonts.regular.widthOfTextAtSize(fullText, 8);
    
    page.drawText(fullText, {
        x: (width - textWidth) / 2,
        y: MARGINS.bottom / 2,
        font: fonts.regular,
        size: 8,
        color: rgb(0.5, 0.5, 0.5),
    });
}

// --- Main PDF Export Function ---

export async function exportToPDF(options: ExportOptions): Promise<ExportResult> {
  try {
    const { report, filename } = options;
    const pdfDoc = await PDFDocument.create();
    fonts = await loadFonts(pdfDoc);
    
    addNewPage(pdfDoc);
    
    // --- Cover Page ---
    await drawTitle("تقرير خطة التسويق", pdfDoc);
    await drawSubTitle(report.narrative.substring(0,50), pdfDoc);
    y -= 30;
    await drawParagraph(`المجال: ${report.industry}`, pdfDoc, { align: 'right' });
    await drawParagraph(`الميزانية: ${report.kpis.totals.budget.toLocaleString('ar-SA')} ريال`, pdfDoc, { align: 'right' });
    await drawParagraph(`الأهداف: ${report.goals.join(', ')}`, pdfDoc, { align: 'right' });
    y -= 50;

    // --- Strategic Summary ---
    await drawSubTitle("الملخص الاستراتيجي", pdfDoc);
    await drawParagraph(report.narrative, pdfDoc, { align: 'right' });

    // --- KPIs ---
    await checkY(200, pdfDoc);
    await drawSubTitle("مؤشرات الأداء الرئيسية (الإجمالي)", pdfDoc);
    const kpiData = [
        ['العائد على الإنفاق (ROAS)', `${report.kpis.totals.roas.toFixed(2)}x`],
        ['تكلفة اكتساب العميل (CAC)', `${report.kpis.totals.cac.toFixed(2)} ريال`],
        ['معدل النقر (CTR)', `${report.kpis.totals.ctr.toFixed(2)}%`],
        ['التحويلات', report.kpis.totals.conversions.toLocaleString('ar-SA')],
        ['النقرات', report.kpis.totals.clicks.toLocaleString('ar-SA')],
        ['مرات الظهور', report.kpis.totals.impressions.toLocaleString('ar-SA')],
    ];
    await drawTable(['المؤشر', 'القيمة المتوقعة'], kpiData, pdfDoc);

    // --- Media Plan ---
    await checkY(200, pdfDoc);
    await drawSubTitle("الخطة الإعلامية", pdfDoc);
    const platformHeaders = ['المنصة', 'الميزانية', 'النسبة', 'ROAS', 'CAC', 'CTR'];
    const platformData = Object.entries(report.kpis.perPlatform).map(([platformId, kpis]) => {
        const platformInfo = PLATFORM_INFO[platformId as keyof typeof PLATFORM_INFO];
        const budget = report.budgetAllocation[platformId] || 0;
        const percentage = report.kpis.totals.budget > 0 ? (budget / report.kpis.totals.budget * 100) : 0;
        return [
            platformInfo?.name || platformId,
            `${budget.toLocaleString('ar-SA')} ريال`,
            `${percentage.toFixed(1)}%`,
            `${kpis.roas.toFixed(2)}x`,
            `${kpis.cac.toFixed(2)} ريال`,
            `${kpis.ctr.toFixed(2)}%`
        ];
    });
    await drawTable(platformHeaders, platformData, pdfDoc);

    // Add footer to all pages
    const pages = pdfDoc.getPages();
    for (const page of pages) {
      await addFooter(page);
    }
    
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return {
      success: true,
      message: `تم إنشاء ملف PDF لقسم "${options.section}" بنجاح.`,
      filename: `${filename}.pdf`,
    };
  } catch (error) {
    console.error('PDF export failed:', error);
    if (error instanceof Error && error.message.includes('fetch')) {
      return {
        success: false,
        message: 'فشل في تحميل الخطوط. تأكد من وجود مجلد "IBM_Plex_Sans_Arabic" في المسار الصحيح.'
      };
    }
    return {
      success: false,
      message: `فشل في تصدير PDF: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
    };
  }
}
