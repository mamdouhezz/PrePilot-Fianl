/**
 * @file db.ts
 * @description Database configuration and schema for IndexedDB using Dexie.js
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import Dexie, { Table } from 'dexie';
import { CampaignData } from '../../types';

// Types for database entities
export interface ExportHistoryRecord {
  id?: number;
  reportId: string;
  reportName: string;
  format: 'pdf' | 'xlsx' | 'csv' | 'json';
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
  fileSize?: number;
  downloadUrl?: string;
  error?: string;
  campaignData?: CampaignData; // حفظ بيانات الحملة المرتبطة
}

export interface UserPreferences {
  id?: number;
  userId: string;
  theme: 'light' | 'dark' | 'auto';
  language: 'ar' | 'en';
  notifications: boolean;
  autoSave: boolean;
  lastUpdated: number;
}

export interface CacheEntry {
  id?: number;
  key: string;
  data: any;
  timestamp: number;
  expiresAt: number;
  type: 'api' | 'static' | 'user';
}

export interface CampaignPlan {
  id?: number;
  name: string;
  data: CampaignData;
  isTemplate: boolean;
  createdAt: number;
  updatedAt: number;
  lastUsed?: number;
  tags?: string[];
}

/**
 * PrePilot Database Class
 * يدير قاعدة البيانات المحلية باستخدام IndexedDB
 */
export class PrePilotDB extends Dexie {
  // جداول قاعدة البيانات
  exportHistory!: Table<ExportHistoryRecord>;
  userPreferences!: Table<UserPreferences>;
  cache!: Table<CacheEntry>;
  campaignPlans!: Table<CampaignPlan>;

  constructor() {
    super('prepilotDB');
    
    // تعريف الجداول والفهارس
    this.version(1).stores({
      exportHistory: '++id, reportId, format, status, timestamp, [reportId+format]',
      userPreferences: '++id, userId, lastUpdated',
      cache: '++id, key, timestamp, expiresAt, type, [key+type]',
      campaignPlans: '++id, name, isTemplate, createdAt, updatedAt, lastUsed, tags, [name+isTemplate]'
    });

    // إضافة hooks للتحقق من صحة البيانات
    this.exportHistory.hook('creating', (primKey, obj, trans) => {
      if (!obj.timestamp) {
        obj.timestamp = Date.now();
      }
    });

    this.campaignPlans.hook('creating', (primKey, obj, trans) => {
      const now = Date.now();
      if (!obj.createdAt) {
        obj.createdAt = now;
      }
      if (!obj.updatedAt) {
        obj.updatedAt = now;
      }
    });

    this.campaignPlans.hook('updating', (modifications, primKey, obj, trans) => {
      modifications.updatedAt = Date.now();
    });
  }

  /**
   * تنظيف البيانات المنتهية الصلاحية
   */
  async cleanupExpiredData(): Promise<void> {
    const now = Date.now();
    
    // حذف بيانات التخزين المؤقت المنتهية الصلاحية
    await this.cache
      .where('expiresAt')
      .below(now)
      .delete();

    // حذف سجلات التصدير القديمة (أكثر من 90 يوم)
    const ninetyDaysAgo = now - (90 * 24 * 60 * 60 * 1000);
    await this.exportHistory
      .where('timestamp')
      .below(ninetyDaysAgo)
      .delete();

    // حذف الخطط غير المستخدمة (أكثر من 180 يوم)
    const sixMonthsAgo = now - (180 * 24 * 60 * 60 * 1000);
    await this.campaignPlans
      .where('lastUsed')
      .below(sixMonthsAgo)
      .and(plan => !plan.isTemplate)
      .delete();
  }

  /**
   * الحصول على إحصائيات قاعدة البيانات
   */
  async getStats(): Promise<{
    exportHistoryCount: number;
    campaignPlansCount: number;
    cacheEntriesCount: number;
    totalSize: number;
  }> {
    const [exportHistoryCount, campaignPlansCount, cacheEntriesCount] = await Promise.all([
      this.exportHistory.count(),
      this.campaignPlans.count(),
      this.cache.count(),
    ]);

    return {
      exportHistoryCount,
      campaignPlansCount,
      cacheEntriesCount,
      totalSize: exportHistoryCount + campaignPlansCount + cacheEntriesCount,
    };
  }

  /**
   * تصدير جميع البيانات (للاستخدام في النسخ الاحتياطي)
   */
  async exportAllData(): Promise<{
    exportHistory: ExportHistoryRecord[];
    campaignPlans: CampaignPlan[];
    userPreferences: UserPreferences[];
  }> {
    const [exportHistory, campaignPlans, userPreferences] = await Promise.all([
      this.exportHistory.toArray(),
      this.campaignPlans.toArray(),
      this.userPreferences.toArray(),
    ]);

    return {
      exportHistory,
      campaignPlans,
      userPreferences,
    };
  }

  /**
   * استيراد البيانات (للاستخدام في استعادة النسخ الاحتياطي)
   */
  async importData(data: {
    exportHistory?: ExportHistoryRecord[];
    campaignPlans?: CampaignPlan[];
    userPreferences?: UserPreferences[];
  }): Promise<void> {
    await this.transaction('rw', [this.exportHistory, this.campaignPlans, this.userPreferences], async () => {
      if (data.exportHistory) {
        await this.exportHistory.bulkAdd(data.exportHistory);
      }
      if (data.campaignPlans) {
        await this.campaignPlans.bulkAdd(data.campaignPlans);
      }
      if (data.userPreferences) {
        await this.userPreferences.bulkAdd(data.userPreferences);
      }
    });
  }
}

// إنشاء مثيل قاعدة البيانات
export const db = new PrePilotDB();

// تشغيل تنظيف البيانات عند بدء التطبيق
db.cleanupExpiredData().catch(console.error);

// إضافة event listeners لمراقبة الأخطاء
db.on('error', (error) => {
  console.error('خطأ في قاعدة البيانات:', error);
});

db.on('versionchange', (event) => {
  console.log('تحديث قاعدة البيانات مطلوب:', event);
  // يمكن إضافة منطق لإعادة تحميل الصفحة إذا لزم الأمر
});

// تصدير أنواع البيانات للاستخدام في المكونات الأخرى
export type {
  ExportHistoryRecord,
  UserPreferences,
  CacheEntry,
  CampaignPlan,
};
