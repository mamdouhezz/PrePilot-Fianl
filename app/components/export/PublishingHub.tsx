import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import { useExportStore } from '../../stores/exportStore';
import { Report, ReportExport, SocialPlatform } from '../../types/export';
import { PLATFORM_INFO, STATUS_STYLES } from '../../constants';
import Icon from '../ui/Icon';
import { FiRefreshCw, FiSend, FiAlertTriangle, FiPlus, FiSettings, FiShare2 } from 'react-icons/fi';
import { SocialSharingPanel, QuickShareButton, AdvancedSocialSharing, EnhancedSocialSharing, FullReportSharing } from '../social';
import { CampaignReport } from '../../types';

const DraftCard: React.FC<{ draft: ReportExport }> = ({ draft }) => {
    const { generateSocialPost, publishPost } = useExportStore();
    const platformInfo = PLATFORM_INFO[draft.format as keyof typeof PLATFORM_INFO];
    const isProcessing = draft.status === 'processing';
    const hasFailed = draft.status === 'failed';

    return (
        <Card className={`transition-all border-2 ${hasFailed ? 'border-red-500/50' : 'border-gray-700'}`}>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Icon as={platformInfo.icon} style={{color: platformInfo.color}} size={24}/>
                        <div>
                            <CardTitle>{draft.reportTitle}</CardTitle>
                            <CardDescription>مسودة لـ {platformInfo.name}</CardDescription>
                        </div>
                    </div>
                     <span className={`px-2 py-1 text-xs rounded-md ${STATUS_STYLES[draft.status as keyof typeof STATUS_STYLES].bgColor} ${STATUS_STYLES[draft.status as keyof typeof STATUS_STYLES].color}`}>
                        {STATUS_STYLES[draft.status as keyof typeof STATUS_STYLES].text}
                     </span>
                </div>
            </CardHeader>
            <CardContent>
                <textarea 
                    className="w-full p-2 bg-gray-700 rounded-md h-32 resize-none text-gray-200 disabled:opacity-70"
                    value={draft.content}
                    placeholder={isProcessing ? draft.content : '...'}
                    readOnly
                    disabled={isProcessing}
                />
                
                {hasFailed && draft.error && (
                    <div className="mt-2 text-sm text-red-400 flex items-center gap-2 p-2 bg-red-900/30 rounded-md">
                        <Icon as={FiAlertTriangle} size={16} />
                        <span>{draft.error}</span>
                    </div>
                )}

                <div className="flex justify-end gap-2 mt-4">
                    <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => generateSocialPost(draft.id, draft.reportId, draft.section, draft.format as SocialPlatform)}
                        disabled={isProcessing}
                        leftIcon={<Icon as={FiRefreshCw} size={16} className={isProcessing ? 'animate-spin' : ''}/>}
                    >
                        {hasFailed ? 'إعادة المحاولة' : 'إعادة إنشاء'}
                    </Button>
                     <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={() => publishPost(draft.id)}
                        disabled={isProcessing || hasFailed}
                        leftIcon={<Icon as={FiSend} size={16}/>}
                    >
                        نشر
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

const PublishingHub: React.FC = () => {
  const allReports = useExportStore(state => state.reports);
  const drafts = useExportStore(state => state.publishingDrafts);
  const published = useExportStore(state => state.publishedPosts);
  const generateSocialPost = useExportStore(state => state.generateSocialPost);
  const [selectedReportId, setSelectedReportId] = useState<string>('');
  const [showSocialPanel, setShowSocialPanel] = useState(false);
  const [showAdvancedSharing, setShowAdvancedSharing] = useState(false);
  const [showEnhancedSharing, setShowEnhancedSharing] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showFullReportSharing, setShowFullReportSharing] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Get available reports
  const availableReports = useMemo(() => allReports.filter(r => !r.isArchived), [allReports]);
  
  // Set default selected report when reports are available
  useEffect(() => {
    if (availableReports.length > 0 && !selectedReportId) {
      setSelectedReportId(availableReports[0].id);
      setSelectedReport(availableReports[0]);
    }
  }, [availableReports.length]);

  const socialPlatformsForPublishing: SocialPlatform[] = ['linkedin', 'twitter', 'facebook'];

  const handleGenerateNewPost = (platform: SocialPlatform) => {
      if (selectedReportId) {
          generateSocialPost(null, selectedReportId, 'strategic-summary', platform);
      }
  }

  const handleOpenSocialPanel = () => {
    if (selectedReport) {
      setShowSocialPanel(true);
    }
  }

  const handleOpenAdvancedSharing = () => {
    if (selectedReport) {
      setShowAdvancedSharing(true);
    }
  }

  const handleOpenEnhancedSharing = () => {
    if (selectedReport) {
      setShowEnhancedSharing(true);
    }
  }

  const handleOpenAnalytics = () => {
    if (selectedReport) {
      setShowAnalytics(true);
    }
  }

  const handleOpenFullReportSharing = () => {
    if (selectedReport) {
      setShowFullReportSharing(true);
    }
  }

  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>إنشاء منشور جديد</CardTitle>
                <CardDescription>اختر تقريراً وقم بإنشاء محتوى مخصص لمنصات التواصل الاجتماعي باستخدام الذكاء الاصطناعي.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-end gap-4">
                        <div className="flex-grow">
                            <label className="block mb-2 text-sm font-medium text-gray-300">اختر التقرير</label>
                            <select 
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
                                value={selectedReportId}
                                onChange={(e) => {
                                    setSelectedReportId(e.target.value);
                                    setSelectedReport(availableReports.find(r => r.id === e.target.value) || null);
                                }}
                            >
                                {availableReports.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    {/* Quick Share Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <Button
                            variant="primary"
                            onClick={handleOpenSocialPanel}
                            disabled={!selectedReportId}
                            leftIcon={<Icon as={FiShare2} size={16} />}
                        >
                            مشاركة ذكية
                        </Button>
                        
                        <Button
                            variant="secondary"
                            onClick={handleOpenAdvancedSharing}
                            disabled={!selectedReportId}
                            leftIcon={<Icon as={FiSettings} size={16} />}
                        >
                            مشاركة متقدمة
                        </Button>
                        
                        <Button
                            variant="ghost"
                            onClick={handleOpenFullReportSharing}
                            disabled={!selectedReportId}
                            leftIcon={<Icon as={FiShare2} size={16} />}
                        >
                            مشاركة التقرير كاملاً
                        </Button>
                        
                        {selectedReport && (
                            <QuickShareButton
                                report={selectedReport as CampaignReport}
                                sectionId="strategic-summary"
                                variant="ghost"
                                size="sm"
                            />
                        )}
                    </div>
                    
                    {/* Legacy Platform Buttons */}
                    <div className="pt-4 border-t border-gray-700">
                        <p className="text-sm text-gray-400 mb-3">المشاركة السريعة (الطريقة القديمة):</p>
                        <div className="flex gap-2">
                            {socialPlatformsForPublishing.map(p => {
                                 const platformInfo = PLATFORM_INFO[p as keyof typeof PLATFORM_INFO];
                                 return (
                                     <Button key={p} onClick={() => handleGenerateNewPost(p)} disabled={!selectedReportId} variant="secondary" className="!p-2">
                                        <Icon as={platformInfo.icon} size={20} style={{color: platformInfo.color}}/>
                                    </Button>
                                 )
                            })}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <div>
            <h3 className="text-xl font-bold mb-4">المسودات</h3>
            {drafts.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {drafts.map(d => <DraftCard key={d.id} draft={d} />)}
                </div>
            ) : <p className="text-gray-400">لا يوجد مسودات حالياً. قم بإنشاء منشور جديد للبدء.</p>}
        </div>
        
        <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">المنشورات الأخيرة</h3>
             {published.length > 0 ? (
                <div className="space-y-4">
                    {published.slice(0, 5).map(p => (
                        <div key={p.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                             <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Icon as={PLATFORM_INFO[p.format as keyof typeof PLATFORM_INFO].icon} style={{color: PLATFORM_INFO[p.format as keyof typeof PLATFORM_INFO].color}}/>
                                    <span className="font-bold">{p.reportTitle}</span>
                                </div>
                                <span className={`text-xs ${STATUS_STYLES[p.status as keyof typeof STATUS_STYLES].color}`}>{STATUS_STYLES[p.status as keyof typeof STATUS_STYLES].text}</span>
                             </div>
                             <p className="text-sm text-gray-300 whitespace-pre-wrap">{p.content}</p>
                        </div>
                    ))}
                </div>
             ) : (
                <p className="text-gray-400">لا يوجد منشورات أخيرة.</p>
             )}
        </div>
        
        {/* Social Sharing Panel Modal */}
        {showSocialPanel && selectedReport && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <SocialSharingPanel
                report={selectedReport as CampaignReport}
                sectionId="strategic-summary"
                onClose={() => setShowSocialPanel(false)}
              />
            </div>
          </div>
        )}
        
        {/* Advanced Social Sharing Modal */}
        {showAdvancedSharing && selectedReport && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <AdvancedSocialSharing
                report={selectedReport as CampaignReport}
                sectionId="strategic-summary"
                onClose={() => setShowAdvancedSharing(false)}
              />
            </div>
          </div>
        )}
        
        {/* Full Report Sharing Modal */}
        {showFullReportSharing && selectedReport && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto">
              <FullReportSharing
                report={selectedReport as CampaignReport}
                onClose={() => setShowFullReportSharing(false)}
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default PublishingHub;