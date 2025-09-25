/**
 * @file GenericErrorBoundary.tsx
 * @description Comprehensive error boundary component for application resilience
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi';
import { Button } from '../ui/Button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  context?: string;
}

/**
 * @component ErrorFallback
 * @description مكون عرض خطأ شامل مع خيارات الاسترداد
 * @param {ErrorFallbackProps} props - خصائص المكون
 * @returns {JSX.Element} واجهة خطأ مع خيارات الاسترداد
 */
const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
  context = 'التطبيق'
}) => {
  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
            <FiAlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">
          عذرًا، حدث خطأ ما
        </h1>
        
        <p className="text-gray-400 mb-6">
          يبدو أن هناك مشكلة في {context}. نحن نعمل على إصلاحها.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-gray-700 rounded-lg text-left">
            <h3 className="text-sm font-semibold text-red-400 mb-2">
              تفاصيل الخطأ (وضع التطوير):
            </h3>
            <pre className="text-xs text-gray-300 whitespace-pre-wrap overflow-auto max-h-32">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </div>
        )}
        
        <div className="space-y-3">
          <Button
            onClick={resetErrorBoundary}
            variant="primary"
            leftIcon={<FiRefreshCw />}
            fullWidth
          >
            إعادة المحاولة
          </Button>
          
          <Button
            onClick={handleGoHome}
            variant="outline"
            leftIcon={<FiHome />}
            fullWidth
          >
            العودة للصفحة الرئيسية
          </Button>
          
          <Button
            onClick={handleReload}
            variant="ghost"
            fullWidth
          >
            إعادة تحميل الصفحة
          </Button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-500">
            إذا استمرت المشكلة، يرجى التواصل مع فريق الدعم الفني
          </p>
        </div>
      </div>
    </div>
  );
};

interface GenericErrorBoundaryProps {
  children: React.ReactNode;
  context?: string;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * @component GenericErrorBoundary
 * @description مكون error boundary شامل للاستخدام العام
 * @param {GenericErrorBoundaryProps} props - خصائص المكون
 * @returns {JSX.Element} error boundary wrapper
 */
export const GenericErrorBoundary: React.FC<GenericErrorBoundaryProps> = ({
  children,
  context,
  onError
}) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error tracking service (e.g., Sentry)
      console.log('Error would be sent to tracking service:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        context
      });
    }
    
    onError?.(error, errorInfo);
  };

  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <ErrorFallback
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          context={context}
        />
      )}
      onError={handleError}
      onReset={() => {
        // Clear any error state or cache if needed
        console.log('Error boundary reset');
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

/**
 * @component PageErrorBoundary
 * @description مكون error boundary مخصص للصفحات
 */
export const PageErrorBoundary: React.FC<{ children: React.ReactNode; pageName: string }> = ({
  children,
  pageName
}) => (
  <GenericErrorBoundary context={`صفحة ${pageName}`}>
    {children}
  </GenericErrorBoundary>
);

/**
 * @component WidgetErrorBoundary
 * @description مكون error boundary مخصص للمكونات
 */
export const WidgetErrorBoundary: React.FC<{ children: React.ReactNode; widgetName: string }> = ({
  children,
  widgetName
}) => (
  <GenericErrorBoundary context={`مكون ${widgetName}`}>
    {children}
  </GenericErrorBoundary>
);

export default GenericErrorBoundary;
