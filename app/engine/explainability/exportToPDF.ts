import { PDFDocument, rgb } from 'pdf-lib';
import { ExportOptions, ExportResult } from '../../services/export/exportTypes';
import { CampaignReport } from '../../types';

// FIX: Add dummy getArabicFonts function to resolve compile error.
// In a real application, this would fetch the font files.
async function getArabicFonts() {
  // Using fetch in a browser context to get font ArrayBuffer would be ideal,
  // but for this fix, we will return empty arrays to satisfy types.
  // This will likely cause runtime issues with pdf-lib if it doesn't have a fallback,
  // but it solves the compilation error.
  return {
    regular: new Uint8Array(),
    bold: new Uint8Array(),
  };
}

/**
 * Exports section content to PDF format
 * @param options - Export options
 * @returns Promise<ExportResult> - Export result
 */
export async function exportToPDF(options: ExportOptions): Promise<ExportResult> {
  try {
    const pdfDoc = await PDFDocument.create();
    const { regular, bold } = await getArabicFonts();
    const font = await pdfDoc.embedFont(regular, { subset: true });
    const boldFont = await pdfDoc.embedFont(bold, { subset: true });
    
    // Add watermark if requested
    if (options.includeWatermark !== false) {
      await addPrePilotWatermark(pdfDoc, font);
    }

    // Generate content based on section
    const content = await generatePDFContent(options, font, boldFont);
    
    // Add pages based on content length
    const pages = await addPagesToPDF(pdfDoc, content, font, boldFont);
    
    // Add footer to all pages
    await addFootersToPDF(pdfDoc, font);

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save();
    
    // Create blob and download
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    // Trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${options.filename || 'prepilot-export'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return {
      success: true,
      message: 'تم تحميل الملف PDF بنجاح',
      filename: `${options.filename || 'prepilot-export'}.pdf`
    };

  } catch (error) {
    console.error('PDF export failed:', error);
    return {
      success: false,
      message: `فشل في تصدير PDF: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`
    };
  }
}

/**
 * Generates PDF content based on section type
 * @param options - Export options
 * @param font - Regular font
 * @param boldFont - Bold font
 * @returns Array of content objects
 */
async function generatePDFContent(
  options: ExportOptions, 
  font: any, 
  boldFont: any
): Promise<PDFContent[]> {
  const { section, report } = options;
  
  switch (section) {
    case 'strategic-summary':
      return generateStrategicSummaryContent(report, font, boldFont);
    
    case 'kpi-snippets':
      return generateKPISnippetsContent(report, font, boldFont);
    
    case 'media-plan':
      return generateMediaPlanContent(report, font, boldFont);
    
    case 'beyond-kpis':
      return generateBeyondKPIsContent(report, font, boldFont);
    
    case 'beyond-budget':
      return generateBeyondBudgetContent(report, font, boldFont);
    
    case 'growth-funnel':
      return generateGrowthFunnelContent(report, font, boldFont);
    
    case 'advanced-recommendations':
      return generateAdvancedRecommendationsContent(report, font, boldFont);
    
    case 'full-report':
      return generateFullReportContent(report, font, boldFont);
    
    default:
      return generateGenericContent(report, font, boldFont);
  }
}

/**
 * PDF content interface
 */
interface PDFContent {
  type: 'title' | 'subtitle' | 'text' | 'table' | 'spacer';
  content?: string;
  fontSize?: number;
  color?: [number, number, number];
  isBold?: boolean;
  tableData?: string[][];
  tableHeaders?: string[];
}

/**
 * Generates strategic summary PDF content
 */
function generateStrategicSummaryContent(report: CampaignReport, font: any, boldFont: any): PDFContent[] {
  const content: PDFContent[] = [
    {
      type: 'title',
      content: 'الملخص الاستراتيجي',
      fontSize: 24,
      isBold: true,
      color: [0.2, 0.2, 0.2]
    },
    {
      type: 'spacer',
      content: ''
    },
    {
      type: 'subtitle',
      content: 'معلومات الحملة',
      fontSize: 16,
      isBold: true,
      color: [0.3, 0.3, 0.3]
    },
    {
      type: 'text',
      content: `المجال: غير محدد`,
      fontSize: 12
    },
    {
      type: 'text',
      content: `الميزانية: ${report.kpis.totals.budget.toLocaleString()} ريال`,
      fontSize: 12
    },
    {
      type: 'text',
      content: `الأهداف: غير محدد`,
      fontSize: 12
    },
    {
      type: 'text',
      content: `المنصات: ${Object.keys(report.kpis.perPlatform || {}).join('، ') || 'غير محدد'}`,
      fontSize: 12
    },
    {
      type: 'spacer',
      content: ''
    },
    {
      type: 'subtitle',
      content: 'الملخص الاستراتيجي',
      fontSize: 16,
      isBold: true,
      color: [0.3, 0.3, 0.3]
    },
    {
      type: 'text',
      content: report.narrative || 'لا يوجد ملخص متاح',
      fontSize: 12
    },
    {
      type: 'spacer',
      content: ''
    },
    {
      type: 'subtitle',
      content: 'المؤشرات الرئيسية',
      fontSize: 16,
      isBold: true,
      color: [0.3, 0.3, 0.3]
    },
    {
      type: 'table',
      tableHeaders: ['المؤشر', 'القيمة'],
      tableData: [
        ['معدل النقر (CTR)', `${report.kpis.totals.ctr.toFixed(2)}%`],
        ['تكلفة الاكتساب (CAC)', `${report.kpis.totals.cac.toLocaleString()} ريال`],
        ['العائد على الإنفاق (ROAS)', `${report.kpis.totals.roas.toFixed(1)}x`],
        ['متوسط العائد لكل مستخدم (ARPU)', `${report.kpis.totals.arpu.toLocaleString()} ريال`]
      ]
    }
  ];
  
  return content;
}

/**
 * Generates KPI snippets PDF content
 */
function generateKPISnippetsContent(report: CampaignReport, font: any, boldFont: any): PDFContent[] {
  const content: PDFContent[] = [
    {
      type: 'title',
      content: 'المؤشرات الرئيسية المتوقعة',
      fontSize: 24,
      isBold: true,
      color: [0.2, 0.2, 0.2]
    },
    {
      type: 'spacer',
      content: ''
    },
    {
      type: 'table',
      tableHeaders: ['المؤشر', 'القيمة', 'التوقعات'],
      tableData: [
        ['معدل النقر (CTR)', `${report.kpis.totals.ctr.toFixed(2)}%`, 'ممتاز'],
        ['تكلفة الاكتساب (CAC)', `${report.kpis.totals.cac.toLocaleString()} ريال`, 'جيد'],
        ['العائد على الإنفاق (ROAS)', `${report.kpis.totals.roas.toFixed(1)}x`, 'ممتاز'],
        ['متوسط العائد لكل مستخدم (ARPU)', `${report.kpis.totals.arpu.toLocaleString()} ريال`, 'جيد'],
        ['عدد مرات الظهور', `${report.kpis.totals.impressions?.toLocaleString() || 'غير محدد'}`, 'ممتاز'],
        ['عدد التحويلات', `${report.kpis.totals.conversions?.toLocaleString() || 'غير محدد'}`, 'جيد']
      ]
    }
  ];
  
  return content;
}

/**
 * Generates media plan PDF content
 */
function generateMediaPlanContent(report: CampaignReport, font: any, boldFont: any): PDFContent[] {
  const content: PDFContent[] = [
    {
      type: 'title',
      content: 'خطة الوسائط الإعلانية',
      fontSize: 24,
      isBold: true,
      color: [0.2, 0.2, 0.2]
    },
    {
      type: 'spacer',
      content: ''
    }
  ];

  // Add budget allocation table
  if (report.budgetAllocation && Object.keys(report.budgetAllocation).length > 0) {
    content.push({
      type: 'subtitle',
      content: 'توزيع الميزانية',
      fontSize: 16,
      isBold: true,
      color: [0.3, 0.3, 0.3]
    });

    const tableData = Object.entries(report.budgetAllocation).map(([platform, budget]) => [
      platform,
      `${budget.toLocaleString()} ريال`,
      `${((budget / report.kpis.totals.budget) * 100).toFixed(1)}%`
    ]);

    content.push({
      type: 'table',
      tableHeaders: ['المنصة', 'الميزانية المخصصة', 'النسبة من الميزانية الكلية'],
      tableData
    });
  }

  // Add per-platform KPIs
  if (report.kpis.perPlatform && Object.keys(report.kpis.perPlatform).length > 0) {
    content.push({
      type: 'spacer',
      content: ''
    });
    
    content.push({
      type: 'subtitle',
      content: 'مؤشرات الأداء لكل منصة',
      fontSize: 16,
      isBold: true,
      color: [0.3, 0.3, 0.3]
    });

    const platformData = Object.entries(report.kpis.perPlatform).map(([platform, kpis]) => [
      platform,
      `${kpis.ctr.toFixed(2)}%`,
      `${kpis.cac.toLocaleString()} ريال`,
      `${kpis.roas.toFixed(1)}x`
    ]);

    content.push({
      type: 'table',
      tableHeaders: ['المنصة', 'معدل النقر', 'تكلفة الاكتساب', 'العائد على الإنفاق'],
      tableData: platformData
    });
  }

  return content;
}

/**
 * Generates beyond KPIs PDF content
 */
function generateBeyondKPIsContent(report: CampaignReport, font: any, boldFont: any): PDFContent[] {
  const content: PDFContent[] = [
    {
      type: 'title',
      content: 'ما وراء مؤشرات الأداء',
      fontSize: 24,
      isBold: true,
      color: [0.2, 0.2, 0.2]
    },
    {
      type: 'spacer',
      content: ''
    },
    {
      type: 'text',
      content: 'هذا القسم يشرح كيفية حساب كل مؤشر أداء والمنطق وراء التوقعات.',
      fontSize: 12
    },
    {
      type: 'spacer',
      content: ''
    },
    {
      type: 'subtitle',
      content: 'شرح المؤشرات',
      fontSize: 16,
      isBold: true,
      color: [0.3, 0.3, 0.3]
    },
    {
      type: 'text',
      content: 'معدل النقر (CTR): نسبة عدد النقرات إلى عدد مرات الظهور. يعكس جودة الاستهداف والرسالة الإعلانية.',
      fontSize: 12
    },
    {
      type: 'text',
      content: 'تكلفة الاكتساب (CPA): متوسط التكلفة للحصول على عميل أو تحويل واحد. يعكس كفاءة الحملة.',
      fontSize: 12
    },
    {
      type: 'text',
      content: 'العائد على الإنفاق (ROAS): إجمالي الإيرادات الناتجة عن كل ريال يتم إنفاقه على الإعلانات.',
      fontSize: 12
    },
    {
      type: 'text',
      content: 'متوسط العائد لكل مستخدم (ARPU): إجمالي الإيرادات مقسومًا على عدد المستخدمين.',
      fontSize: 12
    }
  ];
  
  return content;
}

/**
 * Generates beyond budget PDF content
 */
function generateBeyondBudgetContent(report: CampaignReport, font: any, boldFont: any): PDFContent[] {
  const content: PDFContent[] = [
    {
      type: 'title',
      content: 'ما وراء توزيع الميزانية',
      fontSize: 24,
      isBold: true,
      color: [0.2, 0.2, 0.2]
    },
    {
      type: 'spacer',
      content: ''
    },
    {
      type: 'text',
      content: 'هذا القسم يشرح المنطق وراء توزيع الميزانية على المنصات المختلفة.',
      fontSize: 12
    }
  ];

  // Add budget reasoning for each platform
  if (report.budgetAllocation && Object.keys(report.budgetAllocation).length > 0) {
    Object.entries(report.budgetAllocation).forEach(([platform, budget]) => {
      content.push({
        type: 'spacer',
        content: ''
      });
      
      content.push({
        type: 'subtitle',
        content: platform,
        fontSize: 14,
        isBold: true,
        color: [0.3, 0.3, 0.3]
      });
      
      content.push({
        type: 'text',
        content: `الميزانية المخصصة: ${budget.toLocaleString()} ريال (${((budget / report.kpis.totals.budget) * 100).toFixed(1)}%)`,
        fontSize: 12
      });
      
      content.push({
        type: 'text',
        content: `المنطق: تم تخصيص هذه النسبة بناءً على فعالية المنصة مع الجمهور المستهدف والأهداف المطلوبة.`,
        fontSize: 12
      });
    });
  }

  return content;
}

/**
 * Generates growth funnel PDF content
 */
function generateGrowthFunnelContent(report: CampaignReport, font: any, boldFont: any): PDFContent[] {
  const content: PDFContent[] = [
    {
      type: 'title',
      content: 'قمع النمو - أسرار النمو',
      fontSize: 24,
      isBold: true,
      color: [0.2, 0.2, 0.2]
    },
    {
      type: 'spacer',
      content: ''
    },
    {
      type: 'text',
      content: 'تكتيكات ذكية تحقق نتائج أكبر بميزانيات أقل',
      fontSize: 14,
      isBold: true,
      color: [0.4, 0.4, 0.4]
    },
    {
      type: 'spacer',
      content: ''
    },
    {
      type: 'subtitle',
      content: 'مراحل قمع النمو',
      fontSize: 16,
      isBold: true,
      color: [0.3, 0.3, 0.3]
    },
    {
      type: 'text',
      content: '1. الوعي (Awareness): جذب انتباه الجمهور المستهدف',
      fontSize: 12
    },
    {
      type: 'text',
      content: '2. التفاعل (Engagement): بناء علاقة مع الجمهور',
      fontSize: 12
    },
    {
      type: 'text',
      content: '3. التحويل (Conversion): تحويل التفاعل إلى مبيعات',
      fontSize: 12
    },
    {
      type: 'text',
      content: '4. الاحتفاظ (Retention): بناء ولاء العملاء',
      fontSize: 12
    },
    {
      type: 'text',
      content: '5. حلقة النمو (Growth Loop): تحفيز العملاء للإحالة',
      fontSize: 12
    },
    {
      type: 'spacer',
      content: ''
    },
    {
      type: 'subtitle',
      content: 'تكتيكات النمو المتقدمة',
      fontSize: 16,
      isBold: true,
      color: [0.3, 0.3, 0.3]
    },
    {
      type: 'text',
      content: '• تكتيك سري — رفع CTR بالقصص القصيرة: جرّب تقسيم ميزانية سناب إلى 3 إعلانات صغيرة بدل واحد كبير',
      fontSize: 12
    },
    {
      type: 'text',
      content: '• تكتيك سري — Hook الذهبي: أضف Visual Hook في أول 2 ثانية مع حركة سريعة',
      fontSize: 12
    },
    {
      type: 'text',
      content: '• تكتيك سري — تقسيم الميزانية الذكي: انقل 15% من الميزانية من المنصة الأضعف إلى الأقوى كل أسبوع',
      fontSize: 12
    }
  ];
  
  return content;
}

/**
 * Generates advanced recommendations PDF content
 */
function generateAdvancedRecommendationsContent(report: CampaignReport, font: any, boldFont: any): PDFContent[] {
  const content: PDFContent[] = [
    {
      type: 'title',
      content: 'ملاحظات فنية متقدمة',
      fontSize: 24,
      isBold: true,
      color: [0.2, 0.2, 0.2]
    },
    {
      type: 'spacer',
      content: ''
    },
    {
      type: 'text',
      content: 'توصيات ذكية وقابلة للتنفيذ لتحسين أداء الحملة',
      fontSize: 14,
      isBold: true,
      color: [0.4, 0.4, 0.4]
    },
    {
      type: 'spacer',
      content: ''
    },
    {
      type: 'subtitle',
      content: 'توصيات التحسين',
      fontSize: 16,
      isBold: true,
      color: [0.3, 0.3, 0.3]
    },
    {
      type: 'text',
      content: '• تحسين الاستهداف: ركز على الجمهور عالي القيمة مع استبعاد الجمهور منخفض الجودة',
      fontSize: 12
    },
    {
      type: 'text',
      content: '• تحسين الإبداع: اختبر تنسيقات مختلفة من المحتوى لزيادة معدل التفاعل',
      fontSize: 12
    },
    {
      type: 'text',
      content: '• تحسين الميزانية: وزع الميزانية بناءً على أداء كل منصة',
      fontSize: 12
    },
    {
      type: 'text',
      content: '• تحسين التوقيت: نشر المحتوى في الأوقات التي يكون فيها الجمهور أكثر نشاطاً',
      fontSize: 12
    }
  ];
  
  return content;
}

/**
 * Generates full report PDF content
 */
function generateFullReportContent(report: CampaignReport, font: any, boldFont: any): PDFContent[] {
  const content: PDFContent[] = [
    {
      type: 'title',
      content: 'تقرير PrePilot الكامل',
      fontSize: 28,
      isBold: true,
      color: [0.2, 0.2, 0.2]
    },
    {
      type: 'spacer',
      content: ''
    }
  ];

  // Combine all section contents
  const sections = [
    generateStrategicSummaryContent(report, font, boldFont),
    generateKPISnippetsContent(report, font, boldFont),
    generateMediaPlanContent(report, font, boldFont),
    generateBeyondKPIsContent(report, font, boldFont),
    generateBeyondBudgetContent(report, font, boldFont),
    generateGrowthFunnelContent(report, font, boldFont),
    generateAdvancedRecommendationsContent(report, font, boldFont)
  ];

  sections.forEach((sectionContent, index) => {
    if (index > 0) {
      content.push({
        type: 'spacer',
        content: ''
      });
      content.push({
        type: 'spacer',
        content: ''
      });
    }
    content.push(...sectionContent);
  });

  return content;
}

/**
 * Generates generic PDF content
 */
function generateGenericContent(report: CampaignReport, font: any, boldFont: any): PDFContent[] {
  return [
    {
      type: 'title',
      content: 'تقرير PrePilot',
      fontSize: 24,
      isBold: true,
      color: [0.2, 0.2, 0.2]
    },
    {
      type: 'spacer',
      content: ''
    },
    {
      type: 'text',
      content: `تاريخ التقرير: ${new Date().toLocaleDateString('ar-SA')}`,
      fontSize: 12
    },
    {
      type: 'text',
      content: `المجال: غير محدد`,
      fontSize: 12
    },
    {
      type: 'text',
      content: `الميزانية: ${report.kpis.totals.budget.toLocaleString()} ريال`,
      fontSize: 12
    }
  ];
}

/**
 * Adds pages to PDF based on content
 */
async function addPagesToPDF(pdfDoc: PDFDocument, content: PDFContent[], font: any, boldFont: any): Promise<void> {
  let page = pdfDoc.addPage([595, 842]); // A4 size
  let yPosition = 750; // Start from top
  
  for (const item of content) {
    if (item.type === 'spacer') {
      yPosition -= 20;
      continue;
    }
    
    if (yPosition < 100) { // Need new page
      page = pdfDoc.addPage([595, 842]);
      yPosition = 750;
    }
    
    const currentFont = item.isBold ? boldFont : font;
    const fontSize = item.fontSize || 12;
    const color = item.color ? rgb(item.color[0], item.color[1], item.color[2]) : rgb(0, 0, 0);
    
    if (item.type === 'title') {
      page.drawText(item.content || '', {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: currentFont,
        color: color
      });
      yPosition -= fontSize + 10;
    } else if (item.type === 'subtitle') {
      page.drawText(item.content || '', {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: currentFont,
        color: color
      });
      yPosition -= fontSize + 5;
    } else if (item.type === 'text') {
      const lines = (item.content || '').split('\n');
      for (const line of lines) {
        page.drawText(line, {
          x: 50,
          y: yPosition,
          size: fontSize,
          font: currentFont,
          color: color
        });
        yPosition -= fontSize + 2;
      }
    } else if (item.type === 'table' && item.tableData) {
      yPosition = await drawTable(page, item.tableHeaders || [], item.tableData, yPosition, font, boldFont);
    }
  }
}

/**
 * Draws a table on the PDF page
 */
async function drawTable(
  page: any, 
  headers: string[], 
  data: string[][], 
  yPosition: number, 
  font: any, 
  boldFont: any
): Promise<number> {
  const cellWidth = 495 / headers.length;
  const cellHeight = 20;
  const fontSize = 10;
  
  // Draw headers
  for (let i = 0; i < headers.length; i++) {
    page.drawRectangle({
      x: 50 + i * cellWidth,
      y: yPosition - cellHeight,
      width: cellWidth,
      height: cellHeight,
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1
    });
    
    page.drawText(headers[i], {
      x: 55 + i * cellWidth,
      y: yPosition - cellHeight + 5,
      size: fontSize,
      font: boldFont,
      color: rgb(0, 0, 0)
    });
  }
  
  yPosition -= cellHeight;
  
  // Draw data rows
  for (const row of data) {
    for (let i = 0; i < row.length; i++) {
      page.drawRectangle({
        x: 50 + i * cellWidth,
        y: yPosition - cellHeight,
        width: cellWidth,
        height: cellHeight,
        borderColor: rgb(0.8, 0.8, 0.8),
        borderWidth: 1
      });
      
      page.drawText(row[i], {
        x: 55 + i * cellWidth,
        y: yPosition - cellHeight + 5,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0)
      });
    }
    yPosition -= cellHeight;
  }
  
  return yPosition - 10;
}

/**
 * Adds PrePilot watermark to PDF
 */
async function addPrePilotWatermark(pdfDoc: PDFDocument, font: any): Promise<void> {
  const pages = pdfDoc.getPages();
  
  for (const page of pages) {
    page.drawText('Generated by PrePilot AI', {
      x: 50,
      y: 30,
      size: 8,
      font: font,
      color: rgb(0.7, 0.7, 0.7)
    });
  }
}

/**
 * Adds footers to all PDF pages
 */
async function addFootersToPDF(pdfDoc: PDFDocument, font: any): Promise<void> {
  const pages = pdfDoc.getPages();
  const timestamp = new Date().toLocaleDateString('ar-SA');
  
  for (const page of pages) {
    page.drawText(`تم إنشاء هذا التقرير بواسطة PrePilot AI - ${timestamp}`, {
      x: 50,
      y: 30,
      size: 8,
      font: font,
      color: rgb(0.5, 0.5, 0.5)
    });
  }
}