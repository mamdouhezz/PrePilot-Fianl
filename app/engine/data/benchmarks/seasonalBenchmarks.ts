/**
 * Unified Seasonal Benchmarks - Single Source of Truth
 * Contains authoritative seasonal multipliers and impact data for Saudi Arabia
 */

export const seasonalBenchmarks = {
  'بدون موسم معين': {
    CPM_multiplier: 1.0,
    CTR_multiplier: 1.0,
    CVR_multiplier: 1.0,
    CPC_multiplier: 1.0,
    // Enhanced data points
    duration_days: 365,
    impact_level: 'none',
    best_industries: ['عقارات', 'خدمات مالية'],
    worst_industries: [],
    notes: "وضع قياسي بدون تأثيرات موسمية"
  },
  
  'رمضان': {
    CPM_multiplier: 1.35,
    CTR_multiplier: 1.15,
    CVR_multiplier: 1.25,
    CPC_multiplier: 1.17,
    // Enhanced data points
    duration_days: 30,
    impact_level: 'high',
    best_industries: ['مطاعم وكافيهات', 'تجارة إلكترونية', 'أزياء وموضة'],
    worst_industries: ['فعاليات ومؤتمرات ومعارض'],
    peak_weeks: ['الأسبوع الأول', 'الأسبوع الأخير'],
    notes: "رمضان = تفاعل عالي جدًا، أسعار الـ CPM ترتفع لكن التحويلات تتحسن"
  },
  
  'موسم الحج': {
    CPM_multiplier: 1.12,
    CTR_multiplier: 1.02,
    CVR_multiplier: 1.15,
    CPC_multiplier: 1.10,
    // Enhanced data points
    duration_days: 45,
    impact_level: 'medium',
    best_industries: ['سياحة وضيافة', 'مطاعم وكافيهات'],
    worst_industries: ['تعليم', 'تقنية/ساس'],
    peak_weeks: ['الأسبوعين الأولين', 'الأسبوع الأخير'],
    notes: "الإعلانات تميل أن تكون محدودة باستثناء خدمات الحج والعمرة"
  },
  
  'موسم العمرة': {
    CPM_multiplier: 1.15,
    CTR_multiplier: 1.08,
    CVR_multiplier: 1.22,
    CPC_multiplier: 1.06,
    // Enhanced data points
    duration_days: 60,
    impact_level: 'medium',
    best_industries: ['سياحة وضيافة', 'مطاعم وكافيهات', 'تجارة إلكترونية'],
    worst_industries: ['تعليم'],
    peak_weeks: ['منتصف الموسم'],
    notes: "زيادة الطلب على السفر والضيافة"
  },
  
  'العودة للمدارس': {
    CPM_multiplier: 1.25,
    CTR_multiplier: 1.12,
    CVR_multiplier: 1.35,
    CPC_multiplier: 1.12,
    // Enhanced data points
    duration_days: 45,
    impact_level: 'high',
    best_industries: ['تعليم', 'تجارة إلكترونية', 'تقنية/ساس'],
    worst_industries: ['سياحة وضيافة'],
    peak_weeks: ['الأسبوعين الأولين'],
    notes: "طلب عالي على التعليم والـ e-commerce (لابتوبات، لوازم مكتبية)"
  },
  
  'الجمعة البيضاء': {
    CPM_multiplier: 1.45,
    CTR_multiplier: 1.35,
    CVR_multiplier: 1.55,
    CPC_multiplier: 1.07,
    // Enhanced data points
    duration_days: 14,
    impact_level: 'extreme',
    best_industries: ['تجارة إلكترونية', 'تجزئة', 'أزياء وموضة', 'تطبيقات وتقنية'],
    worst_industries: ['عقارات', 'خدمات مالية'],
    peak_weeks: ['الأسبوع الأول', 'نهاية الأسبوع الثاني'],
    notes: "أقوى موسم مبيعات في السنة، تنافس شديد على الإعلانات"
  },
  
  'الصيف / عطلة المدارس': {
    CPM_multiplier: 0.88,
    CTR_multiplier: 0.95,
    CVR_multiplier: 0.82,
    CPC_multiplier: 0.93,
    // Enhanced data points
    duration_days: 90,
    impact_level: 'negative',
    best_industries: ['سياحة وضيافة', 'مطاعم وكافيهات'],
    worst_industries: ['تعليم', 'تقنية/ساس', 'فعاليات ومؤتمرات ومعارض'],
    peak_weeks: ['منتصف الصيف'],
    notes: "أداء أضعف نسبيًا، خصوصًا في الـ B2B والـ education"
  },
  
  'اليوم الوطني': {
    CPM_multiplier: 1.28,
    CTR_multiplier: 1.22,
    CVR_multiplier: 1.18,
    CPC_multiplier: 1.05,
    // Enhanced data points
    duration_days: 7,
    impact_level: 'medium',
    best_industries: ['تجزئة', 'مطاعم وكافيهات', 'سيارات'],
    worst_industries: ['تعليم'],
    peak_weeks: ['أيام العطلة'],
    notes: "تفاعل عالي مع العروض والمحتوى الوطني"
  },
  
  'يوم التأسيس': {
    CPM_multiplier: 1.22,
    CTR_multiplier: 1.18,
    CVR_multiplier: 1.12,
    CPC_multiplier: 1.03,
    // Enhanced data points
    duration_days: 7,
    impact_level: 'medium',
    best_industries: ['تجزئة', 'مطاعم وكافيهات'],
    worst_industries: [],
    peak_weeks: ['يوم التأسيس'],
    notes: "فرصة للمحتوى التراثي والعروض الخاصة"
  },
  
  // New seasons
  'عيد الفطر': {
    CPM_multiplier: 1.30,
    CTR_multiplier: 1.20,
    CVR_multiplier: 1.25,
    CPC_multiplier: 1.08,
    // Enhanced data points
    duration_days: 14,
    impact_level: 'high',
    best_industries: ['تجارة إلكترونية', 'أزياء وموضة', 'مطاعم وكافيهات'],
    worst_industries: ['تعليم'],
    peak_weeks: ['الأسبوع الأول'],
    notes: "موسم تسوق قوي بعد رمضان مع زيادة الطلب على الأزياء والهدايا"
  },
  
  'عيد الأضحى': {
    CPM_multiplier: 1.25,
    CTR_multiplier: 1.15,
    CVR_multiplier: 1.20,
    CPC_multiplier: 1.09,
    // Enhanced data points
    duration_days: 14,
    impact_level: 'medium',
    best_industries: ['مطاعم وكافيهات', 'تجزئة'],
    worst_industries: ['سياحة وضيافة'],
    peak_weeks: ['الأسبوع الأول'],
    notes: "موسم قوي للمطاعم والتجزئة مع التركيز على الطعام والهدايا"
  }
} as const;

export type SeasonalBenchmarks = typeof seasonalBenchmarks;
export type SeasonKey = keyof SeasonalBenchmarks;
