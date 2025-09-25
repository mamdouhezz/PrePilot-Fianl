import React, { Component, ErrorInfo, ReactNode } from 'react';
import Icon from '../ui/Icon';
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi';
import { Button } from '../ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon as={FiAlertTriangle} size={32} className="text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">حدث خطأ غير متوقع</h2>
              <p className="text-gray-400 text-sm">
                نعتذر عن الإزعاج. يبدو أن هناك مشكلة تقنية مؤقتة.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-700/50 rounded-lg text-left">
                <h3 className="text-sm font-semibold text-red-300 mb-2">تفاصيل الخطأ:</h3>
                <p className="text-xs text-red-200 font-mono break-all">
                  {this.state.error.message}
                </p>
                {this.state.errorInfo && (
                  <details className="mt-2">
                    <summary className="text-xs text-red-300 cursor-pointer">Stack Trace</summary>
                    <pre className="text-xs text-red-200 mt-2 whitespace-pre-wrap overflow-auto max-h-32">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                onClick={this.handleRetry}
                leftIcon={<Icon as={FiRefreshCw} size={16} />}
                className="flex-1"
              >
                إعادة المحاولة
              </Button>
              <Button
                variant="secondary"
                onClick={this.handleGoHome}
                leftIcon={<Icon as={FiHome} size={16} />}
                className="flex-1"
              >
                العودة للرئيسية
              </Button>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              إذا استمرت المشكلة، يرجى التواصل مع الدعم الفني
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
