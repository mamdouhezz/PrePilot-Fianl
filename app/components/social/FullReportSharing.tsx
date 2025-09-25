import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { 
  FiShare2, 
  FiCopy, 
  FiLink, 
  FiEye, 
  FiDownload,
  FiRefreshCw,
  FiCheck,
  FiX,
  FiExternalLink,
  FiGlobe
} from 'react-icons/fi';
import { 
  SOCIAL_PLATFORMS, 
  generateFullReportShareContent,
  generateReportShareLink,
  shareFullReport,
  copyToClipboard,
  SocialContent
} from '../../services/social/socialSharingService';
import { CampaignReport } from '../../types';

interface FullReportSharingProps {
  report: CampaignReport;
  onClose?: () => void;
}

const FullReportSharing: React.FC<FullReportSharingProps> = ({ report, onClose }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['linkedin']);
  const [generatedContent, setGeneratedContent] = useState<{ [key: string]: SocialContent }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareableUrl, setShareableUrl] = useState<string>('');
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' }>>([]);

  useEffect(() => {
    // Generate shareable URL
    const url = generateReportShareLink(report);
    setShareableUrl(url);
    
    // Generate content for selected platforms
    if (selectedPlatforms.length > 0) {
      generateAllContent();
    }
  }, [selectedPlatforms, report]);

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const generateAllContent = async () => {
    setIsGenerating(true);
    try {
      const contentPromises = selectedPlatforms.map(async (platform) => {
        const content = await generateFullReportShareContent(report, platform, shareableUrl);
        return { platform, content };
      });
      
      const results = await Promise.all(contentPromises);
      const contentMap: { [key: string]: SocialContent } = {};
      
      results.forEach(({ platform, content }) => {
        contentMap[platform] = content;
      });
      
      setGeneratedContent(contentMap);
    } catch (error) {
      console.error('Failed to generate content:', error);
      showToast('فشل في إنشاء المحتوى', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleShare = async (platformId: string) => {
    try {
      await shareFullReport(report, platformId);
      showToast(`تم فتح نافذة المشاركة على ${SOCIAL_PLATFORMS.find(p => p.id === platformId)?.name}`, 'success');
    } catch (error) {
      console.error('Failed to share:', error);
      showToast('فشل في المشاركة', 'error');
    }
  };

  const handleShareAll = async () => {
    for (const platformId of selectedPlatforms) {
      try {
        await shareFullReport(report, platformId);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay between shares
      } catch (error) {
        console.error(`Failed to share to ${platformId}:`, error);
      }
    }
    showToast('تم فتح نوافذ المشاركة لجميع المنصات', 'success');
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setIsUrlCopied(true);
      showToast('تم نسخ الرابط إلى الحافظة!', 'success');
      setTimeout(() => setIsUrlCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
      showToast('فشل في نسخ الرابط', 'error');
    }
  };

  const handleCopyContent = async (platformId: string) => {
    const content = generatedContent[platformId];
    if (!content) return;
    
    try {
      await copyToClipboard(content);
      showToast('تم نسخ المحتوى إلى الحافظة!', 'success');
    } catch (error) {
      console.error('Failed to copy content:', error);
      showToast('فشل في نسخ المحتوى', 'error');
    }
  };

  const handlePreviewReport = () => {
    window.open(shareableUrl, '_blank');
  };

  const getPlatformInfo = (platformId: string) => {
    return SOCIAL_PLATFORMS.find(p => p.id === platformId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">مشاركة التقرير كاملاً</h2>
          <p className="text-gray-400">شارك التقرير كرابط للقراءة فقط</p>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon as={FiX} size={20} />
          </Button>
        )}
      </div>

      {/* Report Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Icon as={FiGlobe} size={24} />
            معلومات التقرير
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white">{report.title}</h3>
              <p className="text-gray-400">تقرير قابل للمشاركة</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-400">الميزانية</p>
                <p className="text-white font-medium">
                  {report.budgetAllocation 
                    ? Object.values(report.budgetAllocation).reduce((sum, val) => sum + val, 0).toLocaleString() + ' ريال'
                    : 'غير محدد'
                  }
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">الصناعة</p>
                <p className="text-white font-medium">{report.industry || 'غير محدد'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">المنصات</p>
                <p className="text-white font-medium">
                  {report.platforms ? report.platforms.join(', ') : 'غير محدد'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shareable URL */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Icon as={FiLink} size={24} />
            رابط المشاركة
          </CardTitle>
          <CardDescription>رابط للقراءة فقط - يمكن مشاركته مع أي شخص</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 p-3 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-300 text-sm break-all">{shareableUrl}</p>
              </div>
              <Button
                variant="secondary"
                onClick={handleCopyUrl}
                leftIcon={<Icon as={isUrlCopied ? FiCheck : FiCopy} size={16} />}
              >
                {isUrlCopied ? 'تم النسخ!' : 'نسخ الرابط'}
              </Button>
              <Button
                variant="ghost"
                onClick={handlePreviewReport}
                leftIcon={<Icon as={FiExternalLink} size={16} />}
              >
                معاينة
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                ✅ آمن للقراءة فقط
              </span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                🔗 رابط دائم
              </span>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                📱 متوافق مع جميع الأجهزة
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">اختر المنصات للمشاركة</CardTitle>
          <CardDescription>اختر المنصات التي تريد مشاركة التقرير عليها</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SOCIAL_PLATFORMS.map(platform => (
              <button
                key={platform.id}
                onClick={() => handlePlatformToggle(platform.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedPlatforms.includes(platform.id)
                    ? 'border-prepilot-purple-500 bg-prepilot-purple-500/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{platform.icon}</div>
                  <div className="text-sm font-medium text-white">{platform.name}</div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generated Content */}
      {selectedPlatforms.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">المحتوى المُولد</CardTitle>
                <CardDescription>
                  محتوى مخصص لـ {selectedPlatforms.length} منصة
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={generateAllContent}
                  disabled={isGenerating}
                  leftIcon={<Icon as={FiRefreshCw} size={16} />}
                >
                  {isGenerating ? 'جاري التحديث...' : 'تحديث الكل'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {selectedPlatforms.map(platformId => {
                const content = generatedContent[platformId];
                const platform = getPlatformInfo(platformId);
                
                if (!content || !platform) return null;

                return (
                  <div key={platformId} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{platform.icon}</span>
                        <div>
                          <div className="text-white font-medium">{platform.name}</div>
                          <div className="text-gray-400 text-sm">
                            {platform.maxLength ? `حد ${platform.maxLength} حرف` : 'بدون حد'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Display */}
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 mb-4">
                      <div className="whitespace-pre-wrap text-gray-200">
                        {content.text}
                      </div>
                    </div>

                    {/* Hashtags and Mentions */}
                    {(content.hashtags.length > 0 || content.mentions.length > 0) && (
                      <div className="space-y-2 mb-4">
                        {content.hashtags.length > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">الهاشتاغات:</span>
                            <div className="flex flex-wrap gap-1">
                              {content.hashtags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-prepilot-purple-500/20 text-prepilot-purple-300 rounded text-sm">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {content.mentions.length > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">الذكر:</span>
                            <div className="flex flex-wrap gap-1">
                              {content.mentions.map((mention, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                                  @{mention}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleShare(platformId)}
                        leftIcon={<Icon as={FiShare2} size={14} />}
                      >
                        مشاركة
                      </Button>
                      
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleCopyContent(platformId)}
                        leftIcon={<Icon as={FiCopy} size={14} />}
                      >
                        نسخ المحتوى
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bulk Actions */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-700">
              <Button
                variant="primary"
                onClick={handleShareAll}
                leftIcon={<Icon as={FiShare2} size={16} />}
              >
                مشاركة على جميع المنصات
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`p-3 rounded-lg shadow-lg ${
              toast.type === 'success' 
                ? 'bg-green-600 text-white' 
                : 'bg-red-600 text-white'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullReportSharing;
