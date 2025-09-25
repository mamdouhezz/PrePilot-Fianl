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
  FiAtSign
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

interface SocialSharingPanelProps {
  report: CampaignReport;
  sectionId: string;
  onClose?: () => void;
}

const SocialSharingPanel: React.FC<SocialSharingPanelProps> = ({ 
  report, 
  sectionId, 
  onClose 
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('linkedin');
  const [generatedContent, setGeneratedContent] = useState<SocialContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [customContent, setCustomContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' }>>([]);

  // Generate content when platform changes
  useEffect(() => {
    if (selectedPlatform) {
      generateContent();
    }
  }, [selectedPlatform, report, sectionId]);

  const generateContent = async () => {
    setIsGenerating(true);
    try {
      const content = await generateSocialContent(report, sectionId, selectedPlatform);
      setGeneratedContent(content);
      setCustomContent(content.text);
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

  const handleShare = async () => {
    if (!generatedContent) return;
    
    try {
      await shareToPlatform(generatedContent, selectedPlatform);
      showToast(`تم فتح نافذة المشاركة على ${SOCIAL_PLATFORMS.find(p => p.id === selectedPlatform)?.name}`, 'success');
    } catch (error) {
      console.error('Failed to share:', error);
      showToast('فشل في المشاركة', 'error');
    }
  };

  const handleCopy = async () => {
    if (!generatedContent) return;
    
    const success = await copyToClipboard(generatedContent);
    showToast(success ? 'تم نسخ المحتوى بنجاح!' : 'فشل في النسخ', success ? 'success' : 'error');
  };

  const handleSaveDraft = () => {
    if (!generatedContent) return;
    
    const draft = saveAsDraft(generatedContent, report.id || 'unknown', sectionId);
    // Here you would typically save to a store or API
    console.log('Saved draft:', draft);
    showToast('تم حفظ المسودة بنجاح!', 'success');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!generatedContent) return;
    
    setGeneratedContent({
      ...generatedContent,
      text: customContent
    });
    setIsEditing(false);
    showToast('تم حفظ التعديلات!', 'success');
  };

  const handleCancelEdit = () => {
    setCustomContent(generatedContent?.text || '');
    setIsEditing(false);
  };

  const getPlatformInfo = (platformId: string) => {
    return SOCIAL_PLATFORMS.find(p => p.id === platformId);
  };

  const getCharacterCount = () => {
    const platform = getPlatformInfo(selectedPlatform);
    return platform?.maxLength ? `${customContent.length}/${platform.maxLength}` : customContent.length;
  };

  const isContentValid = () => {
    const platform = getPlatformInfo(selectedPlatform);
    if (!platform?.maxLength) return true;
    return customContent.length <= platform.maxLength;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">مشاركة على السوشال ميديا</h2>
          <p className="text-gray-400">أنشئ محتوى مخصص للمنصات المختلفة</p>
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
          <CardTitle className="text-white">اختر المنصة</CardTitle>
          <CardDescription>اختر المنصة التي تريد المشاركة عليها</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SOCIAL_PLATFORMS.map(platform => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedPlatform === platform.id
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
      {generatedContent && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">المحتوى المُولد</CardTitle>
                <CardDescription>
                  محتوى مخصص لـ {getPlatformInfo(selectedPlatform)?.name}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={generateContent}
                  disabled={isGenerating}
                  leftIcon={<Icon as={FiRefreshCw} size={16} />}
                >
                  {isGenerating ? 'جاري التحديث...' : 'تحديث'}
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
            {/* Content Editor */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">المحتوى</label>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${isContentValid() ? 'text-green-400' : 'text-red-400'}`}>
                    {getCharacterCount()}
                  </span>
                  {isEditing ? (
                    <div className="flex gap-1">
                      <Button size="sm" onClick={handleSaveEdit} leftIcon={<Icon as={FiSave} size={14} />}>
                        حفظ
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleCancelEdit} leftIcon={<Icon as={FiX} size={14} />}>
                        إلغاء
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" onClick={handleEdit} leftIcon={<Icon as={FiEdit} size={14} />}>
                      تعديل
                    </Button>
                  )}
                </div>
              </div>

              {isEditing ? (
                <textarea
                  value={customContent}
                  onChange={(e) => setCustomContent(e.target.value)}
                  className="w-full h-32 p-3 bg-gray-700 border border-gray-600 rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-prepilot-purple-500"
                  placeholder="اكتب محتوى المشاركة هنا..."
                />
              ) : (
                <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="whitespace-pre-wrap text-gray-200">
                    {customContent}
                  </div>
                </div>
              )}

              {/* Hashtags and Mentions */}
              {(generatedContent.hashtags.length > 0 || generatedContent.mentions.length > 0) && (
                <div className="space-y-2">
                  {generatedContent.hashtags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Icon as={FiHash} size={16} className="text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {generatedContent.hashtags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-prepilot-purple-500/20 text-prepilot-purple-300 rounded text-sm">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {generatedContent.mentions.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Icon as={FiAtSign} size={16} className="text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {generatedContent.mentions.map((mention, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                            {mention}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Button
                variant="primary"
                onClick={handleShare}
                disabled={!isContentValid()}
                leftIcon={<Icon as={FiShare2} size={16} />}
              >
                مشاركة على {getPlatformInfo(selectedPlatform)?.name}
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleCopy}
                leftIcon={<Icon as={FiCopy} size={16} />}
              >
                نسخ المحتوى
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleSaveDraft}
                leftIcon={<Icon as={FiSave} size={16} />}
              >
                حفظ كمسودة
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview Mode */}
      {isPreviewMode && generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle className="text-white">معاينة المشاركة</CardTitle>
            <CardDescription>كيف ستظهر المشاركة على {getPlatformInfo(selectedPlatform)?.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                <div>
                  <div className="text-white font-medium">PrePilot</div>
                  <div className="text-gray-400 text-sm">الآن</div>
                </div>
              </div>
              <div className="whitespace-pre-wrap text-gray-200 mb-3">
                {customContent}
              </div>
              {generatedContent.imageUrl && (
                <div className="w-full h-48 bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                  <Icon as={FiImage} size={32} className="text-gray-500" />
                </div>
              )}
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                <span>👍 أعجبني</span>
                <span>💬 تعليق</span>
                <span>🔄 مشاركة</span>
              </div>
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

export default SocialSharingPanel;
