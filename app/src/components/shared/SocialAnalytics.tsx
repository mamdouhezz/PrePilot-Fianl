import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';
import { 
  FiTrendingUp, 
  FiUsers, 
  FiHeart, 
  FiMessageCircle, 
  FiRepeat, 
  FiEye,
  FiDownload,
  FiRefreshCw,
  FiBarChart,
  FiTarget,
  FiClock,
  FiMapPin,
  FiUser
} from 'react-icons/fi';
import { 
  mockSocialAnalytics, 
  mockSocialCampaigns,
  getPlatformPerformance,
  getContentInsights,
  generatePerformanceReport,
  type SocialAnalytics,
  type SocialCampaign,
  type SocialInsights
} from '../../services/social/socialAnalytics';

interface SocialAnalyticsProps {
  reportId?: string;
  onClose?: () => void;
}

const SocialAnalyticsComponent: React.FC<SocialAnalyticsProps> = ({ reportId, onClose }) => {
  const [analytics, setAnalytics] = useState<SocialAnalytics[]>([]);
  const [campaigns, setCampaigns] = useState<SocialCampaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'platforms' | 'content' | 'audience'>('overview');

  useEffect(() => {
    loadAnalytics();
  }, [reportId]);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const filteredAnalytics = reportId 
        ? mockSocialAnalytics.filter(a => a.reportId === reportId)
        : mockSocialAnalytics;
      
      setAnalytics(filteredAnalytics);
      setCampaigns(mockSocialCampaigns);
      setSelectedCampaign(mockSocialCampaigns[0]?.id || '');
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const platformPerformance = getPlatformPerformance(analytics);
  const insights = getContentInsights(analytics);
  const performanceReport = generatePerformanceReport(analytics);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatPercentage = (num: number): string => {
    return num.toFixed(1) + '%';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3">
          <Icon as={FiRefreshCw} size={20} className="animate-spin text-prepilot-purple-400" />
          <span className="text-gray-400">جاري تحميل التحليلات...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">تحليلات المشاركة</h2>
          <p className="text-gray-400">رؤى شاملة حول أداء مشاركاتك على السوشال ميديا</p>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon as={FiDownload} size={20} />
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'نظرة عامة', icon: FiBarChart },
          { id: 'platforms', label: 'المنصات', icon: FiTarget },
          { id: 'content', label: 'المحتوى', icon: FiMessageCircle },
          { id: 'audience', label: 'الجمهور', icon: FiUsers }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-prepilot-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Icon as={tab.icon} size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">إجمالي المشاركات</p>
                    <p className="text-2xl font-bold text-white">{performanceReport.summary.totalPosts}</p>
                  </div>
                  <Icon as={FiMessageCircle} size={24} className="text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">إجمالي الوصول</p>
                    <p className="text-2xl font-bold text-white">{formatNumber(performanceReport.summary.totalReach)}</p>
                  </div>
                  <Icon as={FiEye} size={24} className="text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">إجمالي التفاعل</p>
                    <p className="text-2xl font-bold text-white">{formatNumber(performanceReport.summary.totalEngagement)}</p>
                  </div>
                  <Icon as={FiHeart} size={24} className="text-red-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">معدل التفاعل</p>
                    <p className="text-2xl font-bold text-white">{formatPercentage(performanceReport.summary.averageEngagementRate)}</p>
                  </div>
                  <Icon as={FiTrendingUp} size={24} className="text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Platform Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">أداء المنصات</CardTitle>
              <CardDescription>مقارنة أداء المنصات المختلفة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformPerformance.map(platform => (
                  <div key={platform.platform} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-lg">
                          {platform.platform === 'linkedin' ? '💼' : 
                           platform.platform === 'facebook' ? '📘' : 
                           platform.platform === 'twitter' ? '🐦' : '💬'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white capitalize">{platform.platform}</p>
                        <p className="text-sm text-gray-400">{platform.posts} مشاركة</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">{formatNumber(platform.engagement)}</p>
                      <p className="text-sm text-gray-400">وصول</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">{formatNumber(platform.engagement)}</p>
                      <p className="text-sm text-gray-400">تفاعل</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">{formatPercentage(platform.engagementRate)}</p>
                      <p className="text-sm text-gray-400">معدل التفاعل</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">التوصيات</CardTitle>
              <CardDescription>نصائح لتحسين أداء مشاركاتك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {performanceReport.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                    <Icon as={FiTarget} size={16} className="text-prepilot-purple-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-200">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Platforms Tab */}
      {activeTab === 'platforms' && (
        <div className="space-y-6">
          {platformPerformance.map(platform => (
            <Card key={platform.platform}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <span className="text-2xl">
                    {platform.platform === 'linkedin' ? '💼' : 
                     platform.platform === 'facebook' ? '📘' : 
                     platform.platform === 'twitter' ? '🐦' : '💬'}
                  </span>
                  {platform.platform.charAt(0).toUpperCase() + platform.platform.slice(1)}
                </CardTitle>
                <CardDescription>تحليل مفصل لأداء {platform.platform}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{platform.posts}</p>
                    <p className="text-gray-400">المشاركات</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{formatNumber(platform.engagement)}</p>
                    <p className="text-gray-400">الوصول</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{formatPercentage(platform.engagementRate)}</p>
                    <p className="text-gray-400">معدل التفاعل</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-white">أفضل أنواع المحتوى</CardTitle>
              <CardDescription>أنواع المحتوى التي تحقق أفضل تفاعل</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.bestContentTypes.map((content, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-white">{content.type}</p>
                      <p className="text-sm text-gray-400">{content.posts} مشاركة</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">{formatNumber(content.averageEngagement)}</p>
                      <p className="text-sm text-gray-400">متوسط التفاعل</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-white">أفضل أوقات النشر</CardTitle>
              <CardDescription>الأوقات التي تحقق أفضل تفاعل</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.optimalPostingTimes.map((time, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon as={FiClock} size={20} className="text-prepilot-purple-400" />
                      <div>
                        <p className="font-medium text-white">{time.hour}:00</p>
                        <p className="text-sm text-gray-400">{time.platform}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">{formatNumber(time.engagement)}</p>
                      <p className="text-sm text-gray-400">تفاعل</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Audience Tab */}
      {activeTab === 'audience' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-white">تحليل الجمهور</CardTitle>
              <CardDescription>فهم جمهورك المستهدف</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Icon as={FiUser} size={32} className="text-prepilot-purple-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white">{insights.audienceInsights.mostEngagedAgeGroup}</p>
                  <p className="text-gray-400">الفئة العمرية الأكثر تفاعلاً</p>
                </div>
                <div className="text-center">
                  <Icon as={FiUsers} size={32} className="text-prepilot-purple-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white capitalize">{insights.audienceInsights.mostEngagedGender}</p>
                  <p className="text-gray-400">الجنس الأكثر تفاعلاً</p>
                </div>
                <div className="text-center">
                  <Icon as={FiMapPin} size={32} className="text-prepilot-purple-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white">{insights.audienceInsights.topLocations[0]?.location}</p>
                  <p className="text-gray-400">الموقع الأكثر تفاعلاً</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-white">المواقع الجغرافية</CardTitle>
              <CardDescription>توزيع جمهورك حسب الموقع</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.audienceInsights.topLocations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon as={FiMapPin} size={20} className="text-prepilot-purple-400" />
                      <p className="font-medium text-white">{location.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">{location.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SocialAnalyticsComponent;
