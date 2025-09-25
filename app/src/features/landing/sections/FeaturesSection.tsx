/**
 * Features Section Component
 * Section showcasing key features and benefits
 */

import React from 'react';
import { FeatureCard } from '../components/FeatureCard';

interface FeaturesSectionProps {
  isMobile?: boolean;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ isMobile = false }) => {
  const features = [
    {
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'ذكاء اصطناعي متقدم',
      description: 'استخدم أحدث تقنيات الذكاء الاصطناعي لتحليل السوق وإنشاء خطط تسويقية محسّنة ومخصصة لعملك مع دقة تصل إلى 95%',
      highlight: true,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: 'تحليل المنافسين الذكي',
      description: 'احصل على رؤى عميقة عن منافسيك واستراتيجياتهم التسويقية لاتخاذ قرارات مدروسة ومبنية على بيانات حقيقية',
      highlight: false,
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'تقارير تفصيلية فورية',
      description: 'احصل على تقارير شاملة ومفصلة عن أداء حملاتك مع توصيات ذكية لتحسين النتائج وزيادة العائد على الاستثمار',
      highlight: false,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'سرعة فائقة في التنفيذ',
      description: 'أنشئ خطط تسويقية احترافية في دقائق بدلاً من ساعات أو أيام من العمل اليدوي. وفر 90% من وقتك',
      highlight: false,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'أمان وحماية متقدمة',
      description: 'بياناتك محمية بأعلى معايير الأمان والخصوصية مع تشفير متقدم وحماية شاملة وفقاً لمعايير ISO 27001',
      highlight: false,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
        </svg>
      ),
      title: 'سهولة الاستخدام المثالية',
      description: 'واجهة بسيطة وبديهية تجعل إنشاء الخطط التسويقية أمراً سهلاً وممتعاً للجميع، حتى للمبتدئين',
      highlight: false,
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <section className="landing-section-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-20 w-40 h-40 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="landing-container relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-900/30 dark:to-cyan-900/30 rounded-full mb-6">
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              ⚡ ميزات متقدمة
            </span>
          </div>
          
          <h2 className="landing-text-h1 mb-6">
            لماذا
            <span className="landing-gradient-animated block mt-2">
              PrePilot؟
            </span>
          </h2>
          
          <p className="landing-text-body-lg max-w-4xl mx-auto leading-relaxed text-gray-900 dark:text-gray-200">
            اكتشف الميزات المتقدمة التي تجعل PrePilot الخيار الأول للمسوقين الرقميين في السعودية. 
            <span className="font-semibold text-purple-600 dark:text-purple-400"> تقنيات متطورة، نتائج مضمونة</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'} gap-8 mb-20`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`landing-card-feature ${feature.highlight ? 'ring-2 ring-purple-500/20 scale-105' : ''} group`}
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="landing-text-h3 mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {feature.title}
              </h3>
              
              <p className="landing-text-body leading-relaxed text-gray-900 dark:text-gray-200">
                {feature.description}
              </p>

              {feature.highlight && (
                <div className="mt-4 inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">⭐ الميزة الأكثر تميزاً</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="landing-text-hero text-purple-600 dark:text-purple-400 mb-2">95%</div>
            <div className="landing-text-body text-gray-900 dark:text-gray-200">دقة التحليل</div>
          </div>
          <div className="text-center">
            <div className="landing-text-hero text-cyan-600 dark:text-cyan-400 mb-2">90%</div>
            <div className="landing-text-body text-gray-900 dark:text-gray-200">توفير الوقت</div>
          </div>
          <div className="text-center">
            <div className="landing-text-hero text-green-600 dark:text-green-400 mb-2">300%</div>
            <div className="landing-text-body text-gray-900 dark:text-gray-200">زيادة العائد</div>
          </div>
          <div className="text-center">
            <div className="landing-text-hero text-yellow-600 dark:text-yellow-400 mb-2">24/7</div>
            <div className="landing-text-body text-gray-900 dark:text-gray-200">دعم فني</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="landing-card max-w-4xl mx-auto bg-gradient-to-br from-purple-50 via-white to-cyan-50 dark:from-purple-900/20 dark:via-gray-800 dark:to-cyan-900/20 border-purple-200 dark:border-purple-700 p-12">
            <h3 className="landing-text-h2 mb-6">
              جاهز لبدء رحلتك
              <span className="landing-gradient-animated block mt-2">
                التسويقية؟
              </span>
            </h3>
            
            <p className="landing-text-body-lg mb-10 max-w-3xl mx-auto leading-relaxed text-gray-900 dark:text-gray-200">
              انضم إلى آلاف المسوقين الذين يحققون نتائج استثنائية مع PrePilot. 
              <span className="font-semibold text-purple-600 dark:text-purple-400"> ابدأ مجاناً اليوم</span> واكتشف قوة الذكاء الاصطناعي في التسويق.
            </p>
            
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-6 justify-center items-center`}>
              <button className="landing-btn-primary group">
                <span>ابدأ مجاناً الآن</span>
                <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <button className="landing-btn-secondary group">
                <svg className="mr-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>تحدث مع خبير</span>
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-8 space-x-reverse text-sm text-gray-900 dark:text-gray-200">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>بدون رسوم إعداد</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>إلغاء في أي وقت</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>دعم فني مجاني</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
