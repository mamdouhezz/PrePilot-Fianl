/**
 * @file useExportHistoryDB.ts
 * @description Enhanced export history hook using IndexedDB with Dexie.js
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type ExportHistoryRecord } from '../../services/db';

/**
 * Hook للحصول على تاريخ التصدير من IndexedDB
 */
export function useExportHistoryDB() {
  // استخدام useLiveQuery للحصول على تحديثات فورية
  const exportHistory = useLiveQuery(
    () => db.exportHistory.orderBy('timestamp').reverse().toArray(),
    []
  );

  return {
    data: exportHistory || [],
    isLoading: exportHistory === undefined,
    error: null,
  };
}

/**
 * Hook للحصول على إحصائيات التصدير
 */
export function useExportStatsDB() {
  const exportHistory = useLiveQuery(
    () => db.exportHistory.toArray(),
    []
  );

  const stats = useLiveQuery(async () => {
    if (!exportHistory) return null;

    const total = exportHistory.length;
    const completed = exportHistory.filter(item => item.status === 'completed').length;
    const pending = exportHistory.filter(item => item.status === 'pending').length;
    const failed = exportHistory.filter(item => item.status === 'failed').length;

    // حساب حجم الملفات
    const totalFileSize = exportHistory
      .filter(item => item.fileSize)
      .reduce((sum, item) => sum + (item.fileSize || 0), 0);

    return {
      total,
      completed,
      pending,
      failed,
      successRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      totalFileSize,
      averageFileSize: completed > 0 ? Math.round(totalFileSize / completed) : 0,
    };
  }, [exportHistory]);

  return {
    data: stats,
    isLoading: stats === undefined,
    error: null,
  };
}

/**
 * Hook لإنشاء سجل تصدير جديد
 */
export function useCreateExportRecordDB() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (exportData: Omit<ExportHistoryRecord, 'id'>) => {
      const id = await db.exportHistory.add(exportData);
      return { ...exportData, id };
    },
    onSuccess: () => {
      // إعادة تحميل البيانات المحلية
      queryClient.invalidateQueries({ queryKey: ['exportHistoryDB'] });
    },
    onError: (error) => {
      console.error('خطأ في إنشاء سجل التصدير:', error);
    },
  });
}

/**
 * Hook لتحديث حالة التصدير
 */
export function useUpdateExportStatusDB() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      id, 
      status, 
      downloadUrl, 
      error,
      fileSize 
    }: { 
      id: number; 
      status: 'completed' | 'failed'; 
      downloadUrl?: string; 
      error?: string;
      fileSize?: number;
    }) => {
      await db.exportHistory.update(id, {
        status,
        downloadUrl,
        error,
        fileSize,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exportHistoryDB'] });
    },
    onError: (error) => {
      console.error('خطأ في تحديث حالة التصدير:', error);
    },
  });
}

/**
 * Hook لحذف سجل تصدير
 */
export function useDeleteExportRecordDB() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await db.exportHistory.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exportHistoryDB'] });
    },
    onError: (error) => {
      console.error('خطأ في حذف سجل التصدير:', error);
    },
  });
}

/**
 * Hook للحصول على سجل تصدير محدد
 */
export function useExportRecordDB(id: number) {
  const record = useLiveQuery(
    () => id ? db.exportHistory.get(id) : null,
    [id]
  );

  return {
    data: record,
    isLoading: record === undefined,
    error: null,
  };
}

/**
 * Hook للبحث في تاريخ التصدير
 */
export function useSearchExportHistoryDB(searchTerm: string) {
  const results = useLiveQuery(async () => {
    if (!searchTerm) return [];

    return await db.exportHistory
      .where('reportName')
      .startsWithIgnoreCase(searchTerm)
      .or('format')
      .equals(searchTerm.toLowerCase())
      .toArray();
  }, [searchTerm]);

  return {
    data: results || [],
    isLoading: results === undefined,
    error: null,
  };
}

/**
 * Hook للحصول على تصديرات بتنسيق معين
 */
export function useExportHistoryByFormatDB(format: 'pdf' | 'xlsx' | 'csv' | 'json') {
  const results = useLiveQuery(
    () => db.exportHistory
      .where('format')
      .equals(format)
      .reverse()
      .sortBy('timestamp'),
    [format]
  );

  return {
    data: results || [],
    isLoading: results === undefined,
    error: null,
  };
}

/**
 * Hook للحصول على تصديرات بحالة معينة
 */
export function useExportHistoryByStatusDB(status: 'pending' | 'completed' | 'failed') {
  const results = useLiveQuery(
    () => db.exportHistory
      .where('status')
      .equals(status)
      .reverse()
      .sortBy('timestamp'),
    [status]
  );

  return {
    data: results || [],
    isLoading: results === undefined,
    error: null,
  };
}
