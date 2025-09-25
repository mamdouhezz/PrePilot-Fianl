/**
 * @file PerformanceMonitor.tsx
 * @description مكون لمراقبة أداء التطبيق وعرض إحصائيات الأداء
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiActivity, FiDatabase, FiWifi, FiWifiOff, FiDownload, FiCpu } from 'react-icons/fi';
import { useExportStatsDB } from '../../hooks/api/useExportHistoryDB';
import { useCampaignPlansStatsDB } from '../../hooks/api/useCampaignPlansDB';
import { db } from '../../services/db';

/**
 * @component PerformanceMonitor
 * @description مكون لمراقبة أداء التطبيق وإحصائيات قاعدة البيانات
 * @returns {JSX.Element} لوحة مراقبة الأداء
 */
export const PerformanceMonitor: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [dbStats, setDbStats] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const { data: exportStats } = useExportStatsDB();
  const { data: campaignStats } = useCampaignPlansStatsDB();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const fetchDbStats = async () => {
      try {
        const stats = await db.getStats();
        setDbStats(stats);
      } catch (error) {
        console.error('خطأ في جلب إحصائيات قاعدة البيانات:', error);
      }
    };

    fetchDbStats();
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-20 right-4 z-40 p-2 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        title="مراقبة الأداء"
      >
        <FiActivity className="w-5 h-5" />
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-20 right-4 z-40 w-80 bg-gray-900 text-white rounded-lg shadow-xl border border-gray-700 p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <FiActivity className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-lg">مراقبة الأداء</h3>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <FiActivity className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {/* حالة الاتصال */}
          <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
            <div className="flex items-center space-x-2 space-x-reverse">
              {isOnline ? (
                <FiWifi className="w-4 h-4 text-green-400" />
              ) : (
                <FiWifiOff className="w-4 h-4 text-red-400" />
              )}
              <span className="text-sm">الاتصال</span>
            </div>
            <span className={`text-sm font-medium ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
              {isOnline ? 'متصل' : 'غير متصل'}
            </span>
          </div>

          {/* إحصائيات قاعدة البيانات */}
          {dbStats && (
            <div className="p-2 bg-gray-800 rounded">
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <FiDatabase className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium">قاعدة البيانات المحلية</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>سجلات التصدير: {dbStats.exportHistoryCount}</div>
                <div>خطط الحملات: {dbStats.campaignPlansCount}</div>
                <div>التخزين المؤقت: {dbStats.cacheEntriesCount}</div>
                <div>المجموع: {dbStats.totalSize}</div>
              </div>
            </div>
          )}

          {/* إحصائيات التصدير */}
          {exportStats && (
            <div className="p-2 bg-gray-800 rounded">
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <FiDownload className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium">إحصائيات التصدير</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>إجمالي: {exportStats.total}</div>
                <div>مكتمل: {exportStats.completed}</div>
                <div>معلق: {exportStats.pending}</div>
                <div>فشل: {exportStats.failed}</div>
                <div>معدل النجاح: {exportStats.successRate}%</div>
                <div>حجم الملفات: {(exportStats.totalFileSize / 1024 / 1024).toFixed(1)} MB</div>
              </div>
            </div>
          )}

          {/* إحصائيات خطط الحملات */}
          {campaignStats && (
            <div className="p-2 bg-gray-800 rounded">
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <FiCpu className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium">خطط الحملات</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>إجمالي: {campaignStats.total}</div>
                <div>قوالب: {campaignStats.templates}</div>
                <div>شخصية: {campaignStats.personal}</div>
                <div>مستخدمة: {campaignStats.recentlyUsed}</div>
                <div>غير مستخدمة: {campaignStats.unused}</div>
              </div>
            </div>
          )}

          {/* معلومات الأداء */}
          <div className="p-2 bg-gray-800 rounded">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <FiActivity className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">معلومات الأداء</span>
            </div>
            <div className="text-xs space-y-1">
              <div>ذاكرة JS: {Math.round((performance as any).memory?.usedJSHeapSize / 1024 / 1024) || 'غير متاح'} MB</div>
              <div>الحد الأقصى: {Math.round((performance as any).memory?.totalJSHeapSize / 1024 / 1024) || 'غير متاح'} MB</div>
              <div>وقت التحميل: {Math.round(performance.now())} ms</div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * @component OfflineIndicator
 * @description مؤشر حالة عدم الاتصال
 * @returns {JSX.Element} مؤشر عدم الاتصال
 */
export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white text-center py-2 text-sm"
    >
      <div className="flex items-center justify-center space-x-2 space-x-reverse">
        <FiWifiOff className="w-4 h-4" />
        <span>غير متصل - التطبيق يعمل في وضع عدم الاتصال</span>
      </div>
    </motion.div>
  );
};
