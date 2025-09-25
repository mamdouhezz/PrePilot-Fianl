import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { 
  FiShare2, 
  FiCopy, 
  FiEdit, 
  FiSave, 
  FiEye, 
  FiX,
  FiRefreshCw,
  FiDownload,
  FiImage,
  FiHash,
  FiAtSign,
  FiClock,
  FiCalendar,
  FiSettings,
  FiTrendingUp,
  FiUsers,
  FiHeart,
  FiMessageCircle,
  FiRepeat
} from 'react-icons/fi';
import { 
  SOCIAL_PLATFORMS, 
  generateSocialContent, 
  shareToPlatform, 
  copyToClipboard,
  saveAsDraft,
  SocialContent,
  SocialPost
} from '../../services/social/socialSharingService';
import { CampaignReport } from '../../types';

interface AdvancedSocialSharingProps {
  report: CampaignReport;
  sectionId: string;
  onClose?: () => void;
}

const AdvancedSocialSharing: React.FC<AdvancedSocialSharingProps> = ({ 
  report, 
  sectionId, 
  onClose 
}) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['linkedin']);
  const [generatedContent, setGeneratedContent] = useState<{ [key: string]: SocialContent }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [customContent, setCustomContent] = useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [scheduledTime, setScheduledTime] = useState<string>('');
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' }>>([]);
  const [analytics, setAnalytics] = useState<{ [key: string]: any }>({});

  // Generate content for all selected platforms
  useEffect(() => {
    if (selectedPlatforms.length > 0) {
      generateAllContent();
    }
  }, [selectedPlatforms, report, sectionId]);

  const generateAllContent = async () => {
    setIsGenerating(true);
    try {
      const contentPromises = selectedPlatforms.map(async (platform) => {
        const content = await generateSocialContent(report, sectionId, platform);
        return { platform, content };
      });
      
      const results = await Promise.all(contentPromises);
      const contentMap: { [key: string]: SocialContent } = {};
      const customMap: { [key: string]: string } = {};
      
      results.forEach(({ platform, content }) => {
        contentMap[platform] = content;
        customMap[platform] = content.text;
      });
      
      setGeneratedContent(contentMap);
      setCustomContent(customMap);
    } catch (error) {
      console.error('Failed to generate content:', error);
      showToast('فشل في إنشاء المحتوى', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleShare = async (platformId: string) => {
    const content = generatedContent[platformId];
    if (!content) return;
    
    try {
      await shareToPlatform(content, platformId);
      showToast(`تم فتح نافذة المشاركة على ${SOCIAL_PLATFORMS.find(p => p.id === platformId)?.name}`, 'success');
    } catch (error) {
      console.error('Failed to share:', error);
      showToast('فشل في المشاركة', 'error');
    }
  };

  const handleShareAll = async () => {
    for (const platformId of selectedPlatforms) {
      const content = generatedContent[platformId];
      if (content) {
        try {
          await shareToPlatform(content, platformId);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Delay between shares
        } catch (error) {
          console.error(`Failed to share to ${platformId}:`, error);
        }
      }
    }
    showToast('تم فتح نوافذ المشاركة لجميع المنصات', 'success');
  };

  const handleCopy = async (platformId: string) => {
    const content = generatedContent[platformId];
    if (!content) return;
    
    const success = await copyToClipboard(content);
    showToast(success ? 'تم نسخ المحتوى بنجاح!' : 'فشل في النسخ', success ? 'success' : 'error');
  };

  const handleCopyAll = async () => {
    const allContent = selectedPlatforms.map(platformId => {
      const platform = SOCIAL_PLATFORMS.find(p => p.id === platformId);
      const content = generatedContent[platformId];
      return `=== ${platform?.name} ===\n${content?.text || ''}\n\n`;
    }).join('');
    
    const success = await navigator.clipboard.writeText(allContent);
    showToast(success ? 'تم نسخ جميع المحتويات!' : 'فشل في النسخ', success ? 'success' : 'error');
  };

  const handleSaveDraft = (platformId: string) => {
    const content = generatedContent[platformId];
    if (!content) return;
    
    const draft = saveAsDraft(content, report.id || 'unknown', sectionId);
    console.log('Saved draft:', draft);
    showToast('تم حفظ المسودة بنجاح!', 'success');
  };

  const handleEdit = (platformId: string) => {
    setIsEditing(prev => ({ ...prev, [platformId]: true }));
  };

  const handleSaveEdit = (platformId: string) => {
    const content = generatedContent[platformId];
    if (!content) return;
    
    setGeneratedContent(prev => ({
      ...prev,
      [platformId]: {
        ...content,
        text: customContent[platformId] || content.text
      }
    }));
    setIsEditing(prev => ({ ...prev, [platformId]: false }));
    showToast('تم حفظ التعديلات!', 'success');
  };

  const handleCancelEdit = (platformId: string) => {
    setCustomContent(prev => ({
      ...prev,
      [platformId]: generatedContent[platformId]?.text || ''
    }));
    setIsEditing(prev => ({ ...prev, [platformId]: false }));
  };

  const handleSchedule = () => {
    if (!scheduledTime) {
      showToast('يرجى اختيار وقت للمشاركة', 'error');
      return;
    }
    
    // Here you would typically save to a scheduling service
    console.log('Scheduled for:', scheduledTime);
    showToast('تم جدولة المشاركة بنجاح!', 'success');
  };

  const getPlatformInfo = (platformId: string) => {
    return SOCIAL_PLATFORMS.find(p => p.id === platformId);
  };

  const getCharacterCount = (platformId: string) => {
    const platform = getPlatformInfo(platformId);
    const content = customContent[platformId] || '';
    return platform?.maxLength ? `${content.length}/${platform.maxLength}` : content.length;
  };

  const isContentValid = (platformId: string) => {
    const platform = getPlatformInfo(platformId);
    const content = customContent[platformId] || '';
    if (!platform?.maxLength) return true;
    return content.length <= platform.maxLength;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">مشاركة متقدمة</h2>
          <p className="text-gray-400">إدارة شاملة للمشاركة على جميع المنصات</p>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon as={FiX} size={20} />
          </Button>
        )}
      </div>

      {/* Platform Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">اختر المنصات</CardTitle>
          <CardDescription>اختر المنصات التي تريد المشاركة عليها</CardDescription>
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
                  <div className="text-xs text-gray-400 mt-1">
                    {platform.maxLength ? `حد ${platform.maxLength} حرف` : 'بدون حد'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Generation */}
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  leftIcon={<Icon as={FiEye} size={16} />}
                >
                  {isPreviewMode ? 'إخفاء المعاينة' : 'معاينة'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {selectedPlatforms.map(platformId => {
                const content = generatedContent[platformId];
                const platform = getPlatformInfo(platformId);
                const isEditing = isEditing[platformId];
                
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
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${isContentValid(platformId) ? 'text-green-400' : 'text-red-400'}`}>
                          {getCharacterCount(platformId)}
                        </span>
                        {isEditing ? (
                          <div className="flex gap-1">
                            <Button size="sm" onClick={() => handleSaveEdit(platformId)} leftIcon={<Icon as={FiSave} size={14} />}>
                              حفظ
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleCancelEdit(platformId)} leftIcon={<Icon as={FiX} size={14} />}>
                              إلغاء
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" onClick={() => handleEdit(platformId)} leftIcon={<Icon as={FiEdit} size={14} />}>
                            تعديل
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Content Editor */}
                    {isEditing ? (
                      <textarea
                        value={customContent[platformId] || ''}
                        onChange={(e) => setCustomContent(prev => ({ ...prev, [platformId]: e.target.value }))}
                        className="w-full h-32 p-3 bg-gray-700 border border-gray-600 rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-prepilot-purple-500"
                        placeholder="اكتب محتوى المشاركة هنا..."
                      />
                    ) : (
                      <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="whitespace-pre-wrap text-gray-200">
                          {customContent[platformId] || content.text}
                        </div>
                      </div>
                    )}

                    {/* Hashtags and Mentions */}
                    {(content.hashtags.length > 0 || content.mentions.length > 0) && (
                      <div className="space-y-2 mt-3">
                        {content.hashtags.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Icon as={FiHash} size={16} className="text-gray-400" />
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
                            <Icon as={FiAtSign} size={16} className="text-gray-400" />
                            <div className="flex flex-wrap gap-1">
                              {content.mentions.map((mention, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                                  {mention}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleShare(platformId)}
                        disabled={!isContentValid(platformId)}
                        leftIcon={<Icon as={FiShare2} size={14} />}
                      >
                        مشاركة
                      </Button>
                      
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleCopy(platformId)}
                        leftIcon={<Icon as={FiCopy} size={14} />}
                      >
                        نسخ
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSaveDraft(platformId)}
                        leftIcon={<Icon as={FiSave} size={14} />}
                      >
                        حفظ مسودة
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
              
              <Button
                variant="secondary"
                onClick={handleCopyAll}
                leftIcon={<Icon as={FiCopy} size={16} />}
              >
                نسخ جميع المحتويات
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scheduling */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">جدولة المشاركة</CardTitle>
          <CardDescription>جدول المشاركة لوقت محدد</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">وقت المشاركة</label>
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-prepilot-purple-500"
              />
            </div>
            <Button
              variant="primary"
              onClick={handleSchedule}
              disabled={!scheduledTime}
              leftIcon={<Icon as={FiClock} size={16} />}
            >
              جدولة
            </Button>
          </div>
        </CardContent>
      </Card>

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

export default AdvancedSocialSharing;
