/**
 * @file PWAUpdatePrompt.tsx
 * @description مكون لإدارة تحديثات PWA وعرض تنبيهات التحديث
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRefreshCw, FiX, FiDownload } from 'react-icons/fi';

/**
 * @component PWAUpdatePrompt
 * @description مكون لإدارة تحديثات PWA وعرض تنبيهات التحديث للمستخدم
 * @returns {JSX.Element} مكون إدارة تحديثات PWA
 */
export const PWAUpdatePrompt: React.FC = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);

  useEffect(() => {
    // Listen for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setNeedRefresh(true);
        setShowUpdatePrompt(true);
      });

      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration?.waiting) {
          setNeedRefresh(true);
          setShowUpdatePrompt(true);
        }
      });
    }
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      // Reload the page to get the new service worker
      window.location.reload();
    } catch (error) {
      console.error('خطأ في تحديث التطبيق:', error);
      setIsUpdating(false);
    }
  };

  const handleDismiss = () => {
    setShowUpdatePrompt(false);
  };

  return (
    <AnimatePresence>
      {showUpdatePrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-xl border border-purple-500/20 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FiDownload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">تحديث متاح!</h3>
                  <p className="text-sm text-purple-100">
                    إصدار جديد من PrePilot متاح للتحميل
                  </p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                disabled={isUpdating}
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <div className="flex space-x-3 space-x-reverse">
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="flex-1 bg-white text-purple-600 font-medium py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
              >
                {isUpdating ? (
                  <>
                    <FiRefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري التحديث...</span>
                  </>
                ) : (
                  <>
                    <FiRefreshCw className="w-4 h-4" />
                    <span>تحديث الآن</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleDismiss}
                disabled={isUpdating}
                className="px-4 py-2 text-purple-100 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
              >
                لاحقاً
              </button>
            </div>

            <div className="mt-3 text-xs text-purple-200">
              💡 التحديث سيحسن الأداء ويضيف ميزات جديدة
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * @component PWAInstallPrompt
 * @description مكون لعرض تنبيه تثبيت PWA
 * @returns {JSX.Element} مكون تنبيه تثبيت PWA
 */
export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('تم قبول تثبيت PWA');
    } else {
      console.log('تم رفض تثبيت PWA');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  if (!showInstallPrompt) return null;

  return (
    <AnimatePresence>
      {showInstallPrompt && (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96"
      >
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg shadow-xl border border-green-500/20 p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="p-2 bg-white/20 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">ثبت التطبيق!</h3>
                <p className="text-sm text-green-100">
                  احصل على تجربة أفضل مع التطبيق المثبت
                </p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>

          <div className="flex space-x-3 space-x-reverse">
            <button
              onClick={handleInstall}
              className="flex-1 bg-white text-green-600 font-medium py-2 px-4 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>تثبيت</span>
            </button>
            
            <button
              onClick={handleDismiss}
              className="px-4 py-2 text-green-100 hover:bg-white/20 rounded-lg transition-colors"
            >
              لاحقاً
            </button>
          </div>

          <div className="mt-3 text-xs text-green-200">
            🚀 وصول سريع وإشعارات وتحديثات تلقائية
          </div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};
