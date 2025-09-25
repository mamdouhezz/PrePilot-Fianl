/**
 * Targeting Modifiers - Single Source of Truth
 * Contains multipliers based on audience targeting, demographics, and behaviors
 */

export const targetingModifiers = {
  // Demographics modifiers
  age_groups: {
    '18-24': { 
      cpm: 0.90, 
      ctr: 1.20, 
      cvr: 0.85,
      engagement: 1.25,
      best_platforms: ['tiktok', 'snapchat', 'instagram'],
      notes: 'جمهور شاب، تفاعل عالي لكن معدل تحويل أقل'
    },
    '25-34': { 
      cpm: 1.00, 
      ctr: 1.00, 
      cvr: 1.00,
      engagement: 1.00,
      best_platforms: ['meta', 'google_ads', 'linkedin'],
      notes: 'الجمهور المستهدف الرئيسي، توازن جيد في جميع المؤشرات'
    },
    '35-44': { 
      cpm: 1.10, 
      ctr: 0.95, 
      cvr: 1.15,
      engagement: 0.95,
      best_platforms: ['linkedin', 'google_ads', 'meta'],
      notes: 'جمهور ناضج، معدل تحويل أعلى لكن تفاعل أقل'
    },
    '45-54': { 
      cpm: 1.15, 
      ctr: 0.90, 
      cvr: 1.20,
      engagement: 0.85,
      best_platforms: ['facebook', 'google_ads', 'linkedin'],
      notes: 'جمهور ناضج جداً، أعلى معدل تحويل'
    },
    '55+': { 
      cpm: 1.20, 
      ctr: 0.80, 
      cvr: 1.25,
      engagement: 0.75,
      best_platforms: ['facebook', 'google_ads'],
      notes: 'جمهور كبار السن، أعلى معدل تحويل لكن أقل تفاعل'
    }
  },
  
  gender: {
    'male': { 
      cpm: 1.05, 
      ctr: 1.00, 
      cvr: 1.00,
      engagement: 1.00,
      notes: 'جمهور ذكوري، تكلفة أعلى قليلاً'
    },
    'female': { 
      cpm: 0.95, 
      ctr: 1.10, 
      cvr: 1.10,
      engagement: 1.10,
      notes: 'جمهور أنثوي، تفاعل وتحويل أعلى'
    },
    'mixed': { 
      cpm: 1.00, 
      ctr: 1.05, 
      cvr: 1.05,
      engagement: 1.05,
      notes: 'جمهور مختلط، توازن جيد'
    }
  },
  
  income_levels: {
    'low': { 
      cpm: 0.90, 
      ctr: 1.10, 
      cvr: 0.90,
      engagement: 1.05,
      notes: 'دخل منخفض، تفاعل أعلى لكن تحويل أقل'
    },
    'medium': { 
      cpm: 1.00, 
      ctr: 1.00, 
      cvr: 1.00,
      engagement: 1.00,
      notes: 'دخل متوسط، المعيار الأساسي'
    },
    'high': { 
      cpm: 1.20, 
      ctr: 0.90, 
      cvr: 1.20,
      engagement: 0.95,
      notes: 'دخل عالي، تكلفة أعلى لكن تحويل أفضل'
    },
    'luxury': { 
      cpm: 1.35, 
      ctr: 0.85, 
      cvr: 1.35,
      engagement: 0.90,
      notes: 'جمهور فاخر، أعلى تكلفة وأفضل تحويل'
    }
  },
  
  // Interest-based modifiers
  interests: {
    'fashion_shopping': { 
      cpm: 1.05, 
      ctr: 1.15, 
      cvr: 1.10,
      engagement: 1.20,
      best_industries: ['أزياء وموضة', 'تجزئة', 'تجارة إلكترونية']
    },
    'electronics': { 
      cpm: 1.10, 
      ctr: 1.05, 
      cvr: 1.08,
      engagement: 1.10,
      best_industries: ['تقنية/ساس', 'تجارة إلكترونية']
    },
    'luxury_goods': { 
      cpm: 1.30, 
      ctr: 1.15, 
      cvr: 1.25,
      engagement: 1.15,
      best_industries: ['أزياء وموضة', 'سيارات', 'عقارات']
    },
    'discounts_offers': { 
      cpm: 0.90, 
      ctr: 1.25, 
      cvr: 1.15,
      engagement: 1.30,
      best_industries: ['تجزئة', 'مطاعم وكافيهات', 'تجارة إلكترونية']
    },
    'health_fitness': { 
      cpm: 1.05, 
      ctr: 1.10, 
      cvr: 1.08,
      engagement: 1.15,
      best_industries: ['رعاية صحية', 'رياضة ولياقة']
    },
    'beauty_cosmetics': { 
      cpm: 1.10, 
      ctr: 1.20, 
      cvr: 1.15,
      engagement: 1.25,
      best_industries: ['أزياء وموضة', 'رعاية صحية']
    },
    'finance_investment': { 
      cpm: 1.25, 
      ctr: 0.95, 
      cvr: 1.20,
      engagement: 0.90,
      best_industries: ['خدمات مالية', 'عقارات']
    },
    'real_estate_investment': { 
      cpm: 1.35, 
      ctr: 1.05, 
      cvr: 1.30,
      engagement: 0.95,
      best_industries: ['عقارات', 'خدمات مالية']
    },
    'travel_tourism': { 
      cpm: 1.15, 
      ctr: 1.10, 
      cvr: 1.12,
      engagement: 1.15,
      best_industries: ['سياحة وضيافة']
    },
    'education_learning': { 
      cpm: 1.05, 
      ctr: 1.05, 
      cvr: 1.10,
      engagement: 1.08,
      best_industries: ['تعليم', 'تقنية/ساس']
    }
  },
  
  // Behavioral modifiers
  behaviors: {
    'online_shoppers': { 
      cpm: 1.10, 
      ctr: 1.08, 
      cvr: 1.20,
      engagement: 1.15,
      notes: 'متسوقون نشطون أونلاين'
    },
    'engaged_shoppers': { 
      cpm: 1.15, 
      ctr: 1.15, 
      cvr: 1.25,
      engagement: 1.30,
      notes: 'متسوقون متفاعلون جداً'
    },
    'luxury_brand_buyers': { 
      cpm: 1.40, 
      ctr: 1.10, 
      cvr: 1.35,
      engagement: 1.10,
      notes: 'مشترون للعلامات الفاخرة'
    },
    'coupon_users': { 
      cpm: 0.95, 
      ctr: 1.20, 
      cvr: 1.15,
      engagement: 1.25,
      notes: 'مستخدمون للكوبونات والعروض'
    },
    'seasonal_shoppers': { 
      cpm: 1.00, 
      ctr: 1.10, 
      cvr: 1.12,
      engagement: 1.15,
      notes: 'متسوقون موسميون'
    },
    'ad_engagers': { 
      cpm: 1.00, 
      ctr: 1.20, 
      cvr: 1.05,
      engagement: 1.25,
      notes: 'متفاعلون مع الإعلانات'
    },
    'mobile_gamers': { 
      cpm: 0.95, 
      ctr: 1.15, 
      cvr: 0.90,
      engagement: 1.20,
      notes: 'لاعبو ألعاب موبايل'
    },
    'tech_early_adopters': { 
      cpm: 1.25, 
      ctr: 1.15, 
      cvr: 1.20,
      engagement: 1.20,
      notes: 'متبنون مبكرون للتكنولوجيا'
    },
    'frequent_travelers': { 
      cpm: 1.20, 
      ctr: 1.08, 
      cvr: 1.15,
      engagement: 1.10,
      notes: 'مسافرون متكررون'
    },
    'property_seekers': { 
      cpm: 1.40, 
      ctr: 1.20, 
      cvr: 1.40,
      engagement: 1.05,
      notes: 'باحثون عن عقارات'
    }
  },
  
  // Geographic modifiers
  geography: {
    'riyadh': { 
      cpm: 1.15, 
      ctr: 1.05, 
      cvr: 1.10,
      engagement: 1.08,
      notes: 'الرياض - العاصمة، تكلفة أعلى'
    },
    'jeddah': { 
      cpm: 1.10, 
      ctr: 1.08, 
      cvr: 1.08,
      engagement: 1.10,
      notes: 'جدة - مدينة ساحلية، تفاعل جيد'
    },
    'dammam': { 
      cpm: 1.05, 
      ctr: 1.05, 
      cvr: 1.05,
      engagement: 1.05,
      notes: 'الدمام - المنطقة الشرقية'
    },
    'makkah': { 
      cpm: 1.00, 
      ctr: 1.00, 
      cvr: 1.00,
      engagement: 1.00,
      notes: 'مكة المكرمة - المعيار الأساسي'
    },
    'medina': { 
      cpm: 0.95, 
      ctr: 1.02, 
      cvr: 1.02,
      engagement: 1.03,
      notes: 'المدينة المنورة'
    },
    'other_cities': { 
      cpm: 0.90, 
      ctr: 1.05, 
      cvr: 1.03,
      engagement: 1.05,
      notes: 'المدن الأخرى، تكلفة أقل'
    }
  },
  
  // Device modifiers
  devices: {
    'mobile': { 
      cpm: 0.95, 
      ctr: 1.15, 
      cvr: 1.05,
      engagement: 1.20,
      notes: 'الموبايل - تفاعل أعلى'
    },
    'desktop': { 
      cpm: 1.10, 
      ctr: 0.90, 
      cvr: 1.10,
      engagement: 0.85,
      notes: 'الكمبيوتر - تحويل أعلى'
    },
    'tablet': { 
      cpm: 1.05, 
      ctr: 1.00, 
      cvr: 1.08,
      engagement: 1.05,
      notes: 'التابلت - توازن جيد'
    }
  },
  
  // Lookalike audience modifiers
  lookalike: {
    '1%': { 
      cpm: 1.20, 
      ctr: 1.05, 
      cvr: 1.15,
      engagement: 1.08,
      notes: 'جمهور مشابه 1% - دقة عالية، تكلفة أعلى'
    },
    '2-5%': { 
      cpm: 1.10, 
      ctr: 1.08, 
      cvr: 1.12,
      engagement: 1.10,
      notes: 'جمهور مشابه 2-5% - توازن جيد'
    },
    '5-10%': { 
      cpm: 1.05, 
      ctr: 1.10, 
      cvr: 1.08,
      engagement: 1.12,
      notes: 'جمهور مشابه 5-10% - وصول أوسع'
    }
  }
} as const;

export type TargetingModifiers = typeof targetingModifiers;
