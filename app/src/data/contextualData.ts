/** @file This file contains the contextual 'Digital Fingerprint' for each industry, linking them to default settings and dynamic questions to enrich the user's campaign plan. */

interface ContextualQuestion {
    id: string;
    label: string;
    type?: 'select' | 'text' | 'multi-select';
    options: string[];
}

interface IndustryContext {
    defaultPlatforms: string[];
    defaultFunnelStage: 'awareness' | 'consideration' | 'conversion';
    keyQuestions?: ContextualQuestion[];
}

export const contextualData: {
    [industry: string]: {
        [subIndustry: string]: IndustryContext;
    };
} = {
    'تجارة إلكترونية': {
        'default': {
            defaultPlatforms: ['meta', 'tiktok', 'snapchat', 'google_ads'],
            defaultFunnelStage: 'conversion',
            keyQuestions: [
                { id: 'ecommerce_platform', label: 'ما هي منصة متجرك الأساسية؟', type: 'select', options: ['Salla', 'Zid', 'Shopify', 'WooCommerce', 'Magento', 'OpenCart', 'ExpandCart', 'Custom'] },
                { id: 'payment_gateway', label: 'ما هي بوابة الدفع التي تستخدمها؟ (اختياري)', type: 'select', options: ['Moyasar', 'PayTabs', 'MyFatoorah', 'HyperPay', 'Tap', 'Amazon Payment Services'] }
            ]
        },
        'أزياء وموضة': {
            defaultPlatforms: ['meta', 'tiktok', 'snapchat', 'youtube'],
            defaultFunnelStage: 'conversion',
            keyQuestions: [
                { id: 'ecommerce_platform', label: 'ما هي منصة متجرك الأساسية؟', type: 'select', options: ['Salla', 'Zid', 'Shopify', 'WooCommerce', 'Magento', 'OpenCart', 'ExpandCart', 'Custom'] },
                { id: 'payment_gateway', label: 'ما هي بوابة الدفع التي تستخدمها؟ (اختياري)', type: 'select', options: ['Moyasar', 'PayTabs', 'MyFatoorah', 'HyperPay', 'Tap', 'Amazon Payment Services'] }
            ]
        },
        'مجوهرات وساعات': {
            defaultPlatforms: ['meta', 'google_ads', 'snapchat'],
            defaultFunnelStage: 'conversion',
            keyQuestions: [
                { id: 'ecommerce_platform', label: 'ما هي منصة متجرك الأساسية؟', type: 'select', options: ['Salla', 'Zid', 'Shopify', 'WooCommerce', 'Magento', 'OpenCart', 'ExpandCart', 'Custom'] },
                { id: 'payment_gateway', label: 'ما هي بوابة الدفع التي تستخدمها؟ (اختياري)', type: 'select', options: ['Moyasar', 'PayTabs', 'MyFatoorah', 'HyperPay', 'Tap', 'Amazon Payment Services'] }
            ]
        }
    },
    'عقارات': {
        'default': {
            defaultPlatforms: ['google_ads', 'meta', 'snapchat'],
            defaultFunnelStage: 'conversion',
            keyQuestions: [
                { id: 'realestate_portal', label: 'على أي بوابة عقارية تعرضون بشكل أساسي؟', type: 'select', options: ['Aqar', 'Bayut.sa', 'Ejar', 'Sakani', 'Social Media Only', 'Other'] }
            ]
        }
    },
    'مطاعم وكافيهات': {
        'default': {
            defaultPlatforms: ['tiktok', 'snapchat', 'meta'],
            defaultFunnelStage: 'awareness',
            keyQuestions: [
                { id: 'food_aggregator', label: 'ما هي منصة التوصيل الأساسية لديكم؟', type: 'select', options: ['HungerStation', 'Jahez', 'The Chefz', 'Careem NOW', 'ToYou', 'None (Direct Orders Only)'] },
                { id: 'pos_system', label: 'ما هو نظام نقاط البيع (POS) الذي تستخدمونه؟', type: 'select', options: ['Foodics', 'Odoo', 'Square', 'Other'] }
            ]
        }
    },
    'رعاية صحية': {
        'default': {
            defaultPlatforms: ['google_ads', 'meta', 'snapchat'],
            defaultFunnelStage: 'conversion',
            keyQuestions: [
                { id: 'booking_platform', label: 'ما هي منصة حجز المواعيد التي تستخدمونها؟', type: 'select', options: ['Vezeeta', 'Curado', 'Okadoc', 'Mawidy', 'Direct Website', 'Other'] }
            ]
        }
    },
    'التعليم': {
        'default': {
            defaultPlatforms: ['meta', 'youtube', 'google_ads'],
            defaultFunnelStage: 'consideration',
            keyQuestions: [
                { id: 'lms_platform', label: 'ما هو نظام إدارة التعلم (LMS) لديكم؟', type: 'select', options: ['Blackboard', 'Moodle', 'Noon Academy', 'Classera', 'Other'] },
                { id: 'course_platforms', label: 'منصات الدورات التي تستخدمونها (اختياري)', type: 'select', options: ['Doroob', 'Rwaq', 'Udemy', 'Coursera', 'Other'] }
            ]
        }
    },
    'وكالات إبداعية وتسويق': {
        'وكالة تسويق رقمي': {
            defaultPlatforms: ['linkedin', 'google_ads', 'x'],
            defaultFunnelStage: 'consideration',
            keyQuestions: [
                { id: 'project_management_tool', label: 'ما هي أداة إدارة المشاريع الأساسية في فريقكم؟', type: 'select', options: ['Asana', 'Trello', 'ClickUp', 'Monday.com', 'Jira', 'Other'] }
            ]
        }
    },
    'إدارة الفعاليات والمؤتمرات': {
        'default': {
            defaultPlatforms: ['linkedin', 'x', 'meta'],
            defaultFunnelStage: 'awareness',
            keyQuestions: [
                { id: 'event_type', label: 'ما هو نوع الحضور؟', type: 'select', options: ['B2B', 'B2C', 'Hybrid'] },
                { id: 'ticketing_platform', label: 'ما هي منصة التذاكر الأساسية؟', type: 'select', options: ['Eventbrite', 'TicketMX', 'HalaYalla', 'Other'] },
                { id: 'event_platform', label: 'ما هي منصة إدارة الفعاليات المستخدمة؟', type: 'select', options: ['Cvent', 'Eventtus', 'Other'] }
            ]
        },
        'مؤتمرات أعمال': {
            defaultPlatforms: ['linkedin', 'x', 'meta'],
            defaultFunnelStage: 'awareness',
            keyQuestions: [
                { id: 'event_type', label: 'ما هو نوع الحضور؟', type: 'select', options: ['B2B', 'B2C', 'Hybrid'] },
                { id: 'ticketing_platform', label: 'ما هي منصة التذاكر الأساسية؟', type: 'select', options: ['Eventbrite', 'TicketMX', 'HalaYalla', 'Other'] },
                { id: 'event_platform', label: 'ما هي منصة إدارة الفعاليات المستخدمة؟', type: 'select', options: ['Cvent', 'Eventtus', 'Other'] }
            ]
        }
    },
    'سيارات': {
        'default': {
            defaultPlatforms: ['google_ads', 'meta', 'snapchat'],
            defaultFunnelStage: 'conversion',
            keyQuestions: [
                { id: 'car_type', label: 'ما هو نوع السيارات التي تتعاملون معها؟', type: 'select', options: ['سيارات جديدة', 'سيارات مستعملة', 'قطع غيار', 'خدمات صيانة', 'تأجير سيارات'] },
                { id: 'brands', label: 'ما هي الماركات التي تتعاملون معها؟', type: 'text', options: [] }
            ]
        }
    },
    'تجزئة': {
        'default': {
            defaultPlatforms: ['meta', 'tiktok', 'snapchat', 'google_ads'],
            defaultFunnelStage: 'conversion',
            keyQuestions: [
                { id: 'retail_type', label: 'ما هو نوع المتجر؟', type: 'select', options: ['متجر فيزيائي', 'متجر إلكتروني', 'متجر مختلط (فيزيائي + إلكتروني)'] },
                { id: 'pos_system', label: 'ما هو نظام نقاط البيع المستخدم؟', type: 'select', options: ['Foodics', 'Odoo', 'Square', 'Other'] }
            ]
        }
    },
    'سياحة وضيافة': {
        'default': {
            defaultPlatforms: ['meta', 'google_ads', 'youtube'],
            defaultFunnelStage: 'consideration',
            keyQuestions: [
                { id: 'tourism_type', label: 'ما هو نوع الخدمة السياحية؟', type: 'select', options: ['فندق', 'شركة طيران', 'جولات سياحية', 'خدمات حجز', 'مطاعم سياحية'] },
                { id: 'booking_platform', label: 'ما هي منصة الحجز الأساسية؟', type: 'select', options: ['Booking.com', 'Agoda', 'Expedia', 'حجز مباشر', 'Other'] }
            ]
        }
    },
    'خدمات مالية': {
        'default': {
            defaultPlatforms: ['linkedin', 'google_ads', 'x'],
            defaultFunnelStage: 'conversion',
            keyQuestions: [
                { id: 'financial_service', label: 'ما هو نوع الخدمة المالية؟', type: 'select', options: ['خدمات مصرفية', 'تمويل شخصي', 'تأمين', 'استثمار', 'خدمات دفع'] },
                { id: 'compliance', label: 'هل أنتم مرخصون من هيئة السوق المالية؟', type: 'select', options: ['نعم', 'لا', 'قيد المراجعة'] }
            ]
        }
    },
    'تقنية/ساس': {
        'default': {
            defaultPlatforms: ['linkedin', 'google_ads', 'x'],
            defaultFunnelStage: 'consideration',
            keyQuestions: [
                { id: 'saas_type', label: 'ما هو نوع المنتج التقني؟', type: 'select', options: ['B2B SaaS', 'B2C App', 'Fintech', 'E-commerce Platform', 'Other'] },
                { id: 'target_audience', label: 'من هو الجمهور المستهدف؟', type: 'select', options: ['شركات صغيرة', 'شركات متوسطة', 'شركات كبيرة', 'مستهلكين', 'مختلط'] }
            ]
        }
    },
    'المنظمات غير الربحية': {
        'default': {
            defaultPlatforms: ['meta', 'google_ads', 'youtube'],
            defaultFunnelStage: 'awareness',
            keyQuestions: [
                { id: 'ngo_type', label: 'ما هو نوع المنظمة؟', type: 'select', options: ['جمعية خيرية', 'مبادرة مجتمعية', 'مؤسسة وقفية', 'منظمة دولية'] },
                { id: 'target_cause', label: 'ما هو الهدف الاجتماعي الرئيسي؟', type: 'text', options: [] }
            ]
        }
    }
};


