/**
 * Competition Modifiers - Single Source of Truth
 * Contains multipliers based on competition levels in different industries and platforms
 */

export const competitionModifiers = {
  // Competition level modifiers
  low: { 
    cpm: 0.85, 
    ctr: 1.15, 
    cvr: 1.10,
    cpc: 0.90,
    recommendation: 'زيادة الميزانية للاستفادة من المنافسة المنخفضة',
    strategy: 'aggressive_expansion',
    notes: 'منافسة منخفضة، فرصة لزيادة الحصة السوقية'
  },
  
  medium: { 
    cpm: 1.00, 
    ctr: 1.00, 
    cvr: 1.00,
    cpc: 1.00,
    recommendation: 'توازن الميزانية مع التركيز على الجودة',
    strategy: 'balanced_approach',
    notes: 'منافسة متوسطة، التركيز على التميز في المحتوى'
  },
  
  high: { 
    cpm: 1.25, 
    ctr: 0.90, 
    cvr: 0.95,
    cpc: 1.15,
    recommendation: 'تركيز على الجودة والإبداع لتعويض التكلفة',
    strategy: 'quality_focus',
    notes: 'منافسة عالية، ضرورة التميز في المحتوى والاستهداف'
  },
  
  extreme: { 
    cpm: 1.50, 
    ctr: 0.80, 
    cvr: 0.85,
    cpc: 1.35,
    recommendation: 'تجنب المنافسة أو زيادة الميزانية بشكل كبير',
    strategy: 'avoid_or_scale',
    notes: 'منافسة شديدة، قد تحتاج لتجنب هذه المنصات أو زيادة الميزانية بشكل كبير'
  },
  
  // Industry-specific competition analysis
  industry_competition: {
    'تجارة إلكترونية': { 
      level: 'high', 
      avg_competitors: 18, 
      avg_cpm_inflation: 1.35,
      peak_competition_seasons: ['الجمعة البيضاء', 'رمضان'],
      recommendation: 'التركيز على الـ retargeting وتحسين التجربة'
    },
    'عقارات': { 
      level: 'medium', 
      avg_competitors: 8, 
      avg_cpm_inflation: 1.15,
      peak_competition_seasons: ['بدون موسم معين'],
      recommendation: 'التركيز على المحتوى التعليمي والثقة'
    },
    'مطاعم وكافيهات': { 
      level: 'high', 
      avg_competitors: 25, 
      avg_cpm_inflation: 1.40,
      peak_competition_seasons: ['رمضان', 'العطل'],
      recommendation: 'التركيز على المحتوى البصري والمراجعات'
    },
    'خدمات مالية': { 
      level: 'high', 
      avg_competitors: 12, 
      avg_cpm_inflation: 1.30,
      peak_competition_seasons: ['بدون موسم معين'],
      recommendation: 'التركيز على الأمان والثقة والمراجعات'
    },
    'تعليم': { 
      level: 'medium', 
      avg_competitors: 10, 
      avg_cpm_inflation: 1.20,
      peak_competition_seasons: ['العودة للمدارس'],
      recommendation: 'التركيز على النتائج والشهادات'
    },
    'سياحة وضيافة': { 
      level: 'medium', 
      avg_competitors: 15, 
      avg_cpm_inflation: 1.25,
      peak_competition_seasons: ['موسم الحج', 'موسم العمرة'],
      recommendation: 'التركيز على الصور والتجارب'
    },
    'تقنية/ساس': { 
      level: 'medium', 
      avg_competitors: 8, 
      avg_cpm_inflation: 1.15,
      peak_competition_seasons: ['بدون موسم معين'],
      recommendation: 'التركيز على الابتكار والنتائج'
    }
  },
  
  // Platform-specific competition analysis
  platform_competition: {
    meta: {
      overall_level: 'high',
      saudi_market_saturation: 0.75,
      avg_advertisers_per_industry: 15,
      recommendation: 'التركيز على المحتوى الإبداعي والاستهداف الدقيق'
    },
    google_ads: {
      overall_level: 'high',
      saudi_market_saturation: 0.80,
      avg_advertisers_per_industry: 12,
      recommendation: 'التركيز على الكلمات المفتاحية طويلة الذيل'
    },
    tiktok: {
      overall_level: 'medium',
      saudi_market_saturation: 0.45,
      avg_advertisers_per_industry: 8,
      recommendation: 'فرصة جيدة للاستفادة من النمو السريع'
    },
    linkedin: {
      overall_level: 'low',
      saudi_market_saturation: 0.30,
      avg_advertisers_per_industry: 5,
      recommendation: 'منافسة منخفضة، فرصة ممتازة للـ B2B'
    },
    snapchat: {
      overall_level: 'medium',
      saudi_market_saturation: 0.35,
      avg_advertisers_per_industry: 6,
      recommendation: 'منافسة متوسطة، جيد للوصول للشباب'
    },
    youtube: {
      overall_level: 'medium',
      saudi_market_saturation: 0.50,
      avg_advertisers_per_industry: 10,
      recommendation: 'منافسة متوسطة، جيد للمحتوى الطويل'
    }
  },
  
  // Time-based competition modifiers
  time_competition: {
    weekday: {
      cpm: 0.95,
      ctr: 1.05,
      notes: 'منافسة أقل في أيام الأسبوع'
    },
    weekend: {
      cpm: 1.08,
      ctr: 0.98,
      notes: 'منافسة أعلى في عطلات نهاية الأسبوع'
    },
    peak_hours: {
      cpm: 1.15,
      ctr: 0.95,
      notes: 'أوقات الذروة (7-9 مساءً)'
    },
    off_peak_hours: {
      cpm: 0.85,
      ctr: 1.08,
      notes: 'الأوقات غير الذروة'
    }
  },
  
  // Seasonal competition modifiers
  seasonal_competition: {
    'رمضان': {
      cpm_multiplier: 1.40,
      competition_level: 'extreme',
      recommendation: 'زيادة الميزانية بنسبة 30-50% أو تجنب الإعلان'
    },
    'الجمعة البيضاء': {
      cpm_multiplier: 1.60,
      competition_level: 'extreme',
      recommendation: 'زيادة الميزانية بنسبة 50-100% أو تجنب الإعلان'
    },
    'العودة للمدارس': {
      cpm_multiplier: 1.25,
      competition_level: 'high',
      recommendation: 'زيادة الميزانية بنسبة 20-30%'
    },
    'بدون موسم معين': {
      cpm_multiplier: 1.00,
      competition_level: 'medium',
      recommendation: 'استراتيجية متوازنة'
    }
  }
} as const;

export type CompetitionModifiers = typeof competitionModifiers;
