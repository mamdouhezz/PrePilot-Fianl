/**
 * Trust Section Component
 * Section showcasing trust signals and social proof
 */

import React from 'react';
import { TrustBadge } from '../components/TrustBadge';

interface TrustSectionProps {
  isMobile?: boolean;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ isMobile = false }) => {
  const trustPartners = [
    {
      logo: '🏢',
      company: 'STC',
      description: 'شريك استراتيجي'
    },
    {
      logo: '⛽',
      company: 'أرامكو',
      description: 'عميل راضٍ'
    },
    {
      logo: '🏦',
      company: 'الراجحي',
      description: 'شريك تقني'
    },
    {
      logo: '🥛',
      company: 'المراعي',
      description: 'عميل نشط'
    },
    {
      logo: '📱',
      company: 'موبايلي',
      description: 'شريك تقني'
    },
    {
      logo: '🏭',
      company: 'سابك',
      description: 'عميل مؤسسي'
    }
  ];

  const stats = [
    { 
      value: '500+', 
      label: 'مسوق رقمي',
      icon: '👥',
      description: 'في السعودية'
    },
    { 
      value: '2M+', 
      label: 'خطة تم إنشاؤها',
      icon: '📊',
      description: 'هذا العام'
    },
    { 
      value: '95%', 
      label: 'معدل الرضا',
      icon: '⭐',
      description: 'من العملاء'
    },
    { 
      value: '24/7', 
      label: 'دعم فني',
      icon: '🛠️',
      description: 'متاح دائماً'
    }
  ];

  const testimonials = [
    {
      quote: "PrePilot غيّر طريقة عملنا في التسويق الرقمي. ما كان يستغرق أسابيع أصبح يتم في دقائق مع نتائج أفضل بكثير.",
      author: "أحمد محمد",
      role: "الرئيس التنفيذي",
      company: "شركة التقنية المتقدمة",
      avatar: "👨‍💼",
      rating: 5
    },
    {
      quote: "منصة مذهلة! ساعدتنا في زيادة عائد الاستثمار بنسبة 300% خلال 3 أشهر فقط.",
      author: "فاطمة العلي",
      role: "مديرة التسويق",
      company: "مجموعة الأعمال الحديثة",
      avatar: "👩‍💼",
      rating: 5
    }
  ];

  return (
    <section className="landing-section bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b5cf6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="landing-container relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">✅ موثوق من كبار الشركات</span>
          </div>
          
          <h2 className="landing-text-h1 mb-6">
            يثق بنا
            <span className="landing-gradient-animated block mt-2">
              كبار الشركات
            </span>
          </h2>
          
          <p className="landing-text-body-lg max-w-4xl mx-auto leading-relaxed text-gray-900 dark:text-gray-200">
            أكثر من <span className="font-semibold text-purple-600 dark:text-purple-400">500 مسوق رقمي</span> يعتمدون على PrePilot لإنشاء خططهم التسويقية وتحقيق نتائج متميزة. انضم إلى آلاف العملاء الذين يحققون نجاحات استثنائية.
          </p>
        </div>

        {/* Trust Badges */}
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3 lg:grid-cols-6'} gap-6 mb-20`}>
          {trustPartners.map((partner, index) => (
            <div
              key={index}
              className="landing-card hover:scale-105 transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{partner.logo}</div>
                <h3 className="landing-text-h3 mb-2">{partner.company}</h3>
                <p className="text-sm text-gray-900 dark:text-gray-200">{partner.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-8 mb-20`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="landing-card-feature group-hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="landing-text-hero text-purple-600 dark:text-purple-400 mb-2">
                  {stat.value}
                </div>
                <div className="landing-text-h3 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-900 dark:text-gray-200">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="landing-text-h2 mb-4">ماذا يقول عملاؤنا</h3>
            <p className="landing-text-body-lg text-gray-900 dark:text-gray-200">
              قصص نجاح حقيقية من عملائنا
            </p>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-8`}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="landing-card-testimonial">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="landing-text-body-lg mb-6 leading-relaxed text-gray-900 dark:text-gray-200">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div className="text-right">
                    <div className="landing-text-h3">{testimonial.author}</div>
                    <div className="text-sm text-gray-900 dark:text-gray-200">
                      {testimonial.role}
                    </div>
                    <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="landing-card max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-cyan-50 dark:from-purple-900/20 dark:to-cyan-900/20 border-purple-200 dark:border-purple-700">
            <h3 className="landing-text-h2 mb-4">انضم إلى آلاف العملاء الراضيين</h3>
            <p className="landing-text-body-lg mb-6 text-gray-900 dark:text-gray-200">
              ابدأ رحلتك نحو النجاح في التسويق الرقمي اليوم
            </p>
            <button className="landing-btn-primary">
              ابدأ مجاناً الآن
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
