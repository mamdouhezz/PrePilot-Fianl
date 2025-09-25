import { FiYoutube, FiBriefcase } from 'react-icons/fi';
import { FaMeta, FaTiktok, FaSnapchat, FaXTwitter, FaLinkedin, FaGoogle } from 'react-icons/fa6';
// FIX: Import TaskPriority and TaskStatus from where they are defined.
import { PlatformInfo, SocialPlatformId, CampaignPreset } from './types';
import { TaskPriority, TaskStatus } from './types/export';
import { SocialPlatform } from './types/export';

// UNIFIED PLATFORM METADATA
// FIX: Merged platform info for twitter/x and meta/facebook to avoid duplication.
export const PLATFORM_INFO: Record<SocialPlatformId | SocialPlatform, PlatformInfo> = {
    meta: { name: 'Meta', icon: FaMeta, color: '#0866FF' },
    google_ads: { name: 'Google Ads', icon: FaGoogle, color: '#4285F4' },
    youtube: { name: 'YouTube', icon: FiYoutube, color: '#FF0000' },
    tiktok: { name: 'TikTok', icon: FaTiktok, color: '#000000' },
    snapchat: { name: 'Snapchat', icon: FaSnapchat, color: '#FFFC00' },
    x: { name: 'X (Twitter)', icon: FaXTwitter, color: '#14171A' },
    linkedin: { name: 'LinkedIn', icon: FaLinkedin, color: '#0A66C2' },
    twitter: { name: 'X (Twitter)', icon: FaXTwitter, color: '#14171A' },
    facebook: { name: 'Meta', icon: FaMeta, color: '#0866FF' },
    programmatic: { name: 'Programmatic', icon: FiBriefcase, color: '#60A5FA' }
};

// EXPORT CENTER CONSTANTS
export const STATUS_STYLES: Record<TaskStatus, { text: string; color: string; bgColor: string;}> = {
    [TaskStatus.Pending]: { text: 'قيد الانتظار', color: 'text-yellow-300', bgColor: 'bg-yellow-900/50' },
    [TaskStatus.Processing]: { text: 'قيد المعالجة', color: 'text-blue-300', bgColor: 'bg-blue-900/50' },
    [TaskStatus.Completed]: { text: 'مكتمل', color: 'text-green-300', bgColor: 'bg-green-900/50' },
    [TaskStatus.Failed]: { text: 'فشل', color: 'text-red-300', bgColor: 'bg-red-900/50' },
    [TaskStatus.Cancelled]: { text: 'ملغى', color: 'text-gray-400', bgColor: 'bg-gray-700/50' },
    [TaskStatus.Draft]: { text: 'مسودة', color: 'text-purple-300', bgColor: 'bg-purple-900/50' },
    [TaskStatus.Published]: { text: 'تم النشر', color: 'text-teal-300', bgColor: 'bg-teal-900/50' },
};

export const PRIORITY_STYLES: Record<TaskPriority, { text: string; color: string;}> = {
    [TaskPriority.Low]: { text: 'منخفض', color: 'text-gray-400' },
    [TaskPriority.Normal]: { text: 'عادي', color: 'text-blue-400' },
    [TaskPriority.High]: { text: 'عالي', color: 'text-yellow-400' },
    [TaskPriority.Urgent]: { text: 'عاجل', color: 'text-red-400' },
};

// PLAYGROUND CONSTANTS
export const PLATFORMS = [
    { id: 'meta', name: 'Meta (Facebook, Instagram)' },
    { id: 'google_ads', name: 'Google Ads (Search, Display)' },
    { id: 'youtube', name: 'YouTube Ads' },
    { id: 'tiktok', name: 'TikTok' },
    { id: 'snapchat', name: 'Snapchat' },
    { id: 'x', name: 'X (Twitter)' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'programmatic', name: 'Programmatic Ads' },
] as const;

export const INDUSTRIES = {
    'تجارة إلكترونية': [
        'أزياء وموضة',
        'إلكترونيات وأجهزة',
        'أثاث وديكور منزلي',
        'مستحضرات تجميل وعناية',
        'منتجات أطفال',
        'مجوهرات وساعات',
        'كتب وقرطاسية',
        'زهور وهدايا'
    ],
    'عقارات': ['سكني', 'تجاري', 'إدارة عقارات'],
    'سيارات': ['وكالات', 'قطع غيار', 'خدمات'],
    'تجزئة': ['سوبرماركت', 'متاجر كبرى', 'متاجر متخصصة'],
    'مطاعم وكافيهات': ['وجبات سريعة', 'فاخر', 'كافيهات'],
    'سياحة وضيافة': ['فنادق', 'طيران', 'جولات سياحية'],
    'رعاية صحية': ['مستشفيات', 'عيادات', 'صيدليات'],
    'تعليم': ['جامعات', 'مدارس', 'دورات تدريبية'],
    'خدمات مالية': ['بنوك', 'تمويل', 'تأمين'],
    'تقنية/ساس': ['B2B SaaS', 'B2C Apps', 'Fintech'],
    'وكالات إبداعية وتسويق': [
        'وكالة تسويق رقمي',
        'وكالة علاقات عامة',
        'وكالة إعلانية',
        'استوديو إنتاج محتوى'
    ],
    'إدارة الفعاليات والمؤتمرات': [
        'مؤتمرات أعمال',
        'معارض تجارية',
        'حفلات وفعاليات ترفيهية',
        'فعاليات رياضية'
    ],
    'المنظمات غير الربحية': [
        'جمعيات خيرية',
        'مبادرات مجتمعية',
        'مؤسسات وقفية'
    ],
} as const;

export const GOALS = {
    'Awareness / Brand Recognition': ['Reach', 'Brand Recall', 'Video Views'],
    'Traffic': ['Landing Page Views', 'Link Clicks', 'Website Traffic'],
    'Engagement': ['Post Engagement', 'Page Likes', 'Event Responses'],
    'Leads Generation': ['Form Submissions', 'Sign-ups', 'Phone Calls'],
    'Sales / Conversions': ['Purchases', 'Add to Cart', 'Checkout Initiations'],
} as const;

export const SEASONS = [
    { id: 'ramadan', name: 'رمضان والعيد' },
    { id: 'saudi_national_day', name: 'اليوم الوطني السعودي' },
    { id: 'foundation_day', name: 'يوم التأسيس' },
    { id: 'back_to_school', name: 'العودة للمدارس' },
    { id: 'white_friday', name: 'الجمعة البيضاء' },
    { id: 'end_of_year', name: 'عروض نهاية العام' },
] as const;

export const CAMPAIGN_DURATIONS = [
    { id: 'short', name: 'قصيرة', description: '(1-2 أسابيع)' },
    { id: 'medium', name: 'متوسطة', description: '(3-6 أسابيع)' },
    { id: 'long', name: 'طويلة', description: '(7-12 أسابيع)' },
    { id: 'always_on', name: 'مستمرة', description: '(+3 شهور)' },
] as const;

export const AUDIENCE_AGES = ['18-24', '25-34', '35-44', '45-54', '55+'] as const;
export const AUDIENCE_GENDERS = ['الكل', 'رجال', 'نساء'] as const;
export const AUDIENCE_LOCATIONS = ['كل المدن الرئيسية', 'الرياض', 'جدة', 'الدمام/الخبر', 'مكة', 'المدينة'] as const;

export const AUDIENCE_INTERESTS = ['التسوق والأزياء', 'التقنية', 'السفر', 'الطعام والشراب', 'الرياضة', 'السيارات', 'العقارات', 'الاستثمار والتمويل', 'الألعاب'] as const;
export const AUDIENCE_BEHAVIORS = ['المتسوقون المتفاعلون', 'المستخدمون الأوائل للتقنية', 'المسافرون الدائمون', 'مسؤولو صفحات فيسبوك', 'مستخدمو أجهزة iOS', 'مستخدمو أجهزة Android'] as const;

export const FUNNEL_STAGES = [{id: 'awareness', name: 'وعي'}, {id: 'consideration', name: 'اهتمام'}, {id: 'conversion', name: 'تحويل'}] as const;
export const CONVERSION_DEFINITIONS = [{id: 'purchase', name: 'شراء'}, {id: 'lead', name: 'عميل محتمل'}, {id: 'install', name: 'تثبيت تطبيق'}] as const;
export const CREATIVE_TYPES = [{id: 'video', name: 'فيديو'}, {id: 'static', name: 'صورة ثابتة'}, {id: 'carousel', name: 'مجموعة صور/فيديو'}] as const;
export const COMPETITOR_CONTEXTS = [{id: 'high', name: 'عالية'}, {id: 'low', name: 'منخفضة'}] as const;

export const CAMPAIGN_PRESETS: readonly CampaignPreset[] = [
    { name: 'إطلاق منتج جديد', icon: '🚀', industries: ['تجارة إلكترونية', 'تقنية/ساس', 'تجزئة'], data: { budget: 75000, duration: 'medium', goals: ['Awareness / Brand Recognition', 'Traffic'], platforms: ['meta', 'tiktok', 'snapchat'] } },
    { name: 'حملة مبيعات للمتجر الإلكتروني', icon: '🛒', industries: ['تجارة إلكترونية', 'تجزئة'], data: { budget: 40000, duration: 'short', goals: ['Sales / Conversions', 'Traffic'], platforms: ['meta', 'google_ads', 'snapchat'] } },
    { name: 'جذب عملاء محتملين (Leads)', icon: '🎣', industries: ['عقارات', 'سيارات', 'تعليم', 'خدمات مالية'], data: { budget: 60000, duration: 'medium', goals: ['Leads Generation'], platforms: ['meta', 'google_ads', 'linkedin'] } },
    { name: 'حملة وعي بالعلامة التجارية', icon: '📣', industries: [], data: { budget: 100000, duration: 'long', goals: ['Awareness / Brand Recognition', 'Engagement'], platforms: ['youtube', 'meta', 'tiktok'] } },
];

export const industryPlatformCompatibility = {
    'عقارات': { recommend: ['meta', 'google_ads'], discourage: ['tiktok'] },
    'خدمات مالية': { recommend: ['linkedin', 'google_ads', 'x'], discourage: ['tiktok', 'snapchat'] },
    'تقنية/ساس': { recommend: ['linkedin', 'google_ads', 'x'], discourage: [] },
};

export const industryTargetingSuggestions: { [key: string]: { interests: readonly string[], behaviors: readonly string[] } } = {
    'تجارة إلكترونية': { interests: ['التسوق والأزياء'], behaviors: ['المتسوقون المتفاعلون'] },
    'عقارات': { interests: ['العقارات', 'الاستثمار والتمويل'], behaviors: [] as string[] },
    'سيارات': { interests: ['السيارات'], behaviors: [] as string[] },
    'default': { interests: [] as string[], behaviors: [] as string[] }
};

export const industryAgeDefaults = {
    'تجارة إلكترونية': { default: ['18-24', '25-34'], subIndustries: { 'أثاث': ['25-34', '35-44'] } },
    'عقارات': { default: ['35-44', '45-54'] },
    'خدمات مالية': { default: ['25-34', '35-44', '45-54'] },
    'تقنية/ساس': { default: ['25-34', '35-44'] },
    'default': { default: ['25-34'] }
};
