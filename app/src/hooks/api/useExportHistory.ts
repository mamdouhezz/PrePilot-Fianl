/**
 * @file useExportHistory.ts
 * @description Custom hook for managing export history with TanStack Query
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types for export history
export interface ExportHistoryItem {
  id: string;
  reportId: string;
  reportName: string;
  format: 'pdf' | 'xlsx' | 'csv' | 'json';
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
  fileSize?: number;
  downloadUrl?: string;
  error?: string;
}

// Mock API functions - سيتم استبدالها بـ IndexedDB
const fetchExportHistory = async (): Promise<ExportHistoryItem[]> => {
  const stored = localStorage.getItem('prepilotExportHistory');
  if (stored) {
    return JSON.parse(stored).sort((a: ExportHistoryItem, b: ExportHistoryItem) => b.timestamp - a.timestamp);
  }
  return [];
};

const createExportRecord = async (exportData: Omit<ExportHistoryItem, 'id' | 'timestamp'>): Promise<ExportHistoryItem> => {
  const newExport: ExportHistoryItem = {
    ...exportData,
    id: Date.now().toString(),
    timestamp: Date.now(),
  };
  
  const existing = await fetchExportHistory();
  const updated = [newExport, ...existing];
  localStorage.setItem('prepilotExportHistory', JSON.stringify(updated));
  
  return newExport;
};

const updateExportStatus = async ({ id, status, downloadUrl, error }: { id: string; status: 'completed' | 'failed'; downloadUrl?: string; error?: string }): Promise<void> => {
  const existing = await fetchExportHistory();
  const updated = existing.map(exportItem => 
    exportItem.id === id 
      ? { ...exportItem, status, downloadUrl, error }
      : exportItem
  );
  localStorage.setItem('prepilotExportHistory', JSON.stringify(updated));
};

const deleteExportRecord = async (id: string): Promise<void> => {
  const existing = await fetchExportHistory();
  const updated = existing.filter(exportItem => exportItem.id !== id);
  localStorage.setItem('prepilotExportHistory', JSON.stringify(updated));
};

/**
 * Hook للحصول على تاريخ التصدير
 */
export function useExportHistory() {
  return useQuery({
    queryKey: ['exportHistory'],
    queryFn: fetchExportHistory,
    staleTime: 30 * 1000, // 30 ثانية - تاريخ التصدير يتغير بسرعة
  });
}

/**
 * Hook لإنشاء سجل تصدير جديد
 */
export function useCreateExportRecord() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createExportRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exportHistory'] });
    },
    onError: (error) => {
      console.error('خطأ في إنشاء سجل التصدير:', error);
    },
  });
}

/**
 * Hook لتحديث حالة التصدير
 */
export function useUpdateExportStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateExportStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exportHistory'] });
    },
    onError: (error) => {
      console.error('خطأ في تحديث حالة التصدير:', error);
    },
  });
}

/**
 * Hook لحذف سجل تصدير
 */
export function useDeleteExportRecord() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteExportRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exportHistory'] });
    },
    onError: (error) => {
      console.error('خطأ في حذف سجل التصدير:', error);
    },
  });
}

/**
 * Hook للحصول على إحصائيات التصدير
 */
export function useExportStats() {
  return useQuery({
    queryKey: ['exportStats'],
    queryFn: async () => {
      const history = await fetchExportHistory();
      const total = history.length;
      const completed = history.filter(item => item.status === 'completed').length;
      const pending = history.filter(item => item.status === 'pending').length;
      const failed = history.filter(item => item.status === 'failed').length;
      
      return {
        total,
        completed,
        pending,
        failed,
        successRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    },
    staleTime: 60 * 1000, // 1 دقيقة
  });
}
