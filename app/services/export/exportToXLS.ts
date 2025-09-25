/**
 * @file exportToXLS.ts
 * @description Excel export functionality using ExcelJS for secure and feature-rich Excel generation
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import ExcelJS from 'exceljs';
import { ExportOptions, ExportResult } from './exportTypes';

/**
 * @function exportToXLS
 * @description تصدير تقرير الحملة إلى ملف Excel باستخدام ExcelJS الآمن والمتقدم
 * يوفر تنسيقات متقدمة وتصميم احترافي مع دعم كامل للغة العربية
 * @param {ExportOptions} options - خيارات التصدير بما في ذلك التقرير واسم الملف
 * @returns {Promise<ExportResult>} نتيجة عملية التصدير مع معلومات النجاح أو الفشل
 */
export async function exportToXLS(options: ExportOptions): Promise<ExportResult> {
  try {
    const { report, filename } = options;
    
    // إنشاء مصنف جديد
    const workbook = new ExcelJS.Workbook();
    
    // إعداد معلومات المصنف
    workbook.creator = 'PrePilot.Cloud';
    workbook.lastModifiedBy = 'PrePilot.Cloud';
    workbook.created = new Date();
    workbook.modified = new Date();

    // إنشاء ورقة الملخص
    await createSummarySheet(workbook, report);
    
    // إنشاء ورقة مؤشرات الأداء
    await createKPIsSheet(workbook, report);
    
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
 * @function createSummarySheet
 * @description إنشاء ورقة الملخص العام للتقرير مع التنسيق المطلوب
 * @param {ExcelJS.Workbook} workbook - المصنف الرئيسي
 * @param {any} report - بيانات التقرير
 */
async function createSummarySheet(workbook: ExcelJS.Workbook, report: any) {
  const worksheet = workbook.addWorksheet('الملخص العام');
  
  // تعريف الأعمدة
  worksheet.columns = [
    { header: 'المعلومة', key: 'info', width: 25 },
    { header: 'القيمة', key: 'value', width: 30 }
  ];

  // تنسيق رأس الجدول
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = { 
    type: 'pattern', 
    pattern: 'solid', 
    fgColor: { argb: 'FF8B5CF6' } // اللون البنفسجي الأساسي
  };
  headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

  // إضافة البيانات
  const summaryData = [
    { info: 'العنوان', value: report.narrative?.substring(0, 50) || 'تقرير الحملة الإعلانية' },
    { info: 'الصناعة', value: report.industry || 'غير محدد' },
    { info: 'الميزانية الإجمالية (ريال)', value: report.kpis?.totals?.budget || 0 },
    { info: 'العائد المتوقع (ROAS)', value: report.kpis?.totals?.roas || 0 },
    { info: 'إجمالي الانطباعات', value: report.kpis?.totals?.impressions || 0 },
    { info: 'إجمالي النقرات', value: report.kpis?.totals?.clicks || 0 },
    { info: 'معدل النقر (%)', value: report.kpis?.totals?.ctr || 0 },
    { info: 'معدل التحويل (%)', value: report.kpis?.totals?.cvr || 0 }
  ];

  summaryData.forEach((item, index) => {
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

/**
 * @function createKPIsSheet
 * @description إنشاء ورقة مؤشرات الأداء التفصيلية لكل منصة
 * @param {ExcelJS.Workbook} workbook - المصنف الرئيسي
 * @param {any} report - بيانات التقرير
 */
async function createKPIsSheet(workbook: ExcelJS.Workbook, report: any) {
  const worksheet = workbook.addWorksheet('مؤشرات الأداء');
  
  // تعريف الأعمدة
  worksheet.columns = [
    { header: 'المنصة', key: 'platform', width: 20 },
    { header: 'الميزانية (ريال)', key: 'budget', width: 18 },
    { header: 'الانطباعات', key: 'impressions', width: 15 },
    { header: 'النقرات', key: 'clicks', width: 12 },
    { header: 'التحويلات', key: 'conversions', width: 12 },
    { header: 'تكلفة النقرة (ريال)', key: 'cpc', width: 18 },
    { header: 'ROAS', key: 'roas', width: 10 }
  ];

  // تنسيق رأس الجدول
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = { 
    type: 'pattern', 
    pattern: 'solid', 
    fgColor: { argb: 'FF8B5CF6' }
  };
  headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

  // إضافة البيانات
  if (report.kpis?.perPlatform) {
    Object.entries(report.kpis.perPlatform).forEach(([platform, kpis]: [string, any], index) => {
      const row = worksheet.addRow({
        platform,
        budget: kpis.budget || 0,
        impressions: kpis.impressions || 0,
        clicks: kpis.clicks || 0,
        conversions: kpis.conversions || 0,
        cpc: kpis.cpc || 0,
        roas: kpis.roas || 0
      });

      // تنسيق الأرقام
      row.getCell('budget').numFmt = '"SAR" #,##0.00';
      row.getCell('impressions').numFmt = '#,##0';
      row.getCell('clicks').numFmt = '#,##0';
      row.getCell('conversions').numFmt = '#,##0';
      row.getCell('cpc').numFmt = '"SAR" #,##0.00';
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

/**
 * @function createRecommendationsSheet
 * @description إنشاء ورقة التوصيات إذا كانت متوفرة
 * @param {ExcelJS.Workbook} workbook - المصنف الرئيسي
 * @param {any} report - بيانات التقرير
 */
async function createRecommendationsSheet(workbook: ExcelJS.Workbook, report: any) {
  const worksheet = workbook.addWorksheet('التوصيات');
  
  // تعريف الأعمدة
  worksheet.columns = [
    { header: 'رقم', key: 'number', width: 8 },
    { header: 'التوصية', key: 'recommendation', width: 80 }
  ];

  // تنسيق رأس الجدول
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = { 
    type: 'pattern', 
    pattern: 'solid', 
    fgColor: { argb: 'FF8B5CF6' }
  };
  headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

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
