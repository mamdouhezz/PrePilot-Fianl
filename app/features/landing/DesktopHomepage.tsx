/**
 * Desktop Homepage Component
 * Optimized desktop experience with complex layouts and animations
 */

import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { LandingNavbar } from './components/LandingNavbar';
import { WallOfLoveSection } from './components/WallOfLoveSection';
import { PlanLabSection } from './components/PlanLabSection';
import { useLandingAnalytics } from './hooks/useLandingAnalytics';
import { Page } from '../../types';

interface DesktopHomepageProps {
  navigateTo: (page: Page) => void;
}

export const DesktopHomepage: React.FC<DesktopHomepageProps> = ({ navigateTo }) => {
  const { trackPageView } = useLandingAnalytics();

  React.useEffect(() => {
    trackPageView('desktop-homepage');
  }, [trackPageView]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Professional Landing Navbar */}
      <LandingNavbar navigateTo={navigateTo} />

      {/* Desktop Sections */}
      <main className="pt-20">
        <HeroSection isMobile={false} navigateTo={navigateTo} />
        <WallOfLoveSection />
        <PlanLabSection />
        <FeaturesSection isMobile={false} />
        
        {/* Desktop-specific Advanced Section */}
        <section id="features" className="landing-section-lg bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-900 dark:to-purple-900/10">
          <div className="landing-container">
            <div className="grid grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="landing-text-h1 mb-6">
                  تحليلات متقدمة
                  <span className="landing-gradient-animated block mt-2">
                    في الوقت الفعلي
                  </span>
                </h2>
                <p className="landing-text-body-lg mb-8">
                  احصل على رؤى عميقة ومفصلة عن أداء حملاتك التسويقية مع تحديثات فورية وتحليلات متقدمة تساعدك في اتخاذ قرارات مدروسة.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="landing-text-h3 mb-2">تتبع الأداء الفوري</h3>
                      <p className="landing-text-body">راقب مؤشرات الأداء الرئيسية مع تحديثات فورية</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="landing-text-h3 mb-2">تقارير تفصيلية</h3>
                      <p className="landing-text-body">احصل على تقارير شاملة ومفصلة عن جميع جوانب حملاتك</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="landing-text-h3 mb-2">توصيات ذكية</h3>
                      <p className="landing-text-body">احصل على توصيات مخصصة لتحسين أداء حملاتك</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="landing-text-h3">لوحة التحكم المتقدمة</h3>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">2.4M</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">الظهور</div>
                        <div className="text-xs text-green-600 dark:text-green-400 mt-1">↗ +12.5%</div>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">4.2x</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">ROAS</div>
                        <div className="text-xs text-green-600 dark:text-green-400 mt-1">↗ +8.3%</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">15.3%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">CTR</div>
                        <div className="text-xs text-green-600 dark:text-green-400 mt-1">↗ +5.7%</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-2xl">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">3.8%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">CVR</div>
                        <div className="text-xs text-red-600 dark:text-red-400 mt-1">↘ -2.1%</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">تقدم الحملة</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">75%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-yellow-500 h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating notification */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-green-400 to-blue-500 p-4 rounded-2xl shadow-lg animate-pulse">
                  <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-white font-semibold text-sm">هدف محقق!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="landing-section-lg bg-white dark:bg-gray-900">
          <div className="landing-container text-center">
            <h2 className="landing-text-h1 mb-6">خطط الأسعار</h2>
            <p className="landing-text-body-lg mb-12 max-w-2xl mx-auto">
              اختر الخطة التي تناسب احتياجاتك وابدأ رحلتك نحو النجاح التسويقي
            </p>
            {/* Pricing content would go here */}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="landing-section-lg bg-gray-50 dark:bg-gray-800">
          <div className="landing-container text-center">
            <h2 className="landing-text-h1 mb-6">من نحن</h2>
            <p className="landing-text-body-lg mb-12 max-w-2xl mx-auto">
              نحن فريق من الخبراء في التسويق الرقمي والذكاء الاصطناعي، ملتزمون بمساعدتك على تحقيق أهدافك
            </p>
            {/* About content would go here */}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="landing-section-lg bg-white dark:bg-gray-900">
          <div className="landing-container text-center">
            <h2 className="landing-text-h1 mb-6">اتصل بنا</h2>
            <p className="landing-text-body-lg mb-12 max-w-2xl mx-auto">
              نحن هنا لمساعدتك. تواصل معنا في أي وقت
            </p>
            {/* Contact content would go here */}
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="landing-section-lg bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 relative overflow-hidden">
          <div className="landing-container text-center">
            <h2 className="landing-text-hero text-white mb-6">
              جاهز لتحويل
              <span className="block mt-2">استراتيجيتك التسويقية؟</span>
            </h2>
            <p className="landing-text-body-lg text-white/95 mb-12 max-w-4xl mx-auto leading-relaxed">
              انضم إلى أكثر من <span className="font-semibold text-yellow-400">500 مسوق رقمي</span> يحققون نتائج استثنائية مع PrePilot. 
              ابدأ رحلتك الآن واكتشف قوة الذكاء الاصطناعي في التسويق.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => navigateTo('playground')}
                className="landing-btn-primary bg-white text-purple-700 hover:bg-gray-50 hover:scale-105 transition-all duration-300 px-12 py-4 text-lg font-semibold shadow-xl"
              >
                <span>ابدأ مجاناً الآن</span>
                <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="landing-btn-secondary border-white text-white hover:bg-white hover:text-purple-600 px-12 py-4 text-lg">
                احجز استشارة مجانية
                <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Desktop Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden">
        <div className="landing-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 space-x-reverse mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-yellow-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="landing-text-h2">PrePilot</span>
              </div>
              <p className="landing-text-body text-white/90 mb-6 max-w-md leading-relaxed">
                منصة التسويق الذكي الأولى في السعودية. نحن نساعد المسوقين الرقميين على إنشاء خطط تسويقية احترافية باستخدام الذكاء الاصطناعي.
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="landing-text-h3 mb-6">المنتجات</h3>
              <ul className="space-y-3">
                <li><a href="#" className="landing-text-body text-white/80 hover:text-white transition-colors">المخطط الذكي</a></li>
                <li><a href="#" className="landing-text-body text-white/80 hover:text-white transition-colors">تحليل المنافسين</a></li>
                <li><a href="#" className="landing-text-body text-white/80 hover:text-white transition-colors">التقارير المتقدمة</a></li>
                <li><a href="#" className="landing-text-body text-white/80 hover:text-white transition-colors">API المطورين</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="landing-text-h3 mb-6">الدعم</h3>
              <ul className="space-y-3">
                <li><a href="#" className="landing-text-body text-white/80 hover:text-white transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="landing-text-body text-white/80 hover:text-white transition-colors">اتصل بنا</a></li>
                <li><a href="#" className="landing-text-body text-white/80 hover:text-white transition-colors">حالة النظام</a></li>
                <li><a href="#" className="landing-text-body text-white/80 hover:text-white transition-colors">الشروط والأحكام</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="landing-text-body text-white/70">
              © 2024 PrePilot. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};