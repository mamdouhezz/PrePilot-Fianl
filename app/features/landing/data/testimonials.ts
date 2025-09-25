/**
 * Testimonials Data
 * Realistic, persona-based testimonials that highlight core problems PrePilot solves
 */

export interface Testimonial {
  id: number;
  persona: 'Performance Marketer' | 'Founder' | 'Marketing Manager' | 'Digital Strategist';
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
  quote: string;
  highlight: string;
  rating: number;
  results?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    persona: 'Performance Marketer',
    name: 'سارة عبدالله',
    title: 'مديرة تسويق رقمي',
    company: 'شركة التقنية المتقدمة',
    avatarUrl: '/avatars/sarah.png',
    quote: "كنت أقضي ساعات في بناء توقعات الحملات على شيتات إكسل معقدة. الآن، مع PrePilot، أجهز تقريرًا احترافيًا ومدعومًا بالبيانات في دقائق قبل أي اجتماع. وفر علي وقتًا هائلاً وزاد من ثقة عملائي.",
    highlight: "وفر علي وقتًا هائلاً",
    rating: 5,
    results: "توفير 15 ساعة أسبوعياً"
  },
  {
    id: 2,
    persona: 'Founder',
    name: 'خالد الغامدي',
    title: 'مؤسس متجر إلكتروني',
    company: 'متجر التقنية الذكية',
    avatarUrl: '/avatars/khalid.png',
    quote: "كصاحب بزنس، أكبر سؤال كان عندي هو 'لو صرفت X، كم بيرجع لي؟'. PrePilot أعطاني إجابة واضحة وواقعية. الآن أتخذ قرارات الميزانية بثقة وأنا فاهم اللعبة.",
    highlight: "أتخذ قرارات الميزانية بثقة",
    rating: 5,
    results: "زيادة ROAS بنسبة 40%"
  },
  {
    id: 3,
    persona: 'Marketing Manager',
    name: 'فاطمة المطيري',
    title: 'مديرة التسويق الرقمي',
    company: 'مجموعة الاستثمار الرقمي',
    avatarUrl: '/avatars/fatima.png',
    quote: "PrePilot غير طريقة عملنا تماماً. بدلاً من التخمين، أصبح لدينا توقعات علمية دقيقة. عملاؤنا يثقون فينا أكثر لأننا نقدم لهم أرقام حقيقية وليس وعود فارغة.",
    highlight: "توقعات علمية دقيقة",
    rating: 5,
    results: "تحسين دقة التوقعات 85%"
  },
  {
    id: 4,
    persona: 'Digital Strategist',
    name: 'أحمد الشمري',
    title: 'استراتيجي تسويق رقمي',
    company: 'وكالة الإبداع الرقمي',
    avatarUrl: '/avatars/ahmed.png',
    quote: "كنت أعاني من صعوبة إقناع العملاء بخطط التسويق. مع PrePilot، أصبح لدي تقارير تفصيلية ومدعومة بالبيانات تثبت فعالية الاستراتيجية. معدل الموافقة على الخطط ارتفع بشكل كبير.",
    highlight: "معدل الموافقة ارتفع بشكل كبير",
    rating: 5,
    results: "زيادة معدل الموافقة 60%"
  }
];

export const getTestimonialById = (id: number): Testimonial | undefined => {
  return testimonials.find(testimonial => testimonial.id === id);
};

export const getTestimonialsByPersona = (persona: Testimonial['persona']): Testimonial[] => {
  return testimonials.filter(testimonial => testimonial.persona === persona);
};
