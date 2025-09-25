import React, { useState, useEffect } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { VideoModal } from '../ui/VideoModal';
import { FiPlay, FiArrowRight } from 'react-icons/fi';
import { Page } from '../../types';

interface HeroSectionProps {
  navigateTo?: (page: Page) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ navigateTo }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section className="bg-accent-gradient text-white py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div
          className={`space-y-8 transition-all duration-800 ease-out ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-12'
          }`}
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-rubik leading-tight">
              PrePilot ✈️
              <br />
              خطتك الإعلانية في أقل من دقيقة
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-montserrat leading-relaxed">
              لا تخمّن… Just ڤايب. أول أداة تعطيك خطة مدعومة بالبيانات مباشرة، جاهزة للعرض على عميلك.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="glow"
              size="lg"
              onClick={() => navigateTo ? navigateTo('playground') : window.location.href = '/playground'}
              className="group"
            >
              جرّب الـ ڤايب الآن
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <VideoModal>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-foreground"
              >
                <FiPlay className="mr-2" />
                شوف كيف تشتغل
              </Button>
            </VideoModal>
          </div>
        </div>

        {/* Visual Mockup */}
        <div
          className={`relative transition-all duration-800 ease-out delay-200 ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-12'
          }`}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="bg-white rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="text-sm text-gray-500 font-montserrat">PrePilot Dashboard</div>
              </div>
              
              <div className="space-y-3">
                <div className="h-4 bg-primary/20 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-100 rounded h-16"></div>
                ))}
              </div>
              
              <div className="space-y-2">
                <div className="h-2 bg-primary/30 rounded w-full"></div>
                <div className="h-2 bg-secondary/30 rounded w-4/5"></div>
                <div className="h-2 bg-primary/30 rounded w-3/5"></div>
              </div>
            </div>
          </div>
          
          {/* Floating elements with CSS animations */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary rounded-full opacity-80 animate-bounce" />
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary rounded-full opacity-60 animate-pulse" />
        </div>
      </div>
    </Section>
  );
};
