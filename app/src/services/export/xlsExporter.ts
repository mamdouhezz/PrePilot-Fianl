/**
 * @file xlsExporter.ts
 * @description Advanced Excel exporter using ExcelJS with comprehensive formatting and styling
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import { ExportOptions, ExportResult } from './exportTypes';
import ExcelJS from 'exceljs';
import { PLATFORM_INFO } from '../../constants';

/**
 * @function exportToXLS
 * @description تصدير متقدم لتقرير الحملة إلى Excel مع تنسيق شامل ومحترف
 * يوفر ورقة تفصيلية شاملة مع جميع مؤشرات الأداء والتحليلات
 * @param {ExportOptions} options - خيارات التصدير مع بيانات التقرير
 * @returns {Promise<ExportResult>} نتيجة عملية التصدير
 */
export async function exportToXLS(options: ExportOptions): Promise<ExportResult> {
  try {
    const { report, filename } = options;
    
    // إنشاء مصنف جديد مع ExcelJS
    const workbook = new ExcelJS.Workbook();
    
    // إعداد معلومات المصنف
    workbook.creator = 'PrePilot.Cloud';
    workbook.lastModifiedBy = 'PrePilot.Cloud';
    workbook.created = new Date();
    workbook.modified = new Date();

    // إنشاء الورقة الرئيسية
    await createMainReportSheet(workbook, report);
    
    // إنشاء ورقة التوصيات إذا كانت متوفرة
    if (report.recommendations && report.recommendations.length > 0) {
      await createRecommendationsSheet(workbook, report);
    }

    // إنشاء الملف وتنزيله
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    
    // تنزيل الملف
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return {
      success: true,
      message: `تم إنشاء ملف Excel لقسم "${options.section}" بنجاح.`,
      filename: `${filename}.xlsx`,
    };
  } catch (error) {
    console.error('Excel export failed:', error);
    return {
      success: false,
      message: `فشل في تصدير Excel: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
    };
  }
}

/**
 * @function createMainReportSheet
 * @description إنشاء الورقة الرئيسية للتقرير مع جميع التفاصيل
 * @param {ExcelJS.Workbook} workbook - المصنف الرئيسي
 * @param {any} report - بيانات التقرير
 */
async function createMainReportSheet(workbook: ExcelJS.Workbook, report: any) {
  const worksheet = workbook.addWorksheet('تقرير الحملة');
  
  // إضافة عنوان رئيسي
  const titleRow = worksheet.addRow(['PrePilot - تقرير الحملة الإعلانية']);
  titleRow.getCell(1).font = { 
    bold: true, 
    size: 16, 
    color: { argb: 'FF8B5CF6' } 
  };
  titleRow.height = 30;
  worksheet.addRow(['']); // سطر فارغ

  // إضافة قسم المعلومات العامة
  const generalInfoTitle = worksheet.addRow(['معلومات عامة']);
  generalInfoTitle.getCell(1).font = { bold: true, size: 14 };
  generalInfoTitle.height = 25;

  // تعريف الأعمدة للمعلومات العامة
  worksheet.columns = [
    { header: 'المعلومة', key: 'info', width: 30 },
    { header: 'القيمة', key: 'value', width: 25 }
  ];

  // إضافة البيانات العامة
  const generalData = [
    { info: 'الصناعة', value: report.industry || 'غير محدد' },
    { info: 'الميزانية الإجمالية (ريال)', value: report.kpis?.totals?.budget || 0 },
    { info: 'العائد المتوقع (ROAS)', value: report.kpis?.totals?.roas || 0 },
    { info: 'إجمالي الانطباعات', value: report.kpis?.totals?.impressions || 0 },
    { info: 'إجمالي النقرات', value: report.kpis?.totals?.clicks || 0 },
    { info: 'معدل النقر (%)', value: report.kpis?.totals?.ctr || 0 },
    { info: 'معدل التحويل (%)', value: report.kpis?.totals?.cvr || 0 },
    { info: 'تكلفة النقرة (ريال)', value: report.kpis?.totals?.cpc || 0 },
    { info: 'تكلفة اكتساب العميل (ريال)', value: report.kpis?.totals?.cac || 0 }
  ];

  generalData.forEach((item, index) => {
    const row = worksheet.addRow(item);
    
    // تنسيق الأرقام
    if (typeof item.value === 'number') {
      if (item.info.includes('ريال')) {
        row.getCell('value').numFmt = '"SAR" #,##0.00';
      } else if (item.info.includes('%')) {
        row.getCell('value').numFmt = '0.00%';
      } else if (item.info.includes('ROAS')) {
        row.getCell('value').numFmt = '0.00x';
      } else {
        row.getCell('value').numFmt = '#,##0';
      }
    }
    
    // تنسيق الصفوف المتناوبة
    if (index % 2 === 0) {
      row.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF3F4F6' }
      };
    }
  });

  // إضافة سطر فارغ
  worksheet.addRow(['']);
  worksheet.addRow(['']);

  // إضافة قسم تفصيل المنصات
  const platformsTitle = worksheet.addRow(['تفصيل المنصات']);
  platformsTitle.getCell(1).font = { bold: true, size: 14 };
  platformsTitle.height = 25;

  // إعادة تعريف الأعمدة لتفصيل المنصات
  const platformColumns = [
    { header: 'المنصة', key: 'platform', width: 20 },
    { header: 'الميزانية (ريال)', key: 'budget', width: 18 },
    { header: 'النسبة (%)', key: 'percentage', width: 12 },
    { header: 'الانطباعات', key: 'impressions', width: 15 },
    { header: 'النقرات', key: 'clicks', width: 12 },
    { header: 'معدل النقر (%)', key: 'ctr', width: 15 },
    { header: 'التحويلات', key: 'conversions', width: 12 },
    { header: 'معدل التحويل (%)', key: 'cvr', width: 15 },
    { header: 'ROAS', key: 'roas', width: 10 }
  ];

  // تطبيق الأعمدة الجديدة
  const currentRowCount = worksheet.rowCount;
  worksheet.spliceRows(currentRowCount, 0, platformColumns.map(col => col.header));

  // تنسيق رأس جدول المنصات
  const platformHeaderRow = worksheet.getRow(currentRowCount);
  platformHeaderRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  platformHeaderRow.fill = { 
    type: 'pattern', 
    pattern: 'solid', 
    fgColor: { argb: 'FF8B5CF6' }
  };
  platformHeaderRow.alignment = { horizontal: 'center', vertical: 'middle' };
  platformHeaderRow.height = 25;

  // إضافة بيانات المنصات
  if (report.kpis?.perPlatform) {
    Object.entries(report.kpis.perPlatform).forEach(([platformId, kpis]: [string, any], index) => {
      const platformInfo = PLATFORM_INFO[platformId as keyof typeof PLATFORM_INFO];
      const budget = report.budgetAllocation?.[platformId] || 0;
      const totalBudget = report.kpis?.totals?.budget || 0;
      const percentage = totalBudget > 0 ? (budget / totalBudget * 100) : 0;
      
      const row = worksheet.addRow({
        platform: platformInfo?.name || platformId,
        budget: budget,
        percentage: percentage,
        impressions: kpis.impressions || 0,
        clicks: kpis.clicks || 0,
        ctr: kpis.ctr || 0,
        conversions: kpis.conversions || 0,
        cvr: kpis.cvr || 0,
        roas: kpis.roas || 0
      });

      // تنسيق الأرقام
      row.getCell('budget').numFmt = '"SAR" #,##0.00';
      row.getCell('percentage').numFmt = '0.00%';
      row.getCell('impressions').numFmt = '#,##0';
      row.getCell('clicks').numFmt = '#,##0';
      row.getCell('ctr').numFmt = '0.00%';
      row.getCell('conversions').numFmt = '#,##0';
      row.getCell('cvr').numFmt = '0.00%';
      row.getCell('roas').numFmt = '0.00x';

      // تنسيق الصفوف المتناوبة
      if (index % 2 === 0) {
        row.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF3F4F6' }
        };
      }
    });
  }

  // تطبيق الحدود على جميع الصفوف
  worksheet.eachRow({ includeEmpty: false }, (row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
  });
}

/**
 * @function createRecommendationsSheet
 * @description إنشاء ورقة التوصيات مع تنسيق احترافي
 * @param {ExcelJS.Workbook} workbook - المصنف الرئيسي
 * @param {any} report - بيانات التقرير
 */
async function createRecommendationsSheet(workbook: ExcelJS.Workbook, report: any) {
  const worksheet = workbook.addWorksheet('التوصيات');
  
  // إضافة عنوان
  const titleRow = worksheet.addRow(['التوصيات الاستراتيجية']);
  titleRow.getCell(1).font = { 
    bold: true, 
    size: 16, 
    color: { argb: 'FF8B5CF6' } 
  };
  titleRow.height = 30;
  worksheet.addRow(['']); // سطر فارغ

  // تعريف الأعمدة
  worksheet.columns = [
    { header: 'رقم', key: 'number', width: 8 },
    { header: 'التوصية', key: 'recommendation', width: 80 }
  ];

  // تنسيق رأس الجدول
  const headerRow = worksheet.getRow(3);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = { 
    type: 'pattern', 
    pattern: 'solid', 
    fgColor: { argb: 'FF8B5CF6' }
  };
  headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
  headerRow.height = 25;

  // إضافة التوصيات
  report.recommendations.forEach((recommendation: string, index: number) => {
    const row = worksheet.addRow({
      number: index + 1,
      recommendation
    });

    // تنسيق الصفوف المتناوبة
    if (index % 2 === 0) {
      row.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF3F4F6' }
      };
    }

    // تنسيق النص للتوصية
    row.getCell('recommendation').alignment = { 
      horizontal: 'right', 
      vertical: 'top',
      wrapText: true 
    };
  });

  // تطبيق الحدود
  worksheet.eachRow({ includeEmpty: false }, (row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
  });
}
